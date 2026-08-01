import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function LandingPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(27);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/pages/${slug}`);
        const json = await res.json();
        if (json.success && json.data) {
          setPage(json.data);
          document.title = json.data.title;
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error loading landing page:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  // Snapchat Pixel Injection
  useEffect(() => {
    if (page?.snapchatPixelId) {
      (function(e,t,n){
        if(e.snaptr)return;
        var a=e.snaptr=function(){
            a.handleRequest ? a.handleRequest.apply(a, arguments) : a.queue.push(arguments)
        };
        a.queue=[];
        var s='script';
        var r=t.createElement(s);
        r.async=!0;
        r.src=n;
        var u=t.getElementsByTagName(s)[0];
        u.parentNode.insertBefore(r,u);
      })(window,document,'https://sc-static.net/scevent.min.js');

      window.snaptr('init', page.snapchatPixelId);
      window.snaptr('track', 'PAGE_VIEW');
    }
  }, [page?.snapchatPixelId]);

  // TikTok Pixel Injection
  useEffect(() => {
    if (page?.tiktokPixelId) {
      !function (w, d, t) {
        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
        var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
        ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

        ttq.load(page.tiktokPixelId);
        ttq.page();
      }(window, document, 'ttq');
    }
  }, [page?.tiktokPixelId]);

  // Counter Interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setCount((prev) => prev + 1);
      }
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{ background: '#f8fafc', color: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cairo', sans-serif" }}>
        <h2>جاري تحميل الصفحة...</h2>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div style={{ background: '#f8fafc', color: '#0f172a', minHeight: '100vh', padding: '100px 20px', textAlign: 'center', fontFamily: "'Cairo', sans-serif" }}>
        <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>404 - الصفحة غير موجودة</h1>
        <p style={{ color: '#64748b' }}>عذراً، الصفحة التي تبحث عنها غير متوفرة أو تم حذفها.</p>
      </div>
    );
  }

  const handleSendWhatsApp = (e) => {
    e.preventDefault();

    const raw = `مرحباً، أريد عرض سعر
الاسم: ${name}
الهاتف: ${phone}
التفاصيل: ${message}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${page.whatsappNumber}&text=${encodeURIComponent(raw)}`;

    if (window.snaptr) {
      window.snaptr('track', 'SIGN_UP');
    }
    if (window.ttq) {
      window.ttq.track('SubmitForm');
    }

    // الانتظار قليلاً لضمان تسجيل الحدث في البيكسل قبل التحويل
    setTimeout(() => {
      window.location.href = whatsappUrl;
    }, 300);
  };

  const whatsappDirectUrl = `https://api.whatsapp.com/send?phone=${page.whatsappNumber}&text=${encodeURIComponent('مرحباً، أريد عرض سعر لخدمتكم')}`;
  const headerBgImage = page.productImage || '/images/car-insurance-uae.jpg';

  return (
    <div className="lp-container">
      <style>{`
        .lp-container {
          background: #f8fafc;
          color: #0f172a;
          line-height: 1.6;
          direction: rtl;
          min-height: 100vh;
          font-family: 'Cairo', sans-serif;
        }

        .lp-container header {
          background: linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)),
            url('${headerBgImage}');
          background-size: cover;
          background-position: center;
          color: #fff;
          padding: 100px 20px;
          text-align: center;
        }

        .lp-container header h1 {
          font-size: 42px;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .lp-container header p {
          font-size: 18px;
          opacity: .9;
          margin-bottom: 10px;
        }

        .lp-container .btn {
          display: inline-block;
          padding: 16px 35px;
          margin-top: 20px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #fff;
          border-radius: 50px;
          font-size: 18px;
          text-decoration: none;
          font-weight: bold;
          box-shadow: 0 10px 25px rgba(34,197,94,.3);
          transition: .3s;
          border: none;
          cursor: pointer;
        }

        .lp-container .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(34,197,94,.4);
        }

        .lp-container section {
          padding: 60px 20px;
          max-width: 1200px;
          margin: auto;
        }

        .lp-container .features {
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(280px,1fr));
          gap: 25px;
        }

        .lp-container .card {
          background: #fff;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,.05);
          text-align: center;
          transition: .3s;
        }

        .lp-container .card:hover {
          transform: translateY(-8px);
        }

        .lp-container .contact {
          background: linear-gradient(135deg,#1e40af,#0f172a);
          color: #fff;
          padding: 50px;
          border-radius: 20px;
          text-align: center;
        }

        .lp-container .contact input,
        .lp-container .contact textarea {
          width: 100%;
          padding: 14px;
          margin: 10px 0;
          border: none;
          border-radius: 10px;
          font-size: 16px;
        }

        .lp-container footer {
          background: #0f172a;
          color: #aaa;
          text-align: center;
          padding: 25px;
          margin-top: 50px;
        }

        .lp-container .whatsapp-float {
          position: fixed;
          bottom: 25px;
          left: 25px;
          background: #25D366;
          color: #fff;
          padding: 18px;
          border-radius: 50%;
          font-size: 24px;
          box-shadow: 0 10px 25px rgba(0,0,0,.2);
          text-decoration: none;
          z-index: 1000;
        }

        .lp-container .badge {
          display: inline-block;
          background: #22c55e20;
          color: #22c55e;
          padding: 8px 15px;
          border-radius: 20px;
          margin-bottom: 15px;
          font-size: 14px;
          font-weight: bold;
        }

        .lp-container .counter {
          margin-top: 20px;
          font-size: 16px;
          color: #4ade80;
          font-weight: bold;
        }
      `}</style>

      <header>
        <span className="badge">خصومات حصرية لعملاء دبي والإمارات 🚀</span>

        <h1>{page.title}</h1>

        <p>{page.description}</p>

        <a href={whatsappDirectUrl} className="btn">
          احصل على عرض سعر الآن
        </a>

        <div className="counter">
          🔥 تم إصدار <span id="count">{count}</span> وثيقة اليوم
        </div>
      </header>

      <section>
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>ليش تختارنا؟</h2>

        <div className="features">
          <div className="card">
            <h3>💰 أفضل سعر</h3>
            <p>نقارن لك بين أكبر شركات التأمين في الإمارات لضمان أوفر سعر.</p>
          </div>

          <div className="card">
            <h3>⚡ سرعة فورية</h3>
            <p>لا تنتظر أيام، ستحصل على عرض السعر خلال دقائق بسيطة.</p>
          </div>

          <div className="card">
            <h3>🛡️ تغطية شاملة</h3>
            <p>خيارات متنوعة تشمل المساعدة على الطريق والتصليح داخل الوكالة.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="contact">
          <h2>أو اترك بياناتك وسنتواصل معك</h2>

          <p>أدخل بياناتك ونرسل لك أفضل العروض المتوفرة حالياً</p>

          <form onSubmit={handleSendWhatsApp}>
            <input
              type="text"
              id="name"
              placeholder="الاسم الكامل"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="tel"
              id="phone"
              placeholder="رقم الهاتف"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <textarea
              id="message"
              placeholder="نوع السيارة وموديل السنة"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button type="submit" className="btn">
              إرسال لطلب العرض
            </button>
          </form>
        </div>
      </section>

      <footer>
        © 2026 جميع الحقوق محفوظة | {page.title}
      </footer>

      <a
        href={whatsappDirectUrl}
        className="whatsapp-float"
        title="تواصل معنا عبر الواتساب"
      >
        💬
      </a>
    </div>
  );
}
