import configs from '@/configs';
import { connect } from 'mongoose';

// database connection with mongoose
const mongoConnect = async () => {
  try {
    await connect(configs.uri);
    console.log('Database successfully connected!');
  } catch (error) {
    console.log('Database connection error', error);
  }
};

export default mongoConnect;
