import BidsLayout from 'src/layouts/BidsLayout'
import EditBidCell from 'src/components/EditBidCell'

const EditBidPage = ({ id }) => {
  return (
    <BidsLayout>
      <EditBidCell id={id} />
    </BidsLayout>
  )
}

export default EditBidPage
