import BidsLayout from 'src/layouts/BidsLayout'
import BidCell from 'src/components/BidCell'

const BidPage = ({ id }) => {
  return (
    <BidsLayout>
      <BidCell id={id} />
    </BidsLayout>
  )
}

export default BidPage
