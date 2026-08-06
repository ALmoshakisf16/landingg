import { ExternalLink, Edit, Trash2, Phone, Sparkles } from 'lucide-react';

export default function PageCard({ page, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col">
      <div className="relative h-44 bg-slate-100 overflow-hidden border-b border-slate-100">
        <img
          src={page.productImage}
          alt={page.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-md text-slate-700 border border-slate-200/80 shadow-sm flex items-center gap-1.5 dir-ltr">
          <Phone className="w-3 h-3 text-emerald-600" />
          <span>{page.whatsappNumber}</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-1">
          {page.title}
        </h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {page.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5 mt-auto">
          {page.snapchatPixelId ? (
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Snapchat Pixel
            </span>
          ) : null}
          {page.tiktokPixelId ? (
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-1 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              TikTok Pixel
            </span>
          ) : null}
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
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
            className="inline-flex items-center justify-center p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 rounded-lg transition-colors"
            title="تعديل"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(page.slug)}
            className="inline-flex items-center justify-center p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-lg transition-colors"
            title="حذف"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
