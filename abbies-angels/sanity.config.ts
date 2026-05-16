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

            // ── HOMEPAGE ──────────────────────────────
            S.listItem().title('Homepage').icon(() => '🏠').child(
              S.list().title('Homepage').items([
                S.documentListItem().schemaType('hero').id('hero').title('Hero Banner'),
                S.documentListItem().schemaType('mission').id('mission').title('Mission'),
                S.documentListItem().schemaType('what_we_do').id('what_we_do').title('What We Do'),
              ])
            ),
            S.divider(),

            // ── EVENTS ────────────────────────────────
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

            // ── GALLERY ───────────────────────────────
            S.listItem().title('Gallery').icon(() => '🖼️').child(
              S.list().title('Gallery').items([
                S.documentListItem().schemaType('gallery_settings').id('gallery_settings').title('⚙️ Page Settings'),
                S.listItem()
                  .title('📸 Photos')
                  .schemaType('gallery_image')
                  .child(S.documentTypeList('gallery_image').title('Gallery Photos').defaultOrdering([{field: 'order', direction: 'asc'}])),
                S.documentListItem().schemaType('spotlight').id('spotlight').title('❤️ Family Spotlight'),
              ])
            ),
            S.divider(),

            // ── DONATE ────────────────────────────────
            S.documentListItem().schemaType('donate').id('donate').title('Donate Page').icon(() => '❤️'),
            S.divider(),

            // ── VOLUNTEER ─────────────────────────────
            S.documentListItem().schemaType('volunteer').id('volunteer').title('Volunteer Page').icon(() => '🙋'),
            S.divider(),

            // ── SPONSOR ───────────────────────────────
            S.documentListItem().schemaType('sponsor').id('sponsor').title('Sponsor Page').icon(() => '🤝'),
            S.divider(),

            // ── THANK YOU ─────────────────────────────
            S.documentListItem().schemaType('thank_you').id('thank_you').title('Thank You Page').icon(() => '🎉'),
            S.divider(),

            // ── WAYS TO HELP ──────────────────────────
            S.documentListItem().schemaType('support').id('support').title('Ways to Help').icon(() => '💛'),
            S.divider(),

            // ── CONTACT ───────────────────────────────
            S.documentListItem().schemaType('contact').id('contact').title('Contact').icon(() => '📧'),
            S.divider(),

            // ── TEAM ──────────────────────────────────
            S.listItem().title('Team').icon(() => '👥').child(
              S.list().title('Team').items([
                S.documentListItem().schemaType('board').id('board').title('Board Members'),
                S.documentListItem().schemaType('staff').id('staff').title('Staff & Partners'),
              ])
            ),
            S.divider(),

            // ── GLOBAL / ADVANCED ─────────────────────
            S.listItem().title('Global Settings').icon(() => '⚙️').child(
              S.list().title('Global Settings').items([
                S.documentListItem().schemaType('donation').id('donation').title('💰 Donation Button (Auctria URL)'),
                S.documentListItem().schemaType('hero_card').id('hero_card').title('📌 Hero Card (Manual Override)'),
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
