export const schema = gql`
  type Tape {
    id: Int!
    owner: String!
    name: String!
    capacity: Int!
    quality: Int!
    style: Float!
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

  input SongsOnTapesInput {
    id: Int!
  }

  input SongInput {
    id: Int
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
    style: Float!
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
    style: Float
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
    style: Float
    proof: [String]
    isClaimed: Boolean
    claimLock: Boolean
    ipfsHash: String
    existingSongs: [SongsOnTapesInput]
    newSongs: [SongInput]
    SongsOnTapes: [SongInput]
  }

  type Mutation {
    createTape(input: CreateTapeInput!): Tape!
    updateTape(id: Int!, input: UpdateTapeInput!): Tape!
    updateTapeWithExistingSongs(
      id: Int!
      input: UpdateTapeWithSongsInput!
    ): Tape
    updateTapeWithSongs(id: Int!, input: UpdateTapeWithSongsInput!): Tape!
    deleteTape(id: Int!): Tape!
  }
`
