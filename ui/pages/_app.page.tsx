import '../styles/globals.css';
import { useEffect, useState } from 'react';
import './reactCOIServiceWorker';

import ZkappWorkerClient from './zkappWorkerClient';

import { PrivateKey, PublicKey, Field } from 'snarkyjs';

let transactionFee = 0.1;

declare global {
  interface Window {
    mina: any; // turn off type checking
  }
}

export default function App() {
  let [state, setState] = useState({
    zkappWorkerClient: null as null | ZkappWorkerClient,
    hasWallet: null as null | boolean,
    hasBeenSetup: false,
    accountExists: false,
    currentNum: null as null | Field,
    publicKey: null as null | PublicKey,
    zkappPublicKey: null as null | PublicKey,
    creatingTransaction: false,
    contractPK: '',
    candidateContractPK: '',
    deploymentTX: '',
    interactionTX: ''
  });

  // -------------------------------------------------------
  // Do Setup

  useEffect(() => {

        async function timeout(seconds: number): Promise<void> {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve();
                }, seconds * 1000);
            });
        }
        (async () => {
            if (!state.hasBeenSetup) {
              console.log("Initializing worker client.");
              const zkappWorkerClient = new ZkappWorkerClient();

              await timeout(20);

              await zkappWorkerClient.setActiveInstanceToBerkeley();

              const mina = (window as any).mina;

              if (mina == null) {
                setState({ ...state, hasWallet: false });
                return;
              }

              const publicKeyBase58: string = (await mina.requestAccounts())[0];
              const publicKey = PublicKey.fromBase58(publicKeyBase58);

              console.log('using key', publicKey.toBase58());

              console.log('checking if account exists...');
              const res = await zkappWorkerClient.fetchAccount({
                publicKey: publicKey!,
              });
              const accountExists = res.error == null;

              await zkappWorkerClient.loadContract();

              console.log('compiling zkApp');
              await zkappWorkerClient.compileContract();
              console.log('zkApp compiled');

              let zkappPublicKey = null;
              let currentNum = -1;

              setState({
                ...state,
                zkappWorkerClient,
                hasWallet: true,
                hasBeenSetup: true,
                publicKey,
                zkappPublicKey,
                accountExists,
                currentNum,
              });
            }
        })();
  }, []);

  // -------------------------------------------------------
  // Wait for account to exist, if it didn't

  useEffect(() => {
    (async () => {
      if (state.hasBeenSetup && !state.accountExists) {
        for (;;) {
          console.log('checking if account exists...');
          const res = await state.zkappWorkerClient!.fetchAccount({
            publicKey: state.publicKey!,
          });
          const accountExists = res.error == null;
          if (accountExists) {
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
        setState({ ...state, accountExists: true });
      }
    })();
  }, [state.hasBeenSetup]);

  // -------------------------------------------------------
  // Send a transaction

  const onSendTransaction = async () => {
    setState({ ...state, creatingTransaction: true });
    console.log('sending a transaction...');

    await state.zkappWorkerClient!.fetchAccount({
      publicKey: state.publicKey!,
    });

    await state.zkappWorkerClient!.createUpdateTransaction();

    console.log('creating proof...');
    await state.zkappWorkerClient!.proveUpdateTransaction();

    console.log('getting Transaction JSON...');
    const transactionJSON = await state.zkappWorkerClient!.getTransactionJSON();

    console.log('checking AURO connection')
    const network = await window.mina.requestNetwork();
    console.log(network); //  'Mainnet' , 'Devnet' , 'Berkeley' or 'Unknown'
    const accounts = await window.mina.requestAccounts()
    console.log(accounts);

    console.log('requesting send transaction...');
    const { hash } = await (window as any).mina.sendTransaction({
      transaction: transactionJSON,
      feePayer: {
        fee: transactionFee,
        memo: '',
      },
    });

    console.log(
      'See transaction at https://berkeley.minaexplorer.com/transaction/' + hash
    );

    setState({ ...state, interactionTX: hash, creatingTransaction: false });
  };

  // -------------------------------------------------------
  // Refresh the current state

  const onRefreshCurrentNum = async () => {
    console.log('getting zkApp state...');
    await state.zkappWorkerClient!.fetchAccount({
      publicKey: state.zkappPublicKey!,
    });
    const currentNum = await state.zkappWorkerClient!.getNum();
    console.log('current state:', currentNum.toString());

    setState({ ...state, currentNum });
  };

  // -------------------------------------------------------
  // Create UI elements

  let hasWallet;
  if (state.hasWallet != null && !state.hasWallet) {
    const auroLink = 'https://www.aurowallet.com/';
    const auroLinkElem = (
      <a href={auroLink} target="_blank" rel="noreferrer">
        {' '}
        [Link]{' '}
      </a>
    );
    hasWallet = (
      <div>
        {' '}
        Could not find a wallet. Install Auro wallet here: {auroLinkElem}
      </div>
    );
  }

  let setupText = state.hasBeenSetup
    ? 'SnarkyJS Ready'
    : 'Setting up SnarkyJS...';
  let setup = (
    <div>
      {' '}
      {setupText} {hasWallet}
    </div>
  );

  function handleSmartContractChange(event: React.ChangeEvent<HTMLInputElement>) {
    const candidateContractPK = event.currentTarget.value;
    setState({ ...state, candidateContractPK });
  }

  async function updateContractChange(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const contractPK = state.candidateContractPK;
    const zkappPublicKey = PublicKey.fromBase58(
      contractPK
    );

    if (!state.zkappWorkerClient) return;
    await state.zkappWorkerClient.initZkappInstance(zkappPublicKey);

    console.log('getting zkApp state...');

    await state.zkappWorkerClient.fetchAccount(
      { publicKey: zkappPublicKey });
    const currentNum = await state.zkappWorkerClient.getNum();

    console.log('current state:', currentNum.toString());
    setState({ ...state, contractPK, zkappPublicKey, currentNum });
  }

  async function deployNewContract() {
    const mina = (window as any).mina;

    if (mina == null) {
      setState({ ...state, hasWallet: false });
      return;
    }

    setState({ ...state, creatingTransaction: true });
    console.log('sending a deployment transaction...');

    await state.zkappWorkerClient!.fetchAccount({
      publicKey: state.publicKey!,
    });

    const privateKey: PrivateKey = PrivateKey.random();
    console.log('generated new contract private key...');
    console.log(privateKey.toBase58);

    const zkappPublicKey = privateKey.toPublicKey();
    const contractPK = zkappPublicKey.toBase58();
    console.log('its corresponding public key is...');
    console.log(contractPK);

    console.log('creating deployment transaction...');
    if (!state.publicKey) return;
    await state.zkappWorkerClient!.createDeployContract(
      privateKey, state.publicKey);

    console.log('getting Transaction JSON...');
    const transactionJSON = await state.zkappWorkerClient!.getTransactionJSON();

    console.log('checking AURO connection')
    const network = await window.mina.requestNetwork();
    console.log(network); //  'Mainnet' , 'Devnet' , 'Berkeley' or 'Unknown'
    const accounts = await window.mina.requestAccounts()
    console.log(accounts);
    console.log('requesting send transaction...');
    const { hash } = await (window as any).mina.sendTransaction({
      transaction: transactionJSON,
      feePayer: {
        fee: transactionFee,
        memo: '',
      },
    });

    console.log(
      'See transaction at https://berkeley.minaexplorer.com/transaction/' + hash
    );

    setState({ ...state, creatingTransaction: false, deploymentTX: hash, contractPK, zkappPublicKey });
  }

  const smartContractLink =
    'https://berkeley.minaexplorer.com/wallet/' + state.contractPK;
  let setupSmartContract;
  if (state.hasBeenSetup && state.accountExists) {
    setupSmartContract = (
      <div>
        <input
          type="text"
          onChange={handleSmartContractChange}
          value={state.candidateContractPK}></input>
        <button onClick={updateContractChange}>set contract</button>
        <button onClick={deployNewContract}>deploy new</button>
      </div>
    );
    if (state.contractPK != '') {
      setupSmartContract = (
        <div>Your smart contract is <a href={smartContractLink} target="_blank">{state.contractPK}</a></div>
      );
    }
  }

  let deploymentTXInfo;
  if (state.deploymentTX !== '') {
    const smartContractDeploymentLink =
      'https://berkeley.minaexplorer.com/transaction/' + state.deploymentTX;
    deploymentTXInfo = (
      <div>Your smart contract deployment transaction is <a href={smartContractDeploymentLink} target="_blank">{state.deploymentTX}</a></div>
    );
  }

  let interactionTXInfo;
  if (state.interactionTX !== '') {
    const smartContractInteractionLink =
      'https://berkeley.minaexplorer.com/transaction/' + state.interactionTX;
    interactionTXInfo = (
      <div>Your smart contract interaction transaction is <a href={smartContractInteractionLink} target="_blank">{state.interactionTX}</a></div>
    );
  }

  let accountDoesNotExist;
  if (state.hasBeenSetup && !state.accountExists) {
    const faucetLink =
      'https://faucet.minaprotocol.com/?address=' + state.publicKey!.toBase58();
    accountDoesNotExist = (
      <div>
        Account does not exist. Please visit the faucet to fund this account
        <a href={faucetLink} target="_blank" rel="noreferrer">
          {' '}
          [Link]{' '}
        </a>
      </div>
    );
  }

  let mainContent;
  if (state.hasBeenSetup && state.accountExists && state.contractPK) {
    let numContent = 'unknown';
    if (state.currentNum !== -1) {
      numContent = state.currentNum!.toString();
    }
    mainContent = (
      <div>
      <button
      onClick={onSendTransaction}
        disabled={state.creatingTransaction}
        >
          {' '}
          Send Transaction{' '}
      </button>
      <div> Current Number in zkApp: {numContent} </div>
      <button onClick={onRefreshCurrentNum}> Get Latest State </button>
      </div>
    );
  }

  let promoContent = (
    <div>This is a modified version of <a href="https://docs.minaprotocol.com/zkapps/tutorials/zkapp-ui-with-react" target="_blank" rel="noreferrer">Tutorial 4</a> capable of deploying zkApps! The source code and instructions are available in <a href="https://github.com/sqrt-xx/mina-ui-deployment" target="_blank" rel="noreferrer">this GitHub repository</a>. If you like it follow <a href="https://twitter.com/MarekNarozniak" target="_blank" rel="noreferrer">@MarekNarozniak</a> on Twitter and tweet me for tech support in case of trouble!</div>
  );

  return (
    <div>
      {setup}
      {setupSmartContract}
      {deploymentTXInfo}
      {interactionTXInfo}
      {accountDoesNotExist}
      {mainContent}
      {promoContent}
    </div>
  );
}
