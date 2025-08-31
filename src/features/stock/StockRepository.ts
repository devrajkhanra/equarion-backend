// src/features/stock/StockRepository.ts
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export interface StockData {
  SYMBOL: string;
  SERIES: string;
  DATE1: string;
  PREV_CLOSE: string;
  OPEN_PRICE: string;
  HIGH_PRICE: string;
  LOW_PRICE: string;
  LAST_PRICE: string;
  CLOSE_PRICE: string;
  AVG_PRICE: string;
  TTL_TRD_QNTY: string;
  TURNOVER_LACS: string;
  NO_OF_TRADES: string;
  DELIV_QTY: string;
  DELIV_PER: string;
}

export default class StockRepository {
  private basePath: string;

  constructor() {
    const homeDir = process.env.HOME || process.env.USERPROFILE;
    if (!homeDir) {
      throw new Error(
        "Cannot resolve home directory. Set HOME or USERPROFILE environment variable."
      );
    }
    this.basePath = path.join(homeDir, "Desktop", "NSE-Data", "data", "stock");
  }

  getStockDataByDate(dateString: string): StockData[] {
    const fileName = `sec_bhavdata_full_${dateString}.csv`;
    const filePath = path.join(this.basePath, fileName);

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found for date: ${dateString}`);
    }

    const csvData = fs.readFileSync(filePath, "utf8");
    const records: StockData[] = parse(csvData, {
      columns: (header) => header.map((h) => h.trim()), // Trim whitespace from each header
      skip_empty_lines: true,
    });
    return records;
  }
}
