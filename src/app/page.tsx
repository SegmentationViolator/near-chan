"use client"

import { useEffect, useState } from "react";
import Image, { StaticImageData } from 'next/image';

import { WalletModuleFactory, WalletSelector, setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupBitteWallet } from "@near-wallet-selector/bitte-wallet";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupNearMobileWallet } from "@near-wallet-selector/near-mobile-wallet";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupNightly } from "@near-wallet-selector/nightly";
import { setupSender } from "@near-wallet-selector/sender";
import { setupWelldoneWallet } from "@near-wallet-selector/welldone-wallet";

import ThemedButton from "@/app/ui/themed-button";

import "@near-wallet-selector/modal-ui/styles.css"

import hereWalletIconUrl from "@near-wallet-selector/here-wallet/assets/here-wallet-icon.png";
import meteorIconUrl from "@near-wallet-selector/meteor-wallet/assets/meteor-icon.png";
import myNearWalletIconUrl from "@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png";
import nightlyIconUrl from "@near-wallet-selector/nightly/assets/nightly.png";
import senderIconUrl from "@near-wallet-selector/sender/assets/sender-icon.png";
import welldoneIconUrl from "@near-wallet-selector/welldone-wallet/assets/welldone-wallet.png";

const wallets: Array<{ name: string, iconUrl: StaticImageData, link: string }> = [
    { name: "Meteor Wallet", iconUrl: meteorIconUrl, link: "https://meteorwallet.app/" },
    { name: "HERE Wallet", iconUrl: hereWalletIconUrl, link: "https://nearmobile.app/" },
    { name: "Nightly Wallet", iconUrl: nightlyIconUrl, link: "https://www.herewallet.app/" },
    { name: "WELLDONE Wallet", iconUrl: welldoneIconUrl, link: "https://welldonestudio.io/" },
    { name: "Sender Wallet", iconUrl: senderIconUrl, link: "https://www.sender.org/" },
    { name: "MyNearWallet", iconUrl: myNearWalletIconUrl, link: "https://www.mynearwallet.com/" },
];

export default function ConnectWallet() {
    const [selector, setSelector] = useState<WalletSelector | null>(null);

    useEffect(() => {
        async function getSelector() {
            const selector = await setupWalletSelector({
                network: "testnet",
                modules: [
                    setupMeteorWallet() as WalletModuleFactory,
                    setupNearMobileWallet() as WalletModuleFactory,
                    setupHereWallet() as WalletModuleFactory,
                    setupBitteWallet() as WalletModuleFactory,
                    setupNightly() as WalletModuleFactory,
                    setupWelldoneWallet() as WalletModuleFactory,
                    setupSender() as WalletModuleFactory,
                    setupMyNearWallet() as WalletModuleFactory,
                ],
            });
            setSelector(selector);
        }

        if (selector == null) {
            getSelector()
        }
    })

    const modal = selector != null ? setupModal(selector, {
        contractId: "test.testnet",
    }) : null;

    let walletIcons = wallets.map(wallet => {
        return (
            <li key={wallet.name}>
                <a href={wallet.link}>
                    <div className="bg-neutral-100 size-[30px] rounded-md hover:scale-110 flex justify-center items-center">
                        <Image
                            src={wallet.iconUrl}
                            width={20}
                            height={20}
                            alt={wallet.name}
                        />
                    </div>
                </a>
            </li>
        )
    });
    walletIcons.push(<li key={"etc"}><p className="text-xs text-stone-500">and more...</p></li>)

    if (!selector?.isSignedIn) {
        return (
            <div className="grid grid-rows-[20px_20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <header className="row-start-2 flex items-center justify-center">
                    <h1 className="text-4xl">NEAR-chan</h1>
                </header>
                <main className="flex flex-col gap-12 row-start-3 items-center">
                    <ThemedButton
                        text="Connect Wallet"
                        theme="primary"
                        handler={(_) => modal?.show()}
                    />
                    <div>
                        <h3>Supported Wallets</h3>
                        <ul className="flex flex-wrap gap-4 ml-4 items-center">{walletIcons}</ul>
                    </div>
                </main>
                <footer className="row-start-4 flex items-center justify-center">
                    <p className="text-sm">Built with &#x1F49C; and <a href="https://near.org" rel="noreferrer noopener" target="_blank">NEAR</a></p>
                </footer>
            </div>
        );
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-12 row-start-2 items-center">
                <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center">
                </div>
            </main>
            <footer className="row-start-3 flex items-center justify-center">
                <p className="text-sm">Built with &#x1F49C; and <a href="https://near.org" rel="noreferrer noopener" target="_blank">NEAR</a></p>
            </footer>
        </div>
    )
}
