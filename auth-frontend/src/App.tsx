import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './components/Login'
import { Profile } from './components/Profile'
import { ProtectedLayout } from './components/ProtectedLayout'
import { Signup } from './components/Signup'
import { AuthProvider } from './context/AuthProvider'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/profile" element={<ProtectedLayout><Profile /></ProtectedLayout>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
