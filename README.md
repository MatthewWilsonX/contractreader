# Contract Reader

A web application for analyzing Ethereum smart contracts. Simply paste a contract address to explore its ABI, functions, and events.

## Features

- **Contract Analysis**: Enter any Ethereum contract address to retrieve and analyze its ABI
- **Function Categorization**: Automatically separates read-only functions, write functions, and events
- **Clean Interface**: Responsive design that works on desktop and mobile devices
- **TypeScript**: Fully typed codebase for better development experience

## Tech Stack

- React 18 with TypeScript
- Ethers.js for blockchain interaction
- CSS3 with responsive design
- Etherscan API for contract ABI retrieval

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd contract-reader
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. Enter a valid Ethereum contract address (0x...)
2. Click "Analyze" to fetch the contract's ABI
3. Browse through the categorized functions and events
4. View function signatures and parameters

## Example Contracts to Try

- **Uniswap V3 Factory**: `0x1F98431c8aD98523631AE4a59f267346ea31F984`
- **USDC Token**: `0xA0b86a33E6441F6C78C06C4C60A2EBc9DF92b5d2`
- **ENS Registry**: `0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e`

## Development

The application is built with Create React App and follows standard React patterns:

- `src/components/` - React components
- `src/utils/` - Utility functions and services
- `src/App.tsx` - Main application component

## Contributing

Feel free to open issues or submit pull requests if you find bugs or want to add features.

## License

MIT