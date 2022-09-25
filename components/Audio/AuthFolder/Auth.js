// import React from 'react'
import { signInWithPopup, signOut } from 'firebase/auth'
// import { useAuthState } from "react-firebase-hooks/auth"
import { auth, provider } from '../../../firebase/firebase-config';

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
        // console.log(result.user)
        // console.log(result.user.uid)
    })
    .catch(function (error) {
        console.error("there was an error signing in", error);
    })
}


// export default function Auth() {
//     // const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)



//     return (
//         <>
//         </>

//     )
// }
