import React from 'react'
import FrontNav from './FrontNav/FrontNav'

export default function FrontLayout({ children }) {
  return (
    <>
        <FrontNav />
    <main>
        {children}
    </main>
    <footer>
        this is a footer
    </footer>

    </>
  )
}
