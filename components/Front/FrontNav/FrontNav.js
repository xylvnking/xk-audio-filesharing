import React from 'react'
import Link from 'next/link'
import frontNavStyles from './FrontNav.module.scss'

export default function FrontNav() {
  return (
    <div className={frontNavStyles.container}>
        <nav>
            <Link href='/work'>
              WORK
            </Link>
        </nav>
    </div >
  )
}
