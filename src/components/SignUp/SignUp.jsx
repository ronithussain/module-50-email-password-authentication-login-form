import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false);



    const handleSignUp = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        console.log(email, password,name,photo, terms);


        //reset error and status
        setErrorMessage(''); // ekhane eta dekhanor karon holo jodi kono errormessage thake tahole ota k bad diye notun kore abar error thakle error dekhabe r na thakle successfully dekhabe...
        setSuccess(false); // kono karone success faild hole ekhan theke reset kore dibe.

        if(!terms){
            setErrorMessage('Please accept our terms and condition.');
            return; // jodi terms k accept na kora hoy tahole firebase e request jabe na and ekhan thekey return kore debe and errormessage show koray dibe.
        }


        if (password.length < 6) { // jodi kono karone password 6 er kom deya hoy tahole firebase e request dile ey error ta dekhabe ... so sekhane pathanor agey ami bole dilam  je jodi password 6 er kom hoy tahole tumi vitore jaba na borong ekhan thekey return kore diba.
            setErrorMessage('password at least 6 character must ')
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage('At least one uppercase, one lowercase, one number, one special character must be used')
            return;// jodi kono karone passwordRegex condition na mile tahole errormessage theke return kore dibe. firebase porjontw jabe na.
        }




        // create with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user)
                setSuccess(true); //success k dekhabe.


                // verified your email address
                sendEmailVerification(auth.currentUser)
                .then(() => {
                 
                });
                // update your profile and photo URL
                const profile = {
                    displayName: name,
                    photoURL: photo
                }
                updateProfile(auth.currentUser, profile)
                .then(()=> {
                    console.log('use profile update')
                })
                .catch(error => {
                    console.log('User profile update error',error)
                })
            })
            .catch((error) => {
                console.log('ERROR', error.message)
                setErrorMessage(error.message)
                setSuccess(false); //kono karone success error hole false dekhabe.
            })
    }
    return (

        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl mx-auto">
            <h3 className="text-3xl mt-4 ml-4 font-bold">Sign Up now!</h3>
            <form onSubmit={handleSignUp} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="text" name='photo' placeholder="photo URL" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="password"
                        name='password'
                        className="input input-bordered"
                        required />
                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        className='btn btn-xs absolute top-12 right-2'>
                        {
                            showPassword ? <FaEyeSlash className='text-base'></FaEyeSlash> : <FaEye className='text-base'></FaEye>
                        }
                    </button>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control">
                    <label className="cursor-pointer label justify-end flex-row-reverse">
                        <span className="label-text ml-2">Accept our terms and condition</span>
                        <input type="checkbox" name='terms' className="checkbox checkbox-accent" />
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
            {
                errorMessage && <p className='text-red-600 ml-4 mb-2'>{errorMessage}</p>
            }
            {
                success && <p className='ml-4 mb-2 text-green-600'>Sign Up is Successful</p>
            }
            <p className='m-3'>Already have an account? Please<Link to='/login'>Login</Link></p>
        </div>

    );
};

export default SignUp;