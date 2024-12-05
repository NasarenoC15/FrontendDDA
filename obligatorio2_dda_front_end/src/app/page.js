'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useState ,useEffect} from 'react';
import Swal from "sweetalert2";


export default function Home() {

  const router = useRouter();

  const [username, setUsername] = useState('');
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
    console.log(username,password);
    // const response = await fetch('api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ username, password })
    // });
    // despues de recibir los datos seteo el token y el rol en el localstorage
    // localStorage.setItem('token', data.token);
 
    if(username === 'admin' && password === 'admin'){

      // const generar = async () => {
      //   const token = generateToken({ username: username, role: 'admin' });
      //   localStorage
      //   .setItem('token', token);
      //   localStorage
      //   .setItem('role', 'admin');
      // };
      // generar();

      Swal.fire({
        icon: 'success',
        title: 'Bienvenido!',
        text: 'Inicio de Sesion Correcto!',
      });
      setTimeout(() => {
        //router.push('../Admin/dashboard');
        router.push('../Productos/altaVideoJuego');
      }
      , 2000);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario o Contraseña Incorrecta!',
      });
    }
    
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    console.log('User',username);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log('Pass',password);
  }

  const handleRevealPass = (e) => {
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
<form >

<div className="mb-4">
  <label for="username" className="block text-gray-600">Usuario</label>
  <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" />
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
</form>

<div className="mt-6 text-blue-500 text-center">

</div>
</div>
</div>
    </div>
)
}
