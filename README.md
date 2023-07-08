# Smart Contract Frontend

This project demonstrates how Solidity smart contracts are connected to a front-end using Next.js.

## Description

The program is a React application that interacts with the LacedContract smart contract on the Ethereum blockchain. It allows users to connect their MetaMask wallets, view their account details and balance, and perform actions such as minting and burning tokens. The program initializes the necessary states and handles the connection to the MetaMask wallet, retrieval of the contract instance, and balance updates. The user interface displays the account information, balance, and buttons to perform token minting and burning actions.

## Getting Started

### Installation
(*You need to have VSCode installed on your device*)

1. Clone or download the ZIP file of the project.
2. Extract the main project folder to any location of your local device.
3. Right-click the folder and click "Open code with VSCode".
4. Install the necessary dependencies by executing the command "npm i" in the terminal.
5. Open two additional terminals within your Visual Studio Code editor, and run the command "npx hardhat node" in the second terminal to start a local Ethereum node.
6. In the third terminal, execute the command "npx hardhat run --network localhost scripts/deploy.js" to deploy the smart contract to the local network.
7. Return to the first terminal and launch the front-end by typing "npm run dev" in the terminal.

### Executing the Program
(*You need to have Metamask installed on your browser*)

1. Navigate through your browser's extensions and open Metamask.
2. Import an account using the private key provided when you execute "npx hardhat node".
3. Set up the Hardhat network in your Metamask using the following steps provided on this website (https://support.chainstack.com/hc/en-us/articles/4408642503449-Using-MetaMask-with-a-Hardhat-node).
4. Return to the program's front-end and connect the imported wallet.


## Authors

- Ralf Anastacio
- Metacrafters (ETH + AVAX PROOF: Intermediate EVM Course)

