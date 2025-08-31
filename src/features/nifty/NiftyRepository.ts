import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export interface NiftyCompany {
  "Company Name": string;
  Industry: string;
  Symbol: string;
  Series: string;
  "ISIN Code": string;
}

export default class NiftyRepository {
  private filePath: string;

  constructor() {
    const homeDir = process.env.HOME || process.env.USERPROFILE;
    if (!homeDir) {
      throw new Error(
        "Cannot resolve home directory. Set HOME or USERPROFILE environment variable."
      );
    }

    this.filePath = path.join(
      homeDir,
      "Desktop",
      "NSE-Data",
      "data",
      "broad",
      "nifty50list.csv"
    );
  }

  getNiftyList(): NiftyCompany[] {
    const csvData = fs.readFileSync(this.filePath, "utf8");
    const records: NiftyCompany[] = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    });
    return records;
  }
}
