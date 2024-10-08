import mongoose from 'mongoose'
import "dotenv/config"

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URI)
        console.log("Connected succesfully.")
    } catch(e) {
        console.log(e)
    }
}

export default connectToDb;