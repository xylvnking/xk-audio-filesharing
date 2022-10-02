
import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, provider } from '../../../firebase/firebase-config'
import { signInWithGoogle, signUserOut } from '../../Audio/AuthFolder/Auth'
import styles from './Styles/StudioSongPreview.module.scss'

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
                
                setAllSongData(await getAllSongDataFromFirebase(userAuth.uid)) // array

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