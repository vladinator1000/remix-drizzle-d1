import type { Config } from 'drizzle-kit'

const { LOCAL_DB_PATH, WRANGLER_CONFIG, DB_NAME = 'shop' } = process.env

const schema = './app/db/schema.ts'

const localConfig = {
  schema,
  driver: 'better-sqlite',
  dbCredentials: {
    url: LOCAL_DB_PATH ?? '',
  },
} satisfies Config

const productionConfig = {
  schema,
  out: './migrations',
  driver: 'd1',
  dbCredentials: {
    wranglerConfigPath:
      new URL('wrangler.toml', import.meta.url).pathname +
      // This is a hack to inject additional cli flags to wrangler
      // since drizzle-kit doesn't support specifying environments
      WRANGLER_CONFIG
        ? ` ${WRANGLER_CONFIG}`
        : '',
    dbName: DB_NAME,
  },
} satisfies Config

console.log({ LOCAL_DB_PATH })

export default LOCAL_DB_PATH ? localConfig : productionConfig
