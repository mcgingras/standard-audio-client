export const schema = gql`
  type Bid {
    id: Int!
    tape: Tape!
    tapeId: Int!
    bidder: String!
    amount: Float!
    active: Boolean!
  }

  type Query {
    bids: [Bid!]!
    bid(id: Int!): Bid
  }

  input CreateBidInput {
    tapeId: Int!
    bidder: String!
    amount: Float!
    active: Boolean!
  }

  input UpdateBidInput {
    tapeId: Int
    bidder: String
    amount: Float
    active: Boolean
  }

  type Mutation {
    createBid(input: CreateBidInput!): Bid!
    updateBid(id: Int!, input: UpdateBidInput!): Bid!
    deleteBid(id: Int!): Bid!
  }
`
