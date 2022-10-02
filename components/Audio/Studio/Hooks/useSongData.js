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

    It also checks for permissions, and returns nothing unless the users UID appears in the songs priviledge arrays
*/



// this hook works so long as the songDocumentId is valid, and the user is authorized to read the document

export const useSongData = (songDocumentId) => {

    const [songData, setSongData] = useState(null) // could this be a ref? yes right? it doesn't need to rerender anything, there's no ui here

    useEffect(() => {
        if (auth, songDocumentId) { // require official auth here makes it so that they can only access songs they're authorized on anyways according to security rules
            const getSongDataFromFirebase = async () => {
                const documentReference = doc(db, "songs", songDocumentId);
                const songDocumentSnapshot = await getDoc(documentReference);

                
                if (songDocumentSnapshot.exists()) {
                    
                    // this checks to see whether the user is listed as having access within the song document.
                    // if they aren't, the rest of the hook won't run, resulting in it returning undefined, blocking the ui render
                    // this might not be needed since it could be blocked with security rules, 
                        // but since i haven't implemented those yet, i'd rather do this now and remove it later if redundant.

                    // this fires off checks whether a user is attempting to access a song which they don't have access to
                    // the ui is already blocked without this, but this stops the rest of the hook from firing. unsure if needed tbh.
                    // security rules tackles this anyways i think but yeah, here it is if needed
                    let userHasAccess = false
                    const songsRef = collection(db, 'songs')
                    const userHasAccessToSong = query(songsRef, where('usersWithAccess', 'array-contains', auth.currentUser.uid), where('metadata.documentId', '==', songDocumentId))
                    const userHasAccessToSongSnapshot = await getDocs(userHasAccessToSong)
                    userHasAccessToSongSnapshot.forEach((song) => { userHasAccess = true })

                    // // //
                    // userHasAccess = true
                    if (userHasAccess == true) {
                        
                        let documentData = []
                        
                        const usersRef = collection(db, 'users');
                        
                        // create reference to documents within the users collection which claim to be authorized on the session song
                        const queryForUsersWithAccess = query(usersRef, where('songsWithAccess', 'array-contains', songDocumentId))
                        const queryForUsersWithAdmin = query(usersRef, where('songsWithAdmin', 'array-contains', songDocumentId))
                        
                        // get the data from the documents which claim to be authorized on the session song
                        const queryForUsersWithAccessSnapshot = await getDocs(queryForUsersWithAccess)
                        const queryForUsersWithAdminSnapshot = await getDocs(queryForUsersWithAdmin)
                        
                        /*
                        
                        // this block addresses technical debt incurred by not using the admin sdk
                        // since we need to remove access and admin from users but can't write directly to their documents
                        // we use a custom hook to update the users doc according to the priviledge array in the song doc
                        // thus exposing only the data each user should have access to through an intermediary way
                        // but since this doesn't happen until the other user opens the website, 
                        // we're stuck with 'ghost' users in the song documents priviledge array.
                        // this block filters out those ghost users by comparing the song priviledge arrays against the user docs which say they have access/admin
                        // eventually it will be deleted, but for the sake of keeping the components clean,
                        // i decided to complicate the hook and take care of it here.
                        
                        */
                                    // populate local variables with arrays of priviledged users according to the song's document
                                    let uidsWithAccessFromSongDoc = songDocumentSnapshot.data().usersWithAccess
                                    let uidsWithAdminFromSongDoc = songDocumentSnapshot.data().usersWithAdmin
                                    
                                    // for each document which claims to have access to the session song:
                                        // push all of that users data into a local array
                                        // push just the uid into a local array

                                    let usersWithAccess = []
                                    let uidsWhichSayTheyHaveAccess = [] // should be named id?
                                    queryForUsersWithAccessSnapshot.forEach((user) => {
                                        usersWithAccess.push(user.data())
                                        uidsWhichSayTheyHaveAccess.push(user.id)
                                    })

                                    let usersWithAdmin = []
                                    let uidsWhichSayTheyHaveAdmin = []
                                    queryForUsersWithAdminSnapshot.forEach((user) => {
                                        usersWithAdmin.push(user.data())
                                        uidsWhichSayTheyHaveAdmin.push(user.id)
                                    })

                                    // console.log(uidsWhichSayTheyHaveAccess)
                                    // console.log(uidsWithAccessFromSongDoc)


                                    const filteredSongUids = uidsWithAccessFromSongDoc.filter(x => uidsWhichSayTheyHaveAccess.includes(x))
                                    // console.log('filteredSongUids =>', filteredSongUids)
                                    // perform checks to make sure the users returned by the hook are validated by appearing in both the song doc, and the user docs which claim access

                                    // returns an array which has been filtered to remove any user docs uids which claim access but aren't listed in the song docs uids
                                    const userDocsCheckedAgainstSongDocsAccess = uidsWhichSayTheyHaveAccess.filter(x => uidsWithAccessFromSongDoc.includes(x))
                                    // returns an array which has been filtered to remove any song docs uids which claim access but aren't listed user docs uids
                                    const songDocsCheckedAgainstUserDocsAccess = uidsWithAccessFromSongDoc.filter(x => uidsWhichSayTheyHaveAccess.includes(x))
                                    // returns an array which removes any difference between the last two arrays
                                    const usersWithValidatedAccess = userDocsCheckedAgainstSongDocsAccess.filter(x => songDocsCheckedAgainstUserDocsAccess.includes(x))
                                    
                                    const userDocsCheckedAgainstSongDocsAdmin = uidsWhichSayTheyHaveAdmin.filter(x => uidsWithAdminFromSongDoc.includes(x))
                                    const songDocsCheckedAgainstUserDocsAdmin = uidsWithAdminFromSongDoc.filter(x => uidsWhichSayTheyHaveAdmin.includes(x))
                                    const usersWithValidatedAdmin = userDocsCheckedAgainstSongDocsAdmin.filter(x => songDocsCheckedAgainstUserDocsAdmin.includes(x))

                                    let usersWithValidatedAccessFullData = []
                                    let usersWithValidatedAdminFullData = []
                                    usersWithValidatedAccess.forEach((user, index) => {
                                        usersWithValidatedAccessFullData.push()
                                    }) 

                                    // for each user document which claimed priviledge,
                                        // determine whether their uid is included in the song document's priviledge array,
                                        // and if so, push all of that users data into the final array which is returned from the hook
                                    usersWithAccess.forEach((user, index) => {
                                        if (usersWithValidatedAccess.includes(user.metadata.uid)) {
                                            usersWithValidatedAccessFullData.push(user)
                                        }
                                    })
                                    usersWithAdmin.forEach((user, index) => {
                                        if (usersWithValidatedAdmin.includes(user.metadata.uid)) {
                                            usersWithValidatedAdminFullData.push(user)
                                        }
                                    })


                        // the order of these determines the order the hook must be destructured in
                        documentData.push(songDocumentSnapshot.data())
                        documentData.push(songDocumentSnapshot.data().metadata)
                        documentData.push(usersWithValidatedAccessFullData)
                        documentData.push(usersWithValidatedAdminFullData)
                        
    
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
            }
            getSongDataFromFirebase()
        }
    }, [auth, songDocumentId])
    
    if (songData) {
        // window.location.href=`/audio/studio/session/song/${songDocumentId}`;
        return songData
    } else {
        return []
    }
    
}
