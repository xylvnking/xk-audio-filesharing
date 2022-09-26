import React, { useEffect, useState } from 'react'
import ProjectSongPreview from './ProjectSongPreview'
import {getListOfSongsInProject} from './ProjectUtilities'

export default function Project(props) {
    // i think potentially creating subcomponents for each song and passing in the sone name and making a firebase query based on that 
    // is better than getting all the data here and needing to constantly map over the entire projects data
    const [listOfSongsInProject, setListOfSongsInProject] = useState(null)

    useEffect(() => {
        const getProjectData = async () => {
            const result = await getListOfSongsInProject(props.userAuth.uid, props.projectName)
            console.log(result)
            setListOfSongsInProject(result.songs)
        }
        getProjectData()
    }, [props.userAuth, props.projectName])

    return (
        <>
            <h1>Project name: {props.projectName}</h1>
            {
                listOfSongsInProject &&
                listOfSongsInProject.map((song, index) => {
                    return (
                        <ProjectSongPreview 
                            key={index}
                            songName={song}
                            // should I pass in list of authorized users and whatnot here? I already have it from the project data
                        />
                    )
                })
            }
            {/* {listOfSongsInProject} */}
            {/* song subcomponent */}

        </>
    )
}
