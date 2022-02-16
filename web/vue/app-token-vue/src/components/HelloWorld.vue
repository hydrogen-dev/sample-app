<template>
  <div class="hello">
   <div class="wrapper">
                    <main>
                    <div class="container-fluid">
                        <div class="row min-h-screen">
                        <div class="form-wrapper d-flex flex-column align-items-center col-lg-5 pt-5">
                            <div  class="form" >
                            <h1><a href="https://www.hydrogenplatform.com"><img src="https://www.hydrogenplatform.com/svg/logo-blue.svg" alt="Hydrogen"></a></h1>
                            <h2>Login to Hydrogen</h2>
                                <p class="slogan">Great to see you back! Log in to your account below.</p>
                                
                                <label class="d-flex flex-column mb-3">
                                <span style="text-align:left">Enter your email</span>
                                <input type="email" placeholder="" name="email" class="w-100" v-model="username" required>
                                 <div className="text-danger" style="text-align: left" v-if="errors.username">{{errors.username}}</div>
                                </label>
                                <label class="d-flex flex-column mb-5">
                                <div class="label d-flex justify-content-between">
                                    <span>Password</span>
                                
                                </div>
                                <input type="password" name="password" placeholder="" class="w-100" required v-model="password">
                                <div className="text-danger" style="text-align: left" v-if="errors.password">{{errors.password}}</div>
                                </label>
                            
                                <p type="text" id="userLogin" name="userLogin" class="btn btn-primary w-100 mb-4" v-on:click="handleClick()">Log in</p>
                            
                            </div>
                            </div>

                            <div class="img-wrapper d-flex1 col-lg-7 flex-column justify-content-center align-items-center">
                            
                             <div 
                                v-for="todo in appToken" 
                                :key="todo"
                              >
                                 <div v-for="(value) in todo" v-bind:key="value">
                                   <div v-html="value"></div>
                                  </div>
                              </div>
                            </div>

                        </div>
                    </div>
                    </main>
                </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      errors: [],
      appToken: [],
      username: '',
      password: '',
      userToken : ''
    };
  },
  watch: {
    username(value){
      // binding this to the data value in the email input
      this.username = value;
      this.validateEmail(value);
    },
    password(value){
      this.password = value;
      this.validatePassword(value);
    }
  },
  methods:{
    validateEmail(value){
      if (value.length != 0)
      {
        this.errors['username'] = '';
      } else{
        this.errors['username'] = 'Please enter your username';
      } 
    },
    validatePassword(value){
      if (value.length==0) {
        this.errors['password'] = 'Please enter your password.' ;
      } else {
         this.errors['password'] = '';
      }
    },
    handleClick(){
      let username = this.username;
      let password = this.password;

      if (!username) {
        this.errors["username"] = "*Please enter your username.";
        return false;
      }

      if (!password) {
        this.errors["password"] = "*Please enter your password.";
        return false;
      }

      const formData = {user_name : username, password : password}
      axios.post("http://localhost:3005/user/login", formData).then(response => {
              if(response.data && response.status === 200){
                this.userToken = response.data? response.data.access_token : null
                if(this.userToken){
                  sessionStorage.setItem("user_token", this.userToken);
                  this.$router.push({ name: 'Dashboard', query: { redirect: '/dashboard' } });
                }
              }
    })
    }
  },
  mounted() {
    axios.get("http://localhost:3005/app_token/generate?app_name[]=card_issuance").then(response => {
             if(response.data && response.status === 200){
                this.appToken = response.data
             } 
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
