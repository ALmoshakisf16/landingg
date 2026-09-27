import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CanvasText from '../components/CanvasText';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ─── نصوص ثابتة مرسومة عبر Canvas فقط لمنع حظر الإعلانات ───────────
const TEXT_BADGE = 'خصومات حصرية لعملاء دبي والإمارات 🚀';
const TEXT_HERO_TITLE = 'تأمين سيارات خلال دقائق';
const TEXT_HERO_SUBTITLE = 'وفر حتى 30% واحصل على افضل عرض في الامارات';
const TEXT_SECTION_TITLE = 'ليش تختارنا؟';

const TEXT_FEAT_1_TITLE = 'أفضل سعر';
const TEXT_FEAT_1_DESC = 'نقارن لك بين أكبر شركات التأمين لضمان أوفر سعر ومميزات متميزة';

const TEXT_FEAT_2_TITLE = 'سرعة فورية';
const TEXT_FEAT_2_DESC = 'لا داعي للانتظار، ستحصل على عرض السعر خلال دقائق بسيطة';

const TEXT_FEAT_3_TITLE = 'تغطية شاملة';
const TEXT_FEAT_3_DESC = 'خيارات متنوعة تشمل المساعدة على الطريق والتصليح المضمون';

const TEXT_FOOTER = 'جميع الحقوق محفوظة © 2026';
const FIXED_BG = '/images/car-insurance-uae.jpg';
// ────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/pages/${slug}`);
        const json = await res.json();
        if (json.success && json.data) {
          setPage(json.data);
          document.title = TEXT_HERO_TITLE;
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  // ── Snapchat Pixel ──────────────────────────────────────────────
  useEffect(() => {
    if (!page?.snapchatPixelId) return;
    (function (e, t, n) {
      if (e.snaptr) return;
      var a = (e.snaptr = function () {
        a.handleRequest ? a.handleRequest.apply(a, arguments) : a.queue.push(arguments);
      });
      a.queue = [];
      var s = 'script', r = t.createElement(s); r.async = !0; r.src = n;
      var u = t.getElementsByTagName(s)[0]; u.parentNode.insertBefore(r, u);
    })(window, document, 'https://sc-static.net/scevent.min.js');
    window.snaptr('init', page.snapchatPixelId);
    window.snaptr('track', 'PAGE_VIEW');
  }, [page?.snapchatPixelId]);

  // ── TikTok Pixel ────────────────────────────────────────────────
  useEffect(() => {
    if (!page?.tiktokPixelId) return;
    !function (w, d, t) {
      w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || [];
      ttq.methods = ['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie'];
      ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } };
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.load = function (e, n) {
        var r = 'https://analytics.tiktok.com/i18n/pixel/events.js';
        ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = r;
        ttq._t = ttq._t || {}; ttq._t[e] = +new Date;
        ttq._o = ttq._o || {}; ttq._o[e] = n || {};
        var s = document.createElement('script'); s.type = 'text/javascript'; s.async = !0;
        s.src = r + '?sdkid=' + e + '&lib=' + t;
        var a = document.getElementsByTagName('script')[0]; a.parentNode.insertBefore(s, a);
      };
      ttq.load(page.tiktokPixelId);
      ttq.page();
    }(window, document, 'ttq');
  }, [page?.tiktokPixelId]);

  if (loading) return null;

  if (!page) {
    return (
      <div style={styles.notFound}>
        <CanvasText text="404 — الصفحة غير موجودة" fontSize={20} color="#94a3b8" weight="normal" />
      </div>
    );
  }

  const waUrl = `https://api.whatsapp.com/send?phone=${page.whatsappNumber}&text=${encodeURIComponent('مرحباً، أريد عرض سعر لتأمين السيارة')}`;

  const handleWa = () => {
    if (window.snaptr) window.snaptr('track', 'SIGN_UP');
    if (window.ttq) window.ttq.track('Contact');
    setTimeout(() => { window.location.href = waUrl; }, 300);
  };

  return (
    <div style={styles.page}>
      {/* ─── Hero Section ───────────────────────────────────────── */}
      <header style={styles.hero}>
        <div style={{ ...styles.heroBg, backgroundImage: `url('${FIXED_BG}')` }} />
        <div style={styles.heroOverlay} />

        <div style={styles.heroContent}>
          {/* Badge at top */}
          <div style={styles.badgeWrap}>
            <CanvasText text={TEXT_BADGE} fontSize={14} color="#4ade80" weight="bold" padding={12} />
          </div>

          {/* Title & Subtitle */}
          <div style={{ marginTop: 16 }}>
            <CanvasText text={TEXT_HERO_TITLE} fontSize={38} color="#ffffff" weight="bold" />
          </div>

          <div style={{ marginTop: 12 }}>
            <CanvasText text={TEXT_HERO_SUBTITLE} fontSize={18} color="rgba(255,255,255,0.9)" weight="normal" />
          </div>

          {/* CTA Button */}
          <button onClick={handleWa} style={styles.mainBtn}>
            <WhatsAppIcon />
            <span style={{ fontFamily: 'inherit' }}>احصل على عرض سعر الآن</span>
          </button>
        </div>
      </header>

      {/* ─── Features Section (ليش تختارنا؟) ─────────────────────── */}
      <section style={styles.featuresSection}>
        <div style={styles.sectionHeader}>
          <CanvasText text={TEXT_SECTION_TITLE} fontSize={30} color="#0f172a" weight="bold" />
        </div>

        <div style={styles.cardsGrid}>
          {/* Card 1 */}
          <div style={styles.card}>
            <div style={styles.cardIcon}>💰</div>
            <div style={{ marginTop: 12 }}>
              <CanvasText text={TEXT_FEAT_1_TITLE} fontSize={20} color="#0f172a" weight="bold" />
            </div>
            <div style={{ marginTop: 8 }}>
              <CanvasText text={TEXT_FEAT_1_DESC} fontSize={14} color="#64748b" weight="normal" />
            </div>
          </div>

          {/* Card 2 */}
          <div style={styles.card}>
            <div style={styles.cardIcon}>⚡</div>
            <div style={{ marginTop: 12 }}>
              <CanvasText text={TEXT_FEAT_2_TITLE} fontSize={20} color="#0f172a" weight="bold" />
            </div>
            <div style={{ marginTop: 8 }}>
              <CanvasText text={TEXT_FEAT_2_DESC} fontSize={14} color="#64748b" weight="normal" />
            </div>
          </div>

          {/* Card 3 */}
          <div style={styles.card}>
            <div style={styles.cardIcon}>🛡️</div>
            <div style={{ marginTop: 12 }}>
              <CanvasText text={TEXT_FEAT_3_TITLE} fontSize={20} color="#0f172a" weight="bold" />
            </div>
            <div style={{ marginTop: 8 }}>
              <CanvasText text={TEXT_FEAT_3_DESC} fontSize={14} color="#64748b" weight="normal" />
            </div>
          </div>
        </div>

        {/* Secondary Bottom Button */}
        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <button onClick={handleWa} style={styles.secondaryBtn}>
            <WhatsAppIcon />
            <span>احصل على عرض سعر الآن</span>
          </button>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────────── */}
      <footer style={styles.footer}>
        <CanvasText text={TEXT_FOOTER} fontSize={13} color="#94a3b8" weight="normal" />
      </footer>

      {/* ─── Floating WhatsApp Button ───────────────────────────── */}
      <button onClick={handleWa} style={styles.whatsappFloat} title="WhatsApp">
        <WhatsAppIcon size={30} />
      </button>
    </div>
  );
}

function WhatsAppIcon({ size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size, flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f8fafc',
    direction: 'rtl',
    fontFamily: "'Cairo', sans-serif",
    position: 'relative',
  },
  hero: {
    position: 'relative',
    minHeight: '75vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '80px 20px',
  },
  heroBg: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(15,23,42,0.82) 0%, rgba(15,23,42,0.72) 100%)',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    maxWidth: 720,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  badgeWrap: {
    display: 'inline-flex',
    background: 'rgba(34, 197, 94, 0.15)',
    border: '1px solid rgba(74, 222, 128, 0.35)',
    borderRadius: 50,
    padding: '4px 16px',
    maxWidth: '90%',
  },
  mainBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 36,
    padding: '16px 42px',
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: '#fff',
    border: 'none',
    borderRadius: 50,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: "'Cairo', sans-serif",
    cursor: 'pointer',
    boxShadow: '0 10px 25px rgba(34,197,94,0.4)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  featuresSection: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '70px 20px 80px',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: 44,
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 24,
  },
  card: {
    background: '#ffffff',
    padding: '36px 24px',
    borderRadius: 18,
    boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
    border: '1px solid #f1f5f9',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 36,
    width: 64,
    height: 64,
    borderRadius: 16,
    background: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #e2e8f0',
  },
  secondaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: '16px 40px',
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: '#fff',
    border: 'none',
    borderRadius: 50,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: "'Cairo', sans-serif",
    cursor: 'pointer',
    boxShadow: '0 10px 25px rgba(34,197,94,0.3)',
  },
  footer: {
    background: '#0f172a',
    padding: '28px 20px',
    textAlign: 'center',
    marginTop: 40,
  },
  whatsappFloat: {
    position: 'fixed',
    bottom: 24,
    left: 24,
    width: 60,
    height: 60,
    borderRadius: '50%',
    background: '#25D366',
    color: '#ffffff',
    border: 'none',
    boxShadow: '0 8px 24px rgba(37,211,102,0.4)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  notFound: {
    minHeight: '100vh',
    background: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
