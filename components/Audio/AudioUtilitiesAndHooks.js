import { useState, useEffect, useRef } from 'react'
// import React, { useState, useEffect, useRef } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
// import { collection, query, where, getDocs, deleteDoc, doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { auth, db, provider } from '../../firebase/firebase-config';
import { useAuthState } from "react-firebase-hooks/auth"

// export const AudioUtilitiesAndHooks = () => {
//     const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)
//     const listener = onSnapshot(doc(db, 'songs', 'rppNJVW4vS735c37TSVZ'), (doc) => {
//         // console.log('Current data: ', doc.data())
//     })
//     return (
//         <div>AudioUtilitiesAndHooks</div>
//     )
// }

// called from StudioHomeComponent
// export const useRealtimeDataFromEverySongWithAccess = () => {

//     // const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)
    
//     const [realtimeSongsWithAccessData, setRealtimeSongsWithAccessData] = useState(null)
//     useEffect(() => {
//         // if (userAuth) {
//         if (auth.currentUser) {
//             // const songsWithAccess = query(collection(db, 'songs'), where('usersWithAccess', 'array-contains', userAuth.uid))
//             const songsWithAccess = query(collection(db, 'songs'), where('usersWithAccess', 'array-contains', auth.currentUser.uid))
//             const x = onSnapshot(songsWithAccess, (songsWithAccessSnapshot) => {
//                 const allData = []
//                 songsWithAccessSnapshot.forEach((doc) => {
//                     allData.push(doc.data())
//                 })
//                 setRealtimeSongsWithAccessData(allData)
//             })
//         }
//     // }, [userAuth])
//     }, [auth.currentUser])
//     if (realtimeSongsWithAccessData) {
//         return realtimeSongsWithAccessData
//     }
// }

export const userRealtimeSongData = (songDocumentId) => {
    const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)
    // const [realtimeSongData, setRealtimeSongData] = useState(null)
    const realtimeSongData = useRef(null)

    useEffect(() => {
        if (userAuth) {
            const snapshot = onSnapshot(doc(db, 'songs', songDocumentId), (doc) => {
                realtimeSongData.current = doc.data()
            })
        }
    }, [userAuth])

    if (realtimeSongData.current) {
        return(realtimeSongData.current)
    }

}


// 