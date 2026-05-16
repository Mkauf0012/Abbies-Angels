import {SchemaTypeDefinition} from 'sanity'

export const schemaTypes: SchemaTypeDefinition[] = [
  // ─────────────────────────────────────────────
  // HOMEPAGE
  // ─────────────────────────────────────────────
  {
    name: 'hero',
    title: 'Homepage – Hero',
    type: 'document',
    icon: () => '🏠',
    fields: [
      { name: 'headline', title: 'Headline', type: 'string', validation: (R: any) => R.required() },
      { name: 'subheadline', title: 'Subheadline', type: 'text', rows: 3 },
      { name: 'cta_primary_text', title: 'Primary Button Text', type: 'string' },
      { name: 'cta_primary_link', title: 'Primary Button Link', type: 'string' },
      { name: 'cta_secondary_text', title: 'Secondary Button Text', type: 'string' },
      { name: 'cta_secondary_link', title: 'Secondary Button Link', type: 'string' },
      { name: 'hero_meta', title: 'Meta Text', type: 'text', rows: 2 },
    ],
  },
  {
    name: 'hero_card',
    title: 'Homepage – Hero Card (Manual Override)',
    type: 'document',
    icon: () => '📌',
    description: 'Only used if no Event has "Featured on Homepage" checked.',
    fields: [
      { name: 'title', title: 'Event Title', type: 'string' },
      { name: 'date_label', title: 'Date', type: 'string' },
      { name: 'time_label', title: 'Time', type: 'string' },
      { name: 'location_label', title: 'Location', type: 'string' },
      { name: 'description', title: 'Description', type: 'text', rows: 3 },
      { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
      { name: 'image_alt', title: 'Image Alt Text', type: 'string' },
      { name: 'ticket_url', title: 'Ticket URL', type: 'string' },
    ],
  },
  {
    name: 'mission',
    title: 'Homepage – Mission',
    type: 'document',
    icon: () => '💜',
    fields: [
      { name: 'heading', title: 'Heading', type: 'string' },
      { name: 'body_1', title: 'Body Paragraph 1', type: 'text', rows: 4 },
      { name: 'body_2', title: 'Body Paragraph 2', type: 'text', rows: 4 },
    ],
  },
  {
    name: 'what_we_do',
    title: 'Homepage – What We Do',
    type: 'document',
    icon: () => '🤝',
    fields: [
      { name: 'heading', title: 'Section Heading', type: 'string' },
      { name: 'card_1_title', title: 'Card 1 – Title', type: 'string' },
      { name: 'card_1_body', title: 'Card 1 – Body', type: 'text', rows: 3 },
      { name: 'card_2_title', title: 'Card 2 – Title', type: 'string' },
      { name: 'card_2_body', title: 'Card 2 – Body', type: 'text', rows: 3 },
      { name: 'card_3_title', title: 'Card 3 – Title', type: 'string' },
      { name: 'card_3_body', title: 'Card 3 – Body', type: 'text', rows: 3 },
    ],
  },

  // ─────────────────────────────────────────────
  // EVENTS
  // ─────────────────────────────────────────────
  {
    name: 'event',
    title: 'Event',
    type: 'document',
    icon: () => '🎟️',
    fields: [
      { name: 'title', title: 'Event Title', type: 'string', validation: (R: any) => R.required() },
      { name: 'date', title: 'Date', type: 'date', options: { dateFormat: 'MMMM D, YYYY' }, validation: (R: any) => R.required() },
      { name: 'date_label', title: 'Date Display Label', type: 'string' },
      { name: 'time_label', title: 'Time', type: 'string' },
      { name: 'location', title: 'Location', type: 'string' },
      { name: 'description', title: 'Description', type: 'text', rows: 5 },
      { name: 'image', title: 'Event Image', type: 'image', options: { hotspot: true } },
      { name: 'image_alt', title: 'Image Alt Text', type: 'string' },
      { name: 'ticket_url', title: 'Ticket / Registration URL', type: 'string', description: 'Auctria or external ticketing link' },
      { name: 'ticket_label', title: 'Ticket Button Label', type: 'string' },
      { name: 'published', title: 'Published', type: 'boolean', initialValue: false },
      { name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false },
      {
        name: 'past',
        title: 'Past Event',
        type: 'boolean',
        initialValue: false,
        description: 'Check this to move the event to the Past Events section on the events page.',
      },
    ],
    preview: {
      select: { title: 'title', subtitle: 'date', published: 'published', featured: 'featured', past: 'past' },
      prepare({ title, subtitle, published, featured, past }: any) {
        const flags = [
          past ? '🕐 Past' : (published ? '✅ Published' : '🚫 Hidden'),
          featured ? '⭐ Featured' : '',
        ].filter(Boolean).join(' · ')
        return { title, subtitle: `${subtitle || ''} — ${flags}` }
      },
    },
  },
  {
    name: 'events',
    title: 'Events – Page Settings',
    type: 'document',
    icon: () => '⚙️',
    fields: [
      { name: 'heading', title: 'Page Heading', type: 'string' },
      { name: 'intro', title: 'Intro Text', type: 'text', rows: 3 },
      { name: 'footer_note', title: 'Footer Note', type: 'text', rows: 2 },
      { name: 'view_all_label', title: 'View All Button Label', type: 'string' },
    ],
  },

  // ─────────────────────────────────────────────
  // GALLERY
  // ─────────────────────────────────────────────
  {
    name: 'gallery_settings',
    title: 'Gallery – Page Settings',
    type: 'document',
    icon: () => '🖼️',
    fields: [
      { name: 'title', title: 'Page Title', type: 'string' },
      { name: 'intro', title: 'Intro Text', type: 'text', rows: 3 },
      { name: 'highlights_heading', title: 'Highlights Section Heading', type: 'string' },
      { name: 'highlights_intro', title: 'Highlights Intro Text', type: 'text', rows: 2 },
      { name: 'spotlight_heading', title: 'Spotlight Section Heading', type: 'string' },
      { name: 'spotlight_intro', title: 'Spotlight Intro Text', type: 'text', rows: 2 },
    ],
  },
  {
    name: 'gallery_image',
    title: 'Gallery Image',
    type: 'document',
    icon: () => '📸',
    description: 'A photo shown in the Event Highlights grid.',
    fields: [
      { name: 'title', title: 'Title', type: 'string', validation: (R: any) => R.required() },
      { name: 'caption', title: 'Caption', type: 'string' },
      { name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, description: 'Upload image asset via Sanity (preferred) or use the URL field below.' },
      { name: 'image_url', title: 'Image URL (fallback)', type: 'string', description: 'Only if not uploading via Sanity asset — e.g. /images/photo.jpg' },
      { name: 'image_alt', title: 'Image Alt Text', type: 'string' },
      { name: 'order', title: 'Sort Order', type: 'number', description: 'Lower numbers appear first.', initialValue: 99 },
      { name: 'published', title: 'Published', type: 'boolean', initialValue: true },
    ],
    preview: {
      select: { title: 'title', subtitle: 'caption', order: 'order', published: 'published' },
      prepare({ title, subtitle, order, published }: any) {
        return { title: `${order ?? 99}. ${title}`, subtitle: published ? (subtitle || '') : '🚫 Hidden' }
      },
    },
  },
  {
    name: 'spotlight',
    title: 'Gallery – Family Spotlight',
    type: 'document',
    icon: () => '❤️',
    fields: [
      { name: 'title', title: 'Family / Story Title', type: 'string', validation: (R: any) => R.required() },
      { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } },
      { name: 'image_alt', title: 'Image Alt Text', type: 'string' },
      { name: 'body_1', title: 'Paragraph 1', type: 'text', rows: 4 },
      { name: 'body_2', title: 'Paragraph 2', type: 'text', rows: 4 },
      { name: 'body_3', title: 'Paragraph 3 (before link)', type: 'text', rows: 3 },
      { name: 'gofundme_url', title: 'GoFundMe / Donation URL', type: 'string' },
      { name: 'gofundme_label', title: 'Donation Link Label', type: 'string' },
      { name: 'body_4', title: 'Paragraph 4 (optional closing)', type: 'text', rows: 3 },
    ],
  },

  // ─────────────────────────────────────────────
  // WAYS TO HELP / SUPPORT
  // ─────────────────────────────────────────────
  {
    name: 'support',
    title: 'Ways to Help',
    type: 'document',
    icon: () => '💛',
    fields: [
      { name: 'heading', title: 'Section Heading', type: 'string' },
      { name: 'intro', title: 'Intro Text', type: 'text', rows: 3 },
      { name: 'bullet_1', title: 'Bullet 1', type: 'string' },
      { name: 'bullet_2', title: 'Bullet 2', type: 'string' },
      { name: 'bullet_3', title: 'Bullet 3', type: 'string' },
      { name: 'bullet_4', title: 'Bullet 4', type: 'string' },
      { name: 'card_title', title: 'Card – Title', type: 'string' },
      { name: 'card_body', title: 'Card – Body', type: 'text', rows: 3 },
      { name: 'card_link_label', title: 'Card – Link Label', type: 'string' },
      { name: 'card_link_url', title: 'Card – Link URL (Auctria)', type: 'string', description: 'Auctria donate/auction link used across the site' },
    ],
  },

  // ─────────────────────────────────────────────
  // DONATE PAGE
  // ─────────────────────────────────────────────
  {
    name: 'donate',
    title: 'Donate – Page',
    type: 'document',
    icon: () => '❤️',
    fields: [
      { name: 'hero_heading', title: 'Hero Heading', type: 'string', initialValue: 'Make a Difference Today' },
      { name: 'hero_subheading', title: 'Hero Subheading', type: 'text', rows: 2, initialValue: 'Every dollar supports caregivers and families navigating Alzheimer\'s disease in Western New York.' },
      {
        name: 'online_section',
        title: 'Donate Online Section',
        type: 'object',
        fields: [
          { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Donate Online' },
          { name: 'body', title: 'Body Text', type: 'text', rows: 3, initialValue: 'All donations are processed securely through our Auctria giving page. Abbie\'s Angels is a registered 501(c)(3) — your gift is tax-deductible.' },
          { name: 'button_label', title: 'Button Label', type: 'string', initialValue: '❤️ Give Now on Auctria' },
          { name: 'button_url', title: 'Button URL (Auctria)', type: 'string', description: 'Overrides the global Auctria URL from Ways to Help if set' },
          { name: 'ein_note', title: 'EIN / Legal Note', type: 'string', initialValue: 'EIN: 33-2629458 • 501(c)(3) Nonprofit • Lockport, NY' },
        ],
      },
      {
        name: 'impact_section',
        title: 'Your Impact Section',
        type: 'object',
        fields: [
          { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Your Impact' },
          {
            name: 'stats',
            title: 'Impact Stats',
            type: 'array',
            of: [{
              type: 'object',
              preview: { select: { title: 'stat', subtitle: 'description' } },
              fields: [
                { name: 'stat', title: 'Stat (e.g. 100%)', type: 'string' },
                { name: 'description', title: 'Description', type: 'string' },
              ],
            }],
          },
        ],
      },
      {
        name: 'mail_section',
        title: 'Donate by Mail Section',
        type: 'object',
        fields: [
          { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Donate by Mail' },
          { name: 'payable_to', title: 'Make Checks Payable To', type: 'string', initialValue: 'Abbie\'s Angels' },
          { name: 'address_line1', title: 'Address Line 1', type: 'string', initialValue: 'PO Box 123' },
          { name: 'address_line2', title: 'Address Line 2 (City/State/ZIP)', type: 'string', initialValue: 'Lockport, NY 14094' },
          { name: 'note', title: 'Additional Note', type: 'text', rows: 2, initialValue: 'Please include your name and mailing address so we can send a thank-you and donation receipt.' },
        ],
      },
      {
        name: 'sponsor_cta',
        title: 'Corporate Sponsorship CTA',
        type: 'object',
        fields: [
          { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Corporate & Event Sponsorship' },
          { name: 'body', title: 'Body Text', type: 'text', rows: 3, initialValue: 'Sponsoring an Abbie\'s Angels event is a meaningful way for your business to give back while gaining visibility in the community. We offer tiered sponsorship packages for all of our annual events.' },
          { name: 'button_label', title: 'Button Label', type: 'string', initialValue: 'View Sponsorship Opportunities →' },
        ],
      },
      {
        name: 'newsletter_section',
        title: 'Stay in the Loop Section',
        type: 'object',
        fields: [
          { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Stay in the Loop' },
          { name: 'body', title: 'Body Text', type: 'text', rows: 2, initialValue: 'Leave your email and we\'ll keep you updated on events, campaigns, and impact stories.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // VOLUNTEER PAGE
  // ─────────────────────────────────────────────
  {
    name: 'volunteer',
    title: 'Volunteer – Page',
    type: 'document',
    icon: () => '🙋',
    fields: [
      { name: 'hero_heading', title: 'Hero Heading', type: 'string', initialValue: 'Volunteer With Us' },
      { name: 'hero_subheading', title: 'Hero Subheading', type: 'text', rows: 2, initialValue: 'Abbie\'s Angels runs entirely on volunteer power. Whether you can help at an event or behind the scenes, there\'s a place for you.' },
      {
        name: 'roles_section',
        title: 'Ways to Volunteer Section',
        type: 'object',
        fields: [
          { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Ways to Volunteer' },
          {
            name: 'roles',
            title: 'Volunteer Roles',
            type: 'array',
            description: 'Each chip shown in the grid (emoji + label)',
            of: [{ type: 'string' }],
            initialValue: [
              '🎪 Event Setup & Teardown',
              '🎟 Ticket & Check-In',
              '📸 Photography',
              '📱 Social Media',
              '🍽 Food & Beverage',
              '📦 Auction Support',
              '🧾 Admin & Office',
              '💬 Community Outreach',
            ],
          },
        ],
      },
      {
        name: 'form_section',
        title: 'Volunteer Interest Form Section',
        type: 'object',
        fields: [
          { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Volunteer Interest Form' },
          { name: 'intro', title: 'Intro Text', type: 'text', rows: 2, initialValue: 'Tell us a little about yourself and we\'ll reach out when opportunities match your interests.' },
          { name: 'submit_label', title: 'Submit Button Label', type: 'string', initialValue: 'Submit Interest Form' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // SPONSOR PAGE
  // ─────────────────────────────────────────────
  {
    name: 'sponsor',
    title: 'Sponsor – Page',
    type: 'document',
    icon: () => '🤝',
    fields: [
      { name: 'hero_heading', title: 'Hero Heading', type: 'string', initialValue: 'Become a Sponsor' },
      { name: 'hero_subheading', title: 'Hero Subheading', type: 'text', rows: 2, initialValue: 'Partner with Abbie\'s Angels to support caregivers in Western New York while connecting your brand to a cause that matters.' },
      {
        name: 'tiers_section',
        title: 'Sponsorship Tiers Section',
        type: 'object',
        fields: [
          { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Sponsorship Tiers' },
          { name: 'intro', title: 'Intro Text', type: 'text', rows: 2, initialValue: 'All sponsors receive recognition at our events and on our website. Higher tiers include additional visibility and benefits.' },
          {
            name: 'tiers',
            title: 'Tiers',
            type: 'array',
            of: [{
              type: 'object',
              preview: { select: { title: 'name', subtitle: 'amount' } },
              fields: [
                { name: 'name', title: 'Tier Name (e.g. 🥇 Gold Sponsor)', type: 'string' },
                { name: 'amount', title: 'Amount (e.g. $2,500+)', type: 'string' },
                { name: 'style', title: 'Style Class', type: 'string', description: 'gold | silver | bronze | friend', options: { list: ['gold','silver','bronze','friend'] } },
                {
                  name: 'perks',
                  title: 'Perks / Benefits',
                  type: 'array',
                  of: [{ type: 'string' }],
                },
              ],
            }],
          },
        ],
      },
      {
        name: 'inquiry_section',
        title: 'Sponsorship Inquiry Form Section',
        type: 'object',
        fields: [
          { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Sponsorship Inquiry' },
          { name: 'intro', title: 'Intro Text', type: 'text', rows: 2, initialValue: 'Interested in sponsoring? Fill out the form below and we\'ll reach out within 2 business days with a full sponsorship packet.' },
          { name: 'submit_label', title: 'Submit Button Label', type: 'string', initialValue: 'Request Sponsorship Packet' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // THANK YOU PAGE
  // ─────────────────────────────────────────────
  {
    name: 'thank_you',
    title: 'Thank You – Page',
    type: 'document',
    icon: () => '🎉',
    fields: [
      { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Thank You!' },
      { name: 'body', title: 'Body Text', type: 'text', rows: 3, initialValue: 'We received your message and will be in touch soon. We appreciate your support of Abbie\'s Angels.' },
      { name: 'back_label', title: 'Back Link Label', type: 'string', initialValue: '← Back to Home' },
      { name: 'back_url', title: 'Back Link URL', type: 'string', initialValue: '/' },
    ],
  },

  // ─────────────────────────────────────────────
  // CONTACT
  // ─────────────────────────────────────────────
  {
    name: 'contact',
    title: 'Contact',
    type: 'document',
    icon: () => '📧',
    fields: [
      { name: 'heading', title: 'Section Heading', type: 'string' },
      { name: 'intro', title: 'Intro Text', type: 'text', rows: 3 },
      { name: 'email', title: 'Email Address', type: 'string' },
      { name: 'phone', title: 'Phone Number', type: 'string' },
      { name: 'facebook', title: 'Facebook URL', type: 'string' },
      { name: 'instagram', title: 'Instagram URL', type: 'string' },
      { name: 'linkedin', title: 'LinkedIn URL', type: 'string' },
      { name: 'mailing_name', title: 'Mailing Name', type: 'string' },
      { name: 'mailing_street', title: 'Mailing Street', type: 'string' },
      { name: 'mailing_city', title: 'Mailing City / State / ZIP', type: 'string' },
    ],
  },

  // ─────────────────────────────────────────────
  // GLOBAL
  // ─────────────────────────────────────────────
  {
    name: 'donation',
    title: 'Donation Button',
    type: 'document',
    icon: () => '💰',
    fields: [
      { name: 'url', title: 'Donation URL (Auctria)', type: 'string', validation: (R: any) => R.required(), description: 'Primary Auctria link used site-wide' },
      { name: 'label', title: 'Button Label', type: 'string', validation: (R: any) => R.required() },
    ],
  },

  // ─────────────────────────────────────────────
  // TEAM
  // ─────────────────────────────────────────────
  {
    name: 'board',
    title: 'Team – Board Members',
    type: 'document',
    icon: () => '👥',
    fields: [
      {
        name: 'members', title: 'Board Members', type: 'array',
        of: [{
          type: 'object',
          preview: { select: { title: 'name', subtitle: 'title' } },
          fields: [
            { name: 'name', title: 'Full Name', type: 'string', validation: (R: any) => R.required() },
            { name: 'title', title: 'Title / Role', type: 'string' },
            { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } },
          ],
        }],
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
        name: 'members', title: 'Staff & Partners', type: 'array',
        of: [{
          type: 'object',
          preview: { select: { title: 'name', subtitle: 'title' } },
          fields: [
            { name: 'name', title: 'Full Name', type: 'string', validation: (R: any) => R.required() },
            { name: 'title', title: 'Title / Role', type: 'string' },
            { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } },
          ],
        }],
      },
    ],
  },
]
