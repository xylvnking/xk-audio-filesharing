// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { signInWithPopup, signOut } from 'firebase/auth'
import { db, auth, provider } from '../../firebase/firebase-config';

export default function handler(req, res) {
    console.log(auth)
    // if (req.method !== 'POST') {
    //     res.status(200).json('you didnt make a post request')
    //     return
    // }
    // const body = JSON.parse(req.body)
    // res.status(200).json({someField: 'you sent data!'})
    // res.status(200).json(req.body)
    res.status(200).json(auth)
  }
  