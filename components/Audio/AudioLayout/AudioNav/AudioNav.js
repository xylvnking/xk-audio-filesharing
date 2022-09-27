import React from 'react'
import Link from 'next/link'
import audioNavStyles from './AudioNav.module.scss'
// import Auth from '../../AuthFolder/Auth'

export default function AudioNav(props) {
    return (
        <div className={audioNavStyles.container}>
            <nav>
                
                <Link href='/'>
                    <p>Home</p>
                </Link>
                
                <Link href='/audio/studio'>
                    <p>Studio</p>
                </Link>
            
                <Link href='/audio/profile'>
                    <p>Profile</p>
                </Link>
                
                {/* <Auth /> */}
            </nav>
        </div>
    )
}
