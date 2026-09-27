import { ExternalLink, Edit, Trash2, Phone, Globe, MessageSquare } from 'lucide-react';

export default function PageCard({ page, onEdit, onDelete }) {
  const displayName = page.internalName || 'صفحة هبوط';

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div className="p-5">
        {/* Header with Title & Slug */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 text-base line-clamp-1">
              {displayName}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 font-mono dir-ltr">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>/p/{page.slug}</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>

        {/* WhatsApp Info */}
        <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 my-3 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">رقم الواتساب:</span>
          <span className="text-sm font-semibold text-slate-800 dir-ltr font-mono flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            {page.whatsappNumber}
          </span>
        </div>

        {/* Pixel Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {page.snapchatPixelId ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Snapchat: {page.snapchatPixelId.slice(0, 8)}...
            </span>
          ) : null}
          {page.tiktokPixelId ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              TikTok: {page.tiktokPixelId.slice(0, 8)}...
            </span>
          ) : null}
          {!page.snapchatPixelId && !page.tiktokPixelId && (
            <span className="text-xs text-slate-400 italic">لا يوجد بيكسل مضاف</span>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 pt-3 bg-slate-50/50 border-t border-slate-100 flex items-center gap-2">
        <a
          href={`/p/${page.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          معاينة الصفحة
        </a>
        <button
          onClick={() => onEdit(page)}
          className="inline-flex items-center justify-center p-2 text-slate-600 hover:text-indigo-600 hover:bg-white border border-slate-200 rounded-lg transition-colors"
          title="تعديل"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(page.slug)}
          className="inline-flex items-center justify-center p-2 text-slate-600 hover:text-rose-600 hover:bg-white border border-slate-200 rounded-lg transition-colors"
          title="حذف"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
