import React, { useEffect } from 'react'

export default function Song(props) {

    useEffect(() => {

        const checkIfAuthorizedUser = async () => {

        }
        checkIfAuthorizedUser()

        const getSongData = async () => {

        }
        getSongData()
        
    },[])

    return (
        <>
            <h1>Song name: <em>{props.songName}</em></h1>
            <h2>Current user: {props.userAuth.uid}</h2>
        </>
    )
}
