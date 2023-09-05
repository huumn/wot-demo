import postgres from 'postgres'

export default postgres(process.env.POSTGRES_URL)
