import React from 'react'

import { collection, addDoc, doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL, listAll, list, getStorage, deleteObject, updateMetadata, getMetadata} from "firebase/storage";
import { db, auth, storage } from '../../../../firebase/firebase-config';
import styles from '../Styles/AddFileVersion.module.scss'

export default function AddFileVersion(props) {
    
    const addFileVersion = async (event) => {
        event.preventDefault()
        
        const songDocumentId = props.allSongData.metadata.documentId
        
        const fileVersionName = event.target[1].value
        
        const fileToUpload = event.target[0].files[0]
        const pathReference = `songs/${songDocumentId}/${fileVersionName}`
        const folderRef = ref(storage, pathReference)
        await uploadBytes(folderRef, fileToUpload)
        const metadata2 = {
            customMetadata: {
                [auth.currentUser.uid]: 'admin'
            }
        }

        props.allSongData.usersWithAccess.forEach((userUid) => {
            metadata2.customMetadata[userUid] = 'access'
        })
        props.allSongData.usersWithAdmin.forEach((userUid) => {
            metadata2.customMetadata[userUid] = 'admin'
        })

        await updateMetadata(folderRef, metadata2)

        const fileVersionDocumentRef = await addDoc(collection(db, 'songs', songDocumentId, 'fileVersions'), {
            filePathReference: pathReference,
            fileVersionName: fileVersionName,
            dateOfMostRecentEdit: new Date(),
            revisionNote: `this is a revision note for: ${fileVersionName}`,
            downloadUrl: 'pathToStorageBucket',
        })
        const fileVersionDocumentToUpdate = doc(db, 'songs', songDocumentId, 'fileVersions', fileVersionDocumentRef.id)
        await updateDoc(fileVersionDocumentToUpdate, {
            'metadata.fileVersionDocumentId': fileVersionDocumentRef.id,
        })
        
        window.location.href=`/audio/studio/session/song/${props.allSongData.metadata.documentId}`

    }


    return (
        <main className={styles.container}>
            <div className={styles.formContainer}>
                <form onSubmit={addFileVersion}>
                    <label htmlFor='fileSelectionButton' style={{display: 'none', color: 'rgb(51, 51, 51)'}}>fileSelectionButton</label>
                    <input id='fileSelectionButton' type='file' required className={styles.fileSelection}></input>
                    <label htmlFor='fileVersionTemp' className={styles.fileVersionNameLabel}>File Version Name:</label>
                    <input type='text' id='fileVersionTemp' defaultValue='' required spellCheck="false"></input>

                    <button type='submit'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 31.25q-1 0-1.65-.675Q21.7 29.9 21.7 29V13.45l-4.1 4.1q-.65.6-1.575.625-.925.025-1.525-.675-.7-.65-.7-1.6 0-.95.7-1.7l7.9-7.9q.3-.25.725-.45t.875-.2q.45 0 .875.2t.725.45l7.95 8q.7.65.675 1.6-.025.95-.675 1.6-.6.65-1.55.625-.95-.025-1.65-.675l-4.1-4V29q0 .9-.625 1.575Q25 31.25 24 31.25ZM10.25 42.2q-1.8 0-3.175-1.35Q5.7 39.5 5.7 37.55V30.5q0-.95.675-1.625T8 28.2q1 0 1.625.675t.625 1.625v7.1H37.7v-7.1q0-.95.65-1.625t1.6-.675q1 0 1.65.675.65.675.65 1.625v7.1q0 1.9-1.4 3.25T37.7 42.2Z"/></svg>
                        <p>Upload</p>
                    </button>
                </form>
            </div>

        </main>
    )
}
