import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

export const getSongDataIfAuthorizedUser = async (userUID, songName) => {
    
    const songsRef = collection(db, 'songs');

    const songQuery = query(songsRef, where('usersWithAccess', 'array-contains', userUID), where('metadata.songName', '==', songName))

    const songQuerySnapshot = await getDocs(songQuery);

    let data = {
        songData: null,
        userData: [],
        emailsOfUsersWithAccess: [],
        isPartOfproject: null
    }

    songQuerySnapshot.forEach((song) => {
        data.songData = song.data()
        if (song.data().metadata.projectName) {
            data.isPartOfproject = true
        } else {
            data.isPartOfproject = false
        }
    })




    ////////
    // SEE StudioHomeScript.js  - - - - RE: security rules + client requests
    // this works, because team members/network/colleagues whatever have access to eachothers documents



    const usersRef = collection(db, 'users');

    const userQuery = query(usersRef, where('songsAuthorizedOn', 'array-contains', songName))

    const userQuerySnapshot = await getDocs(userQuery)

    userQuerySnapshot.forEach((user) => { 
        // console.log(user)
        data.userData.push(user.data()) // probably redundant
        data.emailsOfUsersWithAccess.push(user.data().metadata.email) 
        // if (user.data)
    })

    // console.log(data)
    // not sure if userData is actually needed, but good to have within this utility in case I want to display something other than email
    // all i would really need otherwise is like a username, but unless it's set custom it would be their display name which may or may not be correct and what they'd want displayed.

    // if (userUID )
    // if (data.songData) {
    //     console.log(data.songData)
    // } 
    // console.log(data)
    return data

}

export const getSongDataForPublicUser = async (songName) => {
    return 'this is public data for ' + songName
}