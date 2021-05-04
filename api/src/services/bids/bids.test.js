import { bids, bid, createBid, updateBid, deleteBid } from './bids'

describe('bids', () => {
  scenario('returns all bids', async (scenario) => {
    const result = await bids()

    expect(result.length).toEqual(Object.keys(scenario.bid).length)
  })

  scenario('returns a single bid', async (scenario) => {
    const result = await bid({ id: scenario.bid.one.id })

    expect(result).toEqual(scenario.bid.one)
  })

  scenario('creates a bid', async (scenario) => {
    const result = await createBid({
      input: {
        tapeId: 'scenario.bid.two.tapeId',
        bidder: 'String',
        amount: 2145116,
      },
    })

    expect(result.tapeId).toEqual('scenario.bid.two.tapeId')
    expect(result.bidder).toEqual('String')
    expect(result.amount).toEqual(2145116)
  })

  scenario('updates a bid', async (scenario) => {
    const original = await bid({ id: scenario.bid.one.id })
    const result = await updateBid({
      id: original.id,
      input: { bidder: 'String2' },
    })

    expect(result.bidder).toEqual('String2')
  })

  scenario('deletes a bid', async (scenario) => {
    const original = await deleteBid({ id: scenario.bid.one.id })
    const result = await bid({ id: original.id })

    expect(result).toEqual(null)
  })
})
