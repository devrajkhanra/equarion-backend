import NiftyRepository, { NiftyCompany } from "./NiftyRepository";

const niftyRepository = new NiftyRepository();

export const niftyResolvers = {
  Query: {
    nifty50List: (): NiftyCompany[] => niftyRepository.getNiftyList(),

    companiesByIndustry: (
      _: any,
      args: { industry: string }
    ): NiftyCompany[] => {
      const allCompanies = niftyRepository.getNiftyList();
      return allCompanies.filter(
        (company: NiftyCompany) =>
          company.Industry.toLowerCase() === args.industry.toLowerCase()
      );
    },
  },
};
