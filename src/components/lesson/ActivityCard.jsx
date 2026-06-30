import { useState } from 'react'
import VoiceButton from '../VoiceButton.jsx'
import styles from './ActivityCard.module.css'

export default function ActivityCard({ step, settings, speech, onComplete }) {
  const [transcript, setTranscript] = useState('')
  const [listening, setListening] = useState(false)
  const buddyName = settings.buddyName || 'Buddy'

  const handlePress = () => {
    if (listening) {
      speech.stopListening()
      setListening(false)
      return
    }
    setListening(true)
    speech.startListening((text) => {
      setTranscript(text)
      setListening(false)
      onComplete()
    })
  }

  const status = listening ? 'listening' : 'idle'

  return (
    <div className={styles.card}>
      {!transcript && (
        <p className={styles.hint}>Tap the mic and speak your answer!</p>
      )}
      <VoiceButton status={status} onPress={handlePress} buddyName={buddyName} />
      {transcript && (
        <p className={styles.transcript}>"{transcript}"</p>
      )}
    </div>
  )
}
