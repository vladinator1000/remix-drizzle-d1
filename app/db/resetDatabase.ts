import { $ } from 'zx'

/**
 * Reset the local d1 database violently.
 * Run any migrations and seed.
 */

await $`rm -rf ./.wrangler`

// Create db.
// https://github.com/cloudflare/workers-sdk/issues/5092
await $`pnpm wrangler d1 execute shop --local --command "pragma foreign_keys = ON;"`

await $`pnpm db-migrate-gen`
await $`pnpm db-migrate-apply`
// await $`pnpm db-seed`
