export const getSongsFromFirebaseForProfileSongs = async (someData) => {

//     let responsy = null
//     await fetch('/api/audio/getSongsFromFirebaseForProfileSongs')
//     .then((res) => res.json())
//     .then((x) => {
//         responsy = x
//   })
//   return responsy

        let fetchedData = null
        await fetch('/api/audio/getSongsFromFirebaseForProfileSongs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(someData)
        })
        .then((res) => res.json())
        .then((x) => {
            fetchedData = x
        })
        return fetchedData





}
