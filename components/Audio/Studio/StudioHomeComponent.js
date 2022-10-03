
import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { useAuthState } from "react-firebase-hooks/auth"
import { db, auth, provider } from '../../../firebase/firebase-config'
import { signInWithGoogle, signUserOut } from '../../Audio/AuthFolder/Auth'
import styles from './Styles/StudioSongPreview.module.scss'
import { doc, getDoc, query, where, orderBy, limit, collection, getDocs, onSnapshot  } from "firebase/firestore";

// import {
//     getAllSongDataFromFirebase
// } from './Scripts/StudioHomeScripts'

// import { useRealtimeDataFromEverySongWithAccess } from '../AudioUtilitiesAndHooks'




// export const UserContext = React.createContext() // this could have been a prop but I wanted to try it out

export default function StudioHomeComponent() {

    const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)

    const [realtimeSongsWithAccessData, setRealtimeSongsWithAccessData] = useState(null)

    useEffect(() => {
        if (userAuth && !realtimeSongsWithAccessData) {
            const songsWithAccess = query(collection(db, 'songs'), where('usersWithAccess', 'array-contains', userAuth.uid))
            const unsubscribe = onSnapshot(songsWithAccess, (songsWithAccessSnapshot) => {
                const allData = []
                songsWithAccessSnapshot.forEach((doc) => {
                    allData.push(doc.data())
                })
                setRealtimeSongsWithAccessData(allData)
            })
            return () => {
                unsubscribe()
            }
        }
    }, [userAuth])

    return (
        <>
            {
                !userAuthIsLoading && userAuth && <button onClick={signUserOut}> Sign Out</button>
            }
            {
                !userAuthIsLoading && !userAuth && <button onClick={signInWithGoogle}> Sign In</button>
            }
            <Link href='/audio/studio/addsong'>
                <button>ADD SONG</button>
            </Link>

            <h1>StudioHomeComponent</h1>

            {
                realtimeSongsWithAccessData &&
                realtimeSongsWithAccessData.map((songData, index) => {
                    return (
                        <Link key={index} href={'/audio/studio/session/song/' + songData.metadata.documentId}>
                            <div className={styles.container} >
                                {songData.metadata.songName}
                            </div>
                        </Link>
                    )
                })
            }
        </>
    )
}