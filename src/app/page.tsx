"use client"

import { useEffect, useState } from "react";
import {  LogOut, Mic } from "react-feather";
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

import { AvatarState, removeAvatar, setupAvatar } from "@/app/lib/avatar";
import ThemedButton from "@/app/ui/themed-button";

import "@near-wallet-selector/modal-ui/styles.css"

import hereWalletIconUrl from "@near-wallet-selector/here-wallet/assets/here-wallet-icon.png";
import meteorIconUrl from "@near-wallet-selector/meteor-wallet/assets/meteor-icon.png";
import myNearWalletIconUrl from "@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png";
import nightlyIconUrl from "@near-wallet-selector/nightly/assets/nightly.png";
import senderIconUrl from "@near-wallet-selector/sender/assets/sender-icon.png";
import welldoneIconUrl from "@near-wallet-selector/welldone-wallet/assets/welldone-wallet.png";
import { SignMessageMethod, Wallet } from "@near-wallet-selector/core/src/lib/wallet";
import { Auth, authenticate } from "@/app/lib/auth";

const wallets: Array<{ name: string, iconUrl: StaticImageData, link: string }> = [
    { name: "Meteor Wallet", iconUrl: meteorIconUrl, link: "https://meteorwallet.app/" },
    { name: "HERE Wallet", iconUrl: hereWalletIconUrl, link: "https://nearmobile.app/" },
    { name: "Nightly Wallet", iconUrl: nightlyIconUrl, link: "https://www.herewallet.app/" },
    { name: "WELLDONE Wallet", iconUrl: welldoneIconUrl, link: "https://welldonestudio.io/" },
    { name: "Sender Wallet", iconUrl: senderIconUrl, link: "https://www.sender.org/" },
    { name: "MyNearWallet", iconUrl: myNearWalletIconUrl, link: "https://www.mynearwallet.com/" },
];

export default function ConnectWallet() {
    const [avatarState, setAvatarState] = useState<AvatarState | null>(null);
    const [selector, setSelector] = useState<WalletSelector | null>(null);
    const [wallet, setWallet] = useState<Wallet & SignMessageMethod | null>(null);
    const [signedIn, setSignedIn] = useState<boolean>(false);
    const [auth, setAuth] = useState<Auth | null>(null);

    useEffect(() => {
        async function getSelector() {
            const newSelector = await setupWalletSelector({
                allowMultipleSelectors: false,
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

            newSelector.on("signedIn", (_) => setSignedIn(true));
            newSelector.on("signedOut", (_) => setSignedIn(false));
            setSelector(newSelector);
        }

        if (selector == null) {
            getSelector();
        }
    }, []);

    useEffect(() => {
        async function getWallet() {
            const newWallet = await selector?.wallet()!;
            setWallet(newWallet);
        }

        if (wallet == null && signedIn) {
            getWallet();
        }
    }, [signedIn]);

    useEffect(() => {
        async function getAuth() {
            const newAuth = await authenticate(wallet!);
            setAuth(newAuth);
        }

        if (auth == null && wallet != null) {
            getAuth();
        }
    }, [wallet]);

    {
        let newState = selector?.isSignedIn() || false;
        if (signedIn != newState) setSignedIn(newState);
    }

    if (!signedIn) {
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

        return (
            <div className="grid grid-rows-[20px_20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <header className="row-start-2 flex items-center justify-center">
                    <h1 className="text-4xl">NEAR-chan</h1>
                </header>
                <main className="flex flex-col gap-12 row-start-3 items-center">
                    <ThemedButton
                        onClick={(_) => modal?.show()}
                        theme="primary"
                    >
                        {"Connect Wallet"}
                    </ThemedButton>
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

    if (avatarState == null)
        setAvatarState(setupAvatar(document.getElementById("body") as HTMLBodyElement, "girl"));

    return (
        <div className="grid grid-rows-[10px-10px-1fr-10px] content-between justify-items-center min-h-screen gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)]">
            <ThemedButton
                classes="row-start-1 flex items-center gap-4"
                onClick={async (_) => {
                    await wallet?.signOut();
                    removeAvatar(avatarState as AvatarState);
                    setAvatarState(null);
                    setWallet(null);
                }}
                theme="tertiary"
            >
                <span>Sign Out</span><LogOut />
            </ThemedButton>
            <ThemedButton
                classes="row-start-4 flex justify-center items-center aspect-square w-[70px] rounded-full"
                theme="primary"
            >
                <Mic />
            </ThemedButton>
        </div>
    )
}
