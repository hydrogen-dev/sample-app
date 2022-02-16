import React from 'react'
import axios from "axios";
export default class Login extends React.Component {
        constructor(props){
        super(props);
        this.state = {
            appToken : [],
            username : '',
            password : '',
            userToken : '',
            errors: {}
        };
    }
    
    handleChangeUsername = (e) => {
      const {id , value} = e.target   
      this.setState({ username: value })
    }
    
    handleChangePassword = (e) => {
      const {id , value} = e.target   
      this.setState({ password: value })
    }
    
    handleClick = (e) => {
      let errors = {};
      let username = this.state.username;
      let password = this.state.password;

      if (!username) {
        errors["username"] = "*Please enter your username.";
        this.setState({
            errors: errors
          });
        return false;
      }

      if (!password) {
        errors["password"] = "*Please enter your password.";
        this.setState({
            errors: errors
          });
        return false;
      }

      const formData = {user_name : username, password : password}
      axios.post("http://localhost:3005/user/login", formData).then(response => {
              if(response.data && response.status === 200){
                this.setState({ userToken: response.data? response.data.access_token : null })
                if(this.state.userToken){
                  sessionStorage.setItem("user_token", this.state.userToken);
                  this.props.history.push('/dashboard')
                }
              }
          })
    }
    
    componentDidMount() {
          axios.get("http://localhost:3005/app_token/generate?app_name[]=card_issuance").then(response => {
             if(response.data && response.status === 200){
                this.setState({ appToken: response.data })
             }
              
          })
      }
    render() {
    return (
                <div class="wrapper">
                    <main>
                    <div class="container-fluid">
                        <div class="row min-h-screen">
                        <div class="form-wrapper d-flex flex-column align-items-center col-lg-5 pt-5">
                            <div  class="form" >
                            <h1><a href="https://www.hydrogenplatform.com"><img src="https://www.hydrogenplatform.com/svg/logo-blue.svg" alt="Hydrogen"></img></a></h1>
                            <h2>Login to Hydrogen</h2>
                                <p class="slogan">Great to see you back! Log in to your account below.</p>
                                
                                <label class="d-flex flex-column mb-3">
                                <span style={{"text-align": "left"}}>Enter your email</span>
                                <input type="email" placeholder="" name="email" class="w-100" required="" value={this.state.username}
                                    onChange={this.handleChangeUsername}></input>
                                 <div className="text-danger" style={{"text-align": "left"}}>{this.state.errors.username}</div>
                                </label>
                                <label class="d-flex flex-column mb-5">
                                <div class="label d-flex justify-content-between">
                                    <span>Password</span>
                                
                                </div>
                                <input type="password" name="password" placeholder="" class="w-100" required="" value={this.state.password}
                                    onChange={this.handleChangePassword}></input>
                                <div className="text-danger" style={{"text-align": "left"}}>{this.state.errors.password}</div>
                                </label>
                            
                                <p type="text" id="userLogin" name="userLogin" class="btn btn-primary w-100 mb-4" onClick={this.handleClick}>Log in</p>
                            
                            </div>
                            </div>

                            <div class="img-wrapper d-flex col-lg-7 flex-column justify-content-center align-items-center">
                            {this.state.appToken?.map((elem, index) => 
                                        Object.keys(elem).map((item, i) => (
                                            <div dangerouslySetInnerHTML={{__html: elem[item]}}></div>
                                        ))
                                    )}
                            
                            </div>

                        </div>
                    </div>
                    </main>
                </div>

    );
       
    }
}
