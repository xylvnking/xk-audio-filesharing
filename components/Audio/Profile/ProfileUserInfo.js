import React, { useContext } from 'react'
import { UserContext } from './ProfileMainComponent'
import Image from 'next/image'

export default function ProfileUserInfo() {
    const userAuth = useContext(UserContext)
  return (
    <ul>
        <Image src={userAuth.photoURL} width={100} height={100} style={{borderRadius: '50%'}}/>
        <li>{userAuth.displayName}</li>
        <li>{userAuth.email}</li>
        <li>{userAuth.uid}</li>
        {/* <li>{userAuth.metadata.lastSignInTime}</li> */}
    </ul>
  )
}
