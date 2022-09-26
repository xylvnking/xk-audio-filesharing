import React from 'react'
import Link from 'next/link'
import styles from './ProfilePreviews.module.scss'

export default function ProfileProjectPreview(props) {
    const handleClick = () => {
        window.location.href = `/audio/project/${props.projectName}`;

    }
    return (
        <section
            onClick={() => handleClick()}
            className={`${styles.container} ${styles.project}`}
        >
            PROJECT: {props.projectName}
        </section>
    )
}
