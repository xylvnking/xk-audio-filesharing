import React from 'react'
import Link from 'next/link'
import styles from './ProfilePreviews.module.scss'

export default function ProfileSongPreview(props) {
    const handleClick = () => {
        window.location.href=`/audio/song/${props.songName}`;

    }
  return (
    <section 
        onClick={() => handleClick()} 
        className={`${styles.container} ${styles.song}`}
    >
        SONG: {props.songName}
    </section>
  )
}
