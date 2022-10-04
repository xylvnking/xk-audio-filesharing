
import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { useAuthState } from "react-firebase-hooks/auth"
import { db, auth, provider } from '../../../firebase/firebase-config'
import { signInWithGoogle, signUserOut } from '../../Audio/AuthFolder/Auth'
// import styles from './Styles/StudioSongPreview.module.scss'
import styles from './Styles/Studio.module.scss'
import { doc, getDoc, query, where, orderBy, limit, collection, getDocs, onSnapshot  } from "firebase/firestore";
import AddSong from './AddSong/AddSong'

// import {
//     getAllSongDataFromFirebase
// } from './Scripts/StudioHomeScripts'

// import { useRealtimeDataFromEverySongWithAccess } from '../AudioUtilitiesAndHooks'




// export const UserContext = React.createContext() // this could have been a prop but I wanted to try it out

export default function StudioHomeComponent() {

    const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)

    const [realtimeSongsWithAccessData, setRealtimeSongsWithAccessData] = useState(null)
    // console.log(realtimeSongsWithAccessData)

    const [addingSong, setAddingSong] = useState(false)

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
        <main className={styles.mainContainer}>
            {/* {
                !userAuthIsLoading && userAuth && <button onClick={signUserOut}> Sign Out</button>
            }
            {
                !userAuthIsLoading && !userAuth && <button onClick={signInWithGoogle}> Sign In</button>
            } */}
            {/* <Link href='/audio/studio/addsong'>
                <button>ADD SONG</button>
            </Link> */}
            {/* <button>
                Add Song
            </button> */}

            {/* <h1>StudioHomeComponent</h1> */}
            
            <ul>
                {/* <li>+</li> */}
                <li className={styles.addNewSongButton} onClick={() => setAddingSong(true)}>
                    {
                        addingSong 
                        ?
                        <AddSong />
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M21.75 38.75V26.3H9.25v-4.55h12.5V9.25h4.55v12.5h12.5v4.55H26.3v12.45Z"/></svg>
                    }
                    {/* <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10.3 19.7v-6H4.275v-3.4H10.3V4.275h3.4V10.3h6.025v3.4H13.7v6Z"/></svg> */}
                </li>
                {
                    realtimeSongsWithAccessData &&
                    realtimeSongsWithAccessData.map((songData, index) => {
                        return (
                            <Link key={index} href={'/audio/studio/session/song/' + songData.metadata.documentId}>
                                <li key={index}>
                                    {songData.metadata.songName}

                                    {/* {songData.usersWithAccess} */}
                                </li>
                            </Link>
                        )
                    })
                }

            </ul>

        </main>
    )
}