import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useRef } from 'react'

import { auth, provider, db } from '../../firebase/firebase-config'
import { useAuthState } from "react-firebase-hooks/auth"

const resetFirebase = () => {
    fetch('/api/resetDatabase')
    .then((res) => res.json())
    .then((x) => {
    console.log(x)
  })
}



export default function AudioDevUtilities() {
  const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)



  useEffect(() => {
    const checkUserPriviledges = async () => {
      // get priviledge arrays from user doc

      // get priviledge arrays from song doc (this should fail tho if the security rules prevent them from reading?)
        // use that data remove the song's document id from their user docs priviledge array
      // success?
      if (userAuth) {
        const userDocumentReference = doc(db, 'users', auth.currentUser.uid)
        const userDocumentSnapshot = await getDoc(userDocumentReference)
        if (userDocumentSnapshot.exists()) {
          console.log(userDocumentSnapshot.data())
        }
      }


    }
    checkUserPriviledges()
  },[userAuth])



  return (
    <>
    {/* <button onClick={resetFirebase}>Reset Firebase</button> */}
    <button onClick={() => console.log(auth.currentUser)}>log auth</button>
    {/* <button onClick={() => console.log(userAuth)}>log auth</button> */}
    {/* <button onClick={() => console.log(auth.currentUser.uid)}>log auth</button> */}
    </>
  )
}
