import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

export default function PageModal({ isOpen, onClose, onSave, editingPage }) {
  const [form, setForm] = useState({
    internalName: '',
    whatsappNumber: '',
    snapchatPixelId: '',
    tiktokPixelId: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingPage) {
      setForm({
        internalName: editingPage.internalName || '',
        whatsappNumber: editingPage.whatsappNumber || '',
        snapchatPixelId: editingPage.snapchatPixelId || '',
        tiktokPixelId: editingPage.tiktokPixelId || '',
      });
    } else {
      setForm({
        internalName: '',
        whatsappNumber: '',
        snapchatPixelId: '',
        tiktokPixelId: '',
      });
    }
  }, [editingPage, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSave(form, editingPage?.slug || null);
    setLoading(false);
  };

  const update = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">
            {editingPage ? 'تعديل صفحة الهبوط' : 'إضافة صفحة هبوط جديدة'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* اسم داخلي للتنظيم */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5">
            <label className="block text-xs font-bold text-amber-800 mb-1.5">
              🏷️ اسم الصفحة (للوحة التحكم فقط)
            </label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 bg-white border border-amber-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
              value={form.internalName}
              onChange={(e) => update('internalName', e.target.value)}
              placeholder="مثال: حملة سناب شات 1"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              رقم الواتساب (اختياري / أي قيمة)
            </label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-left dir-ltr"
              value={form.whatsappNumber}
              onChange={(e) => update('whatsappNumber', e.target.value)}
              placeholder="مثال: 971500000000"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Snapchat Pixel ID (اختياري)
            </label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-left dir-ltr"
              value={form.snapchatPixelId}
              onChange={(e) => update('snapchatPixelId', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              TikTok Pixel ID (اختياري)
            </label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-left dir-ltr"
              value={form.tiktokPixelId}
              onChange={(e) => update('tiktokPixelId', e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors shadow-sm disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  جاري الحفظ...
                </>
              ) : editingPage ? (
                'حفظ التعديلات'
              ) : (
                'إنشاء الصفحة'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-sm transition-colors"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
