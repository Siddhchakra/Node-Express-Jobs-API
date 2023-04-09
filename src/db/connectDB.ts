import mongoose from 'mongoose';

export const connectDB = async (URL: string) => {
  console.log('Database Status: Connecting to Database ...');
  try {
    await mongoose.connect(URL);

    console.log('Database Status: Connected to Database!')

  } catch (error) {
    console.log('Database Error: ', error)
  }
};
