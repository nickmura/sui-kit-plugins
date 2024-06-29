import dotenv from 'dotenv'


dotenv.config()
import { SuiKit, SuiTxBlock, } from '@scallop-io/sui-kit';
// import plugins, they will dynamically register themselves to SuiKit
import '@scallop-io/sui-kit-plugins';
import * as process from "process";
import { mnemonicToSeedHex, toB64 } from '@mysten/sui.js';

// import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
// import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
// import { TransactionBlock } from '@mysten/sui.js/transactions';

const secret_key =  process.env.SECRET_KEY;
const gas_access_key = process.env.SHINAMI_GAS_ACCESS_KEY;



let suiKit = new SuiKit({mnemonics: secret_key, networkType: 'testnet'});
// init Shinami gas sponsor before using it
suiKit.initShinamiGasSponsor(gas_access_key ?? ``);


/**
 * This is an example of using sponsored transaction plugin in nodejs.
 */

let Package = `0xd7e2d8d40e227b967f1cd6c554a14040ff8af1f43f382fe9678febc4a3847673`
let JSONPackage = {"Package":`${Package}`}
//const MoveEventType = '<PACKAGE_ID>::<MODULE_NAME>::<METHOD_NAME>';
const MoveEventType = `0x2::coin::Coin<0xd7e2d8d40e227b967f1cd6c554a14040ff8af1f43f382fe9678febc4a3847673::simple_token::SIMPLE_TOKEN>`;


async function forNodejs() { 

  // Create a transaction
  const tx = new SuiTxBlock(); //@ts-ignore
  tx.moveCall({
    // object IDs must be wrapped in moveCall arguments
    target: "0xfa0e78030bd16672174c2d6cc4cd5d1d1423d03c28a74909b2a148eda8bcca16::clock::access",
    

  })
  //@ts-ignore
    tx.transferObjects([tx.object('0x6')], `0xe7db53637032a84492a399445392f9c8a1a3863bcd0b66503f5caf4211ec221d`)
    
  const gasBudget = 10 ** 9;
  const res = await suiKit.signAndSendShinamiSponsoredTxn(tx, gasBudget);
  console.log(res)
  // Sponsor the transaction, and send it

} forNodejs()

/**
 * This is an example of using sponsored transaction plugin in browser.
 */
async function forBrowser() {
  // Create a transaction
  const tx = new SuiTxBlock();
  tx.transferObjects(['<obj_id>'], '<sender_address>');

  const gasBudget = 10 ** 9;
  // Sponsor the transaction
  const sender =  '<sender_address>';
  const sponsoredTx = await suiKit.requestShinamiSponsorship(tx, gasBudget, sender);
  // Get the user's signature from wallet
  const txBytes = sponsoredTx.txBytes;
  // Implement your own function to get user's signature from wallet
  const userSignature = await getUserSignatureFromWallet(txBytes);
  // Send the signed sponsored transaction
  const res = await suiKit.sendShinamiSponsoredTxn(sponsoredTx, userSignature);
  return res;
  
}


async function getUserSignatureFromWallet(tx:string) {

    return ''
}


async function invokeTransaction() {

}