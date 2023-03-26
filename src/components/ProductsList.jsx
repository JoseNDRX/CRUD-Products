const ProductsList = ( { productsData, deleteProductAction, selectProduct } ) => {

  const confirmDelete = (id) => {
    const resultConfirm = confirm('Deseas continuar?')
    if(resultConfirm) deleteProductAction(id)
  }

  return (
    <ul className="productCard-container">
      {
        productsData?.map( product => (
         <li key={product.id} className="productCard">
          <h4 className="productName">{product.name}</h4>
          <div className="productInfo">
            <h5><span>Categoría:</span> {product.category}</h5>
            <h5><span>Precio:</span> ${product.price}</h5>
            <h5><span>Disponible:</span> {product.isAvailable ? "Si" : "No"}</h5>
          </div>
          <div className="productBtns">
            <div className="editBtn" onClick={ () => selectProduct (product)}><i className='bx bx-edit'></i></div>
            <div className="deleteBtn" onClick={ () => confirmDelete ( product.id ) }><i className='bx bx-trash'></i></div>
          </div>
          

        </li> 
        ))
      }        
    </ul>
  );
};

export default ProductsList;