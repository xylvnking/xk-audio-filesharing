// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// this call needs to reset the firebase database 
import { db, auth } from "../../firebase/firebase-config";
import { collection, addDoc, doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { fakeData } from "../../fakeData";

export default async function handler(req, res) {

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
        songsWithAccess: [
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
        songsWithAccess: [
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
                    dateOfMostRecentEdit: new Date(),
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
                    dateOfMostRecentEdit: new Date(),
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
        songsWithAccess: [
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
        songsWithAccess: [
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
