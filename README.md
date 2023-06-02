# MINA zkApp Deployments using the UI!

## Introduction

A short background to this project! As a participant of the [zkIgnite Cohort 0]() I implemented a zero-knowledge application called [MAC!]() which stands for "MINA Arbitrated Contracts" which allows one to generate simple (but useful!) zkApps without the need to know any programming!

Unfortunately, the end product came with a flaw. At that moment it was not yet possible to deploy smart contracts using the UI. Because of this, MAC! needed a "private key" mode which was highly insecure. Another zkApp - [Vale](https://wallet.rpanic.com) by [rpanic](https://rpanic.com) which won the zkIgnite Cohort 0 has also been affected by this problem.

In the meantime, signing capabilities of AURO wallet improved and I myself have [fixed a SnarkyJS bug](https://github.com/o1-labs/snarkyjs/pull/931) which was also preventing the deployment. This repository is an enahanced version of the [Tutorial 4](https://docs.minaprotocol.com/zkapps/tutorials/zkapp-ui-with-react) and it serves as a demo of SnarkyJS deployment capabilities with AURO wallet.

Try it! Test it! Let me know if you like it on my [Twitter](https://twitter.com/MarekNarozniak) and visit [my website](https://mareknarozniak.com) to check some more tutorials!

## Getting started

Once you open the zkApp page you will see the SnarkyJS setup screen. Be patient, it will take a while, the zero-knowledge circuit is being compiled, wallet is connecting to the network etc...

![Setting up SnarkyJS](https://github.com/sqrt-xx/mina-ui-deployment/blob/main/screenshots/0.png?raw=true)

if all went smoothly you should see the following screen.

![SnarkyJS is setup](https://github.com/sqrt-xx/mina-ui-deployment/blob/main/screenshots/1.png?raw=true)

What happens next depends on if you want to interact with already deployed smart contract or deploy a new one.

## Interacting with already deployed smart contract

Assuming you have your SnarkyJS already setup and see the following screen

![SnarkyJS is setup](https://github.com/sqrt-xx/mina-ui-deployment/blob/main/screenshots/1.png?raw=true)

please introduce your smart contract base58-encoded public key (for example `5JtiB8UDwAdM6E5QAb4DkF4AfZcQRv2u6rS8fpzz63V8FrdxVopT`)

![Introducing deployed smart contract](https://github.com/sqrt-xx/mina-ui-deployment/blob/main/screenshots/2.png?raw=true)

and then click on `set contract`. You should then see a simple smart contract interaction UI

![set contract](https://github.com/sqrt-xx/mina-ui-deployment/blob/main/screenshots/3.png?raw=true)

which allows you to increment the counter of the zkApp state or fetch the most recent state. If you click on `Send Transaction` you will initiate incrementing of the zkApp state counter. Be patient! SnarkyJS is computing a zero-knowledge proof! Once it succeeds you will get a URL to block explorer transaction

![Interaction transaction](https://github.com/sqrt-xx/mina-ui-deployment/blob/main/screenshots/4.png?raw=true)

At any moment you may request the most recent counter value. Keep in mind transaction does not take effect immediately, you will need to wait for it to get appended to the next block!

![Fetching a zkApp state](https://github.com/sqrt-xx/mina-ui-deployment/blob/main/screenshots/5.png?raw=true)

## Deploying your own smart contract

This zkApp also allows you to deploy your own smart contracts without using command line, entirely via the UI! Starting from the initial screen

![SnarkyJS is setup](https://github.com/sqrt-xx/mina-ui-deployment/blob/main/screenshots/1.png?raw=true)

simply click on `deploy new` and you should see

![Deploying a new smart contract](https://github.com/sqrt-xx/mina-ui-deployment/blob/main/screenshots/6.png?raw=true)

Check the provided links to your newly created smart contract and deployment transaction. Once appended to the block you will be able to interact with the smart contract in the usual way!
