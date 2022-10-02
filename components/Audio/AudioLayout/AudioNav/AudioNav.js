import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import audioNavStyles from './AudioNav.module.scss'
// import Auth from '../../AuthFolder/Auth'
import { auth, provider } from '../../../../firebase/firebase-config'
import { useAuthState } from "react-firebase-hooks/auth"

export default function AudioNav(props) {
    const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)
    
    return (
        <div className={audioNavStyles.container}>
            <nav>
                
                <Link href='/'>
                    <p>Home</p>
                </Link>
                
                <Link href='/audio/studio'>
                    <p>Studio</p>
                </Link>
                <Link href='/audio/profile'>
                    <p>Profile</p>
                </Link>

                {
                    userAuth &&
                    <Link href='/audio/profile'>
                        <a>
                        {/* <p>Profile</p> */}
                            <Image
                                src={userAuth.photoURL}
                                width={50}
                                height={50}
                                layout='fixed'
                                style={{borderRadius: '50%'}}
                            />
                        </a>
                    </Link>
                }
            </nav>
        </div>
    )
}
