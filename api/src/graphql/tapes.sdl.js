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
    SalePrice: [Sale]
    ipfsHash: String!
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

  type Mutation {
    createTape(input: CreateTapeInput!): Tape!
    updateTape(id: Int!, input: UpdateTapeInput!): Tape!
    deleteTape(id: Int!): Tape!
  }
`
