import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'))
const MainLayout = lazy(() => import('./layouts/MainLayout'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const Contact = lazy(() => import('./pages/Contact'))
const Home = lazy(() => import('./pages/Home'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <section className="page page-centered">
            <div className="panel panel-compact">
              <span className="eyebrow">Cargando</span>
              <h1>Preparando experiencia</h1>
              <p>Un momento mientras montamos la interfaz.</p>
            </div>
          </section>
        }
      >
        <Routes>
          <Route element={<MainLayout />} path="/">
            <Route element={<Home />} index />
            <Route element={<Portfolio />} path="portfolio" />
            <Route element={<ProjectDetail />} path="portfolio/:slug" />
            <Route element={<Contact />} path="contacto" />
          </Route>

          <Route element={<AdminLogin />} path="/admin/login" />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminDashboard />} path="/admin" />
          </Route>

          <Route element={<Navigate replace to="/" />} path="*" />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
