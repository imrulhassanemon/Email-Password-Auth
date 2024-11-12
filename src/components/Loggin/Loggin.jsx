import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";


const Loggin = () => {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('')
    const emailRef = useRef()

    const handelLogginButton = (e)=>{
        e.preventDefault()

        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email,password)

        // reset function 
        setSuccess(false)
        setError('')

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log('you are valid user', result.user)
            console.log('Id Created Date:- ', result.user.metadata.creationTime)
            console.log('Id Last Time signIn:- ', result.user.metadata.lastSignInTime)

            if(!result.user.emailVerified){
                setError("Please varify your email address")
                return; 
            }

            setSuccess(true)


        })
        .catch(error => {
            console.log('It is error', error.message)
            setError(error.message)
        })
        

    }

    const handelForgetPassword = () =>{
      console.log('handel forget password', emailRef.current.value)
      const email = emailRef.current.value;
      if(!email){
        console.log("please provide a valid email address")
        setError('please provide email address')
        return
      }else{
        sendPasswordResetEmail(auth, email)
        .then(()=>{
          alert("password reset email sent")
        })
      }
    }


  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handelLogginButton} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                name="email"
                ref={emailRef}
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
              <label onClick={handelForgetPassword} className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            {
                success && <p className="text-green-600 text-center">You are successfully Loggin</p>
            }
            {
                error && <p className="text-red-500 text-center">{error}</p>
            }
            <div className="text-center">
                <p>New to this website please </p>
                 <span className="font-bold"><NavLink  to={'/register2'}>SignUp</NavLink></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loggin;
