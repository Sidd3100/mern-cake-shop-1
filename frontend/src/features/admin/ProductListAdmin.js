import React from "react";
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from "../../slices/productApiSlice";
import Loader from "../loader/loader";
import Alert from "../alert/Alert";
import { Link } from "react-router-dom";
import {toast} from "react-toastify"


const ProductListAdmin = () => {
    const { data: products, isLoading, error,refetch } = useGetProductsQuery();
    const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation();
    const [deleteProduct, {isLoading: loadingDelete}] = useDeleteProductMutation();

    const deleteHandler = async(id) => {
        if(window.confirm("Are you sure?You want to delete this product?")){
            try {
                await deleteProduct(id);
                refetch();
                toast.success("Product deleted successfully")
            } catch (error) {
                toast.error(error.message)
            }
        }
    }
    const createProductHandler = async () => {
        if(window.confirm("Are you sure?You want to create a new product?")){
            try {
                await createProduct();
                refetch();
            } catch (error) {
                toast.error(error.message)
            }
        }
    }
    if (loadingCreate) return <Loader />;
    if (loadingDelete) return <Loader />;
    if (isLoading) return <Loader />;
    if (error) return <Alert type="error" message={error.message} />;


    return (
        <div className="container mx-auto my-8">
            <div className="flex items-center justify-between my-4">
                <div><h1 className="text-2xl font-bold mb-4">Product List</h1></div>
                <div> <button onClick={createProductHandler} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Create Product</button></div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border">ID</th>
                            <th className="py-2 px-4 border">Name</th>
                            <th className="py-2 px-4 border">Price</th>
                            <th className="py-2 px-4 border">Category</th>
                            <th className="py-2 px-4 border">Brand</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="py-2 px-4 border">{product._id}</td>
                                <td className="py-2 px-4 border">{product.name}</td>
                                <td className="py-2 px-4 border">{product.price}</td>
                                <td className="py-2 px-4 border">{product.category}</td>
                                <td className="py-2 px-4 border">{product.brand}</td>
                                <td className="py-2 px-4 border">
                                    <Link to={`/admin/product/${product._id}/edit`} className="text-blue-500 hover:underline mr-2">Edit</Link>
                                    <button onClick ={()=>deleteHandler(product._id)} className="text-red-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}

export default ProductListAdmin;
