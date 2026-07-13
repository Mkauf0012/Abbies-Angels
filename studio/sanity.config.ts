import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

/**
 * Singleton documents: exactly one per type. The id matches what the live
 * dataset already uses (the deduped, canonical documents), so editing here
 * updates the document the website reads.
 */
const SINGLETONS: Record<string, string> = {
  hero: 'singleton-hero',
  mission: 'singleton-mission',
  what_we_do: 'singleton-what-we-do',
  events: 'singleton-events',
  support: 'singleton-support',
  contact: 'singleton-contact',
  donate: 'singleton-donate',
  volunteer: 'singleton-volunteer',
  sponsor: 'singleton-sponsor',
  thank_you: 'singleton-thank-you',
  board: 'singleton-board',
  staff: 'singleton-staff',
  gallery_settings: 'gallery_settings',
  donation: 'donation',
  hero_card: 'hero_card',
  spotlight: 'spotlight',
}

const singletonTypes = new Set(Object.keys(SINGLETONS))
// Only these types can have many documents / be created freely.
const collectionTypes = new Set(['event', 'gallery_image'])

const singleton = (S: any, type: string, title: string) =>
  S.documentListItem().schemaType(type).id(SINGLETONS[type]).title(title)

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
            S.listItem()
              .title('Homepage')
              .icon(() => '🏠')
              .child(
                S.list()
                  .title('Homepage')
                  .items([
                    singleton(S, 'hero', 'Hero Banner'),
                    singleton(S, 'mission', 'Mission'),
                    singleton(S, 'what_we_do', 'What We Do'),
                    singleton(S, 'support', 'Ways to Help'),
                    singleton(S, 'hero_card', 'Hero Card (Manual Override)'),
                  ]),
              ),
            S.divider(),
            S.listItem()
              .title('Events')
              .icon(() => '🎟️')
              .child(
                S.list()
                  .title('Events')
                  .items([
                    singleton(S, 'events', '⚙️ Page Settings'),
                    S.listItem()
                      .title('📅 All Events')
                      .schemaType('event')
                      .child(S.documentTypeList('event').title('All Events')),
                  ]),
              ),
            S.divider(),
            S.listItem()
              .title('Gallery')
              .icon(() => '🖼️')
              .child(
                S.list()
                  .title('Gallery')
                  .items([
                    singleton(S, 'gallery_settings', '⚙️ Page Settings'),
                    S.listItem()
                      .title('📸 Photos')
                      .schemaType('gallery_image')
                      .child(
                        S.documentTypeList('gallery_image')
                          .title('Gallery Photos')
                          .defaultOrdering([{field: 'order', direction: 'asc'}]),
                      ),
                  ]),
              ),
            singleton(S, 'spotlight', 'Sponsored Family').icon(() => '💛'),
            S.divider(),
            S.listItem()
              .title('Get Involved')
              .icon(() => '🙌')
              .child(
                S.list()
                  .title('Get Involved')
                  .items([
                    singleton(S, 'donate', 'Donate Page'),
                    singleton(S, 'donation', 'Donate Button (global)'),
                    singleton(S, 'volunteer', 'Volunteer Page'),
                    singleton(S, 'sponsor', 'Sponsor Page'),
                    singleton(S, 'thank_you', 'Thank You Page'),
                  ]),
              ),
            S.divider(),
            singleton(S, 'contact', 'Contact').icon(() => '📧'),
            S.divider(),
            S.listItem()
              .title('Team')
              .icon(() => '👥')
              .child(
                S.list()
                  .title('Team')
                  .items([
                    singleton(S, 'board', 'Board Members'),
                    singleton(S, 'staff', 'Staff & Partners'),
                  ]),
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    // Hide singleton types from the global "Create new" menu.
    newDocumentOptions: (prev) =>
      prev.filter((item) => !singletonTypes.has(item.templateId)),
    // Remove duplicate/delete actions for singletons so editors can't fork them.
    actions: (prev, {schemaType}) =>
      singletonTypes.has(schemaType)
        ? prev.filter(({action}) => action !== 'duplicate' && action !== 'delete')
        : prev,
  },
})
