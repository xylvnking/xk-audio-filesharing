import Link from 'next/link'
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from './ProfileMainComponent'
import ProfileSongPreview from './ProfileSongPreview'
import {
    getSongsFromFirebaseForProfileSongs,
    getListOfSongsUserIsAuthorizedOn,
    getListOfProjectsUserIsAuthorizedOn,

} from './ProfileSongsUtilities'

export default function ProfileSongs() {
    const userAuth = useContext(UserContext)
    const [listOfSongsUserIsAuthorizedOn, setListOfSongsUserIsAuthorizedOn] = useState([])
    const [listOfProjectsUserIsAuthorizedOn, setListOfProjectsUserIsAuthorizedOn] = useState([])

    useEffect(() => {
        const getSongsAndProjectsAuthorizedOn = async () => {
            const songList = await getListOfSongsUserIsAuthorizedOn(userAuth.uid)
            setListOfSongsUserIsAuthorizedOn(songList)

            const projectList = await getListOfProjectsUserIsAuthorizedOn(userAuth.uid)
            setListOfProjectsUserIsAuthorizedOn(projectList)
        }
        getSongsAndProjectsAuthorizedOn()

    }, [userAuth.uid])

    return (
        <>
            {
                listOfProjectsUserIsAuthorizedOn &&
                listOfProjectsUserIsAuthorizedOn.map((projectName, index) => {
                    return <li key={index}>{projectName}</li>
                })
            }
            {
                listOfSongsUserIsAuthorizedOn &&
                listOfSongsUserIsAuthorizedOn.map((songName, index) => {
                    return <ProfileSongPreview key={index} songName={songName} />
                })
            }
        </>
    )
}
