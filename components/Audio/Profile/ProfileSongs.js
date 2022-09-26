
import React, { useContext, useEffect } from 'react'
import { UserContext } from './ProfileMainComponent'
import {getSongsFromFirebaseForProfileSongs} from './ProfileSongsUtilities'

export default function ProfileSongs() {
    const userAuth = useContext(UserContext)
    // console.log(userAuth)

    useEffect(() => {
        // const getSongsFromFirebaseForProfileSongs = () => {
        //     // console.log('getting songs...')
        //     fetch('/api/audio/getSongsFromFirebaseForProfileSongs')
        //     .then((res) => res.json())
        //     .then((x) => {
        //     console.log(x)
        //   })
        // }
        // getSongsFromFirebaseForProfileSongs()

        // console.log(thing)
        const asyncThing = async () => {
            const thing = await getSongsFromFirebaseForProfileSongs({uid: userAuth.uid})
            // console.log(thing)

        }
        asyncThing()
    },[])

    return (
        <div>ProfileSongs</div>
    )
}
