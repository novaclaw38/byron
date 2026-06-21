import styles from './BuddyAvatar.module.css'

const STATE_COLORS = {
  idle:      { face: '#7c3aed', glow: '#a855f7', eye: '#c4b5fd' },
  listening: { face: '#16a34a', glow: '#4ade80', eye: '#bbf7d0' },
  speaking:  { face: '#d97706', glow: '#fcd34d', eye: '#fde68a' },
  thinking:  { face: '#2563eb', glow: '#60a5fa', eye: '#bfdbfe' },
}

export default function BuddyAvatar({ status = 'idle', avatarColor }) {
  const colors = STATE_COLORS[status] || STATE_COLORS.idle
  const faceColor = avatarColor && status === 'idle' ? avatarColor : colors.face

  return (
    <div className={`${styles.container} ${styles[status]}`}>
      <div className={styles.glow} style={{ background: colors.glow }} />

      <svg viewBox="0 0 100 100" className={styles.face} aria-label={`Buddy is ${status}`}>

        {/* Antenna */}
        <rect x="46" y="1" width="8" height="14" rx="4" fill="rgba(255,255,255,0.4)" />
        <circle cx="50" cy="2" r="5" fill={colors.glow} className={styles.antennaDot} />

        {/* Ear bolts */}
        <circle cx="8"  cy="52" r="8" fill={faceColor} />
        <circle cx="8"  cy="52" r="4" fill="rgba(0,0,0,0.22)" />
        <circle cx="92" cy="52" r="8" fill={faceColor} />
        <circle cx="92" cy="52" r="4" fill="rgba(0,0,0,0.22)" />
        {status === 'listening' && (
          <>
            <circle cx="8"  cy="52" r="2" fill={colors.eye} className={styles.ledOn} />
            <circle cx="92" cy="52" r="2" fill={colors.eye} className={styles.ledOn} />
          </>
        )}

        {/* Robot head */}
        <rect x="13" y="13" width="74" height="78" rx="14" fill={faceColor} />
        {/* Top ridge connecting to antenna */}
        <rect x="26" y="10" width="48" height="10" rx="5" fill={faceColor} />
        {/* Inner sheen */}
        <rect x="15" y="15" width="70" height="74" rx="12" fill="rgba(255,255,255,0.07)" />

        {/* Eye screens (dark bezels) */}
        <rect x="19" y="27" width="25" height="22" rx="6" fill="rgba(0,0,0,0.4)" />
        <rect x="56" y="27" width="25" height="22" rx="6" fill="rgba(0,0,0,0.4)" />

        {/* Eyes */}
        <circle
          className={styles.eyeGlow}
          cx="31" cy="38"
          r={status === 'listening' ? 9 : 8}
          fill={colors.eye}
        />
        <circle cx="33" cy="36" r="3.5" fill="#1e1b4b" />
        <circle cx="34" cy="35" r="1.4" fill="white" />

        <circle
          className={styles.eyeGlow}
          cx="69" cy="38"
          r={status === 'listening' ? 9 : 8}
          fill={colors.eye}
        />
        <circle cx="71" cy="36" r="3.5" fill="#1e1b4b" />
        <circle cx="72" cy="35" r="1.4" fill="white" />

        {/* Mouth panel */}
        <rect x="21" y="61" width="58" height="22" rx="7" fill="rgba(0,0,0,0.3)" />

        {status === 'speaking' ? (
          <g className={styles.speakerBars}>
            <rect x="26" y="65" width="5" height="14" rx="2.5" fill={colors.eye} />
            <rect x="34" y="63" width="5" height="18" rx="2.5" fill={colors.eye} />
            <rect x="42" y="67" width="5" height="10" rx="2.5" fill={colors.eye} />
            <rect x="50" y="62" width="5" height="20" rx="2.5" fill={colors.eye} />
            <rect x="58" y="66" width="5" height="12" rx="2.5" fill={colors.eye} />
            <rect x="66" y="64" width="5" height="16" rx="2.5" fill={colors.eye} />
          </g>
        ) : status === 'thinking' ? (
          <g>
            <circle className={styles.thinkDot1} cx="36" cy="72" r="4" fill={colors.eye} />
            <circle className={styles.thinkDot2} cx="50" cy="72" r="4" fill={colors.eye} />
            <circle className={styles.thinkDot3} cx="64" cy="72" r="4" fill={colors.eye} />
          </g>
        ) : (
          <>
            <rect x="26" y="66" width="48" height="3" rx="1.5" fill="rgba(255,255,255,0.22)" />
            <rect x="26" y="72" width="48" height="3" rx="1.5" fill="rgba(255,255,255,0.22)" />
            <rect x="26" y="78" width="48" height="3" rx="1.5" fill="rgba(255,255,255,0.22)" />
          </>
        )}

        {/* Bottom status LEDs */}
        <circle cx="24" cy="88" r="3.5"
          fill={status === 'listening' ? colors.eye : 'rgba(255,255,255,0.18)'}
          className={status === 'listening' ? styles.ledOn : ''} />
        <circle cx="50" cy="88" r="3.5"
          fill={status === 'thinking' ? colors.eye : 'rgba(255,255,255,0.18)'}
          className={status === 'thinking' ? styles.ledOn : ''} />
        <circle cx="76" cy="88" r="3.5"
          fill={status === 'speaking' ? colors.eye : 'rgba(255,255,255,0.18)'}
          className={status === 'speaking' ? styles.ledOn : ''} />

      </svg>
    </div>
  )
}
