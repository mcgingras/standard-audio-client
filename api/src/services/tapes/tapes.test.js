import { tapes, tape, createTape, updateTape, deleteTape } from './tapes'

describe('tapes', () => {
  scenario('returns all tapes', async (scenario) => {
    const result = await tapes()

    expect(result.length).toEqual(Object.keys(scenario.tape).length)
  })

  scenario('returns a single tape', async (scenario) => {
    const result = await tape({ id: scenario.tape.one.id })

    expect(result).toEqual(scenario.tape.one)
  })

  scenario('creates a tape', async (scenario) => {
    const result = await createTape({
      input: {
        owner: 'String',
        name: 'String',
        capacity: 'String',
        quality: 'String',
        style: 'String',
      },
    })

    expect(result.owner).toEqual('String')
    expect(result.name).toEqual('String')
    expect(result.capacity).toEqual('String')
    expect(result.quality).toEqual('String')
    expect(result.style).toEqual('String')
  })

  scenario('updates a tape', async (scenario) => {
    const original = await tape({ id: scenario.tape.one.id })
    const result = await updateTape({
      id: original.id,
      input: { owner: 'String2' },
    })

    expect(result.owner).toEqual('String2')
  })

  scenario('deletes a tape', async (scenario) => {
    const original = await deleteTape({ id: scenario.tape.one.id })
    const result = await tape({ id: original.id })

    expect(result).toEqual(null)
  })
})
