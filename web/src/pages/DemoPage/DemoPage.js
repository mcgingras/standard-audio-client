import { useContext, useEffect, useState } from 'react'
import { ContractContext } from '../../contexts/contractContext'
import { ethers } from 'ethers'
import { ContactShadows } from '@react-three/drei'

const DemoPage = () => {
  const { contract, address } = useContext(ContractContext)

  useEffect(() => {
    const getData = async () => {
      console.log(contract)
      if (contract != '') {
        const bid = await contract.isClaimed(1)
        console.log(bid)
        // const bid = await contract.cassetteBids(1)
        // const claimed = await contract.isClaimed(1)
      }
    }
    getData()
  }, [contract])

  return (
    <div>
      <p>demo page</p>
    </div>
  )
}

export default DemoPage
