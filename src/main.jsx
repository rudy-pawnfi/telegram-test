import { Buffer } from 'buffer';
window.Buffer = Buffer;
// if (typeof window !== 'undefined') {
//     window.Buffer = Buffer; // 在浏览器中设置
//     globalThis.Buffer = Buffer; // 在 globalThis 中设置
// }
console.log('Buffer :>> ', Buffer);
console.log('globalThis :>> ', globalThis.Buffer);

// // 确保 Buffer 被设置到全局对象
// if (typeof window !== 'undefined') {
//     window.Buffer = Buffer;
// } else {
//     global.Buffer = Buffer;
// }
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WebApp from '@twa-dev/sdk'
import { BrowserRouter, HashRouter } from "react-router-dom";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import AppRouter from './router'
import './style/public.scss'
import { AlertProvider } from './components/alertProvider'

// WebApp.setBackgroundColor('000');
WebApp.ready();
console.log('WebApp :>> ', WebApp); 
console.log('process.env.NODE_ENV :>> ', import.meta.env.MODE);
createRoot(document.getElementById('root')).render(
    <StrictMode>
            <TonConnectUIProvider
                manifestUrl="https://rudy-pawnfi.github.io/telegram-test/tonconnect-manifest.json"
                uiPreferences={{ 
                    theme: THEME.DARK,
                    standalone: true // 设置为 standalone，避免展示二维码
                }}
                // walletsListConfiguration={{
                //     includeWallets: [
                //         {
                //             appName: "tonwallet",
                //             name: "TON Wallet",
                //             imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
                //             aboutUrl: "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
                //             universalLink: "https://wallet.ton.org/ton-connect",
                //             jsBridgeKey: "tonwallet",
                //             bridgeUrl: "https://bridge.tonapi.io/bridge",
                //             platforms: ["chrome", "android"]
                //         },
                //         {
                //             appName: "nicegramWallet",
                //             name: "Nicegram Wallet",
                //             imageUrl: "https://static.nicegram.app/icon.png",
                //             aboutUrl: "https://nicegram.app",
                //             universalLink: "https://nicegram.app/tc",
                //             deepLink: "nicegram-tc://",
                //             jsBridgeKey: "nicegramWallet",
                //             bridgeUrl: "https://bridge.tonapi.io/bridge",
                //             platforms: ["ios", "android"]
                //         },
                //         {
                //             appName: "binanceWeb3TonWallet",
                //             name: "Binance Web3 Wallet",
                //             imageUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMEIwRTExIi8+CjxwYXRoIGQ9Ik01IDE1TDcuMjU4MDYgMTIuNzQxOUw5LjUxNjEzIDE1TDcuMjU4MDYgMTcuMjU4MUw1IDE1WiIgZmlsbD0iI0YwQjkwQiIvPgo8cGF0aCBkPSJNOC44NzA5NyAxMS4xMjlMMTUgNUwyMS4xMjkgMTEuMTI5TDE4Ljg3MSAxMy4zODcxTDE1IDkuNTE2MTNMMTEuMTI5IDEzLjM4NzFMOC44NzA5NyAxMS4xMjlaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0xMi43NDE5IDE1TDE1IDEyLjc0MTlMMTcuMjU4MSAxNUwxNSAxNy4yNTgxTDEyLjc0MTkgMTVaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0xMS4xMjkgMTYuNjEyOUw4Ljg3MDk3IDE4Ljg3MUwxNSAyNUwyMS4xMjkgMTguODcxTDE4Ljg3MSAxNi42MTI5TDE1IDIwLjQ4MzlMMTEuMTI5IDE2LjYxMjlaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0yMC40ODM5IDE1TDIyLjc0MTkgMTIuNzQxOUwyNSAxNUwyMi43NDE5IDE3LjI1ODFMMjAuNDgzOSAxNVoiIGZpbGw9IiNGMEI5MEIiLz4KPC9zdmc+Cg==",
                //             aboutUrl: "https://www.binance.com/en/web3wallet",
                //             deepLink: "bnc://app.binance.com/cedefi/ton-connect",
                //             bridgeUrl: "https://bridge.tonapi.io/bridge",
                //             jsBridgeKey: "binancew3w",
                //             platforms: ["chrome", "safari", "ios", "android"],
                //             universalLink: "https://app.binance.com/cedefi/ton-connect"
                //         },
                //         {
                //             appName: "fintopio-tg",
                //             name: "Fintopio Telegram",
                //             imageUrl: "https://fintopio.com/tonconnect-icon.png",
                //             aboutUrl: "https://fintopio.com",
                //             universalLink: "https://t.me/fintopio?attach=wallet",
                //             bridgeUrl: "https://wallet-bridge.fintopio.com/bridge",
                //             platforms: ["ios", "android", "macos", "windows", "linux"]
                //         },
                //         {
                //             appName: "GateWallet",
                //             name: "GateWallet",
                //             imageUrl: "https://www.gate.io/images/login/qrcode_center_icon.svg",
                //             aboutUrl: "https://www.gate.io/",
                //             bridgeUrl: "https://dapp.gateio.services/tonbridge_api/bridge/v1",
                //             jsBridgeKey: "gatetonwallet",
                //             platforms: ["ios", "android", "chrome"],
                //             universalLink: "https://gateio.onelink.me/DmA6/web3"
                //         },
                //         {
                //             appName: "tokenpocket",
                //             name: "TokenPocket",
                //             imageUrl: "https://hk.tpstatic.net/logo/tokenpocket.png",
                //             aboutUrl: "https://tokenpocket.pro",
                //             jsBridgeKey: "tokenpocket",
                //             platforms: ["ios", "android"]
                //         },
                //         {
                //             appName: "dewallet",
                //             name: "DeWallet",
                //             imageUrl: "https://raw.githubusercontent.com/delab-team/manifests-images/main/WalletAvatar.png",
                //             aboutUrl: "https://delabwallet.com",
                //             universalLink: "https://t.me/dewallet?attach=wallet",
                //             bridgeUrl: "https://bridge.dewallet.pro/bridge",
                //             platforms: ["ios", "android", "macos", "windows", "linux"]
                //         },
                //         {
                //             appName: "bybitTonWallet",
                //             name: "Bybit Wallet",
                //             imageUrl: "https://s1.bycsi.com/bybit/deadpool/image-ac5bf003d25c4ae0bd21f3725694a850.png",
                //             aboutUrl: "https://www.bybit.com/web3",
                //             universalLink: "https://app.bybit.com/ton-connect",
                //             deepLink: "bybitapp://",
                //             bridgeUrl: "https://api-node.bybit.com/spot/api/web3/bridge/ton/bridge",
                //             jsBridgeKey: "bybitTonWallet",
                //             platforms: ["ios", "android", "chrome"]
                //         },
                //         {
                //             appName: "BitgetWeb3",
                //             name: "BitgetWeb3",
                //             imageUrl: "https://img.bitgetimg.com/image/third/1723701408284.png",
                //             aboutUrl: "https://www.bitget.com",
                //             universalLink: "https://t.me/BitgetOfficialBot?attach=wallet",
                //             bridgeUrl: "https://ton-connect-bridge.bgwapi.io/bridge",
                //             platforms: ["ios", "android", "windows", "macos", "linux"]
                //         }
                //     ]
                // }}
                actionsConfiguration={{
                    twaReturnUrl: 'https://t.me/rudy_pawnfi_bot/polarise/start',
                }}
            >
                <AlertProvider>
                    <HashRouter>
                        <AppRouter />
                    </HashRouter>
                </AlertProvider>
            </TonConnectUIProvider>
        
    </StrictMode>,
)
