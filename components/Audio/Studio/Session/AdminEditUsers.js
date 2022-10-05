import React, { useState, useRef } from 'react'
import Image from 'next/image'
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
    console.log(props.addUserMenuOpen)
    

    return (
        props.userRole == 'admin' &&
        <div className={styles.container}>
            {/* <p><small>reminder: only users who have accepted their addition to the song will show up here</small></p> */}
            {/* {
                addingNewUserMenuOpen &&
                <form onSubmit={addUser}>
                    <label htmlFor='addsUser'>userUID:</label>
                    <input type='text' id='addUser' required></input>
                    <br />
                    <input type='checkbox' id='addAsAdmin'></input>
                    <label htmlFor='addAsAdmin'>Add as admin?:</label>
                    <button type='submit'>Add User</button>
                </form>
            } */}
            <ul className={styles.userList}>
                <li className={`${styles.addUserButtonContainer}`} onClick={() => setAddingNewUserMenuOpen(!addingNewUserMenuOpen)} >
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M32.625 21.875q-.792 0-1.229-.5-.438-.5-.438-1.208v-3.334h-3.333q-.792 0-1.25-.458-.458-.458-.458-1.208t.458-1.229q.458-.48 1.25-.48h3.333v-3.291q0-.792.438-1.229.437-.438 1.187-.438t1.25.438q.5.437.5 1.229v3.291h3.25q.792 0 1.25.48.459.479.459 1.187 0 .792-.459 1.25-.458.458-1.25.458h-3.25v3.334q0 .708-.5 1.208t-1.208.5ZM15.25 19.333q-3.292 0-5.458-2.145-2.167-2.146-2.167-5.438t2.167-5.437q2.166-2.146 5.458-2.146 3.292 0 5.458 2.125 2.167 2.125 2.167 5.458 0 3.292-2.167 5.438-2.166 2.145-5.458 2.145ZM2.833 35.208q-.916 0-1.541-.625-.625-.625-.625-1.541v-3.25q0-1.834.937-3.292.938-1.458 2.479-2.208 3.042-1.417 5.688-2.042 2.646-.625 5.437-.625 2.792 0 5.438.625t5.687 2.042q1.625.708 2.563 2.146.937 1.437.937 3.312v3.292q0 .916-.645 1.541-.646.625-1.605.625Zm2.292-4.416h20.292v-.834q0-.583-.334-1.104-.333-.521-.916-.729-2.5-1.208-4.542-1.625-2.042-.417-4.417-.417-2.291 0-4.396.417-2.104.417-4.562 1.625-.583.208-.854.729t-.271 1.104Zm10.083-15.875q1.334 0 2.292-.917.958-.917.958-2.25t-.937-2.271q-.938-.937-2.313-.937-1.333 0-2.229.937-.896.938-.896 2.271t.896 2.25q.896.917 2.229.917Zm.042-3.167Zm0 14.333Z"/></svg>
                        <p>add user</p>
                    </div>
                </li>
                {
                addingNewUserMenuOpen &&
                <form onSubmit={addUser}>
                    <div>
                        <label htmlFor='addsUser'>uid:</label>
                        <input type='text' id='addUser' required></input>
                        {/* <svg style={{marginLeft: '10px'}} fill='grey'xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M9.979 14.875q.438 0 .729-.292.292-.291.292-.729 0-.437-.292-.729-.291-.292-.729-.292-.437 0-.729.292t-.292.729q0 .438.292.729.292.292.729.292Zm.083-8.354q.584 0 .959.312.375.313.375.792 0 .333-.208.698-.209.365-.626.698-.562.521-.937.989-.375.469-.354 1.032 0 .291.198.489t.51.198q.313 0 .531-.198.219-.198.282-.531.062-.333.281-.625.219-.292.698-.771.646-.604.875-1.073.229-.469.229-1.052 0-1.062-.75-1.708-.75-.646-2-.646-.833 0-1.469.344-.635.343-1.135.989-.167.209-.094.469.073.261.281.427.271.208.594.136.323-.073.531-.386.229-.271.532-.427.302-.156.697-.156ZM10 18.125q-1.667 0-3.146-.635-1.479-.636-2.594-1.73-1.114-1.093-1.75-2.583-.635-1.489-.635-3.177 0-1.708.646-3.187.646-1.48 1.75-2.573 1.104-1.094 2.583-1.73Q8.333 1.875 10 1.875q1.708 0 3.188.635 1.479.636 2.583 1.73 1.104 1.093 1.729 2.573.625 1.479.625 3.187 0 1.688-.635 3.177-.636 1.49-1.73 2.583-1.093 1.094-2.572 1.73-1.48.635-3.188.635ZM10 10Zm0 6.479q2.729 0 4.604-1.896 1.875-1.895 1.875-4.583t-1.875-4.583Q12.729 3.521 10 3.521q-2.667 0-4.573 1.896Q3.521 7.312 3.521 10q0 2.667 1.906 4.573Q7.333 16.479 10 16.479Z"/></svg> */}
                    </div>
                    <div>
                        <label htmlFor='addAsAdmin'>Add as admin?:</label>
                        <input type='checkbox' id='addAsAdmin'></input>
                    </div>
                    <div>
                        <button type='submit'>Add User</button>
                        <button type='button' className={styles.cancelNewUser} onClick={() => setAddingNewUserMenuOpen(false)}>Cancel</button>
                    </div>
                </form>
            }
                {
                    props.usersWithAccess.map((user, index) => {
                        return ( // could make this it's own little user preview component, because only seeing email is a bit weird. a little id card is probably best
                        props.usersWithAccess[index].metadata.uid !== auth.currentUser.uid && // USE THIS TO REMOVE THE CURRENT USER FROM OPTIONS LIST SO THEY DONT ACCIDENTALLY REMOVE THEMSELVES - MAYBE THAT SHOULD ONLY BE DONE IN PROFILE MENU OR SOMETHING
                            <ul key={index} className={styles.userListItem}>
                                <div className={styles.idCard}>
                                    <div className={styles.nextImageWrapper}>
                                        <Image
                                            src={user.metadata.photoURL}
                                            // width={50}
                                            // height={50}
                                            className={styles.nextImage}
                                            // layout='fixed'
                                            layout='fill'
                                            // layout='fixed'
                                            // objectFit='cover'
                                            // objectFit='contain'
                                            style={{
                                                // borderRadius: '50%',
                                                // borderStyle: 'solid',
                                                // borderColor: 'red',
                                                // borderWidth: '10px'
                                                
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <li className={styles.idCardTextItem}>{user.metadata.displayName}</li>
                                        <li className={styles.idCardTextItem}>{user.metadata.email}</li>
                                        {/* <li>{user.metadata.photoURL}</li> */}
                                        <li className={styles.idCardTextItem}>{user.metadata.uid}</li>
                                    </div>
                                </div>
                                
                                {/* {console.log(user.metadata)} */}
                                <div className={styles.actionButtons}>
                                    {
                                        props.allSongData.usersWithAccess.includes(user.metadata.uid) && !props.allSongData.usersWithAdmin.includes(user.metadata.uid) &&
                                        <button className={styles.giveAdmin}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M20 26.417q-.917 0-1.562-.646-.646-.646-.646-1.563V13.083l-2.459 2.459q-.625.666-1.521.646-.895-.021-1.562-.646-.625-.625-.625-1.542t.625-1.542L18.5 6.25q.25-.333.667-.479.416-.146.833-.146t.833.146q.417.146.709.479l6.208 6.208q.625.625.625 1.521 0 .896-.625 1.563-.625.666-1.542.666-.916 0-1.541-.666l-2.459-2.459v11.125q0 .917-.646 1.563-.645.646-1.562.646Zm-6.958 8.541q-.959 0-1.584-.646-.625-.645-.625-1.562 0-.958.625-1.583t1.584-.625h13.916q.959 0 1.584.625.625.625.625 1.583 0 .917-.625 1.562-.625.646-1.584.646Z"/></svg>
                                            <p>give admin</p>
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
