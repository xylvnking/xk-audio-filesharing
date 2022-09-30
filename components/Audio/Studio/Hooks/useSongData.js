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





    /////



    // i think here is where the users with access array (which we then pass to adminEditUsers.js)
        // has to be edited to remove any users who are no longer a part of it
    // we've remove them from the song doc, 
        // but since this queries the users doc which clients aren't free to write to (unless it's their own)
        // we need to temporarily filter them out here since it's the first point where that data is created on the client
    // this is not ideal, and is technical debt which must be tackled later. 
    // it's just such a small thing that I'm not going to let it delay the entire project
    // the functionality is there, 
    // but i'm choosing to introduce the technical debt instead of muddying the components by making them filter the users list + that ruins the 'single source of truth'
    // to be specific, the technical debt is that when the admin removes a users admin/access,
        // it only removes them from the songs permissions arrays,
        // because they are only granted read access to eachothers data.
        // I can't provide them write access because then they could edit what other songs the user has access/admin on,
            // which obviously isn't good

    // the solution right now is to remove them from the songs permissions array with AdminEditUsers.js, 
        // since every admin has write access to the song doc
    // then remove them from the arrays we're creating locally here 
        // by first getting the songs the user's document claims to have access/admin for
        // then comparing that to the permission array for each song
        // and editing the arrays here to remove the UIDs which aren't included in both arrays from the local one
    // then the hacky part is that whenever the user visits the page next, 
        // a check would be done with a like, useCheckPriviledgeChange() hook to see whether any of their permissions need to change
        // because then we'll have access to the client who has permission to edit the document.

    // it feels a bit funny to have this sneaky script waiting for them, but that's the technical debt.
    // The crux of the problem is that team members can only be granted read access to each others documents
        // so when they edit permissions I currently have no direct way of updating the document of the user who's permission they want to change.

    // The admin sdk could probably handle this
    // or probably an intermediary collection of documents which hold reference to the priviledges
    // i'm not really sure, but my solution solves the problem and is what i'm doing for the mvp.

    // it is what it is
*/



// this hook works so long as the songDocumentId is valid, and the user ia authorized to read the document

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
                    if (userHasAccess == true) {
                        
                        let documentData = []
                        
                        const usersRef = collection(db, 'users');
                        
                        // create reference to documents within the users collection which claim to be authorized on the session song
                        const queryForUsersWithAccess = query(usersRef, where('songsAuthorizedOn', 'array-contains', songDocumentId))
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
                       
                                    // create local arrays
                                    //
                                    let uidsWhichSayTheyHaveAccess = [] // should be named id?
                                    let uidsWhichSayTheyHaveAdmin = []

                                    let usersWithAccess = []
                                    let usersWithAdmin = []

                                    let newAccessArray = []
                                    let newAdminArray = []

                                    let usersWithAccessFilteredAccordingToSongPriviledgeArrays = []
                                    let usersWithAdminFilteredAccordingToSongPriviledgeArrays = []

                                    // populate local variables with arrays of priviledged users according to the song's document
                                    let uidsWithAccessFromSongDoc = songDocumentSnapshot.data().usersWithAccess
                                    let uidsWithAdminFromSongDoc = songDocumentSnapshot.data().usersWithAdmin

                                    // for each document which claims to have access to the session song,
                                        // push all of that users data into a local array
                                        // push just the uid into a local array
                                    queryForUsersWithAccessSnapshot.forEach((user) => {
                                        usersWithAccess.push(user.data())
                                        uidsWhichSayTheyHaveAccess.push(user.id)
                                    })
                                    queryForUsersWithAdminSnapshot.forEach((user) => {
                                        usersWithAdmin.push(user.data())
                                        uidsWhichSayTheyHaveAdmin.push(user.id)
                                    })

                                    // for each priviledged uid in the array in the song's document
                                        // if that array contains one of the uids which claims to have access
                                            // add that uid to the array of users who's priviledge has been validated
                                    
                                            /*
                                                this might need further clarification because it is a bit clever (at least to me as a noob)
                                                this works because the number of user documents which have legitimate access is equal to the amount of uids the song document says has legitimate access
                                                so the foreach loops is just a way to iterate according to that number (the array length). it could have been a traditional for loop as well.
                                                this also means that this must be maintained from the other end - anytime a user's doc removes the song from the array which states which songs it has priviledges on, the song document must be updated.
                                            */
                                    
                                    uidsWithAccessFromSongDoc.forEach((uid, index) => {
                                        if (uidsWithAccessFromSongDoc.includes(uidsWhichSayTheyHaveAccess[index])) {
                                            newAccessArray.push(uidsWhichSayTheyHaveAccess[index])
                                        }
                                    })
                                    uidsWithAdminFromSongDoc.forEach((uid, index) => {
                                        if (uidsWithAdminFromSongDoc.includes(uidsWhichSayTheyHaveAdmin[index])) {
                                            newAdminArray.push(uidsWhichSayTheyHaveAdmin[index])
                                        }
                                    })

                                    // for each user document which claimed priviledge,
                                        // determine whether their uid is included in the song document's priviledge array,
                                        // and if so, push all of that users data into the final array which is returned from the hook
                                    usersWithAccess.forEach((user, index) => {
                                        if (newAccessArray.includes(user.metadata.uid)) {
                                            usersWithAccessFilteredAccordingToSongPriviledgeArrays.push(user)
                                        }
                                    })
                                    usersWithAdmin.forEach((user, index) => {
                                        if (newAdminArray.includes(user.metadata.uid)) {
                                            usersWithAdminFilteredAccordingToSongPriviledgeArrays.push(user)
                                        }
                                    })


                        // the order of these determines the order the hook must be destructured in
                        documentData.push(songDocumentSnapshot.data())
                        documentData.push(songDocumentSnapshot.data().metadata)
                        documentData.push(usersWithAccessFilteredAccordingToSongPriviledgeArrays) // formerly: documentData.push(usersWithAccess)
                        documentData.push(usersWithAdminFilteredAccordingToSongPriviledgeArrays) // formerly: documentData.push(usersWithAdmin)
                        
    
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
