import React from 'react'
import AudioNav from './AudioNav/AudioNav'
// import { useAuthState } from "react-firebase-hooks/auth"
// import { auth, provider } from '../../../firebase/firebase-config'

export default function AudioLayout({ children }) {

  return (
    <>
        <AudioNav />
    <main>
        {children}
    </main>
    </>
  )
}
