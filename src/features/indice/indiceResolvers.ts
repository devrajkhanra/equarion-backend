import IndiceRepository from "./IndiceRepository";
import { IndiceData } from "./IndiceRepository";

const indiceRepository = new IndiceRepository();

export const indiceResolvers = {
  Query: {
    indiceData: (
      _: any,
      { dates, indexNames }: { dates: string[]; indexNames?: string[] }
    ) => {
      let allResults: IndiceData[] = [];

      dates.forEach((date) => {
        try {
          const rawData: IndiceData[] =
            indiceRepository.getIndiceDataByDate(date);
          allResults = allResults.concat(rawData);
        } catch (e) {
          // Optionally handle errors (e.g. missing file) here
        }
      });

      // If indexNames is specified, filter results further
      if (indexNames && indexNames.length > 0) {
        allResults = allResults.filter((row) =>
          indexNames.includes(row["Index Name"])
        );
      }

      // Map to GraphQL type
      return allResults.map((row) => ({
        IndexName: row["Index Name"],
        IndexDate: row["Index Date"],
        OpenIndexValue: row["Open Index Value"],
        HighIndexValue: row["High Index Value"],
        LowIndexValue: row["Low Index Value"],
        ClosingIndexValue: row["Closing Index Value"],
        PointsChange: row["Points Change"],
        ChangePercent: row["Change(%)"],
        Volume: row["Volume"],
        Turnover: row["Turnover (Rs. Cr.)"],
        PE: row["P/E"],
        PB: row["P/B"],
        DivYield: row["Div Yield"],
      }));
    },
  },
};
