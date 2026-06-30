import { useState } from 'react'
import styles from './LabelCard.module.css'

export default function LabelCard({ step, onComplete }) {
  const [placed, setPlaced] = useState([])

  const handleTap = (item) => {
    const next = [...placed, item]
    setPlaced(next)
    if (next.length === step.items.length) {
      setTimeout(onComplete, 500)
    }
  }

  const remaining = step.items.filter(item => !placed.includes(item))

  return (
    <div className={styles.card}>
      <span className={styles.visual}>{step.visual}</span>
      <p className={styles.instruction}>Tap the labels in order ↓</p>

      <div className={styles.placed}>
        {step.items.map((item, i) => (
          <span
            key={item}
            className={`${styles.labelSlot} ${placed.includes(item) ? styles.labelFilled : styles.labelEmpty}`}
          >
            {placed.includes(item) ? item : `${i + 1}`}
          </span>
        ))}
      </div>

      <div className={styles.chips}>
        {remaining.map(item => (
          <button key={item} className={styles.chip} onClick={() => handleTap(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}
