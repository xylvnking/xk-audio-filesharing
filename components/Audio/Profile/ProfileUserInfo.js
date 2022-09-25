import React, { useContext } from 'react'
import Image from 'next/image'
import { UserContext } from './ProfileMainComponent'

export default function ProfileUserInfo() {
    const userAuth = useContext(UserContext)
    console.log(userAuth)
  return (
    <ul>
        <li>{userAuth.displayName}</li>
        <li>{userAuth.email}</li>
        <li>{userAuth.uid}</li>
        <Image src={userAuth.photoURL} width={100} height={100}/>
        {/* <li>{userAuth.metadata.lastSignInTime}</li> */}
    </ul>
  )
}
