import { loadEnvConfig } from '@next/env'
import { connectToDatabase, disconnectFromDatabase } from '../database/mongoose'

loadEnvConfig(process.cwd())

async function main() {
  try {
    const mongooseInstance = await connectToDatabase()
    const { host, name, readyState } = mongooseInstance.connection

    console.log(
      `MongoDB connection OK. Host: ${host}, DB: ${name}, readyState: ${readyState}`,
    )
  } catch (error) {
    console.error('Database connection failed:', error)
    process.exitCode = 1
  } finally {
    await disconnectFromDatabase()
  }
}

main()
