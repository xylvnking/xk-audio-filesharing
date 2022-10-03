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
        // console.log(realtimeSongData)

    // const updateFileVersionsMetadata = async (userUidToAdd) => {
    //     // console.log(props.songDocumentId)
    //     console.log('ok')
        
    //     const listRef = ref(storage, `songs/${props.songDocumentId}`)

    //     listAll(listRef)
    //         .then((res) => {
    //             res.prefixes.forEach((folderRef) => {
    //             // All the prefixes under listRef.
    //             // You may call listAll() recursively on them.
    //             });
    //             res.items.forEach((itemRef) => {
    //             // All the items under listRef.
    //             // console.log(itemRef._location.path)
    //             const folderRef = ref(storage, itemRef._location.path)
    //             // console.log('yeah')
    //             getMetadata(folderRef)
    //             .then(async (currentMetadata) => {
    //                 if (currentMetadata)  {

    //                     const customMetadataLocal = currentMetadata.customMetadata
    //                     // let userId = auth.currentUser.uid
    //                     if (customMetadataLocal) {
    //                         // customMetadataLocal[userUidToAdd] = 'access'
    //                         customMetadataLocal[userUidToAdd] = 'admin'
    
    //                         const pathReference2 = `songs/${props.songDocumentId}/${itemRef.name}`
    //                         const filePathFolderRef = ref(storage, pathReference2)
    //                         // console.log(filePathFolderRef)
    //                         if (customMetadataLocal[userUidToAdd] == 'admin') {
    //                             // console.log('yeah')
    //                             await updateMetadata(filePathFolderRef, customMetadataLocal)
    //                         }
    //                 }

    //                     // console.log(customMetadataLocal)
    //                     // customMetadataLocal[auth.currentUser.uid] = 'admin'
    //                     // customMetadataLocal[auth.currentUser.uid] = 'access'
    //                     // console.log(customMetadataLocal)
    //                 }
    //                 // const filePathReference = `songs/${props.songDocumentId}/${itemRef.name}`
    //                 // console.log(currentMetadata.ref._location)
    //                 // console.log(listRef)
    //                 // if (currentMetadata) {
    //                 // }
                    
                    
    //             })
    //             });
    //         }).catch((error) => {
    //             console.log(error)
    //             // Uh-oh, an error occurred!
    //         });

    //     // const pathReference = `songs/${props.songDocumentId}/10`
    //     // const folderRef = ref(storage, pathReference)
    //     // await getMetadata(folderRef)
    //     // .then((currentMetadata) => {
    //     //     console.log(currentMetadata)
    //     //     // let x = currentMetadata
    //     //     // x.customMetadata[auth.currentUser.uid] = 
            
    //     //     })

    //     // const allFileVersionsSnapshot = await getDocs(collection(db, 'songs', props.songDocumentId, 'fileVersions'))
    //     // allFileVersionsSnapshot.forEach(async (FileVersion) => {
    //     //     // console.log(FileVersion.data())
    //     //     // console.log(FileVersion.data().metadata.fileVersionDocumentId)
    //     //     // // const pathReference = `songs/${props.songDocumentId}/${FileVersion.data().metadata.fileVersionDocumentId}`
    //     //     // const pathReference = `songs/${props.songDocumentId}/10`
    //     //     // const folderRef = ref(storage, pathReference)
    //     //     // await getMetadata(folderRef)
    //     //     // .then((currentMetadata) => {
    //     //     //     console.log(currentMetadata)
    //     //     //     // let x = currentMetadata
    //     //     //     // x.customMetadata[auth.currentUser.uid] = 
                
    //     //     //     })
    //     //     // await getMetadata(folderRef).then((currentMetadata) => {
    //     //     // console.log(currentMetadata)
    //     //     // let x = currentMetadata
    //     //     // x.customMetadata[auth.currentUser.uid] = 
            
    //     //     // })
    //     // })



    //     // allFileVersionsSnapshot.forEach(async (fileVersion, index) => {
    //     //     console.log(index)
    //     //     // const oldMetadata = await getMetadata(folderRef)
    //     //     // console.log(oldMetadata)
    
    //     // })

    // }
    // // updateFileVersionsMetadata()
    
    // // useEffect(() => {
    // //     // for each file version, update the metadata 
    // //     if (allSongData) {
    // //         console.log('useEffect')
    // //         updateFileVersionsMetadata()
    // //     }
    // // }, [allSongData])
    

    const addUser = async (event) => {
        event.preventDefault()
        const userUidToAdd = event.target[0].value
        const addAsAdminAlso = event.target[1].checked
        // console.log(event.target[1].checked)
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
                await updateFileVersionsMetadata(userUidToAdd)


                // // for each file version, update the metadata 
                // const allFileVersionsSnapshot = await getDocs(collection(db, 'songs', props.songDocumentId, 'fileVersions'))
                // allFileVersionsSnapshot.forEach(async (fileVersion, index) => {
                //     const pathReference = `songs/${props.songDocumentId}/${fileVersion.id}`
                //     const folderRef = ref(storage, pathReference)
                //     const oldMetadata = await getMetadata(folderRef)

                //     // await getMetadata(folderRef).then((currentMetadata) => {
                //     // console.log(currentMetadata)
                //     // let x = currentMetadata
                //     // x.customMetadata[auth.currentUser.uid] = 
                    
                //     // })
                // })



                // console.log(realtimeSongData)
                // const folderRef = ref(storage, pathReference)
                // await getMetadata(folderRef).then((currentMetadata) => {
                //     console.log(currentMetadata)
                //     // let x = currentMetadata
                //     // x.customMetadata[auth.currentUser.uid] = 
                    
                // })
            }
        }
        // window.location.href=`/audio/studio/session/song/${metadata.documentId}`
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