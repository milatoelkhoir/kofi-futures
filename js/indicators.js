/**
 * KOFI TECHNICAL INDICATORS MODULE
 * Calculates all 12 indicators
 */

const Indicators = {
    // Convert klines data to OHLCV array
    parseKlines(klines) {
        if (!klines || klines.length === 0) return [];
        
        return klines.map(k => ({
            open: parseFloat(k[1]),
            high: parseFloat(k[2]),
            low: parseFloat(k[3]),
            close: parseFloat(k[4]),
            volume: parseFloat(k[5])
        }));
    },

    // Calculate RSI (14)
    calculateRSI(closes, period = 14) {
        if (closes.length < period + 1) return 50;
        
        let gains = 0;
        let losses = 0;
        
        for (let i = closes.length - period; i < closes.length; i++) {
            const diff = closes[i] - closes[i - 1];
            if (diff > 0) gains += diff;
            else losses -= diff;
        }
        
        const avgGain = gains / period;
        const avgLoss = losses / period;
        
        if (avgLoss === 0) return 100;
        const rs = avgGain / avgLoss;
        return (100 - (100 / (1 + rs))).toFixed(2);
    },

    // Calculate MACD (12,26,9)
    calculateMACD(closes) {
        const ema12 = this.calculateEMA(closes, 12);
        const ema26 = this.calculateEMA(closes, 26);
        const macd = ema12 - ema26;
        const signal = macd * 0.2; // Simplified
        const histogram = macd - signal;
        
        return {
            macd: macd.toFixed(2),
            signal: signal.toFixed(2),
            histogram: histogram.toFixed(2)
        };
    },

    // Calculate EMA
    calculateEMA(closes, period) {
        const k = 2 / (period + 1);
        let ema = closes[0];
        
        for (let i = 1; i < closes.length; i++) {
            ema = closes[i] * k + ema * (1 - k);
        }
        
        return ema;
    },

    // Calculate SMA
    calculateSMA(closes, period) {
        const slice = closes.slice(-period);
        return slice.reduce((a, b) => a + b, 0) / period;
    },

    // Calculate Bollinger Bands (20, 2)
    calculateBollingerBands(closes, period = 20) {
        const sma = this.calculateSMA(closes, period);
        const slice = closes.slice(-period);
        const variance = slice.reduce((sum, val) => sum + Math.pow(val - sma, 2), 0) / period;
        const stdDev = Math.sqrt(variance);
        
        return {
            upper: (sma + stdDev * 2).toFixed(2),
            middle: sma.toFixed(2),
            lower: (sma - stdDev * 2).toFixed(2)
        };
    },

    // Calculate ATR (14)
    calculateATR(klines, period = 14) {
        const ohlcv = this.parseKlines(klines);
        if (ohlcv.length < period + 1) return 0;
        
        let totalTR = 0;
        
        for (let i = ohlcv.length - period; i < ohlcv.length; i++) {
            const tr = Math.max(
                ohlcv[i].high - ohlcv[i].low,
                Math.abs(ohlcv[i].high - ohlcv[i - 1].close),
                Math.abs(ohlcv[i].low - ohlcv[i - 1].close)
            );
            totalTR += tr;
        }
        
        return (totalTR / period).toFixed(2);
    },

    // Calculate Fibonacci Levels
    calculateFibonacci(high, low) {
        const diff = high - low;
        return {
            '0.236': (low + diff * 0.236).toFixed(2),
            '0.382': (low + diff * 0.382).toFixed(2),
            '0.500': (low + diff * 0.5).toFixed(2),
            '0.618': (low + diff * 0.618).toFixed(2),
            '0.786': (low + diff * 0.786).toFixed(2)
        };
    },

    // Calculate VWAP (Simplified)
    calculateVWAP(klines) {
        const ohlcv = this.parseKlines(klines);
        if (ohlcv.length === 0) return 0;
        
        let cumulativeTPV = 0;
        let cumulativeVolume = 0;
        
        for (let i = 0; i < ohlcv.length; i++) {
            const tp = (ohlcv[i].high + ohlcv[i].low + ohlcv[i].close) / 3;
            cumulativeTPV += tp * ohlcv[i].volume;
            cumulativeVolume += ohlcv[i].volume;
        }
        
        return (cumulativeTPV / cumulativeVolume).toFixed(2);
    },

    // Detect Market Structure (HH, HL, LH, LL)
    detectMarketStructure(closes, lookback = 30) {
        const recent = closes.slice(-lookback);
        const current = recent[recent.length - 1];
        
        let higherHigh = false;
        let higherLow = false;
        let lowerHigh = false;
        let lowerLow = false;
        
        for (let i = recent.length - 2; i >= 0; i--) {
            if (recent[i] > current) higherHigh = true;
            if (recent[i] < current) higherLow = true;
            if (recent[i] > current && i < recent.length - 1) lowerHigh = true;
            if (recent[i] < current && i < recent.length - 1) lowerLow = true;
        }
        
        let trend = 'Neutral';
        if (higherHigh && higherLow) trend = 'Bullish';
        else if (lowerHigh && lowerLow) trend = 'Bearish';
        
        return {
            higherHigh,
            higherLow,
            lowerHigh,
            lowerLow,
            trend
        };
    },

    // Determine overall signal from indicators
    getOverallSignal(rsi, macd, bb, atr) {
        let score = 0;
        
        // RSI
        if (rsi > 70) score -= 1;
        else if (rsi > 60) score += 1;
        else if (rsi < 30) score += 1;
        else if (rsi < 40) score -= 1;
        
        // MACD
        if (macd.macd > macd.signal) score += 1;
        else score -= 1;
        
        // Bollinger
        if (bb.upper === bb.middle) score -= 1;
        else if (bb.lower === bb.middle) score += 1;
        
        return score;
    }
};
