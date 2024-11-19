import { TonConnectUIProvider, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
// import { beginCell, toNano } from '@ton/ton'
import { Buffer } from 'buffer';
import TonWeb from 'tonweb'
// 设置全局 Buffer 对象
import { begiTonClient, Cell, utils, TonClient, TonClient4, WalletContractV4, Wallet, toNano, loadMessage, Address, storeMessage, beginCell } from '@ton/ton'
import { mnemonicNew, mnemonicToPrivateKey, mnemonicToWalletKey } from "@ton/crypto"
import ApiContact from "../../service/contract/handleServe";
import { ApiServe } from "../../service";
const TestPage = () => {
    const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', { apiKey: '2bc257be7d0e5a24055035156b56f7a6866bcc27cbd50ec08b72d19e5fb02fb3' }));
    const nacl = TonWeb.utils.nacl;


    const [tonConnectUi] = useTonConnectUI();

    // const wallet = useTonWallet();
    // console.log('wallet :>> ', wallet);
    console.log('tonweb :>> ', tonweb);
    const waitForTransaction = async (
        options,
        client
    ) => {
        const { hash, refetchInterval = 1000, refetchLimit, address } = options;

        return new Promise((resolve) => {
            let refetches = 0;
            const walletAddress = Address.parse(address);
            const interval = setInterval(async () => {
                refetches += 1;

                console.log("waiting transaction...");
                const state = await client.getContractState(walletAddress);
                if (!state || !state.lastTransaction) {
                    clearInterval(interval);
                    resolve(null);
                    return;
                }
                const lastLt = state.lastTransaction.lt;
                const lastHash = state.lastTransaction.hash;
                const lastTx = await client.getTransaction(
                    walletAddress,
                    lastLt,
                    lastHash
                );

                if (lastTx && lastTx.inMessage) {
                    const msgCell = beginCell()
                        .store(storeMessage(lastTx.inMessage))
                        .endCell();

                    const inMsgHash = msgCell.hash().toString("base64");
                    console.log("InMsgHash", inMsgHash);
                    if (inMsgHash === hash) {
                        clearInterval(interval);
                        resolve(lastTx);
                    }
                }
                if (refetchLimit && refetches >= refetchLimit) {
                    clearInterval(interval);
                    resolve(null);
                }
            }, refetchInterval);
        });
    };
    const send = async () => {
        const result = await ApiServe.query('staketokens', {
            "tg_account": "5354957141",
            "wallet_account": "0QAS2LYYZVTqLxoZfkuas5Qerjtr6T4QxnoXLRwyQWEqr5mU",
            "stake_ts": 1730814178,
            "stake_tokens": 1,
            "tx_hash": "95417adb14967da428ec34ccf079324f9e76dea51eaed6388e1f6ba4bbae1c36",
            "stake_dstaddr": "0QBLM5tohk1hY7EQ7ijaOKVDFH68dpMH76NTllGVKb0MBG54",
            "network": "Testnet",
            "tx_lt": 27690362000001
        })
        // const bocData = "te6cckEBBAEAtwAB5YgAJbFsMMqp1F40MvyXNWcoPVx219J8IYz0Llo4ZILCVV4Dm0s7c////+s5QfxwAAAAjbPA1pDp4EcyGDaE3cDs7VqY1m45XDhg+CoF0mAipEIFWuxkI7IGPhaI924Xg2orclTab4OzNOFA8aLPzbwhJBUBAgoOw8htAwMCAGhCACWZzbRDJrCx2Ih3FG0cUqGKP147SYP30anLKMqU3oYCIdzWUAAAAAAAAAAAAAAAAAAAAADd8sWy";

        // const client = new TonClient({
        //     endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
        // });
        //  const trade = await tonConnectUi.sendTransaction({
        //     validUntil: Math.floor(Date.now() / 1000) + 1200,
        //     messages: [
        //         {
        //             address: '0QBLM5tohk1hY7EQ7ijaOKVDFH68dpMH76NTllGVKb0MBG54',
        //             // address: "0:abffb20ca89eb26709ce50ed8eafaf151948603b85d942638ac15966fc380682", // destination address
        //             amount: (1 * 1e9).toString(), //Toncoin in nanotons
        //             // stateInit: wallet.account.walletStateInit,
        //         }
        //     ]
        // })
        // console.log('trade :>> ', trade);
        // const hash = Cell.fromBase64(trade.boc)
        //     .hash()
        //     .toString("base64");

        // const message = loadMessage(
        //     Cell.fromBase64(trade.boc).asSlice()
        // );
        // console.log('hash :>> ', hash);
        // console.log("Message:", message.body.hash().toString("hex"));

        // const txFinalized = await waitForTransaction(
        //     {
        //         address: tonConnectUi.account?.address ?? "",
        //         hash: hash,
        //     },
        //     client
        // );
        // console.log('txFinalized :>> ', txFinalized.lt);
        // const state = await client.getContractState('0QAS2LYYZVTqLxoZfkuas5Qerjtr6T4QxnoXLRwyQWEqr5mU')
        // console.log('state :>> ', state);
        // const lastLt = state.lastTransaction.lt;
        // const lastHash = state.lastTransaction.hash;
        // const lastTx = await client.getTransaction(
        //     '0QAS2LYYZVTqLxoZfkuas5Qerjtr6T4QxnoXLRwyQWEqr5mU',
        //     lastLt,
        //     lastHash
        // );
        // console.log('lastTx :>> ', lastTx);
        //         console.log('obbocDataject :>> ',Buffer.from(bocData, 'base64'));
        // // 解析 BOC
        // const bocBuffer = TonWeb.utils.base64ToBytes(bocData);
        // console.log('bocBuffer :>> ', bocBuffer);
        // const cell = TonWeb.boc.Cell.fromBoc(bocBuffer)[0];
        // console.log('bocparsed :>> ', cell.getTransaction());
        // 提取交易信息

        //   const cell = Cell.fromBoc(Buffer.from(bocData, "base64"))[0]
        //   console.log('tonweb.boc.decode :>> ', tonweb.boc.decode);
        // console.log('cell :>> ', cell);
        // const slice = cell.beginParse();
        // console.log('slice :>> ', slice);
        // console.log('slice.readBigNumber :>> ', slice.readBigNumber);
        // console.log('asBuilder :>> ', Buffer.from(cell.bits._data));
        // console.log('cell.depth :>> ', cell.depth());
        // console.log('equals. :>> ', cell.hash().toString('hex'));

        // // console.log('TonWeb.Boc.fromBoc(bocBuffer) :>> ', Cell.fromBoc(Buffer.from(cell.bits._data, "base64")));
        // console.log('Buffer.from :>> ', Buffer.from('01e5880025b16c30caa9d45e3432fc973567283d5c76d7d27c218cf42e5a386482c2555e039b4b3b73ffffffeb3941fc700000008db3c0d690e9e04732183684ddc0eced5a98d66e395c3860f82a05d26022a442055aec6423b2063e1688f76e17836a2b7254da6f83b334e140f1a2cfcdbc21241501020a0ec3c86d030302006842002599cdb44326b0b1d88877146d1c52a18a3f5e3b4983f7d1a9cb28ca94de860221dcd65000000000000000000000000000000000', 'hex'));
        // 解析 Cell 数据
        // const hash = parsed.readBuffer(32)
        // console.log('const refs = parser.readRefs() :>> ', hash);
        // parseCell(cell1)
        // const hash = parsed.readBytes(32);  // 读取交易的 hash（通常是 32 字节的二进制数据）
        // const lt = parsed.readInt();       // 读取交易的 lt（通常是 64 位的整数）

        // console.log("Hash:", TonWeb.utils.bytesToBase64(hash));  // 将 hash 转换为 Base64 格式输出
        // console.log("LT:", lt); 
        // const transaction =  parsed.readObject()

        // // 提取 hash 和 lt
        // const hash = transaction.hash;  // 获取交易的 hash
        // const lt = transaction.lt;      // 获取交易的 lt

        // console.log("Hash:", hash);
        // console.log("LT:", lt);
        // const transaction = bocParsed.beginParse().readObject();
        // console.log('transaction :>> ', transaction);
        // // 获取 hash 和 lt
        // const hash = transaction.hash;  // 获取交易的 hash
        // const lt = transaction.lt;      // 获取交易的 lt

        // console.log("Hash:", hash);
        // console.log("LT:", lt);
        // console.log('tonweb :>> ', new tonweb.Address(wallet.account.address));

        //         const keyPair = nacl.sign.keyPair();
        //         console.log('keyPair :>> ', keyPair);

        //         const wallet = tonweb.wallet.create({address: '0QAS2LYYZVTqLxoZfkuas5Qerjtr6T4QxnoXLRwyQWEqr5mU'});
        //         console.log('wallet :>> ', wallet);

        //         const address = await wallet.getAddress();
        //         console.log('address :>> ', address);

        //         const seqno = await wallet.methods.seqno().call();
        //         console.log('seqno :>> ', seqno);


        //         const transfer = wallet.methods.transfer({
        //             secretKey: keyPair.secretKey,
        //             toAddress: '0QBLM5tohk1hY7EQ7ijaOKVDFH68dpMH76NTllGVKb0MBG54',
        //             amount: TonWeb.utils.toNano('0.01'), // 0.01 TON
        //             seqno: seqno,
        //             payload: 'Hello',
        //             sendMode: 3,
        //         });
        //         console.log('transfer :>> ', transfer);
        //         const transferFee = await transfer.estimateFee();   // get estimate fee of transfer
        //         console.log('transferFee :>> ', transferFee);
        // const transferSended = await transfer.send();  // send transfer query to blockchain
        //         console.log('transferSended :>> ', transferSended);
        // const transferQuery = await transfer.getQuery(); // get transfer query Cell
        // console.log('transferQuery :>> ', transferQuery);
        //     const client = new TonClient({
        //         endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
        //     });
        //     const transaction = {
        //         from: wallet.account.address,
        //         to: '0QBLM5tohk1hY7EQ7ijaOKVDFH68dpMH76NTllGVKb0MBG54',
        //         value: toNano(0.1), // 转换为 nano
        //     };
        //     console.log('client :>> ', client);
        // console.log('client.open :>> ', WalletContractV4);
        //     try {
        //         const result = await client.sendTransaction(transaction);
        //         console.log('Transaction sent:', result);
        //     } catch (error) {
        //         console.error('Transaction failed:', error);
        //     }
        // console.log('Wallet :>> ', Wallet);
        // const wallet = new Wallet(client);
        // console.log('wallet :>> ', wallet);
        //         console.log('tonweb :>> ', tonweb);
        //         const wallet1 = tonweb.wallet.create({publicKey: wallet.account.publicKey});
        // console.log('wallet1 :>> ', wallet1);
        //         const address = await wallet1.getAddress();
        //         console.log('address :>> ', address);

        // const client = new TonClient({
        //     endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
        //   });

        //   // Generate new key
        //   let mnemonics = await mnemonicNew();
        //   let keyPair = await mnemonicToPrivateKey(mnemonics);
        // //   const keyPair = await mnemonicToWalletKey()

        //   console.log('keyPair :>> ', keyPair);
        //   // Create wallet contract
        //   let workchain = -3; // Usually you need a workchain 0
        //   let wallet1 = WalletContractV4.create({ workchain, publicKey: wallet.account.publicKey });
        //   let contract = client.open(wallet1);

        //   // Get balance
        //   let balance = await contract.getBalance();
        //   console.log('balance :>> ', balance);
        //   // Create a transfer
        //   let seqno = await contract.getSeqno();
        //   let transfer = await contract.createTransfer({
        //     seqno,
        //     secretKey: keyPair.secretKey,
        //     messages: [{
        //       value: '1.5',
        //       to: '0QBLM5tohk1hY7EQ7ijaOKVDFH68dpMH76NTllGVKb0MBG54',
        //       body: 'Hello world',
        //     }]
        //   });


        // const res = await ApiContact.query('getTransaction',{
        //     address: '0QAS2LYYZVTqLxoZfkuas5Qerjtr6T4QxnoXLRwyQWEqr5mU',
        //     limit: 1,
        //     to_lt: 0,
        //     archival: false
        // },'get')getTransaction
        // console.log('res :>> ', res);
        //         const bocData = "te6cckEBBAEAtwAB5YgAJbFsMMqp1F40MvyXNWcoPVx219J8IYz0Llo4ZILCVV4Dm0s7c////+s5QfxwAAAAjbPA1pDp4EcyGDaE3cDs7VqY1m45XDhg+CoF0mAipEIFWuxkI7IGPhaI924Xg2orclTab4OzNOFA8aLPzbwhJBUBAgoOw8htAwMCAGhCACWZzbRDJrCx2Ih3FG0cUqGKP147SYP30anLKMqU3oYCIdzWUAAAAAAAAAAAAAAAAAAAAADd8sWy";
        // console.log('bocData :>> ', Buffer.from(bocData).toString('base64'));
        //         const cell = Cell.fromBoc(Buffer.from(bocData, 'base64'))[0]; // BOC 可能会返回多个 Cell，这里取第一个
        //         console.log('cell :>> ', cell);
        //         const cellHash = cell.hash();
        //         const hash = cellHash.toString('hex');
        //         console.log('hash :>> ', hash);

        //         const res = Cell.fromBase64(Buffer.from(bocData, 'base64'))
        //         console.log('res :>> ', res.beginParse());

        //         const fromHex = Cell.fromHex(Buffer.from(bocData, 'base64'))
        //         console.log('fromHex :>> ', fromHex);





        // const trade = await tonConnectUi.sendTransaction({
        //     validUntil: Math.floor(Date.now() / 1000) + 1200,
        //     messages: [
        //         {
        //             address: '0QBLM5tohk1hY7EQ7ijaOKVDFH68dpMH76NTllGVKb0MBG54',
        //             // address: "0:abffb20ca89eb26709ce50ed8eafaf151948603b85d942638ac15966fc380682", // destination address
        //             amount: (1 * 1e9).toString(), //Toncoin in nanotons
        //             // stateInit: wallet.account.walletStateInit,
        //         }
        //     ]
        // })

        // console.log('trade :>> ', trade);

        // const getTransaction = await client.getTransactions(
        //     '0QAS2LYYZVTqLxoZfkuas5Qerjtr6T4QxnoXLRwyQWEqr5mU',{
        //         limit: 1
        //     }
        //     //  '27654176000001' ,
        //     //  '4b1eb71bb918821a60f65a15227fde4c7924400ceac21ca91a7a35356ffe6e0a'
        //      )
        // console.log('getTransaction :>> ', getTransaction);









        // 解码 BOC 数据
        // const decodedData = await client.boc.decode(bocData);

        // const cell1 =  new tonweb.boc.Cell
        // console.log('cell1 :>> ', cell1);
        // const res = cell1.fromBoc(Buffer.from(bocData, 'base64'))
        // console.log(tonweb, res);
        // const addressInfo = await ApiContact.query('getTransaction',{
        //     address: '0QAS2LYYZVTqLxoZfkuas5Qerjtr6T4QxnoXLRwyQWEqr5mU',
        //     limit: 1,
        //     to_lt: 0,
        //     archival: false,
        //     hash: '3a0ce5e3932fb0c70dcebd4736486513223bdba8227cc8623d4de9feaa4d6452'
        // },'get')
        // console.log('addressInfo :>> ', addressInfo);
        // console.log('tonweb :>> ', tonweb);
        //          const getTransactions =   await tonweb.getTransactions("0QAS2LYYZVTqLxoZfkuas5Qerjtr6T4QxnoXLRwyQWEqr5mU")
        //          console.log('getTransactions :>> ', getTransactions);
        // const decodedData = await tonweb.boc.decode(bocData);
        // console.log('decodedData :>> ', decodedData);/getAddressBalance
        // const res = await tonweb.method()
        // console.log('res :>> ', res);
        //         const bocInstance = tonweb.boc.Boc.fromString(boc);
        // const decodedData = bocInstance.getData();
        // const history = await tonweb.sendBoc(Buffer.from(bocData, 'base64'))
        // 输出解析的 Cell 数据

        // 访问 Cell 中的数据
        //         const data = cell.beginParse();
        //         // console.log('cell.Symbol() :>> ', cell.Symbol());
        //         // console.log('cell.refs() :>> ', cell.refs());
        //         // console.log('cell._depths() :>> ', cell._depths());
        //         // 根据具体数据结构进行提取
        //         // 例如，如果 Cell 中有整数和字符串等
        //         // const someValue = data.readInt(); // 读取整数
        //         // const someString = data.readString(); // 读取字符串

        //         // console.log('读取的整数:', someValue);
        //         // console.log('读取的字符串:', someString);

        // const cellHash = cell.hash();
        // console.log('cellHash :>> ', cellHash.toString('hex'));
        //         const transactionId = cell.hash() // 根据实际方法获取交易 ID
        //         console.log('交易 ID:', transactionId);
        //   const wallet = await WalletContractV1R1.create('0QAS2LYYZVTqLxoZfkuas5Qerjtr6T4QxnoXLRwyQWEqr5mU')
        //   console.log('wallet :>> ', wallet);
        //   const transaction = {
        //     to: '0QBLM5tohk1hY7EQ7ijaOKVDFH68dpMH76NTllGVKb0MBG54',
        //     amount: 1*1e9, // 交易金额，单位为纳米TON
        //     // 其他参数，如数据等
        // };

        // console.log('client.contracts :>> ', client.contracts);
        // try {
        //     const result = await client.contracts.sendTransaction(transaction);
        //     console.log('交易成功:', result);
        // } catch (error) {
        //     console.error('交易失败:', error);
        // }
        //   const res = await client.getTransactions('0QAS2LYYZVTqLxoZfkuas5Qerjtr6T4QxnoXLRwyQWEqr5mU',{})
        //           const client = new TonClient({
        //             endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
        //           });

        //           const client4 = new TonClient4({
        //             endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
        //           })
        // console.log('client :>> ', client);

        // console.log('res :>> ', res);
        // // const transactionInfo = await client.net.query({
        // //     method: 'getTransaction',
        // //     params: { id: transactionId }
        // // });
        //           const transactionInfo = await client.getTransaction(bocData);
        //         console.log('账户的 LT:',transactionInfo);
        // const getBalance = await client.getBalance('0QAS2LYYZVTqLxoZfkuas5Qerjtr6T4QxnoXLRwyQWEqr5mU')
        // console.log('getBalance :>> ', getBalance);
        //         const body = beginCell()
        //   .storeUint(0, 32) // 写入32个零位以表示后面将跟随文本评论
        //   .storeStringTail("Hello, TON!") // 写下我们的文本评论
        //   .endCell();
        //         // const body = beginCell()
        //         //                     .storeUint(0, 32) // write 32 zero bits to indicate that a text comment will follow
        //         //                     .storeStringTail("Hello, TON!") // write our text comment
        //         //                     .endCell();
        //         try {
        //             const res =  await tonConnectUI.sendTransaction({
        //                 validUntil: Math.floor(Date.now() / 1000) + 360,
        //                 messages: [
        //                     {
        //                         address: destination,
        //                         amount: toNano("0.05"),
        //                         payload: body.toBoc().toString("base64") // body中带有评论的载荷
        //                     }
        //                 ]
        //             });
        //             console.log('res :>> ', res);
        //             console.log('交易已发送');
        //         } catch (error) {
        //             console.error('发送交易时发生错误:', error);
        //         }

    }
    return (
        <div>

            <div className="bg_1 pa_4" onClick={send}>test</div>
        </div>
    )
}
export default TestPage