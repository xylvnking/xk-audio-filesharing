
import React, { useContext } from 'react'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, provider } from '../../../firebase/firebase-config'
import { signInWithGoogle, signUserOut } from '../../Audio/AuthFolder/Auth'

export const UserContext = React.createContext() // this could have been a prop but I wanted to try it out

// i think this component should only concern itself with laying out the components.
// could this have all been in the page itself? I guess so? Don't think it makes a difference though really
// my thought process is that everything should only have what it absolutely needs to have
// the [[..studio]] page needs to show a component, that's it.
// then this component has no need for all the data, because anything it links to will always fetch the up to date data
// i'm trying to avoid the situation where all reads and writes have to be 'routed' through this component,
    // and are instead handled within the respective component
// this page is almost identical to the profile page - except it links to both the public view and studio versions of songs
// so the data for each subcomponent can either be fetched here, or within the subcomponent itself
    // this page doesn't actually need to know, it just needs to render
    // so i think having each component take care of its own fetching is best
    // this DOES increase the number of fetches though.
    // so maybe i do the fetch here once, then useContext or props to give the children access?
    // all of that info is available in one call, doing 5 is just more code anyways?
// we'll stick to what the profile is doing
    // except in the utilities script idk why i used where instead of just querying to doc with the user uid
    // all this doc needs to know is data from the users doc
    // then each subcomponent for the song/project preview could fetch its own details, if needed
 

export default function StudioHomeComponent() {
    const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)
    return (
        <>
            <h1>StudioHomeComponent</h1>
            {
                !userAuthIsLoading && userAuth && <button onClick={signUserOut}> Sign Out</button>
            }
            {
                !userAuthIsLoading && !userAuth && <button onClick={signInWithGoogle}> Sign In</button>
            }
            {
                !userAuthIsLoading && userAuth &&
                <UserContext.Provider value={userAuth}>
                    <p>user info</p>
                    <p>projects member on</p>
                    <p>projects admin on</p>
                    <p>songs member on</p>
                    <p>songs admin on</p>




                    if you get allSongData here and render the subcomponent previews based on that,
                    you have more flexibility with what info you include in them,
                    and won't need to make a fetch for each one. 

                    <br />
                    <br />

                    the way it was done in profile is fine for just creating links,
                    but without also passing the song data it restricts it to just the songName,
                    unless another fetch is done
                    <br />
                    <br />

                    my question though is: when querying firebase for documents, what role do security rules play?
                    will it search through documents the user doesn't have access to?
                    i guess the security rules i write will give the procer access anyways?

                    {/* {
                        allSongData.map((songData, index) => {
                            return <StudioSongPreview key={index} songData={songData}/>
                            // cause then within each one, you could access what you needed with
                            // props.songData.metadata  or  props.songData.usersWithAccess   etc

                        })
                    } */}




                </UserContext.Provider>
            }
        </>
    )
}