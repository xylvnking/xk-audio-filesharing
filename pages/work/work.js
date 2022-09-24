import React from 'react'
import Link from 'next/link'
import ArtistLayout from '../../components/Artist/ArtistLayout/ArtistLayout'

export default function Work() {
    return (
        <ArtistLayout>
            <div>
                <h1>news</h1>
                <h1>personal updates relevant to work</h1>
                <h1>whatever else for the 'work' homepage</h1>
                <button>Sign in</button>
                <button>Sign out</button>
            </div>
        </ArtistLayout>
    )
}
