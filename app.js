import React, { useState, useEffect } from 'react';
import './styles.css';

function App() {
  // الحالات الأساسية
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('ar');
  const [accountType, setAccountType] = useState('demo');
  const [selectedAsset, setSelectedAsset] = useState('EUR/USD OTC');
  const [timeframe, setTimeframe] = useState(1);
  const [aiSignal, setAiSignal] = useState({ 
    direction: 'BUY', 
    confidence: 92,
    timestamp: new Date().toLocaleTimeString()
  });

  // قائمة جميع أصول PocketOption
  const allAssets = [
    // Forex Pairs
    { symbol: 'EUR/USD OTC', name: 'يورو/دولار', price: 1.0856, change: '+0.45%', type: 'forex' },
    { symbol: 'USD/JPY OTC', name: 'دولار/ين', price: 151.23, change: '-0.32%', type: 'forex' },
    { symbol: 'GBP/USD OTC', name: 'جنيه/دولار', price: 1.2654, change: '+0.78%', type: 'forex' },
    { symbol: 'AUD/USD OTC', name: 'دولار أسترالي/دولار', price: 0.6567, change: '+0.34%', type: 'forex' },
    { symbol: 'USD/CAD OTC', name: 'دولار/دولار كندي', price: 1.3542, change: '-0.21%', type: 'forex' },
    { symbol: 'USD/CHF OTC', name: 'دولار/فرنك سويسري', price: 0.8845, change: '+0.15%', type: 'forex' },
    { symbol: 'NZD/USD OTC', name: 'دولار نيوزيلندي/دولار', price: 0.6123, change: '-0.12%', type: 'forex' },
    { symbol: 'EUR/GBP OTC', name: 'يورو/جنيه', price: 0.8567, change: '+0.23%', type: 'forex' },
    
    // OTC Pairs
    { symbol: 'AED/CNY OTC', name: 'درهم/يوان', price: 1.9634, change: '+0.12%', type: 'otc' },
    { symbol: 'USD/INR OTC', name: 'دولار/روبية', price: 83.45, change: '-0.08%', type: 'otc' },
    { symbol: 'USD/RUB OTC', name: 'دولار/روبل', price: 92.34, change: '+1.23%', type: 'otc' },
    { symbol: 'EUR/TRY OTC', name: 'يورو/ليرة', price: 34.56, change: '+0.89%', type: 'otc' },
    { symbol: 'USD/MXN OTC', name: 'دولار/بيزو', price: 16.78, change: '-0.45%', type: 'otc' },
    { symbol: 'USD/BRL OTC', name: 'دولار/ريال', price: 4.98, change: '+0.67%', type: 'otc' },
    { symbol: 'USD/ZAR OTC', name: 'دولار/راند', price: 18.23, change: '-0.34%', type: 'otc' },
    
    // Commodities
    { symbol: 'Gold OTC', name: 'الذهب', price: 2185.40, change: '+1.23%', type: 'commodity' },
    { symbol: 'Silver OTC', name: 'الفضة', price: 24.56, change: '+0.89%', type: 'commodity' },
    { symbol: 'Brent Oil OTC', name: 'نفط برنت', price: 82.34, change: '-0.56%', type: 'commodity' },
    { symbol: 'WTI Crude Oil', name: 'نفط خام', price: 78.90, change: '-0.43%', type: 'commodity' },
    { symbol: 'Natural Gas OTC', name: 'غاز طبيعي', price: 2.45, change: '+2.34%', type: 'commodity' },
    { symbol: 'Platinum OTC', name: 'بلاتين', price: 945.67, change: '+0.78%', type: 'commodity' },
    { symbol: 'Palladium OTC', name: 'بالاديوم', price: 1056.78, change: '+1.12%', type: 'commodity' },
    
    // Crypto
    { symbol: 'BTC/USD', name: 'بتكوين', price: 68542.00, change: '+2.34%', type: 'crypto' },
    { symbol: 'ETH/USD', name: 'إيثريوم', price: 3650.20, change: '+1.56%', type: 'crypto' },
    { symbol: 'BNB/USD', name: 'باينانس', price: 587.34, change: '+0.89%', type: 'crypto' },
    { symbol: 'XRP/USD', name: 'ريبل', price: 0.6234, change: '-0.23%', type: 'crypto' },
    { symbol: 'ADA/USD', name: 'كاردانو', price: 0.4567, change: '+1.23%', type: 'crypto' },
    { symbol: 'DOGE/USD', name: 'دوجكوين', price: 0.1456, change: '+3.45%', type: 'crypto' },
    { symbol: 'SOL/USD', name: 'سولانا', price: 156.78, change: '+4.56%', type: 'crypto' },
    
    // Stocks
    { symbol: 'AAPL', name: 'آبل', price: 172.50, change: '-0.23%', type: 'stock' },
    { symbol: 'TSLA', name: 'تسلا', price: 245.67, change: '+1.23%', type: 'stock' },
    { symbol: 'GOOGL', name: 'جوجل', price: 145.67, change: '+0.67%', type: 'stock' },
    { symbol: 'AMZN', name: 'أمازون', price: 178.90, change: '+0.45%', type: 'stock' },
    { symbol: 'META', name: 'ميتا', price: 485.67, change: '+1.89%', type: 'stock' },
    { symbol: 'MSFT', name: 'مايكروسوفت', price: 423.45, change: '+0.34%', type: 'stock' },
    { symbol: 'NVDA', name: 'إنفيديا', price: 956.78, change: '+3.45%', type: 'stock' },
  ];

  // إطارات زمنية
  const timeframes = [1, 2, 3, 4, 5];

  // شاشة البداية
  if (!isLoggedIn) {
    return (
      <div className="welcome-screen">
        <div className="logo-container">
          <div className="logo-main">KRM TRADING AI</div>
          <div className="logo-sub">منصة التداول الذكية بالذكاء الاصطناعي</div>
        </div>
        
        <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 style={{ marginBottom: '25px', color: 'var(--gold)', textAlign: 'center' }}>
            <i className="fas fa-sign-in-alt"></i> تسجيل الدخول إلى المنصة
          </h2>
          
          <div style={{ marginBottom: '25px' }}>
            <input 
              type="email" 
              placeholder="البريد الإلكتروني"
              style={{
                width: '100%',
                padding: '15px',
                marginBottom: '15px',
                borderRadius: '10px',
                border: '1px solid #333',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '16px'
              }}
            />
            
            <input 
              type="password" 
              placeholder="كلمة المرور"
              style={{
                width: '100%',
                padding: '15px',
                marginBottom: '20px',
                borderRadius: '10px',
                border: '1px solid #333',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '16px'
              }}
            />
          </div>
          
          <button 
            className="btn btn-primary"
            onClick={() => {
              setIsLoggedIn(true);
              setUser({
                name: 'أكرم',
                email: 'user@example.com',
                balance: accountType === 'demo' ? 10000 : 5000
              });
            }}
            style={{ width: '100%' }}
          >
            <i className="fas fa-lock"></i> تسجيل الدخول
          </button>
          
          <div style={{ textAlign: 'center', marginTop: '25px', color: 'var(--text-gray)' }}>
            ليس لديك حساب؟{' '}
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                alert('سيتم تفعيل التسجيل قريباً');
              }}
              style={{ color: 'var(--gold)', textDecoration: 'none' }}
            >
              سجل الآن
            </a>
          </div>
          
          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #333' }}>
            <button 
              className="btn"
              onClick={() => {
                setIsLoggedIn(true);
                setUser({
                  name: 'مستخدم تجريبي',
                  email: 'demo@krm.ai',
                  balance: 10000
                });
                setAccountType('demo');
              }}
              style={{
                width: '100%',
                background: 'rgba(255, 215, 0, 0.1)',
                border: '1px solid var(--gold)',
                color: 'var(--gold)'
              }}
            >
              <i className="fas fa-play-circle"></i> دخول تجريبي سريع
            </button>
          </div>
        </div>
        
        <div style={{ marginTop: '40px', color: 'var(--text-gray)', fontSize: '14px', textAlign: 'center' }}>
          <p>© 2024 KRM TRADING AI - منصة تحليل تداول ذكية</p>
          <p style={{ marginTop: '10px' }}>تحليل ذكي وليس توصية استثمارية | التداول يحمل مخاطر الخسارة</p>
        </div>
      </div>
    );
  }

  // الواجهة الرئيسية بعد التسجيل
  return (
    <div className="app-container">
      {/* الهيدر */}
      <header className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div>
            <div className="logo-main" style={{ fontSize: '28px' }}>KRM TRADING AI</div>
            <div className="logo-sub" style={{ fontSize: '12px' }}>منصة التداول الذكية</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select 
            value={accountType}
            onChange={(e) => {
              setAccountType(e.target.value);
              setUser({
                ...user,
                balance: e.target.value === 'demo' ? 10000 : 5000
              });
            }}
            style={{
              padding: '10px 15px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '1px solid var(--gold)',
              cursor: 'pointer'
            }}
          >
            <option value="demo">👤 حساب تجريبي</option>
            <option value="real">💰 حساب حقيقي</option>
          </select>
          
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: '10px 15px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '1px solid var(--blue)',
              cursor: 'pointer'
            }}
          >
            <option value="ar">🇸🇦 العربية</option>
            <option value="en">🇺🇸 English</option>
          </select>
          
          <button 
            className="btn"
            onClick={() => setIsLoggedIn(false)}
            style={{ background: 'rgba(255, 61, 0, 0.1)', color: 'var(--red)' }}
          >
            <i className="fas fa-sign-out-alt"></i> تسجيل خروج
          </button>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main style={{ padding: '25px', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '25px' }}>
          
          {/* القسم الأيسر - قائمة الأصول */}
          <div className="card">
            <h3 style={{ marginBottom: '20px', color: 'var(--gold)' }}>
              <i className="fas fa-list"></i> قائمة الأصول
            </h3>
            <div className="asset-list">
              {allAssets.map((asset, index) => (
                <div 
                  key={index}
                  className={`asset-item ${selectedAsset === asset.symbol ? 'selected' : ''}`}
                  onClick={() => setSelectedAsset(asset.symbol)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div className="asset-name">{asset.name}</div>
                      <div className="asset-symbol">{asset.symbol}</div>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div className="asset-price">{asset.price.toLocaleString()}</div>
                      <div className={`asset-change ${asset.change.includes('+') ? 'positive' : 'negative'}`}>
                        {asset.change}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* القسم الأوسط - التداول */}
          <div>
            {/* معلومات الأصل المختار */}
            <div className="card" style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                  <h2 style={{ color: 'var(--gold)', marginBottom: '10px' }}>
                    <i className="fas fa-chart-line"></i> {selectedAsset}
                  </h2>
                  <p style={{ color: 'var(--text-gray)' }}>
                    {language === 'ar' ? 'الرصيد المتاح: ' : 'Available Balance: '}
                    <span style={{ color: 'var(--gold)', fontWeight: 'bold' }}>
                      ${user.balance.toLocaleString()}
                    </span>
                    {accountType === 'demo' ? (language === 'ar' ? ' (تجريبي)' : ' (Demo)') : ''}
                  </p>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--green)' }}>
                    {allAssets.find(a => a.symbol === selectedAsset)?.price.toLocaleString() || '1.2345'}
                  </div>
                  <div style={{ color: 'var(--text-gray)' }}>
                    {language === 'ar' ? 'آخر سعر' : 'Last Price'}
                  </div>
                </div>
              </div>
            </div>

            {/* الإطارات الزمنية */}
            <div className="card" style={{ marginBottom: '25px' }}>
              <h3 style={{ marginBottom: '20px', color: 'var(--gold)' }}>
                <i className="fas fa-clock"></i> {language === 'ar' ? 'الإطار الزمني' : 'Timeframe'}
              </h3>
              <div className="timeframe-selector">
                {timeframes.map((time) => (
                  <button
                    key={time}
                    className={`time-btn ${timeframe === time ? 'active' : ''}`}
                    onClick={() => setTimeframe(time)}
                  >
                    {time} {language === 'ar' ? 'دقيقة' : 'Min'}
                  </button>
                ))}
              </div>
            </div>

            {/* أزرار التداول */}
            <div className="card" style={{ marginBottom: '25px' }}>
              <h3 style={{ marginBottom: '20px', color: 'var(--gold)' }}>
                <i className="fas fa-trade"></i> {language === 'ar' ? 'إجراءات التداول' : 'Trading Actions'}
              </h3>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <button 
                  className="btn btn-buy"
                  onClick={() => {
                    const amount = 100;
                    const profitLoss = Math.random() > 0.6 ? amount * 0.8 : -amount * 0.5;
                    setUser({
                      ...user,
                      balance: user.balance + profitLoss
                    });
                    
                    alert(`🟢 ${language === 'ar' ? 'تم تنفيذ أمر شراء' : 'Buy order executed'}!\n${language === 'ar' ? 'الأصل:' : 'Asset:'} ${selectedAsset}\n${language === 'ar' ? 'الإطار:' : 'Timeframe:'} ${timeframe} ${language === 'ar' ? 'دقيقة' : 'min'}\n${profitLoss > 0 ? `🎉 ${language === 'ar' ? 'ربح:' : 'Profit:'} $${profitLoss.toFixed(2)}` : `⚠️ ${language === 'ar' ? 'خسارة:' : 'Loss:'} $${Math.abs(profitLoss).toFixed(2)}`}`);
                  }}
                >
                  <i className="fas fa-arrow-up"></i> {language === 'ar' ? 'شراء' : 'BUY'}
                </button>
                
                <button 
                  className="btn btn-sell"
                  onClick={() => {
                    const amount = 100;
                    const profitLoss = Math.random() > 0.6 ? -amount * 0.8 : amount * 0.5;
                    setUser({
                      ...user,
                      balance: user.balance + profitLoss
                    });
                    
                    alert(`🔴 ${language === 'ar' ? 'تم تنفيذ أمر بيع' : 'Sell order executed'}!\n${language === 'ar' ? 'الأصل:' : 'Asset:'} ${selectedAsset}\n${language === 'ar' ? 'الإطار:' : 'Timeframe:'} ${timeframe} ${language === 'ar' ? 'دقيقة' : 'min'}\n${profitLoss > 0 ? `🎉 ${language === 'ar' ? 'ربح:' : 'Profit:'} $${profitLoss.toFixed(2)}` : `⚠️ ${language === 'ar' ? 'خسارة:' : 'Loss:'} $${Math.abs(profitLoss).toFixed(2)}`}`);
                  }}
                >
                  <i className="fas fa-arrow-down"></i> {language === 'ar' ? 'بيع' : 'SELL'}
                </button>
                
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    const directions = ['BUY', 'SELL'];
                    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
                    const randomConfidence = Math.floor(Math.random() * 15) + 85; // 85-99%
                    
                    setAiSignal({
                      direction: randomDirection,
                      confidence: randomConfidence,
                      timestamp: new Date().toLocaleTimeString()
                    });
                    
                    alert(`🤖 ${language === 'ar' ? 'تم التحليل بنجاح!' : 'Analysis complete!'}\n${language === 'ar' ? 'الإشارة:' : 'Signal:'} ${randomDirection === 'BUY' ? '🟢 شراء' : '🔴 بيع'}\n${language === 'ar' ? 'الثقة:' : 'Confidence:'} ${randomConfidence}%\n${language === 'ar' ? 'التوصية:' : 'Recommendation:'} ${randomDirection === 'BUY' ? (language === 'ar' ? 'الاتجاه صاعد، القوة الشرائية قوية' : 'Uptrend, strong buying pressure') : (language === 'ar' ? 'المقاومة قوية، تفكر في الخروج' : 'Strong resistance, consider exit')}`);
                  }}
                >
                  <i className="fas fa-robot"></i> {language === 'ar' ? 'تحليل بالذكاء الاصطناعي' : 'AI Analysis'}
                </button>
              </div>
            </div>

            {/* إشارة الذكاء الاصطناعي */}
            <div className={`card ai-signal ${aiSignal.direction === 'BUY' ? 'signal-buy' : 'signal-sell'}`}>
              <div className="signal-direction" style={{ color: aiSignal.direction === 'BUY' ? 'var(--green)' : 'var(--red)' }}>
                {aiSignal.direction === 'BUY' ? '🟢 شراء' : '🔴 بيع'}
              </div>
              <div className="signal-confidence">
                {language === 'ar' ? 'نسبة الثقة:' : 'Confidence:'} {aiSignal.confidence}%
              </div>
              <div style={{ marginTop: '15px', color: 'var(--text-gray)' }}>
                {language === 'ar' ? 'الأصل:' : 'Asset:'} {selectedAsset} | {language === 'ar' ? 'الإطار:' : 'Timeframe:'} {timeframe} {language === 'ar' ? 'دقيقة' : 'min'} | {language === 'ar' ? 'آخر تحديث:' : 'Last update:'} {aiSignal.timestamp}
              </div>
            </div>
          </div>

          {/* القسم الأيمن - المؤشرات والإحصائيات */}
          <div className="card">
            <h3 style={{ marginBottom: '20px', color: 'var(--gold)' }}>
              <i className="fas fa-chart-line"></i> {language === 'ar' ? 'المؤشرات الفنية' : 'Technical Indicators'}
            </h3>
            
            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>RSI</span>
                <span style={{ color: 'var(--green)', fontWeight: 'bold' }}>62.5</span>
              </div>
              <div style={{ height: '6px', background: '#333', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '62.5%', height: '100%', background: 'var(--green)', borderRadius: '3px' }}></div>
              </div>
            </div>
            
            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>MACD</span>
                <span style={{ color: 'var(--blue)', fontWeight: 'bold' }}>+1.23</span>
              </div>
              <div style={{ height: '6px', background: '#333', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '70%', height: '100%', background: 'var(--blue)', borderRadius: '3px' }}></div>
              </div>
            </div>
            
            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>
