import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";

const SignUp = () => {

    const [usererror, setUsererror] = useState('');
    const [success, setSuccess] = useState(false)

    const handelSubmitBtn = (e) =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

        setUsererror('')

        if(password.length < 6){
            setUsererror('the pasword should be 6 cherecter or more')
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result)
            setSuccess(true)
        })
        .catch(error => {
            console.log('hell vai I am from error')
            setUsererror(error.message)
            console.log(error.message)
            setSuccess(false)
        })

    }
    console.log(usererror)


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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              name="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button  className="btn btn-primary">Sign Up</button>
          </div>
        </form>
        {
            usererror && <p className="text-red-500 mx-auto m-5">{usererror}</p>
        }
      </div>
    </>
  );
};

export default SignUp;
