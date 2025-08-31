import { mergeTypeDefs } from "@graphql-tools/merge";
import { niftyTypeDefs } from "../features/nifty/niftySchema";
import { indiceTypeDefs } from "../features/indice/indiceSchema";
import { stockTypeDefs } from "../features/stock/stockSchema";

export const typeDefs = mergeTypeDefs([
  niftyTypeDefs,
  indiceTypeDefs,
  stockTypeDefs,
]);
