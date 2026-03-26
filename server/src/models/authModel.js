import mongoose from 'mongoose'

const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      sparse: true
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean, 
      default: false,
      required: false
    },
  
   
  },
  { timestamps: true }
)

export default mongoose.model('Auth', authSchema)
