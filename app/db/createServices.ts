import { DatabaseClient } from './dbClient.server'
import { ProductService } from './product.service'

type InitServicesOptions = {
  db: DatabaseClient
}

export function createServices(options: InitServicesOptions) {
  return {
    product: new ProductService(options.db),
  }
}

export type Services = ReturnType<typeof createServices>
