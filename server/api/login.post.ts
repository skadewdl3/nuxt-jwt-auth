import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {User} from '../db'
import connectDB from '../db'

export default defineEventHandler(async (event) => {

  connectDB()
  const {email, password} = await readBody(event)
  try {
    const user = await User.findOne({ email });
    if (!user) {
      // setResponseStatus(event, 404)
      return {
        success: false,
        message: 'User not found. Please check you email address and try again.'
      }
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    console.log(passwordsMatch)
    if (!passwordsMatch) {
      // setResponseStatus(event, 401)
      return {
        success: false,
        message: 'Incorrect password. Please check you email address and password.'
      }
    }

    const token = jwt.sign({ userID: user._id }, process.env.SECRET, { expiresIn: 60 })

    setCookie(event, 'jwt', token)
    return {
      success: true,
      message: 'Login successful'
    }
  }
  catch (error) {
    // setResponseStatus(event, 500)
    return {
      success: false,
      message: JSON.stringify(error)
    }
  }
})
