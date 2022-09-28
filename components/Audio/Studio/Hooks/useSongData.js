import React, { useState, useEffect } from 'react'
import { doc, getDoc } from "firebase/firestore";

// import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from '../../../../firebase/firebase-config';

/*
    this hook:
        checks for authentication
        gets specified song data if the user is authorized on it

    I was going to pass in the uid as an argument, but then I realized anybody with access to the uid string could call this function
        so i need to check for auth from firebase directly instea, so that the function requires actual firebase auth,
            not just the uid gotten from it

    this hook is called on every render, but the useEffect's dependancy array makes sure the fetch doesn't actually execute
*/

export const useSongData = (songName, number) => {
    // const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)

    // let songData
    // console.log(auth)
    const [songData, setSongData] = useState(null)

    useEffect(() => {
        if (auth, songName) {
            const getSongDataFromFirebase = async () => {
                console.log('fetching songs from firebase...')
                setSongData('somedata')
                
            }
            getSongDataFromFirebase()
        }
    }, [auth, songName])

    if (songData) {
        return songData
    }
    
}
