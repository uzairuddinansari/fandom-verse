
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../styles/TradingActivity.css";

const generateCandles = () => {
  let price = 220;

  return Array.from({ length: 32 }, (_, index) => {
    const open = price + (Math.random() - 0.5) * 18;
    const close = open + (Math.random() - 0.5) * 28;
    const high = Math.max(open, close) + Math.random() * 14;
    const low = Math.min(open, close) - Math.random() * 14;

    price = close;

    return {
      id: index,
      open,
      close,
      high,
      low,
      bullish: close >= open
    };
  });
};

const randomMarketData = () => {
  const open = 220 + Math.random() * 80;
  const close = open + (Math.random() - 0.5) * 30;
  const high = Math.max(open, close) + Math.random() * 15;
  const low = Math.min(open, close) - Math.random() * 15;

  return {
    open: open.toFixed(2),
    high: high.toFixed(2),
    low: low.toFixed(2),
    close: close.toFixed(2)
  };
};

function TradingActivity() {
  const [candles, setCandles] = useState(generateCandles);
  const [activeCandle, setActiveCandle] = useState(null);
  const [marketData, setMarketData] = useState(randomMarketData);
  const [isInside, setIsInside] = useState(false);

  const chartRef = useRef(null);
  const tooltipRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCandles((currentCandles) =>
        currentCandles.map((candle) => {
          const movement = (Math.random() - 0.5) * 3;
          const newClose = Math.max(20, candle.close + movement);
          const newHigh = Math.max(candle.high, newClose + Math.random() * 2);
          const newLow = Math.min(candle.low, newClose - Math.random() * 2);

          return {
            ...candle,
            close: newClose,
            high: newHigh,
            low: newLow,
            bullish: newClose >= candle.open
          };
        })
      );
    }, 900);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!tooltipRef.current) return;

    gsap.set(tooltipRef.current, {
      opacity: 0,
      scale: 0.92
    });
  }, []);

  const showTooltip = () => {
    if (!tooltipRef.current) return;

    setIsInside(true);

    gsap.to(tooltipRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handleMouseMove = (e) => {
    if (!chartRef.current || !tooltipRef.current) return;

    const rect = chartRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mousePosition.current = { x, y };

    setMarketData(randomMarketData());

    gsap.to(tooltipRef.current, {
      x: x + 18,
      y: y - 85,
      opacity: 1,
      scale: 1,
      duration: 0.16,
      ease: "power2.out"
    });
  };

  const handleMouseEnter = (e) => {
    showTooltip();
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    setIsInside(false);
    setActiveCandle(null);

    gsap.to(tooltipRef.current, {
      opacity: 0,
      scale: 0.92,
      duration: 0.2,
      ease: "power2.in"
    });
  };

  const handleCandleEnter = (candle) => {
    setActiveCandle(candle.id);

    setMarketData({
      open: candle.open.toFixed(2),
      high: candle.high.toFixed(2),
      low: candle.low.toFixed(2),
      close: candle.close.toFixed(2)
    });
  };

  return (
    <section className="trading-activity">
      <div className="trading-header">
        <div>
          <span className="trading-label">LIVE ACTIVITY</span>
          <h2>Market Activity</h2>
        </div>

        <div className="market-status">
          <span className="status-dot"></span>
          <span>LIVE</span>
        </div>
      </div>

      <div
        className="trading-chart"
        ref={chartRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="chart-grid">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="candles">
          {candles.map((candle) => {
            const range = Math.max(candle.high - candle.low, 1);
            const bodyTop = ((candle.high - Math.max(candle.open, candle.close)) / range) * 100;
            const bodyHeight = (Math.abs(candle.close - candle.open) / range) * 100;

            return (
              <div
                className={`candle ${candle.bullish ? "bullish" : "bearish"} ${activeCandle === candle.id ? "active" : ""}`}
                key={candle.id}
                onMouseEnter={() => handleCandleEnter(candle)}
              >
                <div className="candle-wick"></div>

                <div
                  className="candle-body"
                  style={{
                    top: `${bodyTop}%`,
                    height: `${Math.max(bodyHeight, 8)}%`
                  }}
                ></div>
              </div>
            );
          })}
        </div>

        <div className="chart-line"></div>

        <div className={`market-tooltip ${isInside ? "tooltip-visible" : ""}`} ref={tooltipRef}>
          <div className="tooltip-title">
            <span>MARKET DATA</span>
            <i></i>
          </div>

          <div className="tooltip-row">
            <span>Open</span>
            <strong>{marketData.open}</strong>
          </div>

          <div className="tooltip-row">
            <span>High</span>
            <strong>{marketData.high}</strong>
          </div>

          <div className="tooltip-row">
            <span>Low</span>
            <strong>{marketData.low}</strong>
          </div>

          <div className="tooltip-row">
            <span>Close</span>
            <strong>{marketData.close}</strong>
          </div>
        </div>

        <div className="chart-bottom-labels">
          <span>09:00</span>
          <span>12:00</span>
          <span>15:00</span>
          <span>18:00</span>
        </div>
      </div>
    </section>
  );
}

export default TradingActivity;
