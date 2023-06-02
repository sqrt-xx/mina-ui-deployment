import { Mina, PrivateKey, PublicKey, AccountUpdate, fetchAccount } from "snarkyjs";

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import type { Add } from "../../contracts/src/Add";

const state = {
  Add: null as null | typeof Add,
  zkapp: null as null | Add,
  transaction: null as null | Transaction,
};

// ---------------------------------------------------------------------------------------

const functions = {
  setActiveInstanceToBerkeley: async (args: {}) => {
    const Berkeley = Mina.Network(
      "https://proxy.berkeley.minaexplorer.com/graphql"
    );
    console.log("Created Berkeley");
    Mina.setActiveInstance(Berkeley);
  },
  loadContract: async (args: {}) => {
    const { Add } = await import("../../../contracts/build/src/Add.js");
    state.Add = Add;
  },
  compileContract: async (args: {}) => {
    await state.Add!.compile();
  },
  fetchAccount: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    return await fetchAccount({ publicKey });
  },
  initZkappInstance: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    state.zkapp = new state.Add!(publicKey);
  },
    createDeployContract: async (
        args: { privateKey58: string, feePayerAddress58: string }) => {
    const feePayer: PublicKey = PublicKey.fromBase58(
        args.feePayerAddress58);
    const zkAppPrivateKey: PrivateKey = PrivateKey.fromBase58(args.privateKey58);
    state.zkapp = new state.Add!(zkAppPrivateKey.toPublicKey());
    const transaction = await Mina.transaction(
      feePayer,
      () => {
        AccountUpdate.fundNewAccount(feePayer);
        state.zkapp!.deploy();
    });
    transaction.sign([zkAppPrivateKey]);
    state.transaction = transaction;
  },
  getNum: async (args: {}) => {
    const currentNum = await state.zkapp!.num.get();
    return JSON.stringify(currentNum.toJSON());
  },
  createUpdateTransaction: async (args: {}) => {
    const transaction = await Mina.transaction(() => {
      state.zkapp!.update();
    });
    state.transaction = transaction;
  },
  proveUpdateTransaction: async (args: {}) => {
    await state.transaction!.prove();
  },
    getTransactionJSON: async (args: {}) => {
    console.log(state.transaction!.toPretty());
    return state.transaction!.toJSON();
  },
};

// ---------------------------------------------------------------------------------------

export type WorkerFunctions = keyof typeof functions;

export type ZkappWorkerRequest = {
  id: number;
  fn: WorkerFunctions;
  args: any;
};

export type ZkappWorkerReponse = {
  id: number;
  data: any;
};

addEventListener("message", async (event: MessageEvent<ZkappWorkerRequest>) => {
  const returnData = await functions[event.data.fn](event.data.args);

  const message: ZkappWorkerReponse = {
    id: event.data.id,
    data: returnData,
  };
  postMessage(message);
});

console.log("Worker Initialized Successfully.");
