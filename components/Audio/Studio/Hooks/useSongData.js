import React, { useState, useEffect } from 'react'
import { doc, getDoc, query, where, collection, getDocs } from "firebase/firestore";
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



// this hook works so long as the songName is valid, and the user ia authorized to read the document

export const useSongData = (songName) => {

    const [songData, setSongData] = useState(null) // could this be a ref? yes right? it doesn't need to rerender anything, there's no ui here

    useEffect(() => {
        if (auth, songName) { // require official auth here makes it so that they can only access songs they're authorized on anyways according to security rules
            const getSongDataFromFirebase = async () => {
                const documentReference = doc(db, "songs", songName);
                const songDocumentSnapshot = await getDoc(documentReference);
                
                let documentData = []
                let usersWithAccess = []
                let usersWithAdmin = []
                
                if (songDocumentSnapshot.exists()) {
                    // console.log('ye')

                    const usersRef = collection(db, 'users');
                    
                    const queryForUsersWithAccess = query(usersRef, where('songsAuthorizedOn', 'array-contains', songName))
                    const queryForUsersWithAdmin = query(usersRef, where('songsWithAdmin', 'array-contains', songName))
                    
                    const queryForUsersWithAccessSnapshot = await getDocs(queryForUsersWithAccess)
                    const queryForUsersWithAdminSnapshot = await getDocs(queryForUsersWithAdmin)
                    
                    queryForUsersWithAccessSnapshot.forEach((user) => {
                        usersWithAccess.push(user.data())
                    })
                    queryForUsersWithAdminSnapshot.forEach((user) => {
                        usersWithAdmin.push(user.data())
                    })
                    
                    documentData.push(songDocumentSnapshot.data())
                    documentData.push(songDocumentSnapshot.data().metadata)
                    documentData.push(usersWithAccess)
                    documentData.push(usersWithAdmin)

                    if (songDocumentSnapshot.data().usersWithAdmin.includes(auth.currentUser.uid)) {
                        documentData.push('admin')
                    } else if (songDocumentSnapshot.data().usersWithAccess.includes(auth.currentUser.uid)) {
                        documentData.push('access')
                        console.log('access only')
                    } 
                    
                    // documentData.push
                    // documentData.push(songDocumentSnapshot.data().usersWithAccess)
                    // documentData.push(songDocumentSnapshot.data().usersWithAdmin)
                    // documentData.push(songDocumentSnapshot.data().subcomponentsPublic)
                    setSongData(documentData)
                } 
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
