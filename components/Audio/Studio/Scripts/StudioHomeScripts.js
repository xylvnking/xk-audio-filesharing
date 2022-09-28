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
    
    console.log(allSongData)
    
    
    return allSongData
}


// called from each StudioSongPreview component
export const getUsersWithAccessFromSpecificSong = async (userUID, songName) => {

    // is this going to need to run on the api?
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


    const usersRef = collection(db, 'users');

    const userQuery = query(usersRef, 
        where('songsAuthorizedOn', 'array-contains', songName))

}