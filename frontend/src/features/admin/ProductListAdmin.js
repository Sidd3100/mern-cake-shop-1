import React from "react";
import { useGetProductsQuery } from "../../slices/productApiSlice";
import Loader from "../loader/loader";
import Alert from "../alert/Alert";
import { Link } from "react-router-dom";

const ProductListAdmin = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();

    const deleteHandler = (id) => {
        
    }

    if (isLoading) return <Loader />;
    if (error) return <Alert type="error" message={error.message} />;


    return (
        <div className="container mx-auto my-8">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
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
                                    <Link to={`admin/product/${product._id}/edit`} className="text-blue-500 hover:underline mr-2">Edit</Link>
                                    <button onClick ={()=>deleteHandler(product._id)} className="text-red-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Create Product</button>
        </div>
    );
}

export default ProductListAdmin;
