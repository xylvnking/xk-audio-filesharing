import React, { useState, useEffect } from 'react'
import { doc, getDoc, query, where, collection, getDocs, updateDoc } from "firebase/firestore";
import { db, auth } from '../../../../firebase/firebase-config';

/*
    this hook:
    
*/

let revisionTypingTimer

export const useFileVersions = (songName) => {

    const [fileVersionData, setFileVersionData] = useState(null) // could this be a ref? yes right? it doesn't need to rerender anything, there's no ui here

    useEffect(() => {
        if (auth, songName) { // require official auth here makes it so that they can only access songs they're authorized on anyways according to security rules
            const getFileVersionDataFromFirebase = async () => {

                let fileVersionsExist = false

                let temporaryFileVersionsArray = []
                const fileVersionsSnapshot = await getDocs(collection(db, 'songs', songName, 'fileVersions'))
                fileVersionsSnapshot.forEach((fileVersion) => {
                    // console.log('file versions exist')
                    fileVersionsExist = true
                    temporaryFileVersionsArray.push(fileVersion.data())
                })
                
                // this is to return an array containing the most current file version 
                // (since 99% of the time its all that will be relevant)
                // which can then be destructured for easy access within the component
                
                let temporaryFileVersionArrayToSetToState = []
                let currentFileVersion = temporaryFileVersionsArray[temporaryFileVersionsArray.length - 1]


                temporaryFileVersionArrayToSetToState.push(currentFileVersion, temporaryFileVersionsArray)
                // same as above, but for whatever reason i forgot i can push multiple like this so i'm leaving this annoying note here so that i remember again while refactoring
                // temporaryFileVersionArrayToSetToState.push(currentFileVersion)
                // temporaryFileVersionArrayToSetToState.push(temporaryFileVersionsArray)


                
                
                
                // this hook also returns this function, which updates the revision not for the most recent file version
                
                if (fileVersionsExist) {
                    
                    
                    
                    // console.log(temp)
                    const fileVersionDocumentReference = doc(db, 'songs', songName, 'fileVersions', currentFileVersion.fileVersionName)
                    
                    
                    const functionTest = (textToUpdateRevisionNoteWith) => {
                        clearTimeout(revisionTypingTimer)
                        
                        revisionTypingTimer = setTimeout(() => {
                            updateDoc(fileVersionDocumentReference, {
                                revisionNote: textToUpdateRevisionNoteWith,
                            }).catch((error) => {
                                alert(`the document you're trying to edit has been deleted since you loaded the page`)
                            })
                        }, 500)
                       
                    }
                    
                    temporaryFileVersionArrayToSetToState.push(functionTest)
                } else {
                    // temporaryFileVersionArrayToSetToState.push()
                }

                // console.log(temporaryFileVersionArrayToSetToState)
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