import React from 'react'
import AudioLayout from '../../components/Audio/AudioLayout/AudioLayout'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, provider } from '../../firebase/firebase-config'
import { signInWithGoogle, signUserOut } from '../../components/Audio/AuthFolder/Auth'
import ProfileMainComponent from '../../components/Audio/ProfileFolder/ProfileMainComponent'

export default function Profile() {
    return (

        <ProfileMainComponent />
    )
}
