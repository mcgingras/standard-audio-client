import { db } from 'src/lib/db'

export const bids = () => {
  return db.bid.findMany()
}

export const bid = ({ id }) => {
  return db.bid.findUnique({
    where: { id },
  })
}

export const createBid = ({ input }) => {
  return db.bid.create({
    data: input,
  })
}

export const updateBid = ({ id, input }) => {
  return db.bid.update({
    data: input,
    where: { id },
  })
}

export const deleteBid = ({ id }) => {
  return db.bid.delete({
    where: { id },
  })
}

export const Bid = {
  tape: (_obj, { root }) =>
    db.bid.findUnique({ where: { id: root.id } }).tape(),
}
