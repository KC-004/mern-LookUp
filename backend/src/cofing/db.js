import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MONGODB CONNECTED SUCCESSFULLY');
    } 
    catch (error) {
        console.error({message: error});
        process.exit(1); // exit with failure
    }
}

export default connectDB;