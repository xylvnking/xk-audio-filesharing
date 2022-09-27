import { doc, getDoc, query, where, orderBy, limit, collection, getDocs  } from "firebase/firestore";
// import { collection, doc, setDoc } from "firebase/firestore"; 


import { db } from "../../../../firebase/firebase-config"

export const getSongsAndProjectsUserIsAuthorizedOn = async (userUID) => {
    return 'getSongsAndProjectsUserIsAuthorizedOn returned'
}