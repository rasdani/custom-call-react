import React, { useState } from 'react';
import { ethers } from 'ethers';

function App() {
  const [contractAddress, setContractAddress] = useState('');
  const [callData, setCallData] = useState('');
  const [result, setResult] = useState('');

  const handleSendClick = async () => {
    try {
      // Get the provider from Metamask
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      console.log("signer is: ", signer);

      // Create a new contract instance
    //    const contract = new ethers.Contract(contractAddress, [], provider);

      // Send the custom call data to the contract and get the result
    //   const data = callData.startsWith('0x') ? callData : `0x${callData}`;
    //   const result = await contract.callStatic['0x'](data);
      const tx = {
        to: contractAddress,
        // to: "0x",
        data: callData
      };
      console.log("tx is: ", tx);
      // const result = await provider.call(tx);
      const result = await signer.sendTransaction(tx);
      console.log("result is: ", result);

      // Update the result state
      setResult(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <label htmlFor="contract-address">Contract Address:</label>
      <input
        id="contract-address"
        type="text"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <br />
      <label htmlFor="call-data">Call Data:</label>
      <input
        id="call-data"
        type="text"
        value={callData}
        onChange={(e) => setCallData(e.target.value)}
      />
      <br />
      <button onClick={handleSendClick}>Send</button>
      <br />
      <label htmlFor="result">Result:</label>
      <textarea id="result" value={result} readOnly />
    </div>
  );
}

export default App;
