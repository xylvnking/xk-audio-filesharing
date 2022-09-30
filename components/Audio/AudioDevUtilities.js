import React from 'react'

// export const [userAuth, userAuthIsLoading, userAuthError] = useAuthState(auth)
// fetch('/api/test')
//   .then((res) => res.json())
//   .then((x) => {
//     console.log(x)
//   })
// fetch('/api/hello')
//   .then((res) => res.json())
//   .then((x) => {
//     console.log(x)
//   })

// fetch('/api/test', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     // body: JSON.stringify({someField: 'someValue'})
//     body: JSON.stringify(auth)
// }).then((res) => res.json())
//   .then((x) => {
//     console.log(x)
//   })

const resetFirebase = () => {
    fetch('/api/resetDatabase')
    .then((res) => res.json())
    .then((x) => {
    console.log(x)
  })
}
const resetDataBypass = () => {
    fetch('/api/resetDataBypass')
    .then((res) => res.json())
    .then((x) => {
    console.log(x)
  })
}

export default function AudioDevUtilities() {
  return (
    <>
    <button onClick={resetFirebase}>Reset Firebase</button>
    <button onClick={resetDataBypass}>Reset resetDataBypass</button>

    </>
  )
}
