import { defineField, defineType } from 'sanity'

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Items',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Getting Started', 'Treatment', 'Insurance', 'Technology', 'Privacy'],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Category + Order', name: 'categoryOrder', by: [{ field: 'category', direction: 'asc' }, { field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'question', subtitle: 'category' },
  },
})
