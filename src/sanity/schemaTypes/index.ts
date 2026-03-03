import { SchemaTypeDefinition } from 'sanity'
import experience from './experience'
import post from './post'
import project from './project'
import cv from './cv'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [experience,project,post,cv],
}