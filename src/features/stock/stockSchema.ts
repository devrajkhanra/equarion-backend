// src/features/stock/stockSchema.ts
import { gql } from "apollo-server";

export const stockTypeDefs = gql`
  type Stock {
    SYMBOL: String
    SERIES: String
    DATE1: String
    PREV_CLOSE: String
    OPEN_PRICE: String
    HIGH_PRICE: String
    LOW_PRICE: String
    LAST_PRICE: String
    CLOSE_PRICE: String
    AVG_PRICE: String
    TTL_TRD_QNTY: String
    TURNOVER_LACS: String
    NO_OF_TRADES: String
    DELIV_QTY: String
    DELIV_PER: String
  }

  type Query {
    stockData(dates: [String!], symbols: [String]): [Stock!]!
  }
`;
