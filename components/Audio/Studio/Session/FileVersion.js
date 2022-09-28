import React from 'react'
import {useFileVersions} from '../Hooks/useFileVersions'

export default function FileVersion(props) {
    // if this logic won't be reused anywhere, do i bother making it into a hook?
    const [mostRecentFileVersion, allFileVersions] = useFileVersions(props.songName)
    // console.log(mostRecentFileVersion)
    // console.log(props.songName)

    console.log(props.userRole)

    return (
        mostRecentFileVersion &&
        <div className='simpleBorder'>
            <h4>{props.songName}</h4>
            <h5>{mostRecentFileVersion.fileVersionName}</h5>
            {
                props.userRole == 'admin' ?
                <textarea defaultValue={mostRecentFileVersion.revisionNote}></textarea> :
                <p>{mostRecentFileVersion.revisionNote}</p>

            }
            <audio controls></audio>
        </div>
    )
}
