interface Tape {
  id: string
  name: string
  owner: string
  style: string
}

interface TapeData {
  tape: Tape
}

type TapeC = React.FC<{
  data: TapeData
  loading: boolean
}>
