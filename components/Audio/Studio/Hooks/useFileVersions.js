import React, { useState, useEffect, useRef } from 'react'
import { doc, getDoc, query, where, collection, getDocs, updateDoc } from "firebase/firestore";
import { db, auth, storage } from '../../../../firebase/firebase-config';
import { ref, uploadBytes, getDownloadURL, listAll, list, getStorage, deleteObject, updateMetadata, getMetadata} from "firebase/storage";

/*
    this hook returns:
        most recent file version,
        most recent file version download link,
        all file versions
*/


// used in FileVersion.js
export const useFileVersions = (songDocumentId) => {

    const [fileVersionData, setFileVersionData] = useState(null) // could this be a ref? yes right? it doesn't need to rerender anything, there's no ui here

    useEffect(() => {
        if (auth, songDocumentId) { // require official auth here makes it so that they can only access songs they're authorized on anyways according to security rules
            
            let temporaryFileVersionsArray = []
            const getFileVersionDataFromFirebase = async () => {

                let fileVersionsExist = false

                const fileVersionsSnapshot = await getDocs(collection(db, 'songs', songDocumentId, 'fileVersions')).catch((error) => {
                    alert(error)
                })

                fileVersionsSnapshot.forEach((fileVersion) => {
                    fileVersionsExist = true
                    temporaryFileVersionsArray.push(fileVersion.data())
                })

                let temporaryFileVersionArrayToSetToState = []

                temporaryFileVersionsArray.sort(function(a, b) {
                    return a.dateOfMostRecentEdit.seconds - b.dateOfMostRecentEdit.seconds
                }).reverse()

                let currentFileVersion = temporaryFileVersionsArray[0]
                temporaryFileVersionArrayToSetToState.push(currentFileVersion)

                // generate download link from firebase and set it as the 2nd element returned by the hook
                let fileVersionDownloadURL = []

                if (currentFileVersion) { // blocks unless at least one file version exists
                    const fileVersionAudioFileReference = ref(storage, currentFileVersion.filePathReference)
                    await getDownloadURL(fileVersionAudioFileReference).then((url) => {
                        fileVersionDownloadURL = url
                    })
                    temporaryFileVersionArrayToSetToState.push(fileVersionDownloadURL)
                    
                    temporaryFileVersionArrayToSetToState.push(temporaryFileVersionsArray)
    
                    setFileVersionData(temporaryFileVersionArrayToSetToState)
                }
            }
            getFileVersionDataFromFirebase()
        }
    }, [auth, songDocumentId])

    if (fileVersionData) {
        return fileVersionData
    } else {
        return []
    }
    
}
