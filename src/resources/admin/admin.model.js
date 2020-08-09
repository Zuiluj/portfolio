import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true}
)

// Hash the password before saving the admin
adminSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next()
    }

    bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) {
            return next(err)
        }

        this.password = hash
        next()
    })
})

// Add checkPassword method to adminSchema
adminSchema.methods.checkPassword = function(password) {
    const passwordHash = this.password
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, same) => {
            // If password isn't a match, return a reject. Else resolve
            if (err) {
                return reject(err)
            }

            resolve(same)
        })
    })
}

export const Admin = mongoose.model('admin', adminSchema)