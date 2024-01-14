import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import connectDB from '../db'
import {User} from '../db'


connectDB()

const getErrorMessage = (code) => {
  console.log(code)
  switch (code) {
    case 11000:
      return 'Email already exists. Enter another email or login.'
      break;
    default:
      return 'Unknown error occured on the server.'
      break;
  }
}

export default defineEventHandler(async (event) => {
  const {email, password, name} = await readBody(event)
  const hashedPassword = await bcrypt.hash(password, 10)
  let user = new User({
    email,
    password: hashedPassword,
    name
  })
  try {
    await user.save()

  }
  catch (error) {
    return {
      success: false,
      message: getErrorMessage(error.code)
    }
  }
  return {
    success: true,
    message: 'Registration successful'
  }
}) 
