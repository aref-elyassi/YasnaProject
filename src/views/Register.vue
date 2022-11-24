<template>
    <div class="container-fluid d-flex  justify-content-center mt-4">
        <div class="row w-100  justify-content-center">
            <div class="col-md-6 col-sm-12 register-form border rounded p-3">
                <h1 class="text-center">Register Form</h1>
                <form @submit.prevent="register">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Name</label>
                        <input type="text" class="form-control" id="exampleFormControlInput2" placeholder="John Doe"
                            v-model="nameRegister">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput2" class="form-label">Email</label>
                        <input type="email" class="form-control" id="exampleFormControlInput2"
                            placeholder="name@example.com" v-model="emailRegister">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput4" class="form-label">Password </label>
                        <div class="pass">
                            <input type="password" class="form-control myInput" id="exampleFormControlInput4"
                                v-model="passwordRegister">
                            <i class="bi bi-eye" v-if="showPass" @click="ShowHidePassword"></i>
                            <i class="bi bi-eye-slash" v-if="dontShow" @click="ShowHidePassword"></i>
                        </div>
                        <h4 class="errorRegister text-center mt-4">{{ ErrorRegister }}</h4>
                    </div>
                    <button class="btn  w-100">Register</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { createLocalStorage } from '@/module.js'
import { useRouter } from 'vue-router'
import store from '@/store'
export default {
    setup() {
        const router = useRouter()
        const showPass = ref(true)
        const dontShow = ref(false)
        const emailRegister = ref('')
        const passwordRegister = ref('')
        const nameRegister = ref('')
        const formData = ref({ nameRegister, emailRegister, passwordRegister })
        const ErrorRegister = ref('')
        function ShowHidePassword() {
            var x = document.querySelector(".myInput");
            if (x.type === "password") {
                x.type = "text";
                showPass.value = false
                dontShow.value = true
            } else {
                x.type = "password";
                showPass.value = true
                dontShow.value = false
            }
        }
        function register() {
            if (emailRegister.value.toString() !== '' && nameRegister.value !== '' && 
            passwordRegister.value.toString() !== '') {
                const registerResult = store.dispatch('registerUser', formData)
              registerResult.then(() => {
                router.push({ name: 'Home' });
               // router.go()
              }) 
            }
            else {
                ErrorRegister.value = 'Please Fill All Of Items'
            }
        }



        return {
            passwordRegister, nameRegister, emailRegister, ShowHidePassword, showPass, dontShow, ErrorRegister, createLocalStorage, register
        }
    }
}
</script>

<style  scoped>
.register-form {
    background: #406882;
}

.pass {
    position: relative;
}

.bi {
    position: absolute;
    top: 2px;
    right: 10px;
    font-size: 1.5rem;
    font-weight: bold;
}

.btn {
    background-color: #EB6440;
}

.btn:hover {
    background-color: #f8b6a3;
}

.errorRegister {
    color: #f1dd00;
}
</style>
