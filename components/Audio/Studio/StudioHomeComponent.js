
import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { useAuthState } from "react-firebase-hooks/auth"
import { db, auth, provider } from '../../../firebase/firebase-config'
import { signInWithGoogle, signUserOut } from '../../Audio/AuthFolder/Auth'
import styles from './Styles/StudioSongPreview.module.scss'
import { doc, getDoc, query, where, orderBy, limit, collection, getDocs  } from "firebase/firestore";

import {
    getAllSongDataFromFirebase
} from './Scripts/StudioHomeScripts'

import { useRealtimeDataFromEverySongWithAccess } from '../AudioUtilitiesAndHooks'




export const UserContext = React.createContext() // this could have been a prop but I wanted to try it out

export default function StudioHomeComponent() {

    const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)
    const [allSongData, setAllSongData] = useState(null) // array

    const realTimeSongsWithAccessData = useRealtimeDataFromEverySongWithAccess()


    // this could be in a custom hook?
    useEffect(() => {
        
        if (userAuth) {
            const getAllSongData = async () => {

                const songsRef = collection(db, 'songs');
                const songDocsAuthorizedOn = query(songsRef, where('usersWithAccess', 'array-contains', userAuth.uid))
                const querySnapshot = await getDocs(songDocsAuthorizedOn);

                let fetchedSongsDataTemp = []
                querySnapshot.forEach((doc) => {
                    fetchedSongsDataTemp.push(doc.data())
                })
                fetchedSongsDataTemp.sort(function(a, b) { // sort by date
                    return a.metadata.dateOfMostRecentEdit + b.metadata.dateOfMostRecentEdit
                })
                
                setAllSongData(fetchedSongsDataTemp)
                
                // setAllSongData(await getAllSongDataFromFirebase(userAuth.uid)) // array

            }
            getAllSongData()
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
            {/* {
                !userAuthIsLoading && userAuth &&
                <UserContext.Provider value={userAuth}>
                    {
                        allSongData &&
                        allSongData.map((songData, index) => {
                            return (
                                    <Link key={index} href={'/audio/studio/session/song/' + songData.metadata.documentId}>
                                        <div className={styles.container} >
                                            {songData.metadata.songName}
                                        </div>
                                    </Link>   
                            )
                        })
                    }
                </UserContext.Provider>
            } */}
            {
                realTimeSongsWithAccessData &&
                realTimeSongsWithAccessData.map((songData, index) => {
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