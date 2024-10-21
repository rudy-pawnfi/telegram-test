import { useTonConnectUI } from "@tonconnect/ui-react";
// import { beginCell, toNano } from '@ton/ton'
import { Buffer } from 'buffer';

// 设置全局 Buffer 对象
import { begiTonClient, libnCell } from '@ton/ton'
const TestPage = () => {

    const [tonConnectUI] = useTonConnectUI();
    const send = async () => {
        // const client = new TonClient({
        //     network: {
        //       endpoints: ['https://testnet.toncenter.com/api/v2/jsonRPC'] // 替换为你的节点地址
        //     },
        //   });
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