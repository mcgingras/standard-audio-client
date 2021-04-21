import TapesLayout from 'src/layouts/TapesLayout'
import TapeCell from 'src/components/TapeCell'

const TapePage = ({ id }) => {
  return (
    <TapesLayout>
      <TapeCell id={id} />
    </TapesLayout>
  )
}

export default TapePage
