import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})


export const User = mongoose.models['User'] || mongoose.model('User', userSchema)

const connectDB = async () => {
  const db = await mongoose.connect(`${process.env.MONGO_URL}/users`)
}

export default connectDB
