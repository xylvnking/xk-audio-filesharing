import '../styles/globals.css'
import AudioDevUtilities from '../components/Audio/AudioDevUtilities'
import AudioLayout from '../components/Audio/AudioLayout/AudioLayout'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AudioDevUtilities />
      <AudioLayout>

        <Component {...pageProps} />

      </AudioLayout>

    </>
  )
  
}

export default MyApp
