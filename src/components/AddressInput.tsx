import React, { useState } from 'react';
import './AddressInput.css';

interface AddressInputProps {
  onSubmit: (address: string) => void;
  loading?: boolean;
}

const AddressInput: React.FC<AddressInputProps> = ({ onSubmit, loading = false }) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address.trim()) {
      setError('Please enter a contract address');
      return;
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(address.trim())) {
      setError('Please enter a valid Ethereum address');
      return;
    }

    setError('');
    onSubmit(address.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="address-input">
      <form onSubmit={handleSubmit} className="address-form">
        <div className="input-group">
          <input
            type="text"
            value={address}
            onChange={handleChange}
            placeholder="0x... Enter contract address"
            className={`address-field ${error ? 'error' : ''}`}
            disabled={loading}
          />
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading || !address.trim()}
          >
            {loading ? 'Loading...' : 'Analyze'}
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default AddressInput;