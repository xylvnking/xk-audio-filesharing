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

// main component rendered from /audio/studio/session/song/[...songSession].js
export default function SessionMainComponent(props) {

    const [allSongData, metadata, usersWithAccess, usersWithAdmin, userRole] = useSongData(props.songDocumentId)

    const realtimeSongData = userRealtimeSongData(props.songDocumentId)

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

    const addUser = async (event) => {
        event.preventDefault()
        const userUidToAdd = event.target[0].value
        const addAsAdminAlso = event.target[1].checked
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
            {
                userRole == 'admin' &&
                <button onClick={() => deleteSong()}>DELETE SONG</button>
            }
            {
                userRole == 'admin' &&
                <form onSubmit={addUser}>
                    <label htmlFor='addsUser'>userUID:</label>
                    <input type='text' id='addUser' required></input>
                    <br />
                    <input type='checkbox' id='addAsAdmin'></input>
                    <label htmlFor='addAsAdmin'>Add as admin?:</label>
                    <button type='submit'>Add User</button>
                </form>
                
            }
            {
                userRole == 'admin' &&
                <AdminEditUsers 
                    allSongData={allSongData} 
                    usersWithAccess={usersWithAccess} 
                    usersWithAdmin={usersWithAdmin}
                />
            }
            {
                userRole == 'admin' &&
                <AddFileVersion allSongData={allSongData} usersWithAccess={usersWithAccess} usersWithAdmin={usersWithAdmin}/>
            }
            <FileVersion songName={props.songDocumentId} userRole={userRole} songDocumentId={metadata.documentId}/>


        </div>
        :
        <h1>LOADING (or u dont have permission)</h1>
        )
    }