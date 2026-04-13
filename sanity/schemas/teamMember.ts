import { defineField, defineType } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (rule) => rule.required() }),
    defineField({ name: 'role', title: 'Role / Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'credentials', title: 'Credentials', type: 'string', description: 'e.g. PhD, LCSW, CEDS' }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Biography', type: 'text', rows: 5 }),
    defineField({
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Anxiety & Depression',
          'Eating Disorders',
          'Trauma & PTSD',
          'OCD',
          'Family Therapy',
          'Adolescent Mental Health',
          'Substance Use',
          'Grief & Loss',
        ],
      },
    }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
})
