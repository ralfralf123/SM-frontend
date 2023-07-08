import {useState, useEffect} from "react";
import {ethers} from "ethers";
import LacedContract from "../artifacts/contracts/LacedContract.sol/LacedContract.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [lcd, setLCD] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const lacedABI = LacedContract.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getLCDContract();
  };

  const getLCDContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const lcdContract = new ethers.Contract(contractAddress, lacedABI, signer);
 
    setLCD(lcdContract);
  }

  const getBalance = async() => {
    if (lcd) {
      setBalance((await lcd.getBalance()).toNumber());
    }
  }

  const mintToken = async () => {
    if (lcd) {
      let tx = await lcd.mintToken(1);
      await tx.wait();
      getBalance();
    }
  };

  const burnToken = async () => {
    if (lcd) {
      let tx = await lcd.burnToken(1);
      await tx.wait();
      getBalance();
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to mint $LCD.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p><strong>Your Account:</strong> {account}</p>
        <p><strong>Your $LCD tokens:</strong>  {balance}</p>
        <button style={{ backgroundColor: "lightgreen" }} onClick={mintToken}>Mint 1 $LCD</button><br /><br />
        <button style={{ backgroundColor: "red" }} onClick={burnToken}>Burn 1 $LCD</button>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <div className="container">
    <header><h1>LacedNFT!</h1></header>
    {initUser()}
  </div>
  <style jsx>{`
    .container {
      text-align: center;
      border: 1px grey solid;
      width: 30%;
      padding: 10px;
      margin-bottom: 20vh;
    }
  `}
  </style>
</main>
  )
}