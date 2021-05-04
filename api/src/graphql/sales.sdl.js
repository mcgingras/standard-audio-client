export const schema = gql`
  type Sale {
    id: Int!
    tape: Tape!
    tapeId: Int!
    amount: Int!
    active: Boolean!
  }

  type Query {
    sales: [Sale!]!
    sale(id: Int!): Sale
  }

  input CreateSaleInput {
    tapeId: Int!
    amount: Int!
    active: Boolean!
  }

  input UpdateSaleInput {
    tapeId: Int
    amount: Int
    active: Boolean
  }

  type Mutation {
    createSale(input: CreateSaleInput!): Sale!
    updateSale(id: Int!, input: UpdateSaleInput!): Sale!
    deleteSale(id: Int!): Sale!
  }
`
