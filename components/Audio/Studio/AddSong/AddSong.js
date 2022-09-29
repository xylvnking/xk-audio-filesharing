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
        // users with access, users with admin ( or maybe make this be set in studio since there's access to that data already and it isn't NEEDED for the upload and would be optional anyways)
        // regex for google document rules (listed above)

        // perform check to see if project name already exists 

        // using song names as documents also might not work because what happens when two people use the same song name?
            // you'd have to have a way to differentiate between the different songs using 

        const songName = event.target[0].value
        const projectName = event.target[2].value
        const dateOfMostRecentEdit = new Date()

        const uniqueSongNameForDocumentName = '?'


        await setDoc(doc(db, 'songs', songName), {
            metadata: {
                songName: songName,
                dateOfMostRecentEdit: dateOfMostRecentEdit,
                projectName: projectName
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
