import React from 'react';
import './ContractView.css';

interface ContractViewProps {
  address: string;
  abi: any[];
}

const ContractView: React.FC<ContractViewProps> = ({ address, abi }) => {
  const functions = abi.filter(item => item.type === 'function');
  const events = abi.filter(item => item.type === 'event');
  const readFunctions = functions.filter(fn => 
    fn.stateMutability === 'view' || fn.stateMutability === 'pure'
  );
  const writeFunctions = functions.filter(fn => 
    fn.stateMutability === 'nonpayable' || fn.stateMutability === 'payable'
  );

  const formatInputs = (inputs: any[]) => {
    if (!inputs || inputs.length === 0) return '()';
    return `(${inputs.map(input => `${input.type} ${input.name}`).join(', ')})`;
  };

  const formatOutputs = (outputs: any[]) => {
    if (!outputs || outputs.length === 0) return '';
    if (outputs.length === 1) return ` → ${outputs[0].type}`;
    return ` → (${outputs.map(output => output.type).join(', ')})`;
  };

  return (
    <div className="contract-view">
      <div className="contract-header">
        <h2>Contract Analysis</h2>
        <div className="contract-address">
          <span className="label">Address:</span>
          <code>{address}</code>
        </div>
      </div>

      <div className="contract-stats">
        <div className="stat">
          <span className="stat-number">{readFunctions.length}</span>
          <span className="stat-label">Read Functions</span>
        </div>
        <div className="stat">
          <span className="stat-number">{writeFunctions.length}</span>
          <span className="stat-label">Write Functions</span>
        </div>
        <div className="stat">
          <span className="stat-number">{events.length}</span>
          <span className="stat-label">Events</span>
        </div>
      </div>

      {readFunctions.length > 0 && (
        <div className="section">
          <h3>Read Functions</h3>
          <div className="function-list">
            {readFunctions.map((fn, index) => (
              <div key={index} className="function-item read">
                <div className="function-name">{fn.name}</div>
                <div className="function-signature">
                  {formatInputs(fn.inputs)}
                  {formatOutputs(fn.outputs)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {writeFunctions.length > 0 && (
        <div className="section">
          <h3>Write Functions</h3>
          <div className="function-list">
            {writeFunctions.map((fn, index) => (
              <div key={index} className="function-item write">
                <div className="function-name">{fn.name}</div>
                <div className="function-signature">
                  {formatInputs(fn.inputs)}
                  {formatOutputs(fn.outputs)}
                </div>
                {fn.stateMutability === 'payable' && (
                  <span className="payable-badge">payable</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {events.length > 0 && (
        <div className="section">
          <h3>Events</h3>
          <div className="function-list">
            {events.map((event, index) => (
              <div key={index} className="function-item event">
                <div className="function-name">{event.name}</div>
                <div className="function-signature">
                  {formatInputs(event.inputs)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractView;