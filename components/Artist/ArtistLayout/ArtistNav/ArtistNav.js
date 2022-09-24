import React from 'react'
import Link from 'next/link'
import artistNavStyles from './ArtistNav.module.scss'

export default function FrontNav() {
  return (
    <div className={artistNavStyles.container}>
        <nav>
            <Link href='/'>
                Front Home
            </Link>
            <Link href='/work'>
                Announcements
            </Link>
            <Link href='/work'>
                Resources
            </Link>
            <Link href='/work'>
                Profile
            </Link>
        </nav>
    </div>
  )
}
