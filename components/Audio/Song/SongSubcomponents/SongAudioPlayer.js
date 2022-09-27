import React from 'react'
import SongSubcomponentLayout from './SongSubcomponentLayout'

export default function SongAudioPlayer(props) {
  return (
      <SongSubcomponentLayout>
        <div name='Audio player: '>
            <audio controls></audio>
        </div>
      </SongSubcomponentLayout>
  )
}
