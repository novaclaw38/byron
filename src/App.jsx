import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase.js'
import { SubscriptionProvider } from './hooks/useSubscription.jsx'
import ChildPage from './pages/ChildPage.jsx'
import ParentPage from './pages/ParentPage.jsx'
import AuthPage from './pages/AuthPage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import CoursesPage from './pages/CoursesPage.jsx'

export default function App() {
  const [session, setSession] = useState(undefined) // undefined = loading

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const s = data.session
      setSession(s)
      // Provision trial row for new users
      if (s?.user) ensureSubscription(s.user.id)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s)
      if (s?.user) ensureSubscription(s.user.id)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#030712' }}>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'sans-serif' }}>Loading…</div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <SubscriptionProvider userId={session?.user?.id}>
        <Routes>
          {/* Public */}
          <Route path="/"      element={session ? <Navigate to="/app" replace /> : <LandingPage />} />
          <Route path="/login" element={session ? <Navigate to="/app" replace /> : <AuthPage />} />

          {/* Authenticated */}
          <Route path="/app"     element={session ? <ChildPage session={session} />  : <Navigate to="/" replace />} />
          <Route path="/parent"  element={session ? <ParentPage session={session} /> : <Navigate to="/" replace />} />
          <Route path="/courses" element={session ? <CoursesPage session={session} /> : <Navigate to="/" replace />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to={session ? '/app' : '/'} replace />} />
        </Routes>
      </SubscriptionProvider>
    </BrowserRouter>
  )
}

async function ensureSubscription(userId) {
  const { data } = await supabase
    .from('subscriptions')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle()

  if (!data) {
    const trialEnd = new Date()
    trialEnd.setDate(trialEnd.getDate() + 10)
    await supabase.from('subscriptions').insert({
      user_id:     userId,
      status:      'trial',
      trial_start: new Date().toISOString(),
      trial_end:   trialEnd.toISOString(),
    })
  }
}
