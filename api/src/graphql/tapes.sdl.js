export const schema = gql`
  type Tape {
    id: Int!
    owner: String!
    name: String!
    capacity: Int!
    quality: Int!
    style: Int!
    proof: [String]!
    isClaimed: Boolean!
    claimLock: Boolean!
    Bids: [Bid]
    SongsOnTapes: [SongsOnTapes]!
    SalePrice: [Sale]
    ipfsHash: String!
  }

  type SongsOnTapes {
    id: Int!
    tapeId: Int!
    songId: Int!
    song: Song
    tape: Tape!
  }

  input SongInput {
    name: String!
    artist: String!
    uri: String!
  }

  type Query {
    tapes(isClaimed: Boolean, owner: String): [Tape!]!
    tape(id: Int!): Tape
  }

  input CreateTapeInput {
    owner: String!
    name: String!
    capacity: Int!
    quality: Int!
    style: Int!
    proof: [String]!
    isClaimed: Boolean!
    claimLock: Boolean!
    ipfsHash: String!
  }

  input UpdateTapeInput {
    owner: String
    name: String
    capacity: Int
    quality: Int
    style: Int
    proof: [String]
    isClaimed: Boolean
    claimLock: Boolean
    ipfsHash: String
  }

  input UpdateTapeWithSongsInput {
    owner: String
    name: String
    capacity: Int
    quality: Int
    style: Int
    proof: [String]
    isClaimed: Boolean
    claimLock: Boolean
    ipfsHash: String
    songs: [SongInput]
  }

  type Mutation {
    createTape(input: CreateTapeInput!): Tape!
    updateTape(id: Int!, input: UpdateTapeInput!): Tape!
    updateTapeWithSongs(id: Int!, input: UpdateTapeWithSongsInput!): Tape!
    deleteTape(id: Int!): Tape!
  }
`
