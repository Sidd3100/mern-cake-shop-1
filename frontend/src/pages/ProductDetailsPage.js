import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductDetails from '../features/product/components/ProductDetails'

export function ProductDetailsPage(props) {
    

    return (
        <>
            <Navbar>
                <ProductDetails></ProductDetails>
            </Navbar>
        </>
    )
}
