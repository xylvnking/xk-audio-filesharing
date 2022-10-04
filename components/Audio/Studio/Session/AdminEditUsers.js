import React, { useState, useRef } from 'react'
// import styles from './AdminEditUsers.module.scss'
import { db, auth, storage } from '../../../../firebase/firebase-config'
import { collection, query, where, doc, getDoc, updateDoc } from 'firebase/firestore'
import styles from '../Styles/ManageTeam.module.scss'
// import { ref, uploadBytes, getDownloadURL, listAll, list, getStorage, deleteObject, updateMetadata, getMetadata} from "firebase/storage";

{/* <AdminEditUsers allSongData={allSongData} usersWithAccess={usersWithAccess} usersWithAdmin={usersWithAdmin}/> */ }

/*

props.usersWithAccess == array of objects containing all the users info (same with props.usersWithAdmin)
props.allSongData.usersWithAccess == array of UIDs of users with access (same with props.allSongData.usersWithAdmin)

TO DO:
currently it's possible for users to be added multiple times to the permissions arrays in the document.
the ui will block this, but programming out the possibility is safer.
i found out because another bug ended up with a users uid being added multiple times, 
    so the remove function had to be used multiple times to clear all of the instances of their uid from the arrays

*/

// rendered within SessionMainComponent.js
export default function AdminEditUsers(props) {

    // console.log(props)

    const songDocumentId = useRef(props.allSongData.metadata.documentId)

    const [addingNewUserMenuOpen, setAddingNewUserMenuOpen] = useState(false)

    const addUser = async (event) => {
        event.preventDefault()
        const userUidToAdd = event.target[0].value
        const addAsAdminAlso = event.target[1].checked
        
            const songDocumentReference = doc(db, 'songs', props.allSongData.metadata.documentId)
            const songDocumentSnapshot = await getDoc(songDocumentReference)
            let usersWithAccessLocal
            let usersWithAdminLocal
            if (songDocumentSnapshot.exists()) {
                usersWithAccessLocal = songDocumentSnapshot.data().usersWithAccess
                usersWithAccessLocal.push(userUidToAdd)
                usersWithAdminLocal = songDocumentSnapshot.data().usersWithAdmin
                
                if (addAsAdminAlso == true) {
                    usersWithAdminLocal.push(userUidToAdd)
                }

                await updateDoc(songDocumentReference, {
                    usersWithAccess: usersWithAccessLocal,
                    usersWithAdmin: usersWithAdminLocal
                })
                
            }
        
        window.location.href=`/audio/studio/session/song/${props.allSongData.metadata.documentId}`
    }

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

    // console.log(props.allSongData.usersWithAdmin.includes(user.metadata.uid))
    // console.log(props.allSongData.)
    

    return (
        props.userRole == 'admin' &&
        <div className={styles.container}>
            {/* <p><small>reminder: only users who have accepted their addition to the song will show up here</small></p> */}
            {
                addingNewUserMenuOpen &&
                <form onSubmit={addUser}>
                    <label htmlFor='addsUser'>userUID:</label>
                    <input type='text' id='addUser' required></input>
                    <br />
                    <input type='checkbox' id='addAsAdmin'></input>
                    <label htmlFor='addAsAdmin'>Add as admin?:</label>
                    <button type='submit'>Add User</button>
                </form>
            }
            <ul className={styles.userList}>
                <li className={styles.userListItem} onClick={() => setAddingNewUserMenuOpen(true)}>yeah</li>
                {
                    props.usersWithAccess.map((user, index) => {
                        return ( // could make this it's own little user preview component, because only seeing email is a bit weird. a little id card is probably best
                        props.usersWithAccess[index].metadata.uid !== auth.currentUser.uid && // USE THIS TO REMOVE THE CURRENT USER FROM OPTIONS LIST SO THEY DONT ACCIDENTALLY REMOVE THEMSELVES - MAYBE THAT SHOULD ONLY BE DONE IN PROFILE MENU OR SOMETHING
                            <ul key={index} className={styles.userListItem}>
                                <div>
                                    <li>{user.metadata.displayName}</li>
                                    <li>{user.metadata.email}</li>
                                    {/* <li>{user.metadata.photoURL}</li> */}
                                    <li>{user.metadata.uid}</li>
                                </div>
                                
                                {/* {console.log(user.metadata)} */}
                                <div className={styles.actionButtons}>
                                    {
                                        props.allSongData.usersWithAccess.includes(user.metadata.uid) && !props.allSongData.usersWithAdmin.includes(user.metadata.uid) &&
                                        <button>
                                            give admin
                                        </button>
                                    }
                                    {
                                        props.allSongData.usersWithAdmin.includes(user.metadata.uid) &&
                                        <button onClick={() => updatePriviledge('removeAdmin', user.metadata.uid)} className={styles.removeAction}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M29.417 16.5q-.792 0-1.396-.583-.604-.584-.604-1.375 0-.792.604-1.375.604-.584 1.396-.584h7q.791 0 1.354.584.562.583.562 1.375 0 .791-.562 1.375-.563.583-1.354.583Zm-14.334 2.833q-3.291 0-5.437-2.145Q7.5 15.042 7.5 11.75t2.125-5.437q2.125-2.146 5.458-2.146 3.334 0 5.479 2.125 2.146 2.125 2.146 5.458 0 3.292-2.146 5.438-2.145 2.145-5.479 2.145ZM2.75 35.208q-.958 0-1.604-.625Q.5 33.958.5 33.042v-3.25q0-1.875.938-3.313.937-1.437 2.562-2.187 3.042-1.459 5.688-2.063 2.645-.604 5.395-.604 2.834 0 5.459.625 2.625.625 5.666 2.042 1.625.75 2.563 2.166.937 1.417.937 3.292v3.292q0 .916-.646 1.541-.645.625-1.562.625Zm2.167-4.416H25.25v-.834q0-.583-.312-1.104-.313-.521-.896-.729-2.459-1.208-4.521-1.625-2.063-.417-4.479-.417-2.292 0-4.375.417-2.084.417-4.542 1.625-.542.208-.875.729-.333.521-.333 1.104Zm10.166-15.875q1.375 0 2.271-.917.896-.917.896-2.25t-.896-2.271q-.896-.937-2.229-.937-1.333 0-2.271.937-.937.938-.937 2.271t.916 2.25q.917.917 2.25.917Zm0-3.167Zm0 14.333Z"/></svg>
                                            <p>remove admin</p>
                                        </button>
                                    }
                                    {
                                        props.allSongData.usersWithAccess.includes(user.metadata.uid) &&
                                        <button onClick={() => updatePriviledge('removeAccess', user.metadata.uid)} className={`${styles.removeAction} ${styles.removeAccess}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M20 37.875q-3.708 0-6.979-1.375t-5.709-3.833q-2.437-2.459-3.812-5.75-1.375-3.292-1.375-7 0-3.625 1.396-6.917t3.812-5.729q2.417-2.438 5.709-3.813Q16.333 2.083 20 2.083q3.667 0 6.958 1.375 3.292 1.375 5.709 3.813Q35.083 9.708 36.5 13q1.417 3.292 1.417 6.917 0 3.708-1.396 7-1.396 3.291-3.833 5.729-2.438 2.437-5.709 3.833-3.271 1.396-6.979 1.396Zm0-4.417q5.625 0 9.542-3.937 3.916-3.938 3.916-9.604 0-2.125-.625-4.146t-1.875-3.688L12.125 30.875q1.667 1.333 3.687 1.958 2.021.625 4.188.625ZM9.083 27.792 27.833 9q-1.708-1.25-3.687-1.854-1.979-.604-4.146-.604-5.625 0-9.542 3.896-3.916 3.895-3.916 9.479 0 2.166.687 4.166.688 2 1.854 3.709Z"/></svg>
                                            <p>remove access</p>
                                        </button>
                                    }
                                </div>


                            </ul>
                        )

                    })
                }
            </ul>

        </div>
    )
}
