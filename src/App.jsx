import { Navigate, Route, Routes } from 'react-router-dom'
import SignUpPage from './components/Account/signup.jsx'
import SignInPage from './components/Account/signin.jsx'
import Logout from './components/Account/logout.jsx'
import ProtectedRoute from './context/ProtectedRoute.jsx'
import DisplayHome from './components/DisplayHome.jsx'

export default function App() {
    return (
        <Routes>
            {/* root for redirecting to signIn */}
            <Route path="/" element={<Navigate to="/account/signin" replace />} />
            
            {/* Auth routes */}
            <Route path="/account/signin" element={<SignInPage />} />
            <Route path="/account/signup" element={<SignUpPage />} />
            <Route path="/account/logout" element={<Logout />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/*" element={<DisplayHome />} />
            </Route>

            {/* fallback (should not be reached because above catches *) */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}