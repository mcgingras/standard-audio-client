/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')
const { parseJson } = require('../scripts/json-to-tree')
const simpleJSON = require('../scripts/json/simple.json')

dotenv.config()
const db = new PrismaClient()

async function main() {
  // const parsed = parseJson(simpleJSON)
  // console.log(parsed)

  // const data = Object.keys(parsed.claims).map((id) => {
  //   return {
  //     ...parsed.claims[id],
  //     id: parseInt(id) + 1,
  //   }
  // })

  // const result = await db.tape.createMany({
  //   data: data,
  //   skipDuplicates: true,
  // })

  // console.log(`Created ${result.count} tapes!`)

  console.log('we are inside here')

  const input = {
    id: 1,
    input: {
      name: 'tester',
      Songs: {
        name: 'please',
        artist: 'work',
        uri: 'cool',
      },
    },
  }

  const result = await db.tape.update({
    where: {
      id: 1,
    },
    data: {
      songs: {
        create: [
          {
            song: { create: { name: 'tester', artist: 'michael', uri: 'abc' } },
          },
        ],
      },
    },
  })

  console.log(result)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })
