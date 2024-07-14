import React, { useEffect, useState } from "react";
import { useUpdateProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation } from "../../slices/productApiSlice";
import Loader from "../loader/loader";
import Alert from "../alert/Alert";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductEdit = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
    const [uploadProductImages, { isLoading: loadingUpload }] = useUploadProductImageMutation();
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
        console.log(event.target.files);
    };

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [href, setHref] = useState("");
    const [details, setDetails] = useState("");
    const [sizes, setSizes] = useState([]);
    const [highlights, setHighlights] = useState([]);
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setHref(product.href);
            setDetails(product.details);
            setSizes(product.sizes);
            setHighlights(product.highlights);
            setImages(product.images);
        }
    }, [product]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            productId,
            name,
            price,
            description,
            category,
            href,
            details,
            sizes,
            highlights,
            images,
        };
        const result = await updateProduct(updatedProduct);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Product updated successfully");
            navigate("/admin/productlist");
        }
    };

    const uploadFiles = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('images', selectedFiles[i]);
        }
        setUploading(true);
        try {
            const { data } = await uploadProductImages(formData).unwrap();
            setImages([...images, ...data.images]);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const handleSizeChange = (index, field, value) => {
        const updatedSizes = [...sizes];
        updatedSizes[index][field] = value;
        setSizes(updatedSizes);
    };

    const handleHighlightChange = (index, value) => {
        const updatedHighlights = [...highlights];
        updatedHighlights[index] = value;
        setHighlights(updatedHighlights);
    };

    return (
        <div className="bg-white py-6 px-4 sm:p-6 lg:pb-8">
            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                <div>
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Product</h3>
                        <Link to="/admin/productlist" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                            Go Back
                        </Link>
                    </div>
                    {isLoading && <Loader />}
                    {error && <Alert variant="danger">{error}</Alert>}
                    {loadingUpdate && <Loader />}
                </div>
                <form>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <input
                                type="text"
                                name="category"
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="href" className="block text-sm font-medium text-gray-700">
                                Href
                            </label>
                            <input
                                type="text"
                                name="href"
                                id="href"
                                value={href}
                                onChange={(e) => setHref(e.target.value)}
                                className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                                Details
                            </label>
                            <textarea
                                name="details"
                                id="details"
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="sizes" className="block text-sm font-medium text-gray-700">
                                Sizes
                            </label>
                            {sizes.map((size, index) => (
                                <div key={index} className="flex space-x-2 mb-2">
                                    <input
                                        type="text"
                                        name={`size-name-${index}`}
                                        placeholder="Size Name"
                                        value={size.name}
                                        onChange={(e) => handleSizeChange(index, "name", e.target.value)}
                                        className="block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                    <input
                                        type="number"
                                        name={`size-count-${index}`}
                                        placeholder="Count In Stock"
                                        value={size.countInStock}
                                        onChange={(e) => handleSizeChange(index, "countInStock", Number(e.target.value))}
                                        className="block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                    <select
                                        name={`size-inStock-${index}`}
                                        value={size.inStock}
                                        onChange={(e) => handleSizeChange(index, "inStock", e.target.value === "true")}
                                        className="block w-full sm:text-sm border-gray-300 rounded-md"
                                    >
                                        <option value="true">In Stock</option>
                                        <option value="false">Out of Stock</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                        <div>
                            <label htmlFor="highlights" className="block text-sm font-medium text-gray-700">
                                Highlights
                            </label>
                            {highlights.map((highlight, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    name={`highlight-${index}`}
                                    placeholder="Highlight"
                                    value={highlight}
                                    onChange={(e) => handleHighlightChange(index, e.target.value)}
                                    className="block w-full sm:text-sm border-gray-300 rounded-md mb-2"
                                />
                            ))}
                        </div>
                        <div>
                            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                                Images
                            </label>
                            <div className="mt-2">
                                <input
                                    type="file"
                                    name="images"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                                    multiple
                                />
                                {loadingUpload && <Loader />}
                                <button onClick={uploadFiles} disabled={uploading} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-2">
                                    Upload Files
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                onClick={submitHandler}
                                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                            >
                                Update Product
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductEdit;
