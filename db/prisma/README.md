# Prisma Client Rust

[prisma.brendonovich.dev](https://prisma.brendonovich.dev)

## Usage

All [Prisma CLI](https://www.prisma.io/docs/orm/tools/prisma-cli) commands are available with `mise prisma` or `mise p`, especially:

- `mise p generate`: Generates Prisma Client Rust code from your Prisma schema.

# Baselining

[Baselining prisma](https://www.prisma.io/docs/orm/prisma-migrate/workflows/baselining) is necessary when using supabase because supabase provisions the database with schemas and tables
(especially `auth` that we are integrating with) that prisma does not know about initially.
Initial migration is defined in [0_init](./migrations/0_init).
When working with new database hosted by supabase, you need to flag this initial migration as `--applied` with `mise p migrate resolve --applied 0_init`.

For more details about the process of baselining prisma when using supabase auth see this [post](https://medium.com/@warren_74490/making-prisma-and-supabase-play-nicely-5acfe2255591).
