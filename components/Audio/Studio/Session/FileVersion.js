import React from 'react'
import {useFileVersions} from '../Hooks/useFileVersions'
import TextareaAutosize from 'react-textarea-autosize';
import styles from './FileVersion.module.scss'

export default function FileVersion(props) {
    // if this logic won't be reused anywhere, do i bother making it into a hook?
    const [mostRecentFileVersion, allFileVersions, updateRevisionNote] = useFileVersions(props.songName)

    const handleTyping = (text) => {
        updateRevisionNote(text)
    }

    return (
        mostRecentFileVersion &&
        <div className='simpleBorder'>
            {/* <h4>{props.songName}</h4> */}
            <h5>{mostRecentFileVersion.fileVersionName}</h5>
            <audio controls></audio>
            <br />
            {
                props.userRole == 'admin' ?
                <TextareaAutosize 
                    defaultValue={mostRecentFileVersion.revisionNote}
                    onChange={(e) => handleTyping(e.target.value)}
                />
                :
                <p>{mostRecentFileVersion.revisionNote}</p>
            }
            <details className='removeListStyleAndAddPointerCursor'>
                <summary>past file versions:</summary>
                <ul className='removeListStyleAndAddPointerCursor'>
                

                {
                    // console.log(allFileVersions)
                    allFileVersions.map((fileVersion, index) => {
                        return (
                            <ul key={index} className={styles.pastFileVersionsListItem}>
                                <li>{fileVersion.fileVersionName}</li>        
                                <li>{fileVersion.revisionNote}</li>  
                            </ul>
                            )
                        })
                        // allFileVersions
                    }
                </ul>
            </details>
        </div>
    )
}
