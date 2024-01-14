import {User} from '../db'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const cookie =  getCookie(event, 'jwt')
  if (!cookie) return false
  try {
    const decodedToken = jwt.verify(cookie, process.env.SECRET)
    const user = await User.findById(decodedToken.userID)
    if (!user) return false
    
  }
  catch (error) {
    return false
  }
  finally {
    return true
  }
})
