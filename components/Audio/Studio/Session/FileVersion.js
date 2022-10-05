import React from 'react'
import {useFileVersions} from '../Hooks/useFileVersions'
import TextareaAutosize from 'react-textarea-autosize';
import styles from '../Styles/FileVersion.module.scss'
// import styles from './FileVersion.module.scss'

import { doc, updateDoc } from 'firebase/firestore'

import { db } from '../../../../firebase/firebase-config'

let revisionTypingTimer

export default function FileVersion(props) {
    
    const [mostRecentFileVersion, mostRecentFileVersionDownloadLink, allFileVersions] = useFileVersions(props.songDocumentId)
    
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
        <div>
            <section className={styles.fileVersionTitle}>
                <h1>{mostRecentFileVersion.fileVersionName}</h1>
            </section>

        <main className={styles.container}>

            
                {/* <h4>{props.songDocumentId}</h4> */}
                {/* <p><em>FileVersion.js</em></p> */}
                {/* <h5>{mostRecentFileVersion.metadata.fileVersionName}</h5> */}
                
                <audio preload='none' controls src={mostRecentFileVersionDownloadLink}></audio>
                <br />
                {
                    props.userRole == 'admin' ?
                    <div className={styles.currentRevisionTextAreaContainer}>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m41.05 29.55-4.6-4.6 1.45-1.45q.6-.65 1.55-.65.95 0 1.6.65l1.45 1.45q.65.65.65 1.6 0 .95-.65 1.55Zm-17.8 13.2V38.1l11.05-11 4.6 4.6-11 11.05Zm-17.95-10v-4.6h17.1v4.6Zm0-9.35v-4.55h25v4.55Zm0-9.25V9.6h25v4.55Z"/></svg> */}
                        <TextareaAutosize 
                            // defaultValue={mostRecentFileVersion.metadata.revisionNote}
                            defaultValue={mostRecentFileVersion.revisionNote}
                            onChange={(e) => handleTyping(e.target.value)}
                            spellCheck="false"
                            // autoFocus
                            
                        />
                    </div>
                    :
                    // <p>{mostRecentFileVersion.metadata.revisionNote}</p>
                    <p>{mostRecentFileVersion.revisionNote}</p>
                }
                    <ul className={styles.pastFileVersionsList}>
                    {/* <p><small>reminder: the auto database reset function can produce unpreditable ordering here</small></p> */}

                    {
                        
                        // console.log(allFileVersions)
                        allFileVersions.map((fileVersion, index) => {
                            // if (index !== allFileVersions.length - 1) { // removes most recent one since it's displayed on its own above
                            if (index > 0) { // removes most recent one since it's displayed on its own above
                                return (
                                    <ul key={index} className={styles.pastFileVersionsListItem}>
                                        <h1>{fileVersion.fileVersionName}</h1>        
                                        <li>{fileVersion.revisionNote}</li>  
                                    </ul>
                                    )
                            }
                            })
                        }
                    </ul>
        </main>
        </div>
    )
}
