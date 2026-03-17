import { createClient } from '@sanity/client'
import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'

const client = createClient({
  projectId: '7o31gm3n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skLlxJwMiijYwNlEtc67nn81Fq98FojyKpV1YjHZvVWqxwFYUUNqaaSXW0TJUhU18izZYsVcwHDbbJ3eb8z2UnTm8egG7ljXjHkVslFMMb0vlVIyWVMtdPvt2Vnugl3dNMgVohTLg35rgYH8PLLsDxFsXe5M2MWU4zEkQ9qCRsQg1prH2uCJ',
  useCdn: false,
})

const BASE_URL = 'https://abbies-angels.pages.dev'
const root = path.resolve('..')

function readYaml(filePath) {
  return yaml.load(fs.readFileSync(filePath, 'utf8'))
}

function fixTeamImages(data) {
  if (!data?.members) return data
  return {
    ...data,
    members: data.members.map(m => ({
      ...m,
      image: m.image ? `${BASE_URL}/${m.image}` : ''
    }))
  }
}

const board = fixTeamImages(readYaml(path.join(root, '_data/team/board.yml')))
const staff = fixTeamImages(readYaml(path.join(root, '_data/team/staff.yml')))

const docs = [
  { _id: 'hero',          _type: 'hero',          ...readYaml(path.join(root, '_data/homepage/hero.yml')) },
  { _id: 'hero_card',     _type: 'hero_card',     ...readYaml(path.join(root, '_data/homepage/hero_card.yml')) },
  { _id: 'mission',       _type: 'mission',       ...readYaml(path.join(root, '_data/homepage/mission.yml')) },
  { _id: 'what_we_do',    _type: 'what_we_do',    ...readYaml(path.join(root, '_data/homepage/what_we_do.yml')) },
  { _id: 'events',        _type: 'events',        ...readYaml(path.join(root, '_data/sections/events.yml')) },
  { _id: 'support',       _type: 'support',       ...readYaml(path.join(root, '_data/sections/support.yml')) },
  { _id: 'contact_intro', _type: 'contact_intro', ...readYaml(path.join(root, '_data/sections/contact_intro.yml')) },
  { _id: 'contact',       _type: 'contact',       ...readYaml(path.join(root, '_data/settings/contact.yml')) },
  { _id: 'donation',      _type: 'donation',      ...readYaml(path.join(root, '_data/settings/donation.yml')) },
  { _id: 'board',         _type: 'board',         ...board },
  { _id: 'staff',         _type: 'staff',         ...staff },
]

for (const doc of docs) {
  await client.createOrReplace(doc)
  console.log(`? ${doc._id}`)
}

console.log('Done.')
