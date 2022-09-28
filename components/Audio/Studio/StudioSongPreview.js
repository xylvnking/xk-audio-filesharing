import React, { useState, useEffect } from 'react'
import styles from './Styles/StudioSongPreview.module.scss'

import {
    getUsersWithAccessFromSpecificSong
} from './Scripts/StudioHomeScripts'

export default function StudioSongPreview(props) {
    const [usersWithAccess, setUsersWithAcces] = useState([])

    useEffect(() => {
        console.log('fetching users...')

        const getUserData = async () => {
            const result = await getUsersWithAccessFromSpecificSong(props.songData.metadata.songName, props.userAuth.uid)

        }
        getUserData()


    }, [props.songData])
    
    return (
        <div className={styles.container}>
            <h2>{props.songData.metadata.songName}</h2>
            {
                // props.songData.metadata.projectName &&
                <h4>{props.songData.metadata.projectName}</h4>
            }

            <h5>most recent edit: {props.songData.metadata.dateOfMostRecentEdit}</h5>

            {
                <ul>
                    {
                        props.songData.usersWithAccess.map((user, index) => {
                            return <li key={index}>{user}</li>
                        })
                    }
                </ul>
            }
        </div>

    )
}
