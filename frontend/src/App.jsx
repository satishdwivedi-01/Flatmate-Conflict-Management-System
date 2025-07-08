import { Routes, Route } from 'react-router-dom'
import './App.css'

import Register from './components/register'
import Login from './components/login'

// member imports
import MemberDashboard from './components/members/MemberDashboard'
import FileComplaintPage from './components/members/FileComplaint'
import LeaderboardPage from './components/members/LeaderBoardPage'
import ProtectedRoute from './components/members/ProtectedRoutes'

function App() {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* Member routes - all protected */}
        <Route path='/member/:id' element={
          <ProtectedRoute>
            <MemberDashboard />
          </ProtectedRoute>
        } />

        <Route path='/member/:id/file-complaint' element={
          <ProtectedRoute>
            <FileComplaintPage />
          </ProtectedRoute>
        } />

        <Route path='/member/:id/leaderboard' element={
          <ProtectedRoute>
            <LeaderboardPage />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App;

