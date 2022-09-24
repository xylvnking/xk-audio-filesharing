import React from 'react'
import Link from 'next/link'
import artistNavStyles from './ArtistNav.module.scss'

export default function FrontNav(props) {
  return (
    <div className={artistNavStyles.container}>
        <nav>
            <Link href='/'>
                Front
            </Link>
            {/* <Link href='/work'>
                Announcements
            </Link>
            <Link href='/work'>
                Resources
            </Link> */}
            <Link href='/work/profile'>
                Profile
            </Link>
        </nav>
    </div>
  )
}
