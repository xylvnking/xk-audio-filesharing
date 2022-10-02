import React from 'react'

import { collection, addDoc, doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL, listAll, list, getStorage, deleteObject} from "firebase/storage";
import { db, auth, storage } from '../../../../firebase/firebase-config';

export default function AddSong() {

    const addSongToFirebase = async (event) => {
        event.preventDefault()


        const songName = event.target[0].value
        // const fileToUpload = event.target[1].files[0]
        // const projectName = event.target[2].value
        const dateOfMostRecentEdit = new Date()

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
        
        
        // const pathReference = `songs/${docRef.id}`
        // const folderRef = ref(storage, pathReference)
        // await uploadBytes(folderRef, fileToUpload).then((snapshot) => {
        //     getDownloadURL(snapshot.ref).then((url) => {
        //         console.log(url)
        //     })
        // })

        await updateDoc(songDocToUpdate, {
            'metadata.documentId': docRef.id
        })
        
        // window.location.href=`/audio/studio/session/song/${docRef.id}`

    }


  return ( // pop up menu to select team mebers with search would be rad but maybe asking a lot
    <div>
        <form onSubmit={addSongToFirebase}>

            
            <label htmlFor='songName'>Song name:</label>
            <input type='text' id='songName' defaultValue='songName7' required></input>
            
            {/* <label htmlFor='fileSelectionButton'>fileSelectionButton</label>
            <input id='fileSelectionButton' type='file'></input>
            
            <label htmlFor='projectName'>project name</label>
            <input type='hidden' id='projectName' defaultValue='projectName1' required></input>

            <label htmlFor='dateOfMostRecentEdit'>dateOfMostRecentEdit</label>
            <input type='hidden' id='dateOfMostRecentEdit' required readOnly defaultValue={new Date()}></input>
            
            <br /> */}
            <button type='submit'>submit</button>

        </form>
    </div>
  )
}
