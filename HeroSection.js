import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ language }) => {
  const isArabic = language === 'ar';
  const text = {
    ar: {
      title: "KRM Trending AI",
      subtitle: "منصة التحليل الذكي للتداول",
      description: "تحليل احترافي مدعوم بالذكاء الاصطناعي. إشارات دقيقة لفرص تداول أفضل على PocketOption.",
      cta: "ابدأ الآن"
    },
    en: {
      title: "KRM Trending AI",
      subtitle: "AI-Powered Smart Trading Analysis",
      description: "Professional AI-driven analysis. Accurate signals for better trading opportunities on PocketOption.",
      cta: "Start Now"
    }
  };

  const current = text[isArabic ? 'ar' : 'en'];

  return (
    <div className="hero" dir={isArabic ? 'rtl' : 'ltr'}>
      <motion.div 
        className="logo-container"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="logo-title">{current.title}</h1>
        <p className="logo-subtitle">{current.subtitle}</p>
      </motion.div>

      <div className="hero-content">
        <p>{current.description}</p>
        <button className="cta-button">{current.cta}</button>
      </div>
    </div>
  );
};
export default HeroSection;
