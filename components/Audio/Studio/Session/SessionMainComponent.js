import React, { useState, useEffect, useMemo } from 'react'
// import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSongData } from '../Hooks/useSongData'
import { useAuthState } from "react-firebase-hooks/auth"

import { auth, provider } from '../../../../firebase/firebase-config'

/*

    - get all data
    - display all data
    - similarish to 'song' component
    - but also link to the file versions? or just include the most recent file version here?
        - either way they'll need to be fetched for previews
    - admins will have some extra parts to manage permissions and write to docs
        - i'm currently going to give admins all the same powers, but maybe that requires an 'owner' who is the only one who can actually add admins
            - and i need to make sure everything is backed up somewhere just in case but I was going to do that anyways
    I think using context here might be smart, because with the file versions or something there might end up being a lot of nesting



    
    custom song data fetching hook?
    

*/

// main component rendered from /audio/studio/session/song/[...songSession].js
export default function SessionMainComponent(props) {
    // const router = useRouter()
    // const [songName, setSongName] = useState(null) // if you change [..songSession] page name you'll need to change this
    // const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)
    // const songData = useSongData(songName, ?userUID?)
    
    // setting songName state from router query
    // useEffect(() => {
    //     if (router.query.songSession) {
    //         setSongName(router.query.songSession[0])
    //     }
    // }, [router.query])
    const [number, setNumber] = useState(0)

    const thing = useSongData(props.songName, number)
    // const [songDataNew, setSongDataNew] = useState(useSongData(props.songName, number))
    // const memoizedSongData = useMemo(() => useSongData(props.songName, number), [props.songName, number])
    // console.log(`thing is: ${thing}`)
    
    return (
        props.songName && // this stops the entire component from rendering unless the router.query has been put into state
        <div>
            <button onClick={() => setNumber(number + 1)}> plus number </button>
            {
                <Link href='/audio/studio'>
                    {'< studio'}
                </Link>
            }
            <h1>WELCOME TO THE SESH!!!</h1>
            <h2>{props.songName}</h2>

        </div>
    )
}
