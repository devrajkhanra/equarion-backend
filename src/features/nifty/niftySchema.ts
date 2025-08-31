import { gql } from "apollo-server";

export const niftyTypeDefs = gql`
  type NiftyCompany {
    CompanyName: String
    Industry: String
    Symbol: String
    Series: String
    ISINCode: String
  }

  type Query {
    nifty50List: [NiftyCompany!]!
    companiesByIndustry(industry: String!): [NiftyCompany!]!
  }
`;
