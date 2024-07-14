import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../loader/loader";
import Alert from "../alert/Alert";
import {useGetUserDetailsQuery, useUpdateUserMutation } from  "../../slices/usersApiSlice";

const UserEdit = () => {
  const {id:userId} =  useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userId);

  const [updateUser, {isLoading: loadingUpdate}] = useUpdateUserMutation();

  useEffect(() => {
    if(user){
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      updateUser({userId, name, email, isAdmin});
      toast.success("User updated successfully");
      navigate(-1);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        
        {loadingUpdate && <Loader />}

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit User</h2>
        {isLoading? (<Loader/>):error? (<Alert type="error" message={error.message}/>):(<form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm text-left pl-2 font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-left pl-2 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-900">
              Is Admin
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Update
          </button>
          <div className="mx-auto">
          <Link to="/admin/userlist" className="block text-center max-w-20 text-gray-600 mt-2 border border-black rounded-md hover:bg-gray-600 hover:text-white p-2 items-end">
          Back</Link>
          </div>
        </form>)}
        
      </div>
    </div>
  );
};

export default UserEdit
