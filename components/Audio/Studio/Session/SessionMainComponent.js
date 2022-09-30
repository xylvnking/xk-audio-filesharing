import React, { useState, useEffect, useMemo } from 'react'
// import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSongData } from '../Hooks/useSongData'
import { useAuthState } from "react-firebase-hooks/auth"

import { auth, provider } from '../../../../firebase/firebase-config'
import FileVersion from './FileVersion'
import AddFileVersion from './AddFileVersion'
import AdminEditUsers from './AdminEditUsers'

/*

    - get all data
    - display all data
    - similarish to 'song' component
    - but also link to the file versions? or just include the most recent file version here?
        - either way they'll need to be fetched for previews
    - admins will have some extra parts to manage permissions and write to docs
        - i'm currently going to give admins all the same powers, but maybe that requires an 'owner' who is the only one who can actually add admins
            - and i need to make sure everything is backed up somewhere just in case but I was going to do that anyways
    I think using context here might be smart, because with the file versions or something there might end up being a lot of nesting

    

*/

// main component rendered from /audio/studio/session/song/[...songSession].js
export default function SessionMainComponent(props) {

    const [allSongData, metadata, usersWithAccess, usersWithAdmin, userRole] = useSongData(props.songName)
    
    return (
        props.songName && allSongData ? // this stops the entire component from rendering unless the router.query has been put into state
        <div>
            
            {
                <Link href='/audio/studio'>
                    {'< studio'}
                </Link>
            }

            <h1>Session</h1>
            <h2>{metadata.songName}</h2>
            <h2>{userRole}</h2>

            <details style={{cursor: 'pointer'}}>
                <summary>info</summary>
                <ul>
                    <li><strong>users with access</strong></li>
                    {
                        usersWithAccess.map((user, index) => {
                            return <li key={index}>{user.metadata.email}</li>
                        })
                    }
                </ul>
                <ul>
                    <li><strong>users with admin</strong></li>
                    {
                        usersWithAdmin.map((user, index) => {
                            return <li key={index}>{user.metadata.email}</li>
                        })
                    }
                </ul>
                <ul>
                    <li><strong>metadata</strong></li>
                    {/* <li>{metadata.projectName}</li> */}
                    <li>{metadata.songName}</li>
                    {/* <li>{metadata.dateOfMostRecentEdit.toLocaleString()}</li> */}
                    <li>{Date(metadata.dateOfMostRecentEdit.seconds)}</li>
                </ul>
            </details>

            {
                userRole == 'admin' &&

                <AdminEditUsers 
                    allSongData={allSongData} 

                    // these should return the correct data, not rely on the component to sort it. one source of truth.
                    usersWithAccess={usersWithAccess} 
                    usersWithAdmin={usersWithAdmin}
                />
            }

            <AddFileVersion allSongData={allSongData} />
            <FileVersion songName={props.songName} userRole={userRole} songDocumentId={metadata.documentId}/>

            
            {/* <FileVersion songName={metadata.songName} userRole={userRole}/> */}
            {/* <h1>ye</h1> */}


        </div>
        :
        <h1>LOADING (or u dont have permission)</h1>
        )
    }
    
    // <h1>reminders / tasks</h1>
    // <h1>audio player</h1>
    // <h1>live chat</h1>