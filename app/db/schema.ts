import { sql } from 'drizzle-orm'
import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
  real,
} from 'drizzle-orm/sqlite-core'

export const products = sqliteTable(
  'products',
  {
    slug: text('slug').primaryKey().notNull(),
    name: text('name').notNull(),
    price: real('price').notNull(),
    createdAt: integer('createdAt')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    slugIndex: uniqueIndex('slugIndex').on(table.slug),
    nameIndex: uniqueIndex('nameIndex').on(table.name),
  }),
)

export type Product = typeof products.$inferSelect

export type ProductInsert = typeof products.$inferInsert
