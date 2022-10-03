import React, { useRef } from 'react'
import styles from './AdminEditUsers.module.scss'
import { db, auth, storage } from '../../../../firebase/firebase-config'
import { collection, query, where, doc, getDoc, updateDoc } from 'firebase/firestore'
// import { ref, uploadBytes, getDownloadURL, listAll, list, getStorage, deleteObject, updateMetadata, getMetadata} from "firebase/storage";

{/* <AdminEditUsers allSongData={allSongData} usersWithAccess={usersWithAccess} usersWithAdmin={usersWithAdmin}/> */ }

/*

props.usersWithAccess == array of objects containing all the users info (same with props.usersWithAdmin)
props.allSongData.usersWithAccess == array of UIDs of users with access (same with props.allSongData.usersWithAdmin)

*/

// rendered within SessionMainComponent.js
export default function AdminEditUsers(props) {

    // console.log(props)

    const songDocumentId = useRef(props.allSongData.metadata.documentId)

    const updatePriviledge = async (action, uidOfUserToRemove) => {

        // create reference to song document
        const songDocumentReference = doc(db, 'songs', songDocumentId.current)
        // get snapshot of data
        const songDocumentSnapshot = await getDoc(songDocumentReference)

        // create local arrays
        let usersWithAccessLocal
        let usersWithAdminLocal

        // if the document exists, perform actions
        if (songDocumentSnapshot.exists()) {

            // clone the song's permission arrays locally
            usersWithAccessLocal = songDocumentSnapshot.data().usersWithAccess
            usersWithAdminLocal = songDocumentSnapshot.data().usersWithAdmin

            const indexToRemoveFromAccess = usersWithAccessLocal.indexOf(uidOfUserToRemove)
            const indexToRemoveFromAdmin = usersWithAdminLocal.indexOf(uidOfUserToRemove)

            // remove priviledges from local array
            if (action == 'removeAccess') {
                usersWithAccessLocal.splice(indexToRemoveFromAccess, 1)
                // if they have admin access also, remove that
                if (indexToRemoveFromAdmin > -1) {
                    usersWithAdminLocal.splice(indexToRemoveFromAdmin, 1)
                }
            } else if (action == 'removeAdmin') {
                usersWithAdminLocal.splice(indexToRemoveFromAdmin, 1)
            }
            await updateDoc(songDocumentReference, {
                'usersWithAccess': usersWithAccessLocal,
                'usersWithAdmin': usersWithAdminLocal,
            })
            window.location.href=`/audio/studio/session/song/${props.allSongData.metadata.documentId}`;
        }
    }

    return (
        <div className='simpleBorder'>
            <p><em>AdminEditUsers.js</em></p>
            <p><small>reminder: only users who have accepted their addition to the song will show up here</small></p>
            {
                props.usersWithAccess.map((user, index) => {
                    
                    
                    
                    return ( // could make this it's own little user preview component, because only seeing email is a bit weird. a little id card is probably best
                    props.usersWithAccess[index].metadata.uid !== auth.currentUser.uid && // USE THIS TO REMOVE THE CURRENT USER FROM OPTIONS LIST SO THEY DONT ACCIDENTALLY REMOVE THEMSELVES - MAYBE THAT SHOULD ONLY BE DONE IN PROFILE MENU OR SOMETHING
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
