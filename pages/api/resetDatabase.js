// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// this call needs to reset the firebase database 
import { db, auth } from "../../firebase/firebase-config";
import { collection, addDoc, doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { fakeData } from "../../fakeData";

export default async function handler(req, res) {
    console.log(auth)

    // creating PROJECTS

    await deleteDoc(doc(db, 'projects', 'projectName1'))
    await setDoc(doc(db, 'projects', 'projectName1'), { // create projects collection
        metadata: {
            projectName: 'projectName1',
            dateOfMostRecentEdit: '5'
        },
        songs : [
            'songName1',
            'songName3',

        ],
        usersWithAccess: [ // array seems like the right choice
            'someUID1',
            'someUID2',
            'UIDfakefakefake',
            'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1',
            'xylvnKing'
        ],
        usersWithAdminRole: [
            'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1'
        ]
        
    }).catch((error) => { console.log(error) })
    
    await deleteDoc(doc(db, 'projects', 'projectName2'))
    await setDoc(doc(db, 'projects', 'projectName2'), { // create projects collection
        metadata: {
            projectName: 'projectName2',
            dateOfMostRecentEdit: '5'
        },
        songs: [
            'songName2'
        ],
        usersWithAccess: [ // array seems like the right choice
            'someUID1',
            // 'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1',
        ]
        


    }).catch((error) => { console.log(error) })




    

    // creating SONGS

    // await deleteDoc(doc(db, 'songs', 'songName1'))
    // await setDoc(doc(db, 'songs', 'songName1'), { // create songs collection
    //     metadata: {
    //         songName: 'songName1',
    //         songField1: 'someValue1',
    //         documentId: 'songName1',
    //         dateOfMostRecentEdit: 5,
    //         projectName: 'projectName1',
    //     },
    //     usersWithAccess: [ // array seems like the right choice
    //         'someUID1',
    //         'someUID2',
    //         'UIDfakefakefake',
    //         'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1',
    //         'xylvnKing'
    //     ],
    //     usersWithAdmin: [
    //         'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1'
    //     ],
    //     subcomponentsPublic: {
    //         usersWith: true,
    //         metadata: true,
    //         audioPlayer: true,
    //     },
    // }).catch((error) => { console.log(error) })
    // .then(
    //     setDoc(doc(db, 'songs', 'songName1', 'fileVersions', 'fileVersionName1'), {
    //         fileVersionName: 'fileVersionName1',
    //         dateOfMostRecentEdit: '666',
    //         revisionNote: 'this is a revision note for fileVersionName1',
    //         downloadUrl: 'pathToStorageBucket'
    //     })
    // ).catch((error) => { console.log(error) })
    // .then(
    //     setDoc(doc(db, 'songs', 'songName1', 'fileVersions', 'fileVersionName2'), {
    //         fileVersionName: 'fileVersionName2',
    //         dateOfMostRecentEdit: '777',
    //         revisionNote: 'this is a revision note for fileVersionName2',
    //         downloadUrl: 'pathToStorageBucket'
    //     })
    // ).catch((error) => { console.log(error) })

    //     // song 2

    // await deleteDoc(doc(db, 'songs', 'songName2'))
    // await setDoc(doc(db, 'songs', 'songName2'), { // create songs collection
    //     metadata: {
    //         songName: 'songName2',
    //         documentId: 'songName2',
    //         dateOfMostRecentEdit: 3,
    //         projectName: 'projectName2'
    //     },
    //     usersWithAccess: [ // array seems like the right choice
    //         'someUID1',
    //         'someUID2',
    //         'someUID3',
    //         // 'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1',
    //         'xylvnKing'
    //     ],
    //     usersWithAdmin: [
    //     ],
    //     subcomponentsPublic: {
    //         usersWith: true,
    //         metadata: true,
    //         audioPlayer: true,
    //     },
    // }).catch((error) => { console.log(error) })
    // .then(
    //     setDoc(doc(db, 'songs', 'songName2', 'fileVersions', 'fileVersionName1'), {
    //         fileVersionName: 'fileVersionName1',
    //         dateOfMostRecentEdit: '777',
    //         revisionNote: 'this is a revision note for fileVersionName1',
    //         downloadUrl: 'pathToStorageBucket'
    //     })
    // ).catch((error) => { console.log(error) })

    //     // song 3

    // await deleteDoc(doc(db, 'songs', 'songName3'))
    // await setDoc(doc(db, 'songs', 'songName3'), { // create songs collection
    //     metadata: {
    //         songName: 'songName3',
    //         songField1: 'someValue1',
    //         documentId: 'songName3',
    //         dateOfMostRecentEdit: 1,
    //         projectName: 'projectName1',
    //     },
    //     usersWithAccess: [ // array seems like the right choice
    //         'someUID1',
    //         'someUID2',
    //         'UIDfakefakefake',
    //         'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1',
    //         'xylvnKing'
    //     ],
    //     usersWithAdmin: [
    //         'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1'
    //     ],
    //     subcomponentsPublic: {
    //         usersWith: true,
    //         metadata: true,
    //         audioPlayer: true,
    //     },
    // }).catch((error) => { console.log(error) })
    // .then(
    //     setDoc(doc(db, 'songs', 'songName3', 'fileVersions', 'fileVersionName1'), {
    //         fileVersionName: 'fileVersionName1',
    //         dateOfMostRecentEdit: '777',
    //         revisionNote: 'this is a revision note for fileVersionName1',
    //         downloadUrl: 'pathToStorageBucket'
    //     })
    // ).catch((error) => { console.log(error) })
    
    //     // song 4

    // await deleteDoc(doc(db, 'songs', 'songName4'))
    // await setDoc(doc(db, 'songs', 'songName4'), { // create songs collection
    //     metadata: {
    //         songName: 'songName4',
    //         documentId: 'songName4',
    //         dateOfMostRecentEdit: 90,
    //     },
    //     usersWithAccess: [ // array seems like the right choice
    //         'someUID1',
    //         'someUID2',
    //         'someUID3',
    //         'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1',
    //         'UIDfakefakefake',
    //         'xylvnKing'
    //     ],
    //     usersWithAdmin: [
    //         'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1'
    //     ],
    //     subcomponentsPublic: {
    //         usersWith: true,
    //         metadata: true,
    //         audioPlayer: true,
    //     },
    // }).catch((error) => { console.log(error) })
    // .then(
    //     setDoc(doc(db, 'songs', 'songName4', 'fileVersions', 'fileVersionName1'), {
    //         fileVersionName: 'fileVersionName1',
    //         dateOfMostRecentEdit: '777',
    //         revisionNote: 'this is a revision note for fileVersionName1',
    //         downloadUrl: 'pathToStorageBucket'
    //     })
    // ).catch((error) => { console.log(error) })


    //     // song 5

    // await deleteDoc(doc(db, 'songs', 'songName5'))
    // await setDoc(doc(db, 'songs', 'songName5'), { // create songs collection
    //     metadata: {
    //         songName: 'songName5',
    //         documentId: 'songName5',
    //         dateOfMostRecentEdit: 90,
    //     },
    //     usersWithAccess: [ // array seems like the right choice
    //         'someUID1',
    //         'someUID2',
    //         'someUID3',
    //         'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1',
    //         'UIDfakefakefake',
    //         'xylvnKing'
    //     ],
    //     usersWithAdmin: [
    //     ],
    //     subcomponentsPublic: {
    //         usersWith: true,
    //         metadata: true,
    //         audioPlayer: true,
    //     },
    // }).catch((error) => { console.log(error) })
    // .then(
    //     setDoc(doc(db, 'songs', 'songName5', 'fileVersions', 'fileVersionName1'), {
    //         fileVersionName: 'fileVersionName1',
    //         dateOfMostRecentEdit: '777',
    //         revisionNote: 'this is a revision note for fileVersionName1',
    //         downloadUrl: 'pathToStorageBucket'
    //     })
    // ).catch((error) => { console.log(error) })







    
    //     // song 6

    // await deleteDoc(doc(db, 'songs', 'songName6---doc1664465789'))
    // await setDoc(doc(db, 'songs', 'songName5'), { // create songs collection
    //     metadata: {
    //         songName: 'songName5',
    //         songField1: 'someValue1',
    //         songField2: 'someValue2',
    //         dateOfMostRecentEdit: 90,
    //     },
    //     usersWithAccess: [ // array seems like the right choice
    //         'someUID1',
    //         'someUID2',
    //         'someUID3',
    //         'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1',
    //         'UIDfakefakefake',
    //         'xylvnKing'
    //     ],
    //     usersWithAdmin: [
    //     ],
    //     subcomponentsPublic: {
    //         usersWith: true,
    //         metadata: true,
    //         audioPlayer: true,
    //     },
    // }).catch((error) => { console.log(error) })
    // .then(
    //     setDoc(doc(db, 'songs', 'songName5', 'fileVersions', 'fileVersionName1'), {
    //         fileVersionName: 'fileVersionName1',
    //         dateOfMostRecentEdit: '777',
    //         revisionNote: 'this is a revision note for fileVersionName1',
    //         downloadUrl: 'pathToStorageBucket'
    //     })
    // ).catch((error) => { console.log(error) })












    // creating ARTISTS

    await deleteDoc(doc(db, 'users', 'dsdxGrUhqVcdhLpEP3kSeSW6Axi2'))
    await setDoc(doc(db, 'users', 'dsdxGrUhqVcdhLpEP3kSeSW6Axi2'), { // create users collection
        metadata: {
            uid:'dsdxGrUhqVcdhLpEP3kSeSW6Axi2',
            artistName: 'artistName1',
            email: 'dylanking6132@gmail.com',
            realName: 'someName',
            photoURL: 'https://lh3.googleusercontent.com/a-/ACNPEu-pmVjFVtRIVIPLGS39Z2qZNHunSqG4Tuaes_FU5g=s96-c',
        },
        songsAuthorizedOn: [
            'songName1',
            'songName2',
            'songName3'
        ],
        projectsAuthorizedOn: [
            'projectName1',
        ],
        songsWithAdmin: [
            'songName1',
            'songName3',
            'songName4',
        ],
        projectsWithAdmin: [
            'projectName1',
            
        ]

    }).catch((error) => { console.log(error) })
    
    
    
    await deleteDoc(doc(db, 'users', 'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1'))
    await setDoc(doc(db, 'users', 'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1'), { // create users collection

        metadata: {
            uid: 'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1',
            artistName: 'xylvnKing',
            email: 'xylvnking@gmail.com',
            realName: 'Dylan King',
            photoURL: 'https://lh3.googleusercontent.com/a-/ACNPEu_VLAjn1_dZjuE1yjxGS0FFKGRYaMOkmL93bkMM=s96-c',
            
            
        },
        songsAuthorizedOn: [
            'songName1',
            'songName3',
            'songName4',
            'projectName1',
            'songName5'
            // 'projectName2',
        ],
        songsWithAdmin: [
            'songName1',
            'songName3',
            'songName4',
        ],
        projectsWithAdmin: [
            'projectName1',
            
        ]

    }).catch((error) => { console.log(error) })







    // song 6

    const docRef = await addDoc(collection(db, 'songs'), {
                metadata: {
                    songName: 'songName6',
                    dateOfMostRecentEdit: 90,
                },
                usersWithAccess: [ // array seems like the right choice
                    'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1',
                    'dsdxGrUhqVcdhLpEP3kSeSW6Axi2',
                    'UIDfakefakefake',
                    'xylvnKing'
                ],
                usersWithAdmin: [
                    'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1',
                    'dsdxGrUhqVcdhLpEP3kSeSW6Axi2',
                ],
                subcomponentsPublic: {
                    usersWith: true,
                    metadata: true,
                    audioPlayer: true,
                },
    })

    // then the document id has to be put into the metadata
    const songDocToUpdate = doc(db, 'songs', docRef.id)
    await updateDoc(songDocToUpdate, {
        'metadata.documentId': docRef.id
    })
    
    const fileVersionDocumentRef = await addDoc(collection(db, 'songs', docRef.id, 'fileVersions'), {
        fileVersionName: 'fileVersionName1',
        // dateOfMostRecentEdit: '666',
        dateOfMostRecentEdit: new Date(),
        revisionNote: 'this is a revision note for fileVersionName1',
        downloadUrl: 'pathToStorageBucket'
    })
    const fileVersionDocumentToUpdate1 = doc(db, 'songs', docRef.id, 'fileVersions', fileVersionDocumentRef.id)
    await updateDoc(fileVersionDocumentToUpdate1, {
        'metadata.fileVersionDocumentId': fileVersionDocumentRef.id
    })

    const fileVersionDocumentRef2 = await addDoc(collection(db, 'songs', docRef.id, 'fileVersions'), {
        fileVersionName: 'fileVersionName2',
        // dateOfMostRecentEdit: '777',
        dateOfMostRecentEdit: new Date(),
        revisionNote: 'this is a revision note for fileVersionName2',
        downloadUrl: 'pathToStorageBucket'
    })
    const fileVersionDocumentToUpdate2 = doc(db, 'songs', docRef.id, 'fileVersions', fileVersionDocumentRef2.id)
    await updateDoc(fileVersionDocumentToUpdate2, {
        'metadata.fileVersionDocumentId': fileVersionDocumentRef2.id
    })



    // song 7

    const docRef7 = await addDoc(collection(db, 'songs'), {
                metadata: {
                    songName: 'songName7',
                    dateOfMostRecentEdit: 92,
                },
                usersWithAccess: [ // array seems like the right choice
                    'someUID1',
                    'someUID2',
                    'someUID3',
                    'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1',
                    'dsdxGrUhqVcdhLpEP3kSeSW6Axi2',
                    'UIDfakefakefake',
                    'xylvnKing'
                ],
                usersWithAdmin: [
                    'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1',
                    'somefakeuid'
                ],
                subcomponentsPublic: {
                    usersWith: true,
                    metadata: true,
                    audioPlayer: true,
                },
    })

    // then the document id has to be put into the metadata
    const songDocToUpdate7 = doc(db, 'songs', docRef7.id)
    await updateDoc(songDocToUpdate7, {
        'metadata.documentId': docRef7.id
    })
    
    const fileVersionDocumentRef71 = await addDoc(collection(db, 'songs', docRef7.id, 'fileVersions'), {
        fileVersionName: 'fileVersionName1',
        // dateOfMostRecentEdit: '666',
        dateOfMostRecentEdit: new Date(),
        revisionNote: 'this is a revision note for fileVersionName1',
        downloadUrl: 'pathToStorageBucket'
    })
    const fileVersionDocumentToUpdate71 = doc(db, 'songs', docRef7.id, 'fileVersions', fileVersionDocumentRef71.id)
    await updateDoc(fileVersionDocumentToUpdate71, {
        'metadata.fileVersionDocumentId': fileVersionDocumentRef71.id
    })

    const fileVersionDocumentRef72 = await addDoc(collection(db, 'songs', docRef7.id, 'fileVersions'), {
        fileVersionName: 'fileVersionName2',
        // dateOfMostRecentEdit: '777',
        dateOfMostRecentEdit: new Date(),
        revisionNote: 'this is a revision note for fileVersionName2',
        downloadUrl: 'pathToStorageBucket'
    })
    const fileVersionDocumentToUpdate72 = doc(db, 'songs', docRef7.id, 'fileVersions', fileVersionDocumentRef72.id)
    await updateDoc(fileVersionDocumentToUpdate72, {
        'metadata.fileVersionDocumentId': fileVersionDocumentRef72.id
    })
    
    // setDoc(doc(db, 'songs', docRef.id, 'fileVersions', 'fileVersionName1'), {
    //     fileVersionName: 'fileVersionName1',
    //     dateOfMostRecentEdit: '777',
    //     revisionNote: 'this is a revision note for fileVersionName1',
    //     downloadUrl: 'pathToStorageBucket'
    // })
    




    const userDocToUpdate = doc(db, 'users', 'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1')
    await updateDoc(userDocToUpdate, {
        songsAuthorizedOn: [
            'songName1',
            'songName3',
            'songName4',
            'projectName1',
            'songName5',
            docRef.id,
            docRef7.id,
        ],
        songsWithAdmin: [
            'songName1',
            'songName3',
            'songName4',
            docRef.id,
            docRef7.id
        ],
    })
    // console.log(docRef7.id)
    const userDocToUpdate2 = doc(db, 'users', 'dsdxGrUhqVcdhLpEP3kSeSW6Axi2')
    await updateDoc(userDocToUpdate2, {
        songsAuthorizedOn: [
            'songName1',
            'songName3',
            'songName4',
            'projectName1',
            'songName5',
            docRef.id,
            docRef7.id,
        ],
        songsWithAdmin: [
            'songName1',
            'songName3',
            'songName4',
            docRef.id,
        ],
    })






    res.status(200).json({ databaseStatus: 'RESET' })
}
