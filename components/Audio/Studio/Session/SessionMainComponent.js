import React, { useState, useEffect, useMemo } from 'react'
// import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSongData } from '../Hooks/useSongData'
import { useAuthState } from "react-firebase-hooks/auth"

import { auth, provider, db } from '../../../../firebase/firebase-config'
import { collection, query, where, getDocs, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

import {userRealtimeSongData} from '../../AudioUtilitiesAndHooks'


import FileVersion from './FileVersion'
import AddFileVersion from './AddFileVersion'
import AdminEditUsers from './AdminEditUsers'

// main component rendered from /audio/studio/session/song/[...songSession].js
export default function SessionMainComponent(props) {

    const [allSongData, metadata, usersWithAccess, usersWithAdmin, userRole] = useSongData(props.songDocumentId)
    // console.log('usersWithAccess => ', usersWithAccess)
    // console.log('usersWithAdmin => ', usersWithAdmin)
    // console.log('fart')
    // console.log(allSongData)

    const realtimeSongData = userRealtimeSongData(props.songDocumentId)

    // console.log(realtimeSongData)

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

    // update song document's priviledge array with new user's uid
    // when testing: remember the ui also checks against user docs, 
        // so if you enter random stuff here it'll add it to the doc but the hook knows its not a real user
    const addUser = async (event) => {
        event.preventDefault()
        const userUidToAdd = event.target[0].value
        const addAsAdminAlso = event.target[1].checked
        console.log(event.target[1].checked)
        if (userRole == 'admin') {
            const songDocumentReference = doc(db, 'songs', props.songDocumentId)
            const songDocumentSnapshot = await getDoc(songDocumentReference)
            let usersWithAccessLocal
            let usersWithAdminLocal
            if (songDocumentSnapshot.exists()) {
                usersWithAccessLocal = songDocumentSnapshot.data().usersWithAccess
                usersWithAccessLocal.push(userUidToAdd)
                usersWithAdminLocal = songDocumentSnapshot.data().usersWithAdmin
                
                if (addAsAdminAlso == true) {
                    usersWithAdminLocal.push(userUidToAdd)
                }

                await updateDoc(songDocumentReference, {
                    usersWithAccess: usersWithAccessLocal,
                    usersWithAdmin: usersWithAdminLocal
                })
            }
        }
        window.location.href=`/audio/studio/session/song/${metadata.documentId}`
    }
    
    return (
        props.songDocumentId && allSongData ? // this stops the entire component from rendering unless the router.query has been put into state
        <div>
            
            {
                <Link href='/audio/studio'>
                    {'< studio'}
                </Link>
            }

            <h1>Session</h1>
            <h2>{realtimeSongData.metadata.songName}</h2>
            <h2>{userRole}</h2>
            <button onClick={() => deleteSong()}>DELETE SONG</button>

            <br />
            <br />

            <form onSubmit={addUser}>
                <label htmlFor='addsUser'>userUID:</label>
                <input type='text' id='addUser' required></input>
                <br />
                <input type='checkbox' id='addAsAdmin'></input>
                <label htmlFor='addAsAdmin'>Add as admin?:</label>
                <button type='submit'>Add User</button>
            </form>

            <br />

            {/* <details style={{cursor: 'pointer'}}>
                <summary>info</summary>
                <ul>
                    <li><strong>users with access</strong></li>
                    {
                        usersWithAccess.map((user, index) => {
                            return <li key={index}>{user.metadata.email}</li>
                        })
                    }
                </ul>
                <ul>
                    <li><strong>users with admin</strong></li>
                    {
                        usersWithAdmin.map((user, index) => {
                            return <li key={index}>{user.metadata.email}</li>
                        })
                    }
                </ul>
                <ul>
                    <li><strong>metadata</strong></li>
                    <li>{metadata.songName}</li>
                    <li>{Date(metadata.dateOfMostRecentEdit.seconds)}</li>
                </ul>
            </details> */}

            {
                userRole == 'admin' &&

                <AdminEditUsers 
                    // allSongData={allSongData} 
                    allSongData={realtimeSongData} 

                    // these should return the correct data, not rely on the component to sort it. one source of truth.
                    usersWithAccess={usersWithAccess} 
                    usersWithAdmin={usersWithAdmin}
                />
            }

            {/* <AddFileVersion allSongData={allSongData} /> */}
            <AddFileVersion realtimeSongData={realtimeSongData} usersWithAccess={usersWithAccess} usersWithAdmin={usersWithAdmin}/>
            <FileVersion songName={props.songDocumentId} userRole={userRole} songDocumentId={metadata.documentId}/>

            
            {/* <FileVersion songName={metadata.songName} userRole={userRole}/> */}
            {/* <h1>ye</h1> */}


        </div>
        :
        <h1>LOADING (or u dont have permission)</h1>
        )
    }
    
    // <h1>reminders / tasks</h1>
    // <h1>audio player</h1>
    // <h1>live chat</h1>