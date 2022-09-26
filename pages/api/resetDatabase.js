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
            projectName: 'projectName',
            numberOfSongs: 3
        },
        songName1: 'songName1',
        songName2: 'songName2',
        songName3: 'songName3',

    }).catch((error) => { console.log(error) })




    

    // creating SONGS

    await deleteDoc(doc(db, 'songs', 'songName1'))
    await setDoc(doc(db, 'songs', 'songName1'), { // create songs collection
        metadata: {
            songField1: 'someValue1',
            songField2: 'someValue2',
        },
        usersWithAccess: [ // array seems like the right choice
            'someUID1',
            'someUID2',
            'someUID3',
            'c6EqhwHBFCZ6qIPOQRfZp1UTFyo1',
            'xylvnKing'
        ]
    }).catch((error) => { console.log(error) })
    .then(
        setDoc(doc(db, 'songs', 'songName1', 'fileVersions', 'fileVersionName1'), {
            someFieldCreatedX: 'someValueCreatedX',
            someFieldCreatedX2: 'someValueCreatedX2',
        })
    ).catch((error) => { console.log(error) })








    // creating ARTISTS

    await deleteDoc(doc(db, 'users', 'artistName1'))
    await setDoc(doc(db, 'users', 'artistName1'), { // create users collection
        metadata: {
            artistName: 'artistName1',
            someField: 'someValue',
            email: 'fakeEmail@fakeEmail.com',
            realName: 'someName',
        },
        songsAuthorizedOn: [
            'songName1',
            'songName2',
            'songName3'
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
            'songName2',
            'songName3'
        ]

    }).catch((error) => { console.log(error) })





    res.status(200).json({ name: 'it has been done' })
}
