import React, { useState } from 'react';
import AssetList from './AssetList';
import SignalBox from './SignalBox';
import TimeFrameSelector from './TimeFrameSelector';

const TradingDashboard = ({ user, language }) => {
  const [selectedAsset, setSelectedAsset] = useState('EUR/USD OTC');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(1);
  const [currentSignal, setCurrentSignal] = useState({ 
    direction: 'BUY', 
    confidence: 92,
    asset: 'EUR/USD OTC'
  });

  const handleAnalyze = async () => {
    // ستتم هنا استدعاء API الذكاء الاصطناعي
    const mockSignal = {
      direction: Math.random() > 0.5 ? 'BUY' : 'SELL',
      confidence: Math.floor(Math.random() * 15) + 85, // 85-99%
      asset: selectedAsset
    };
    setCurrentSignal(mockSignal);
    alert(`✅ ${language === 'ar' ? 'تم التحليل' : 'Analysis Complete'}: ${mockSignal.direction} (${mockSignal.confidence}%)`);
  };

  return (
    <div className="dashboard" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="dashboard-header">
        <h2>{language === 'ar' ? 'لوحة التداول' : 'Trading Dashboard'}</h2>
        <span>{language === 'ar' ? 'مرحباً' : 'Welcome'}, {user.name}</span>
      </div>

      <div className="dashboard-grid">
        <AssetList 
          selectedAsset={selectedAsset}
          onSelect={setSelectedAsset}
          language={language}
        />
        
        <div className="trading-actions">
          <TimeFrameSelector 
            selected={selectedTimeFrame}
            onSelect={setSelectedTimeFrame}
            language={language}
          />
          
          <div className="action-buttons">
            <button className="btn-buy" onClick={() => alert(`🟢 ${language === 'ar' ? 'أمر شراء على' : 'Buy order for'} ${selectedAsset}`)}>
              {language === 'ar' ? 'شراء' : 'BUY'}
            </button>
            <button className="btn-sell" onClick={() => alert(`🔴 ${language === 'ar' ? 'أمر بيع على' : 'Sell order for'} ${selectedAsset}`)}>
              {language === 'ar' ? 'بيع' : 'SELL'}
            </button>
            <button className="btn-analyze" onClick={handleAnalyze}>
              {language === 'ar' ? 'تحليل بالذكاء الاصطناعي' : 'AI Analyze'}
            </button>
          </div>
        </div>

        <SignalBox 
          signal={currentSignal}
          language={language}
        />
      </div>
    </div>
  );
};
export default TradingDashboard;
