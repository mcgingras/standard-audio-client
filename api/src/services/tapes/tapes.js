import { db } from 'src/lib/db'

export const tapes = ({ isClaimed }) => {
  return db.tape.findMany({
    where: { isClaimed },
  })
}

export const tape = ({ id }) => {
  return db.tape.findUnique({
    where: { id },
  })
}

export const createTape = ({ input }) => {
  return db.tape.create({
    data: input,
  })
}

export const createTapeWithSongs = ({ input: { Songs, ...input } }) => {
  return db.tape.create({
    data: { ...input, Songs: { create: [Songs] } },
  })
}

export const updateTapeWithSongs = ({ id, input: { songs, ...input } }) => {
  return db.tape.update({
    where: { id },
    data: {
      ...input,
      songs: {
        create: songs.map((song) => {
          return {
            song: { create: song },
          }
        }),
      },
    },
  })
}

export const updateTape = ({ id, input }) => {
  return db.tape.update({
    data: input,
    where: { id },
  })
}

export const deleteTape = ({ id }) => {
  return db.tape.delete({
    where: { id },
  })
}

export const Tape = {
  Bids: (_obj, { root }) =>
    db.tape.findUnique({ where: { id: root.id } }).Bids(),
  SalePrice: (_obj, { root }) =>
    db.tape.findUnique({ where: { id: root.id } }).SalePrice(),
  SongsOnTapes: (_obj, { root }) =>
    db.tape
      .findUnique({
        where: { id: root.id },
      })
      .SongsOnTapes(),
}

export const SongsOnTapes = {
  song: (_obj, { root }) =>
    db.songsOnTapes
      .findUnique({
        where: { id: root.id },
      })
      .song(),
}
