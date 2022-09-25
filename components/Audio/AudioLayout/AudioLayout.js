import React from 'react'
import ArtistNav from './AudioNav/AudioNav'

export default function AudioLayout({ children }) {
  return (
    <>
        <ArtistNav />
    <main>
        {children}
    </main>
    </>
  )
}
