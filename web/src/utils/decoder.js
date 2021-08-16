/**
 * Module for decoding binary from smart contract into
 * something that is more human readable for front end
 */

const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'white',
  'black',
]

const tapeComponents = [
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

export const styleDecoder = (bin) => {
  let padded = bin.toString(2).padStart(51, '0')

  let colorMap = {}
  for (let i = 0; i < 17; i++) {
    let binOfI = padded.substring(i * 3, i * 3 + 3)
    let index = parseInt(binOfI, 2)
    let color = colors[index]
    let component = tapeComponents[i]
    colorMap[component] = color
  }

  return colorMap
}

const capacities = ['46', '60', '90', '120']

export const capacityDecoder = (index) => {
  let capacity = capacities[index]

  return capacity
}

const qualities = ['low', 'medium', 'high', 'ultra']

export const qualityDecoder = (index) => {
  let quality = qualities[index]

  return quality
}
