import '../styles/globals.css';
import { useEffect, useState } from 'react';
import './reactCOIServiceWorker';

import ZkappWorkerClient from './zkappWorkerClient';

import { PublicKey, Field } from 'snarkyjs';

let transactionFee = 0.1;

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
    candidateContractPK: ''
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

              let zkappPublicKey = undefined;
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

    setState({ ...state, creatingTransaction: false });
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

  function handleSmartContractChange(event){
    const candidateContractPK = event.target.value;;
    setState({ ...state, candidateContractPK });
  }

  async function updateContractChange(event){
    const contractPK = state.candidateContractPK;
    console.log(contractPK)
    const zkappPublicKey = PublicKey.fromBase58(
      contractPK
    );

    await state.zkappWorkerClient.initZkappInstance(zkappPublicKey);

    console.log('getting zkApp state...');

    await state.zkappWorkerClient.fetchAccount(
      { publicKey: zkappPublicKey });
    const currentNum = await state.zkappWorkerClient.getNum();

    console.log('current state:', currentNum.toString());
    setState({ ...state, contractPK, zkappPublicKey, currentNum });
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
      </div>
    );
    if (state.contractPK != '') {
      setupSmartContract = (
        <div>Your smart contract is <a href={smartContractLink} target="_blank">{state.contractPK}</a></div>
      );
    }
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
    if (state.currentNum > -1) {
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

  return (
    <div>
      {setup}
      {setupSmartContract}
      {accountDoesNotExist}
      {mainContent}
    </div>
  );
}
