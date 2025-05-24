import React, { useState } from 'react';
import './App.css';
import AddressInput from './components/AddressInput';
import ContractView from './components/ContractView';
import { EthereumService } from './utils/ethereum';

function App() {
  const [loading, setLoading] = useState(false);
  const [contractData, setContractData] = useState<any>(null);
  const ethereumService = new EthereumService();

  const handleAddressSubmit = async (address: string) => {
    setLoading(true);
    try {
      console.log('Analyzing contract:', address);
      const abi = await ethereumService.getContractABI(address);
      setContractData({ address, abi });
    } catch (error) {
      console.error('Error analyzing contract:', error);
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
          {contractData && contractData.abi.length > 0 && (
            <ContractView address={contractData.address} abi={contractData.abi} />
          )}
          {contractData && contractData.abi.length === 0 && (
            <div className="error-message">
              <h3>No ABI found</h3>
              <p>Could not retrieve ABI for this contract address.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;