// Run with: node scripts/migrate-gallery.mjs
// Requires SANITY_TOKEN env var with write access
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '7o31gm3n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const gallerySettings = {
  _id: 'gallery_settings',
  _type: 'gallery_settings',
  title: 'Gallery & Family Spotlight',
  intro: 'Moments of joy, courage, and community with Abbie, her family, and the caregivers Abbie\'s Angels walks alongside.',
  highlights_heading: 'Event Highlights',
  highlights_intro: 'Scenes from our gala, ice cream social, and special days on and off the field.',
  spotlight_heading: 'Family Spotlight',
  spotlight_intro: 'Each year, Abbie\'s Angels highlights a family whose story represents the courage, love, and resilience of caregivers in our community.',
}

const galleryImages = [
  { _id: 'gallery_image_1', _type: 'gallery_image', title: 'Ice Cream Social 2025', image: 'images/Ice-cream-social-2025.jpg', image_alt: "Danielle at Abbie's Angels ice cream social table with blue banner", caption: 'Danielle welcoming neighbors at our summer ice cream social with the Abbie\'s Angels table and banner.', order: 1, published: true },
  { _id: 'gallery_image_2', _type: 'gallery_image', title: 'Abbie Meets Spencer Brown', image: 'images/Abbie-and-Spencer-Brown-2025.jpg', image_alt: 'Abbie and Spencer Brown together on the field', caption: 'A special visit with Spencer Brown, celebrating Abbie and sharing Abbie\'s Angels bears.', order: 2, published: true },
  { _id: 'gallery_image_3', _type: 'gallery_image', title: 'Gala Night with Hope Rises', image: 'images/Abbie-and-Kate-2024.jpg', image_alt: 'Abbie with Kate Glazer from Hope Rises at the gala', caption: 'Abbie and Kate Glazer from Hope Rises at the 2024 Winter Gala, spreading encouragement and hope.', order: 3, published: true },
  { _id: 'gallery_image_4', _type: 'gallery_image', title: 'First Bear Exchange', image: 'images/Abbie-Josh.jpg', image_alt: 'Abbie and Josh at the first bear exchange in winter', caption: 'Abbie and Josh at their first bear exchange, marking a milestone in Abbie\'s journey.', order: 4, published: true },
  { _id: 'gallery_image_5', _type: 'gallery_image', title: 'Practice Field Reunion', image: 'images/Abbie-Josh-new-bear-exchange.jpg', image_alt: 'Abbie and Josh on the practice field with new bears', caption: 'Abbie and Josh reunited on the practice field for a second bear exchange and big smiles.', order: 5, published: true },
]

const spotlightDoc = {
  _id: 'spotlight',
  _type: 'spotlight',
  title: 'Sponsored Family \u2013 2025: The Campbell / Piedmonte Family',
  image: 'images/20251203_165805063_iOS.jpg',
  image_alt: 'Campbell / Piedmonte family supported by Abbie\'s Angels',
  body_1: "Our 2025 Gala is honoring Chelsea Campbell, 8-year-old twin to Charlotte and little sister to Carter. After weeks of being ill, Chelsea was sent to the ER on June 6, 2025 and was diagnosed with Acute Myeloid Leukemia. Her journey is long, and recent tests show her leukemia is chemo-resistant, with a bone marrow transplant scheduled for December 22.",
  body_2: "Chelsea's parents, Twan Campbell and JoAnnah Piedmonte, are walking this road alongside her. One of our board members, Laura Wexler, was blessed to be both Chelsea's and Abbie's teacher when they were babies, which makes this sponsorship especially meaningful to Abbie's Angels.",
  body_3: "To support Chelsea directly, visit her GoFundMe campaign:",
  gofundme_label: "Donate to Chelsea's Journey to Health",
  gofundme_url: "https://www.gofundme.com/f/donate-to-chelseas-journey-to-health",
  body_4: "Funds raised at the Gala also help Abbie's Angels continue supporting our wider community of caregivers facing complex medical needs.",
}

async function migrate() {
  console.log('Migrating gallery settings...')
  await client.createOrReplace(gallerySettings)

  console.log('Migrating gallery images...')
  for (const img of galleryImages) {
    await client.createOrReplace(img)
    console.log(` ✓ ${img.title}`)
  }

  console.log('Migrating spotlight...')
  await client.createOrReplace(spotlightDoc)

  console.log('\n✅ Gallery migration complete!')
}

migrate().catch(console.error)
