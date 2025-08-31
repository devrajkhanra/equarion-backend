import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export interface IndiceData {
  "Index Name": string;
  "Index Date": string;
  "Open Index Value": string;
  "High Index Value": string;
  "Low Index Value": string;
  "Closing Index Value": string;
  "Points Change": string;
  "Change(%)": string;
  Volume: string;
  "Turnover (Rs. Cr.)": string;
  "P/E": string;
  "P/B": string;
  "Div Yield": string;
}

export default class IndiceRepository {
  private basePath: string;

  constructor() {
    const homeDir = process.env.HOME || process.env.USERPROFILE;
    if (!homeDir) {
      throw new Error(
        "Cannot resolve home directory. Set HOME or USERPROFILE environment variable."
      );
    }

    this.basePath = path.join(homeDir, "Desktop", "NSE-Data", "data", "indice");
  }

  getIndiceDataByDate(dateString: string): IndiceData[] {
    const fileName = `ind_close_all_${dateString}.csv`;
    const filePath = path.join(this.basePath, fileName);

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found for date: ${dateString}`);
    }

    const csvData = fs.readFileSync(filePath, "utf8");
    const records: IndiceData[] = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    });

    return records;
  }
}
