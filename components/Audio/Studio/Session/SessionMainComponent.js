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

    const [allSongData, metadata, usersWithAccess, usersWithAdmin, subcomponents] = useSongData(props.songName)
    // const songData = useSongData(props.songName)
    // console.log(songData)
    
    return (
        props.songName && allSongData ? // this stops the entire component from rendering unless the router.query has been put into state
        <div>
            {
                <Link href='/audio/studio'>
                    {'< studio'}
                </Link>
            }
            <h1>WELCOME TO THE SESH!!!</h1>
            <h2>{props.songName}</h2>
            <ul>
                <li><strong>users with access</strong></li>
                {
                    usersWithAccess.map((user, index) => {
                        return <li key={index}>{user}</li>
                    })
                }
            </ul>

        </div>
        :
        <h1>LOADING</h1>
    )
}
