import '../styles/globals.css'
import AudioDevUtilities from '../components/Audio/AudioDevUtilities'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AudioDevUtilities />
      <Component {...pageProps} />
    </>
  )
  
}

export default MyApp
