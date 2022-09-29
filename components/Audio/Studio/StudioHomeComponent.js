
import React, { useState, useEffect, useContext } from 'react'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, provider } from '../../../firebase/firebase-config'
import { signInWithGoogle, signUserOut } from '../../Audio/AuthFolder/Auth'

import {
    getAllSongDataFromFirebase
} from './Scripts/StudioHomeScripts'

import StudioSongPreview from './StudioSongPreview'



export const UserContext = React.createContext() // this could have been a prop but I wanted to try it out

export default function StudioHomeComponent() {

    const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)
    const [allSongData, setAllSongData] = useState(null) // array

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
                            // return <h1>{songData.metadata.songName}</h1>
                            return <StudioSongPreview key={index} songData={songData} userAuth={userAuth}/> // should be auth?
                            // return <StudioSongPreview key={index} songData={songData}/>
                            // cause then within each one, you could access what you needed with
                            // props.songData.metadata  or  props.songData.usersWithAccess   etc

                        })
                    }




                </UserContext.Provider>
            }
        </>
    )
}