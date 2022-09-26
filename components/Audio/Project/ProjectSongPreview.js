import React from 'react'
import styles from './ProjectPreviews.module.scss'

export default function ProjectSongPreview(props) {

    const handleClick = () => {
        window.location.href=`/audio/song/${props.songName}`;
    }

  return (
    <section 
    onClick={() => handleClick()} 
    className={`${styles.container} ${styles.song}`}
    >
        <h1>{props.songName}</h1>
    </section>
  )
}
