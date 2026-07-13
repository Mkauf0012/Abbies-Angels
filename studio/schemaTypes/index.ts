import {SchemaTypeDefinition} from 'sanity'

/**
 * Content model for the Abbie's Angels website.
 *
 * Singletons (one document each) are edited from the grouped desk structure in
 * sanity.config.ts and use fixed ids there. Collections (`event`, `gallery_image`)
 * can have many documents.
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  // ── Homepage ──────────────────────────────────────────────────────────────
  {
    name: 'hero',
    title: 'Homepage – Hero',
    type: 'document',
    icon: () => '🏠',
    fields: [
      {name: 'headline', title: 'Headline', type: 'string', validation: (R: any) => R.required()},
      {name: 'subheadline', title: 'Subheadline', type: 'text', rows: 3},
      {name: 'cta_primary_text', title: 'Primary Button Text', type: 'string'},
      {name: 'cta_primary_link', title: 'Primary Button Link', type: 'string'},
      {name: 'cta_secondary_text', title: 'Secondary Button Text', type: 'string'},
      {name: 'cta_secondary_link', title: 'Secondary Button Link', type: 'string'},
      {name: 'hero_meta', title: 'Meta Text', type: 'text', rows: 2},
    ],
  },
  {
    name: 'hero_card',
    title: 'Homepage – Hero Card (Manual Override)',
    type: 'document',
    icon: () => '📌',
    description: 'Only shown if no Event is marked "Featured on Homepage".',
    fields: [
      {name: 'title', title: 'Event Title', type: 'string'},
      {name: 'date_label', title: 'Date', type: 'string'},
      {name: 'time_label', title: 'Time', type: 'string'},
      {name: 'location_label', title: 'Location', type: 'string'},
      {name: 'description', title: 'Description', type: 'text', rows: 3},
      {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
      {name: 'image_alt', title: 'Image Alt Text', type: 'string'},
      {name: 'ticket_url', title: 'Ticket URL', type: 'string'},
    ],
  },
  {
    name: 'mission',
    title: 'Homepage – Mission',
    type: 'document',
    icon: () => '💜',
    fields: [
      {name: 'heading', title: 'Heading', type: 'string'},
      {name: 'body_1', title: 'Body Paragraph 1', type: 'text', rows: 4},
      {name: 'body_2', title: 'Body Paragraph 2', type: 'text', rows: 4},
    ],
  },
  {
    name: 'what_we_do',
    title: 'Homepage – What We Do',
    type: 'document',
    icon: () => '🤝',
    fields: [
      {name: 'heading', title: 'Section Heading', type: 'string'},
      {name: 'card_1_title', title: 'Card 1 – Title', type: 'string'},
      {name: 'card_1_body', title: 'Card 1 – Body', type: 'text', rows: 3},
      {name: 'card_2_title', title: 'Card 2 – Title', type: 'string'},
      {name: 'card_2_body', title: 'Card 2 – Body', type: 'text', rows: 3},
      {name: 'card_3_title', title: 'Card 3 – Title', type: 'string'},
      {name: 'card_3_body', title: 'Card 3 – Body', type: 'text', rows: 3},
    ],
  },

  // ── Events ─────────────────────────────────────────────────────────────────
  {
    name: 'events',
    title: 'Events – Page Settings',
    type: 'document',
    icon: () => '⚙️',
    fields: [
      {name: 'heading', title: 'Page Heading', type: 'string'},
      {name: 'intro', title: 'Intro Text', type: 'text', rows: 3},
      {name: 'footer_note', title: 'Footer Note', type: 'text', rows: 2},
      {name: 'view_all_label', title: 'View All Button Label', type: 'string'},
      {name: 'bullet_1', title: 'Bullet 1', type: 'string'},
      {name: 'bullet_2', title: 'Bullet 2', type: 'string'},
      {name: 'bullet_3', title: 'Bullet 3', type: 'string'},
      {name: 'featured_card_title', title: 'Featured Card – Title', type: 'string'},
      {name: 'featured_card_intro', title: 'Featured Card – Intro', type: 'text', rows: 2},
      {name: 'featured_card_body', title: 'Featured Card – Body', type: 'text', rows: 4},
      {name: 'featured_card_wexler_note', title: 'Featured Card – Note', type: 'text', rows: 3},
      {name: 'featured_card_tickets_label', title: 'Featured Card – Tickets Label', type: 'string'},
      {name: 'featured_card_tickets_url', title: 'Featured Card – Tickets URL', type: 'string'},
      {name: 'featured_card_gofundme_label', title: 'Featured Card – GoFundMe Label', type: 'string'},
      {name: 'featured_card_gofundme_url', title: 'Featured Card – GoFundMe URL', type: 'string'},
    ],
  },
  {
    name: 'event',
    title: 'Event',
    type: 'document',
    icon: () => '🎟️',
    fields: [
      {name: 'title', title: 'Event Title', type: 'string', validation: (R: any) => R.required()},
      {name: 'date', title: 'Date', type: 'date', options: {dateFormat: 'MMMM D, YYYY'}, validation: (R: any) => R.required()},
      {name: 'date_label', title: 'Date Display Label', type: 'string'},
      {name: 'time_label', title: 'Time', type: 'string'},
      {name: 'location', title: 'Location', type: 'string'},
      {name: 'description', title: 'Description', type: 'text', rows: 5},
      {name: 'image', title: 'Event Image', type: 'image', options: {hotspot: true}},
      {name: 'image_alt', title: 'Image Alt Text', type: 'string'},
      {name: 'ticket_url', title: 'Ticket / Registration URL', type: 'string'},
      {name: 'ticket_label', title: 'Ticket Button Label', type: 'string'},
      {name: 'published', title: 'Show on website', type: 'boolean', description: 'On = visible on the site. Remember to also click the green Publish button (bottom right) to save your changes.', initialValue: true},
      {name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false},
      {name: 'past', title: 'Past Event', type: 'boolean', initialValue: false},
    ],
    preview: {
      select: {title: 'title', subtitle: 'date', published: 'published', featured: 'featured'},
      prepare({title, subtitle, published, featured}: any) {
        const flags = [published ? '✅ Published' : '🚫 Hidden', featured ? '⭐ Featured' : ''].filter(Boolean).join(' · ')
        return {title, subtitle: `${subtitle || ''} — ${flags}`}
      },
    },
  },

  // ── Gallery & Sponsored Family ───────────────────────────────────────────────
  {
    name: 'gallery_settings',
    title: 'Gallery – Page Settings',
    type: 'document',
    icon: () => '🖼️',
    fields: [
      {name: 'title', title: 'Page Title', type: 'string'},
      {name: 'intro', title: 'Intro Text', type: 'text', rows: 3},
      {name: 'highlights_heading', title: 'Highlights Section Heading', type: 'string'},
      {name: 'highlights_intro', title: 'Highlights Intro Text', type: 'text', rows: 2},
    ],
  },
  {
    name: 'gallery_image',
    title: 'Gallery Image',
    type: 'document',
    icon: () => '📸',
    description: 'A photo shown in the Event Highlights grid.',
    fields: [
      {name: 'title', title: 'Title', type: 'string', validation: (R: any) => R.required()},
      {name: 'caption', title: 'Caption', type: 'string'},
      {name: 'photo', title: 'Photo (upload)', type: 'image', options: {hotspot: true}, description: 'Upload a photo. Takes priority over the URL below.'},
      {name: 'image', title: 'Image URL (legacy / fallback)', type: 'string', description: 'Optional. Used only if no photo is uploaded above. e.g. /images/photo.jpg'},
      {name: 'image_alt', title: 'Image Alt Text', type: 'string'},
      {name: 'order', title: 'Sort Order', type: 'number', description: 'Lower numbers appear first.', initialValue: 99},
      {name: 'published', title: 'Published', type: 'boolean', initialValue: true},
    ],
    preview: {
      select: {title: 'title', subtitle: 'caption', order: 'order', published: 'published', media: 'photo'},
      prepare({title, subtitle, order, published, media}: any) {
        return {title: `${order ?? 99}. ${title}`, subtitle: published ? subtitle || '' : '🚫 Hidden', media}
      },
    },
  },
  {
    name: 'spotlight',
    title: 'Sponsored Family',
    type: 'document',
    icon: () => '💛',
    fields: [
      {name: 'title', title: 'Family / Story Title', type: 'string', validation: (R: any) => R.required()},
      {name: 'photo', title: 'Photo (upload)', type: 'image', options: {hotspot: true}, description: 'Upload a photo. Takes priority over the URL below.'},
      {name: 'image', title: 'Photo URL (legacy / fallback)', type: 'string', description: 'Optional. Used only if no photo is uploaded above. e.g. /images/photo.jpg'},
      {name: 'image_alt', title: 'Image Alt Text', type: 'string'},
      {name: 'body_1', title: 'Paragraph 1', type: 'text', rows: 4},
      {name: 'body_2', title: 'Paragraph 2', type: 'text', rows: 4},
      {name: 'body_3', title: 'Paragraph 3 (before link)', type: 'text', rows: 3},
      {name: 'gofundme_url', title: 'GoFundMe / Donation URL', type: 'string'},
      {name: 'gofundme_label', title: 'Donation Link Label', type: 'string'},
      {name: 'body_4', title: 'Paragraph 4 (optional closing)', type: 'text', rows: 3},
    ],
  },

  // ── Ways to Help / Contact ───────────────────────────────────────────────────
  {
    name: 'support',
    title: 'Homepage – Ways to Help',
    type: 'document',
    icon: () => '💛',
    fields: [
      {name: 'heading', title: 'Section Heading', type: 'string'},
      {name: 'intro', title: 'Intro Text', type: 'text', rows: 3},
      {name: 'bullet_1', title: 'Bullet 1', type: 'string'},
      {name: 'bullet_2', title: 'Bullet 2', type: 'string'},
      {name: 'bullet_3', title: 'Bullet 3', type: 'string'},
      {name: 'bullet_4', title: 'Bullet 4', type: 'string'},
      {name: 'card_title', title: 'Card – Title', type: 'string'},
      {name: 'card_body', title: 'Card – Body', type: 'text', rows: 3},
      {name: 'card_link_label', title: 'Card – Link Label', type: 'string'},
      {name: 'card_link_url', title: 'Card – Link URL', type: 'string'},
    ],
  },
  {
    name: 'contact',
    title: 'Contact',
    type: 'document',
    icon: () => '📧',
    fields: [
      {name: 'heading', title: 'Section Heading', type: 'string'},
      {name: 'intro', title: 'Intro Text', type: 'text', rows: 3},
      {name: 'email', title: 'Email Address', type: 'string'},
      {name: 'phone', title: 'Phone Number', type: 'string'},
      {name: 'facebook', title: 'Facebook URL', type: 'string'},
      {name: 'instagram', title: 'Instagram URL', type: 'string'},
      {name: 'linkedin', title: 'LinkedIn URL', type: 'string'},
      {name: 'mailing_name', title: 'Mailing Name', type: 'string'},
      {name: 'mailing_street', title: 'Mailing Street', type: 'string'},
      {name: 'mailing_city', title: 'Mailing City / State / ZIP', type: 'string'},
      {name: 'hubspot_form_id', title: 'HubSpot Form ID', type: 'string', description: 'The form GUID from HubSpot (Marketing → Forms → Share → Embed). Leave blank to keep the current default form.'},
      {name: 'hubspot_portal_id', title: 'HubSpot Portal ID (advanced)', type: 'string', description: 'Only change if using a different HubSpot account. Defaults to 244584127.'},
      {name: 'hubspot_region', title: 'HubSpot Region (advanced)', type: 'string', description: 'e.g. na2. Defaults to na2.'},
    ],
  },

  // ── Get Involved ─────────────────────────────────────────────────────────────
  {
    name: 'donate',
    title: 'Donate Page',
    type: 'document',
    icon: () => '❤️',
    fields: [
      {name: 'heading', title: 'Hero Heading', type: 'string'},
      {name: 'subheading', title: 'Hero Subheading', type: 'text', rows: 3},
      {name: 'button_text', title: 'Donate Button Text', type: 'string'},
      {name: 'button_url', title: 'Donate Button URL', type: 'string', description: 'e.g. your Venmo link. A Venmo hint shows automatically for venmo.com URLs.'},
      {name: 'mail_address', title: 'Donate by Mail – Address', type: 'text', rows: 2},
      {name: 'sponsor_cta', title: 'Sponsorship Call-to-Action', type: 'text', rows: 2},
      {name: 'newsletter_heading', title: 'Newsletter – Heading', type: 'string'},
      {name: 'newsletter_body', title: 'Newsletter – Body', type: 'text', rows: 2},
      {name: 'ein_note', title: '501(c)(3) / EIN Note', type: 'text', rows: 2},
    ],
  },
  {
    name: 'donation',
    title: 'Donate Button (global)',
    type: 'document',
    icon: () => '💰',
    description: 'Label and URL for the site-wide donate button.',
    fields: [
      {name: 'url', title: 'Donation URL', type: 'string', validation: (R: any) => R.required()},
      {name: 'label', title: 'Button Label', type: 'string', validation: (R: any) => R.required()},
    ],
  },
  {
    name: 'volunteer',
    title: 'Volunteer Page',
    type: 'document',
    icon: () => '🙋',
    fields: [
      {name: 'heading', title: 'Hero Heading', type: 'string'},
      {name: 'subheading', title: 'Hero Subheading', type: 'text', rows: 3},
      {name: 'form_heading', title: 'Form Heading', type: 'string'},
      {name: 'form_intro', title: 'Form Intro', type: 'text', rows: 2},
      {name: 'form_button', title: 'Form Button Label', type: 'string'},
      {name: 'roles', title: 'Volunteer Roles', type: 'array', of: [{type: 'string'}]},
      {name: 'hubspot_form_id', title: 'HubSpot Form ID', type: 'string', description: 'The form GUID from HubSpot (Marketing → Forms → Share → Embed). Leave blank to keep the current default form.'},
      {name: 'hubspot_portal_id', title: 'HubSpot Portal ID (advanced)', type: 'string', description: 'Only change if using a different HubSpot account. Defaults to 244584127.'},
      {name: 'hubspot_region', title: 'HubSpot Region (advanced)', type: 'string', description: 'e.g. na2. Defaults to na2.'},
    ],
  },
  {
    name: 'sponsor',
    title: 'Sponsor Page',
    type: 'document',
    icon: () => '🤝',
    fields: [
      {name: 'heading', title: 'Hero Heading', type: 'string'},
      {name: 'subheading', title: 'Hero Subheading', type: 'text', rows: 3},
      {name: 'tiers_intro', title: 'Tiers Intro', type: 'text', rows: 2},
      {
        name: 'tiers',
        title: 'Sponsorship Tiers',
        type: 'array',
        of: [
          {
            type: 'object',
            preview: {select: {title: 'name', subtitle: 'amount'}},
            fields: [
              {name: 'name', title: 'Tier Name', type: 'string', validation: (R: any) => R.required()},
              {name: 'amount', title: 'Amount', type: 'string'},
              {name: 'perks', title: 'Perks', type: 'text', rows: 2},
            ],
          },
        ],
      },
      {name: 'form_heading', title: 'Form Heading', type: 'string'},
      {name: 'form_intro', title: 'Form Intro', type: 'text', rows: 2},
      {name: 'form_button', title: 'Form Button Label', type: 'string'},
      {name: 'hubspot_form_id', title: 'HubSpot Form ID', type: 'string', description: 'The form GUID from HubSpot (Marketing → Forms → Share → Embed). Leave blank to keep the current default form.'},
      {name: 'hubspot_portal_id', title: 'HubSpot Portal ID (advanced)', type: 'string', description: 'Only change if using a different HubSpot account. Defaults to 244584127.'},
      {name: 'hubspot_region', title: 'HubSpot Region (advanced)', type: 'string', description: 'e.g. na2. Defaults to na2.'},
    ],
  },
  {
    name: 'thank_you',
    title: 'Thank You Page',
    type: 'document',
    icon: () => '🙏',
    fields: [
      {name: 'heading', title: 'Heading', type: 'string'},
      {name: 'body', title: 'Body', type: 'text', rows: 3},
      {name: 'back_label', title: 'Back Button Label', type: 'string'},
      {name: 'back_url', title: 'Back Button URL', type: 'string'},
    ],
  },

  // ── Team ─────────────────────────────────────────────────────────────────────
  {
    name: 'board',
    title: 'Team – Board Members',
    type: 'document',
    icon: () => '👥',
    fields: [
      {
        name: 'members',
        title: 'Board Members',
        type: 'array',
        of: [
          {
            type: 'object',
            preview: {select: {title: 'name', subtitle: 'title', media: 'photo'}},
            fields: [
              {name: 'name', title: 'Full Name', type: 'string', validation: (R: any) => R.required()},
              {name: 'title', title: 'Title / Role', type: 'string'},
              {name: 'photo', title: 'Photo (upload)', type: 'image', options: {hotspot: true}, description: 'Upload a photo. Takes priority over the URL below.'},
              {name: 'image', title: 'Photo URL (legacy / fallback)', type: 'string', description: 'Optional. Used only if no photo is uploaded above.'},
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'staff',
    title: 'Team – Staff & Partners',
    type: 'document',
    icon: () => '🌟',
    fields: [
      {
        name: 'members',
        title: 'Staff & Partners',
        type: 'array',
        of: [
          {
            type: 'object',
            preview: {select: {title: 'name', subtitle: 'title', media: 'photo'}},
            fields: [
              {name: 'name', title: 'Full Name', type: 'string', validation: (R: any) => R.required()},
              {name: 'title', title: 'Title / Role', type: 'string'},
              {name: 'photo', title: 'Photo (upload)', type: 'image', options: {hotspot: true}, description: 'Upload a photo. Takes priority over the URL below.'},
              {name: 'image', title: 'Photo URL (legacy / fallback)', type: 'string', description: 'Optional. Used only if no photo is uploaded above.'},
            ],
          },
        ],
      },
    ],
  },
]
