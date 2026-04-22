import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateProduct() {
 const {register, handleSubmit, reset} = useForm();
 const navigate = useNavigate();
  const params = useParams();
    // console.log("Details Id:",params.id);
    const [productDetails, setProductDetails] = useState(null);
    const roles = localStorage.getItem("roles");
    const token = localStorage.getItem("jwtToken");
   
    useEffect(() => {
        fetch(`http://localhost:8080/api/products/${params.id}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                setProductDetails(data);
            })
    }, []);

    useEffect(()=>{
        if(productDetails){
            reset(productDetails)
        }
    },[productDetails,reset]);

    function updateProduct(formData){
        fetch(`http://localhost:8080/api/products/${params.id}`,{
            headers: {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            method:"PUT",
            body:JSON.stringify(formData)
        })
        .then(resp => {
            // console.log(resp);
            if(resp.ok){
                alert("Product Updated..!!");
                navigate("/");
            }
        })
    }

    return (
        productDetails &&
        <div className = 'col-md-4 mx-auto'>
            <div className="container mt-5">
                <div className="card shadow p-4">
                    <h2 className="text-center mb-4">Update Product</h2>

                    <form onSubmit={handleSubmit(updateProduct)}>

                        {/* Name */}
                        <div className="mb-3">
                            <label className="form-label">Product Name</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register('name')}
                            />
                        </div>

                        {/* Category */}
                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register('category')}

                            />
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                name="description"
                                rows="3"
                                {...register('description')}
                            ></textarea>
                        </div>

                        {/* Image URL */}
                        <div className="mb-3">
                            <label className="form-label">Image URL</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register('imageUrl')}

                            />
                        </div>

                        {/* Price */}
                        <div className="mb-3">
                            <label className="form-label">Price (₹)</label>
                            <input
                                type="number"
                                className="form-control"
                                {...register('price')}

                            />
                        </div>

                        {/* Button */}
                        <button type="submit" className="btn btn-primary w-100">
                            Update Product
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

