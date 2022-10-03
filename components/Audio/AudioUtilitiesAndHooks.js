import React, { useState, useEffect, useRef } from 'react'
import { collection, query, where, getDocs, deleteDoc, doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { auth, db, provider } from '../../firebase/firebase-config';
import { useAuthState } from "react-firebase-hooks/auth"

export const AudioUtilitiesAndHooks = () => {
    const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)
    const listener = onSnapshot(doc(db, 'songs', 'rppNJVW4vS735c37TSVZ'), (doc) => {
        // console.log('Current data: ', doc.data())
    })
    return (
        <div>AudioUtilitiesAndHooks</div>
    )
}

// const usersWithAccessToSongDocument = onSnapshot(doc(db, ''))


// export const getUserPrivilegeOnSong = (songDocumentId) => {
//     const userPrivilege = onSnapshot(doc(db, 'songs', songDocumentId), (doc) => {
//         console.log(doc.data.usersWithAccess)
//     })
// }

export const useRealtimeDataFromEverySongWithAccess = () => {

    const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)
    // const [realtimeSongsWithAccessData, setRealtimeSongsWithAccessData] = useState(null)
    const realtimeSongsWithAccessData = useRef(null)

    // const songsQuery = query(collection(db, 'songs'), where('usersWithAccess', 'array-contains', auth.currentUser.uid))
    useEffect(() => {
        if (userAuth) {
            const songsWithAccess = query(collection(db, 'songs'), where('usersWithAccess', 'array-contains', userAuth.uid))
            const x = onSnapshot(songsWithAccess, (songsWithAccessSnapshot) => {
                const allData = []
                songsWithAccessSnapshot.forEach((doc) => {
                    allData.push(doc.data())
                })
                // setRealtimeSongsWithAccessData(allData)
                realtimeSongsWithAccessData.current = allData
            })
        }
    }, [userAuth])
    if (realtimeSongsWithAccessData.current) {
        return realtimeSongsWithAccessData.current
    }
}

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