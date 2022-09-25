import React from 'react'
import ArtistNav from './AudioNav/AudioNav'

export default function AudioLayout({ children }) {
  console.log('audio layout loaded')
  return (
    <>
        <ArtistNav />
    <main>
        {children}
    </main>
    </>
  )
}
