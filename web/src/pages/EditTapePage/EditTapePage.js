import TapesLayout from 'src/layouts/TapesLayout'
import EditTapeCell from 'src/components/EditTapeCell'

const EditTapePage = ({ id }) => {
  return (
    <TapesLayout>
      <EditTapeCell id={id} />
    </TapesLayout>
  )
}

export default EditTapePage
