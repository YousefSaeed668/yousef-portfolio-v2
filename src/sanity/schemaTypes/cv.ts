import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'cv',
  title: 'CV',
  type: 'document',
  fields: [
    defineField({
      name: 'file',
      title: 'CV PDF File',
      type: 'file',
      options: { accept: '.pdf' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      description: 'When was this CV version uploaded?',
    }),
  ],
  preview: {
    select: { updatedAt: 'updatedAt' },
    prepare({ updatedAt }) {
      return {
        title: 'CV / Resume',
        subtitle: updatedAt
          ? `Updated ${new Date(updatedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
          : 'No date set',
      }
    },
  },
})