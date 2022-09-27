import React, { useState, useEffect } from 'react'

import { auth, provider } from '../../../firebase/firebase-config'
import { useAuthState } from "react-firebase-hooks/auth"
import {signInWithGoogle, signUserOut} from '../../Audio/AuthFolder/Auth'

import Link from 'next/link'
import { useRouter } from 'next/router'
import Song from './Song'

export default function SongMainComponent() {
    const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)
    const router = useRouter()

    const [songName, setSongName] = useState('')
    useEffect(() => { // get song from router.query

        if (router.query.songName) {
            setSongName(router.query.songName[0])
        }

    }, [router.query])

    return (
        <>
            <Link href='/audio/profile'>
                {'< ' + 'profile'}
            </Link>
            {
                !userAuthIsLoading && userAuth && <button onClick={signUserOut}> Sign Out</button>
            }
            {
                !userAuthIsLoading && !userAuth && <button onClick={signInWithGoogle}> Sign In</button>
            }
            {/* {
                !userAuthIsLoading && userAuth &&
                
                <Song 
                    songName={songName}
                    userAuth={userAuth}
                />
            } */}
            {
                !userAuthIsLoading &&
                <Song 
                    songName={songName}
                    userAuth={userAuth}
                />

            }
            

        </>
    )
}
