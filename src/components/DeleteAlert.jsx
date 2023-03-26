import React from 'react';

const DeleteAlert = ({ productToDelete, cancelDelete, deleteProduct}) => {
  
  const confirmDelete = (id) => {
    const resultConfirm = confirm('Deseas continuar?')
    if(resultConfirm) deleteProductAction(id)
  }
  return (
    <div className="deleteAlert-container">
      <div className="deleteAlert">
      <h1> <i className='bx bx-alarm-exclamation' style={{color: 'red'}} ></i> </h1>
        <p style={{ color: 'black' }}>¿Se eliminará el registro del producto: <br /><strong> {productToDelete?.name}</strong>?</p>
        
        <button onClick={ () => deleteProduct ( productToDelete ) }>Eliminar</button>
        
        <button onClick={ () => cancelDelete()}>Cancelar</button>

      </div>
    </div>
  );
};

export default DeleteAlert;