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


// called from each StudioSongPreview component, but that's not in use anymore
export const getUsersWithAccessFromSpecificSong = async (songDocumentId) => {



}