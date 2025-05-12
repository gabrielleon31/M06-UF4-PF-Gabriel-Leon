import postgres from 'postgres'

// Asegúrate de que tu .env define POSTGRES_URL o DATABASE_URL
const sql = postgres(process.env.POSTGRES_URL || process.env.DATABASE_URL!, {
  ssl: 'require',
})

export { sql }
