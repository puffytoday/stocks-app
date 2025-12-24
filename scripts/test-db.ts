import { loadEnvConfig } from '@next/env'
import { connectToDatabase, disconnectFromDatabase } from '../database/mongoose'

loadEnvConfig(process.cwd())

async function main() {
  try {
    const start = Date.now()
    const mongooseInstance = await connectToDatabase()
    const duration = Date.now() - start

    const { host, name, readyState } = mongooseInstance.connection

    console.log(
      `MongoDB connection OK\n Host: ${host}\n DB: ${name}\n readyState: ${readyState}\n Time: ${duration}ms`
    )
  } catch (error) {
    console.error('Database connection failed:', error)
    process.exitCode = 1
  } finally {
    await disconnectFromDatabase()
  }
}

main()
