import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './_AudioNav.module.scss'
// import Auth from '../../AuthFolder/Auth'
import { auth, provider } from '../../../../firebase/firebase-config'
import { useAuthState } from "react-firebase-hooks/auth"


export default function AudioNav(props) {
    const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)
    
    return (
        // <main className={styles.containerContainer}>
            <div className={styles.container}>
                <nav>
                    <div className={styles.navButton}>
                        <Link href='/'>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M15.45 43.1v-8.5h17.1v8.5ZM4.85 32.95v-9.7q0-.65.25-1.325.25-.675.85-1.025l15.9-14.2q.45-.35 1-.55.55-.2 1.15-.2.6 0 1.15.2.55.2 1 .55l4.25 3.8Zm3.2 10.15q-1.35 0-2.275-.95-.925-.95-.925-2.3V35.8l8.55-7.5v14.8Zm26.55 0V25.65l-9.05-8.15 6.4-5.65 10.1 9.05q.55.45.825 1.05.275.6.275 1.3V39.9q0 1.35-.95 2.275-.95.925-2.25.925Z"/></svg>
                                <p>home</p>
                            </div>
                            {/* <p>home</p> */}
                            {/* <svg fill="#AB7C94" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M6.9 43.1V17.4L24.1 4.55 41.15 17.4v25.7H27.2V28.8h-6.45v14.3Zm4.55-4.55h4.75v-14.3h15.55v14.3h4.8V19.7L24.1 10.3l-12.65 9.4ZM24 24.4Z"/></svg> */}
                        </Link>
                    </div>
                    <div className={styles.navButton}>
                        <Link href='/audio/studio' passHref={true}>
                            <div >
                                {/* <p>studio</p> */}
                                {/* <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M5.25 38.95v-4h13.3v4Zm0-25.9v-4h21.7v4ZM21.05 43V30.75h4v4.2h17.7v4h-17.7V43Zm-6.5-12.95v-4.1h-9.3V22h9.3v-4.15h4v12.2Zm6.5-4.1V22h21.7v3.95Zm8.4-8.75V4.95h4v4.1h9.3v4h-9.3v4.15Z"/></svg> */}
                                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M25.15 19.25V14.7h6.5V5.3h4.55v9.4h6.5v4.55Zm6.5 23.45V21.8h4.55v20.9Zm-19.85 0v-8.95H5.3V29.2h17.55v4.55h-6.5v8.95Zm0-16.05V5.3h4.55v21.35Z"/></svg>
                                {/* https://fonts.google.com/icons?icon.query=music&icon.style=Sharp */}
                                <p>studio</p>
                            </div>
                        </Link>
                    </div>
                    {/* <div className={styles.navButton}>
                        <Link href='/audio/studio'
                        // search : profile
                        > 
                            
                            
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M11.4 34.7q3-2.05 6.075-3.175T24 30.4q3.5 0 6.625 1.175T36.7 34.7q2.05-2.7 2.925-5.225Q40.5 26.95 40.5 24q0-7-4.75-11.75T24 7.5q-7 0-11.75 4.75T7.5 24q0 3 .875 5.475Q9.25 31.95 11.4 34.7Zm12.6-9q-2.95 0-4.975-2.025Q17 21.65 17 18.7q0-2.9 2.025-4.95Q21.05 11.7 24 11.7q2.95 0 4.975 2.05Q31 15.8 31 18.75q0 2.9-2.025 4.925T24 25.7Zm0 19.35q-4.35 0-8.15-1.625-3.8-1.625-6.7-4.55-2.9-2.925-4.55-6.725t-1.65-8.2q0-4.2 1.65-8.05 1.65-3.85 4.55-6.75t6.7-4.575q3.8-1.675 8.2-1.675 4.2 0 8.05 1.675 3.85 1.675 6.75 4.575 2.9 2.9 4.575 6.75Q45.1 19.75 45.1 24q0 4.35-1.675 8.15-1.675 3.8-4.575 6.7-2.9 2.9-6.75 4.55T24 45.05Zm0-4.55q2.7 0 5.025-.675T33.95 37.2q-2.6-1.8-4.975-2.6-2.375-.8-4.975-.8-2.6 0-4.95.8t-4.9 2.6q2.55 1.95 4.85 2.625t5 .675Zm0-18.25q1.55 0 2.55-.975 1-.975 1-2.575 0-1.55-1-2.55-1-1-2.55-1-1.55 0-2.55 1-1 1-1 2.55 0 1.6 1 2.575 1 .975 2.55.975Zm0-3.55Zm.05 18.45Z"/></svg>
                        </Link>
                    </div> */}
                    <div className={styles.navButton}>
                    
                        {
                            userAuth ?

                            <Link href='/audio/profile'>
                                <div>
                                    <a className={styles.nextImageContainer}>
                                        <Image
                                            src={userAuth.photoURL}
                                            width={50}
                                            height={50}
                                            className={styles.nextImage}
                                            layout='fixed'
                                            // layout='fill'
                                            // objectFit='contain'
                                            style={{
                                                // borderRadius: '50%',
                                                // borderStyle: 'solid',
                                                // borderColor: 'red',
                                                // borderWidth: '10px'
                                            }}
                                        />
                                    </a>
                                    <p></p>
                                </div>
                            </Link>

                        :
                        <Link href='/audio/profile'>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m19.65 34.3-3.3-3.15 4.8-4.85H4.45v-4.55h16.6l-4.8-4.85 3.3-3.2L29.9 24.05Zm4.5 8.85V38.6h14.9V9.4h-14.9V4.8H43.6v38.35Z"/></svg>
                                <p>login</p>
                            </div>
                        </Link>
                        }
                    </div>
                </nav>
            </div>
        // </main>
    )
}
