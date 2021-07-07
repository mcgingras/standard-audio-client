export const schema = gql`
  type Song {
    id: Int!
    name: String!
    artist: String!
    uri: String!
    SongsOnTapes: [SongsOnTapes]!
  }

  type Query {
    songs: [Song!]!
    song(id: Int!): Song
  }

  input CreateSongInput {
    name: String!
    artist: String!
    uri: String!
  }

  input UpdateSongInput {
    name: String
    artist: String
    uri: String
  }

  type Mutation {
    createSong(input: CreateSongInput!): Song!
    updateSong(id: Int!, input: UpdateSongInput!): Song!
    deleteSong(id: Int!): Song!
  }
`
