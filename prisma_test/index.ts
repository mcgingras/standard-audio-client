import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // stub
  const tapes = prisma.tape
  .findUnique({
    where: { id: 1 },
  }).SongsOnTapes()

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
