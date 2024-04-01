import { sql } from 'drizzle-orm'
import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
  real,
} from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
})

export type User = typeof users.$inferSelect

export type UserInsert = typeof users.$inferInsert

export const colors = sqliteTable('colors', {
  id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
  name: text('name').notNull(),
  hexCode: text('hexCode').notNull(),
})

export type Color = typeof colors.$inferSelect

export const manufacturers = sqliteTable('manufacturers', {
  id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
  name: text('name').notNull(),
  country: text('country').notNull(),
})

export type Manufacurer = typeof manufacturers.$inferSelect

export const products = sqliteTable(
  'products',
  {
    slug: text('slug').primaryKey().notNull(),
    name: text('name').notNull(),
    price: real('price').notNull(),
    currency: text('currency').notNull(),
    createdAt: integer('createdAt')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),

    quantity: real('quantity').notNull(),
    quantityUnitType: text('quantityUnitType').notNull(),
    weightGrams: real('weightGrams').notNull(),

    colorId: integer('colorId')
      .notNull()
      .references(() => colors.id),
    manufacturerId: integer('manufacturerId')
      .notNull()
      .references(() => manufacturers.id),
    model: text('model').notNull(),
    content: text('content').notNull(),
    numFibers: integer('fiberQuantity').notNull(),
    metersPer100gPer1Fiber: integer('metersPer100gPer1Fiber').notNull(),
    metersPer100gPerAllFibers: integer('metersPer100gPerAllFibers').notNull(),
  },
  (table) => ({
    slugIndex: uniqueIndex('slugIndex').on(table.slug),
    nameIndex: uniqueIndex('nameIndex').on(table.name),
  }),
)

export type Product = typeof products.$inferSelect

export type ProductInsert = typeof products.$inferInsert
