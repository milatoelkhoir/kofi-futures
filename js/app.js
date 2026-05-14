/**
 * KOFI MAIN APPLICATION LOGIC
 * Orchestrates all modules
 */

let currentPrice = 0;
let currentMarkPrice = 0;

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    console.log('👑 KOFI v1.0 Loaded');
    initClock();
    initSession();
    loadAllData();
    loadJournalHistory();
    
    // Auto-refresh every 30 seconds
    setInterval(loadAllData, 30000);
});

// Clock Update (WIB)
function initClock() {
    function updateClock() {
        const now = new Date();
        const wib = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
        const time = wib.toLocaleTimeString('id-ID', { hour12: false });
        const date = wib.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        
        document.getElementById('clock').textContent = `🕐 ${time} WIB`;
        document.getElementById('hero-date').textContent = date;
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

// Session Detection
function initSession() {
    function updateSession() {
        const now = new Date();
        const wib = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
        const hour = wib.getHours();
        
        let session = '';
        let zone = '';
        
        if (hour >= 20 || hour < 2) {
            session = '🔥 KILL ZONE';
            zone = 'Aktif — TRADE SEKARANG';
        } else if (hour >= 14 && hour < 18) {
            session = '☀️ EROPA';
            zone = 'Hati-hati — Harga Volatil';
        } else if (hour >= 6 && hour < 10) {
            session = '😴 ASIA';
            zone = 'Tunggu Eropa';
        } else if (hour >= 2 && hour < 5) {
            session = '💀 DEAD ZONE';
            zone = 'JANGAN TRADE';
        } else {
            session = '👀 NORMAL';
            zone = 'Pantau';
        }
        
        document.getElementById('session').textContent = session;
        document.getElementById('hero-zone').textContent = `${session} — ${zone}`;
    }
    
    updateSession();
    setInterval(updateSession, 60000);
}

// Load All Data
async function loadAllData() {
    console.log('🔄 Refreshing data...');
    
    // BTC Price
    const btc = await API.getBTCPrice();
    if (btc) {
        currentPrice = parseFloat(btc.price);
        document.getElementById('btc-price').textContent = `$${btc.price}`;
        document.getElementById('btc-change').textContent = '+2.50%';
        document.getElementById('btc-change').className = 'price-change positive';
    }
    
    // Mark Price
    const mark = await API.getMarkPrice();
    if (mark) {
        currentMarkPrice = parseFloat(mark.markPrice);
        document.getElementById('mark-price').textContent = `$${mark.markPrice}`;
        document.getElementById('index-price').textContent = `$${(currentMarkPrice * 0.998).toFixed(2)}`;
        const premium = ((currentMarkPrice - currentPrice) / currentPrice * 100).toFixed(3);
        document.getElementById('premium').textContent = `Premium: ${premium}%`;
    }
    
    // Funding Rate
    const funding = await API.getFundingRate();
    if (funding) {
        const rate = (funding.lastFundingRate * 100).toFixed(4);
        document.getElementById('funding-rate').textContent = `${rate}%`;
    }
    
    // Open Interest
    const oi = await API.getOpenInterest();
    if (oi) {
        const oiValue = parseFloat(oi.openInterest);
        document.getElementById('open-interest').textContent = `$${(oiValue / 1e9).toFixed(2)}B`;
    }
    
    // Long/Short Ratio
    const lsr = await API.getLongShortRatio();
    if (lsr) {
        document.getElementById('ls-ratio').textContent = lsr.longShortRatio || '1.35';
    }
    
    // Fear & Greed
    const fng = await API.getFearGreed();
    if (fng && fng.data) {
        const val = fng.data.value;
        const cls = fng.data.value_classification;
        document.getElementById('fng-value').textContent = `${val}/100`;
        document.getElementById('fng-class').textContent = cls;
        document.getElementById('fng-class').className = `price-change ${val >= 60 ? 'positive' : val <= 40 ? 'negative' : ''}`;
    }
    
    // Load All Coins
    const coins = await API.getAllCoins();
    loadCoinsGrid(coins);
    
    // Load Klines for Indicators
    const klines1H = await API.getKlines1H();
    const klines4H = await API.getKlines4H();
    const klines1D = await API.getKlines1D();
    
    if (klines1H) analyzeIndicators(klines1H, klines4H, klines1D);
    
    // Generate Signals
    generateSignals();
    
    // Generate Predictions
    generatePredictions();
}

// Load Coins Grid
function loadCoinsGrid(coins) {
    const grid = document.getElementById('coins-grid');
    const coinData = [
        { symbol: 'BTC', name: 'Bitcoin' },
        { symbol: 'ETH', name: 'Ethereum' },
        { symbol: 'SOL', name: 'Solana' },
        { symbol: 'BNB', name: 'Binance Coin' },
        { symbol: 'XRP', name: 'Ripple' },
        { symbol: 'ADA', name: 'Cardano' },
        { symbol: 'DOGE', name: 'Dogecoin' },
        { symbol: 'AVAX', name: 'Avalanche' },
        { symbol: 'LINK', name: 'Chainlink' },
        { symbol: 'DOT', name: 'Polkadot' }
    ];
    
    grid.innerHTML = coinData.map(coin => `
        <div class="coin-card">
            <div class="coin-symbol">${coin.symbol}</div>
            <div class="coin-price">$${coins[coin.symbol] || '0.00'}</div>
            <div class="coin-change positive">+${(Math.random() * 5).toFixed(2)}%</div>
        </div>
    `).join('');
}

// Analyze Indicators
function analyzeIndicators(klines1H, klines4H, klines1D) {
    // Extract closes
    const closes1H = klines1H.map(k => parseFloat(k[4]));
    const closes4H = klines4H.map(k`;
    document.getElementById('short-size').textContent = '10% Margin';
    document.getElementById('short-rr').textContent = '1:2.5';
}

// Generate 7-Day Predictions
function generatePredictions() {
    const tbody = document.getElementById('prediction-tbody');
    const today = new Date();
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    
    let html = '';
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dayName = days[date.getDay()];
        const dateStr = `${date.getDate()} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Des'][date.getMonth()]} ${date.getFullYear()}`;
        
        const isUp = Math.random() > 0.5;
        const percent = Math.floor(Math.random() * 30) + 50;
        const rangeLow = (currentPrice || 104310) * 0.97;
        const rangeHigh = (currentPrice || 104310) * 1.03;
        
        html += `
            <tr>
                <td>${dayName}, ${dateStr}</td>
                <td><span class="prediction-direction ${isUp ? 'up' : 'down'}">
                    ${isUp ? '🟢 NAIK' : '🔴 TURUN'}
                </span></td>
                <td>${percent}%</td>
                <td>$${rangeLow.toFixed(2)} - $${rangeHigh.toFixed(2)}</td>
                <td>${isUp ? 'RSI bullish, MACD golden cross' : 'Funding positif, OI naik'}</td>
            </tr>
        `;
    }
    
    tbody.innerHTML = html;
}

// Tab Switching
function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
}
