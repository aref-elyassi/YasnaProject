<template>
    <div class="container-fluid d-flex  justify-content-center mt-4">
        <div class="row w-100  justify-content-center">
            <div class="col-md-6 col-sm-12 register-form border rounded p-3">
                <h1 class="text-center">Change Account</h1>
                <form @submit.prevent="change">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Name</label>
                        <input type="text" class="form-control" id="exampleFormControlInput2" placeholder="John Doe"
                            v-model="nameChange">
                    </div>
                 
                    <div class="mb-3">
                        <label for="exampleFormControlInput4" class="form-label">Password </label>
                        <div class="pass">
                            <input type="password" class="form-control myInput" id="exampleFormControlInput4"
                                v-model="passwordChange">
                            <i class="bi bi-eye" v-if="showPass" @click="ShowHidePassword"></i>
                            <i class="bi bi-eye-slash" v-if="dontShow" @click="ShowHidePassword"></i>
                        </div>
                        <h4 class="errorRegister text-center mt-4">{{ ErrorRegister }}</h4>
                    </div>
                    <button class="btn  w-100">Change Account</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import store from '@/store'
export default {
    setup() {
        const router = useRouter()
        const showPass = ref(true)
        const dontShow = ref(false)
        const passwordChange = ref('')
        const nameChange = ref('')
      
        const formData = ref({ nameChange,  passwordChange })
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
        function change() {
            if ( nameChange.value!== '' && passwordChange.value.toString() !== '') {
                const registerResult = store.dispatch('users/changeSetting', formData)
                registerResult.then(() => {
                    router.push({ path: '/' });
                })
            }
            else {
                ErrorRegister.value = 'Please Fill All Of Items'
            }
        }



        return {
            passwordChange, nameChange,ShowHidePassword, showPass, dontShow, ErrorRegister, change
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
