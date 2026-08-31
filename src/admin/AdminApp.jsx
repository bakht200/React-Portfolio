import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import AdminLogin from './AdminLogin'
import {
  AboutEditor,
  AdminDashboard,
  CaseStudiesEditor,
  CtaEditor,
  FaqEditor,
  FooterEditor,
  HeroEditor,
  OrbitEditor,
  ProjectsEditor,
  ThemeEditor,
} from './AdminEditors'
import ProtectedRoute from './ProtectedRoute'

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="theme" element={<ThemeEditor />} />
        <Route path="hero" element={<HeroEditor />} />
        <Route path="projects" element={<ProjectsEditor />} />
        <Route path="case-studies" element={<CaseStudiesEditor />} />
        <Route path="about" element={<AboutEditor />} />
        <Route path="faq" element={<FaqEditor />} />
        <Route path="footer" element={<FooterEditor />} />
        <Route path="cta" element={<CtaEditor />} />
        <Route path="orbit" element={<OrbitEditor />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}
