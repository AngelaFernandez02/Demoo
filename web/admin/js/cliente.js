let clientes = [
    {
        "id": 1,
        "email": "juanSaldaña@gmail.com",
        "fechaRegistro": "2015-01-03",
        "estatus": 1,
        "persona":
                {
                    "id": 1,
                    "nombre": "Juan",
                    "apellidoPaterno": "Saldaña",
                    "apellidoMaterno": "Martinez",
                    "fechaNacimiento": "1993-12-09",
                    "rfc": "sif84t",
                    "codigoPostal": "453546",
                    "domicilio": "Lomas del Campestre 112",
                    "ciudad": "Silao",
                    "estado": "Guanajuato",
                    "telefono": "458395",
                    "foto": "",
                    "curp": "juanfidg",
                    "genero": "H"
                }
    },
    {
        "id": 2,
        "email": "MariaSuares@gmail.com",
        "fechaRegistro": "2021-04-17",
        "estatus": 1,
        "persona":
                {
                    "id": 2,
                    "nombre": "Maria Alejandra",
                    "apellidoPaterno": "Suares",
                    "apellidoMaterno": "Fernandez",
                    "fechaNacimiento": "1996-11-10",
                    "rfc": "rgtyty",
                    "codigoPostal": "453546",
                    "domicilio": "Echeveste 45",
                    "ciudad": "Leon",
                    "estado": "Guanajuato",
                    "telefono": "454677",
                    "foto": "",
                    "curp": "marisnffjg",
                    "genero": "M"
                }

    },
    {
        "id": 3,
        "email": "PedroLopez@gmail.com",
        "fechaRegistro": "200-05-14",
        "estatus": 1,

        "persona": {
            "id": 3,
            "nombre": "Pedro",
            "apellidoPaterno": "López",
            "apellidoMaterno": "Ramírez",
            "fechaNacimiento": "1990-08-25",
            "rfc": "klsfj84",
            "codigoPostal": "450876",
            "domicilio": "Av. Revolución 23",
            "ciudad": "Guadalajara",
            "estado": "Jalisco",
            "telefono": "457834",
            "foto": "",
            "curp": "pedrognvm",
            "genero": "H"

        }
    },

    {
        "id": 4,
        "email": "AnaGarcia@gmail.com",
        "fechaRegistro": "1980-10-31",
        "estatus": 1,
        "persona":
                {
                    "id": 4,
                    "nombre": "Ana",
                    "apellidoPaterno": "García",
                    "apellidoMaterno": "Martínez",
                    "fechaNacimiento": "1988-05-12",
                    "rfc": "plos94f",
                    "codigoPostal": "451290",
                    "domicilio": "Calle del Bosque 67",
                    "ciudad": "Zapopan",
                    "estado": "Jalisco",
                    "telefono": "459874",
                    "foto": "",
                    "curp": "anagmg3j",
                    "genero": "M"

                }
    },
    {
        "id": 5,
        "email": "CarlosLara@gmail.com",
        "fechaRegistro": "2019-09-10",
        "estatus": 1,
        "persona": {
            "id": 5,
            "nombre": "Carlos",
            "apellidoPaterno": "Hernández",
            "apellidoMaterno": "Lara",
            "fechaNacimiento": "1995-02-18",
            "rfc": "s9dfg34",
            "codigoPostal": "451876",
            "domicilio": "Colinas de San Miguel 32",
            "ciudad": "Tlaquepaque",
            "estado": "Jalisco",
            "telefono": "456789",
            "foto": "",
            "curp": "carlosqwe87",
            "genero": "M"

        }
    }
];

//const filtrador = new mdb.Datatable(document.getElementById());


//Esta funcion nos sirve para inicializar el modulo de sucursales.
export function inicializar() {
    setDetalleClienteVisible(false);
    fillTableCliente();
}

//  Insert y update en el mismo metodo


export function save()
{
    //Declaramos un objecto donde guardamos los datos de la sucursal 
    let cli = null;
    let posicion = -1; //Parra saber si una sucursal ya existe o no
    let idCliente = 0;

    //Revisamos si hay Id sucursal
    if (document.getElementById("txtIdCli").value.trim().length > 0)
    {
        idCliente = parseInt(document.getElementById("txtIdCli").value.trim());
        posicion = buscarPosicionClientelId(idCliente);

        //Si posicion es mayor o igual a 0, si encontramos un empleado:
        if (posicion >= 0)
            cli = clientes[posicion];
        else
        {
            //Si no hay un empleado con el ID descrito,
            //creamos una nueva instancia del Objecto 
            cli = new Object();
            //el id se la acabo de definir
            cli.id = idCliente;

            cli.persona = new Object();
            cli.persona.id = parseInt(document.getElementById("txtIdCliPersona").value.trim());


            //Insertamos el objecto emp dentro del arreglo de empleados
            clientes.push(cli);

        }

        //Continuamos llenando los datos del objecto 

        
        //cliente
        cli.email = document.getElementById("txtEmailCli").value;
        cli.fechaRegistro = document.getElementById("txtFechaRegistroCli").value;
        cli.estatus = document.getElementById("txtEstatusCli").value;

        //Datos de la sucursal
        cli.persona.nombre = document.getElementById("txtNombreCli").value;
        cli.persona.apellidoPaterno = document.getElementById("txtApellidoPaCli").value;
        cli.persona.apellidoMaterno = document.getElementById("txtApellidoMaCli").value;
        cli.persona.genero = document.getElementById("cmbGenero").value = '';
        cli.persona.fechaNacimiento = document.getElementById("txtFechaNaciCli").value = '';
        cli.persona.rfc = document.getElementById("txtRfcCli").value = '';
        cli.persona.curp = document.getElementById("txtCurpCli").value = '';
        cli.persona.domicilio = document.getElementById("txtDireccionCli").value = '';
        cli.persona.codigoPostal = document.getElementById("txtCodigoPostalCli").value = '';
        cli.persona.ciudad = document.getElementById("txtCiudadCli").value = '';
        cli.persona.estado = document.getElementById("txtEstadoCli").value = '';
        cli.persona.telefono = document.getElementById("txtTelefonoCli").value = '';
//      cli.persona.foto = document.getElementById("").value = '';



        //Refrescamos el catalogo de la sucursal:
        fillTableCliente();

        Swal.fire('Movimiento Realizado', 'Datos de la Sucursal Actualizados correctamente.', 'succes');


    } else
    {
        Swal.fire('Verificaci&oacute;n dedatos requerida.',
                'Debe agregar un Id de la sucursal (valor numerico).',
                'warning'
                );
    }
}

export function deleteCliente()
{
    let posicion = -1;
    let idCliente = 0;

//Revisamos si hay in Id sucursal
    if (document.getElementById("txtIdCli").value.trim().length > 0)
    {
        //Recuperamos el Id de la sucursal que deseamos eliminar
        idCliente = parseInt(document.getElementById("txtIdCli").value.trim());

        //Buscamos la posicion de la sucursal con ese Id

        posicion = buscarPosicionClientelId(idCliente);

        //Si la posicion de la sucursal existe, lo quitamos del arreglo

        if (posicion >= 0)
        {
            clientes.splice(posicion, 1);
            Swal.fire('Movimiento realizado.', 'Registro de la Sucursal Eliminada.', 'succes');
            fillTableCliente();

        } else
        {
            Swal.fire('', 'El ID de la Sucursal especificado no existe.', 'warning');
        }
    } else
    {
        Swal.fire('', 'Especifique in Id de la Sucursal.', 'waring');
    }
}

export function getSucursal()
{

}

//Llena la tabla de sucursales  con el arreglo
function fillTableCliente()
{
    //Aqui vamos ir guaradando el contenido del
    //tbody de la tabla sucursal:
    let contenido = '';

// for recorremos elemento por elemento 

    for (let i = 0; i < clientes.length; i++)
    {

        contenido += '<tr>' +
                '<td>' +
                clientes[i].persona.nombre + '' +
                clientes[i].persona.apellidoPaterno + '' +
                clientes[i].persona.apellidoMaterno + '' +
                '</td>' +
                '<td>' + clientes[i].persona.genero + '</td>' +
                '<td>' + clientes[i].persona.telefono + '</td>' +
                '<td>' + clientes[i].persona.domicilio + '</td>' +
                '<td>' + clientes[i].persona.rfc + '</td>' +
                '<td>' + clientes[i].persona.curp + '</td>' +
                '<td>' + clientes[i].persona.fechaNacimiento + '</td>' +
                '<td>' + clientes[i].email + '</td>' +
                '<td>' + clientes[i].fechaRegistro + '</td>' +
                '<td>' + clientes[i].persona.codigoPostal + '</td>' +
                '<td>' +
                '<a href="#" class="text-info" onclick="cm.cargarDetalleCliente(' + i + ');"><i class="bi bi-eye"></i></a>' +
                '</td>' +
                '</tr>';
    }

    document.getElementById("tbodyClientes").innerHTML = contenido;

}

export function cargarDetalleCliente(posicion)
{
    //Recuperamos la sucursal en la posicion indicada:
    let cli = clientes[posicion];

    //Lenamos las cajas de texto y demas controles con los datos 
    //de la sucursal que recuperamos previamente.

    //ID
    document.getElementById("txtIdCli").value = cli.id;
    document.getElementById("txtIdCliPersona").value = cli.persona.id;
    //cliente
    document.getElementById("txtEmailCli").value = cli.nombre;
    document.getElementById("txtFechaRegistroCli").value = cli.fechaRegistro;
    document.getElementById("txtEstatusCli").value = cli.estatus;

    //Datos de la sucursal
    document.getElementById("txtNombreCli").value = cli.persona.nombre;
    document.getElementById("txtApellidoPaCli").value = cli.persona.apellidoPaterno;
    document.getElementById("txtApellidoMaCli").value = cli.persona.apellidoMaterno;
    document.getElementById("cmbGenero").value = cli.persona.genero;
    document.getElementById("txtFechaNaciCli").value = cli.persona.fechaNacimiento;
    document.getElementById("txtRfcCli").value = cli.persona.rfc;
    document.getElementById("txtCurpCli").value = cli.persona.curp;
    document.getElementById("txtDireccionCli").value = cli.persona.domicilio;
    document.getElementById("txtCodigoPostalCli").value = cli.persona.codigoPostal;
    document.getElementById("txtCiudadCli").value = cli.persona.ciudad;
    document.getElementById("txtEstadoCli").value = cli.persona.estado;
    document.getElementById("txtTelefonoCli").value = cli.persona.telefono;
//    document.getElementById("").value = cli.persona.foto;

    setDetalleClienteVisible(true);


}

export function clearForm()
{
    document.getElementById("txtIdCli").value = '';
    document.getElementById("txtIdCliPersona").value = '';
    //cliente
    document.getElementById("txtEmailCli").value = '';
    document.getElementById("txtFechaRegistroCli").value = '';
    document.getElementById("txtEstatusCli").value = '';

    //Datos de la sucursal
    document.getElementById("txtNombreCli").value = '';
    document.getElementById("txtApellidoPaCli").value = '';
    document.getElementById("txtApellidoMaCli").value = '';
    document.getElementById("cmbGenero").value = '';
    document.getElementById("txtFechaNaciCli").value = '';
    document.getElementById("txtRfcCli").value = '';
    document.getElementById("txtCurpCli").value = '';
    document.getElementById("txtDireccionCli").value = '';
    document.getElementById("txtCodigoPostalCli").value = '';
    document.getElementById("txtCiudadCli").value = '';
    document.getElementById("txtEstadoCli").value = '';
    document.getElementById("txtTelefonoCli").value = '';
//    document.getElementById("").value = '';

}

//Busca la posicion de un onjecto sucursal
//con base la propieda ID y la devuelve 
//Si no se encuentra  el Id buscado 
//el metodo devuelve -1
function buscarPosicionClientelId(id)
{

    for (let i = 0;
    i < clientes.length; i++)
    {
        if (clientes[i].id === id)
            return i;

    }
    return -1;
}

export function  setDetalleClienteVisible(valor)
{
    if (valor === true)
    {
        //
        document.getElementById('divCatalogoCliente').style.display = 'none';
        //
        document.getElementById('divDetalleCliente').style.display = '';


    } else
    {
        //Ocultamos la seccion del detalle
        document.getElementById('divDetalleCliente').style.display = 'none';
        //
        document.getElementById('divCatalogoCliente').style.display = '';
    }
}

export function clearAndShowDetalleCliente()
{
    clearForm();
    setDetalleClienteVisible(true);
}

