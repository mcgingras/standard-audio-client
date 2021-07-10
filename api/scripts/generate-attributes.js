/*
Generate Attributes
generates attributes for all 500 cassettes.
*/

class Distribution {
  constructor(events, odds) {
    this.events = events
    this.odds = odds
  }

  simulateEvent() {
    var sum = 0
    this.odds.forEach(function (chance) {
      sum += chance
    })
    var rand = Math.random()
    var chance = 0
    for (var i = 0; i < this.odds.length; i++) {
      chance += this.odds[i] / sum
      if (rand < chance) {
        return i
      }
    }

    // should never be reached unless sum of probabilities is less than 1
    // due to all being zero or some being negative probabilities
    return -1
  }

  take() {
    let turn = this.simulateEvent()
    return {
      index: turn,
      event: this.events[turn],
    }
  }
}

let tapeComponents = [
  'screw',
  'label_small',
  'sticker_large',
  'front_canal',
  'front_top_plate',
  'front_middle_layer',
  'middle_main',
  'film_roll',
  'teeth',
  'teeth_ring',
  'film_middle_connector',
  'inner_post_left',
  'inner_post_right',
  'film_main_wiggle',
  'back_middle_layer',
  'back_canal',
  'back_top_plate',
]

// 4 capacities = 2^2 = 2 bits of information
let capacities = ['46', '60', '90', '120']
let capacityOdds = [50, 40, 17, 3]

// 8 colors = 2^3 = 3 bits of information
// 17 components = 3 * 17 = 51 bits to store color -- would be nice to have 16 to make a clean uint48
let colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'white',
  'black',
]
let colorOdds = [3, 4, 20, 4, 2, 4, 5, 3]

// 4 qualities = 2^2 = 2 bits of information
let qualities = ['low', 'medium', 'high', 'ultra']
let qualityOdds = [3, 4, 20, 1]

let capacityDitribution = new Distribution(capacities, capacityOdds)
let colorDistribution = new Distribution(colors, colorOdds)
let qualityDistribution = new Distribution(qualities, qualityOdds)

const main = () => {
  let attributeMap = {}
  let amountOfTapes = 50

  for (let i = 0; i < amountOfTapes; i++) {
    let capacityChoice = capacityDitribution.take()
    let capacity = capacityChoice.event
    let capacityNum = capacityChoice.index
    let capacityBinary = (capacityNum >>> 0).toString(2)

    let qualityChoice = qualityDistribution.take()
    let quality = qualityChoice.event
    let qualityNum = qualityChoice.index
    let qualityBinary = (qualityNum >>> 0).toString(2)

    let componentMap = {}
    let colorBinary = ''
    for (let j = 0; j < tapeComponents.length; j++) {
      let choice = colorDistribution.take()
      componentMap[tapeComponents[j]] = choice.event
      let bin = (choice.index >>> 0).toString(2)
      let paddedBin = String(bin).padStart(3, '0')
      colorBinary += paddedBin
    }

    let colorNum = parseInt(colorBinary, 2)

    // probably not reading this as binary --
    // probably thinks 101 is actually "101" and not 9
    // need to fix that

    attributeMap[String(i)] = {
      decoded: {
        capacity: capacity,
        quality: quality,
        style: componentMap,
      },
      raw: {
        style: colorNum,
        quality: qualityNum,
        capacity: capacityNum,
      },
      binary: {
        style: colorBinary,
      },
    }
  }

  saveFrontendFiles(attributeMap)
}

function saveFrontendFiles(attributes) {
  const fs = require('fs')

  fs.writeFileSync(
    __dirname + '/json/att.json',
    JSON.stringify(attributes, undefined, 2)
  )
}

main()
