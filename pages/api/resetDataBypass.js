// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { db } from "../../firebase/firebase-config";

export default async function handler(req, res) {
    const data = {
        name: 'Los Angeles',
        state: 'CA',
        country: 'USA'
      };
    const resp = await db.collection('cities').doc('LA').set(data);


    res.status(200).json({ name: 'John Doe' })
  }
  