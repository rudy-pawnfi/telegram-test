import { TonClient, TonClient4 } from "@ton/ton";
import { useState, useEffect } from "react";

export const useAsyncInitialize = (
    func,
    deps
  ) => {
    const [state, setState] = useState();
  
    useEffect(() => {
      (async () => {
        setState(await func());
      })();
    }, deps);
  
    return state;
  };
export const useTonClient = () => {
  const [client, setClient] = useState({});

  useAsyncInitialize(async () => {
    const tonClient = new TonClient({ endpoint: import.meta.env.MODE === 'development' ? 'https://testnet.toncenter.com/api/v2/jsonRPC' : 'https://toncenter.com/api/v2/jsonRPC' });
    setClient(tonClient);
  }, []);

  return {
    client,
  };
};
