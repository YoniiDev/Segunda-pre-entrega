//CARRITO DE COMPRA ZEROLAG

/*
PLANTEAMIENTO DEL EJERCICIO
1 DAR LA BIENVENIDA AL USUARIO Y SOLICITAR SU NOMBRE

2 MOSTRAR UNA LISTA DE 6 PRODUCTOS AL USUARIO Y SOLICITAR LOS DATOS ATRAVES DE PROMPT:
    a) PRODUCTO SELECCIONADO
    b) CANTIDAD

3- PREGUNTAR A TRAVES DE PROMP SI DESEA AÑADIR OTRO PRODUCTO AL CARRITO;
    a)SI ESCOGE SI MOSTRAR A TRAVES EL LISTADO DE PRODUCTOS NUEVAMENTE

    b)DE LO CONTRARIO MOSTRAR EL TOTAL DE LA BOLETA ELECTRONICA

4- DAR LAS GRACIAS AL USUARIO A TRAVES DE UN ALERT

*/

const productos = [new Producto("Enfriamiento Liquido ID-Cooling","ID-COOLING","Enfriamiento Liquido ID-Cooling FrostFlow X, 280mm, Intel/AMD, Color Negro",109990),
new Producto("Unidad de Estado Sólido Kingston","KINGSTON","Unidad de Estado Sólido Kingston NV2, 1TB NVMe, PCIe 4.0, Lectura 3500 MB/s Escritura",109990),
new Producto("Mouse Gamer Logitech G Pro","LOGITECH G","Mouse Gamer Logitech G Pro, Sensor HERO 16K para eSports, 6 botones programables",34990),
new Producto('Monitor Curvo de 24" AOC',"AOC",'Monitor Curvo de 24" AOC C24G2, Panel VA, 165Hz, 1ms, FreeSync Premium',249990,100),
];

//Coloque 4 productos solamente ya que la ventana de prompt tiene un limite en mostrar información, por lo que al agregar más de 4 productos, los demas simplemente no se ven y no lo encuenteo sentido agregar más productos si luego no se verán el prompt.

const carroDeCompra = [];


//Dar la Bienvenida al usuario y solicitar su nombre
let nombreCliente;

do {
    nombreCliente = prompt('Bienvenido a ZeroLag\nIngrese su nombre');
    if (nombreCliente.trim() === '' || nombreCliente === null) {
    alert('El nombre del cliente no puede estar vacio o contener espacios en blanco. Por favor, ingrese un nombre.');
}
} while (nombreCliente.trim() === '' || nombreCliente === null);

function solicitarProducto() {
    let opcionDelUsuario;

    //Mostrar los productos al usuario y solicitar que seleccione los productos que necesite
    do {
        let solicitudDeProductos = `Carrito de productos de ${nombreCliente}\nEscoja su producto (para seleccionar el producto ingrese el número correspondiente a cada uno)\n\n`;
        productos.forEach((producto, indice) => {
            solicitudDeProductos = solicitudDeProductos + `${indice + 1} - ${producto.nombre} - Marca: ${producto.marca}\nDescripción: ${producto.descripcion}\nPrecio Normal: $${producto.precioNormal}\n\n`;
        });

        opcionDelUsuario = parseInt(prompt(solicitudDeProductos));
        if (opcionDelUsuario < 1 || opcionDelUsuario > productos.length || isNaN(opcionDelUsuario)) {
        alert('Ingrese una opción valida');
        }
    } while (opcionDelUsuario < 1 || opcionDelUsuario > productos.length || isNaN(opcionDelUsuario));
    
    //Solicitar cantidad al usuario
    let cantidadDelUsuario;
    do {
        cantidadDelUsuario = parseInt(prompt(`Ingrese la cantidad de "${productos[opcionDelUsuario - 1].nombre}" que desea comprar:`));
        if (isNaN(cantidadDelUsuario) || cantidadDelUsuario <= 0) {
            alert('Ingrese una cantidad válida');
        }
    } while (isNaN(cantidadDelUsuario) || cantidadDelUsuario <= 0);

    //Craer nuevo item con la cantidad solicitada por el usuario y posteriormente se agrega al Carro de Compras
    let nuevoItem = new Item(productos[opcionDelUsuario - 1], cantidadDelUsuario);
    carroDeCompra.push(nuevoItem);

    //Preguntar al usuario si desea añadir otro producto
    let deseaAgregarOtroProducto = confirm('¿Desea añadir otro producto');
    if (deseaAgregarOtroProducto) {
        solicitarProducto();
    }else {
        mostrarBoletaElectronica();
    }
}

//Mostrar boleta electronica al usuario y dar las gracias
 function mostrarBoletaElectronica() {
    let totalBoletaElectronica = 0;
    let boletaElectronica = `Boleta Electronica ZeroLag\nNombre del cliente: ${nombreCliente}\n\n`;
    carroDeCompra.forEach((item) => {
        let subtotal = item.producto.precioNormal * item.cantidad;
        totalBoletaElectronica = totalBoletaElectronica + subtotal;
        boletaElectronica = boletaElectronica + `Cantidad: ${item.cantidad} - Producto: ${item.producto.nombre} - Subtotal: $${subtotal}\n\n`;
    });

    boletaElectronica = boletaElectronica + `Total: $${totalBoletaElectronica}`

    alert(boletaElectronica)
    alert(`Gracias ${nombreCliente} por comprar en ZeroLag\nQue disfrutes tu compra`);
};

solicitarProducto()