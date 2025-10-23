import React, {useState} from 'react'

export default function Login(){

    const [Nombre, setNombre] = useState('')
    const [Contraseña, setContraseña] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return(       
        <div> 
            <section>
               <form onSubmit={handleSubmit}>
                    <input placeholder='Nombres' />
                    <input placeholder='Apellidos' />
                    <input placeholder='Identificacion' />
                    <input placeholder='Correo' />
                    <input type ='password' placeholder='Contraseña' />
                    <button>Login</button>
               </form>
            </section>
        </div>       
    );
}