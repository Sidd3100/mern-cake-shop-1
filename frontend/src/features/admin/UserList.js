import React from "react";
import { useGetUsersQuery } from "../../slices/usersApiSlice";
import Loader from "../loader/loader";
import { Link } from "react-router-dom";
import Alert from "../alert/Alert";
import { useDeleteUserMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";

const UserList = () => {
    const { data: users, isLoading,refetch, error } = useGetUsersQuery();
    const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();

    const deleteHandler = async(id)=>{
        if(window.confirm("Are you sure?You want to delete this user?")){
            try {
                await deleteUser(id);
                toast.success("User deleted successfully");
                refetch();
            } catch (error) {
                toast.error(error.message)  
            }

    }
}

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Orders</h1>
            {isLoading ? loadingDelete?(<Loader/>):(
                <Loader />
            ) : error ? (
                <div className="flex w-full flex-col gap-2">
                    <Alert color="red">{error.message || "Failed to load orders"}</Alert>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b-2 border-gray-200 text-center text-sm font-semibold text-gray-600">ID</th>
                                <th className="px-4 py-2 border-b-2 border-gray-200 text-center text-sm font-semibold text-gray-600">NAME</th>
                                <th className="px-4 py-2 border-b-2 border-gray-200 text-center text-sm font-semibold text-gray-600">EMAIL</th>
                                <th className="px-4 py-2 border-b-2 border-gray-200 text-center text-sm font-semibold text-gray-600">ADMIN</th> 
                                <th className="px-4 py-2 border-b-2 border-gray-200 text-center text-sm font-semibold text-gray-600">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">{user._id}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">{user.name}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700"><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                    
                                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                                        {user.isAdmin?<span className="text-green-500">&#10003;</span>  : <span className="text-red-500">✘</span>}
                                    </td>
                                    
                                    <td className="py-2 px-4 border">
                                    <Link to={`/admin/user/${user._id}/edit`} className="text-blue-500 hover:underline mr-2">Edit</Link>
                                    <button onClick ={()=>deleteHandler(user._id)} className="text-red-500 hover:underline">Delete</button>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserList;
