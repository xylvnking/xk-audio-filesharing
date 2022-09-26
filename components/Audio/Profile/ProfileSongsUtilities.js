import { doc, getDoc, query, where, orderBy, limit, collection, getDocs  } from "firebase/firestore";
// import { collection, doc, setDoc } from "firebase/firestore"; 


import { db } from "../../../firebase/firebase-config";

export const getListOfSongsTheUserIsAuthorizedOn = async (userUID) => {

    const songsRef = collection(db, 'songs');

    // console.log('yer')
    // const songDocsAuthorizedOn = query(songsRef, where('usersWithAccess', 'array-contains', userUID), orderBy('metadata.dataOfMostRecentEdit'))
    // const songDocsAuthorizedOn = query(songsRef, where('usersWithAccess', 'array-contains', userUID), orderBy('dataOfMostRecentEdit'))
    const songDocsAuthorizedOn = query(songsRef, where('usersWithAccess', 'array-contains', userUID))
    // const songDocsAuthorizedOn = query(songsRef, where('usersWithAccess', 'array-contains', userUID))
    // console.log(songDocsAuthorizedOn)
    let songList = []
    let allSongData = []
    const querySnapshot = await getDocs(songDocsAuthorizedOn);
    // console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
        // songList.push(doc.id)

        allSongData.push(doc.data())
        // console.log(doc)
        
        // console.log(doc.id, " => ", doc.data());
    });
    allSongData.sort(function(a, b) { // sort by date
        return a.metadata.dateOfMostRecentEdit + b.metadata.dateOfMostRecentEdit
    })
    // console.log(allSongData)
    allSongData.forEach((song) => {
        songList.push(song.metadata.songName)
    })
      console.log(songList)
    // console.log(x)







    // const docRef = doc(db, 'users', userUID)
    // const docSnapshot = await getDoc(docRef)
    // if (docSnapshot.exists()) {

    //     return docSnapshot.data().songsAuthorizedOn

    //   } else {
    //     console.log("No such document!");
    //   }



}
