
let productos = [];
 
//const filtrador = new mdb.Datatable(document.getElementById('')), data
 
//  Insert y update en el mismo metodo

export function inicializar()

{

    refreshTableProductos();

    setDetalleProductosVisible(false);

}
 
 
// Ejemplo de uso:

//const productId = 1; // El ID del producto que deseas obtener

//getProductById(productId)

//  .then(producto => {

//    // Hacer algo con el producto obtenido, por ejemplo, mostrarlo en la consola

//    console.log('Producto obtenido:', producto);

//  })

//  .catch(error => {

//    // Manejar errores, por ejemplo, mostrar un mensaje al usuario

//    console.error('Error:', error);

//  });
 
export  async function save(){

    let url = "http://localhost:8080/sicefa_backend/api/Productos/save";

    let params = null;

    let resp = null;

    let datos = null;

    //Un objeto donde guardemos los datos del empleado:

    let pro = null;

    let idProducto = 0;

    // Revisamos si hay un ID de empleado:

    if (document.getElementById("txtIdProducto").value.trim().length > 0)

    {

        idProducto = parseInt(document.getElementById("txtIdProducto").value.trim());

    }

    //si no hay un empleado con el id descrito,

    //creamos una nueva instancia del objeto;

    pro = new Object();

    pro.id = idProducto;


//Si posicion es mayor o igual a 0, si encontramos a un empleado;

//        if (posicion >= 0)

//            emp = empleados[posicion];

//        else

//        {

//          //Insertamos el objeto emp dentro de el arreglo de empleados:


//            empleados.push(emp); //EN DUDA

//        }

//Continuamos llenando los datos del objeto:

//Datos Producto

    pro.nombre = document.getElementById("txtNombre").value;

    pro.nombreGenerico = document.getElementById("txtNombreGenerico").value;

    pro.formaFarmaceutica = document.getElementById("txtFormaFarmaceutica").value;

    pro.unidadMedida = document.getElementById("txtUnidadMedida").value;

    pro.presentacion = document.getElementById("txtPresentacion").value;

    pro.principalIndicacion = document.getElementById("txtPrincipalIndicacion").value;

    pro.contraindicaciones = document.getElementById("txtContraindicaciones").value;

    pro.concentracion = document.getElementById("txtConcentracion").value;

    pro.unidadesEnvase = document.getElementById("txtUnidadesEnvase").value;

    pro.precioCompra = document.getElementById("txtPrecioCompra").value;

    pro.precioVenta = document.getElementById("txtPrecioVenta").value;

    pro.foto = "";

    pro.rutaFoto = document.getElementById("txtRutaFoto").value;

    pro.codigoBarras = document.getElementById("txtCodigoBarras").value;

    pro.estatus = document.getElementById("txtEstatus").value;

  params = {

        datosProducto: JSON.stringify(pro)

    };

    let ctype = 'application/x-www-form-urlencoded;charset=UTF-8'; // Corrected content type

    resp = await fetch(url, 

    {

        method: "POST",

        headers: { 'Content-Type': ctype },

        body: new URLSearchParams(params)

    });
 
    datos = await resp.json();
 
   // if (datos.error != null) {

     //   Swal.fire('Error al guardar los datos del empleado', datos.error, 'warning');

  //  }

   // refreshTableEmpleados();

   // Swal.fire('Movimiento Realizado', 'Datos de Empleado Actualizados correctamente.', 'success');

if (datos.error != null) {

    Swal.fire('Error al guardar los datos de producto', datos.error, 'error');

    return;

}


//Swal.fire('Movimiento', 'Datos de Producto Actualizado', 'success');

      // alert(JSON.stringify(datos));


    //refreshTableProductos();

    Swal.fire('Movimiento', 'Datos de Producto Actualizado', 'success');

      alert(JSON.stringify(datos));

refreshTableProductos();


}

//export async function deleteProduct(idProducto) {

//    let url = //

//    let datos = null;

//

//    try {

//        const formData = new FormData();

//        formData.append('idProducto', idProducto);

//

//        const resp = await fetch(url, {

//            method: "DELETE",

//            body: formData // Enviar el ID del producto como un formulario

//        });

//

//        if (resp.ok) {

//            datos = await resp.json();

//            console.log('Producto eliminado:', datos);

//            return datos;

//        } else {

//            throw new Error('Error al intentar eliminar el producto');

//        }

//    } catch (error) {

//        console.error('Error al eliminar el producto:', error);

//        throw error;

//    }

//}
 
export async function deleteProducto() {

    const idProducto = document.getElementById('txtIdProducto').value.trim();
 
    if (idProducto === '') {

        Swal.fire('', 'Especifique un ID de producto.', 'warning');

        return;

    }
 
    const url = `http://localhost:8080/sicefa_backend/api/Productos/${idProducto}`; // Eliminar la parte 'delete/' del URL
 
    try {

        const response = await fetch(url, {

            method: 'DELETE'

        });
 
        if (response.ok) {

            Swal.fire('Movimiento realizado.', 'Registro de producto eliminado.', 'success');

            fillTableProductos(); // Actualizar tabla después de eliminar

        } else {

            const data = await response.json();

            Swal.fire('', data.error || 'Error al eliminar producto.', 'warning');

        }

    } catch (error) {

        Swal.fire('', 'Hubo un error al procesar la solicitud.', 'error');

        console.error('Error:', error);

        refreshTableProductos();

    }

}
 
 
export function getProducto()

{
 
}

//llena la tabla de producto

//con elarreglo.
 
export async function refreshTableProductos(){

let url = 'http://localhost:8080/sicefa_backend/api/Productos/getAll';

        let resp = await fetch(url);

        let datos = await resp.json();

        alert(JSON.stringify(datos));

        if (datos.error != null)

        {

        Swal.fire('', datos.error, 'warning');

                return;

                }

if (datos.exception != null)

        {

        Swal.fire('', datos.exception, 'danger');

                }

productos = datos;

        fillTableProducto();

        }

function fillTableProducto()

{

    //aqui vamos a guardar el contenido del

    //tboby de la tabla de producto:

    let contenido = '';

    for (let i = 0; i < productos.length; i++)

    {

        contenido += '<tr>' +

                '<td>' + productos[i].idProducto + '</td>' +

                '<td>' + productos[i].nombre + '</td>' +

                '<td>' + productos[i].nombreGenerico + '</td>' +

                '<td>' + productos[i].concentracion + '</td>' +

                '<td>' + productos[i].precioCompra + '</td>' +

                '<td>' + productos[i].precioVenta + '</td>' +

                '<td>' +

                '<a href="#" class="text-info" onclick="cm.cargarDetalleProducto(' + i + ');">detalleProducto</a> ' + '</td>' +

                '</tr>';

    }

    document.getElementById("tbodyProductos").innerHTML = contenido;

}

export function cargarDatosProductoEnFormulario(pro)

{

    alert(JSON.stringify(pro));

    // LLenamos las cajas de texto y demas controles con los datos del

    // empleado que recuperamos previamente:

     document.getElementById("txtIdProducto").value = pro.idProducto;

    document.getElementById("txtNombre").value = pro.nombre;

    document.getElementById("txtNombreGenerico").value = pro.nombreGenerico;

    document.getElementById("txtFormaFarmaceutica").value = pro.formaFarmaceutica;

    document.getElementById("txtUnidadMedida").value = pro.unidadMedida;

    document.getElementById("txtPresentacion").value = pro.presentacion;

    document.getElementById("txtPrincipalIndicacion").value = pro.principalIndicacion;

    document.getElementById("txtContraindicaciones").value = pro.contraindicaciones;

    document.getElementById("txtConcentracion").value = pro.concentracion;

    document.getElementById("txtUnidadesEnvase").value = pro.unidadesEnvase;

    document.getElementById("txtPrecioCompra").value = pro.precioCompra;

    document.getElementById("txtPrecioVenta").value = pro.precioVenta;

   document.getElementById("foto").value = pro.foto;

   document.getElementById("txtRutaFoto").value = pro.rutaFoto;

    document.getElementById("txtCodigoBarras").value = pro.codigoBarras;

    document.getElementById("txtEstatus").value = pro.estatus;

    }

    export function clearForm()

        {

     document.getElementById("txtIdProducto").value = '';

     document.getElementById("txtNombre").value = '';

    document.getElementById("txtNombreGenerico").value = '';

    document.getElementById("txtFormaFarmaceutica").value = '';

    document.getElementById("txtUnidadMedida").value = '';

    document.getElementById("txtPresentacion").value = '';

    document.getElementById("txtPrincipalIndicacion").value = '';

    document.getElementById("txtContraindicaciones").value = '';

    document.getElementById("txtConcentracion").value = '';

    document.getElementById("txtUnidadesEnvase").value = '';

    document.getElementById("txtPrecioCompra").value = '';

    document.getElementById("txtPrecioVenta").value = '';

   document.getElementById("foto").value = '';

    document.getElementById("txtRutaFoto").value = '';

    document.getElementById("txtCodigoBarras").value = '';

    document.getElementById("txtEstatus").value = '';

    }

 
 
export function cargarDetalleProducto(posicion)

{

    //Recuperamos el producto en la posicion indicada

    let pro = productos[posicion];

    document.getElementById("txtIdProducto").value = pro.idProducto;

    document.getElementById("txtNombre").value = pro.nombre;

    document.getElementById("txtNombreGenerico").value = pro.nombreGenerico;

    document.getElementById("txtFormaFarmaceutica").value = pro.formaFarmaceutica;

    document.getElementById("txtUnidadMedida").value = pro.unidadMedida;

    document.getElementById("txtPresentacion").value = pro.presentacion;

    document.getElementById("txtPrincipalIndicacion").value = pro.principalIndicacion;

    document.getElementById("txtContraindicaciones").value = pro.contraindicaciones;

    document.getElementById("txtConcentracion").value = pro.concentracion;

    document.getElementById("txtUnidadesEnvase").value = pro.unidadesEnvase;

    document.getElementById("txtPrecioCompra").value = pro.precioCompra;

    document.getElementById("txtPrecioVenta").value = pro.precioVenta;

    document.getElementById("foto").value = pro.foto;

    document.getElementById("txtRutaFoto").value = pro.rutaFoto;

    document.getElementById("txtCodigoBarras").value = pro.codigoBarras;

    document.getElementById("txtEstatus").value = pro.estatus;

 
 
    setDetalleProductosVisible(true);

}
 
 
// La función buscarPosicionProductoPorid no se está utilizando correctamente

// Aquí hay una corrección en su lógica:
 
function buscarPosicionProductoPorId(id) {

    for (let i = 0; i < productos.length; i++) {

        if (productos[i].idProducto === id) {

            return i;

        }

    }

    return -1;

}
 
 
//function buscarPosicionProductoPorid(id)

//{

//    for (let i = 0;

//    i < productos.length; i++)

//    {

//

//        if (productos[i].id === id)

//        {

//            return i;

//        }

//        return -1;

//    }

//}

export async function setDetalleProductosVisible(valor)

        {

        if (valor === true)

        {

        //OCULTAMOS LA SECCION DE CATALOGO DE EMPLEADOS

        document.getElementById('divCatalogoproducto').style.display = 'none';

//MOSTRAMOS LA SECCION DETALLES

                document.getElementById('divDetalleProducto').style.display = '';

        } else

        {

        //OCULTAMOS LA SECCION DE DETALLE DE EMPLEADOS

        document.getElementById('divDetalleProducto').style.display = 'none';

//MOSTRAMOS LA SECCION DE CATALOGO DE EMPLEADOS

                document.getElementById('divCatalogoproducto').style.display = '';

        }

        }
 
export function clearAndShowDetalleProductos()

{

    clearForm();

    setDetalleProductosVisible(true);

}




//
//
//
////let productos = [];
// 
////const filtrador = new mdb.Datatable(document.getElementById('')), data
// 
////  Insert y update en el mismo metodo
//export function inicializar()
//{
//    refreshTableProductos();
//    setDetalleProductosVisible(false);
//}
// 
// 
//// Ejemplo de uso:
////const productId = 1; // El ID del producto que deseas obtener
////getProductById(productId)
////  .then(producto => {
////    // Hacer algo con el producto obtenido, por ejemplo, mostrarlo en la consola
////    console.log('Producto obtenido:', producto);
////  })
////  .catch(error => {
////    // Manejar errores, por ejemplo, mostrar un mensaje al usuario
////    console.error('Error:', error);
////  });
//export async function updateProduct() {
//    const url = "http://localhost:8080/sicefa_backend/api/Productos/update";
//    const pro = {
//        idProducto: parseInt(document.getElementById("txtIdProducto").value.trim()),
//        nombre: document.getElementById("txtNombre").value.trim(),
//        nombreGenerico: document.getElementById("txtNombreGenerico").value.trim(),
//        formaFarmaceutica: document.getElementById("txtFormaFarmaceutica").value.trim(),
//        unidadMedida: document.getElementById("txtUnidadMedida").value.trim(),
//        presentacion: document.getElementById("txtPresentacion").value.trim(),
//        principalIndicacion: document.getElementById("txtPrincipalIndicacion").value.trim(),
//        contraindicaciones: document.getElementById("txtContraindicaciones").value.trim(),
//        concentracion: document.getElementById("txtConcentracion").value.trim(),
//        unidadesEnvase: parseInt(document.getElementById("txtUnidadesEnvase").value.trim()),
//        precioCompra: parseFloat(document.getElementById("txtPrecioCompra").value.trim()),
//        precioVenta: parseFloat(document.getElementById("txtPrecioVenta").value.trim()),
//        foto: "",
//        rutaFoto: document.getElementById("txtRutaFoto").value.trim(),
//        codigoBarras: document.getElementById("txtCodigoBarras").value.trim(),
//        estatus: parseInt(document.getElementById("txtEstatus").value.trim())
//    };
//
//    const params = {
//        datosProducto: JSON.stringify(pro)
//    };
//
//    const ctype = 'application/x-www-form-urlencoded;charset=UTF-8';
//    let resp;
//    let datos;
//
//    try {
//        resp = await fetch(url, {
//            method: "PUT",
//            headers: { 'Content-Type': ctype },
//            body: new URLSearchParams(params)
//        });
//
//        if (!resp.ok) {
//            throw new Error('Error en la solicitud.');
//        }
//
//        datos = await resp.json();
//
//        if (datos.exception) {
//            throw new Error(datos.exception);
//        }
//
//        Swal.fire('Movimiento', 'Producto Actualizado', 'success');
//        // Actualizar la tabla de productos después de la operación
//        refreshTableProductos();
//    } catch (error) {
//        Swal.fire('Error al actualizar el producto', error.message, 'error');
//    }
//}
//
//
//export async function deleteProduct() {
//    let idProducto = parseInt(document.getElementById("txtIdProducto").value.trim());
//
//    let url = `http://localhost:8080/sicefa_backend/api/productos/eliminar/${idProducto}`;
//    let resp = null;
//
//    try {
//        resp = await fetch(url, {
//            method: "DELETE", // Utilizamos el método DELETE para eliminar
//            headers: { 'Content-Type': 'application/json' }
//        });
//
//        if (resp.status === 204) {
//            Swal.fire('Movimiento', 'Producto Eliminado', 'success');
//            // Actualizar la tabla de productos después de la operación
//            refreshTableProductos();
//        } else {
//            const datos = await resp.json();
//            Swal.fire('Error al eliminar el producto', datos, 'error');
//        }
//    } catch (error) {
//        console.error('Error al eliminar el producto:', error);
//        Swal.fire('Error', 'Error al eliminar el producto', 'error');
//    }
//}
//
//
//
//// export async function deleteProduct() {
////    let idProducto = parseInt(document.getElementById("txtIdProducto").value.trim());
////
////    let url = 'http://localhost:8080/sicefa_backend/api/Productos/eliminarProducto';
////    let resp = null;
////
////    try {
////        resp = await fetch(url, {
////            method: "DELETE", // Utilizamos el método DELETE para eliminar
////            headers: { 'Content-Type': 'application/json' }
////        });
////
////        if (resp.status === 204) {
////            Swal.fire('Movimiento', 'Producto Eliminado', 'success');
////            // Actualizar la tabla de productos después de la operación
////            refreshTableProductos();
////        } else {
////            const datos = await resp.json();
////            Swal.fire('Error al eliminar el producto', datos.exception, 'error');
////        }
////    } catch (error) {
////        console.error('Error al eliminar el producto:', error);
////        Swal.fire('Error', 'Error al eliminar el producto', 'error');
////    }
////}
////export async function deleteProductN() {
////    let nombreProducto = document.getElementById("txtNombreProducto").value.trim(); // Cambiando a nombre de producto
////
////    let url = `http://localhost:8080/sicefa_backend/api/Productos/eliminarProducto/${nombreProducto}`; // Cambiando la URL para enviar el nombre
////    let resp = null;
////
////    try {
////        resp = await fetch(url, {
////            method: "DELETE", // Utilizamos el método DELETE para eliminar
////            headers: { 'Content-Type': 'application/json' }
////        });
////
////        if (resp.status === 204) {
////            Swal.fire('Movimiento', 'Producto Eliminado', 'success');
////            // Actualizar la tabla de productos después de la operación
////            refreshTableProductos();
////        } else {
////            const datos = await resp.json();
////            Swal.fire('Error al eliminar el producto', datos.exception, 'error');
////        }
////    } catch (error) {
////        console.error('Error al eliminar el producto:', error);
////        Swal.fire('Error', 'Error al eliminar el producto', 'error');
////    }
////}
//
//
//
//export  async function save(){
//    let url = "http://localhost:8080/sicefa_backend/api/Productos/save";
//    let params = null;
//    let resp = null;
//    let datos = null;
//    //Un objeto donde guardemos los datos del empleado:
//    let pro = null;
//    let idProducto = 0;
//    // Revisamos si hay un ID de empleado:
//    if (document.getElementById("txtIdProducto").value.trim().length > 0)
//    {
//        idProducto = parseInt(document.getElementById("txtIdProducto").value.trim());
//    }
//    //si no hay un empleado con el id descrito,
//    //creamos una nueva instancia del objeto;
//    pro = new Object();
//    pro.id = idProducto;
//
////Si posicion es mayor o igual a 0, si encontramos a un empleado;
////        if (posicion >= 0)
////            emp = empleados[posicion];
////        else
////        {
////          //Insertamos el objeto emp dentro de el arreglo de empleados:
//
////            empleados.push(emp); //EN DUDA
////        }
////Continuamos llenando los datos del objeto:
////Datos Producto
//    pro.nombre = document.getElementById("txtNombre").value;
//    pro.nombreGenerico = document.getElementById("txtNombreGenerico").value;
//    pro.formaFarmaceutica = document.getElementById("txtFormaFarmaceutica").value;
//    pro.unidadMedida = document.getElementById("txtUnidadMedida").value;
//    pro.presentacion = document.getElementById("txtPresentacion").value;
//    pro.principalIndicacion = document.getElementById("txtPrincipalIndicacion").value;
//    pro.contraindicaciones = document.getElementById("txtContraindicaciones").value;
//    pro.concentracion = document.getElementById("txtConcentracion").value;
//    pro.unidadesEnvase = document.getElementById("txtUnidadesEnvase").value;
//    pro.precioCompra = document.getElementById("txtPrecioCompra").value;
//    pro.precioVenta = document.getElementById("txtPrecioVenta").value;
//    pro.foto = "";
//    pro.rutaFoto = document.getElementById("txtRutaFoto").value;
//    pro.codigoBarras = document.getElementById("txtCodigoBarras").value;
//    pro.estatus = document.getElementById("txtEstatus").value;
//  params = {
//        datosProducto: JSON.stringify(pro)
//    };
//    let ctype = 'application/x-www-form-urlencoded;charset=UTF-8'; // Corrected content type
//    resp = await fetch(url, 
//    {
//        method: "POST",
//        headers: { 'Content-Type': ctype },
//        body: new URLSearchParams(params)
//    });
// 
//    datos = await resp.json();
// 
//    //if (datos.error != null) {
//      // Swal.fire('Error al guardar los datos del empleado', datos.error, 'warning');
//   // }
//  //refreshTableEmpleados();
//  //Swal.fire('Movimiento Realizado', 'Datos de Empleado Actualizados correctamente.', 'success');
//if (datos.error != null) {
//    Swal.fire('Error al guardar los datos de producto', datos.error, 'error');
//    return;
//}
//
////Swal.fire('Movimiento', 'Datos de Producto Actualizado', 'success');
//      // alert(JSON.stringify(datos));
//
//    //refreshTableProductos();
//    Swal.fire('Movimiento', 'Datos de Producto Actualizado', 'success');
//      alert(JSON.stringify(datos));
//refreshTableProductos();
//
//}
////export async function deleteProduct(idProducto) {
////    let url = //
////    let datos = null;
////
////    try {
////        const formData = new FormData();
////        formData.append('idProducto', idProducto);
////
////        const resp = await fetch(url, {
////            method: "DELETE",
////            body: formData // Enviar el ID del producto como un formulario
////        });
////
////        if (resp.ok) {
////            datos = await resp.json();
////            console.log('Producto eliminado:', datos);
////            return datos;
////        } else {
////            throw new Error('Error al intentar eliminar el producto');
////        }
////    } catch (error) {
////        console.error('Error al eliminar el producto:', error);
////        throw error;
////    }
////}
// 
//export async function deleteProducto() {
//    const idProducto = document.getElementById('txtIdProducto').value.trim();
// 
//    if (idProducto === '') {
//        Swal.fire('', 'Especifique un ID de producto.', 'warning');
//        return;
//    }
// 
//    const url = `http://localhost:8080/sicefa_backend/api/Productos/${idProducto}`; // Eliminar la parte 'delete/' del URL
// 
//    try {
//        const response = await fetch(url, {
//            method: 'DELETE'
//        });
// 
//        if (response.ok) {
//            Swal.fire('Movimiento realizado.', 'Registro de producto eliminado.', 'success');
//            fillTableProductos(); // Actualizar tabla después de eliminar
//        } else {
//            const data = await response.json();
//            Swal.fire('', data.error || 'Error al eliminar producto.', 'warning');
//        }
//    } catch (error) {
//        Swal.fire('', 'Hubo un error al procesar la solicitud.', 'error');
//        console.error('Error:', error);
//        refreshTableProductos();
//    }
//}
// 
// 
//export function getProducto()
//{
// 
//}
////llena la tabla de producto
////con elarreglo.
// 
//export async function refreshTableProductos(){
//let url = 'http://localhost:8080/sicefa_backend/api/Productos/getAll';
//        let resp = await fetch(url);
//        let datos = await resp.json();
//        alert(JSON.stringify(datos));
//        if (datos.error != null)
//        {
//        Swal.fire('', datos.error, 'warning');
//                return;
//                }
//if (datos.exception != null)
//        {
//        Swal.fire('', datos.exception, 'danger');
//                }
//productos = datos;
//        fillTableProducto();
//        }
//        
//function fillTableProducto()
//{
//    //aqui vamos a guardar el contenido del
//    //tboby de la tabla de producto:
//    let contenido = '';
//    for (let i = 0; i < productos.length; i++)
//    {
//        contenido += '<tr>' +
//                '<td>' + productos[i].idProducto + '</td>' +
//                '<td>' + productos[i].nombre + '</td>' +
//                '<td>' + productos[i].nombreGenerico + '</td>' +
//                '<td>' + productos[i].concentracion + '</td>' +
//                '<td>' + productos[i].precioCompra + '</td>' +
//                '<td>' + productos[i].precioVenta + '</td>' +
//                '<td>' +
//                '<a href="#" class="text-info" onclick="cm.cargarDetalleProducto(' + i + ');">detalleProducto</a> ' + '</td>' +
//                '</tr>';
//    }
//    document.getElementById("tbodyProductos").innerHTML = contenido;
//}
//export function cargarDatosProductoEnFormulario(pro)
//{
//    alert(JSON.stringify(pro));
//    // LLenamos las cajas de texto y demas controles con los datos del
//    // empleado que recuperamos previamente:
//     document.getElementById("txtIdProducto").value = pro.idProducto;
//    document.getElementById("txtNombre").value = pro.nombre;
//    document.getElementById("txtNombreGenerico").value = pro.nombreGenerico;
//    document.getElementById("txtFormaFarmaceutica").value = pro.formaFarmaceutica;
//    document.getElementById("txtUnidadMedida").value = pro.unidadMedida;
//    document.getElementById("txtPresentacion").value = pro.presentacion;
//    document.getElementById("txtPrincipalIndicacion").value = pro.principalIndicacion;
//    document.getElementById("txtContraindicaciones").value = pro.contraindicaciones;
//    document.getElementById("txtConcentracion").value = pro.concentracion;
//    document.getElementById("txtUnidadesEnvase").value = pro.unidadesEnvase;
//    document.getElementById("txtPrecioCompra").value = pro.precioCompra;
//    document.getElementById("txtPrecioVenta").value = pro.precioVenta;
//   document.getElementById("foto").value = pro.foto;
//   document.getElementById("txtRutaFoto").value = pro.rutaFoto;
//    document.getElementById("txtCodigoBarras").value = pro.codigoBarras;
//    document.getElementById("txtEstatus").value = pro.estatus;
//    }
//    export function clearForm()
//        {
//     document.getElementById("txtIdProducto").value = '';
//     document.getElementById("txtNombre").value = '';
//    document.getElementById("txtNombreGenerico").value = '';
//    document.getElementById("txtFormaFarmaceutica").value = '';
//    document.getElementById("txtUnidadMedida").value = '';
//    document.getElementById("txtPresentacion").value = '';
//    document.getElementById("txtPrincipalIndicacion").value = '';
//    document.getElementById("txtContraindicaciones").value = '';
//    document.getElementById("txtConcentracion").value = '';
//    document.getElementById("txtUnidadesEnvase").value = '';
//    document.getElementById("txtPrecioCompra").value = '';
//    document.getElementById("txtPrecioVenta").value = '';
//   document.getElementById("foto").value = '';
//    document.getElementById("txtRutaFoto").value = '';
//    document.getElementById("txtCodigoBarras").value = '';
//    document.getElementById("txtEstatus").value = '';
//    }
//
// 
// 
//export function cargarDetalleProducto(posicion)
//{
//    //Recuperamos el producto en la posicion indicada
//    let pro = productos[posicion];
//    document.getElementById("txtIdProducto").value = pro.idProducto;
//    document.getElementById("txtNombre").value = pro.nombre;
//    document.getElementById("txtNombreGenerico").value = pro.nombreGenerico;
//    document.getElementById("txtFormaFarmaceutica").value = pro.formaFarmaceutica;
//    document.getElementById("txtUnidadMedida").value = pro.unidadMedida;
//    document.getElementById("txtPresentacion").value = pro.presentacion;
//    document.getElementById("txtPrincipalIndicacion").value = pro.principalIndicacion;
//    document.getElementById("txtContraindicaciones").value = pro.contraindicaciones;
//    document.getElementById("txtConcentracion").value = pro.concentracion;
//    document.getElementById("txtUnidadesEnvase").value = pro.unidadesEnvase;
//    document.getElementById("txtPrecioCompra").value = pro.precioCompra;
//    document.getElementById("txtPrecioVenta").value = pro.precioVenta;
//    document.getElementById("foto").value = pro.foto;
//    document.getElementById("txtRutaFoto").value = pro.rutaFoto;
//    document.getElementById("txtCodigoBarras").value = pro.codigoBarras;
//    document.getElementById("txtEstatus").value = pro.estatus;
//
// 
// 
//    setDetalleProductosVisible(true);
//}
// 
// 
//// La función buscarPosicionProductoPorid no se está utilizando correctamente
//// Aquí hay una corrección en su lógica:
// 
//function buscarPosicionProductoPorId(id) {
//    for (let i = 0; i < productos.length; i++) {
//        if (productos[i].idProducto === id) {
//            return i;
//        }
//    }
//    return -1;
//}
// 
// 
////function buscarPosicionProductoPorid(id)
////{
////    for (let i = 0;
////    i < productos.length; i++)
////    {
////
////        if (productos[i].id === id)
////        {
////            return i;
////        }
////        return -1;
////    }
////}
//export async function setDetalleProductosVisible(valor)
//        {
//        if (valor === true)
//        {
//        //OCULTAMOS LA SECCION DE CATALOGO DE EMPLEADOS
//        document.getElementById('divCatalogoproducto').style.display = 'none';
////MOSTRAMOS LA SECCION DETALLES
//                document.getElementById('divDetalleProducto').style.display = '';
//        } else
//        {
//        //OCULTAMOS LA SECCION DE DETALLE DE EMPLEADOS
//        document.getElementById('divDetalleProducto').style.display = 'none';
////MOSTRAMOS LA SECCION DE CATALOGO DE EMPLEADOS
//                document.getElementById('divCatalogoproducto').style.display = '';
//        }
//        }
// 
//export function clearAndShowDetalleProductos()
//{
//    clearForm();
//    setDetalleProductosVisible(true);
//}