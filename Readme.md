Overview
Equarion Backend is a GraphQL API server built with Apollo Server and TypeScript designed to serve financial market data, specifically NSE indices, stocks, and Nifty companies. The backend reads local CSV data files containing market information and exposes this data via flexible GraphQL queries for multiple dates and with optional filtering by symbols or index names.

Table of Contents
Features

Technology Stack

Project Structure

Setup & Installation

Configuration

Data Requirements

GraphQL Schema

Queries Overview

Custom Filters & Multi-Date Support

Running the Server

Code Highlights

Troubleshooting

Contributing

License

Features
GraphQL API exposing stock market data

Supports querying multiple dates at once

Filtering by symbols for stocks and by index names for indices

Cleans and parses CSV files dynamically from local data source

Resolvers for Nifty company list filtered by industry

Automatic trimming of CSV header fields for clean key mapping

Flexible integration with Apollo Server

Technology Stack
Node.js with TypeScript

Apollo Server for GraphQL endpoint

csv-parse to read and parse CSV files

GraphQL schema and resolvers structured with @graphql-tools/merge

Built-in support for reading from local directories based on environment user profile

Project Structure
text
/src
/features
/stock - StockRepository.ts - stockResolvers.ts - stockSchema.ts
/indice - IndiceRepository.ts - indiceResolvers.ts - indiceSchema.ts
/nifty - NiftyRepository.ts - niftyResolvers.ts - niftySchema.ts
/graphql

- resolvers.ts (root resolver merge)
- schema.ts (root schema merge)
  index.ts (Apollo Server entry point)
  package.json
  tsconfig.json
  Setup & Installation
  Clone the repository:

text
git clone <repo-url>
cd equarion-backend
Install dependencies:

text
npm install
Make sure you have Node.js version >= 16 (recommended).

Prepare your data files (see Data Requirements).

Configuration
The backend relies on your user directory environment variables:

On Windows: USERPROFILE

On Unix/Mac: HOME

Data files are expected under:

text
<HOME_or_USERPROFILE>/Desktop/NSE-Data/data/
with subfolders:

stock

indice

broad (for Nifty companies)

Data Requirements
Stock Data: CSV files named as sec*bhavdata_full*<date>.csv in the stock folder

Indice Data: CSV files named ind*close_all*<date>.csv in the indice folder

Nifty Company List: Single CSV file nifty50list.csv in the broad folder

The date format in filenames is like 01072025 (for July 1, 2025).

GraphQL Schema
Three main query types are available:

Stock (stockData):

Accepts multiple dates and optional symbols.

Returns stock trading data including open, close prices, volume, etc.

Filters internally only for SERIES === " EQ" (equity shares).

Indice (indiceData):

Accepts multiple dates and optional indexNames.

Returns index price info like open, close, high, low and PE ratios.

Nifty Companies (nifty50List, companiesByIndustry):

List companies in the Nifty 50 index.

Filter companies by industry.

Queries Overview
Stock Query Example:
graphql
query {
stockData(dates: ["01072025","02072025"], symbols: ["RELIANCE", "TCS"]) {
SYMBOL
DATE1
SERIES
CLOSE_PRICE
OPEN_PRICE
VOLUME
}
}
Filters stocks to SERIES = " EQ".

Returns combined data from multiple dates and filtered symbols.

Indice Query Example:
graphql
query {
indiceData(dates: ["01072025"], indexNames: ["NIFTY 50"]) {
IndexName
IndexDate
ClosingIndexValue
PE
PB
}
}
Nifty Companies Example:
graphql
query {
nifty50List {
CompanyName
Symbol
Industry
}

companiesByIndustry(industry: "Technology") {
CompanyName
Symbol
}
}
Custom Filters & Multi-Date Support
Backend combines data from multiple CSV files for requested dates.

Utilizes CSV header trimming logic to avoid mapping mismatches.

Filters stocks by equity series explicitly.

Symbols and index names filtered on-demand for efficient, precise data.

Running the Server
Start the Apollo GraphQL server on port 4000:

text
npm run dev
You will see:

text
🚀 Server ready at http://localhost:4000/
Access it with a GraphQL client or browser.

Code Highlights
CSV Parsing Header Trim Logic:

typescript
const records: StockData[] = parse(csvData, {
columns: (header) => header.map(h => h.trim()), // Trim CSV header spaces
skip_empty_lines: true,
});
Stock Resolver Filtering:

typescript
allStocks = allStocks.filter(row => row.SERIES === " EQ");

if (symbols && symbols.length > 0) {
allStocks = allStocks.filter(row => symbols.includes(row.SYMBOL));
}
Resolvers and Schema merged using @graphql-tools/merge for modularity.

Troubleshooting
Ensure the data files exist in the correct folders with proper names.

Verify your environment variables HOME or USERPROFILE are set.

Null or missing fields usually indicate CSV header mismatch — trimming headers as above fixes this.

Check port 4000 is free or adjust in index.ts.

Contributing
Fork the repository.

Implement features or fixes in isolated branches.

Submit pull requests with clear descriptions.

License
This project uses ISC license.
