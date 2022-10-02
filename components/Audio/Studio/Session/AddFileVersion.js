import React from 'react'

import { collection, addDoc, doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { db, auth } from '../../../../firebase/firebase-config';

export default function AddFileVersion(props) {

    // cons
    
    
    const addFileVersion = async (event) => {
        event.preventDefault()

        const songDocumentId = props.realtimeSongData.metadata.documentId
        const songName = props.realtimeSongData.metadata.songName
        // TEMPORARY - THIS WILL BE FROM FILE
        const fileVersionName = event.target[1].value
        
        // const projectName = event.target[2].value
        const dateOfMostRecentEdit = new Date()
        // const dateOfMostRecentEdit = 789

        const fileVersionDocumentRef = await addDoc(collection(db, 'songs', songDocumentId, 'fileVersions'), {
            fileVersionName: fileVersionName,
            dateOfMostRecentEdit: new Date(),
            revisionNote: `this is a revision note for: ${fileVersionName}`,
            downloadUrl: 'pathToStorageBucket',
            usersWithAccess: props.usersWithAccess,
            usersWithAdmin: props.usersWithAdmin,
            // metadata: {
            //     fileVersionName: fileVersionName,
            //     // dateOfMostRecentEdit: '666',
            //     revisionNote: `this is a revision note for: ${fileVersionName}`,
            //     downloadUrl: 'pathToStorageBucket'
            // }
        }).catch((error) => {
            console.log('errrrrr')
            alert(error)
        })
        const fileVersionDocumentToUpdate = doc(db, 'songs', songDocumentId, 'fileVersions', fileVersionDocumentRef.id)
        await updateDoc(fileVersionDocumentToUpdate, {
            'metadata.fileVersionDocumentId': fileVersionDocumentRef.id,
            // 'metadata.fileVersionDocumentId': fileVersionDocumentRef.id,
        }).catch((error) => {
            alert(error)
        })




        
        window.location.href=`/audio/studio/session/song/${props.realtimeSongData.metadata.documentId}`

    }


    return (
        <div>
            <form onSubmit={addFileVersion} className='simpleBorder'>
                <p><em>addFileVersion.js</em></p>

                <label htmlFor='fileSelectionButton'>fileSelectionButton</label>
                <input id='fileSelectionButton' type='file'></input>

                <br />

                <label htmlFor='fileVersionTemp'>file version temp (see AddFileVersion.js)</label>
                <input type='text' id='fileVersionTemp' defaultValue='some file version name' required></input>

                <button type='submit'>submit</button>
            </form>

        </div>
    )
}
