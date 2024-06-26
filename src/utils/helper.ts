import sanity from './client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(sanity)

export const createURl = (source: string, width = 300, height = 300) => {
  return builder.image(source).width(width).height(height).url()
}

export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString()
}

export const textToHTML = (text: string) => {
  return text.replace(/\n/g, "<br>")
}
