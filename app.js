// KRM TRADING AI - نسخة مبسطة للبدء السريع

document.addEventListener('DOMContentLoaded', function() {
    const appState = {
        loggedIn: false,
        accountType: 'demo',
        balance: 10000,
        selectedAsset: 'EUR/USD OTC',
        timeframe: 1
    };

    // تحميل الواجهة المناسبة
    loadApp();

    function loadApp() {
        const root = document.getElementById('root');
        
        if (!appState.loggedIn) {
            root.innerHTML = getLoginPage();
            setupLoginEvents();
        } else {
            root.innerHTML = getDashboard();
            setupDashboardEvents();
            updateDashboard();
        }
    }

    function getLoginPage() {
        return `
            <div style="
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #0a0a0a, #1a1a2e);
                padding: 20px;
            ">
                <div class="card" style="max-width: 400px; width: 100%; text-align: center;">
                    <div style="margin-bottom: 30px;">
                        <div class="logo-main">KRM TRADING AI</div>
                        <div class="logo-sub">منصة التداول الذكية</div>
                    </div>
                    
                    <h2 style="margin-bottom: 25px; color: #FFD700;">
                        <i class="fas fa-sign-in-alt"></i> تسجيل الدخول
                    </h2>
                    
                    <input type="email" id="email" placeholder="البريد الإلكتروني" style="
                        width: 100%;
                        padding: 15px;
                        margin-bottom: 15px;
                        border-radius: 10px;
                        border: 1px solid #333;
                        background: rgba(255, 255, 255, 0.1);
                        color: white;
                        font-size: 16px;
                    ">
                    
                    <input type="password" id="password" placeholder="كلمة المرور" style="
                        width: 100%;
                        padding: 15px;
                        margin-bottom: 20px;
                        border-radius: 10px;
                        border: 1px solid #333;
                        background: rgba(255, 255, 255, 0.1);
                        color: white;
                        font-size: 16px;
                    ">
                    
                    <button id="loginBtn" class="btn btn-primary" style="width: 100%;">
                        <i class="fas fa-lock"></i> تسجيل الدخول
                    </button>
                    
                    <div style="margin-top: 20px;">
                        <button id="demoLogin" style="
                            padding: 10px 20px;
                            background: rgba(255, 215, 0, 0.1);
                            border: 1px solid #FFD700;
                            border-radius: 8px;
                            color: #FFD700;
                            cursor: pointer;
                            width: 100%;
                        ">
                            دخول تجريبي مباشر
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function getDashboard() {
        return `
            <div>
                <!-- الهيدر -->
                <header class="header">
                    <div>
                        <div class="logo-main">KRM TRADING AI</div>
                        <div class="logo-sub">منصة التداول الذكية بالذكاء الاصطناعي</div>
                    </div>
                    
                    <div style="display: flex; gap: 15px;">
                        <select id="accountType" style="
                            padding: 10px;
                            border-radius: 8px;
                            background: rgba(255, 255, 255, 0.1);
                            color: white;
                            border: 1px solid #FFD700;
                        ">
                            <option value="demo">حساب تجريبي</option>
                            <option value="real">حساب حقيقي</option>
                        </select>
                        
                        <button id="logoutBtn" style="
                            padding: 10px 20px;
                            background: rgba(255, 61, 0, 0.1);
                            border: 1px solid #FF3D00;
                            border-radius: 8px;
                            color: #FF3D00;
                            cursor: pointer;
                        ">
                            تسجيل خروج
                        </button>
                    </div>
                </header>

                <!-- المحتوى الرئيسي -->
                <main style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                    <div style="
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: 20px;
                    ">
                        <!-- بطاقة الأصل المختار -->
                        <div class="card">
                            <h2 style="color: #FFD700; margin-bottom: 15px;">
                                <i class="fas fa-chart-line"></i> ${appState.selectedAsset}
                            </h2>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <p style="color: #888;">الرصيد المتاح:</p>
                                    <h3 id="balance" style="color: #FFD700; font-size: 28px;">$${appState.balance.toLocaleString()}</h3>
                                </div>
                                <div>
                                    <p style="color: #888;">آخر سعر:</p>
                                    <h3 id="price" style="color: #00C853; font-size: 32px;">1.2345</h3>
                                </div>
                            </div>
                        </div>

                        <!-- أزرار التداول -->
                        <div class="card">
                            <h3 style="color: #FFD700; margin-bottom: 20px;">
                                <i class="fas fa-trade"></i> إجراءات التداول
                            </h3>
                            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                                <button id="buyBtn" class="btn btn-buy">
                                    <i class="fas fa-arrow-up"></i> شراء
                                </button>
                                <button id="sellBtn" class="btn btn-sell">
                                    <i class="fas fa-arrow-down"></i> بيع
                                </button>
                                <button id="analyzeBtn" class="btn btn-primary">
                                    <i class="fas fa-robot"></i> تحليل AI
                                </button>
                            </div>
                        </div>

                        <!-- الإشارة -->
                        <div class="card" id="signalCard" style="
                            background: linear-gradient(135deg, rgba(0, 200, 83, 0.2), rgba(0, 230, 118, 0.1));
                            border: 2px solid #00C853;
                            text-align: center;
                        ">
                            <div id="signalText" style="font-size: 32px; font-weight: bold; color: #00C853;">
                                🟢 إشارة شراء
                            </div>
                            <div id="confidence" style="font-size: 24px; color: #FFD700; margin-top: 10px;">
                                الثقة: 92%
                            </div>
                        </div>
                    </div>
                </main>

                <!-- الفوتر -->
                <footer style="
                    text-align: center;
                    padding: 20px;
                    color: #888;
                    border-top: 1px solid #333;
                    margin-top: 30px;
                ">
                    <div>© 2024 KRM TRADING AI - منصة التداول الذكية</div>
                </footer>
            </div>
        `;
    }

    function setupLoginEvents() {
        document.getElementById('loginBtn')?.addEventListener('click', function() {
            appState.loggedIn = true;
            loadApp();
        });

        document.getElementById('demoLogin')?.addEventListener('click', function() {
            appState.loggedIn = true;
            appState.accountType = 'demo';
            appState.balance = 10000;
            loadApp();
        });
    }

    function setupDashboardEvents() {
        document.getElementById('logoutBtn')?.addEventListener('click', function() {
            appState.loggedIn = false;
            loadApp();
        });

        document.getElementById('buyBtn')?.addEventListener('click', function() {
            executeTrade('BUY');
        });

        document.getElementById('sellBtn')?.addEventListener('click', function() {
            executeTrade('SELL');
        });

        document.getElementById('analyzeBtn')?.addEventListener('click', function() {
            analyzeMarket();
        });

        document.getElementById('accountType')?.addEventListener('change', function(e) {
            appState.accountType = e.target.value;
            updateDashboard();
        });
    }

    function updateDashboard() {
        // تحديث الرصيد
        const balanceEl = document.getElementById('balance');
        if (balanceEl) {
            balanceEl.textContent = `$${appState.balance.toLocaleString()}`;
        }

        // تحديث السعر
        const priceEl = document.getElementById('price');
        if (priceEl) {
            const newPrice = (Math.random() * 0.5 + 1.2).toFixed(4);
            priceEl.textContent = newPrice;
        }
    }

    function executeTrade(type) {
        const amount = 100;
        const profitLoss = Math.random() > 0.6 ? amount * 0.8 : -amount * 0.5;
        
        appState.balance += profitLoss;
        updateDashboard();

        alert(`${type === 'BUY' ? '🟢 شراء' : '🔴 بيع'} تم تنفيذه!\n${profitLoss > 0 ? '🎉 ربح: $' + profitLoss.toFixed(2) : '⚠️ خسارة: $' + Math.abs(profitLoss).toFixed(2)}`);
    }

    function analyzeMarket() {
        const signals = ['🟢 شراء', '🔴 بيع'];
        const randomSignal = signals[Math.floor(Math.random() * signals.length)];
        const confidence = Math.floor(Math.random() * 20) + 80;
        
        const signalCard = document.getElementById('signalCard');
        const signalText = document.getElementById('signalText');
        const confidenceEl = document.getElementById('confidence');
        
        if (signalCard && signalText && confidenceEl) {
            const isBuy = randomSignal.includes('شراء');
            
            signalCard.style.background = isBuy 
                ? 'linear-gradient(135deg, rgba(0, 200, 83, 0.2), rgba(0, 230, 118, 0.1))'
                : 'linear-gradient(135deg, rgba(255, 61, 0, 0.2), rgba(255, 82, 82, 0.1))';
            signalCard.style.borderColor = isBuy ? '#00C853' : '#FF3D00';
            
            signalText.textContent = randomSignal;
            signalText.style.color = isBuy ? '#00C853' : '#FF3D00';
            
            confidenceEl.textContent = `الثقة: ${confidence}%`;
            
            alert(`🤖 تحليل الذكاء الاصطناعي:\n${randomSignal}\nالثقة: ${confidence}%`);
        }
    }
});
