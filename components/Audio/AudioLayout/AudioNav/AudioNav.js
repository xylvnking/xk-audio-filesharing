import React from 'react'
import Link from 'next/link'
import audioNavStyles from './AudioNav.module.scss'
// import Auth from '../../AuthFolder/Auth'

export default function AudioNav(props) {
  return (
    <div className={audioNavStyles.container}>
        <nav>
            <Link href='/'>
                FULLHOME
            </Link>
            <Link href='/audio/'>
                Audio Portfolio
            </Link>
            <Link href='/audio/work'>
                Artist Zone
            </Link>
            <Link href='/audio/profile'>
                Profile
            </Link>
            {/* <Auth /> */}
        </nav>
    </div>
  )
}
