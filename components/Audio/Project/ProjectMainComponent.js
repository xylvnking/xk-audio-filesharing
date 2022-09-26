import React, { useState, useEffect } from 'react'

import { auth, provider } from '../../../firebase/firebase-config'
import { useAuthState } from "react-firebase-hooks/auth"
import { signInWithGoogle, signUserOut } from '../../Audio/AuthFolder/Auth'

import Link from 'next/link'
import { useRouter } from 'next/router'
import Project from './Project'

export default function ProjectMainComponent() {
    const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)
    const router = useRouter()

    const [projectName, setProjectName] = useState('')
    useEffect(() => { // get song from router.query

        if (router.query.projectName) {
            // console.log(router.query.projectName)
            setProjectName(router.query.projectName[0])
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
            {
                !userAuthIsLoading && userAuth &&
                
                <Project 
                    projectName={projectName}
                    userAuth={userAuth}
                />
                // :
                // <h1>Sorry, the song you're looking for ({songName}) either doesnt exist or you dont have permission to view it. Make sure you got the title right, and/or that it shows up on your profile as a song you're authorized to view.</h1>
            }
        </>

    )
}
