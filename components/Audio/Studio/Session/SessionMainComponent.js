import React, { useState, useEffect, useMemo } from 'react'
// import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSongData } from '../Hooks/useSongData'
import { useAuthState } from "react-firebase-hooks/auth"

import { auth, provider, db, storage } from '../../../../firebase/firebase-config'
import { collection, query, where, getDocs, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, listAll, list, getStorage, deleteObject, updateMetadata, getMetadata, } from "firebase/storage";

import {userRealtimeSongData} from '../../AudioUtilitiesAndHooks'


// const storage = getStorage();

import FileVersion from './FileVersion'
import AddFileVersion from './AddFileVersion'
import AdminEditUsers from './AdminEditUsers'

import styles from '../Styles/Session.module.scss'

// main component rendered from /audio/studio/session/song/[...songSession].js
export default function SessionMainComponent(props) {
    // console.log('yeah')

    const [allSongData, metadata, usersWithAccess, usersWithAdmin, userRole] = useSongData(props.songDocumentId)

    const realtimeSongData = userRealtimeSongData(props.songDocumentId)


    // UI
    const [deleteSongMenuOpen, setDeleteSongMenuOpen] = useState(false)
    const [manageTeamMenuOpen, setManageTeamMenuOpen] = useState(false)

    const deleteSong = async () => {
        if (userRole == 'admin') {
            const fileVersionsSnapshot = await getDocs(collection(db, 'songs', props.songDocumentId, 'fileVersions'))
            fileVersionsSnapshot.forEach(async (document) => {
                await deleteDoc(doc(db, 'songs', props.songDocumentId, 'fileVersions', document.id))
              });
            await deleteDoc(doc(db, 'songs', props.songDocumentId))
            window.location.href=`/audio/studio`
        }
    }    
    
    return (
        props.songDocumentId && allSongData ? // this stops the entire component from rendering unless the router.query has been put into state
        <div className={styles.container}>
            <main>
                <section className={styles.sessionInfo}>
                    <h1>A long song name because I need - to see how it works [298389]</h1>
                    {/* <h1>{realtimeSongData.metadata.songName}</h1> */}
                    <h1 className={styles.role}>{userRole}</h1>
                </section>
                {
                    userRole == 'admin' &&
                    <div className={styles.navContainer}>
                        <nav>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M22.6 36.5h2.85v-6.45h6.5V27.2h-6.5v-6.5H22.6v6.5h-6.5v2.85h6.5ZM6.9 45.05V2.9h22.75l11.5 11.4v30.75ZM27.25 16.6V7.5h-15.8v33h25.1V16.6Zm-15.8-9.1v9.1-9.1 33Z"/></svg>
                                    <p>Add File</p>
                                </button>
                                <button onClick={() => setManageTeamMenuOpen(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M-.5 36.5v-3.15q0-2.2 2.2-3.525Q3.9 28.5 7.5 28.5h.7q.35 0 .65.05-.45.9-.725 1.95-.275 1.05-.275 2.25v3.75Zm12 0v-3.75q0-3.55 3.45-5.65Q18.4 25 24 25q5.7 0 9.1 2.1 3.4 2.1 3.4 5.65v3.75Zm28.65 0v-3.8q0-1.1-.25-2.15-.25-1.05-.65-2 .3-.05.6-.05h.65q3.65 0 5.825 1.3 2.175 1.3 2.175 3.55v3.15ZM24 28.8q-3.4 0-5.575.975-2.175.975-2.475 2.625v.25h16.1v-.3q-.35-1.6-2.475-2.575Q27.45 28.8 24 28.8ZM7.5 27.1q-1.55 0-2.675-1.125Q3.7 24.85 3.7 23.3q0-1.6 1.125-2.7T7.5 19.5q1.55 0 2.7 1.1 1.15 1.1 1.15 2.7 0 1.55-1.125 2.675Q9.1 27.1 7.5 27.1Zm33 0q-1.55 0-2.675-1.125Q36.7 24.85 36.7 23.3q0-1.6 1.125-2.7t2.675-1.1q1.55 0 2.7 1.1 1.15 1.1 1.15 2.7 0 1.55-1.125 2.675Q42.1 27.1 40.5 27.1Zm-16.45-3.6q-2.65 0-4.6-1.925Q17.5 19.65 17.5 17q0-2.75 1.95-4.625t4.6-1.875q2.75 0 4.6 1.875Q30.5 14.25 30.5 17q0 2.65-1.85 4.575-1.85 1.925-4.6 1.925ZM24 14.3q-1.15 0-1.9.8t-.75 1.9q0 1.1.75 1.875.75.775 1.95.775 1 0 1.825-.775t.825-1.925q0-1.05-.825-1.85T24 14.3Zm0 18.35ZM24 17Z"/></svg>
                                    <p>Manage Team</p>
                                </button>
                            {
                                <button onClick={() => setDeleteSongMenuOpen(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M8.05 43.05V10.9h-2.9V6.35h11.4V4H31.4v2.35h11.4v4.55h-2.9v32.15Zm4.6-4.55H35.3V10.9H12.65Zm5.2-3.9h3.7V14.7h-3.7Zm8.65 0h3.75V14.7H26.5ZM12.65 10.9v27.6Z"/></svg>
                                    <p>Delete Song</p>
                                </button>
                            }
                        </nav>
                        {
                            deleteSongMenuOpen &&
                            <div className={styles.deleteModalBackground} onClick={() => setDeleteSongMenuOpen(false)}>
                                <div className={styles.deleteModal} >
                                    {/* <h1>Are you sure you want to delete this song? This will delete it for all team members as well.</h1> */}
                                    <h2>Are you sure you want to delete this song?</h2>
                                        <p onClick={() => deleteSong()}>yes, delete it</p>
                                </div>
                            </div>
                        }
                        {
                            manageTeamMenuOpen &&
                                <AdminEditUsers 
                                    allSongData={allSongData} 
                                    usersWithAccess={usersWithAccess} 
                                    usersWithAdmin={usersWithAdmin}
                                />
                        }
                        
                    </div>
                }
                {
                    userRole == 'admin' &&
                    <AddFileVersion allSongData={allSongData} usersWithAccess={usersWithAccess} usersWithAdmin={usersWithAdmin}/>
                }
                <FileVersion songName={props.songDocumentId} userRole={userRole} songDocumentId={metadata.documentId}/>
            </main>


        </div>
        :
        <h1>LOADING (or u dont have permission)</h1>
        )
    }