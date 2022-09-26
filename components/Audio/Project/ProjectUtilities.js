import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

export const getListOfSongsInProject = async (userUID, projectName) => {
    const projectsRef = collection(db, 'projects');

    const projectQuery = query(projectsRef, where('usersWithAccess', 'array-contains', userUID), where('metadata.projectName', '==', projectName))

    const projectQuerySnapshot = await getDocs(projectQuery)

    let data = {
        projectData: null,
        songList: null
    }

    projectQuerySnapshot.forEach((project) => {
        data.projectData = project.data()
        data.songList = project.data().songs
        // if (project.data()) {

        // }
        // console.log(project.id, " => ", project.data() )
    })

    // console.log(data)

    return data

}