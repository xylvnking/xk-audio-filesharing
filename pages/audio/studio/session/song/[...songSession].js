import React from 'react'
import AudioLayout from '../../../../../components/Audio/AudioLayout/AudioLayout'
import SessionMainComponent from '../../../../../components/Audio/Studio/Session/SessionMainComponent'
// import AudioLayout from '../../../../components/Audio/AudioLayout/AudioLayout'
// import SessionMainComponent from '../../../../components/Audio/Studio/Session/SessionMainComponent'

export default function studioSong() {
  return (
      <AudioLayout>
          <SessionMainComponent />
      </AudioLayout>
    // <AudioLayout>
    //   <SessionMainComponent />
    // </AudioLayout>
  )
}
