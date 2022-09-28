import React, { useState, useEffect } from 'react'
import styles from './Styles/StudioSongPreview.module.scss'

import {
    getUsersWithAccessFromSpecificSong
} from './Scripts/StudioHomeScripts'

export default function StudioSongPreview(props) {
    const [usersWithAccess, setUsersWithAcces] = useState([])
    const [emailsOfUsersWithAccess, setEmailsOfUsersWithAccess] = useState(null)
    const [emailsOfUsersWithAdmin, setEmailsOfUsersWithAdmin] = useState(null)
    

    useEffect(() => {

        const getUserData = async () => {
            const result = await getUsersWithAccessFromSpecificSong(props.userAuth.uid, props.songData.metadata.songName)
            setEmailsOfUsersWithAccess(result.emailsOfUsersWithAccess)
            setEmailsOfUsersWithAdmin(result.emailsOfUsersWithAdmin)

        }
        getUserData()

        const checkRole = async () => {

        }
        checkRole()

    }, [props.songData])

    const handleClick = () => {
        // console.log('ye')
        window.location.href=`/audio/studio/session/song/${props.songData.metadata.songName}`;
        
    }
    
    return (
        <div className={styles.container} onClick={() => handleClick()}>
            <h2>{props.songData.metadata.songName}</h2>

            {
                <h4>{props.songData.metadata.projectName}</h4>
            }

            {
                <ul>
                    <h3>team members:</h3>
                    {
                        emailsOfUsersWithAccess &&
                        emailsOfUsersWithAccess.map((email, index) => {
                            return <li key={index}>{email}</li>
                        })
                    }
                </ul>
            }
            {
                <ul>
                    <h3>admins:</h3>
                    {
                        emailsOfUsersWithAdmin &&
                        emailsOfUsersWithAdmin.map((email, index) => {
                            return <li key={index}>{email}</li>
                        })
                    }
                </ul>
            }
        </div>
    )
}
