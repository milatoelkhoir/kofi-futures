/**
 * KOFI API INTEGRATION MODULE
 * Handles all external API calls
 */

const API = {
    endpoints: {
        binance: 'https://fapi.binance.com/fapi/v1',
        alternative: 'https://api.alternative.me/fng',
        cryptocompare: 'https://min-api.cryptocompare.com/data'
    },

    // Fetch BTC Price
    async getBTCPrice() {
        try {
            const res = await fetch(`${this.endpoints.binance}/ticker/price?symbol=BTCUSDT`);
            return await res.json();
        } catch (err) {
            console.error('Error fetching BTC price:', err);
            return null;
        }
    },

    // Fetch Mark Price
    async getMarkPrice() {
        try {
            const res = await fetch(`${this.endpoints.binance}/ticker/markPrice?symbol=BTCUSDT`);
            return await res.json();
        } catch (err) {
            console.error('Error fetching mark price:', err);
            return null;
        }
    },

    // Fetch Funding Rate
    async getFundingRate() {
        try {
            const res = await fetch(`${this.endpoints.binance}/premiumIndex?symbol=BTCUSDT`);
            return await res.json();
        } catch (err) {
            console.error('Error fetching funding rate:', err);
            return null;
        }
    },

    // Fetch Open Interest
    async getOpenInterest() {
        try {
            const res = await fetch(`${this.endpoints.binance}/openInterest?symbol=BTCUSDT`);
            return await res.json();
        } catch (err) {
            console.error('Error fetching open interest:', err);
            return null;
        }
    },

    // Fetch Long/Short Ratio
    async getLongShortRatio() {
        try {
            const res = await fetch(`${this.endpoints.binance}/positionRisk?symbol=BTCUSDT`);
            return await res.json();
        } catch (err) {
            console.error('Error fetching long/short ratio:', err);
            return null;
        }
    },

    // Fetch 1H Klines
    async getKlines1H() {
        try {
            const res = await fetch(`${this.endpoints.binance}/klines?symbol=BTCUSDT&interval=1h&limit=100`);
            return await res.json();
        } catch (err) {
            console.error('Error fetching klines 1H:', err);
            return null;
        }
    },

    // Fetch 4H Klines
    async getKlines4H() {
        try {
            const res = await fetch(`${this.endpoints.binance}/klines?symbol=BTCUSDT&interval=4h&limit=100`);
            return await res.json();
        } catch (err) {
            console.error('Error fetching klines 4H:', err);
            return null;
        }
    },

    // Fetch 1D Klines
    async getKlines1D() {
        try {
            const res = await fetch(`${this.endpoints.binance}/klines?symbol=BTCUSDT&interval=1d&limit=100`);
            return await res.json();
        } catch (err) {
            console.error('Error fetching klines 1D:', err);
            return null;
        }
    },

    // Fetch Fear & Greed
    async getFearGreed() {
        try {
            const res = await fetch(`${this.endpoints.alternative}/fng/?limit=1`);
            return await res.json();
        } catch (err) {
            console.error('Error fetching Fear & Greed:', err);
            return null;
        }
    },

    // Fetch CryptoCompare Social Sentiment
    async getSocialSentiment(coin = 'BTC') {
        try {
            const res = await fetch(`${this.endpoints.cryptocompare}/social/summary?fsym=${coin}&tsym=USD&api_key=YOUR_KEY`);
            return await res.json();
        } catch (err) {
            console.error('Error fetching social sentiment:', err);
            return null;
        }
    },

    // Fetch All 10 Coins Prices
    async getAllCoins() {
        const coins = ['BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'ADA', 'DOGE', 'AVAX', 'LINK', 'DOT'];
        const results = {};
        
        for (const coin of coins) {
            try {
                const res = await fetch(`${this.endpoints.binance}/ticker/price?symbol=${coin}USDT`);
                const data = await res.json();
                results[coin] = data.price;
            } catch (err) {
                console.error(`Error fetching ${coin}:`, err);
            }
        }
        
        return results;
    }
};
