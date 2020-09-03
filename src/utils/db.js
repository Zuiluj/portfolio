import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: './src/.env'})

const ONLINE_MONGODB = process.env.ONLINE_MONGODB
//const URI = 'mongodb://localhost:27017/portfolio-api'
export const connect = (uri=ONLINE_MONGODB) => {
    return mongoose.connect(
        uri,
        { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        },
    )
}
