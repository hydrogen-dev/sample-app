import React from 'react'
import axios from "axios";
export default class Dashboard extends React.Component {
        constructor(props){
        super(props);
        this.state = {
            appToken : []
        };
    }
    
    componentDidMount() {
          axios.get("http://localhost:3005/app_token/generate?app_name[]=card_balance&app_name[]=card_transactions&user_auth_token="+sessionStorage.getItem("user_token")).then(response => {
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
                    
                            <div class="img-wrapper d-flex col-lg-12 flex-column justify-content-center align-items-center">
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