import { doc, getDoc, query, where, orderBy, limit, collection, getDocs  } from "firebase/firestore";
// import { collection, doc, setDoc } from "firebase/firestore"; 


import { db } from "../../../firebase/firebase-config";

export const getListOfSongsUserIsAuthorizedOn = async (userUID) => {

    const songsRef = collection(db, 'songs');

    const songDocsAuthorizedOn = query(songsRef, where('usersWithAccess', 'array-contains', userUID))

    let songNamesList = []
    let allSongData = []

    const querySnapshot = await getDocs(songDocsAuthorizedOn);

    querySnapshot.forEach((doc) => {
        allSongData.push(doc.data())
    })

    allSongData.sort(function(a, b) { // sort by date
        return a.metadata.dateOfMostRecentEdit + b.metadata.dateOfMostRecentEdit
    })

    allSongData.forEach((song) => {
        songNamesList.push(song.metadata.songName)
    })

    return songNamesList

    // beta method
    // const docRef = doc(db, 'users', userUID)
    // const docSnapshot = await getDoc(docRef)
    // if (docSnapshot.exists()) {

    //     return docSnapshot.data().songsAuthorizedOn

    //   } else {
    //     console.log("No such document!");
    //   }

}

export const getListOfProjectsUserIsAuthorizedOn = async (userUID) => {

    
    const projectsRef = collection(db, 'projects')

    const projectDocsAuthorizedOn = query(projectsRef, where('usersWithAccess', 'array-contains', userUID))

    let projectsNamesList = []
    let allProjectsData = []

    const querySnapshot = await getDocs(projectDocsAuthorizedOn);

    querySnapshot.forEach((doc) => {
        allProjectsData.push(doc.data())
        
    })

    allProjectsData.sort(function(a, b) { // sort by date
        return a.metadata.dateOfMostRecentEdit + b.metadata.dateOfMostRecentEdit
    })
    
    // console.log(allProjectsData)
    allProjectsData.forEach((project) => {
        projectsNamesList.push(project.metadata.projectName)
    })

    return projectsNamesList
}
