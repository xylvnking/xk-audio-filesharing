import React from 'react'

import { collection, addDoc, doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { db } from '../../../../firebase/firebase-config';


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

    }


  return ( // pop up menu to select team mebers with search would be rad but maybe asking a lot
    <div>
        <form onSubmit={addSongToFirebase}>
            <label htmlFor='songName'>song name<em>(implement regex)</em></label>


            <input type='text' id='songName' defaultValue='songName7' required></input>

            <br />

            <label htmlFor='fileSelectionButton'>fileSelectionButton</label>
            <input id='fileSelectionButton' type='file'></input>

            <br />

            <label htmlFor='projectName'>project name</label>
            <input type='text' id='projectName' defaultValue='projectName1' required></input>

            <br />

            <label htmlFor='dateOfMostRecentEdit'>dateOfMostRecentEdit</label>
            <input type='text' id='dateOfMostRecentEdit' required readOnly defaultValue={new Date()}></input>
            
            <br />
            <button type='submit'>submit</button>

        </form>
    </div>
  )
}
