import React, { useState, useEffect } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from '../../../../firebase/firebase-config';

/*
    this hook:
        checks for authentication
        gets specified song data if the user is authorized on it

    I was going to pass in the uid as an argument, but then I realized anybody with access to the uid string could call this function
        so i need to check for auth from firebase directly instea, so that the function requires actual firebase auth,
            not just the uid gotten from it

    this hook is called on every render, but the useEffect's dependancy array makes sure the fetch doesn't actually execute
*/

export const useSongData = (songName) => {

    const [songData, setSongData] = useState(null)

    useEffect(() => {
        if (auth, songName) { // require official auth here makes it so that they can only access songs they're authorized on anyways according to security rules
            const getSongDataFromFirebase = async () => {
                const documentReference = doc(db, "songs", songName);
                const documentSnapshot = await getDoc(documentReference);
                
                let documentData = []
                if (documentSnapshot.exists()) {

                    documentData.push(documentSnapshot.data())
                    documentData.push(documentSnapshot.data().metadata)
                    documentData.push(documentSnapshot.data().usersWithAccess)
                    documentData.push(documentSnapshot.data().usersWithAdmin)
                    documentData.push(documentSnapshot.data().subcomponentsPublic)
                    setSongData(documentData)
                } 
                // else {
                //     console.log("No such document!");
                // }
            }
            getSongDataFromFirebase()
        }
    }, [auth, songName])

    if (songData) {
        return songData
    } else {
        return []
    }
    
}
