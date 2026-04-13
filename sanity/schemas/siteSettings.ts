import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string', initialValue: 'Clarity Health' }),
    defineField({ name: 'siteDescription', title: 'Site Description', type: 'text', rows: 2 }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'nav',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'URL', type: 'string' },
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
    }),
    defineField({
      name: 'footerCta',
      title: 'Footer CTA',
      type: 'object',
      fields: [
        { name: 'headline', title: 'Headline', type: 'string' },
        { name: 'body', title: 'Body Text', type: 'text', rows: 2 },
        { name: 'buttonLabel', title: 'Button Label', type: 'string' },
        { name: 'buttonHref', title: 'Button URL', type: 'string' },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'twitter', title: 'Twitter / X', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: { title: 'siteName' },
  },
})
