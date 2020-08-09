import { Admin } from './admin.model'

export const updateAdmin = async function(req, res) {
    try {
        const doc = await Admin.findOneAndUpdate(
            req.user._id,
            req.body,
            { new: true }
        )
            .lean()
            .exec()

        res.status(200).json({ data: user })
    } catch (err) {
        console.error(err) 
        res.status(400).end()
    }
}