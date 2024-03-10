import { drizzle } from 'drizzle-orm/d1'

import * as schema from './schema'

export const createDbClient = (database: D1Database) =>
  drizzle(database, { schema })

export type DatabaseClient = ReturnType<typeof createDbClient>
