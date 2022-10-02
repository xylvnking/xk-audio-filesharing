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
    const [songDocumentId, setSongDocumentId] = useState(null)

    useEffect(() => {
        if (router.query.songSession) {
            setSongDocumentId(router.query.songSession[0])
        }
    }, [router.query])

    return (
        <AudioLayout>
            {
            songDocumentId && auth &&
            // <SessionMainComponent songName={songName} userAuth={auth}/>
            <SessionMainComponent songDocumentId={songDocumentId} userAuth={auth}/>
            }
        </AudioLayout>
        // <AudioLayout>
        //   <SessionMainComponent />
        // </AudioLayout>
    )
}

export default songSession