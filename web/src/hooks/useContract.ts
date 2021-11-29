import { useState, useCallback, useEffect } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

const useContract = (contractAddress: string, abi): ethers.Contract => {
  if (!contractAddress) {
    return
  }

  let a = ethers.providers.Web3Provider

  const [contract, setContract] = useState<ethers.Contract>()
  const [injectedProvider, setInjectedProvider] =
    useState<ethers.providers.Web3Provider>()

  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions: {},
  })

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect()
    setInjectedProvider(new ethers.providers.Web3Provider(provider))
  }, [setInjectedProvider])

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal()
    } else {
      loadWeb3Modal()
    }
  }, [loadWeb3Modal])

  useEffect(() => {
    const getSigner = async () => {
      if (injectedProvider) {
        const signer = injectedProvider.getSigner()
        const contract = new ethers.Contract(
          contractAddress,
          abi,
          injectedProvider.getSigner(0)
        )
        setContract(contract)
      }
    }
    getSigner()
  }, [injectedProvider])

  return contract
}

export default useContract
