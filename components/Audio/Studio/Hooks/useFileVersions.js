import React, { useState, useEffect, useRef } from 'react'
import { doc, getDoc, query, where, collection, getDocs, updateDoc } from "firebase/firestore";
import { db, auth, storage } from '../../../../firebase/firebase-config';
import { ref, uploadBytes, getDownloadURL, listAll, list, getStorage, deleteObject, updateMetadata, getMetadata} from "firebase/storage";

/*
    this hook:
    
*/



export const useFileVersions = (songDocumentId) => {

    const [fileVersionData, setFileVersionData] = useState(null) // could this be a ref? yes right? it doesn't need to rerender anything, there's no ui here
    // console.log('thing calling')

    useEffect(() => {
        if (auth, songDocumentId) { // require official auth here makes it so that they can only access songs they're authorized on anyways according to security rules
            
            let temporaryFileVersionsArray = []
            const getFileVersionDataFromFirebase = async () => {

                let fileVersionsExist = false

                const fileVersionsSnapshot = await getDocs(collection(db, 'songs', songDocumentId, 'fileVersions')).catch((error) => {
            alert(error)
          })
                fileVersionsSnapshot.forEach((fileVersion) => {
                    // console.log('file versions exist')
                    // console.log('thing')
                    fileVersionsExist = true
                    temporaryFileVersionsArray.push(fileVersion.data())
                    
                    // console.log(fileVersion.id)
                })
                let temporaryFileVersionArrayToSetToState = []
                
                // console.log(temporaryFileVersionsArray)
                temporaryFileVersionsArray.sort(function(a, b) {
                    return a.dateOfMostRecentEdit.seconds - b.dateOfMostRecentEdit.seconds
                    // return a.fileVersionName + b.fileVersionName
                }).reverse()
                // console.log('ok')
                
                // let currentFileVersion = temporaryFileVersionsArray[temporaryFileVersionsArray.length - 1]
                let currentFileVersion = temporaryFileVersionsArray[0]
                temporaryFileVersionArrayToSetToState.push(currentFileVersion)



                

                console.log(currentFileVersion)






                // generate download link from firebase and set it as the 2nd element returned by the hook
                let fileVersionDownloadURL = []

                if (currentFileVersion) { // blocks unless at least one file version exists
                    const fileVersionAudioFileReference = ref(storage, currentFileVersion.filePathReference)
                    // console.log('got download url')
                    await getDownloadURL(fileVersionAudioFileReference).then((url) => {
                        fileVersionDownloadURL = url
                    })
                    temporaryFileVersionArrayToSetToState.push(fileVersionDownloadURL)
                    
                    // console.log(currentFileVersion)
                    // const pathReference = `songs/${songDocumentId}/${currentFileVersion.fileVersionName}`
                    // const folderRef = ref(storage, pathReference)
                    // await getMetadata(folderRef).then((currentMetadata) => {
                    //     let x = currentMetadata
                    //     x.customMetadata[auth.currentUser.uid] = 
                        
                    // })




                    // this is where we were getting the download url, but having trouble with sec so trying to sort it
                    // console.log('ok')


                    // to update storage
                    // dsdxGrUhqVcdhLpEP3kSeSW6Axi2



    
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
