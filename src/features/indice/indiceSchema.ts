import { gql } from "apollo-server";

export const indiceTypeDefs = gql`
  type IndiceClose {
    IndexName: String
    IndexDate: String
    OpenIndexValue: String
    HighIndexValue: String
    LowIndexValue: String
    ClosingIndexValue: String
    PointsChange: String
    ChangePercent: String
    Volume: String
    Turnover: String
    PE: String
    PB: String
    DivYield: String
  }

  type Query {
    indiceData(dates: [String!], indexNames: [String]): [IndiceClose!]!
  }
`;
