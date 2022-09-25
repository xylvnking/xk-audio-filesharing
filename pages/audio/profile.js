import React from 'react'
import AudioLayout from '../../components/Audio/AudioLayout/AudioLayout'
// import {signInWithGoogle, signUserOut} from '../../components/Audio/AuthFolder/Auth'
// import { useAuthState } from "react-firebase-hooks/auth"
// import { auth } from '../../../firebase/firebase-config';
// import {auth, provider} from '../../firebase/firebase-config'
import ProfileMainComponent from '../../components/Audio/Profile/ProfileMainComponent'

export default function Profile() {
    return (
        <AudioLayout>
            <ProfileMainComponent />
        </AudioLayout>
    )
}
