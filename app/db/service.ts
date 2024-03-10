import * as schema from './schema'
import { DatabaseClient } from './dbClient.server'

export class DbService {
  constructor(db: DatabaseClient) {
    this.db = db
  }

  public db: DatabaseClient
  public schema = schema
}
