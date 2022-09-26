import React, { useEffect, useState } from 'react'
import {
    getSongDataIfAuthorizedUser
} from './SongUtilities'

import Link from 'next/link'


export default function Song(props) {
    const [songData, setSongData] = useState(null)
    // const [userData, setUserData] = useState(null)
    const [emailsOfUsersWithAccess, setEmailsOfUsersWithAccess] = useState(null)
    const [isPartOfProject, setIsPartOfProject] = useState(null)


    useEffect(() => {

        
        const getSongData = async () => {

            const result = await getSongDataIfAuthorizedUser(props.userAuth.uid, props.songName)
            // console.log(result)
            
            // if (result.songData.metadata.projectName) { // checks if the song is a single or not and renders a back to project button if it isn't
            //     setIsPartOfProject(true)
            // }
            setIsPartOfProject(result.isPartOfproject)

            setSongData(result.songData)

            // setUserData(result.userData)
            setEmailsOfUsersWithAccess(result.emailsOfUsersWithAccess)

        }
        getSongData()

    },[props.userAuth, props.songName])
    // },[props.userAuth.uid, props.songName])

    return (
        <>
        {
            isPartOfProject &&
            // window.location.href=`/audio/song/${props.songName}`;
            // <Link href='/audio/project/${}'>
            <Link href={`/audio/project/` + songData.metadata.projectName} >
                {'< ' + songData.metadata.projectName}
            </Link>
        }
            <h1>Song name: <em>{props.songName}</em></h1>
            <h2>Current user: {props.userAuth.uid}</h2>
            {
                songData &&
                <>
                    <>
                        <h3>users with access:</h3> 
                        {/* this data should be fetched as described in readme (use the uids in the array to query more human legible info from their user doc) */}
                        {/* {songData.usersWithAccess.map((user, index) => <p key={index}>{user}</p>)} */}
                        {emailsOfUsersWithAccess.map((user, index) => <p key={index}>{user}</p>)}
                    </>
                    <>
                        <h3>metadata:</h3>
                        <p>dateOfMostRecentEdit: {songData.metadata.dateOfMostRecentEdit}</p>
                        <p>more stuff</p>
                        <p>more stuff</p>
                        <p>more stuff</p>
                        <p>more stuff</p>
                        <audio controls></audio>
                    </>
                </>
            }
        </>
    )
}
