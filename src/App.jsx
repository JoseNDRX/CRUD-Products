import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import ProductsForm from './components/ProductsForm'
import ProductsList from './components/ProductsList'
import DeleteAlert from './components/DeleteAlert'

function App() {
  const [ products, setProducts ] = useState ( [ ] )
  const [ showForm, setShowForm ] = useState( false )
  const [ deleteAlert, setDeleteAlert ] = useState( false )
  const [ productToDelete, setProductToDelete ] = useState( null )

  useEffect ( () => {
    getData()
  }, [])
  
  const getData = () => {
    axios
    .get ("https://products-crud.academlo.tech/products/")
    .then ( resp => setProducts( resp.data ) )
    .catch ( error => console.error( error ))
  }

  const addProduct = productData => {
    axios
    .post('https://products-crud.academlo.tech/products/', productData)
    .then( () => getData() )
    .catch ( error => console.error( error ) )
  }
  
  const deleteProduct = productToDelete => {    
    axios
    .delete(`https://products-crud.academlo.tech/products/${productToDelete?.id}/`)
    .then( () => {
      getData(),
      setDeleteAlert(false)
      setProductToDelete(null)
    } )
    .catch ( error => console.error( error ) )
  }

  const [productUpdate, setProductUpdate] = useState(null)

  const selectProduct = productData => {
    setShowForm(true)
    setProductUpdate( productData )
  }
  const productActualization = productData => {
    axios
      .put(`https://products-crud.academlo.tech/products/${productData.id}/`, productData)
      .then(()=>{
        getData()
        setProductUpdate(null)
      })
      .catch ( error => console.error( error ) )
  }
  const getDeleteAlert = (product) => {
    setDeleteAlert(true)
    setProductToDelete(product)
  }
  const cancelDelete = () => {
    setDeleteAlert(false)
    setProductToDelete(null)
  }

  return (
    <div className="App">

      <div className="cube"></div>
      <div className="cube"></div>
      <div className="cube"></div>
      <div className="cube"></div>
      <div className="cube"></div>
      <div className="cube"></div>

      <section className="header">
        <img src="./stocks.png" alt="" />
        <h1 className="header__title">Listado de Productos</h1>
        <button className="header__callForm" onClick={ () => setShowForm(true)}><i className='bx bx-plus-medical' style={{color:'#14213d'}}></i> Agregar Producto
        </button>
      </section>
      <hr />
      { showForm &&
        <ProductsForm 
          createProduct = { data => addProduct ( data ) }
          selectedProduct = { productUpdate }
          updateProduct = { data => productActualization ( data ) }
          setShowForm = { setShowForm }
          setProductUpdate = {setProductUpdate}
        />
      }

      <ProductsList 
      productsData = {products}
      deleteProductAction = { id => deleteProduct(id) } //     
      selectProduct = { product => selectProduct(product) }
      getDeleteAlert = { getDeleteAlert }
      />
      
      { deleteAlert &&
        <DeleteAlert
        productToDelete ={ productToDelete}
        cancelDelete = { cancelDelete }
        deleteProduct = { deleteProduct }
        />
      }
    
    </div>

  )
}

export default App