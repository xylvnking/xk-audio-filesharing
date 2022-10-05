import React from 'react'
import styles from './Profile.module.scss'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, provider } from '../../../firebase/firebase-config'
import { signInWithGoogle, signUserOut } from '../AuthFolder/Auth'

export default function ProfileMainComponent() {
    const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)

    

    // console.log(userAuth)
    return (
            // <h1>this is where the user will manage their info</h1>
            <div className={styles.profileContainer}>
                {
                    userAuth ?
                    <main className={styles.container}>
                        
                        <ul>
                            <li>
                                <h1>
                                    {userAuth.displayName}
                                </h1>
                            </li>
                            <li>
                                <h2>
                                    <span style={{fontWeight: 400}}>{userAuth.email}</span>
                                </h2>
                            </li>
                            <li>
                                <h2>
                                    UID: <span style={{fontWeight: 400}}>{userAuth.uid}</span>
                                </h2>
                            </li>
                            <li>
                                <h2>
                                    Account created: <span style={{fontWeight: 400}}>{userAuth.metadata.creationTime}</span>
                                </h2>
                            </li>
                            <li>
                                <h2>
                                    Last sign in: <span style={{fontWeight: 400}}>{userAuth.metadata.lastSignInTime}</span>
                                </h2>
                            </li>
                        </ul>
                        <button onClick={signUserOut} className={styles.signOutButton}>Sign Out</button>
                    </main>
                    :
                    <div className={styles.signInButtonContainer}>
                        <button onClick={signInWithGoogle} className={styles.signInButton}>Sign In</button>
                    </div>
                }
            </div>
    )
}
