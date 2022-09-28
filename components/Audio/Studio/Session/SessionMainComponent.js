import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function SessionMainComponent() {
    const router = useRouter()
    console.log(router.query)

  return (
    <div>
        {
            <Link href='/audio/studio'>
                {'< studio'}
            </Link>
        }
        <h1>WELCOME TO THE SESH!!!</h1>

        {/* this is the real app */}
        
    </div>
  )
}
