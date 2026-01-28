/* أنماط أساسية احترافية - KRM Trending AI */
:root {
  --primary-black: #0a0a0f;
  --dark-card: #121826;
  --accent-gold: #FFD166;
  --accent-blue: #1E90FF;
  --buy-green: #00C853;
  --sell-red: #FF3D00;
  --text-primary: #F0F2F5;
  --text-secondary: #94A3B8;
}

body {
  background: linear-gradient(135deg, var(--primary-black) 0%, #1a1a2e 100%);
  color: var(--text-primary);
  font-family: 'Segoe UI', 'Tajawal', system-ui, sans-serif;
  min-height: 100vh;
  margin: 0;
}

/* شاشة البداية */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: radial-gradient(circle at 50% 50%, rgba(30, 144, 255, 0.1) 0%, transparent 50%);
}

.logo-container {
  margin-bottom: 3rem;
}

.logo-title {
  font-size: 4rem;
  font-weight: 900;
  background: linear-gradient(90deg, var(--accent-gold), var(--accent-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.logo-subtitle {
  font-size: 1.5rem;
  color: var(--text-secondary);
}

/* لوحة التداول */
.dashboard {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 300px 1fr 300px;
  }
}

/* بطاقة الأصل */
.asset-card {
  background: var(--dark-card);
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 209, 102, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.asset-card:hover {
  border-color: var(--accent-gold);
  transform: translateY(-5px);
}

.asset-card.selected {
  background: linear-gradient(135deg, rgba(255, 209, 102, 0.1), rgba(30, 144, 255, 0.05));
  border-color: var(--accent-gold);
}

/* الأزرار */
.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-buy, .btn-sell, .btn-analyze {
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 120px;
}

.btn-buy {
  background: linear-gradient(135deg, var(--buy-green), #00E676);
  color: white;
}

.btn-sell {
  background: linear-gradient(135deg, var(--sell-red), #FF5252);
  color: white;
}

.btn-analyze {
  background: linear-gradient(135deg, var(--accent-gold), #FFB347);
  color: var(--primary-black);
}

.btn-buy:hover, .btn-sell:hover, .btn-analyze:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

/* صندوق الإشارة */
.signal-box {
  background: linear-gradient(135deg, rgba(0, 200, 83, 0.1), rgba(30, 144, 255, 0.05));
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  border: 2px solid var(--buy-green);
  animation: pulse 2s infinite;
}

.signal-sell {
  background: linear-gradient(135deg, rgba(255, 61, 0, 0.1), rgba(30, 144, 255, 0.05));
  border-color: var(--sell-red);
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(0, 200, 83, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(0, 200, 83, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 200, 83, 0); }
      }
