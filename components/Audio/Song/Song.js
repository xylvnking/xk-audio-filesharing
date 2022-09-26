import React, { useEffect, useState } from 'react'
import {
    getSongDataIfAuthorizedUser
} from './SongUtilities'


export default function Song(props) {
    const [songData, setSongData] = useState(null)
    // const [userData, setUserData] = useState(null)
    const [emailsOfUsersWithAccess, setEmailsOfUsersWithAccess] = useState(null)


    useEffect(() => {

        
        const getSongData = async () => {

            const result = await getSongDataIfAuthorizedUser(props.userAuth.uid, props.songName)
            
            setSongData(result.songData)
            // setUserData(result.userData)
            setEmailsOfUsersWithAccess(result.emailsOfUsersWithAccess)

        }
        getSongData()

    },[props.userAuth.uid, props.songName])

    return (
        <>
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
                    </>
                </>
            }
            <audio controls></audio>
        </>
    )
}
