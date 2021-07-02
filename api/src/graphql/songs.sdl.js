export const schema = gql`
  type Song {
    id: Int!
    tape: Tape!
    tapeId: Int!
    name: String!
    artist: String!
    uri: String!
  }

  type Query {
    songs: [Song!]!
    song(id: Int!): Song
  }

  input CreateSongInput {
    tapeId: Int!
    name: String!
    artist: String!
    uri: String!
  }

  type Mutation {
    createSong(input: CreateSongInput!): Song!
    deleteSong(id: Int!): Song!
  }
`
