import { db } from 'src/lib/db'

export const tapes = () => {
  return db.tape.findMany()
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
}
