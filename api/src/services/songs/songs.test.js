import { songs, song, createSong, updateSong, deleteSong } from './songs'

describe('songs', () => {
  scenario('returns all songs', async (scenario) => {
    const result = await songs()

    expect(result.length).toEqual(Object.keys(scenario.song).length)
  })

  scenario('returns a single song', async (scenario) => {
    const result = await song({ id: scenario.song.one.id })

    expect(result).toEqual(scenario.song.one)
  })

  scenario('creates a song', async (scenario) => {
    const result = await createSong({
      input: { name: 'String', artist: 'String', uri: 'String' },
    })

    expect(result.name).toEqual('String')
    expect(result.artist).toEqual('String')
    expect(result.uri).toEqual('String')
  })

  scenario('updates a song', async (scenario) => {
    const original = await song({ id: scenario.song.one.id })
    const result = await updateSong({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a song', async (scenario) => {
    const original = await deleteSong({ id: scenario.song.one.id })
    const result = await song({ id: original.id })

    expect(result).toEqual(null)
  })
})
