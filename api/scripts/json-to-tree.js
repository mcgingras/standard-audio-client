const { TapeTree } = require('./tape-tree.js')

function parseJson(tapes) {
  const tapesAsList = Object.keys(tapes).map((index) => ({
    ...tapes[index].raw,
  }))
  const tree = new TapeTree(tapesAsList)

  const claims = tapesAsList.reduce((memo, attributes, index) => {
    memo[index] = {
      capacity: attributes.capacity,
      quality: attributes.quality,
      style: attributes.style,
      owner: '0x',
      name: String(index).padStart(3, '0'),
      proof: tree.getProof(
        index,
        attributes.capacity,
        attributes.quality,
        attributes.style
      ),
    }
    return memo
  }, {})

  return {
    merkleRoot: tree.getHexRoot(),
    claims,
  }
}

module.exports = { parseJson }
