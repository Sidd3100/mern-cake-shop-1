import { Link, UNSAFE_NavigationContext } from "react-router-dom";
import {useState ,useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import { setCredentials } from "../../../slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../loader/loader";
import { useRegisterMutation } from "../../../slices/usersApiSlice";
import { toast } from "react-toastify";


export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation(); 
  const {userInfo} = useSelector((state) => state.auth);

  const {search} = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if(userInfo){
      navigate(redirect);
    }
  },[userInfo, redirect, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error('Passwords do not match');
      return;
    }
    else{
      try{
        const res = await register({name, email, password}).unwrap();
        dispatch(setCredentials({...res}));
        navigate(redirect);
      }catch(error){
        toast.error(error?.data?.message || error.error);
      }
    }
  }
    return (
      <>
       
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create an account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
            <div >
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                  Username
                </label>
                <div className="mt-2">
                  <input
                  onChange = {(e) => setName(e.target.value)}
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div >
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                  onChange={(e)=>setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Enter Password
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                  onChange={(e)=>setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                  </label>
                 
                </div>
                <div className="mt-2">
                  <input
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  disabled = {isLoading}
                  onClick={handleSubmit}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{' '}
              <Link to = {redirect ? `/login?redirect = ${redirect}`:'/login'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  
}