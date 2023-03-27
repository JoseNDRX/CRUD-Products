import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const ProductsForm = ( { setShowForm, createProduct, selectedProduct, updateProduct, setProductUpdate }) => {
    useEffect (() => {
        if(selectedProduct){
            reset(selectedProduct)
        } else {
            emptyForm()
        }
    }, [selectedProduct])

    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    
    const submit = data => {
        if( selectedProduct ) {
            updateProduct( data )
            setShowForm(false)
        }else{
            createProduct( data)
            emptyForm()
            setShowForm(false)
        }
    }
    
    const emptyForm = () => {
        reset(
            {
                name: "",
                category: "",
                price: "",
                isAvailable: false,
            }
        )
    }    

    return (
        <div className="productForm-container">
            <form className="productForm" onSubmit={ handleSubmit( submit ) }>
                <h2>{selectedProduct ? "Modificar Producto" : "Registro de Producto"}</h2>
                <div>
                    <label 
                    htmlFor="name">
                        Producto
                    </label>
                    <input 
                    type="text" 
                    id="name" 
                    placeholder="Nuevo Producto"
                    autoComplete="Nuevo Producto"
                    { ...register("name", { required: true }) }
                    />
                </div>
                <div>
                    <label 
                    htmlFor="category">
                        Categoría
                    </label>
                    <input 
                    type="text" 
                    id="category" 
                    placeholder="Categoría"
                    autoComplete="Category"
                    { ...register("category", { required: true }) }
                    />
                </div>
                <div>
                    <label 
                    htmlFor="price">
                        Precio
                    </label>
                    <input 
                    type="text" 
                    inputMode='numeric'
                    id="price" 
                    placeholder="0.00"
                    { ...register("price", { required: true }) }
                    />
                </div>
                <div className='checkBox-container'> {/* check isCompleted */}
                  <label htmlFor="isAvailable">
                    Disponible
                  </label>
                  <input className='checkBox'
                    type="checkbox" 
                    id="isAvailable"
                    name="isAvailable"
                    { ...register("isAvailable")}
                  />
                  </div>
                <div className="btnContainer">
                    <button type="submit">Guardar</button>
                    <button onClick={ () => (setShowForm(false), setProductUpdate(null))}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default ProductsForm;