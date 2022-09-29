import { doc, getDoc, query, where, orderBy, limit, collection, getDocs  } from "firebase/firestore";
// import { collection, doc, setDoc } from "firebase/firestore"; 


import { db, auth } from "../../../../firebase/firebase-config"

// called from StudioHomeComponent
export const getAllSongDataFromFirebase = async (userUID) => {

    const songsRef = collection(db, 'songs');

    const songDocsAuthorizedOn = query(songsRef, where('usersWithAccess', 'array-contains', userUID))

    // let songNamesList = []
    let allSongData = []
    
    const querySnapshot = await getDocs(songDocsAuthorizedOn);
    
    querySnapshot.forEach((doc) => {
        allSongData.push(doc.data())
    })
    
    allSongData.sort(function(a, b) { // sort by date
        return a.metadata.dateOfMostRecentEdit + b.metadata.dateOfMostRecentEdit
    })

    return allSongData
}


// called from each StudioSongPreview component

export const getUsersWithAccessFromSpecificSong = async (songDocumentId) => {

    
    // console.log(songName)

    
    const everyUserWithAccessToSpecificSong = {
        allUsersData: [],
        emailsOfUsersWithAccess: [],
        emailsOfUsersWithAdmin: [],
        // include more here if you need it later, 
        // this is most convenient place to get it all if you want usernames or whatever
        // otherwise you'll be digging through allUsersData for it somewhere else

    }

    const usersRef = collection(db, 'users');

    const userQueryForSongsAuthorizedOn = query(usersRef, where('songsAuthorizedOn', 'array-contains', songDocumentId))
    const userQueryForSongsWithAdmin = query(usersRef, where('songsWithAdmin', 'array-contains', songDocumentId))

    const userQueryForSongsAuthorizedOnSnapshot = await getDocs(userQueryForSongsAuthorizedOn)
    const userQueryForSongsWithAdminSnapshot = await getDocs(userQueryForSongsWithAdmin)

    userQueryForSongsAuthorizedOnSnapshot.forEach((user) => {
        everyUserWithAccessToSpecificSong.allUsersData.push(user.data())
        everyUserWithAccessToSpecificSong.emailsOfUsersWithAccess.push(user.data().metadata.email)
    })

    userQueryForSongsWithAdminSnapshot.forEach((user) => {
        everyUserWithAccessToSpecificSong.emailsOfUsersWithAdmin.push(user.data().metadata.email)
    })

    return everyUserWithAccessToSpecificSong

}