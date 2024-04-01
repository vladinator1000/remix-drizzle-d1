import { sql } from 'drizzle-orm'
import { ProductInsert } from './schema'
import { DbService } from './service'

export class ProductService extends DbService {
  getBySlug(slug: string) {
    const condition = sql`${this.schema.products.slug} = ${slug}`
    return this.db.select().from(this.schema.products).where(condition).get()
  }

  getAll() {
    return this.db.query.products.findMany()
  }

  create(input: ProductInsert) {
    return this.db.insert(this.schema.products).values(input).execute()
  }
}
