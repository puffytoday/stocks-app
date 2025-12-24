import mongoose from 'mongoose'

declare global {
  var mongooseCache:
    | {
        conn: typeof mongoose | null
        promise: Promise<typeof mongoose> | null
      }
    | undefined
}

const cached =
  global.mongooseCache ?? (global.mongooseCache = { conn: null, promise: null })

export const connectToDatabase = async () => {
  const mongoUri = process.env.MONGO_URI

  if (!mongoUri) throw new Error('MONGO_URI must be set within .env')

  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri, { bufferCommands: false })
  }

  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }

  return cached.conn
}

export const disconnectFromDatabase = async () => {
  if (!cached.conn) return

  await cached.conn.disconnect()
  cached.conn = null
  cached.promise = null
}
