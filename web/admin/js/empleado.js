let empleados = [];
//const filtrador = new mdb.Datatable(document.getElementById('datatable'),data)
//sirve para inicializar el modulo de empleados
export async function inicializar()
        {
        setDetalleEmpleadoVisible(false);
                refreshTableEmpleados();
                cargarSucursales();
                //Inicializamos filtro en la tabla
                //document.getElementById('txtFiltro')

                }
//  Insert y update en el mismo metodo

export  async function save()
        {
        let url = "http://localhost:8080/sicefa_backend/api/empleado/save";
                let params = null;
                let resp = null;
                let datos = null;
                // Declaramos un objeto donde guardaremos los datos del empleado:
                let emp = null;
                //let posicion = -1; // Para saber si un empleado ya existe o no.
                let idEmpleado = 0;
                let idPersona = 0;
                let idUsuario = 0;
                // Revisamos si hay un ID de empleado:
                if (document.getElementById("txtIdEmpleado").value.trim().length > 0)
        {
               idEmpleado = parseInt(document.getElementById("txtIdEmpleado").value.trim());
                idPersona = parseInt(document.getElementById("txtIdPersona").value.trim());
                idUsuario = parseInt(document.getElementById("txtIdUsuario").value.trim());
        }
        // Si no hay un empleado con el ID descrito,
        // creamos una nueva instancia del Objeto:
        emp = new Object();
                emp.id = idEmpleado;
                emp.persona = new Object();
                emp.persona.id = idPersona;
                emp.usuario = new Object();
                emp.usuario.id = idUsuario;
                emp.sucursal = new Object();
                emp.sucursal.id = 0;
                // Si posicion es mayor o igual a 0, si encontramos un empleado:
                if (document.getElementById("txtIdEmpleado"));
        else
        {


        // Insertamos el objeto emp dentro del arreglo de empleados:
        empleados.push(emp);
        }


        emp = new Object();
                emp.id = idEmpleado;
                emp.persona = new Object();
                emp.persona.id = idPersona;
                emp.usuario = new Object();
                emp.usuario.id = idUsuario;
                emp.sucursal = new Object();
                emp.sucursal.id = 0;
                // Continuamos llenando los datos del objeto:
                // Datos de Persona:
                emp.persona.nombre = document.getElementById("txtNombre").value;
                emp.persona.apellidoPaterno = document.getElementById("txtApellidoPaterno").value;
                emp.persona.apellidoMaterno = document.getElementById("txtApellidoMaterno").value;
                emp.persona.genero = document.getElementById("cmbGenero").value;
                emp.persona.fechaNacimiento = document.getElementById("txtFechaNacimiento").value;
                emp.persona.rfc = document.getElementById("txtRfc").value;
                emp.persona.curp = document.getElementById("txtCurp").value;
                emp.persona.domicilio = document.getElementById("txtDomicilio").value;
                emp.persona.cp = document.getElementById("txtCodigoPostal").value;
                emp.persona.ciudad = document.getElementById("txtCiudad").value;
                emp.persona.estado = document.getElementById("txtEstado").value;
                emp.persona.telefono = document.getElementById("txtTelefono").value;
                // Datos del Empleado:
                emp.codigo = document.getElementById("txtCodigoEmpleado").value;
                emp.email = document.getElementById("txtEmail").value;
                emp.fechaContratacion = document.getElementById("txtFechaIngreso").value;
                emp.puesto = document.getElementById("cmbPuesto").value;
                emp.salarioBruto = document.getElementById("txtSalarioBruto").value;
                emp.sucursal.id = document.getElementById("cmbSucursal").value;
                // Datos de Usuario:
                emp.usuario.nombreUsuario = document.getElementById("txtNombreUsuario").value;
                emp.usuario.contrasenia = document.getElementById("txtContrasenia").value;
                emp.usuario.rol = document.getElementById("cmbRol").value;
                params = {
                datosEmpleado : JSON.stringify(emp)
                };
                let ctype = 'application/x-www-form-urlencoded;charset=UTF-8';
                resp = await fetch(url,
                {   method:"POST",
                        headers:{'Content-Type': ctype},
                        body: new URLSearchParams(params)

                });
                datos = await resp.json();
                if(datos.error !=null){
                    Swal.fire('Erro al guardar los datos del empleado', datos.error, 'warning');
                    return;
                }
                // Refrescamos el catalogo de empleados:
                fillTableEmpleado();
                Swal.fire('Movimiento Realizado', 'Datos de Empleado Actualizados correctamente.', 'success');
                }

export function deleteEmpleado()
        {
        let posicion = - 1;
                let idEmpleado = 0;
                //resvisamos si hay un id de empleado
                if (document.getElementById("txtIdEmpleado").value.trim().length > 0)
        {

        //recuperamos el id del empleado que deseamos eliminar:
        idEmpleado = parseInt(document.getElementById("txtIdEmpleado").value.trim());
                //Buscamos la posicion del empleado con ese id:
                posicion = buscarPosicionEmpleadoPorId(idEmpleado);
                //Si la posicion del empleado existe, lo quitamos del arreglo:

                if (posicion >= 0)
        {
        empleados.splice(posicion, 1);
                Swal.fire('Movimiento realizado.', 'Registro de empleado eliminado.', 'succes');
                fillTableEmpleado();
        } else
        {
        Swal.fire('', 'El id de emplpeado especificado no existe.', 'warning');
        }
        } else
        {
        Swal.fire('', 'Especifique un id de empleado.', 'warning');
        }
        }

export function getEmpleado()
        {

        }
//Llena la tabla de empleados
//con el arreglo.
export async function refreshTableEmpleados(){
let url = 'http://localhost:8080/sicefa_backend/api/empleado/getAll';
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
empleados = datos;
        fillTableEmpleado();
        }
function fillTableEmpleado()
        {
        //Aqui vamos a ir guardando el contenido del 
        //tbody de la tabla empleados:
        let contenido = '';
//recorremos el arreglo por elemento:
                for (let i = 0; i < empleados.length; i++)
        {
        contenido += '<tr>' +
                '<td>' +
                empleados[i].persona.nombre + '' +
                empleados[i].persona.apellidoPaterno + '' +
                empleados[i].persona.apellidoMaterno +
                '</td>' +
                '<td>' + empleados[i].codigo + '</td>' +
                '<td>' + empleados[i].usuario.nombreUsuario + '</td>' +
                '<td>' + empleados[i].persona.rfc + '</td>' +
                '<td>' + empleados[i].persona.curp + '</td>' +
                '<td>' + empleados[i].email + '</td>' +
                '<td>' + empleados[i].persona.telefono + '</td>' +
                '<td>' + empleados[i].estatus + '</td>' +
                '<td>' +
                '<a href="#"  class="text-info" onclick="cm.cargarDetalleEmpleado(' + i + ');"><i class="bi bi-eye"></i></a>' +
                '</td>' +
                '</tr>';
        }
        document.getElementById("tbodyEmpleados").innerHTML = contenido;
                }
export function cargarDetalleEmpleado(posicion)
        {
        //recuperar empleado
        let  emp = empleados[posicion];
                //llenamos las cajas de texto
                document.getElementById("txtIdEmpleado").value = emp.id;
                document.getElementById("txtIdPersona").value = emp.persona.id;
                document.getElementById("txtIdUsuario").value = emp.usuario.id;
                document.getElementById("txtNombre").value = emp.persona.nombre;
                document.getElementById("txtApellidoPaterno").value = emp.persona.apellidoPaterno;
                document.getElementById("txtApellidoMaterno").value = emp.persona.apellidoMaterno;
                document.getElementById("cmbGenero").value = emp.persona.genero;
                document.getElementById("txtFechaNacimiento").value = emp.persona.fechaNacimiento;
                document.getElementById("txtRfc").value = emp.persona.rfc;
                document.getElementById("txtCurp").value = emp.persona.curp;
                document.getElementById("txtDomicilio").value = emp.persona.domicilio;
                document.getElementById("txtCodigoPostal").value = emp.persona.cp;
                document.getElementById("txtCiudad").value = emp.persona.ciudad;
                document.getElementById("txtEstado").value = emp.persona.estado;
                document.getElementById("txtTelefono").value = emp.persona.telefono;
                //Datos del empleado
                document.getElementById("txtCodigoEmpleado").value = emp.clave;
                document.getElementById("txtFechaIngreso").value = emp.fechaContratacion;
                document.getElementById("cmbPuesto").value = emp.puesto;
                document.getElementById("txtSalarioBruto").value = emp.salarioBruto;
                document.getElementById("txtEmail").value = emp.email;
                //Datos de Usuario
                document.getElementById("txtNombreUsuario").value = emp.usuario.nombreUsuario;
                document.getElementById("txtContrasenia").value = emp.usuario.contrasenia;
                document.getElementById("cmbRol").value = emp.usuario.rol;
                setDetalleEmpleadoVisible(true);
                }
                
  export function cargarDatosEmpleadoEnFormulario(emp)
{
    alert(JSON.stringify(emp));
    // LLenamos las cajas de texto y demas controles con los datos del
    // empleado que recuperamos previamente:
    document.getElementById("txtIdEmpleado").value = emp.id;
    document.getElementById("txtIdPersona").value = emp.persona.id;
    document.getElementById("txtIdUsuario").value = emp.usuario.id;
   
    // Datos de Persona:
    document.getElementById("txtNombre").value = emp.persona.nombre;
    document.getElementById("txtApellidoPaterno").value = emp.persona.apellidoPaterno;
    document.getElementById("txtApellidoMaterno").value = emp.persona.apellidoMaterno;
    document.getElementById("cmbGenero").value = emp.persona.genero;
    document.getElementById("txtFechaNacimiento").value = emp.persona.fechaNacimiento;
    document.getElementById("txtRfc").value = emp.persona.rfc;
    document.getElementById("txtCurp").value = emp.persona.curp;
    document.getElementById("txtDomicilio").value = emp.persona.domicilio;
    document.getElementById("txtCodigoPostal").value = emp.persona.cp;
    document.getElementById("txtCiudad").value = emp.persona.ciudad;
    document.getElementById("txtEstado").value = emp.persona.estado;
    document.getElementById("txtTelefono").value = emp.persona.telefono;
   
    // Datos del Empleado:
    document.getElementById("txtCodigoEmpleado").value = emp.codigo;
    document.getElementById("txtEmail").value = emp.email;
    document.getElementById("txtFechaIngreso").value = emp.fechaContratacion;
    document.getElementById("cmbPuesto").value = emp.puesto;
    document.getElementById("txtSalarioBruto").value = emp.salarioBruto;   
   
    // Datos de Usuario:
    document.getElementById("txtNombreUsuario").value = emp.usuario.nombreUsuario;
    document.getElementById("txtContrasenia").value = emp.usuario.contrasenia;
    document.getElementById("cmbRol").value = emp.usuario.rol;
}
export function clearForm()
        {
        document.getElementById("txtIdEmpleado").value = '';
                document.getElementById("txtIdPersona").value = '';
                document.getElementById("txtIdUsuario").value = '';
                document.getElementById("txtNombre").value = '';
                document.getElementById("txtApellidoPaterno").value = '';
                document.getElementById("txtApellidoMaterno").value = '';
                document.getElementById("cmbGenero").value = '';
                document.getElementById("txtFechaNacimiento").value = '';
                document.getElementById("txtRfc").value = '';
                document.getElementById("txtCurp").value = '';
                document.getElementById("txtDomicilio").value = '';
                document.getElementById("txtCodigoPostal").value = '';
                document.getElementById("txtCiudad").value = '';
                document.getElementById("txtTelefono").value = '';
                //Datos del empleado
                document.getElementById("txtCodigoEmpleado").value = '';
                document.getElementById("txtFechaIngreso").value = '';
                document.getElementById("cmbPuesto").value = '';
                document.getElementById("txtSalarioBruto").value = '';
                document.getElementById("txtEmail").value = '';
                //Datos de Usuario
                document.getElementById("txtNombreUsuario").value = '';
                document.getElementById("txtContrasenia").value = '';
                document.getElementById("cmbRol").value = '';
                }

//busca la posicion de un objeto empleado
//si no se encuentra el id buscado, el metodo devuelve -1.
function buscarPosicionEmpleadoPorId(id)
        {

        for (let i = 0;
                i < empleados.length; i++)
        {
        if (empleados[i].id === id)
                return i;
        }
        return - 1;
                }
export function setDetalleEmpleadoVisible(valor)
        {
        if (valor === true)
        {
        //OCULTAMOS LA SECCION DE CATALOGO DE EMPLEADOS
        document.getElementById('divCatalogoEmpleados').style.display = 'none';
//MOSTRAMOS LA SECCION DETALLES
                document.getElementById('divDetalleEmpleado').style.display = '';
        } else
        {
        //OCULTAMOS LA SECCION DE DETALLE DE EMPLEADOS
        document.getElementById('divDetalleEmpleado').style.display = 'none';
//MOSTRAMOS LA SECCION DE CATALOGO DE EMPLEADOS
                document.getElementById('divCatalogoEmpleados').style.display = '';
        }
        }
        
export function clearAndShowDetalleEmpleado()
        {
        clearForm();
                setDetalleEmpleadoVisible(true);
                }
                
              
                

export async function cargarSucursales()
        {
        let url = "http://localhost:8086/sicefa_backend/api/sucursal/getAll";
                let resp = await fetch(url);
                let datos = await resp.json();
                let contenido = '';
                if (datos.error != null)
        {
        Swal.fire('', datos.error, 'warning');
                return;
        }
        if (datos.exception != null)
        {
        Swal.fire('', datos.exception, 'danger');
                return;
        }
        //LLenamos las opciones del combo box con el ID y Nombre de la Sucursal:
        for (let i = 0; i < datos.length; i++)
                contenido += '<option value="' + datos[i].id + '">' + datos[i].nombre + '</option>';
                document.getElementById("cmbSucursal").innerHTML = contenido;
                }
                