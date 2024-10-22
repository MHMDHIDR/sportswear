import { env } from "@/env";
import pg from "pg";

const { Pool } = pg;

// Define the global type for the database pool
declare global {
  var databasePool: pg.Pool | undefined;
}

const createPool = () => {
  return new Pool({
    connectionString: env.DATABASE_URL,
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 2000, // How long to wait for a connection
  });
};

// In development, we want to use a global variable to share the pool across hot reloads
// In production, we'll create a new pool for each instance
const databasePool = global.databasePool ?? createPool();

// In development, save the pool to the global object to prevent multiple pools during hot reloads
if (process.env.NODE_ENV === "development") {
  global.databasePool = databasePool;
}

// Error handling for the pool
databasePool.on("error", err => {
  console.error("Unexpected error on idle database client", err);
  process.exit(-1);
});

// Helper function to execute queries
export async function query(text: string, params?: any[]) {
  const client = await databasePool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  } finally {
    client.release(); // Always release the client back to the pool
  }
}

// Simplified query interface
export const database = {
  query: async (queryConfig: string | pg.QueryConfig, values?: any[]) => {
    if (typeof queryConfig === "string") {
      return query(queryConfig, values);
    }
    return query(queryConfig.text, queryConfig.values);
  },
  pool: databasePool,
};

// Cleanup function for graceful shutdown
async function cleanup() {
  if (databasePool) {
    await databasePool.end();
  }
}

// Handle graceful shutdown
process.on("SIGTERM", cleanup);
process.on("SIGINT", cleanup);
