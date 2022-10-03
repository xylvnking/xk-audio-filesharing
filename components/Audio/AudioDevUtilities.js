import { doc, getDoc, query, where, collection, getDocs, updateDoc } from 'firebase/firestore'
import React, { useEffect, useRef } from 'react'

import { auth, provider, db } from '../../firebase/firebase-config'
import { useAuthState } from "react-firebase-hooks/auth"

// import { AudioUtilitiesAndHooks, useRealtimeDataFromEverySongWithAccess } from './AudioUtilitiesAndHooks'

/*

    this module fires off right away and does some housekeeping.
    since users with admin can remove others from the song documents, but can't write to other users docs,
    this script fires off when somebody opens the page and checks what songs their user document says it had access/admin on
    then queries the documents they actually have access/admin on, and updates their user document accordingly

    my intuition tells me i should have done this another way, 
    but honestly in a robust app i think this check would have been good either way.
    i think ideally it would be an additional check, and not required as critically as it is.

    live and learn.

*/


const resetFirebase = () => {
    fetch('/api/resetDatabase')
        .then((res) => res.json())
        .then((x) => {
            console.log(x)
        })
}



export default function AudioDevUtilities() {
    const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)

    useEffect(() => {
        const checkUserPriviledges = async () => {

            if (userAuth) {
                const userDocumentReference = doc(db, 'users', auth.currentUser.uid)
                const userDocumentSnapshot = await getDoc(userDocumentReference)

                let songsUserDocumentClaimsAccess
                let songsUserDocumentClaimsAdmin
                if (userDocumentSnapshot.exists()) {
                    songsUserDocumentClaimsAccess = userDocumentSnapshot.data().songsWithAccess
                    songsUserDocumentClaimsAdmin = userDocumentSnapshot.data().songsWithAdmin

                    let songsWithUserAccessValidated = []
                    let songsWithUserAdminValidated = []

                    const songsRef = collection(db, 'songs')

                    const querySongDocumentsWhereUserHasAccess = query(songsRef, where('usersWithAccess', 'array-contains', auth.currentUser.uid))
                    const querySongDocumentsWhereUserHasAdmin = query(songsRef, where('usersWithAdmin', 'array-contains', auth.currentUser.uid))

                    const querySongDocumentsWhereUserHasAccessSnapshot = await getDocs(querySongDocumentsWhereUserHasAccess)
                    const querySongDocumentsWhereUserHasAdminSnapshot = await getDocs(querySongDocumentsWhereUserHasAdmin)

                    querySongDocumentsWhereUserHasAccessSnapshot.forEach((document) => {
                        songsWithUserAccessValidated.push(document.id)
                    })
                    querySongDocumentsWhereUserHasAdminSnapshot.forEach((document) => {
                        songsWithUserAdminValidated.push(document.id)
                    })

                    await updateDoc(userDocumentReference, {
                        songsWithAccess: songsWithUserAccessValidated,
                        songsWithAdmin: songsWithUserAdminValidated
                    })







                }
            }


        }
        checkUserPriviledges()
    }, [userAuth])



    return (
        <>
            {/* <AudioUtilitiesAndHooks /> */}
            {/* {
      realTimeSongsWithAccessData &&
      <p>{realTimeSongsWithAccessData[0].metadata.songName}</p>
    } */}
            <button onClick={resetFirebase}>Reset Firebase</button>
            <button onClick={() => console.log(auth.currentUser)}>log auth</button>
            {/* <button onClick={() => console.log(userAuth)}>log auth</button> */}
            {/* <button onClick={() => console.log(auth.currentUser.uid)}>log auth</button> */}
        </>
    )
}
