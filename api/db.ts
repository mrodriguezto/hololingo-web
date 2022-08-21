import mongoose from 'mongoose';

/**
 *  0 - disconnected
 *  1 = connected
 *  2 = connecting
 *  3 = disconnecting
 */

const mongoConnection = {
  isConnected: 0,
};

const connect = async () => {
  if (mongoConnection.isConnected) {
    console.log('Already connected');
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;
    if (mongoConnection.isConnected === 1) {
      console.log('Using previous connection');
      return;
    }

    await mongoose.disconnect();
  }

  try {
    await mongoose.connect(process.env.MONGO_URL || '');

    mongoConnection.isConnected = 1;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log("Error: Couldn't establish connection to database");
  }
};

const disconnect = async () => {
  if (process.env.NODE_ENV === 'development') return;

  if (mongoConnection.isConnected === 0) return;

  await mongoose.disconnect();
  mongoConnection.isConnected = 0;
  console.log('Disconnecting from MongoDB');
};

const db = {
  connect,
  disconnect,
};

export default db;
