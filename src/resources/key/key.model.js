import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const apiKeySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },    
}, { timestamps: { createdAt: 'created_at' } })

apiKeySchema.pre('save', function(next) {
    if (!this.isModified('key')) {
        return next()
    }

    bcrypt.hash(this.key, 10, (err, hash) => {
        if (err) {
            return next(err)
        }

        this.key = hash
        next()
    })
})

apiKeySchema.methods.checkKey = function (key) {
    const hashedKey = this.key
    return new Promise((resolve, reject) => {
        bcrypt.compare(key, hashedKey, (err, same) => {
            // If key doesn't match the key in db return reject
            if (err) {
                return reject(err)
            }

            resolve(same)
        })
    })
}

export const apiKey = mongoose.model('apiKeySchema', apiKeySchema)