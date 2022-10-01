import React, { useEffect } from 'react'

import { auth, db } from '../../firebase/firebase-config'

const resetFirebase = () => {
    fetch('/api/resetDatabase')
    .then((res) => res.json())
    .then((x) => {
    console.log(x)
  })
}



export default function AudioDevUtilities() {


  useEffect(() => {
    const checkUserPriviledges = async () => {
      // get priviledge arrays from user doc
      // get priviledge arrays from song doc (this should fail tho if the security rules prevent them from reading?)
        // use that data remove the song's document id from their user docs priviledge array
      // success?

    }
    checkUserPriviledges()
  },[auth, db])

  // console.log('AudioDevUtilities')
  return (
    <>
    {/* <button onClick={resetFirebase}>Reset Firebase</button> */}
    </>
  )
}
