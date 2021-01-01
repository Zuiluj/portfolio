import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: './src/.env'})

const MONGODB_URI = process.env.MONGODB_URI
//const URI = 'mongodb://localhost:27017/portfolio-api'
export const connect = (uri=MONGODB_URI) => {
    return mongoose.connect(
        uri,
        { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        },
    )
}
