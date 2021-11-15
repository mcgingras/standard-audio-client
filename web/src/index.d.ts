interface Tape {
  id: string
  name: string
  owner: string
  style: string
  capacity: string
  quality: string
}

interface TapeData {
  tape: Tape
}

type TapeC = React.FC<{
  data: TapeData
  loading: boolean
}>
               
type TapeInfoC = React.FC<{
  tape: Tape
}>

