require('dotenv').config();
const ccxt = require ('ccxt');

const fetchPrices = async () => {
  const binanceInstance:any = ccxt['binance'];
  const binance  = new binanceInstance();
  const binanceTickers = await binance.fetchTickers();

  const ftxInstance:any = ccxt['ftx'];
  const ftx  = new ftxInstance();
  const ftxTickers = await ftx.fetchTickers();

  const okxInstance:any = ccxt['binance'];
  const okx  = new okxInstance();
  const okxTickers = await okx.fetchTickers();

  let pricesTable = [];
  interface tickerPrices {
    symbol: string,
    binanceTicker: {
      price: number,
      volume: number,
      percentage: number
    },
    ftxTicker: {
      price: number,
      volume: number,
      percentage: number
    },
    okxTicker: {
      price: number,
      volume: number,
      percentage: number
    }
  }

  for (const ticker in binanceTickers) {
    if (ticker.includes('/USDT')) {
      let tickerPrice:tickerPrices = {
        symbol: ticker,
        binanceTicker: {
          price: binanceTickers[ticker].bid,
          volume: binanceTickers[ticker].quoteVolume,
          percentage: binanceTickers[ticker].percentage,
        },
        ftxTicker: {
          price: 0,
          volume: 0,
          percentage: 0
        },
        okxTicker: {
          price: 0,
          volume: 0,
          percentage: 0
        }
      }
      pricesTable.push(tickerPrice);
    }
  }

  pricesTable.forEach(function(item, index) {
    for (const ticker in ftxTickers) {
      if (ticker.includes('/USDT') && item.symbol === ticker) {
        item.ftxTicker = {
          price: ftxTickers[ticker].bid,
          volume: ftxTickers[ticker].quoteVolume,
          percentage: ftxTickers[ticker].percentage,
        }
      }
    }
  });

  pricesTable.forEach(function(item, index) {
    for (const ticker in okxTickers) {
      if (ticker.includes('/USDT') && item.symbol === ticker) {
        item.okxTicker = {
          price: okxTickers[ticker].bid,
          volume: okxTickers[ticker].quoteVolume,
          percentage: okxTickers[ticker].percentage,
        }
      }
    }
  });

  return pricesTable;
}

export { fetchPrices };
