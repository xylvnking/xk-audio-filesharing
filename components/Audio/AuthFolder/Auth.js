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

// const []

// export const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)
// fetch('/api/test')
//   .then((res) => res.json())
//   .then((x) => {
//     console.log(x)
//   })
// fetch('/api/hello')
//   .then((res) => res.json())
//   .then((x) => {
//     console.log(x)
//   })

// fetch('/api/test', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     // body: JSON.stringify({someField: 'someValue'})
//     body: JSON.stringify(auth)
// }).then((res) => res.json())
//   .then((x) => {
//     console.log(x)
//   })
// export default function Auth() {
//     // const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)



//     return (
//         <>
//         </>

//     )
// }
