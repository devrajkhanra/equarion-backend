import { mergeResolvers } from "@graphql-tools/merge";
import { niftyResolvers } from "../features/nifty/niftyResolvers";
import { indiceResolvers } from "../features/indice/indiceResolvers";
import { stockResolvers } from "../features/stock/stockResolvers";

export const resolvers = mergeResolvers([
  niftyResolvers,
  indiceResolvers,
  stockResolvers,
]);
