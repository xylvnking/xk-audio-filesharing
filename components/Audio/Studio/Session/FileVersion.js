import React from 'react'
import {useFileVersions} from '../Hooks/useFileVersions'
import TextareaAutosize from 'react-textarea-autosize';
import styles from './FileVersion.module.scss'

export default function FileVersion(props) {
    // if this logic won't be reused anywhere, do i bother making it into a hook?
    // console.log(props.songDocumentId)
    const [mostRecentFileVersion, allFileVersions, updateRevisionNote] = useFileVersions(props.songDocumentId)
    // console.log(allFileVersions)

    const handleTyping = (text) => {
        // console.log(text)
        updateRevisionNote(text)
    }
    // console.log('why')

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
            <details className='removeListStyleAndAddPointerCursor'>
                <summary>past file versions:</summary>
                <ul className='removeListStyleAndAddPointerCursor'>
                

                {
                    // console.log(allFileVersions)
                    allFileVersions.map((fileVersion, index) => {
                        if (index !== allFileVersions.length - 1) { // removes most recent one since it's displayed on its own above
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
