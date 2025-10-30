import React, { useState } from 'react'


export default function Registro(){

    const [formData, setFormData] = useState({
        primer_Nombre: "",
        segundo_Nombre: "",
        primer_Apellido: "",
        segundo_Apellido: "",
        identificacion: "",
        correo: "",
        contrasena: "",
    });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const res = await fetch("http://localhost:8000/Register/API", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

      const data = await res.json();

      if (res.ok) {
        alert("Usuario registrado correctamente ");
        console.log("Datos guardados:", data);
        setFormData({
          primer_Nombre: "",
          segundo_Nombre: "",
          primer_Apellido: "",
          segundo_Apellido: "",
          identificacion: "",
          correo: "",
          contrasena: "",
        });
            } else {
                alert(`Error: ${data.message}`);
            }
            } catch (error) {
            console.error("Error en el registro:", error);
            alert("No se pudo conectar con el servidor ");
            }
        };

        

    return(       
        <div> 
            <section>
               <form onSubmit={handleSubmit}>
                    <input name = "primer_Nombre" placeholder='Primer Nombre' onChange={handleChange}/>
                    <input name = "segundo_Nombre" placeholder='Segundo Nombre' onChange={handleChange}/>
                    <input name = "primer_Apellido" placeholder='Primer Apellido' onChange={handleChange}/>
                    <input name = "segundo_Apellido" placeholder='Segundo Apellido'onChange={handleChange}/>
                    <input name = "identificacion" placeholder='Identificación' onChange={handleChange}/>
                    <input name = "correo" placeholder='Correo' onChange={handleChange}/>
                    <input name = "contrasena" type ='password' placeholder='Contraseña' onChange={handleChange}/>
                    <button type="submit">Registrarse</button>
               </form>
            </section>
        </div>       
    );
}
