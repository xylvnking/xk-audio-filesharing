import React, { useState, useEffect } from 'react'
import AudioLayout from '../../../../../components/Audio/AudioLayout/AudioLayout'
import SessionMainComponent from '../../../../../components/Audio/Studio/Session/SessionMainComponent'
import { useRouter } from 'next/router'

import { useAuthState } from "react-firebase-hooks/auth"
import { auth,provider } from '../../../../../firebase/firebase-config'
// import AudioLayout from '../../../../components/Audio/AudioLayout/AudioLayout'
// import SessionMainComponent from '../../../../components/Audio/Studio/Session/SessionMainComponent'

// export default function studioSong() {
    //   console.log('studioSongPage')
    //   return (
        //           <SessionMainComponent />
        //       // <AudioLayout>
        //       // </AudioLayout>
        //     // <AudioLayout>
        //     //   <SessionMainComponent />
        //     // </AudioLayout>
        //   )
        // }
        
        
        // import React from 'react'
        

const songSession = () => {
    const router = useRouter()
    // const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth) // this isn't even needed???
    const [songName, setSongName] = useState(null)

    useEffect(() => {
        if (router.query.songSession) {
            setSongName(router.query.songSession[0])
        }
    }, [router.query])

    return (
        <AudioLayout>
            {
            songName && auth &&
            <SessionMainComponent songName={songName} userAuth={auth}/>
            }
        </AudioLayout>
        // <AudioLayout>
        //   <SessionMainComponent />
        // </AudioLayout>
    )
}

export default songSession