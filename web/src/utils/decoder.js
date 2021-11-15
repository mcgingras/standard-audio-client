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
  const padded = bin.toString().padStart(51, '0')

  const colorMap = {}
  for (let i = 0; i < 17; i++) {
    const binOfI = padded.substring(i * 3, i * 3 + 3)
    const index = parseInt(binOfI, 2)
    const color = colors[index]
    const component = tapeComponents[i]
    colorMap[component] = color
  }

  return colorMap
}

const capacities = ['46', '60', '90', '120']

export const capacityDecoder = (index) => {
  const capacity = capacities[index]

  return capacity
}

const qualities = ['low', 'medium', 'high', 'ultra']

export const qualityDecoder = (index) => {
  const quality = qualities[index]

  return quality
}
