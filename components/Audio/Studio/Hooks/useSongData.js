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



// this hook works so long as the songDocumentId is valid, and the user ia authorized to read the document

export const useSongData = (songDocumentId) => {

    const [songData, setSongData] = useState(null) // could this be a ref? yes right? it doesn't need to rerender anything, there's no ui here

    useEffect(() => {
        if (auth, songDocumentId) { // require official auth here makes it so that they can only access songs they're authorized on anyways according to security rules
            const getSongDataFromFirebase = async () => {
                const documentReference = doc(db, "songs", songDocumentId);
                const songDocumentSnapshot = await getDoc(documentReference);

                
                if (songDocumentSnapshot.exists()) {

                    // // // 
                    
                    // this checks to see whether the user is listed as having access within the song document.
                    // if they aren't, the rest of the hook won't run, resulting in it returning undefined, blocking the ui render
                    // this might not be needed since it could be blocked with security rules, 
                        // but since i haven't implemented those yet, i'd rather do this now and remove it later if redundant.

                    // this fires off checks whether a user is attempting to access a song which they don't have access to
                    // the ui is already blocked without this, but this stops the rest of the hook from firing. unsure if needed tbh.
                    let userHasAccess = false
                    const songsRef = collection(db, 'songs')
                    const userHasAccessToSong = query(songsRef, where('usersWithAccess', 'array-contains', auth.currentUser.uid), where('metadata.documentId', '==', songDocumentId))
                    const userHasAccessToSongSnapshot = await getDocs(userHasAccessToSong)
                    userHasAccessToSongSnapshot.forEach((song) => { userHasAccess = true })



                    




                    // // //
                    if (userHasAccess == true) {
                        // console.log('YAAA')
                        let documentData = []
                        let usersWithAccess = []
                        let usersWithAdmin = []
                    
                        // console.log('ye')
    
                        const usersRef = collection(db, 'users');
                        
                        const queryForUsersWithAccess = query(usersRef, where('songsAuthorizedOn', 'array-contains', songDocumentId))
                        const queryForUsersWithAdmin = query(usersRef, where('songsWithAdmin', 'array-contains', songDocumentId))
                        
                        const queryForUsersWithAccessSnapshot = await getDocs(queryForUsersWithAccess)
                        const queryForUsersWithAdminSnapshot = await getDocs(queryForUsersWithAdmin)

                        
                        // i think here is where the users with access array (which we then pass to adminEditUsers.js)
                            // has to be edited to remove any users who are no longer a part of it
                        // we've remove them from the song doc, 
                            // but since this queries the users doc which clients aren't free to write to (unless it's their own)
                            // we need to temporarily filter them out here since it's the first point where that data is created on the client
                        // this is not ideal, and is technical debt which must be tackled later. 
                        // it's just such a small thing that I'm not going to let it delay the entire project
                        // the functionality is there, 
                        // but i'm choosing to introduce the technical debt instead of muddying the components by making them filter
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
            }
            getSongDataFromFirebase()
        }
    }, [auth, songDocumentId])

    if (songData) {
        return songData
    } else {
        return []
    }
    
}
