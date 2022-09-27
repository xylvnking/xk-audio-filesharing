import React from 'react'
import SongSubcomponentLayout from './SongSubcomponentLayout'

export default function SongUsersWithAccess(props) {
  return (
      <SongSubcomponentLayout>
        <ul name='Users with access:'>
            {props.usersList.map((user, index) => <p key={index}>{user}</p>)}
        </ul>
      </SongSubcomponentLayout>
  )
}
