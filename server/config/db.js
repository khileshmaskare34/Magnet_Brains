const mongoose = require('mongoose');
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
            console.log("conneted to db");
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDB;
