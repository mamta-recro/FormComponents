import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./UserLogin.css";
import { Button, Text } from "../FormElements/FormElements";
import Modal from "../Modal/Modal";
import UserLogin from "./Components/UserLogin/UserLogin";

function newState() {
  this.data = {
    userName: "",
    password: ""
  };
  this.errors = {
    userName: "required",
    password: "required"
  };
  this.userData = {
    user: ""
  };
  this.forgoteErrors = {
    user: "required"
  };
  this.formSubmitted = false;
  this.loginModal = true;
  this.forgotPass = false;
  this.forgotPassWd = false;
  this.invalidPassword = false;
  this.forgoteSubmitted = false;
  this.invalidUser = false;
}
class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = new newState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.forgotPassWrd = this.forgotPassWrd.bind(this);
    this.handleforgotePass = this.handleforgotePass.bind(this);
  }
  handleChange(e, data) {
    var submitData = this.state.data;
    submitData[e.target.name] = data.data;
    this.setState({ data: submitData });

    var submitErrors = this.state.errors;
    submitErrors[e.target.name] = data.error;
    this.setState({ errors: submitErrors });
    
  }
  handleforgotePass(e, userData) {
    var submitData = this.state.userData;
    submitData[e.target.name] = userData.data;
    this.setState({ data: submitData });

    var submitErrors = this.state.forgoteErrors;
    submitErrors[e.target.name] = userData.error;
    this.setState({ errors: submitErrors });
  }
  
  handleSubmit(e) {
    debugger;
    if (e !== undefined) e.preventDefault();
    this.setState({ formSubmitted: true });
    if (
      Object.keys(this.state.errors).filter(key => {
        if (
          this.state.errors[key] != "" &&
          (key === "mobileNo" || key === "password")
        )
          return 1;
        else return 0;
      }).length !== 0
    )
    }
    
  render() {
    return (
      <div className={styles.loginICont}>
        

        <div className={styles["mar-top-20"] + " " + styles["msLoginBlock"]}>
          <div className={styles.captionLogin}>Login</div>
          {/* {this.state.isLoading ? <Loading /> : null} */}
          <form onSubmit={this.handleSubmit} noValidate>
            <div className={styles.msFormGroup}>
              <Text
                labelWidth="0"
                placeholder="Login with your User Name or E-mail *"
                name="userName"
                value={this.state.data.userName}
                change={this.handleChange}
                errorMessage={this.state.errors.userName}
                className={styles.inputControl}
                submitted={this.state.formSubmitted}
              />
            </div>
            <div className={styles.msFormGroup}>
              <Text
                type="password"
                labelWidth="0"
                placeholder="Password *"
                name="password"
                validation="password"
                value={this.state.data.password}
                change={this.handleChange}
                errorMessage={this.state.errors.password}
                className={styles.inputControl}
                submitted={this.state.formSubmitted}
              />
            </div>
            {this.state.invalidPassword === true ? (
              <p className={styles.error + " " + styles["mar-top-2"]}>
                Invalid username or password
              </p>
            ) : null}
            {this.state.userNotActive === true ? (
              <p className={styles.error + " " + styles["mar-top-2"]}>
                User is not active
              </p>
            ) : null}
            <div className={styles.msFormGroup + " " + styles.msGroupBtn}>
              <button className={styles.msBtn}>Cancel</button>
              <button type="submit" className={styles.msBtn}>
                Login
              </button>
            </div>

            <a onClick={() => this.forgotPassword()} className={styles.pRight}>
              Forgot Password?
            </a>
          </form>
        </div>

        {/*</Modal>*/}

        <Modal
          height="160px"
          header="Forgot Password"
          isOpen={this.state.forgotPassWd}
          onClose={() => {
            this.setState({ forgotPassWd: false });
            this.props.closeModal();
          }}
          backDropClose={true}
          crossBtn={true}
        >
          <form onSubmit={this.forgotPassWrd} noValidate>
            <ul>
              <li className={styles.companyName}>
                <Text
                  labelWidth="0"
                  placeholder="Enter User Name or E-mail *"
                  name="user"
                  value={this.state.userData.user}
                  change={this.handleforgotePass}
                  validation="name"
                  errorMessage={this.state.forgoteErrors.user}
                  submitted={this.state.forgoteSubmitted}
                />
                {this.state.invalidUser === true ? (
                  <p className={styles.error + " " + styles["mar-top-2"]}>
                    Invalid username
                  </p>
                ) : null}
                <button
                  className={styles["login-btn"] + " " + styles["mar-top-10"]}
                >
                  Submit
                </button>
              </li>
            </ul>
          </form>
        </Modal>

        <Modal
          height="135px"
          header="Success"
          isOpen={this.state.forgotPass}
          onClose={() => {
            this.setState({ forgotPass: false });
            this.props.closeModal();
          }}
          backDropClose={true}
          crossBtn={true}
        >
          <p>Password has been reset</p>
          <p>New Password been sent to registered email</p>
        </Modal>
      </div>
    );
  }
}



export default UserLogin;
