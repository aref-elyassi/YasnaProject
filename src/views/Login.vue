<template>
    <div class="container-fluid d-flex justify-content-center mt-4">
        <div class="row w-100 d-flex  justify-content-center ">
            <div class="col-md-6 col-sm-12 login-form border rounded p-3">
                <h1 class="text-center">Login Form</h1>
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1"
                            placeholder="name@example.com" v-model="emailLogin">

                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput2" class="form-label">Password</label>
                        <div class="pass">

                            <input type="password" class="form-control myInput" id="exampleFormControlInput2"
                                v-model="passwordLogin">
                            <i class="bi bi-eye" v-if="showPass" @click="ShowHidePassword"></i>
                            <i class="bi bi-eye-slash" v-if="dontShow" @click="ShowHidePassword"></i>

                        </div>
                        <h4 class="errorLogin text-center mt-4">{{ErrorLogin}}</h4>
                    </div>

                    <button class="btn  w-100">Login</button>

                    <br>
                    <router-link to="/register" class="router">If You Dont Have Account Please Register</router-link>
                </form>
            </div>


        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const router = useRouter()
        const store=useStore()
        const emailLogin = ref('')
        const ErrorLogin = ref('')
        const passwordLogin = ref('')
        const formData = ref({ emailLogin, passwordLogin })
        const showPass = ref(true)
        const dontShow = ref(false)
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
        function login() {
            if (emailLogin.value.toString() !== '' && passwordLogin.value.toString() !== '') {
                 
                store.dispatch('loginUser', formData.value)   
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'You LogIn',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    router.push({ path: '/newArticle' });
            }
            else {
                ErrorLogin.value = 'Please Fill All Items'
            }
        }
        return {
            emailLogin, passwordLogin, ShowHidePassword, showPass, dontShow, ErrorLogin, login
        }
    }
}
</script>

<style scoped>
.login-form {
    background: #406882;
}

.router {
    text-decoration: none;
    color: #c3b300;
    text-align: center;
}

.router:hover {
    color: rgb(198, 198, 198);
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

.errorLogin {
    color: #f1dd00;
}
</style>