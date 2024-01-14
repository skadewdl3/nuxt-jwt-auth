<script setup lang="ts">
import { ref, toRaw } from 'vue';

let email = ref('');
let password = ref('');
let name = ref('')
let cookie = useCookie('jwt', {
  httpOnly: true,
  maxAge: 3600
})

let loginError = ref('')
let registerError = ref('')
const register = async  () => {
  const {data, pending, error, refresh} = await useFetch('/api/register', {
    method: 'POST',
    body: {
      name: name.value, email: email.value, password: password.value
    } 
  });

  const result = data._rawValue

  if (result.success) {
    console.log('Registered successful')
  }
  else {
    registerError.value = result.message
  }
}

const login = async () => {
  const {data, pending, error, refresh} = await useFetch('/api/login', {
    method: 'POST',
    body: {
      email: email.value, password: password.value
    },
  })

  console.log(data)

  let result = data._rawValue

  if (result.success) {
    console.log('Login succeeded')
    navigateTo('/secret') 
  }
  else {
    console.log('Login failed')
    loginError.value = result.message
  }
}

enum AuthMode {
  Login, Register
}

const mode = ref(AuthMode.Login)

</script>

<template>
  <div class="auth w-full h-screen bg-blue-400 flex items-center justify-center flex-col">
    <div class="auth-container bg-white rounded-md px-4 py-2">
      <Transition name="fade">

        <div class="login flex items-center justify-center flex-col" v-if="mode == AuthMode.Login">

          <h1 class="w-full text-4xl px-2 py-4">Login</h1>
          <input  placeholder="Email" type="email" class="w-full px-2 py-1 my-2 rounded bg-gray-200 active:bg-white hover:bg-white border-solid border-2 hover:border-gray-400 active:border-gray-400 transition-all" v-model="email" />

          <input placeholder="Password" type="password" class="w-full px-2 py-1 my-2 rounded bg-gray-200 active:bg-white hover:bg-white border-solid border-2 border-gray-200 active:border-blue-200 transition-all" v-model="password" />

          <button @click="login" class="bg-blue-400 text-white rounded px-4 py-2 active:translate-y-1">Login</button>

          <p class="text-red-400 font-bold" v-if="loginError != null">{{ loginError }}</p>



          <p class="cursor-pointer" @click="mode = AuthMode.Register">Don't have an account? Register!</p>
        </div>


        <div v-else class="register flex items-center justify-center flex-col">

          <h1 class="w-full text-4xl px-2 py-4">Register</h1>
          <input placeholder="Full Name" type="text" class="w-full px-2 py-1 my-2 rounded bg-gray-200 active:bg-white hover:bg-white border-solid border-2 hover:border-gray-400 active:border-gray-400 transition-all" v-model="name" />
          <input type="email"   placeholder="Email"  class="w-full px-2 py-1 my-2 rounded bg-gray-200 active:bg-white hover:bg-white border-solid border-2 hover:border-gray-400 active:border-gray-400 transition-all" v-model="email" />

          <input type="password" placeholder="Password" class="w-full px-2 py-1 my-2 rounded bg-gray-200 active:bg-white hover:bg-white border-solid border-2 border-gray-200 active:border-blue-200 transition-all" v-model="password" />



          <button @click="register" class="bg-blue-400 text-white rounded px-4 py-2 active:translate-y-1">Register</button>

          <p class="text-red-400 font-bold" v-if="registerError != null">{{ registerError }}</p>
          <p class="cursor-pointer" @click="mode = AuthMode.Login">Already have an account? Login!</p>
        </div>


      </Transition>
    </div>
  </div>
</template>

<style lang="stylus">
.fade-enter-active,
.fade-leave-activate
  transition opacity 0.5s ease-in-out


.fade-enter-from,
.fade-leave-to
  opacity 0

</style>
