import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../../firebase.init';
import { Link } from 'react-router-dom';

const Login = () => {
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const emailRef = useRef();


    const handleLogIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);


        // reset status 
        setSuccess(false);
        setErrorMessage('');

        signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
            console.log(result.user);
            // email verified // email jodi verified na hoy tahole if block e jabe r jodi verified hoy tahole else e setSuccess true hobe.
            if(!result.user.emailVerified){
                setErrorMessage('Please verified your email address');
            }
            else{
                setSuccess(true);
            }


        })
        .catch((error)=> {
            console.log(error.message);
            setErrorMessage(error.message)
        })
    }
    const handleForgotPassword = () => { // forgot password er puro kaj ta useRef hook use kore kora hoyeche. email jodi valid na hoy taholoe if block e jabe . r jodi valid hoy tahole else e jabe and sendPasswordResetEmail er kaj ta korbe.
        console.log('get me email address',emailRef.current.value)
        const email = emailRef.current.value;
        if(!email){
            console.log('Please provide a valid email address!')
        }else{
            sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Please check your email address')
            })
        }

    }

    return (
        <div className="card bg-base-100 w-full max-w-lg mx-auto mt-8 shrink-0 shadow-2xl">
            <form onSubmit={handleLogIn} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' ref={emailRef} placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                    <label onClick={handleForgotPassword} className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-accent">Login</button>
                </div>
            </form>
            {
                success && <p className='text-green-600 ml-4 mb-2'>Login is successful</p>
            }
            {
                errorMessage && <p className='text-red-600 ml-4 mb-2'>{errorMessage}</p>
            }
            <p className='m-3'>New to this website? please <Link to='/signUp'>Sign up</Link></p>
        </div>

    );
};

export default Login;