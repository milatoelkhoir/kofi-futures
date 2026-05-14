/**
 * KOFI TRADING JOURNAL MODULE
 * Handles journal storage and management
 */

const Journal = {
    // Get all journal entries
    getAll() {
        const data = localStorage.getItem('kofi_journal');
        return data ? JSON.parse(data) : [];
    },

    // Save new entry
    save(entry) {
        const journal = this.getAll();
        entry.id = Date.now();
        entry.createdAt = new Date().toISOString();
        journal.unshift(entry);
        localStorage.setItem('kofi_journal', JSON.stringify(journal));
        return entry;
    },

    // Delete entry
    delete(id) {
        const journal = this.getAll().filter(e => e.id !== id);
        localStorage.setItem('kofi_journal', JSON.stringify(journal));
    },

    // Export to CSV
    exportToCSV() {
        const journal = this.getAll();
        if (journal.length === 0) {
            alert('Tidak ada data journal!');
            return;
        }

        const headers = ['Tanggal', 'Pair', 'Setup', 'Entry', 'Exit', 'SL', 'TP1', 'TP2', 'TP3', 'Leverage', 'Size', 'P/L', 'Strategi', 'Alasan'];
        const rows = journal.map(e => [
            e.date, e.pair, e.setup, e.entry, e.exit, e.sl,
            e.tp1, e.tp2 = '';
        let zone = '';
        
        if (hour >= 20 || hour < 2) {
            session = '🔥 KILL ZONE';
            zone = 'Aktif';
        } else if (hour >= 14 && hour < 18) {
            session = '☀️ EROPA';
            zone = 'Hati-hati';
        } else if (hour >= 6 && hour < 10) {
            session = '😴 ASIA';
            zone = 'Tunggu';
        } else if (hour >= 2 && hour < 5) {
            session = '😴 DEAD ZONE';
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

// Load Market Data
async function loadMarketData() {
    try {
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
            document.getElementById('index-price').textContent = `$${(currentMarkPrice * 0.998).toFixed(ETH', change: '+1.8%' },
        { symbol: 'SOL', change: '+3.2%' },
        { symbol: 'BNB', change: '+0.9%' },
        { symbol: 'XRP', change: '-1.2%' },
        { symbol: 'ADA', change: '+0.5%' },
        { symbol: 'DOGE', change: '+2.1%' },
        { symbol: 'AVAX', change: '+1.7%' },
        { symbol: 'LINK', change: '-0.8%' },
        { symbol: 'DOT', change: '+1.3%' }
    ];
    
    grid.innerHTML = coins.map(coin => `
        <div class="coin-card">
            <div class="coin-symbol">${coin.symbol}</div>
            <div class="coin-price">$${prices[coin.symbol + 'USDT'] || '0'}</div>
            <div class="coin-change ${coin.change.startsWith('+') ? 'positive' : 'negative'}">
                ${coin.change}
            </div>
        </div>
    `).join('');
}

// Load Fear & Greed
async function loadFearGreed() {
    const fng = await API.getFearGreed();
    if (fng && fng.data) {
        const val = fng.data.value;
        const cls = fng.data.value_classification;
        document.getElementById('fng-value').textContent = `${val}/100`;
        document.getElementById('fng-class').textContent = cls;
        document.getElementById('fng-class').className = `price-change ${val >= 60 ? 'positive' : val <= 40 ? 'negative' : ''}`;
    }
}

// Load Klines for Technical Analysis
async function loadKlines() {
    const klines = await API.getions();
}

// Calculate Scores
function calculateScores(rsi, macd, bb, atr) {
    let techScore = 50;
    let fundScore = 50;
    let binanceScore = 50;

    // Technical
    if (rsi > 50) techScore += 10;
    if (macd.macd > macd.signal) techScore += 10;
    techScore = Math.min(100, Math.max(0, techScore));

    // Fundamental (simplified)
    fundScore = 65; // Default

    // Binance
    binanceScore = 70; // Default

    const total = Math.round((techScore + fundScore + binanceScore) / 3);

    // Update UI
    document.getElementById('tech-score').textContent = techScore;
    document.getElementById('fund-score').textContent = fundScore;
    document.getElementById('binance-score').textContent = binanceScore;
    document.getElementById('total-score').textContent = total;

    document.getElementById('tech-bar').style.width = `${techScore}%`;
    document.getElementById('fund-bar').style.width = `${fundScore}%`;
    document.getElementById('binance-bar').style.width = `${binanceScore}%`;
    document.getElementById('total-bar').style.width = `${total}%`;

    // Recommendation
    const recBox = document.getElementById('recommendation');
    if (total >= 70) {
        recBox.innerHTML = '<i class="fas fa-lightbulb"></i><span>🟢 REKOMENDASI: LONG — Keyakinan Tinggi</span>';
    } else if (total >= 50) {
        recBox.innerHTML = '<i class="fas fa-lightbulb"></i><span>🟡 REKOMENDASI document.getElementById('short-tp3').textContent = `$${shortTP3.toFixed(2)}`;
    document.getElementById('short-liq').textContent = `$${shortLiq.toFixed(2)} ✅`;
    document.getElementById('short-lev').textContent = `${leverage}x`;
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
        const dateStr = `${date.getDate()} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][date.getMonth()]} ${date.getFullYear()}`;
        
        const isUp = Math.random() > 0.5;
        const percent = Math.floor(Math.random() * 30) + 50;
        const rangeLow = (currentPrice || 100000) * 0.97;
        const rangeHigh = (currentPrice || 100000) * 1.03;

        html += `
            <tr>
                <td>${dayName}, ${dateStr}</td>
                <td><span class="prediction-direction ${isUp ? 'up' : 'down'}">
                    ${isUp ? '🟢 NAIK' : '🔴 TURUN'}
                </span></td>
                <td>${percent}%</td>${e.strategy}</td>
            <td>${e.reason || '-'}</td>
        </tr>
    `).join('');
}

// Export Journal
function exportJournal() {
    Journal.exportToCSV();
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Switch Tabs
function switchTab(tabName) {
    // Deactivate all tabs and contents
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    // Activate selected
    event.target.classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
}
