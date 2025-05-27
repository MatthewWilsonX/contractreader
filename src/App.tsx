import React, { useState } from 'react';
import './App.css';
import AddressInput from './components/AddressInput';
import ContractView from './components/ContractView';
import { EthereumService } from './utils/ethereum';

function App() {
  const [loading, setLoading] = useState(false);
  const [contractData, setContractData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const ethereumService = new EthereumService();

  const handleAddressSubmit = async (address: string) => {
    setLoading(true);
    setError('');
    setContractData(null);
    
    try {
      console.log('Analyzing contract:', address);
      const abi = await ethereumService.getContractABI(address);
      setContractData({ address, abi });
    } catch (error) {
      console.error('Error analyzing contract:', error);
      setError('Failed to fetch contract data. Please check the address and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Contract Reader</h1>
        <p>Analyze Ethereum Smart Contracts</p>
      </header>
      <main className="App-main">
        <div className="container">
          <AddressInput onSubmit={handleAddressSubmit} loading={loading} />
          
          {loading && (
            <div className="loading-message">
              <div className="spinner"></div>
              <p>Fetching contract data...</p>
            </div>
          )}
          
          {error && (
            <div className="error-message">
              <h3>Error</h3>
              <p>{error}</p>
            </div>
          )}
          
          {contractData && contractData.abi.length > 0 && (
            <ContractView address={contractData.address} abi={contractData.abi} />
          )}
          
          {contractData && contractData.abi.length === 0 && (
            <div className="error-message">
              <h3>No ABI found</h3>
              <p>Could not retrieve ABI for this contract address. The contract may not be verified.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;