// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// this call needs to reset the firebase database 
import { db } from "../../firebase/firebase-config";
import { collection, addDoc, doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { fakeData } from "../../fakeData";

export default async function handler(req, res) {


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

    await deleteDoc(doc(db, 'songs', 'songName1'))
    await setDoc(doc(db, 'songs', 'songName1'), { // create songs collection
        metadata: {
            songName: 'songName1',
            songField1: 'someValue1',
            songField2: 'someValue2',
            dateOfMostRecentEdit: 5,
            projectName: 'projectName1',
        },
        usersWithAccess: [ // array seems like the right choice
            'someUID1',
            'someUID2',
            'UIDfakefakefake',
            'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1',
            'xylvnKing'
        ],
        subcomponentsPublic: {
            usersWith: true,
            metadata: true,
            audioPlayer: true,
        },
        usersWithAdmin: [
            'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1'
        ]
    }).catch((error) => { console.log(error) })
    .then(
        setDoc(doc(db, 'songs', 'songName1', 'fileVersions', 'fileVersionName1'), {
            someFieldCreatedX: 'someValueCreatedX',
            someFieldCreatedX2: 'someValueCreatedX2',
        })
    ).catch((error) => { console.log(error) })

        // song 2

    await deleteDoc(doc(db, 'songs', 'songName2'))
    await setDoc(doc(db, 'songs', 'songName2'), { // create songs collection
        metadata: {
            songName: 'songName2',
            songField1: 'someValue1',
            songField2: 'someValue2',
            dateOfMostRecentEdit: 3,
            projectName: 'projectName2'
        },
        usersWithAccess: [ // array seems like the right choice
            'someUID1',
            'someUID2',
            'someUID3',
            // 'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1',
            'xylvnKing'
        ],
        usersWithAdmin: [
        ]
    }).catch((error) => { console.log(error) })
    .then(
        setDoc(doc(db, 'songs', 'songName2', 'fileVersions', 'fileVersionName1'), {
            someFieldCreatedX: 'someValueCreatedX',
            someFieldCreatedX2: 'someValueCreatedX2',
        })
    ).catch((error) => { console.log(error) })

        // song 3

    await deleteDoc(doc(db, 'songs', 'songName3'))
    await setDoc(doc(db, 'songs', 'songName3'), { // create songs collection
        metadata: {
            songName: 'songName3',
            songField1: 'someValue1',
            songField2: 'someValue2',
            dateOfMostRecentEdit: 1,
            projectName: 'projectName1',
        },
        usersWithAccess: [ // array seems like the right choice
            'someUID1',
            'someUID2',
            'UIDfakefakefake',
            'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1',
            'xylvnKing'
        ],
        usersWithAdmin: [
            'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1'
        ]
    }).catch((error) => { console.log(error) })
    .then(
        setDoc(doc(db, 'songs', 'songName3', 'fileVersions', 'fileVersionName1'), {
            someFieldCreatedX: 'someValueCreatedX',
            someFieldCreatedX2: 'someValueCreatedX2',
        })
    ).catch((error) => { console.log(error) })
    
        // song 4

    await deleteDoc(doc(db, 'songs', 'songName4'))
    await setDoc(doc(db, 'songs', 'songName4'), { // create songs collection
        metadata: {
            songName: 'songName4',
            songField1: 'someValue1',
            songField2: 'someValue2',
            dateOfMostRecentEdit: 90,
        },
        usersWithAccess: [ // array seems like the right choice
            'someUID1',
            'someUID2',
            'someUID3',
            'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1',
            'UIDfakefakefake',
            'xylvnKing'
        ],
        usersWithAdmin: [
            'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1'
        ]
    }).catch((error) => { console.log(error) })
    .then(
        setDoc(doc(db, 'songs', 'songName4', 'fileVersions', 'fileVersionName1'), {
            someFieldCreatedX: 'someValueCreatedX',
            someFieldCreatedX2: 'someValueCreatedX2',
        })
    ).catch((error) => { console.log(error) })
    






    // creating ARTISTS

    await deleteDoc(doc(db, 'users', 'artistName1'))
    await setDoc(doc(db, 'users', 'artistName1'), { // create users collection
        metadata: {
            uid:'UIDfakefakefake',
            artistName: 'artistName1',
            email: 'fakeEmail@fakeEmail.com',
            realName: 'someName',
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
        },
        songsAuthorizedOn: [
            'songName1',
            'songName3',
            'songName4',
            'projectName1',
            // 'projectName2',
        ],
        songsWithAdmin: [
            'songName1',
            'songName3',
            // 'songName4',
        ],
        projectsWithAdmin: [
            'projectName1',
            
        ]

    }).catch((error) => { console.log(error) })





    res.status(200).json({ name: 'it has been done' })
}
