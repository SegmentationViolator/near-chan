import { Wallet } from "@near-wallet-selector/core";
import { SignMessageMethod } from "@near-wallet-selector/core/src/lib/wallet";

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
    const nonce = Buffer.from(window.crypto.randomUUID().replaceAll('-', ""));
    const message = "Login to NEAR AI";
    const recipient = wallet.id;

    const signedMessage = await wallet.signMessage({
        message,
        nonce,
        recipient,
    });

    return {
        signature: signedMessage!.signature,
        accountId: signedMessage!.accountId,
        publicKey: signedMessage!.publicKey,
        message,
        nonce,
        recipient,
    };
}
