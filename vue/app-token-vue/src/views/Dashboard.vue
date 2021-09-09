<template>
    <div class="wrapper">
                    <main>
                    <div class="container-fluid">
                        <div class="row min-h-screen">
                    
                            <div class="img-wrapper d-flex col-lg-12 flex-column justify-content-center align-items-center">
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
</template>
<script>
import axios from "axios";
export default {
  name: 'About',
  props: {
    msg: String
  },
  data() {
    return {
      appToken: [],
    };
  },
  mounted() {
    axios.get("http://localhost:3005/app_token/generate?app_name[]=card_balance&app_name[]=card_transactions&user_auth_token="+sessionStorage.getItem("user_token")).then(response => {
            if(response.data && response.status === 200){
                this.appToken = response.data
          }
    })
  }
}
</script>