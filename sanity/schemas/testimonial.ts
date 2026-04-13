import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: 'patientName', title: 'First Name', type: 'string', description: 'First name only for privacy', validation: (rule) => rule.required() }),
    defineField({ name: 'patientContext', title: 'Context', type: 'string', description: 'e.g. "Recovery journey, 18 months"' }),
    defineField({ name: 'rating', title: 'Rating (1–5)', type: 'number', validation: (rule) => rule.min(1).max(5) }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'patientName', subtitle: 'quote' },
  },
})
