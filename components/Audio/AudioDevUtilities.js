import { doc, getDoc, query, where, collection, getDocs, updateDoc } from 'firebase/firestore'
import React, { useEffect, useRef } from 'react'

import { auth, provider, db } from '../../firebase/firebase-config'
import { useAuthState } from "react-firebase-hooks/auth"

// import { AudioUtilitiesAndHooks, useRealtimeDataFromEverySongWithAccess } from './AudioUtilitiesAndHooks'

/*

 this module fires off right away and does some housekeeping

*/


const resetFirebase = () => {
    fetch('/api/resetDatabase')
    .then((res) => res.json())
    .then((x) => {
    console.log(x)
  })
}



export default function AudioDevUtilities() {
  const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)

  // const realTimeSongsWithAccessData = useRealtimeDataFromEverySongWithAccess()
  // console.log(poop)



  useEffect(() => {
    const checkUserPriviledges = async () => {
      // get priviledge arrays from user doc

      // get priviledge arrays from song doc (this should fail tho if the security rules prevent them from reading?)
        // use that data remove the song's document id from their user docs priviledge array
      // success?

      if (userAuth) {
        const userDocumentReference = doc(db, 'users', auth.currentUser.uid)
        const userDocumentSnapshot = await getDoc(userDocumentReference)

        let songsUserDocumentClaimsAccess
        let songsUserDocumentClaimsAdmin
        if (userDocumentSnapshot.exists()) {
          // this might not be needed,
          songsUserDocumentClaimsAccess = userDocumentSnapshot.data().songsWithAccess
          songsUserDocumentClaimsAdmin = userDocumentSnapshot.data().songsWithAdmin

          // console.log(songsUserDocumentClaimsAccess)

          // i think all thats needed is to query the songs they have access and update their document accordingly
          let songsWithUserAccessValidated = []
          let songsWithUserAdminValidated = []
          
          const songsRef = collection(db, 'songs')

          const querySongDocumentsWhereUserHasAccess = query(songsRef, where('usersWithAccess', 'array-contains', auth.currentUser.uid))
          const querySongDocumentsWhereUserHasAdmin = query(songsRef, where('usersWithAdmin', 'array-contains', auth.currentUser.uid))

          const querySongDocumentsWhereUserHasAccessSnapshot = await getDocs(querySongDocumentsWhereUserHasAccess)
          const querySongDocumentsWhereUserHasAdminSnapshot = await getDocs(querySongDocumentsWhereUserHasAdmin)

          querySongDocumentsWhereUserHasAccessSnapshot.forEach((document) => {
            songsWithUserAccessValidated.push(document.id)
          })
          querySongDocumentsWhereUserHasAdminSnapshot.forEach((document) => {
            songsWithUserAdminValidated.push(document.id)
          })

          // console.log(auth.currentUser.uid)

          await updateDoc(userDocumentReference, {
            songsWithAccess: songsWithUserAccessValidated,
            songsWithAdmin: songsWithUserAdminValidated
          })







        }
      }


    }
    checkUserPriviledges()
  },[userAuth])



  return (
    <>
    {/* <AudioUtilitiesAndHooks /> */}
    {/* {
      realTimeSongsWithAccessData &&
      <p>{realTimeSongsWithAccessData[0].metadata.songName}</p>
    } */}
    <button onClick={resetFirebase}>Reset Firebase</button>
    <button onClick={() => console.log(auth.currentUser)}>log auth</button>
    {/* <button onClick={() => console.log(userAuth)}>log auth</button> */}
    {/* <button onClick={() => console.log(auth.currentUser.uid)}>log auth</button> */}
    </>
  )
}
