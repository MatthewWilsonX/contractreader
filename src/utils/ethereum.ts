import { ethers } from 'ethers';

export interface ContractInfo {
  address: string;
  abi: any[];
  name?: string;
}

export class EthereumService {
  private provider: ethers.JsonRpcProvider | null = null;

  constructor() {
    this.initProvider();
  }

  private initProvider() {
    try {
      this.provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
    } catch (error) {
      console.error('Failed to initialize provider:', error);
    }
  }

  async getContractABI(address: string): Promise<any[]> {
    try {
      const response = await fetch(
        `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=YourApiKeyToken`
      );
      const data = await response.json();
      
      if (data.status === '1') {
        return JSON.parse(data.result);
      }
      throw new Error('ABI not found');
    } catch (error) {
      console.error('Error fetching ABI:', error);
      return [];
    }
  }

  isValidAddress(address: string): boolean {
    return ethers.isAddress(address);
  }

  async getContract(address: string, abi: any[]): Promise<ethers.Contract | null> {
    if (!this.provider) return null;
    
    try {
      return new ethers.Contract(address, abi, this.provider);
    } catch (error) {
      console.error('Error creating contract instance:', error);
      return null;
    }
  }
}