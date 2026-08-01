import { useState, useEffect } from 'react';
import { Plus, LayoutGrid, RefreshCw, Layers } from 'lucide-react';
import PageCard from '../components/PageCard';
import PageModal from '../components/PageModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Dashboard() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState(null);

  useEffect(() => {
    document.title = 'لوحة التحكم - صفحات الهبوط';
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/pages`);
      const json = await res.json();
      if (json.success) {
        setPages(json.data);
      }
    } catch (err) {
      console.error('Error fetching pages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleOpenAdd = () => {
    setEditingPage(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (page) => {
    setEditingPage(page);
    setIsModalOpen(true);
  };

  const handleSavePage = async (formData, slug) => {
    try {
      const url = slug ? `${API_URL}/api/pages/${slug}` : `${API_URL}/api/pages`;
      const method = slug ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const json = await res.json();
      if (json.success) {
        setIsModalOpen(false);
        fetchPages();
      } else {
        alert(json.message || 'حدث خطأ أثناء الحفظ');
      }
    } catch (err) {
      console.error('Error saving page:', err);
      alert('فشل الاتصال بالسيرفر');
    }
  };

  const handleDeletePage = async (slug) => {
    if (!confirm('هل أنت تأكد من رغبتك في حذف هذه الصفحة؟')) return;

    try {
      const res = await fetch(`${API_URL}/api/pages/${slug}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (json.success) {
        fetchPages();
      } else {
        alert(json.message || 'فشل حذف الصفحة');
      }
    } catch (err) {
      console.error('Error deleting page:', err);
      alert('فشل الاتصال بالسيرفر');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-lg leading-tight">
                منصة صفحات الهبوط
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                إنشاء وإدارة الصفحات بسهولة
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchPages}
              className="p-2 text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              title="تحديث البيانات"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              إضافة صفحة هبوط
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">صفحات الهبوط المنشأة</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              إجمالي الصفحات: <span className="font-semibold text-indigo-600">{pages.length}</span>
            </p>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500 font-medium">
            جاري تحميل صفحات الهبوط...
          </div>
        ) : pages.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LayoutGrid className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">لا توجد صفحات هبوط حالياً</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
              يمكنك إضافة أول صفحة هبوط بسهولة وتحديد صورة المنتج ورقم الواتساب والبيكسلات
            </p>
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm mx-auto"
            >
              <Plus className="w-4 h-4" />
              إضافة صفحة هبوط جديدة
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <PageCard
                key={page._id}
                page={page}
                onEdit={handleOpenEdit}
                onDelete={handleDeletePage}
              />
            ))}
          </div>
        )}
      </main>

      <PageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePage}
        editingPage={editingPage}
      />
    </div>
  );
}
