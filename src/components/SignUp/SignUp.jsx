import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const SignUp = () => {
  const [usererror, setUsererror] = useState("");
  const [success, setSuccess] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
//   const [terms, setTerms] = useState(false)

  // hide and show password
  //  setShowpassword(false)

  //  const handelshowpassword = ()=>{
  //     setShowpassword(showpassword)
  // }

  const handelSubmitBtn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.termss.checked;
    console.log(email, password, terms);

    // reset value
    setUsererror(false);
    setUsererror("");


    // if(!terms)

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#()%*?&])[A-Za-z\d@$!%#()*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setUsererror(
        "At least one uppercase, one lowercase, one number, one special character"
      );
      return;
    }

    if (password.length < 6) {
        setUsererror("the pasword should be 6 cherecter or more");
        return;
      }

    if(!terms){
        setUsererror("Please accept out terms and condition")
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        setSuccess(true);
        sendEmailVerification(auth.currentUser)
        .then(() => {
            console.log('Varification Email Sent')
        })
      })
      .catch((error) => {
        console.log("hell vai I am from error");
        setUsererror(error.message);
        console.log(error.message);
        setSuccess(false);
      });
  };

  return (
    <>
      <div className="card bg-base-100 my-10 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-3xl text-center font-bold">SignUp now!</h1>
        <form onSubmit={handelSubmitBtn} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showpassword ? "text" : "password"}
              placeholder="password"
              name="password"
              className="input input-bordered"
              required
            />
            <button
              onClick={() => setShowpassword(!showpassword)}
              className="btn absolute right-2 top-9  rounded-full"
            >
              {showpassword ? <FaEye></FaEye> : <FaEyeSlash />}
            </button>
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control">
            <label className="label justify-start gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="checkbox" name="termss" />
              <span className="label-text">Remember me</span>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Sign Up</button>
          </div>
          
        </form>
        {usererror && (
          <p className="text-red-500 text-center m-5">{usererror}</p>
        )}
        {success && (
          <p className="text-green-600 text-center">Sign up is success</p>
        )}
        <div className="text-center mb-8">
            <p>Already have an account? Please</p>
            <span className="font-bold"><NavLink to={'/loggin'} >Loggin</NavLink></span>
        </div>
      </div>
    </>
  );
};

export default SignUp;
