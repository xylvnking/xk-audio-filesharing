import React from 'react'
import {useFileVersions} from '../Hooks/useFileVersions'
import TextareaAutosize from 'react-textarea-autosize';
import styles from './FileVersion.module.scss'

import { doc, updateDoc } from 'firebase/firestore'

import { db } from '../../../../firebase/firebase-config'

let revisionTypingTimer

export default function FileVersion(props) {
    const [mostRecentFileVersion, allFileVersions, updateRevisionNote] = useFileVersions(props.songDocumentId)

    // console.log(mostRecentFileVersion)
    
    // this could probably go into the hook? or another hook? since eventually there will probably be more places this needs to happen from, such as removing song
    const handleTyping = (text) => {
        const fileVersionDocumentReference = doc(db, 'songs', props.songDocumentId, 'fileVersions', mostRecentFileVersion.metadata.fileVersionDocumentId)
        const updateRevisionNote = () => {
            clearTimeout(revisionTypingTimer)
            revisionTypingTimer = setTimeout(() => {
                updateDoc(fileVersionDocumentReference, {
                    'revisionNote': text,
                })
               
            }, 500)
        }
        updateRevisionNote()            
    }

    return (
        mostRecentFileVersion &&
        <div className='simpleBorder'>
            {/* <h4>{props.songName}</h4> */}
            <p><em>FileVersion.js</em></p>
            {/* <h5>{mostRecentFileVersion.metadata.fileVersionName}</h5> */}
            <h5>{mostRecentFileVersion.fileVersionName}</h5>
            <audio controls></audio>
            <br />
            {
                props.userRole == 'admin' ?
                <TextareaAutosize 
                    // defaultValue={mostRecentFileVersion.metadata.revisionNote}
                    defaultValue={mostRecentFileVersion.revisionNote}
                    onChange={(e) => handleTyping(e.target.value)}
                />
                :
                // <p>{mostRecentFileVersion.metadata.revisionNote}</p>
                <p>{mostRecentFileVersion.revisionNote}</p>
            }
            <details className='removeListStyleAndAddPointerCursor' open={true}>
                <summary>past file versions:</summary>
                <ul className='removeListStyleAndAddPointerCursor'>
                <p><small>reminder: the auto database reset function can produce unpreditable ordering here</small></p>

                {
                    
                    // console.log(allFileVersions)
                    allFileVersions.map((fileVersion, index) => {
                        // if (index !== allFileVersions.length - 1) { // removes most recent one since it's displayed on its own above
                        if (index > 0) { // removes most recent one since it's displayed on its own above
                            return (
                                <ul key={index} className={styles.pastFileVersionsListItem}>
                                    <li>{fileVersion.fileVersionName}</li>        
                                    <li>{fileVersion.revisionNote}</li>  
                                </ul>
                                )
                        }
                        })
                        // allFileVersions
                    }
                </ul>
            </details>
        </div>
    )
}
