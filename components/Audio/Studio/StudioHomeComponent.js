
import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, provider } from '../../../firebase/firebase-config'
import { signInWithGoogle, signUserOut } from '../../Audio/AuthFolder/Auth'
import styles from './Styles/StudioSongPreview.module.scss'

import {
    getAllSongDataFromFirebase
} from './Scripts/StudioHomeScripts'

import StudioSongPreview from './StudioSongPreview'



export const UserContext = React.createContext() // this could have been a prop but I wanted to try it out

export default function StudioHomeComponent() {

    const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)
    const [allSongData, setAllSongData] = useState(null) // array


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
            {
                !userAuthIsLoading && userAuth && // should be auth?
                <UserContext.Provider value={userAuth}> // should be auth?
                    <p>user info</p>
                    <p>projects member on</p>
                    <p>projects admin on</p>
                    <p>songs member on</p>
                    <p>songs admin on</p>

                    {
                        allSongData &&
                        allSongData.map((songData, index) => {
                            
                            // i need to pass in the song DOCUMENT id here
                            // return <StudioSongPreview key={index} songData={songData} userAuth={userAuth}/> // should be auth?
                            return (
                                // <h3 className={styles.container} key={index}>{songData.metadata.songName}</h3>
                                    <Link key={index} href={'/audio/studio/session/song/' + songData.metadata.documentId}>
                                        <div className={styles.container} >
                                            {songData.metadata.songName}
                                        </div>
                                    </Link>
                                
                            )
                            

                        })
                    }




                </UserContext.Provider>
            }
        </>
    )
}