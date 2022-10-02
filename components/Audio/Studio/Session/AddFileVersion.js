import React from 'react'

import { collection, addDoc, doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL, listAll, list, getStorage, deleteObject, updateMetadata, getMetadata} from "firebase/storage";
import { db, auth, storage } from '../../../../firebase/firebase-config';

export default function AddFileVersion(props) {

    // cons
    // console.log(props.realtimeSongData)
    
    
    const addFileVersion = async (event) => {
        event.preventDefault()
        

        const songDocumentId = props.realtimeSongData.metadata.documentId
        const songName = props.realtimeSongData.metadata.songName
        // TEMPORARY - THIS WILL BE FROM FILE
        const fileVersionName = event.target[1].value
        
        
        const dateOfMostRecentEdit = new Date()
        
        const fileToUpload = event.target[0].files[0]
        const pathReference = `songs/${songDocumentId}/${fileVersionName}`
        const folderRef = ref(storage, pathReference)
        await uploadBytes(folderRef, fileToUpload)
        const metadata2 = {
            customMetadata: {
                [auth.currentUser.uid]: 'admin'
            }
        }

        props.realtimeSongData.usersWithAccess.forEach((userUid) => {
            metadata2.customMetadata[userUid] = 'access'
        })
        props.realtimeSongData.usersWithAdmin.forEach((userUid) => {
            metadata2.customMetadata[userUid] = 'admin'
        })
        console.log(metadata2)
        await updateMetadata(folderRef, metadata2)
        // .catch((error) => {
        //     console.log('errrrrr')
        //     alert(error)
        // })
        
        // console.log('updating?')
        // console.log(metadata2)

        const fileVersionDocumentRef = await addDoc(collection(db, 'songs', songDocumentId, 'fileVersions'), {
            filePathReference: pathReference,
            fileVersionName: fileVersionName,
            dateOfMostRecentEdit: new Date(),
            revisionNote: `this is a revision note for: ${fileVersionName}`,
            downloadUrl: 'pathToStorageBucket',
            // usersWithAccess: props.usersWithAccess,
            // usersWithAdmin: props.usersWithAdmin,
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


        await getMetadata(folderRef).then((thing) => {
            console.log(thing)
        })


        
        // window.location.href=`/audio/studio/session/song/${props.realtimeSongData.metadata.documentId}`

    }


    return (
        <div>
            <form onSubmit={addFileVersion} className='simpleBorder'>
                <p><em>addFileVersion.js</em></p>

                <label htmlFor='fileSelectionButton'>fileSelectionButton</label>
                <input id='fileSelectionButton' type='file' required></input>

                <br />

                <label htmlFor='fileVersionTemp'>file version temp (see AddFileVersion.js)</label>
                <input type='text' id='fileVersionTemp' defaultValue='some file version name' required></input>

                <button type='submit'>submit</button>
            </form>

        </div>
    )
}
