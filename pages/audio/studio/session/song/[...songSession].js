import React, { useState, useEffect } from 'react'
import SessionMainComponent from '../../../../../components/Audio/Studio/Session/SessionMainComponent'
import { useRouter } from 'next/router'

import { auth,provider } from '../../../../../firebase/firebase-config'


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
            songDocumentId && auth &&
            // <SessionMainComponent songName={songName} userAuth={auth}/>
            <SessionMainComponent songDocumentId={songDocumentId} userAuth={auth}/>
    )
}

export default songSession