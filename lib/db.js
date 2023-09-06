import postgres from 'postgres'

export default postgres(process.env.POSTGRES_URL, {
  ssl: process.env.NODE_ENV === 'production' ? 'require' : undefined
})
