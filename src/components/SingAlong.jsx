import { useState, useEffect, useRef, useCallback } from 'react'
import { NURSERY_RHYMES } from '../utils/nurseryRhymes.js'
import styles from './SingAlong.module.css'

export default function SingAlong({ speech, onExit }) {
  const [screen, setScreen] = useState('pick') // 'pick' | 'sing'
  const [song, setSong] = useState(null)
  const [lineIdx, setLineIdx] = useState(0)
  const [wordIdx, setWordIdx] = useState(-1)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')
  const rafRef = useRef(null)
  const autoRef = useRef(null)

  const clearTimers = () => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
    if (autoRef.current) { clearTimeout(autoRef.current); autoRef.current = null }
  }

  // Char-proportion karaoke tracking via RAF
  const startWordTracking = useCallback((line) => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
    const words = line.trim().split(/\s+/).filter(Boolean)
    if (!words.length) return
    const totalChars = words.reduce((s, w) => s + w.length, 0)

    const tick = () => {
      const audio = speech.audioRef.current
      if (audio && audio.duration > 0) {
        const progress = Math.min(audio.currentTime / audio.duration, 1)
        const charPos = progress * totalChars
        let cumChars = 0
        let idx = words.length - 1
        for (let i = 0; i < words.length; i++) {
          cumChars += words[i].length
          if (charPos <= cumChars) { idx = i; break }
        }
        setWordIdx(idx)
      } else if (speech.boundaryWordRef.current >= 0) {
        setWordIdx(Math.min(speech.boundaryWordRef.current, words.length - 1))
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [speech])

  const speakLine = useCallback((line) => {
    clearTimers()
    setWordIdx(-1)
    setIsSpeaking(true)
    setStatusMsg('🎵 Listen and sing along!')
    startWordTracking(line)
    speech.speak(line, () => {
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
      setWordIdx(-1)
      setIsSpeaking(false)
      setStatusMsg('Now YOU sing it! 🎤')
    })
  }, [speech, startWordTracking])

  // Cleanup on unmount
  useEffect(() => () => {
    clearTimers()
    speech.stopSpeaking()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handlePickSong = (rhyme) => {
    setSong(rhyme)
    setLineIdx(0)
    setWordIdx(-1)
    setScreen('sing')
    setTimeout(() => speakLine(rhyme.lines[0]), 400)
  }

  const handleNextLine = useCallback(() => {
    if (isSpeaking || !song) return
    clearTimers()
    const next = lineIdx + 1
    if (next >= song.lines.length) {
      setStatusMsg('🎉 Amazing singing!')
      setTimeout(() => setScreen('pick'), 1500)
    } else {
      setLineIdx(next)
      setTimeout(() => speakLine(song.lines[next]), 150)
    }
  }, [isSpeaking, lineIdx, song, speakLine])

  const handleReplay = () => {
    if (isSpeaking || !song) return
    speakLine(song.lines[lineIdx])
  }

  const handleBackToPick = () => {
    clearTimers()
    speech.stopSpeaking()
    setScreen('pick')
    setSong(null)
    setLineIdx(0)
    setWordIdx(-1)
    setStatusMsg('')
    setIsSpeaking(false)
  }

  /* ── Song Picker ──────────────────────────────── */
  if (screen === 'pick') {
    return (
      <div className={styles.overlay}>
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={onExit}>← Back</button>
          <span className={styles.topTitle}>🎵 Sing Along!</span>
          <div style={{ width: 70 }} />
        </div>

        <p className={styles.pickTitle}>Pick a song!</p>

        <div className={styles.songList}>
          {NURSERY_RHYMES.map((r, i) => (
            <button
              key={r.id}
              className={styles.songBtn}
              style={{ animationDelay: `${i * 0.04}s` }}
              onClick={() => handlePickSong(r)}
            >
              <span className={styles.songEmoji}>{r.emoji}</span>
              <span className={styles.songName}>{r.title}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  /* ── Sing Screen ──────────────────────────────── */
  const words = song.lines[lineIdx].trim().split(/\s+/).filter(Boolean)
  const isLast = lineIdx === song.lines.length - 1

  return (
    <div className={styles.overlay}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={handleBackToPick}>🎵 Songs</button>
        <span className={styles.topTitle}>{song.emoji} {song.title}</span>
        <div style={{ width: 70 }} />
      </div>

      <div className={styles.lyricsBlock}>
        {song.lines.map((line, i) => (
          <p
            key={i}
            className={[
              styles.lyricLine,
              i === lineIdx ? styles.activeLine : '',
              i < lineIdx  ? styles.doneLine   : '',
            ].join(' ')}
          >
            {i === lineIdx
              ? words.map((word, wi) => (
                  <span key={wi} className={`${styles.word} ${wi === wordIdx ? styles.activeWord : ''}`}>
                    {wi === wordIdx && <span className={styles.dot} aria-hidden="true">●</span>}
                    {word}{' '}
                  </span>
                ))
              : line
            }
          </p>
        ))}
      </div>

      <p className={styles.statusLine}>{statusMsg}</p>

      <div className={styles.controls}>
        <button
          className={styles.replayBtn}
          onClick={handleReplay}
          disabled={isSpeaking}
          aria-label="Hear this line again"
        >
          🔁 Again
        </button>
        <button
          className={styles.nextBtn}
          onClick={handleNextLine}
          disabled={isSpeaking}
          aria-label={isLast ? 'Finish song' : 'Next line'}
        >
          {isLast ? '🎉 Yay, done!' : '▶ Next line'}
        </button>
      </div>

      <p className={styles.lineCounter}>{lineIdx + 1} / {song.lines.length}</p>
    </div>
  )
}
