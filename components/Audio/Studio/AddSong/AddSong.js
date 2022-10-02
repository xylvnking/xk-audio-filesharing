import React from 'react'

import { collection, addDoc, doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { db, auth } from '../../../../firebase/firebase-config';


/*
    https://firebase.google.com/docs/firestore/quotas
    Must be valid UTF-8 characters
    Must be no longer than 1,500 bytes
    Cannot contain a forward slash (/)
    Cannot solely consist of a single period (.) or double periods (..)
    Cannot match the regular expression __.*__

*/

export default function AddSong() {

    const addSongToFirebase = async (event) => {
        event.preventDefault()


        const songName = event.target[0].value
        const projectName = event.target[2].value
        const dateOfMostRecentEdit = new Date()
        // const dateOfMostRecentEdit = 789

        const uniqueSongNameForDocumentName = '?'

        const docRef = await addDoc(collection(db, 'songs'), {
            metadata: {
                songName: songName,
                dateOfMostRecentEdit: dateOfMostRecentEdit,
            },
            usersWithAccess: [
                auth.currentUser.uid
            ],
            usersWithAdmin: [
                auth.currentUser.uid
            ],
            subcomponentsPublic: [

            ]
        })
        // then the document id of the document we just created has to be put into the metadata
        const songDocToUpdate = doc(db, 'songs', docRef.id)
        await updateDoc(songDocToUpdate, {
            'metadata.documentId': docRef.id
        })


        // then the users document has to be updated 
        // to update the array in the users doc, it must be copied locally and replaced since we can't push into an array on firebase
        const tempSongsWithAccessArray = []
        const tempSongsWithAdminArray = []

        const userDocumentReference = doc(db, 'users', auth.currentUser.uid)
        const userDocumentReferenceSnapshot = await getDoc(userDocumentReference)
        if (userDocumentReferenceSnapshot.exists()) { // i think this check is redundant since only authorized users see this page anyways?

            tempSongsWithAccessArray = userDocumentReferenceSnapshot.data().songsWithAccess
            tempSongsWithAdminArray = userDocumentReferenceSnapshot.data().songsWithAdmin
            tempSongsWithAccessArray.push(docRef.id)
            tempSongsWithAdminArray.push(docRef.id)
            
            const userDocToUpdate = doc(db, 'users', auth.currentUser.uid)
            await updateDoc(userDocToUpdate, {
                songsWithAccess: tempSongsWithAccessArray,
                songsWithAdmin: tempSongsWithAdminArray
            })
        }
        




        // don't think i need to create file versions subcollection yet? depends on whether i'm letting them upload songs here or not

        window.location.href=`/audio/studio/session/song/${docRef.id}`


    }


  return ( // pop up menu to select team mebers with search would be rad but maybe asking a lot
    <div>
        <form onSubmit={addSongToFirebase}>

            {/* 0 */}
            <label htmlFor='songName'>song name<em>(implement regex)</em></label>
            <input type='text' id='songName' defaultValue='songName7' required></input>

            <br />

            {/* 1 */}
            <label htmlFor='fileSelectionButton'>fileSelectionButton</label>
            <input id='fileSelectionButton' type='file'></input>

            <br />

            {/* 2 */}
            <label htmlFor='projectName'>project name</label>
            <input type='text' id='projectName' defaultValue='projectName1' required></input>

            <br />

            {/* 3 */}
            <label htmlFor='dateOfMostRecentEdit'>dateOfMostRecentEdit</label>
            <input type='text' id='dateOfMostRecentEdit' required readOnly defaultValue={new Date()}></input>
            
            <br />
            <button type='submit'>submit</button>

        </form>
    </div>
  )
}
