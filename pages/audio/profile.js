import React from 'react'
import AudioLayout from '../../components/Audio/AudioLayout/AudioLayout'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, provider } from '../../firebase/firebase-config'
import { signInWithGoogle, signUserOut } from '../../components/Audio/AuthFolder/Auth'

export default function Profile() {
    const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)
    return (
            // <h1>this is where the user will manage their info</h1>
            <div>
                {
                    !userAuthIsLoading && userAuth && <button onClick={signUserOut}> Sign Out</button>
                }
                {
                    !userAuthIsLoading && !userAuth && <button onClick={signInWithGoogle}> Sign In</button>
                }
            </div>
    )
}
