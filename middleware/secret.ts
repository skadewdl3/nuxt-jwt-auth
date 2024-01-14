import { defineNuxtRouteMiddleware } from "nuxt/app";
import jwt from 'jsonwebtoken'
import {User} from '../server/db' 
import connectDB from "../server/db";

export default defineNuxtRouteMiddleware(async (to, from) => {

  const cookie = useCookie('jwt')
  if (!cookie || !cookie.value) {
    return navigateTo('/')
  }
  try {
    const {data, loading, error, refresh} = await useFetch('/api/verify')
    const verified = data._rawValue 
    if (!verified) {
      console.log('going home')
      return navigateTo('/')
    }
  }
  catch (error) {
    console.log(error)
      console.log('going home')
     return navigateTo('/')
  }
})
