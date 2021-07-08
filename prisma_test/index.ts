import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // stub

  const existingSongs =   [{"id": 1, "name": "sd", "artist": "sdf", "uri": "sdf"}]
  const newSongs = [{
      "name" : "Shoot my Shot",
      "artist": "Idk, Offset",
      "uri": "spotify"
    }]

    const a = await prisma.tape.update({
      where: { id: 1 },
      data: {
        SongsOnTapes: {
          set: existingSongs.map((song) => {
            return {id: song.id}
          }),
          create: newSongs.map((song) => {
            return {
              song: { create: song },
            }
          }),
        },
      },
    })

    console.log(a)


}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

 const createTape = async () => {
  await prisma.tape.create({
    data: {
      name: 'tape1',
      owner: '0x',
      capacity: 1,
      quality: 1,
      style: 1,
      proof: ["string"],
      isClaimed: false,
      claimLock: false,
      ipfsHash: 'abc'
    },
  })
}

// updateTapeWithSongs(1, {songs: [{name: "michael", artist: "michael", uri: "test"}]})
const updateTapeWithSongs = async (id: number, {songs, ...input}: any) => {
  const updated = await prisma.tape.update({
    where: { id },
    data: {
      ...input,
      SongsOnTapes: {
        create: songs.map((song: any) => {
          return {
            song: { create: song },
          }
        }),
      },
    },
  })

  return updated
}

// const songs = [{name: "michael", artist: "michael", uri: "test"}]
//   await prisma.tape.update({
//     where: { id: 1 },
//     data: {
//       SongsOnTapes: {
//         create: songs.map((song: any) => {
//           return {
//             song: { create: song },
//           }
//         }),
//       },
//     },
//   })

// npx ts-node index.ts
