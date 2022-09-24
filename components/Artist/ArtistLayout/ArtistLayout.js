import React from 'react'
import ArtistNav from './ArtistNav/ArtistNav'

export default function ArtistLayout({ children }) {
  return (
    <>
        <ArtistNav />
    <main>
        {children}
    </main>
    </>
  )
}
