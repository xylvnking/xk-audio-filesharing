import React, { useState, useEffect, useRef } from 'react'
import { doc, getDoc, query, where, collection, getDocs, updateDoc } from "firebase/firestore";
import { db, auth } from '../../../../firebase/firebase-config';

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

                const fileVersionsSnapshot = await getDocs(collection(db, 'songs', songDocumentId, 'fileVersions'))
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
                // console.log(temporaryFileVersionsArray)
                
                // let currentFileVersion = temporaryFileVersionsArray[temporaryFileVersionsArray.length - 1]
                let currentFileVersion = temporaryFileVersionsArray[0]
                temporaryFileVersionArrayToSetToState.push(currentFileVersion, temporaryFileVersionsArray)

                setFileVersionData(temporaryFileVersionArrayToSetToState)

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
