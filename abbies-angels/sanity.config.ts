import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: "Abbie's Angels",
  projectId: '7o31gm3n',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Homepage').child(
              S.list().title('Homepage').items([
                S.documentListItem().schemaType('hero').id('hero').title('Hero'),
                S.documentListItem().schemaType('hero_card').id('hero_card').title('Hero Card'),
                S.documentListItem().schemaType('mission').id('mission').title('Mission'),
                S.documentListItem().schemaType('what_we_do').id('what_we_do').title('What We Do'),
              ])
            ),
            S.listItem().title('Sections').child(
              S.list().title('Sections').items([
                S.documentListItem().schemaType('events').id('events').title('Events'),
                S.documentListItem().schemaType('support').id('support').title('Ways to Help'),
                S.documentListItem().schemaType('contact_intro').id('contact_intro').title('Contact Intro'),
              ])
            ),
            S.listItem().title('Settings').child(
              S.list().title('Settings').items([
                S.documentListItem().schemaType('contact').id('contact').title('Contact Info'),
                S.documentListItem().schemaType('donation').id('donation').title('Donation Button'),
              ])
            ),
            S.listItem().title('Team').child(
              S.list().title('Team').items([
                S.documentListItem().schemaType('board').id('board').title('Board Members'),
                S.documentListItem().schemaType('staff').id('staff').title('Staff & Partners'),
              ])
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
