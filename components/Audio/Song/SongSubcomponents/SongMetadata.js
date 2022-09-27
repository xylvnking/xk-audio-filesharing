import React from 'react'
import SongSubcomponentLayout from './SongSubcomponentLayout'

export default function SongMetadata(props) {
  return (
    <SongSubcomponentLayout>
      <ul style={{fontSize: '12px'}} name='Metadata: '>
          <li style={{listStyle: 'none', fontSize: '14px'}}><strong>metadata:</strong></li>
          <li>dateOfMostRecentEdit: {props.metadata.dateOfMostRecentEdit}</li>
          <li>projectName: {props.metadata.projectName}</li>
          <li>songName: {props.metadata.songName}</li>
          <li>other metadata</li>
          <li>other metadata</li>
          <li>other metadata</li>
          <li>other metadata</li>
      </ul>
    </SongSubcomponentLayout>
  )
}
