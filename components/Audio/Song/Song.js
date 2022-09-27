import React, { useEffect, useState } from 'react'
import {
    getSongDataIfAuthorizedUser,
    getSongDataForPublicUser
} from './SongUtilities'

import Link from 'next/link'

import SongMetadata from './SongSubcomponents/SongMetadata'
import SongAudioPlayer from './SongSubcomponents/SongAudioPlayer'
import SongUsersWithAccess from './SongSubcomponents/SongUsersWithAccess'


export default function Song(props) {
    const [songData, setSongData] = useState(null)
    // const [userData, setUserData] = useState(null)
    const [emailsOfUsersWithAccess, setEmailsOfUsersWithAccess] = useState(null)
    const [isPartOfProject, setIsPartOfProject] = useState(null)


    useEffect(() => {
        // console.log('called')

        const getSongData = async () => {

            if (props.userAuth) { // this should be whether the visitor is authorized on the song, NOT whether they are authorized at all.

                const result = await getSongDataIfAuthorizedUser(props.userAuth.uid, props.songName)
                
    
                setIsPartOfProject(result.isPartOfproject)
    
                setSongData(result.songData)
    
                setEmailsOfUsersWithAccess(result.emailsOfUsersWithAccess)

            } else {
                // console.log('song public result called')
                const publicResult = await getSongDataForPublicUser(props.songName)
            }



        }
        getSongData()

    }, [props.userAuth, props.songName])

    return (
        <>
            {
                isPartOfProject &&
                <Link href={`/audio/project/` + songData.metadata.projectName} >
                    {'< ' + songData.metadata.projectName}
                </Link>
            }
            <h3><em>song component, viewable if settings permit</em></h3>
            {
                songData &&
                <>
                    <h1>Song name: <em>{songData.metadata.songName}</em></h1>
                    {/* <h2>Current user: {props.userAuth.uid}</h2> */}
                    <SongUsersWithAccess usersList={emailsOfUsersWithAccess} />
                    <SongMetadata metadata={songData.metadata} />
                    <SongAudioPlayer />
                    <h1>live chat</h1>
                    <h1>comment section</h1>
                </>
            }
        </>
    )
}
