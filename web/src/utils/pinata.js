const axios = require('axios')

export const pinJSONToIPFS = (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
      },
    })
    .then(function (response) {
      console.log(`response: ${response}`)
      return response
    })
    .catch(function (error) {
      console.log(`error: ${error}`)
      console.log(error)
    })
}

export const getIPFSData = (hash) => {
  const url = `https://gateway.ipfs.io/ipfs/${hash}`
  return axios
    .get(url)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.log(error)
    })
}
