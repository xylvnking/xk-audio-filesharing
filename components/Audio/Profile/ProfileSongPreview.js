import React from 'react'
import Link from 'next/link'
import styles from './ProfileSongPreview.module.scss'

export default function ProfileSongPreview(props) {
    const handleClick = () => {
        window.location.href=`/audio/song/${props.songName}`;

    }
  return (
    <section 
        onClick={() => handleClick()} 
        className={styles.container}
    >
        {props.songName}
        {/* <ul>
            <li>yeah</li>
            <li>no</li>
            <li>idk</li>
        </ul> */}
    </section>
  )
}
