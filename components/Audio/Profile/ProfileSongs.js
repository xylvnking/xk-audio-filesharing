
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from './ProfileMainComponent'
import ProfileSongPreview from './ProfileSongPreview'
import { 
    getSongsFromFirebaseForProfileSongs,
    getListOfSongsTheUserIsAuthorizedOn,

    } from './ProfileSongsUtilities'

export default function ProfileSongs() {
    const userAuth = useContext(UserContext)
    const [listOfSongsTheUserIsAuthorizedOn, setListOfSongsTheUserIsAuthorizedOn] = useState([])

    useEffect(() => {
        const asyncThing = async () => {
            const list = await getListOfSongsTheUserIsAuthorizedOn(userAuth.uid)
            setListOfSongsTheUserIsAuthorizedOn(list)
        }
        asyncThing()

    },[userAuth.uid])

    return (
        <>
            {
            listOfSongsTheUserIsAuthorizedOn.map((songName, index) => {
                return (
                    // <p key={index}>{song}</p>
                    <ProfileSongPreview 
                        key={index}
                        songName={songName}
                    />
                )
            })
            }

        </>
    )
}
