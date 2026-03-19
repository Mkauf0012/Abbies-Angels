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
            // --- Homepage ---
            S.listItem().title('Homepage').icon(() => '🏠').child(
              S.list().title('Homepage').items([
                S.documentListItem().schemaType('hero').id('hero').title('Hero Banner'),
                S.documentListItem().schemaType('mission').id('mission').title('Mission'),
                S.documentListItem().schemaType('what_we_do').id('what_we_do').title('What We Do'),
              ])
            ),
            S.divider(),
            // --- Events ---
            S.listItem().title('Events').icon(() => '🎟️').child(
              S.list().title('Events').items([
                S.documentListItem().schemaType('events').id('events').title('⚙️ Page Settings'),
                S.listItem()
                  .title('📅 All Events')
                  .schemaType('event')
                  .child(S.documentTypeList('event').title('All Events')),
              ])
            ),
            S.divider(),
            // --- Ways to Help ---
            S.documentListItem().schemaType('support').id('support').title('Ways to Help').icon(() => '💛'),
            S.divider(),
            // --- Contact ---
            S.documentListItem().schemaType('contact').id('contact').title('Contact').icon(() => '📧'),
            S.divider(),
            // --- Donation ---
            S.documentListItem().schemaType('donation').id('donation').title('Donation Button').icon(() => '💰'),
            S.divider(),
            // --- Team ---
            S.listItem().title('Team').icon(() => '👥').child(
              S.list().title('Team').items([
                S.documentListItem().schemaType('board').id('board').title('Board Members'),
                S.documentListItem().schemaType('staff').id('staff').title('Staff & Partners'),
              ])
            ),
            S.divider(),
            // --- Advanced ---
            S.listItem().title('Advanced').icon(() => '⚙️').child(
              S.list().title('Advanced').items([
                S.documentListItem().schemaType('hero_card').id('hero_card').title('Hero Card (Manual Override)'),
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
