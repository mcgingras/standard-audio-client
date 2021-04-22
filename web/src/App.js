import {useEffect, useState, useCallback} from 'react'
import { FatalErrorBoundary } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

// solidty
import MixtapeArtifact from "./contracts/Mixtape.json";
import contractAddress from "./contracts/contract-address.json";
import { ContractContext } from './contexts/contractContext';

// modules
import Web3Modal from "web3modal";
import { ethers } from "ethers";

// components
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

// css
import './scaffold.css'
import './index.css'


const App = () => {
  const [injectedProvider, setInjectedProvider] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [contract, setContract] = useState(undefined);

  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions: {}
  });

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new ethers.providers.Web3Provider(provider));
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    } else {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  useEffect(() => {
    const getSigner = async () => {
      if (injectedProvider) {
        const signer = injectedProvider.getSigner();
        let addr = await signer.getAddress();
        setAddress(addr);

        const mixtape = new ethers.Contract(
          contractAddress.Mixtape,
          MixtapeArtifact.abi,
          injectedProvider.getSigner(0)
        );

        setContract(mixtape);
      }
    }
    getSigner();
  }, [injectedProvider])

  return (
  <ContractContext.Provider value={contract}>
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodApolloProvider>
        <Routes />
      </RedwoodApolloProvider>
    </FatalErrorBoundary>
  </ContractContext.Provider>
  )
}

export default App
