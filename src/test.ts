import { SuiKit, SuiTxBlock } from '@scallop-io/sui-kit';
// import plugins, they will dynamically register themselves to SuiKit
import '@scallop-io/sui-kit-plugins';
import * as process from "process";

let suiKit = new SuiKit({secretKey: String(process.env.SHINAMI_SECRET_KEY)});
// init Shinami gas sponsor before using it
suiKit.initShinamiGasSponsor(String(process.env.SHINAMI_GAS_ACCESS_KEY));

/**
 * This is an example of using sponsored transaction plugin in nodejs.
 */
async function forNodejs() {
  // Create a transaction
  const tx = new SuiTxBlock();
  tx.transferObjects(['<obj_id>'], '<sender_address>');

  const gasBudget = 10 ** 9;
  // Sponsor the transaction, and send it
  const res = await suiKit.signAndSendShinamiSponsoredTxn(tx, gasBudget);
  return res;
}

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