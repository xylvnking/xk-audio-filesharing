import React from 'react'
import styles from './AdminEditUsers.module.scss'
import { auth } from '../../../../firebase/firebase-config'

{/* <AdminEditUsers allSongData={allSongData} usersWithAccess={usersWithAccess} usersWithAdmin={usersWithAdmin}/> */}

/*

props.usersWithAccess == array of objects containing all the users info (same with props.usersWithAdmin)
props.allSongData.usersWithAccess == array of UIDs of users with access (same with props.allSongData.usersWithAdmin)

*/


export default function AdminEditUsers(props) {

    // console.log(props.usersWithAdmin)

    // console.log(props.allSongData.usersWithAccess)
    // console.log(props.allSongData.usersWithAdmin)

    

    const updatePriviledge = (action, uidOfUserToRemove) => {
        // console.log(action, uid)

        // get the arrays for the song, clone them locally etc
        // alter the arrays, (probably splice or something at the index which contains the value of the uid)
        // update the documents with the altered arrays

        // update the user doc

        // update the song doc




    }

  return (
    <div className='simpleBorder'>
        <p><em>AdminEditUsers.js</em></p>
        <button>IMPLEMENT ADD USER</button>
        {
            props.usersWithAccess.map((user, index) => {

                // props.usersWithAccess[index].metadata.uid !== auth.currentUser.uid && // USE THIS TO REMOVE THE CURRENT USER FROM OPTIONS LIST SO THEY DONT ACCIDENTALLY REMOVE THEMSELVES - MAYBE THAT SHOULD ONLY BE DONE IN PROFILE MENU OR SOMETHING


                    return ( // could make this it's own little user preview component, because only seeing email is a bit weird. a little id card is probably best
                        <ul key={index} className={styles.listItem}>
                            <li>{user.metadata.email}</li>

                            {
                                props.allSongData.usersWithAccess.includes(user.metadata.uid) &&
                                <button onClick={() => updatePriviledge('removeAccess', user.metadata.uid)}>remove access</button>
                            }
                            {
                                props.allSongData.usersWithAdmin.includes(user.metadata.uid) &&
                                <button onClick={() => updatePriviledge('removeAdmin', user.metadata.uid)}>remove admin</button>
                            }

                        </ul>
                    )
                
            })
        }

    </div>
  )
}
