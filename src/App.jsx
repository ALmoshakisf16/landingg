import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';

// ⚠️  الرابط السري للوحة التحكم — لا تشاركه مع أحد
const ADMIN_PATH = '/ctrl-8f2a9d';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* لوحة التحكم على رابط سري غير متوقع */}
        <Route path={ADMIN_PATH} element={<Dashboard />} />

        {/* صفحات الهبوط المولّدة على /p/:slug */}
        <Route path="/p/:slug" element={<LandingPage />} />

        {/* أي مسار آخر يرى صفحة 404 عادية */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
