import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'custom',
  nodeVersion: '20',
  devCommand: 'npm run dev -- --port {PORT} --host',

  experimental: {
    ssg: {
      name: 'Astro',
      logPatterns: {
        up: ['is ready', 'astro']
      },
      directRoutes: {
        'socket.io': 'socket.io'
      },
      passthrough: ['/vite-hmr/**']
    }
  },

  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['_data'],
      models: [
        {
          name: 'hero',
          type: 'data',
          label: 'Hero Section',
          filePath: '_data/homepage/hero.yml',
          fields: [
            { type: 'string', name: 'headline', label: 'Headline', required: true },
            { type: 'string', name: 'subheadline', label: 'Subheadline' },
            { type: 'string', name: 'cta_primary_text', label: 'Primary Button Text' },
            { type: 'string', name: 'cta_primary_link', label: 'Primary Button Link' },
            { type: 'string', name: 'cta_secondary_text', label: 'Secondary Button Text' },
            { type: 'string', name: 'cta_secondary_link', label: 'Secondary Button Link' },
            { type: 'string', name: 'hero_meta', label: 'Meta Text' }
          ]
        },
        {
          name: 'hero_card',
          type: 'data',
          label: 'Hero Card',
          filePath: '_data/homepage/hero_card.yml',
          fields: [
            { type: 'string', name: 'title', label: 'Card Title', required: true },
            { type: 'string', name: 'date_label', label: 'Event Date' },
            { type: 'string', name: 'time_label', label: 'Event Time' },
            { type: 'string', name: 'location_label', label: 'Location' },
            { type: 'string', name: 'description', label: 'Description' },
            { type: 'image', name: 'image', label: 'Card Image' },
            { type: 'string', name: 'image_alt', label: 'Image Alt Text' },
            { type: 'string', name: 'ticket_url', label: 'Ticket URL' }
          ]
        },
        {
          name: 'mission',
          type: 'data',
          label: 'Mission Section',
          filePath: '_data/homepage/mission.yml',
          fields: [
            { type: 'string', name: 'heading', label: 'Heading', required: true },
            { type: 'text', name: 'body_1', label: 'Paragraph 1' },
            { type: 'text', name: 'body_2', label: 'Paragraph 2' }
          ]
        },
        {
          name: 'events_section',
          type: 'data',
          label: 'Events Section',
          filePath: '_data/sections/events.yml',
          fields: [
            { type: 'string', name: 'heading', label: 'Heading', required: true },
            { type: 'text', name: 'intro', label: 'Intro' },
            { type: 'string', name: 'bullet_1', label: 'Bullet 1' },
            { type: 'string', name: 'bullet_2', label: 'Bullet 2' },
            { type: 'string', name: 'bullet_3', label: 'Bullet 3' },
            { type: 'string', name: 'featured_card_title', label: 'Featured Card Title' },
            { type: 'text', name: 'featured_card_intro', label: 'Featured Card Intro' },
            { type: 'text', name: 'featured_card_body', label: 'Featured Card Body' },
            { type: 'string', name: 'featured_card_tickets_label', label: 'Tickets Button Label' },
            { type: 'string', name: 'featured_card_tickets_url', label: 'Tickets URL' }
          ]
        },
        {
          name: 'support',
          type: 'data',
          label: 'Ways to Help',
          filePath: '_data/sections/support.yml',
          fields: [
            { type: 'string', name: 'heading', label: 'Heading', required: true },
            { type: 'text', name: 'intro', label: 'Intro' },
            { type: 'string', name: 'bullet_1', label: 'Bullet 1' },
            { type: 'string', name: 'bullet_2', label: 'Bullet 2' },
            { type: 'string', name: 'bullet_3', label: 'Bullet 3' },
            { type: 'string', name: 'card_title', label: 'Card Title' },
            { type: 'text', name: 'card_body', label: 'Card Body' },
            { type: 'string', name: 'card_link_label', label: 'Link Label' },
            { type: 'string', name: 'card_link_url', label: 'Link URL' }
          ]
        }
      ],
      assetsConfig: {
        referenceType: 'static',
        staticDir: 'public',
        uploadDir: 'images/uploads',
        publicPath: '/'
      }
    })
  ]
});
