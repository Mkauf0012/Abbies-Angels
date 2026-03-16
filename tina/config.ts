import { defineConfig } from 'tinacms';

export default defineConfig({
  branch: process.env.HEAD || 'feature/astro-conversion',
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      // ─── Homepage ───────────────────────────────────────
      {
        name: 'homepage_hero',
        label: 'Homepage – Hero',
        path: '_data/homepage',
        match: { include: 'hero' },
        format: 'yaml',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'headline', label: 'Headline', ui: { component: 'textarea' } },
          { type: 'string', name: 'subheadline', label: 'Sub-headline', ui: { component: 'textarea' } },
          { type: 'string', name: 'cta_primary_text', label: 'Primary CTA Text' },
          { type: 'string', name: 'cta_primary_link', label: 'Primary CTA Link' },
          { type: 'string', name: 'cta_secondary_text', label: 'Secondary CTA Text' },
          { type: 'string', name: 'cta_secondary_link', label: 'Secondary CTA Link' },
          { type: 'string', name: 'hero_meta', label: 'Hero Meta Text', ui: { component: 'textarea' } },
        ],
      },
      {
        name: 'homepage_hero_card',
        label: 'Homepage – Hero Card',
        path: '_data/homepage',
        match: { include: 'hero_card' },
        format: 'yaml',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'title', label: 'Title' },
          { type: 'string', name: 'body', label: 'Body', ui: { component: 'textarea' } },
          { type: 'string', name: 'link_label', label: 'Link Label' },
          { type: 'string', name: 'link_url', label: 'Link URL' },
        ],
      },
      {
        name: 'homepage_mission',
        label: 'Homepage – Mission',
        path: '_data/homepage',
        match: { include: 'mission' },
        format: 'yaml',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'heading', label: 'Heading' },
          { type: 'string', name: 'body', label: 'Body', ui: { component: 'textarea' } },
        ],
      },
      {
        name: 'homepage_what_we_do',
        label: 'Homepage – What We Do',
        path: '_data/homepage',
        match: { include: 'what_we_do' },
        format: 'yaml',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'heading', label: 'Heading' },
          { type: 'string', name: 'card_1_title', label: 'Card 1 Title' },
          { type: 'string', name: 'card_1_body', label: 'Card 1 Body', ui: { component: 'textarea' } },
          { type: 'string', name: 'card_2_title', label: 'Card 2 Title' },
          { type: 'string', name: 'card_2_body', label: 'Card 2 Body', ui: { component: 'textarea' } },
          { type: 'string', name: 'card_3_title', label: 'Card 3 Title' },
          { type: 'string', name: 'card_3_body', label: 'Card 3 Body', ui: { component: 'textarea' } },
        ],
      },

      // ─── Sections ────────────────────────────────────────
      {
        name: 'section_events',
        label: 'Events Section',
        path: '_data/sections',
        match: { include: 'events' },
        format: 'yaml',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'heading', label: 'Heading' },
          { type: 'string', name: 'intro', label: 'Intro', ui: { component: 'textarea' } },
          { type: 'string', name: 'bullet_1', label: 'Bullet 1' },
          { type: 'string', name: 'bullet_2', label: 'Bullet 2' },
          { type: 'string', name: 'bullet_3', label: 'Bullet 3' },
          { type: 'string', name: 'footer_note', label: 'Footer Note', ui: { component: 'textarea' } },
          { type: 'string', name: 'featured_card_title', label: 'Featured Card Title' },
          { type: 'string', name: 'featured_card_intro', label: 'Featured Card Intro', ui: { component: 'textarea' } },
          { type: 'string', name: 'featured_card_body', label: 'Featured Card Body', ui: { component: 'textarea' } },
          { type: 'string', name: 'featured_card_wexler_note', label: 'Featured Card Note', ui: { component: 'textarea' } },
          { type: 'string', name: 'featured_card_gofundme_label', label: 'GoFundMe Button Label' },
          { type: 'string', name: 'featured_card_gofundme_url', label: 'GoFundMe URL' },
          { type: 'string', name: 'featured_card_tickets_label', label: 'Tickets Button Label' },
          { type: 'string', name: 'featured_card_tickets_url', label: 'Tickets URL' },
        ],
      },
      {
        name: 'section_support',
        label: 'Support Section',
        path: '_data/sections',
        match: { include: 'support' },
        format: 'yaml',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'heading', label: 'Heading' },
          { type: 'string', name: 'intro', label: 'Intro', ui: { component: 'textarea' } },
          { type: 'string', name: 'body', label: 'Body', ui: { component: 'textarea' } },
        ],
      },
      {
        name: 'section_contact_intro',
        label: 'Contact Intro',
        path: '_data/sections',
        match: { include: 'contact_intro' },
        format: 'yaml',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'heading', label: 'Heading' },
          { type: 'string', name: 'body', label: 'Body', ui: { component: 'textarea' } },
        ],
      },

      // ─── Settings ────────────────────────────────────────
      {
        name: 'settings_contact',
        label: 'Settings – Contact Info',
        path: '_data/settings',
        match: { include: 'contact' },
        format: 'yaml',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'email', label: 'Email' },
          { type: 'string', name: 'phone', label: 'Phone' },
          { type: 'string', name: 'facebook', label: 'Facebook URL' },
          { type: 'string', name: 'instagram', label: 'Instagram URL' },
          { type: 'string', name: 'linkedin', label: 'LinkedIn URL' },
          { type: 'string', name: 'mailing_name', label: 'Mailing Name' },
          { type: 'string', name: 'mailing_street', label: 'Mailing Street' },
          { type: 'string', name: 'mailing_city', label: 'Mailing City/State/Zip' },
        ],
      },
      {
        name: 'settings_donation',
        label: 'Settings – Donation Button',
        path: '_data/settings',
        match: { include: 'donation' },
        format: 'yaml',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'button_text', label: 'Button Text' },
          { type: 'string', name: 'button_url', label: 'Button URL' },
          { type: 'boolean', name: 'enabled', label: 'Show Donation Button' },
        ],
      },

      // ─── Team ─────────────────────────────────────────────
      {
        name: 'team_staff',
        label: 'Team – Staff & Volunteers',
        path: '_data/team',
        match: { include: 'staff' },
        format: 'yaml',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: 'object',
            name: 'members',
            label: 'Members',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name }) },
            fields: [
              { type: 'string', name: 'name', label: 'Name' },
              { type: 'string', name: 'title', label: 'Title' },
              { type: 'image', name: 'image', label: 'Photo' },
            ],
          },
        ],
      },
      {
        name: 'team_board',
        label: 'Team – Board Members',
        path: '_data/team',
        match: { include: 'board' },
        format: 'yaml',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: 'object',
            name: 'members',
            label: 'Members',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name }) },
            fields: [
              { type: 'string', name: 'name', label: 'Name' },
              { type: 'string', name: 'title', label: 'Title' },
              { type: 'image', name: 'image', label: 'Photo' },
            ],
          },
        ],
      },

      // ─── Gallery ──────────────────────────────────────────
      {
        name: 'gallery_page',
        label: 'Gallery – Page Content',
        path: '_data/gallery',
        match: { include: 'page' },
        format: 'yaml',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'heading', label: 'Heading' },
          { type: 'string', name: 'intro', label: 'Intro', ui: { component: 'textarea' } },
        ],
      },
      {
        name: 'gallery_spotlight',
        label: 'Gallery – Spotlight',
        path: '_data/gallery',
        match: { include: 'spotlight' },
        format: 'yaml',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: 'object',
            name: 'items',
            label: 'Spotlight Items',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.caption }) },
            fields: [
              { type: 'image', name: 'image', label: 'Image' },
              { type: 'string', name: 'caption', label: 'Caption' },
            ],
          },
        ],
      },
      {
        name: 'gallery_tiles',
        label: 'Gallery – Tiles',
        path: '_data/gallery',
        match: { include: 'tiles' },
        format: 'yaml',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: 'object',
            name: 'items',
            label: 'Tiles',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.caption }) },
            fields: [
              { type: 'image', name: 'image', label: 'Image' },
              { type: 'string', name: 'caption', label: 'Caption' },
            ],
          },
        ],
      },
    ],
  },
});
