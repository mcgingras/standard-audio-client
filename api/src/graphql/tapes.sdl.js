export const schema = gql`
  type Tape {
    id: Int!
    owner: String!
    name: String!
    capacity: String!
    quality: String!
    style: String!
    proof: [String]!
  }

  type Query {
    tapes: [Tape!]!
    tape(id: Int!): Tape
  }

  input CreateTapeInput {
    owner: String!
    name: String!
    capacity: String!
    quality: String!
    style: String!
    proof: [String]!
  }

  input UpdateTapeInput {
    owner: String
    name: String
    capacity: String
    quality: String
    style: String
    proof: [String]!
  }

  type Mutation {
    createTape(input: CreateTapeInput!): Tape!
    updateTape(id: Int!, input: UpdateTapeInput!): Tape!
    deleteTape(id: Int!): Tape!
  }
`
