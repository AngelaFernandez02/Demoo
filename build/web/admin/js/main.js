let cm = null; //Current Module
async function cargarModuloEmpleado()
{
    //AJAX: Asynchronous Java script Am Xml
    let respuesta = await fetch('empleado/empleado.html');
    let contenido = await respuesta.text();
    document.getElementById("divContenedorPrincipal").innerHTML = contenido;

    //Despues de cargar el contenido HTML, cargamos el modulo JS del empleado 
    import('./empleado.js')
            .then(obj => {
                cm = obj;
                cm.inicializar();
            });
}
async function cargarModuloCliente()
{
    //AJAX: Asynchronous Java script Am Xml
    let respuesta = await fetch('cliente/cliente.html');
    let contenido = await respuesta.text();
    document.getElementById("divContenedorPrincipal").innerHTML = contenido;

    //Despues de cargar el contenido HTML, cargamos el modulo JS del empleado 
    import('./cliente.js')
            .then(obj =>{
               cm = obj;
               cm.inicializar();

            });
}
async function cargarModuloProducto()
{
    //AJAX: Asynchronous Java script Am Xml
    let respuesta = await fetch('producto/producto.html');
    let contenido = await respuesta.text();
    document.getElementById("divContenedorPrincipal").innerHTML = contenido;
    
    import('./producto.js')
            .then(obj =>{
               cm = obj;
               cm.inicializar();

            });
}
async function cargarModuloCompra()
{
    //AJAX: Asynchronous Java script Am Xml
    let respuesta = await fetch('compra/compra.html');
    let contenido = await respuesta.text();
    document.getElementById("divContenedorPrincipal").innerHTML = contenido;
}
async function cargarModuloVenta()
{
    //AJAX: Asynchronous Java script Am Xml
    let respuesta = await fetch('venta/venta.html');
    let contenido = await respuesta.text();
    document.getElementById("divContenedorPrincipal").innerHTML = contenido;
}

