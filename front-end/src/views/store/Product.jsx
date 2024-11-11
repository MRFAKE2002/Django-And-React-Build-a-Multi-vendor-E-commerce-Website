// libraries
import React, { useEffect, useState } from 'react'

// API call functions
import axiosAPIInstance from '../../utils/axios'

function Product() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axiosAPIInstance.get('products/').then((response) => {
      // ma inja miaim 'data product' ro be surat 'object' kamel dakhel 'list state products' mizarim. 
      setProducts(response.data)
    })
  }, [])
  
  return (
    <div>
      this is product list
    </div>
  )
}

export default Product
