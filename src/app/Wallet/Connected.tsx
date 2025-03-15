import {
    useAccount,
    useAccounts,
    useAddNetwork,
    useDisconnect,
    useFuel,
    useNetwork,
    useNetworks,
    useSelectNetwork,
    useWallet,
  } from '@fuels/react';
  
  import { DEVNET_NETWORK_URL, TESTNET_NETWORK_URL, bn } from 'fuels';
  import { useState } from 'react';
  
  
  export function Connected() {
    const [loading, setLoading] = useState(false);
  
    const { fuel } = useFuel();
    const { disconnect } = useDisconnect();
    const { wallet } = useWallet();
    const { account } = useAccount();
    const { accounts } = useAccounts();
  
    const { network } = useNetwork();
    const { networks } = useNetworks();
    const { selectNetworkAsync, isPending: isSelectingNetwork } =
      useSelectNetwork();
    const { addNetworkAsync, isPending: isAddingNetwork } = useAddNetwork();
  
    return (
      <div>
        <div className="Actions">
          <button type="button" onClick={() => disconnect()}
              className="bg-white text-purple-600 py-2 px-5 rounded-sm font-mono cursor-pointer">
            Disconnect
          </button>
       
         
        </div>
  
      
      
      </div>
    );
  }
  