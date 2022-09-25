import React from 'react'
import AudioLayout from '../../components/Audio/AudioLayout/AudioLayout'
import Auth from '../../components/Audio/AuthFolder/Auth'
import { useAuthState } from "react-firebase-hooks/auth"
// import { auth } from '../../../firebase/firebase-config';
import {auth, provider} from '../../firebase/firebase-config'

export default function Profile() {
    const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)

    return (
        <AudioLayout>

            <Auth />
            <div>Profile</div> :
            {/* {
                userAuth ?
                <div>Profile</div> :
                <Auth />
            } */}
        </AudioLayout>
    )
}
