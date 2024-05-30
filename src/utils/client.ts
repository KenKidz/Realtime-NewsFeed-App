import { createClient } from "@sanity/client"
import {resolveEditUrl} from '@sanity/client/csm'

const client = createClient({
  projectId: 'p1rs5mi5',
  dataset: "production",
  apiVersion: "2024-03-11",
  useCdn: true,
})

export default client
