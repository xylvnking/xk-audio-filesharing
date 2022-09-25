import React, { useContext } from 'react'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, provider } from '../../../firebase/firebase-config'
import {signInWithGoogle, signUserOut} from '../../Audio/AuthFolder/Auth'
import ProfileUserInfo from './ProfileUserInfo'

export const UserContext = React.createContext() // this could have been a prop but I wanted to try it out

export default function ProfileMainComponent(props) {
    const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)
    

    return (
        <div>
            {
                !userAuthIsLoading && userAuth && <button onClick={signUserOut}> Sign Out</button>
            }
            {
                !userAuthIsLoading && !userAuth && <button onClick={signInWithGoogle}> Sign In</button>
            }
            {
                !userAuthIsLoading && userAuth && 
                <UserContext.Provider value={userAuth}>
                    <ProfileUserInfo />
                </UserContext.Provider>
            }
        </div>
    )
}
