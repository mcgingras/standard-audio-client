import {useContext} from 'react'
import TapesCell from 'src/components/TapesCell'
import { ContractContext } from '../../contexts/contractContext';


const HomePage = () => {
  const contract = useContext(ContractContext);

  return (
    <>
    <h1 className="bg-red-500 font-bold p-2">NFTapes v0.1</h1>
    <TapesCell />
    </>
  )
}

export default HomePage
