import React from 'react'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth"
import { db, auth, provider } from '../../../firebase/firebase-config';

const signUserOut = async () => {
    await signOut(auth, provider).then(() => {
    })
    .catch(function (error) {
        console.error("there was an error signing out", error);
    })
}

export default function Auth() {
    const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)


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
    
    console.log(userAuth)
    //   console.log(userAuth)


    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider).then((result) => {
            console.log(result.user)
            console.log(result.user.uid)
        })
        .catch(function (error) {
            console.error("there was an error signing in", error);
        })
    }
    // const signUserOut = async () => {
    //     await signOut(auth, provider).then(() => {
    //     })
    //     .catch(function (error) {
    //         console.error("there was an error signing out", error);
    //     })
    // }
    return (
        <>
            {
            userAuth 
            ?
            <button onClick={signUserOut}> Sign Out</button>
            // <button> Sign Out</button>
            :
            <button onClick={signInWithGoogle}> Sign In</button>
            // <button> Sign In</button>
            }
        </>

    )
}
