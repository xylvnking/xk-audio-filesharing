
import React, { useState, useContext, useEffect, useMemo } from 'react'
import { UserContext } from './ProfileMainComponent'

import ProfileSongPreview from './ProfileSongPreview'
import ProfileProjectPreview from './ProfileProjectPreview'

import {
    getListOfSongsUserIsAuthorizedOn,
    getListOfProjectsUserIsAuthorizedOn,

} from './ProfileSongsUtilities'

export default function ProfileSongs() {
    const userAuth = useContext(UserContext)
    const [listOfSongsUserIsAuthorizedOn, setListOfSongsUserIsAuthorizedOn] = useState([])
    const [listOfProjectsUserIsAuthorizedOn, setListOfProjectsUserIsAuthorizedOn] = useState([])

    useEffect(() => {
        
        const getSongsAndProjectsAuthorizedOn = async () => {

            // const songList = await getListOfSongsUserIsAuthorizedOn(userAuth.uid)
            // setListOfSongsUserIsAuthorizedOn(songList)
            setListOfSongsUserIsAuthorizedOn(await getListOfSongsUserIsAuthorizedOn(userAuth.uid))

            // const projectList = await getListOfProjectsUserIsAuthorizedOn(userAuth.uid)
            // setListOfProjectsUserIsAuthorizedOn(projectList)
            setListOfProjectsUserIsAuthorizedOn(await getListOfProjectsUserIsAuthorizedOn(userAuth.uid))

        }
        getSongsAndProjectsAuthorizedOn()

    }, [userAuth.uid])

    return (
        <>
            {
                listOfProjectsUserIsAuthorizedOn &&
                listOfProjectsUserIsAuthorizedOn.map((projectName, index) => {
                    return <ProfileProjectPreview key={index} projectName={projectName} />
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
