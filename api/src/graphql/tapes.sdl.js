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
  }

  type Query {
    tapes: [Tape!]!
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
  }

  input UpdateTapeInput {
    owner: String
    name: String
    capacity: Int
    quality: Int
    style: Int
    proof: [String]!
    isClaimed: Boolean
    claimLock: Boolean
  }

  type Mutation {
    createTape(input: CreateTapeInput!): Tape!
    updateTape(id: Int!, input: UpdateTapeInput!): Tape!
    deleteTape(id: Int!): Tape!
  }
`
