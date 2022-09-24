import React from 'react'
import ArtistLayout from '../../../components/Artist/ArtistLayout/ArtistLayout'
import { useRouter } from 'next/router'

export default function Profile() {
    const router = useRouter()
      const { pid } = router.query
    return (
    <ArtistLayout>
        <ul>
            <li>Artist info</li>
            <li>Artist status</li>
            <li>Projects</li>
        </ul>
    </ArtistLayout>
  )
}
