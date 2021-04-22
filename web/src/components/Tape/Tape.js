import {useContext, useState} from 'react'
import { Link, routes } from '@redwoodjs/router'
import { ContractContext } from '../../contexts/contractContext';

const Tape = ({ tape }) => {
  const contract = useContext(ContractContext);
  const [txHash, setTxHash] = useState(undefined);
  const [txError, setTxError] = useState(undefined);
  const [txBeingSent, setTxBeingSent] = useState(undefined);
  const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

  const claimTape = async () => {
    try {
      const tx = await contract.claim(0, 10, 10, 10, tape.proof, "testuri")
      setTxHash(tx.hash);

      const receipt = await tx.wait();
      if (receipt.status === 0) {
          throw new Error("Transaction failed");
      }
    } catch (error) {
      console.log(error);
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) { return }
      setTxError(error);
    } finally {
      setTxBeingSent(undefined);
    }
  }

  const checkSymbol = async () => {
    console.log(contract);
    const symbol = await contract.merkleRoot()
    console.log(symbol);
  }

  const checkStatus = async () => {
    const claimed = await contract.isClaimed(0)
    console.log(claimed);
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Tape {tape.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{tape.id}</td>
            </tr>
            <tr>
              <th>Owner</th>
              <td>{tape.owner}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{tape.name}</td>
            </tr>
            <tr>
              <th>Capacity</th>
              <td>{tape.capacity}</td>
            </tr>
            <tr>
              <th>Quality</th>
              <td>{tape.quality}</td>
            </tr>
            <tr>
              <th>Style</th>
              <td>{tape.style}</td>
            </tr>
            <tr>
              <th>Proof</th>
              <td>{tape.proof}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTape({ id: tape.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        {/* set is claimed in the db level */}
        <button
          className="rounded bg-blue-500 text-white uppercase text-xs font-bold px-2 hover:bg-blue-600 mr-2"
          onClick={() => claimTape()}
        >
          claim
        </button>
        <button
          className="rounded bg-blue-500 text-white uppercase text-xs font-bold px-2 hover:bg-blue-600 mr-2"
          onClick={() => checkSymbol()}
        >
          symbol
        </button>
        <button
          className="rounded bg-blue-500 text-white uppercase text-xs font-bold px-2 hover:bg-blue-600"
          onClick={() => checkStatus()}
        >
          is taken
        </button>
      </nav>
    </>
  )
}

export default Tape
