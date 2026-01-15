import mongoose from 'mongoose';

let MONGODB_URI = process.env.MONGODB_URI ?? '';

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI environment variable.');
}

// Auto-add database name if missing
// Format: mongodb+srv://user:pass@cluster.net/ -> mongodb+srv://user:pass@cluster.net/amples
if (MONGODB_URI.includes('@') && !MONGODB_URI.match(/\.mongodb\.net\/[^?]/)) {
  const queryString = MONGODB_URI.includes('?') ? MONGODB_URI.substring(MONGODB_URI.indexOf('?')) : '';
  const baseUri = MONGODB_URI.includes('?') ? MONGODB_URI.substring(0, MONGODB_URI.indexOf('?')) : MONGODB_URI;
  
  // Add database name 'amples' if not present
  if (!baseUri.endsWith('/') && !baseUri.match(/\.mongodb\.net\/[^\/]/)) {
    MONGODB_URI = `${baseUri}/amples${queryString ? queryString : '?retryWrites=true&w=majority'}`;
    console.log('⚠️  Database name was missing. Auto-added "/amples" to connection string.');
  }
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = global as typeof globalThis & {
  mongoose?: MongooseCache;
};

const cached = globalForMongoose.mongoose || { conn: null, promise: null };

if (!globalForMongoose.mongoose) {
  globalForMongoose.mongoose = cached;
}

export default async function connectMongo(): Promise<typeof mongoose> {
  if (cached.conn) {
    console.log('✅ Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('\n🔄 Attempting to connect to MongoDB...');
    console.log('📋 Connection Details:');
    console.log('  - MONGODB_URI exists:', !!MONGODB_URI);
    console.log('  - MONGODB_URI length:', MONGODB_URI.length);
    console.log('  - Starts with mongodb:', MONGODB_URI.startsWith('mongodb'));
    
    // Show connection string (masked for security)
    const maskedUri = MONGODB_URI.replace(/:([^:@]+)@/, ':****@');
    console.log('  - Connection string:', maskedUri.substring(0, 50) + '...');
    
    // Clear any existing connection state
    mongoose.connection.close().catch(() => {});
    
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000, // Increased to 30 seconds
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      maxPoolSize: 10,
    }).then((mongoose) => {
      console.log('✅ MongoDB connected successfully!');
      console.log('  - Connection state:', mongoose.connection.readyState);
      console.log('  - Database name:', mongoose.connection.db?.databaseName);
      return mongoose;
    }).catch((error: Error & { code?: string; reason?: { message?: string; code?: string } }) => {
      console.error('\n❌ MongoDB connection FAILED!');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('Error Name:', error.name);
      console.error('Error Message:', error.message);
      console.error('Error Code:', error.code || 'N/A');
      
      if (error.reason) {
        console.error('Reason:', error.reason.message || error.reason.code || 'N/A');
      }
      
      // Detailed troubleshooting
      console.error('\n🔍 TROUBLESHOOTING STEPS:');
      
      if (error.message.includes('whitelist') || error.message.includes('IP')) {
        console.error('⚠️  IP WHITELIST ISSUE:');
        console.error('   1. Go to: https://cloud.mongodb.com → Network Access');
        console.error('   2. Click "Add IP Address"');
        console.error('   3. Enter: 0.0.0.0/0 (Allow from anywhere)');
        console.error('   4. Wait 2-3 minutes, then try again');
      } else if (error.message.includes('authentication')) {
        console.error('⚠️  AUTHENTICATION ISSUE:');
        console.error('   1. Check username and password in connection string');
        console.error('   2. Verify database user exists in Atlas → Database Access');
        console.error('   3. Ensure user has "Read and write to any database" role');
        console.error('   4. If password has special characters, URL-encode them');
      } else if (error.message.includes('timeout')) {
        console.error('⚠️  TIMEOUT ISSUE:');
        console.error('   1. Check your internet connection');
        console.error('   2. Verify MongoDB Atlas cluster is running');
        console.error('   3. Try again in a few minutes');
      } else {
        console.error('⚠️  GENERAL CONNECTION ISSUE:');
        console.error('   1. Verify MONGODB_URI in .env.local is correct');
        console.error('   2. Check MongoDB Atlas cluster status');
        console.error('   3. Ensure IP is whitelisted');
        console.error('   4. Verify database user credentials');
      }
      
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      
      // Clear the promise so we can retry
      cached.promise = null;
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    // Clear cache on error so next attempt is fresh
    cached.promise = null;
    cached.conn = null;
    throw error;
  }
}

