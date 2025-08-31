// src/features/stock/stockResolvers.ts
import StockRepository from "./StockRepository";
import { StockData } from "./StockRepository";

const stockRepository = new StockRepository();

export const stockResolvers = {
  Query: {
    stockData: async (
      _: any,
      { dates, symbols }: { dates: string[]; symbols?: string[] }
    ) => {
      let allStocks: StockData[] = [];

      for (const date of dates) {
        try {
          const stocks = stockRepository.getStockDataByDate(date);
          allStocks = allStocks.concat(stocks);
        } catch (err) {
          // Optionally log error or skip missing files
        }
      }

      // Filter for SERIES "EQ" and optionally symbols
      allStocks = allStocks.filter((row) => row.SERIES === " EQ");

      if (symbols && symbols.length > 0) {
        allStocks = allStocks.filter((row) => symbols.includes(row.SYMBOL));
      }

      return allStocks;
    },
  },
};
