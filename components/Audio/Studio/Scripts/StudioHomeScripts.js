import { doc, getDoc, query, where, orderBy, limit, collection, getDocs  } from "firebase/firestore";
// import { collection, doc, setDoc } from "firebase/firestore"; 


import { db } from "../../../../firebase/firebase-config"

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
export const getUsersWithAccessFromSpecificSong = async (userUID, songName) => {

    // because how is the client request going to be able to access the user documents which aren't for itself?
    // for the song documents it's easy because you can only see the documents which your uid is listed as
    // but for this query, it won't work the same because clients wouldn't have access to other clients data.

    // i could make a security rule which gives team members access to each others data? 
    // i'm not storing anything sensitive so that's fine?

    // REMEMBER :: - - - - adding and removing data required by permissions is important
        // when a song is uploadead or deleted, make sure every document which needs to be updated, is.


    // , where('teamMembers', 'array-contains', userUID)) - - - - this only matters for security rules? 
        // like, teamMembers will be given permission thru security rules, so I don't need to include it in the query.
        // could also call is like 'network' or something

    const everyUserWithAccessToSpecificSong = {
        allUsersData: [],
        emailsOfUsersWithAccess: [],
        emailsOfUsersWithAdmin: [],
        // include more here if you need it later, 
        // this is most convenient place to get it all if you want usernames or whatever
        // otherwise you'll be digging through allUsersData for it somewhere else

    }

    const usersRef = collection(db, 'users');

    const userQueryForSongsAuthorizedOn = query(usersRef, where('songsAuthorizedOn', 'array-contains', songName))
    const userQueryForSongsWithAdmin = query(usersRef, where('songsWithAdmin', 'array-contains', songName))

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