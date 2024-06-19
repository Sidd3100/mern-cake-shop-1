import React from 'react'
   
import Navbar from '../features/navbar/Navbar'
import ProductList from '../features/product-list/components/ProductList'

export function Home() {
    

    return (
        <>
            <Navbar>
            <ProductList></ProductList>
            </Navbar>
           
           
        </>
    )
}
