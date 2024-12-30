import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        sellerType: { type: String, required: true },
        isActive: {type: Boolean, default: true},
        isAdmin: {type: Boolean, default: false}
    }
)

const User = mongoose.model("User", UserSchema)
export default User
