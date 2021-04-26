/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')
const { parseJson } = require('../scripts/json-to-tree');
const simpleJSON  = require('../scripts/json/simple.json')

dotenv.config()
const db = new PrismaClient()

async function main() {
  const parsed = parseJson(simpleJSON);
  console.log(parsed);

  const data = Object.keys(parsed.claims).map((id) => {
    return {
      ...parsed.claims[id],
      id: parseInt(id)
    }
  })

  const result = await db.tape.createMany({
    data: data,
    skipDuplicates: true
  })

  console.log(`Created ${result.count} tapes!`);

}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })
