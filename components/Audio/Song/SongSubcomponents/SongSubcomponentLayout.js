import React from 'react'
// import ArtistNav from './AudioNav/AudioNav'
import styles from './SongSubcomponentLayout.module.scss'

export default function SongSubcomponentLayout({ children }) {
  return (
      <div className={styles.container}>
        <section>
            <div className={styles.gridRow1Name}>
                <h1>{children.props.name}</h1>
            </div>
            <div className={styles.gridRow2Children}>
                {children}
            </div>
        </section>
      </div>
  )
}
