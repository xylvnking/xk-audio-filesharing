import React, { useState, useEffect } from 'react'
import { doc, getDoc, query, where, collection, getDocs } from "firebase/firestore";
import { db, auth } from '../../../../firebase/firebase-config';

/*
    this hook:
    
*/


export const useFileVersions = (songName) => {

    const [fileVersionData, setFileVersionData] = useState(null)

    useEffect(() => {
        if (auth, songName) { // require official auth here makes it so that they can only access songs they're authorized on anyways according to security rules
            const getFileVersionDataFromFirebase = async () => {

                let temporaryFileVersionArray = []
                const fileVersionsSnapshot = await getDocs(collection(db, 'songs', songName, 'fileVersions'))
                fileVersionsSnapshot.forEach((fileVersion) => {
                    temporaryFileVersionArray.push(fileVersion.data())
                })

                // this is to return an array containing the most current file version 
                    // (since 99% of the time its all that will be relevant)
                // which can then be destructured for easy access within the component
                let currentFileVersion = temporaryFileVersionArray[temporaryFileVersionArray.length - 1]
                let temporaryFileVersionArrayToSetToState = []
                temporaryFileVersionArrayToSetToState.push(currentFileVersion, temporaryFileVersionArray)

                setFileVersionData(temporaryFileVersionArrayToSetToState)

            }
            getFileVersionDataFromFirebase()
        }
    }, [auth, songName])

    if (fileVersionData) {
        return fileVersionData
    } else {
        return []
    }
    
}
