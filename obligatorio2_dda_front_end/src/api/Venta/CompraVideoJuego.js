import Dominio from "../route";
import {agregarCarrito} from "../PreCompraVideoJuego/agregarCarrito";

export const CompraVideoJuego = async (fecha, user, totalPremium, carritoCompra, totalRegular) => {
    if (!user || !fecha ||   !carritoCompra ) {
        return { status: 400, message: 'Todos los campos son requeridos' };
    }

    const fechaCompra = fecha.split('T')[0];
        console.log("Campos requeridos");
        console.log(user);
        console.log(carritoCompra);
        console.log(totalPremium);
        console.log(totalRegular);
        console.log(fechaCompra);
    const user_id = user.id;
    try {
        if(totalPremium === 0 && totalRegular === 0){
            return { status: 400, message: 'No hay productos en el carrito' };
        }
        if(totalPremium ===0){
            const response = await fetch(`${Dominio}/venta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    fechacompra:fechaCompra,
                    persona:{id:user_id},
                    total:totalRegular
                }) 
            })
    
            if (!response.ok) {
                const errorData = await response.json();
                return { status: response.status, message: errorData.message || 'Error al comprar videojuego' };
            }
            const responseData = await response.json();
            const response2 = await agregarCarrito(carritoCompra, responseData.id);

            if(response2.status !== 200){
                return { status: response2.status, message: response2.message || 'Error al comprar videojuego' };
            }
            
            return { status: 200 };
    
        }else{
            const response = await fetch(`${Dominio}/venta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fechacompra:fechaCompra,
                    persona:{id:user_id},
                    total:totalPremium,
                })
            })
            if (!response.ok) {
                const errorData = await response.json();
                return { status: response.status, message: errorData.message || 'Error al comprar videojuego' };
            }
            const responseData = await response.json();
            const response2 = await agregarCarrito(carritoCompra, responseData.id);
            if(response2.status !== 200){
                return { status: response2.status, message: response2.message || 'Error al comprar videojuego' };
            }
    
            return { status: 200 , responseData};
    
        }
    } catch (error) {
        return { status: 500, message:  error.message || 'Error del servidor' };
    }

}