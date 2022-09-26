import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

export const getListOfSongsTheUserIsAuthorizedOn = async (userUID) => {

    const docRef = doc(db, 'users', userUID)
    const docSnapshot = await getDoc(docRef)
    if (docSnapshot.exists()) {
        // console.log("Document data:", docSnapshot.data());
        // console.log(docSnapshot.data().songsAuthorizedOn)
        return docSnapshot.data().songsAuthorizedOn
        // console.log(x)
        // return docSnapshot.data().songsAuthorizedOn
      } else {
        console.log("No such document!");
      }

    // let x = []
    // const populate = async () => {
    //     x = ['song1', 'song2', 'song3']
        
    // }
    // populate()
    // return x
    let x = []

    const queryFirebaseForListOfSongsTheUserIsAuthorizedOn = async () => {
        const docRef = doc(db, 'users', userUID)
        const docSnapshot = await getDoc(docRef)
        if (docSnapshot.exists()) {
            // console.log("Document data:", docSnapshot.data());
            // console.log(docSnapshot.data().songsAuthorizedOn)
            x = docSnapshot.data().songsAuthorizedOn
            // console.log(x)
            // return docSnapshot.data().songsAuthorizedOn
          } else {
            console.log("No such document!");
          }

    }
    // queryFirebaseForListOfSongsTheUserIsAuthorizedOn()
    // console.log(x)
    // return x



}
