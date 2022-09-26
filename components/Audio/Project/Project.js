import React, { useEffect, useState } from 'react'
import ProjectSongPreview from './ProjectSongPreview'
import {getListOfSongsInProject} from './ProjectUtilities'

export default function Project(props) {
    // i think potentially creating subcomponents for each song and passing in the sone name and making a firebase query based on that 
    // is better than getting all the data here and needing to constantly map over the entire projects data
    const [listOfSongsInProject, setListOfSongsInProject] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getProjectData = async () => {
            const result = await getListOfSongsInProject(props.userAuth.uid, props.projectName)
            // console.log(result)
            // console.log(result.songList)
            setListOfSongsInProject(result.songList)
            setIsLoading(false)
        }
        getProjectData()
    }, [props.userAuth, props.projectName])

    return (
        <>  
            {
                !listOfSongsInProject && !isLoading &&
                <>
                    <h1>I think you entered the wrong project name! No project exists by the name of {props.projectName}.</h1>
                    <h1>Projects you're authorized on show up <a style={{textDecoration: 'underline'}}>on your profile.</a></h1>
                    <h1>If you're supposed to be authorized, contact an admin of the song and double check that they've added you.</h1>
                    <h1>If you're still having problems <a style={{textDecoration: 'underline'}}>contact me directly.</a></h1>
                </>
            }
            {
                listOfSongsInProject &&
                <>
                <h1>Project name: {props.projectName}</h1>
                {

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
                </>
            }
            {/* {listOfSongsInProject} */}
            {/* song subcomponent */}

        </>
    )
}
