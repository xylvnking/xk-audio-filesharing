// import React from 'react'
import { signInWithPopup, signOut } from 'firebase/auth'
// import { useAuthState } from "react-firebase-hooks/auth"
import { auth, provider, db } from '../../../firebase/firebase-config';

import { collection, addDoc, doc, getDoc, setDoc, updateDoc, deleteDoc, query, where, getDocs } from "firebase/firestore"; 

export const signUserOut = async () => {
    await signOut(auth, provider).then(() => {
        console.log('signed out')
    })
    .catch(function (error) {
        console.error("there was an error signing out", error);
    })
}

export const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider).then((result) => {
        console.log('signed in')
    
    })
    .catch(function (error) {
        console.error("there was an error signing in", error);
    })

    // check if new user 
    // const queryForUserSigningIn = query(collection(db, 'users'), where('metadata.uid', '==', auth.currentUser.uid))
    // const queryForUserSigningInSnapshot = await getDocs(queryForUserSigningIn)
    // // console.log(queryForUserSigningInSnapshot.length())
    
    // if (queryForUserSigningInSnapshot) {
    //     console.log('user exists!')
    // } else {
    //     console.log('new user, creating document.')
    // }

    const userDocumentReference = doc(db, 'users', auth.currentUser.uid)
    const userDocumentSnapshot = await getDoc(userDocumentReference)
    if (userDocumentSnapshot.exists()) {
        // if the user already exists, keep their userDoc updated with their google account data
        await updateDoc(userDocumentReference, { // create users collection
            'metadata.uid': auth.currentUser.uid,
            'metadata.email': auth.currentUser.email,
            'metadata.photoURL': auth.currentUser.photoURL,
            'metadata.displayName': auth.currentUser.displayName,
            // 'metadata.displayName': 'auth.currentUser.displayName',
        }).catch((error) => { console.log(error) })
    } else {
        await setDoc(doc(db, 'users', auth.currentUser.uid), { // create users collection
            metadta: {
                uid: auth.currentUser.uid,
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL,
                displayName: auth.currentUser.displayName,

            },
            songsAuthorizedOn: [
            ],
            projectsAuthorizedOn: [
            ],
            songsWithAdmin: [
            ],
            projectsWithAdmin: [
            ]

        }).catch((error) => { console.log(error) })
        console.log('user dont got no doc')

    }

}


// export default function Auth() {
//     // const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)



//     return (
//         <>
//         </>

//     )
// }
