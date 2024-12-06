'use client';
// import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useState ,useEffect} from 'react';
import Swal from "sweetalert2";
import { Login } from "../api/Administrador/iniciarSesion";


export default function Home() {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      //router.push('/about');
      router.push('../Admin/dashboard');
    }
  }
  , []);

  const handleSubmit = async (e) => {
    
    e.preventDefault();

      const response = await Login(email,password);
      if(response.status === 200){
        router.push('../Admin/dashboard');
      }else{
        Swal.fire({
          title: 'Error al iniciar sesion',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
      });
      }
  }

    

  const handleemailChange = (e) => {
    setEmail(e.target.value);
    console.log('User',email);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log('Pass',password);
  }

  const handleRevealPass = () => {
    const pass = document.getElementById('password');
    if (pass.type === 'password') {
      pass.type = 'text';
    } else {
      pass.type = 'password';
    }
  }


  return (
    <div>
        <div className="bg-gray-100 flex justify-center items-center h-screen">

<div className="w-1/2 h-screen hidden lg:block">
<img src="https://wallpapers.com/images/hd/80s-neon-uevqe7pg20chynkw.jpg" alt="Placeholder Image" className="object-cover w-full h-full" />
</div>

<div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
<h1 className="text-2xl font-semibold mb-4">Inicio de Sesion</h1>

<div className="mb-4">
  <label for="email" className="block text-gray-600">Usuario</label>
  <input type="text" id="email" name="email" value={email} onChange={handleemailChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" />
</div>

<div className="mb-4">
  <label for="password" className="block text-gray-600">Contraseña</label>
  <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" />
</div>

<div className="mb-4 grid grid-cols-2">
  <div className=" ">
  <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
  <label for="remember" className="text-gray-600 ml-2">Recuerdame</label>
  </div>
  <div>
  <input type="checkbox" id="revealpass" onClick={handleRevealPass} name="revealpass" className="text-blue-500" />
  <label for="revealpass" className="text-gray-600 ml-2">Mostrar Contraseña</label>
  </div>
  </div>


<button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Iniciar Sesion</button>

<div className="mt-6 text-blue-500 text-center">

</div>
</div>
</div>
    </div>
)
}
