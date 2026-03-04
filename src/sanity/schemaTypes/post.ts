
import { defineField, defineType } from 'sanity'

interface CodeBlockPreviewSelection {
  subtitle?: string
  title?: string
}

interface CalloutPreviewSelection {
  title?: string
}

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string', 
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Shown on the card and as the subtitle on the detail page',
      validation: (Rule) => Rule.required().max(200),
    }),

    
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  }),
                  defineField({
                    name: 'openInNewTab',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  }),
                ],
              },
            ],
          },
        },
        
        {
          type: 'object',
          name: 'codeBlock',
          title: 'Code Block',
          fields: [
            defineField({
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: [
                  { title: 'TypeScript', value: 'ts' },
                  { title: 'JavaScript', value: 'js' },
                  { title: 'TSX', value: 'tsx' },
                  { title: 'JSX', value: 'jsx' },
                  { title: 'Bash', value: 'bash' },
                  { title: 'JSON', value: 'json' },
                  { title: 'CSS', value: 'css' },
                  { title: 'HTML', value: 'html' },
                ],
              },
              initialValue: 'ts',
            }),
            defineField({
              name: 'code',
              title: 'Code',
              type: 'text',
            }),
          ],
          preview: {
            select: { title: 'language', subtitle: 'code' },
            prepare({ title, subtitle }: CodeBlockPreviewSelection) {
              return { title: `Code — ${title}`, subtitle }
            },
          },
        },
        
        {
          type: 'object',
          name: 'callout',
          title: 'Callout',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
            }),
          ],
          preview: {
            select: { title: 'text' },
            prepare({ title }: CalloutPreviewSelection) {
              return { title: `💡 ${title}` }
            },
          },
        },
      ],
    }),

    
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Defaults to post title if empty',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Defaults to excerpt if empty',
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'ogImage',
          title: 'OG Image',
          type: 'image',
          description: 'Defaults to cover image if empty',
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})
