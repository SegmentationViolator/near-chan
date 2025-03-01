import { Wallet } from "@near-wallet-selector/core";
import { SignMessageMethod } from "@near-wallet-selector/core/src/lib/wallet";

export const LOGIN_MESSAGE = "Login to NEAR AI";

export type Auth = {
    signature: string,
    accountId: string,
    publicKey: string,
    message: string,
    nonce: Buffer,
    recipient: string,
    callbackUrl?: string,
}

export async function authenticate(wallet: Wallet & SignMessageMethod): Promise<Auth> {
    const accounts = await wallet.getAccounts();

    const nonce = Buffer.from(window.crypto.randomUUID().replaceAll('-', ""));
    const message = LOGIN_MESSAGE;
    const recipient = accounts[0].accountId;
    const callbackUrl = "http://" + document.location.host + document.location.pathname + `?nonce=${nonce}`;

    const signedMessage = await wallet.signMessage({
        message,
        nonce,
        recipient,
        callbackUrl,
    });

    return {
        signature: signedMessage!.signature,
        accountId: signedMessage!.accountId,
        publicKey: signedMessage!.publicKey,
        message,
        nonce,
        recipient,
        callbackUrl
    };
}
