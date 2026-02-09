var AppSession = "../Compras/OrdenCompraUnitario.aspx";

var CodigoMenu = 4000;
var CodigoInterno = 8;

var GridArticulosInicializado = '';
var GridDetalleDocumento = '';
var CodCajaFisica = "0";
$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
//    document.onkeydown = function (evt) {
//        return (evt ? evt.which : event.keyCode) != 13;
//    }


    $('#MainContent_txtNroRuc').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                //data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'2','CodTipoCliente':'" + $('#hfCodTipoCliente').val() + "'}",
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'2','CodTipoCliente':'0'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[1],
                            val: item.split(',')[0],
                            Direccion: item.split(',')[2],
                            DireccionEnvio: item.split(',')[3],
                            Distrito: item.split(',')[4],
                            CodDepartamento: item.split(',')[5],
                            CodProvincia: item.split(',')[6],
                            CodDistrito: item.split(',')[7],
                            NroRuc: item.split(',')[8],
                            ApePaterno: item.split(',')[9],
                            ApeMaterno: item.split(',')[10],
                            Nombres: item.split(',')[11],
                            Cliente: item.split(',')[1],
                            SaldoCreditoFavor: item.split(',')[12]
                        }
                    }))
                },
                error: function (response) {
                    alertify.log(response.responseText);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#MainContent_txtNroRuc').val(i.item.NroRuc);
            $('#hfNroRuc').val(i.item.NroRuc);
            $('#hfCodCtaCte').val(i.item.val);
            $('#hfCliente').val(i.item.label);
            $('#MainContent_txtProveedor').val(i.item.label);
            $('#MainContent_txtNroRuc').val(i.item.NroRuc);
            $('#MainContent_txtDireccion').val(i.item.Direccion);
            $('#MainContent_txtDistrito').val(i.item.Distrito.trim());
            $('#hfCodDireccion').val('0');
            $('#hfCodDepartamento').val(i.item.CodDepartamento);
            $('#hfCodProvincia').val(i.item.CodProvincia);
            $('#hfCodDistrito').val(i.item.CodDistrito);
            $('#hfDistrito').val(i.item.Distrito.trim());

            F_BuscarDireccionesCliente();
        },
        complete: function () {
            $('#MainContent_txtNroRuc').val($('#hfNroRuc').val());
            $('#MainContent_txtProveedor').focus();
        },
        minLength: 3
    });

    $('#MainContent_txtClienteConsulta').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 2 + "','CodTipoCliente':'" + 0 + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[1],
                            val: item.split(',')[0],
                            Direccion: item.split(',')[2]
                        }
                    }))
                },
                error: function (response) {
                    alertify.log(response.responseText);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#hfCodCtaCteConsulta').val(i.item.val);
        },
        minLength: 3
    });

    $('#MainContent_txtDistrito').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_TCDistrito_Listar',
                data: "{'Descripcion':'" + request.term + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[3],
                            val: item.split(',')[0],
                            CodProvincia: item.split(',')[1],
                            CodDistrito: item.split(',')[2]
                        }
                    }))
                },
                error: function (response) {
                    alertify.log(response.responseText);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#hfCodDepartamento').val(i.item.val);
            $('#hfCodProvincia').val(i.item.CodProvincia);
            $('#hfCodDistrito').val(i.item.CodDistrito);
            $('#hfDistrito').val(i.item.label);
            F_BuscarDireccionesCliente();
            //F_BuscarDireccionPorDefecto();
        },
        minLength: 3
    });

    
    $("#MainContent_txtDistrito").bind("propertychange change keyup paste input", function(){
        if ($("#MainContent_txtDistrito").val() != $("#hfDistrito").val() & $("#hfCodDistrito").val() != '0')
        {
            $("#MainContent_txtDistrito").val('');
            $("#hfDistrito").val('');
            $("#hfCodDistrito").val('0');
            $("#MainContent_txtDireccion").val('');
            $("#hfCodDireccion").val('0');
            $("#hfDireccion").val('');
        }
            var Index= $('#MainContent_txtNroRuc').val().indexOf('-');
            var Cliente = $('#MainContent_txtNroRuc').val();

            if ( Index ==-1 ) {} else {
            $('#MainContent_txtNroRuc').val(Cliente.split('-')[0].trim());
            $('#hfCliente').val($('#MainContent_txtNroRuc').val());
            }
    });

    $("#MainContent_txtNroRuc").bind("propertychange change keyup paste input", function(){


            var Index= $('#MainContent_txtNroRuc').val().indexOf('-');
            var Cliente = $('#MainContent_txtNroRuc').val();
            var NroRuc = '';
            if ( Index ==-1 ) {} else {
            NroRuc = Cliente.split('-')[0].trim();
            }


        if (NroRuc != $("#hfNroRuc").val() & $("#hfCodCtaCte").val() != '0')
        {
            var nroruc = $("#MainContent_txtNroRuc").val();
            F_LimpiarCamposDatos();
            $("#MainContent_txtNroRuc").val(nroruc);
            $("#MainContent_txtNroRuc").focus();
        }
    });

    $("#MainContent_txtProveedor").bind("propertychange change keyup paste input", function(){
        if ($("#MainContent_txtProveedor").val() != $("#hfCliente").val() & $("#hfCodCtaCte").val() != '0')
        {
            if ($("#MainContent_txtNroRuc").val() != '11111111111')
            {
                alertify.log('NO SE PUEDE MODIFICAR CLIENTES REGISTRADOS');
                $("#MainContent_txtProveedor").val($("#hfCliente").val());
                return true;
            }
        }
    });

    $("#MainContent_txtDireccion").bind("propertychange change keyup paste input", function(){
        if ($("#MainContent_txtDireccion").val().trim() != $("#MainContent_ddlDireccion option:selected").text().trim() & $("#hfCodDireccion").val() != '0')
        {
            //$("#MainContent_txtDireccion").val('');
            $("#hfCodDireccion").val('0');
            
        }

            var Index= $('#MainContent_txtNroRuc').val().indexOf('-');
            var Cliente = $('#MainContent_txtNroRuc').val();

            if ( Index ==-1 ) {} else {
            $('#MainContent_txtNroRuc').val(Cliente.split('-')[0].trim());
            $('#hfCliente').val($('#MainContent_txtNroRuc').val());
            }
    });

    $('.Jq-ui-dtp').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy',
        maxDate: '0'
    });

    $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);

    $('.Jq-ui-dtp').datepicker('setDate', new Date());

    $('.MesAnioPicker').datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yymm',

        onClose: function (dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).val($.datepicker.formatDate('yymm', new Date(year, month, 1)));
        }
    });

    $('.MesAnioPicker').datepicker($.datepicker.regional['es']);

    $('.MesAnioPicker').focus(function () {
        $('.ui-datepicker-calendar').hide();
        $('#ui-datepicker-div').position({
            my: 'center top',
            at: 'center bottom',
            of: $(this)
        });
    });

    $('.MesAnioPicker').datepicker('setDate', new Date());
    
    $('#divTabs').tabs();   
    
    $('#MainContent_txtDesde').datepicker({onSelect: function() {
      var date = $(this).datepicker('getDate');
      if (date) {
            date.setDate(1);
            $(this).datepicker('setDate', date);
      }
      }}); 

    $('#MainContent_txtDesde').datepicker({beforeShowDay: function(date) {
      return [date.getDate() == 1, ''];
    }});

    $(document).on("change", "select[id $= 'MainContent_ddlMoneda']",function () {
         F_CargarGrillaTemporal();
    } );

    F_Controles_Inicializar();

    $('#MainContent_btnBuscarArticulo').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
        try 
        {
        MostrarEspera(true);
        var cadena = "Ingresar los sgtes. campos :";
            if ($('#MainContent_txtArticulo').val=="")
            cadena=cadena + "\n" + "Articulo"

              if ($('#MainContent_ddlMoneda option').size() == 0)
              { cadena = cadena + "\n" + "Moneda"; }
              else 
              {
              if ($('#MainContent_ddlMoneda').val() == "-1")
                    cadena = cadena + "\n" + "Moneda";
              }

              if ( cadena != "Ingresar los sgtes. campos :")
              {
                  MostrarEspera(false);
                  alertify.log(cadena);
                  return false;
              }

              F_Buscar_Productos() 
        }
        catch (e) {
            MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
        }


        return false;

    });

    $('#MainContent_btnAgregarProducto').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
    if (F_PermisoOpcion(CodigoMenu, 3000102, '') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
        try 
        {
               
                $('#MainContent_txtArticulo').val('');
                
                $("#divConsultaArticulo").dialog({
                    resizable: false,
                    modal: true,
                    title: "Consulta de Productos",
                    title_html: true,
                    height: 600,
                    width: 1250,
                    autoOpen: false
                });

                $('#divConsultaArticulo').dialog('open');
               
                $('#MainContent_txtArticulo').focus();
              
                 var objParams = { };
                 var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);


                F_CargarGrillaVaciaConsultaArticulo_NET(arg, function (result) {
//                var Entity = Sys.Serialization.JavaScriptSerializer.deserialize(result);

//                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                  
                    F_Update_Division_HTML('div_grvConsultaArticulo', result.split('~')[2]);    
                    $('.ccsestilo').css('background', '#FFFFE0');            
                  
                }
                else 
                {
                    alertify.log(result.split('~')[1]);
                }

                return false;

                });


        }
        catch (e) {

            alertify.log("ERROR DETECTADO: " + e);
        }


        return false;

    });  

    $('#MainContent_btnAgregar').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
        
        if (!F_ValidarAgregar())
        return false;
              
           if (!$("#MainContent_chkServicios").is(':checked')) 
              F_AgregarTemporal();
            else 
              F_AgregarTemporalServicio();
        
        $('#MainContent_txtArticulo').focus();
        return false;
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
        }
     
        });

    $('#MainContent_btnAgregarItemOC').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
       if (!F_ValidarAgregarOC())
           return false;
//              
        F_AgregarTemporalOC();
      //  F_LimpiarGrillaConsultaOC();
            if ($("#MainContent_ddlFormaPago").val()==1)
            {
            $("#MainContent_ddlFormaPago").val(11)
            $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),7));            
            }

        return false;
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
        }
     
    });

    $('#MainContent_btnEliminar').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
    if (F_PermisoOpcion(CodigoMenu, 3000103, '') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
     try 
        {
            if(!F_ValidarEliminar())
              return false;

            if (confirm("ESTA SEGURO DE ELIMINAR LOS PRODUCTOS SELECCIONADOS"))
            F_EliminarTemporal();

            return false;
        }
        
        catch (e) 
        {

            alertify.log("ERROR DETECTADO: " + e);
        }
     
        });

    $('#MainContent_btnGrabar').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Insertar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
     try 
        {
            if(!F_ValidarGrabarDocumento())
              return false;

            if (confirm("ESTA SEGURO DE GRABAR LA ORDEN DE COMPRA"))
            F_GrabarDocumento();

            return false;
        }        
        catch (e) 
        {
            alertify.log("ERROR DETECTADO: " + e);
        }     
        });

    $('#MainContent_btnActualizar').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
          F_CargarGrillaTemporal();
          
          return false;
        }
        
        catch (e) 
        {

            alertify.log("ERROR DETECTADO: " + e);
        }
     
        });

    $('#MainContent_btnNuevo').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
          F_Nuevo();
          
          return false;
        }
        
        catch (e) 
        {

            alertify.log("ERROR DETECTADO: " + e);
        }
     
        });

    $('#MainContent_btnAnular').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if ($.trim($('#MainContent_txtObservacionAnulacion').val()) == '') {
                alertify.log("INGRESAR LA OBSERVACION");
                return false;
            }
            F_AnularRegistro();
            return false;
        }
        catch (e) {
//            toastr.warning("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnBuscarConsulta').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
          F_Buscar();
          return false;
        }
        
        catch (e) 
        {

            alertify.log("ERROR DETECTADO: " + e);
        }
     
        });

    $('#MainContent_btnOC').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
          F_FacturacionOC();
          return false;
        }
        
        catch (e) 
        {

            alertify.log("ERROR DETECTADO: " + e);
        }
     
        });
        
    $('#MainContent_btnDevolverItemOC').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
            if(F_ValidarDevolucion("SELECCIONE UN PRODUCTO PARA DEVOLVER")==false)
              return false;

            if (confirm("ESTA SEGURO DE LA DEVOLUCION DE LOS PRODUCTOS SELECCIONADOS"))
            F_Devolucion();

            return false;
        }
        
        catch (e) 
        {

            alertify.log("ERROR DETECTADO: " + e);
        }
     
        });

    $('#MainContent_btnGrabarEdicion').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
        try {

            F_EditarTemporal();

            return false;
        }

        catch (e) {

            alertify.log("ERROR DETECTADO: " + e);
        }

    });

    $('#MainContent_btnVentas').click(function () {
       if (!F_SesionRedireccionar(AppSession)) return false;
       if (F_PermisoOpcion(CodigoMenu, 3000101, '') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
       $('#divFacturarVentas').dialog({
     resizable: false,
     modal: true,
     title: "VENTAS",
     title_html: true,
     height: 500,
     width: 890,
     autoOpen: false
 });
              
       $('#divFacturarVentas').dialog('open');

       return false;        
    });

    $('#MainContent_btnBuscarVentas').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
            try {

            F_FacturacionVentas();
            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnAgregarVentas').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if (!F_ValidarAgregarVentas())
                return false;

            F_AgregarTemporalVentas();
            F_LimpiarGrillaConsultaVentas();

            return false;
        }
        catch (e) {
            MostrarEspera(false);
            alertify.log("Error Detectado: " + e);
        }
    });

    $('#MainContent_txtEmision').on('change', function (e) {
        F_FormaPago($("#MainContent_ddlFormaPago").val());
        F_TipoCambio();
    });

    $("#MainContent_txtMonto").keydown(function (e) {
       if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
           return;
       }
       if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
           e.preventDefault();
   });

    $('#MainContent_txtArticulo').blur(function () {

        return true;
          try 
        {
        if ($('#MainContent_txtArticulo').val()=='')
        return false

        var cadena = "Ingresar los sgtes. campos :";
            if ($('#MainContent_txtArticulo').val=="" | $('#MainContent_txtArticulo').val().length<3)
            cadena=cadena + "\n" + "Articulo (Minimo 2 Caracteres)"

              if ($('#MainContent_ddlMoneda option').size() == 0)
              { cadena = cadena + "\n" + "Moneda"; }
              else 
              {
              if ($('#MainContent_ddlMoneda').val() == "-1")
                    cadena = cadena + "\n" + "Moneda";
              }

              if ( cadena != "Ingresar los sgtes. campos :")
              {
                  alertify.log(cadena);
                  return false;
              }

              F_Buscar_Productos() 
        }
        catch (e) {

            alertify.log("ERROR DETECTADO: " + e);
        }


        return false;
    });

    $('#MainContent_txtNumero').blur(function () {
    if ($.trim($('#MainContent_txtNumero').val()) =='')
    return false;
        var id = '00000000' + $('#MainContent_txtNumero').val();
        $('#MainContent_txtNumero').val(id.substr(id.length - 8));
        return false;
    });

    $('#div_SerieDetalle').bind('dialogclose', function(event) {
      F_BuscarTemporal();
      return false;
 });
     
    $('#MainContent_txtVencimiento').css('background', '#FFFFE0');

    $('#MainContent_txtEmision').css('background', '#FFFFE0');

    $('#MainContent_txtSerie').css('background', '#FFFFE0');

    $('#MainContent_txtProveedor').css('background', '#FFFFE0');

    $('#MainContent_txtClienteConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtPeriodo').css('background', '#FFFFE0');

    $('#MainContent_txtFechaIngreso').css('background', '#FFFFE0');

    $('#MainContent_txtPeriodo').css('background', '#FFFFE0');

    $('#MainContent_txtSubTotal').css('background', '#FFFFE0');

    $('#MainContent_txtIgv').css('background', '#FFFFE0');

    $('#MainContent_txtTotal').css('background', '#FFFFE0');

    $('#MainContent_txtMonto').css('background', '#FFFFE0');

    $('#MainContent_txtDsctoTotal').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtNumero').css('background', '#FFFFE0');

    $('#MainContent_txtDesde').css('background', '#FFFFE0');

    $('#MainContent_txtHasta').css('background', '#FFFFE0');

    $('#MainContent_txtArticulo').css('background', '#FFFFE0');

    $('#MainContent_txtPeriodoConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtNroRuc').css('background', '#FFFFE0');

    $('#MainContent_txtDistrito').css('background', '#FFFFE0');

    $('#MainContent_txtGuia').css('background', '#FFFFE0');

   //ventana busqueda de producto
    //--
    $('#MainContent_txtArticuloAgregar').css('background', '#FFFFE0');

    $('#MainContent_txtCantidad').css('background', '#FFFFE0');
    
    $('#MainContent_txtPrecioDisplay').css('background', '#FFFFE0');

    $('#MainContent_txtCodigoProductoAgregar').css('background', '#FFFFE0');

    $('#MainContent_txtUMAgregar').css('background', '#FFFFE0');

    $('#MainContent_txtCodigoProductoAgregar').css('background', '#FFFFE0');

    $('#MainContent_txtUMAgregar').css('background', '#FFFFE0');

    $('#MainContent_txtStockAgregar').css('background', '#FFFFE0');
    
    $('#MainContent_txtStockAgregar').css('background', '#FFFFE0');

    $('#MainContent_txtClienteDropTop').css('background', '#FFFFE0');

    $('#MainContent_txtNroOperacion').css('background', '#FFFFE0');

    $('#MainContent_txtFacturaCDR').css('background', '#FFFFE0');

    $('#MainContent_txtArchivoCDR').css('background', '#FFFFE0');

    $("#MainContent_txtUsuarioPrecio").css('background', '#FFFFE0');

    $("#MainContent_txtContraseñaPrecio").css('background', '#FFFFE0');

    $("#MainContent_txtKMEdicion").css('background', '#FFFFE0');
      
    $('#MainContent_ddlDropTop').css('background', '#FFFFE0');
    //--

    forceNumber($('#MainContent_txtDsctoTotal'));

    forceNumber($('#MainContent_txtMonto'));

    F_Derecha();

    F_FuncionesBotones();

    $('.ccsestilo').css('background', '#FFFFE0');

    $("#MainContent_chkNumero").click( function(){

    if($(this).is(':checked')) 
    {
        $('#MainContent_txtNumeroConsulta').prop('readonly',false);
        $('#MainContent_txtNumeroConsulta').focus();        
    }   
    else
    {
        $('#MainContent_txtNumeroConsulta').prop('readonly',true);
        $('#MainContent_txtNumeroConsulta').val('');   
    }  

});

    $("#MainContent_chkCliente").click( function(){

    if($(this).is(':checked')) 
    {
        $('#MainContent_txtClienteConsulta').prop('readonly',false);
        $('#MainContent_txtClienteConsulta').focus();        
    }   
    else
    {
        $('#MainContent_txtClienteConsulta').prop('readonly',true);
        $('#MainContent_txtClienteConsulta').val('');   
        $('#hfCodCtaCteConsulta').val(0);
    } 
     
});

$('#MainContent_txtObservacionAnulacion').css('background', '#FFFFE0');
    
 });

 $(document).on("change", "select[id $= 'MainContent_ddlDireccion']",function () {
     $('#MainContent_txtDireccion').val($('#MainContent_ddlDireccion option:selected').text());
     $('#hfCodDireccion').val($('#MainContent_ddlDireccion option:selected').val());
} );

$().ready(function () {
    $(document).everyTime(900000, function () {
        if (!F_ValidaSesionActiva(AppSession)) return false;
    });
});

$(document).unbind('keydown').bind('keydown', function (event) {
    var doPrevent = false;
    if (event.keyCode === 8) {
        var d = event.srcElement || event.target;
        if ((d.tagName.toUpperCase() === 'INPUT' && (d.type.toUpperCase() === 'TEXT' || d.type.toUpperCase() === 'PASSWORD' || d.type.toUpperCase() === 'FILE' || d.type.toUpperCase() === 'EMAIL'))
             || d.tagName.toUpperCase() === 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
        }
        else {
            doPrevent = true;
        }
    }

    if (doPrevent) {
        event.preventDefault();
    }
});

$(document).on("change", "select[id $= 'MainContent_ddlFormaPago']",function () {
     F_FormaPago($("#MainContent_ddlFormaPago").val());
} );

$(document).on("change", "select[id $= 'MainContent_ddlSerie']",function () {
     F_Mostrar_Correlativo(5);
} );

$(document).on("change", "select[id $= 'MainContent_ddlTipoDocVentas']",function () {
     F_CambioSerie_TipoDoc();
} );

 //ENZO
function F_FuncionesBotones() {
    var k = new Kibo(); 
    //Botones Principales
    k.down("f1", function () {
        $("#MainContent_btnNuevo").click();
        return false;
    });
    k.down("f2", function () {
        $("#MainContent_btnAgregarProducto").click();
        return false;
    });
    k.down("f3", function () {
        $("#MainContent_btnVentas").click();
        return false;
    });
    k.down("f4", function () {
        $("#MainContent_btnOC").click();
        return false;
    });
    k.down("f5", function () {
        $("#MainContent_btnEliminar").click();
        return false;
    });
    k.down("f6", function () {
        $("#MainContent_btnGrabar").click();
        return false;
    });
    k.down("f11", function () {
        if ($("#MainContent_chkImpresion").prop('checked') === true)
            $("#MainContent_chkImpresion").prop('checked', false);
        else 
            $("#MainContent_chkImpresion").prop('checked', true);

        return false;
    });
    

    
    //funcionalidades de productos
    //ENZO
    k.down("up", function () {
        var control = $(':focus');
        if (control.attr('id') == 'MainContent_txtPrecioDisplay')
        {
            F_PrecioDisplayUp();
            return true;
        } else { 
            try {
                if (control.attr('id') == 'MainContent_txtDireccion')
                {
                    F_DireccionDisplayUp();
                    return true;
                }
            } catch (e) { }

            try {
                if (control.attr('id').indexOf("ddl") >= 0) 
                {
                F_ddlDisplayUp(control.attr('id') );
                return true;
                }
            } catch (e) { }
        }

        F_TablaUp();
        return false;
    });

    //ENZO
    k.down("down", function () {
        var control = $(':focus');
        if (control.attr('id') == 'MainContent_txtPrecioDisplay')
        {
            F_PrecioDisplayDown();
            return true;
        } else { 
            try {
                if (control.attr('id') == 'MainContent_txtDireccion')
                {
                    F_DireccionDisplayDown();
                    return true;
                }
            } catch (e) { }

            try {
                if (control.attr('id').indexOf("ddl") >= 0) 
                {
                    F_ddlDisplayDown(control.attr('id') );
                    return true;
                }
            } catch (e) { }
        }

        F_TablaDown();
        return false;
    });



    k.down("enter", function () {

            var control = $(':focus');
            var inputs = control.parents("form").eq(0).find("input, select");
            var idx = inputs.index(control);

            if (idx == inputs.length - 1) {
                //campos especiales
                F_CamposAlternativas(control.attr('id'));

            } else {
                inputs[idx + 1].focus(); //  handles submit buttons
                try {inputs[idx + 1].select();
                F_CamposAlternativas(control.attr('id'));
                } catch (e) { }               

            }
       return false;
    });


}

function F_CamposAlternativas(Campos) {

                switch (Campos)
                {
                    case "MainContent_txtArticulo":
                        $('#MainContent_btnBuscarArticulo').click();
                    break;
                    case "MainContent_txtArticuloAgregar":
                        $('#MainContent_txtCantidad').select();
                    break;
                    case "MainContent_txtCantidad":
                        $('#MainContent_txtPrecioDisplay').select();
                    break;
                    case "MainContent_txtPrecioDisplay":
                           $('#MainContent_btnAgregar').click();
                    break;
                    case "MainContent_btnAgregar":
                           $('#MainContent_btnAgregar').click();
                    break;
                    case "MainContent_ddlIgv":
                        $('#MainContent_txtGuia').focus();
                    break;
                    case "MainContent_txtTotal":
                        $('#MainContent_txtCorreo').focus();
                    break;
                    case "MainContent_txtCorreo":
                        $('#MainContent_txtNroOC').focus();
                    break;
                    case "MainContent_txtKM":
                        $('#MainContent_txtNroOperacion').focus();
                    break;
                    case "MainContent_txtCodCotizacion":
                        if ($("#MainContent_txtCodCotizacion").val().trim() != "")
                            {
                                if (isNaN($("#MainContent_txtCodCotizacion").val().trim()))
                                    $("#MainContent_txtCodCotizacion").val('');
                                else
                                    $('#MainContent_btnFacturarCotizacion').click();
                            }
                        
                        $('#MainContent_chkImpresion').focus();
                    break;
                    case "MainContent_txtVencimiento":
                        $("#MainContent_ddlCajaFisica").focus();
//                        if ($("#MainContent_chkConIgvMaestro").prop('disabled') === true | $("#MainContent_chkSinIgvMaestro").prop('disabled') === true)
//                            $("#MainContent_txtSubTotal").focus();
//                        else 
//                            $("#MainContent_chkConIgvMaestro").focus();
                    break;

                    
                    default:
                    //otros casos

                        //Agregar Con Enter desde la Grilla
                        if (Campos.indexOf("MainContent_grvConsultaArticulo_imgAgregar") >= 0)
                        {
                            F_AgregarArticulo(Campos, 0);
                            return true;
                        }
                    break;
                }

return true;
}

var ctrlPosActual = '';
var ctrlPosActualBuffer = '';
function F_TablaUp() {
    var ant = 0; var pos = 0;
    try {
        ant = parseInt(ctrlPosActual.split('_')[3]);
        pos = ant - 1; if (pos < 0) pos = 0;
        if ( $(ctrlPosActual.replace(ant, pos)).length > 0 ) {
            $(ctrlPosActual.replace(ant, pos)).focus();
            $(ctrlPosActual).closest("tr").children('td,th').css("background-color","#FFFFFF")
            ctrlPosActual = ctrlPosActual.replace(ant, pos);
            $(ctrlPosActual).closest("tr").children('td,th').css("background-color","#ffec85")
        }
        
    } catch (e) {
        $(ctrlPosActual).focus();
    }
}    

function F_TablaDown() {
    var ant = 0; var pos = 0;
    try {
        ant = parseInt(ctrlPosActual.split('_')[3]);
        pos = ant + 1;
        if ( $(ctrlPosActual.replace(ant, pos)).length > 0 ) {
            $(ctrlPosActual.replace(ant, pos)).focus();
            $(ctrlPosActual).closest("tr").children('td,th').css("background-color","#FFFFFF")
            ctrlPosActual = ctrlPosActual.replace(ant, pos);
            $(ctrlPosActual).closest("tr").children('td,th').css("background-color","#ffec85")
        }
    } catch (e) {
        $(ctrlPosActual).focus();
    }
}

function F_PrecioDisplayUp() {
  if ($('#MainContent_ddlPrecio option:selected').prev().length > 0) 
    $('#MainContent_ddlPrecio option:selected').prev().attr('selected', 'selected').trigger('change');
  else $('#MainContent_ddlPrecio option').last().attr('selected', 'selected').trigger('change');

  $("#MainContent_txtPrecioDisplay").val($("#MainContent_ddlPrecio option:selected").text());   
}

function F_PrecioDisplayDown() {

  if ($('#MainContent_ddlPrecio option:selected').next().length > 0) 
  {
    $("#MainContent_txtPrecioDisplay").val($("#MainContent_ddlPrecio option:selected").next().text());
    $('#MainContent_ddlPrecio option:selected').val($("#MainContent_txtPrecioDisplay").val());
  }
  else {
    $("#MainContent_txtPrecioDisplay").val($("#MainContent_ddlPrecio option:selected").prev().text());
    $('#MainContent_ddlPrecio option:selected').val($("#MainContent_txtPrecioDisplay").val());    
  } 
}

function F_ddlDisplayUp(Control) {
  if ($('#' + Control + ' option:selected').prev().length > 0) 
    $('#' + Control + ' option:selected').prev().attr('selected', 'selected').trigger('change');
  else $('#' + Control + ' option').last().attr('selected', 'selected').trigger('change');
}

function F_ddlDisplayDown(Control) {
  if ($('#' + Control + ' option:selected').next().length > 0) 
  {
    $('#' + Control + ' option:selected').val($("#" + Control + " option:selected").next().text());
  }
  else {
    $('#' + Control + ' option:selected').val($("#" + Control + " option:selected").prev().text());    
  } 
}

//ENZO
function F_DireccionDisplayUp() {
  var p;

  if ($('#MainContent_ddlDireccion option:selected').prev().length > 0) {
    p = $('#MainContent_ddlDireccion option:selected').prev().val();
    }
  else { 
    p = $('#MainContent_ddlDireccion option:selected').last().val();
  }

  $('#MainContent_ddlDireccion').val(p);
  $("#MainContent_txtDireccion").val($("#MainContent_ddlDireccion option:selected").text());   
  $('#hfCodDireccion').val(p);

}
//ENZO
function F_DireccionDisplayDown() {
  var p;

  if ($('#MainContent_ddlDireccion option:selected').next().length > 0) {
    p = $('#MainContent_ddlDireccion option:selected').next().val();
    }
  else { 
    p = $('#MainContent_ddlDireccion option:selected').first().val();
  }
  $('#MainContent_ddlDireccion').val(p);
  $("#MainContent_txtDireccion").val($("#MainContent_ddlDireccion option:selected").text());  
  $('#hfCodDireccion').val(p);

}

function F_AgregarArticulo(ControlID, DirectoBoton) {
    var txtprecio_Grilla = '';
    var ddlLista_grilla = '';
    var txtcant_grilla = '';
    var txtprecio_grilla = '';
    var ddlprecio_grilla = '';
    var hfArticulo_grilla = '';
    var hfPrecio1_grilla = '';
    var hfPrecio2_grilla = '';
    var hfPrecio3_grilla = '';
    var lblCodigoProducto_grilla = '';
    var lblStock_grilla = '';
    var lblUM_grilla = '';
    var lblMoneda_grilla = '';
    var lblCodProducto_grilla = '';
    var lblCosto_grilla = '';
    var lblCodUm_grilla = '';
    var boolEstado = false;
    var imgAgregar_grilla = '';
    var cadena = 'Ingrese los sgtes. campos: '

    imgAgregar_grilla = '#' + ControlID;
    ctrlPosActual = imgAgregar_grilla;
    txtprecio_grilla = imgAgregar_grilla.replace('imgAgregar', 'txtPrecioLibre');
    ddlprecio_grilla = imgAgregar_grilla.replace('imgAgregar', 'ddlPrecio');
    txtcant_grilla = imgAgregar_grilla.replace('imgAgregar', 'txtCantidad');
    ddlLista_grilla = imgAgregar_grilla.replace('imgAgregar', 'ddlLista');
    hfArticulo_grilla = imgAgregar_grilla.replace('imgAgregar', 'lblProducto');
    hfPrecio1_grilla = imgAgregar_grilla.replace('imgAgregar', 'lblPrecio1');
    hfPrecio2_grilla = imgAgregar_grilla.replace('imgAgregar', 'lblPrecio2');
    hfPrecio3_grilla = imgAgregar_grilla.replace('imgAgregar', 'lblPrecio3');
    lblCodigoProducto_grilla = imgAgregar_grilla.replace('imgAgregar', 'hlkCodNeumaticoGv');
    lblStock_grilla = imgAgregar_grilla.replace('imgAgregar', 'lblstock');
    lblUM_grilla = imgAgregar_grilla.replace('imgAgregar', 'lblUM');
    lblMoneda_grilla = imgAgregar_grilla.replace('imgAgregar', 'hfMoneda');
    lblCosto_grilla = imgAgregar_grilla.replace('imgAgregar', 'hfcosto');
    lblCodUm_grilla = imgAgregar_grilla.replace('imgAgregar', 'hfcodunidadventa');

    lblCodProducto_grilla = imgAgregar_grilla.replace('imgAgregar', 'lblcodproducto');

    $('#hfCodProductoAgregar').val($(lblCodProducto_grilla).val());
    $('#hfCostoAgregar').val($(lblCosto_grilla).val());
    $('#hfCodUmAgregar').val($(lblCodUm_grilla).val());
    $('#MainContent_txtCodigoProductoAgregar').val($(lblCodigoProducto_grilla).text());
    $('#MainContent_txtUMAgregar').val($(lblUM_grilla).text());
    $('#MainContent_txtStockAgregar').val($(lblStock_grilla).text());
    $('#MainContent_lblMonedaAgregar').text($(lblMoneda_grilla).val());
    

    $('#MainContent_txtArticuloAgregar').val($(hfArticulo_grilla).text());
    $('#MainContent_txtCantidad').val(1);
//    $('#MainContent_txtPrecioDisplay').val($(hfPrecio1_grilla).val());
    $("#hfMenorPrecioAgregar").val(0);

    $("#MainContent_ddlPrecio").empty();

//    if ($(hfPrecio1_grilla).val() != '')
//    {
//        $("#MainContent_ddlPrecio").append($("<option></option>").val($(hfPrecio1_grilla).val()).html($(hfPrecio1_grilla).val()));
//        $("#hfMenorPrecioAgregar").val($(hfPrecio1_grilla).val());
//    }

//    if ($(hfPrecio2_grilla).val() != '0.00') {
//        $("#MainContent_ddlPrecio").append($("<option></option>").val($(hfPrecio2_grilla).val()).html($(hfPrecio2_grilla).val()));

//        if (Number($(hfPrecio2_grilla).val()) < Number($("#hfMenorPrecioAgregar").val()) & Number($(hfPrecio2_grilla).val()) > 0)
//            $("#hfMenorPrecioAgregar").val($(hfPrecio2_grilla).val());
//    }

//    if ($(hfPrecio3_grilla).val() != '0.00') {
//        $("#MainContent_ddlPrecio").append($("<option></option>").val($(hfPrecio3_grilla).val()).html($(hfPrecio3_grilla).val()));

//        if (Number($(hfPrecio3_grilla).val()) < Number($("#hfMenorPrecioAgregar").val()) & Number($(hfPrecio3_grilla).val()) > 0)
//            $("#hfMenorPrecioAgregar").val($(hfPrecio3_grilla).val());
//        }

    $('#MainContent_chkServicios').prop('checked', false);

    //F_VerUltimoPrecio_Buscar($('#MainContent_txtCodigoProductoAgregar').val(), $('#hfCodProductoAgregar').val());
     $('#MainContent_txtArticuloAgregar').focus();
  //  F_Consultar_Almacenes_Stocks(ControlID);
    if (DirectoBoton === 1)
        F_TablaClick(ControlID);
    return false;
}

function F_TablaClick(Control) {
    Control = "#" + Control;
    $(ctrlPosActualBuffer).closest("tr").children('td,th').css("background-color","#FFFFFF")
    $(Control).closest("tr").children('td,th').css("background-color","#ffec85")
    $(Control).focus();
    ctrlPosActualBuffer = Control;
}

function F_VerUltimoPrecio_Buscar(CodNeumatico, CodProducto) {
    var Contenedor = '#cphCuerpo_';
    var CodNeumaticoAlm = '';

    $('#MainContent_lbCodProducto').val(CodNeumatico);
    $('#MainContent_lbCodNeumatico').val(CodProducto);

    try {
        var objParams = {
            Filtro_CodProducto: CodProducto,
            Filtro_CodTipoOperacion: '1',
            Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
            Filtro_Top: 5
        }

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_VerUltimoPrecio_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            $('#MainContent_lbCodProducto').val(CodProducto);
            $('#MainContent_lbCodNeumatico').val(CodNeumatico);
            F_Update_Division_HTML('div_grvConsultaUltimosPrecios', result.split('~')[2]);

            if (str_resultado_operacion == "1") {
            }

//            else
//                alertify.log('no se encontraron datos');

            $('#MainContent_txtArticuloAgregar').focus();

            return false;

        });
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }

}

function F_ValidarCheckSinIgv(ControlID) {

   var chkok_grilla='';

            chkok_grilla = '#' + ControlID;
           
           if ($(chkok_grilla).is(':checked'))
               $('#MainContent_chkSinIgv').prop('checked', false);
           else
               $('#MainContent_chkSinIgv').prop('checked', true);
         
   return false;
}

function F_Controles_Inicializar() {
    var arg;

    try {
        var objParams =
            {
                Filtro_Fecha: $('#MainContent_txtEmision').val(),
                Filtro_CodTipoDoc: 5,
                Filtro_CodCargo: 6,
                Filtro_CodEstado: 1
            };
            
        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_Controles_Inicializar_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                          MostrarEspera(false);
                    if (str_resultado_operacion == "1") 
                    {
                        F_Update_Division_HTML('div_formapago', result.split('~')[4]);
                        F_Update_Division_HTML('div_moneda', result.split('~')[5]);
                        $('#MainContent_lblTC').text(result.split('~')[6]);
                        F_Update_Division_HTML('div_Serie', result.split('~')[2]);
                        F_Update_Division_HTML('div_SerieConsulta', result.split('~')[3]);
                        F_Update_Division_HTML('div_igv', result.split('~')[8]);
                        F_Update_Division_HTML('div_tipodocumento', result.split('~')[9]);
                        F_Update_Division_HTML('div_clasificacion', result.split('~')[10]);
                        F_Update_Division_HTML('div_ClasificacionConsulta', result.split('~')[11]);
                        F_Update_Division_HTML('div_Categoria', result.split('~')[12]);
                        F_Update_Division_HTML('div_SerieDocVentas', result.split('~')[13]);
                        F_Update_Division_HTML('div_EmpleadoConsulta', result.split('~')[14]);
                        F_Update_Division_HTML('div_CajaFisica', result.split('~')[18]);
                        F_Update_Division_HTML('div_Estado', result.split('~')[19]);
                        GridArticulosInicializado = result.split('~')[15];
                        GridDetalleDocumento = result.split('~')[16];
                        CodCajaFisica = result.split('~')[17];
                        $('#lblCantidadRegistro').text('0');
                        $('#MainContent_ddlMoneda').val(1);
                        $('#MainContent_ddlFormaPago').val(1);
                        $('#MainContent_ddlTipoDocumento').val(5);
                        $('#MainContent_ddlClasificacion').val(2);
                        $('#MainContent_ddlClasificacionConsulta').val(2);
                        $('#MainContent_ddlCategoria').val(1);
                        $('#MainContent_txtVencimiento').val($('#MainContent_txtEmision').val());
                        $("#MainContent_txtPeriodo").val($('#MainContent_txtFechaIngreso').val().substr($('#MainContent_txtFechaIngreso').val().length - 4) + $('#MainContent_txtFechaIngreso').val().substring(3, 5));
                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');
                        $('#MainContent_ddlFormaPago').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerie').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddlClasificacion').css('background', '#FFFFE0');
                        $('#MainContent_ddlClasificacionConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddlCategoria').css('background', '#FFFFE0');
                        $('#MainContent_ddlTipoDocumento').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieDocVentas').css('background', '#FFFFE0');
                        $('#MainContent_ddlTipoDocVentas').css('background', '#FFFFE0');
                        $('#MainContent_ddlEmpleadoConsulta').css('background', '#FFFFE0');
                        $('#MainContent_txtHastaVentas').css('background', '#FFFFE0');
                        $('#MainContent_txtDesdeVentas').css('background', '#FFFFE0');
                        $('#MainContent_txtNumeroDocVentas').css('background', '#FFFFE0');
                        $('#MainContent_ddlIgv').css('background', '#FFFFE0');
                        $('#MainContent_ddlCajaFisica').css('background', '#FFFFE0');
                        $('#MainContent_ddlEstado').css('background', '#FFFFE0');
                        $('#MainContent_chKConIgv').prop('disabled',true);
                        $('#MainContent_chkSinIgv').prop('disabled',true);
                        $('#hfCodFacturaAnterior').val('0');
                        $('#MainContent_ddlTipoDocumento').prop('disabled', true);  
                        $('#MainContent_chkCosteable').prop('checked',true);                 
                        F_Mostrar_Correlativo(5);
                        F_LimpiarCampos();
                        F_Inicializar_Tabla_Almacenes_Stocks();
                        $('.ccsestilo').css('background', '#FFFFE0');
                    }
                    else {

                        alertify.log(str_mensaje_operacion);

                    }


                }
            );

    } catch (mierror) {
          MostrarEspera(false);
        alertify.log("ERROR DETECTADO: " + mierror);

    }

}

function F_Buscar_Productos() {

    var arg;
    var CodTipoProducto='2';
    try {
        var objParams =
            {
                Filtro_DscProducto: $('#MainContent_txtArticulo').val(),
                Filtro_CodTipoProducto: CodTipoProducto,
                Filtro_CodMoneda: $('#MainContent_ddlMoneda').val(),
                Filtro_CodCliente: 0,
                Filtro_CodFamilia: 0
            };


        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);

        F_Buscar_Productos_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_grvConsultaArticulo', result.split('~')[2]);
                        $('.ccsestilo').css('background', '#FFFFE0');

                        ctrlPosActual = '#MainContent_grvConsultaArticulo_imgAgregar_0';
                        ctrlPosActualBuffer = ctrlPosActual;
                        $(ctrlPosActual).closest("tr").children('td,th').css("background-color","#ffec85")
                        $(ctrlPosActual).focus();

                        if (str_mensaje_operacion=='No se encontraron registros')
                        alertify.log(str_mensaje_operacion);
                    }
                    else {

                        alertify.log(str_mensaje_operacion);

                    }


                }
            );

    } catch (mierror) {
          MostrarEspera(false);
        alertify.log("ERROR DETECTADO: " + mierror);

    }

}
 
function F_ValidarPrecioLista(ControlID) {

    var ddlLista_Grilla = '';
    var lblprecio = '';
    var txtcant_grilla = '';
    var txtprecio_grilla = '';
    var boolEstado = false;

            ddlLista_Grilla = '#' + ControlID;
            txtprecio_grilla = ddlLista_Grilla.replace('ddlLista', 'txtPrecioLibre');
            txtcant_grilla = ddlLista_Grilla.replace('ddlLista', 'txtCantidad');

             switch ($(ddlLista_Grilla).val()) 
             {
              case "1":
                        lblprecio = ddlLista_Grilla.replace('ddlLista', 'lblPrecio1');
                        $(txtprecio_grilla).val($(lblprecio).text());
                       $(txtprecio_grilla).prop('disabled', true);
                        $(txtcant_grilla).focus();
                        break;

              case "2":
                        lblprecio = ddlLista_Grilla.replace('ddlLista', 'lblPrecio2');
                        $(txtprecio_grilla).val($(lblprecio).text());
                         $(txtprecio_grilla).prop('disabled', true);
                        $(txtcant_grilla).focus();
                        break;
              case "3":
                        lblprecio = ddlLista_Grilla.replace('ddlLista', 'lblPrecio3');
                        $(txtprecio_grilla).val($(lblprecio).text());
                       $(txtprecio_grilla).prop('disabled', true);
                        $(txtcant_grilla).focus();
                        break;

              case "4":
                    $(txtprecio_grilla).val('');
                    $(txtprecio_grilla).prop('disabled', false);
                    $(txtprecio_grilla).focus();
                        break;
    }

    return true;
}

function F_ValidarCheck(ControlID) {
    var txtprecio_Grilla = '';
    var ddlLista_grilla = '';
    var txtCantidad = '';
    var txtPrecio = '';
    var boolEstado = false;
    var chkok_grilla='';

    var cadena='Ingrese los sgtes. campos: '
            
            chkok_grilla = '#' + ControlID;
            txtPrecio = chkok_grilla.replace('chkOK', 'txtPrecio');
            txtCantidad = chkok_grilla.replace('chkOK', 'txtCantidad');
            ddlLista_grilla = chkok_grilla.replace('chkOK', 'ddlLista');
          
            if ($(chkok_grilla).is(':checked'))
            {               
                $(txtCantidad).prop('disabled', false);
                $(txtPrecio).prop('disabled', false);
                var i=0;
                if($(txtPrecio).val()=="")
                {
                    $(txtCantidad).focus();
                    i=1;
                }
                if(i==0 && $(txtCantidad).val()=="")
                    $(txtCantidad).focus();
            }
            else
            {
                $(txtPrecio).val('');
                $(txtCantidad).val('');                           
            }            
    return true;
}

function F_FormaPago(CodFormaPago) {
 var arg;
    try 
    {
     switch (CodFormaPago)
     {
             case "1":
             case "12":
                       $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),0));
                       break;

            case "3":
                       $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),30));
                       break;

            case "4":
                       $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),15));
                       break;

            case "8":
               $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),45));
               break;

            case "9":
               $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),60));
               break;

                case "11":
               $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),7));
               break;
     }

     
    }
     catch (mierror) 
     {
        alertify.log("ERROR DETECTADO: " + mierror);
     }

}

function F_ValidarAgregar(){
 try 
        {
        var chkSi='';
        var chkDel='';
        var txtcantidad_grilla='';
        var txtprecio_grilla='';
        var cadena = "Ingrese los sgtes. campos:  <p></p> ";
        var lblcodproducto_grilla='';
        var hfcodarticulodetalle_grilla='';
        var lbldscproducto_grilla='';
        var x=0;

        if ($("#MainContent_txtArticuloAgregar").val() == '')
            cadena = cadena + "CAMPO DESCRIPCION ARTICULO <p></p> ";

        if ($("#MainContent_txtCantidad").val() == '')
            cadena = cadena + "CAMPO CANTIDAD <p></p> ";

        if (isNaN($("#MainContent_txtCantidad").val()))
        {
            $("#MainContent_txtCantidad").val(1);
            $("#MainContent_txtCantidad").focus();
            $("#MainContent_txtCantidad").select();
            cadena = cadena + "CAMPO CANTIDAD <p></p> ";
        }

        if ($("#MainContent_txtPrecioDisplay").val() == '')
            cadena = cadena + "CAMPO PRECIO ARTICULO <p></p> ";

        if (isNaN($("#MainContent_txtPrecioDisplay").val()))
        {
            $("#MainContent_txtPrecioDisplay").val('0.00');
            $("#MainContent_txtPrecioDisplay").focus();
            $("#MainContent_txtPrecioDisplay").select();
            cadena = cadena + "CAMPO PRECIO <p></p> ";
        }

//        if (UsuarioIniciado_PermisoCambioPrecios === '0') {
//            if (Number($("#MainContent_txtPrecioDisplay").val()) < Number($("#hfMenorPrecioAgregar").val()) & Number($("#hfMenorPrecioAgregar").val()) > 0 & PermisoCambio == false)
//            {
//                $("#MainContent_txtUsuarioPrecio").val('');
//                $("#MainContent_txtContraseñaPrecio").val('');
//                $("#MainContent_txtUsuarioPrecio").prop('disabled', false);
//                $("#MainContent_txtContraseñaPrecio").prop('disabled', false);
//                $("#MainContent_btnVerificar").prop('disabled', false);
//                $('#divClavePrecio').dialog('open');
//                return false;
//            }
//        }
        
        //PermisoCambio = false;

                if (cadena != "Ingrese los sgtes. campos:  <p></p> ")
                   {
                      alertify.log(cadena);
                      return false;
                   } 
                   else
                   {
                    cadena="Los sgtes. productos se encuentran agregados : ";
//                    $('#MainContent_grvConsultaArticulo .chkSi :checkbox').each(function () {
//                    chkSi = '#' + this.id;
//                    lblcodproducto_grilla = chkSi.replace('chkOK', 'lblcodproducto');
//               
//                         if ($(chkSi).is(':checked')) 
//                            {
                                 $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
                                   chkDel = '#' + this.id;
                                   hfcodarticulodetalle_grilla = chkDel.replace('chkEliminar', 'hfcodarticulo');
                                   lbldscproducto_grilla = chkDel.replace('chkEliminar', 'lblproducto');
                                    
                                    if ($('#hfCodProductoAgregar').val()==$(hfcodarticulodetalle_grilla).val())
                                    {
                                        cadena= cadena + "\n"  + $('#MainContent_txtArticuloAgregar').val();
                                        F_TablaDown();
                                    }
                         
                                  });
//                            }
//                    });
                   }    
                                 
                   if (cadena != "Los sgtes. productos se encuentran agregados : ") 
                   {alertify.log(cadena);
                   return false;}
                   else
                   {
                   return true;
                   }
        }
        
        catch (e) 
        {
            alertify.log("Error Detectado: " + e);
        }
}

var AgregandoProducto = false;
function F_AgregarTemporal(){
    if (AgregandoProducto === true)
        return true;

try 
        {       
        var hfCodProducto='';
        var lblProducto='';
        var chkSi='';
        var txtCantidad='';
        var txtPrecio='';
        var txtDscto='';
        var arrDetalle = new Array();
        var hfCodUnidadVenta='';
        var hfCosto='';
        var Contenedor = '#MainContent_';
        var tasaigv;
                                         
        if ($('#MainContent_chkConIgvMaestro').is(':checked'))
             tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
        else
             tasaigv=1;
               
                var objDetalle = {
                    CodArticulo: $('#hfCodProductoAgregar').val(),
                    Cantidad: $('#MainContent_txtCantidad').val(),
                    Precio: (parseFloat($('#MainContent_txtPrecioDisplay').val()))  / parseFloat(tasaigv),
                    PrecioDscto: (parseFloat($('#MainContent_txtPrecioDisplay').val()))  / parseFloat(tasaigv) * (1-(parseFloat(0) / 100)),
                    Costo: $('#hfCostoAgregar').val(),
                    CodUm: $('#hfCodUmAgregar').val(),
                    Dscto:0,
                    Descripcion: $('#MainContent_txtArticuloAgregar').val(),
                    CodDetalle: 0,
                    CodTipoDoc: 0,
                    Fecha : null
                };                                               
                arrDetalle.push(objDetalle);

                var objParams = {
                                        Filtro_CodTipoDoc: "2",
                                        Filtro_SerieDoc: $(Contenedor + 'ddlSerie').val(),
                                        Filtro_NumeroDoc: $(Contenedor + 'txtNumero').val(),
                                        Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
                                        Filtro_Vencimiento: $(Contenedor + 'txtVencimiento').val(),
                                        Filtro_CodCliente: $(Contenedor + 'hfCodCtaCte').val(),
                                        Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),
                                        Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
                                        Filtro_Tasa: $(Contenedor + 'lblTC').text(),
                                        Filtro_SubTotal: $(Contenedor + 'txtSubTotal').val(),
                                        Filtro_CodProforma: "0",
                                        Filtro_Igv: $(Contenedor + 'txtIgv').val(),
                                        Filtro_Total: $(Contenedor + 'txtTotal').val(),
                                        Filtro_CodGuia: "0",
                                        Filtro_Descuento: "0",
                                        Filtro_TasaIgv: parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1),
                                        Filtro_TasaIgvDscto: tasaigv,
                                        Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                                        Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle)
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_AgregarTemporal_NET(arg, function (result) {
                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                if (str_resultado_operacion == "1") 
                {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    $('#MainContent_txtTotal').val(result.split('~')[5]);
                    $('#MainContent_txtMonto').val(result.split('~')[5]);
                    $('#MainContent_txtIgv').val(result.split('~')[6]);
                    $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                    $('#MainContent_txtDsctoTotal').val(result.split('~')[8]);
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);                  
                    $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblProducto"));
                    $('#hfCodProductoAgregar').val('0');
                    $('#hfCostoAgregar').val('0');
                    $('#hfCodUmAgregar').val('0');
                    $('#MainContent_txtCodigoProductoAgregar').val('');
                    $('#MainContent_txtStockAgregar').val('');
                    $('#MainContent_txtUMAgregar').val('');
                    $('#MainContent_txtPrecioDisplay').val('0.00');
                    $('#MainContent_ddlPrecio').empty();
                    $('#MainContent_txtArticuloAgregar').val('');
                    $('#MainContent_txtCantidad').val('1');
                    $("#hfMenorPrecioAgregar").val(0);
                    $('.ccsestilo').css('background', '#FFFFE0');
                    if (result.split('~')[2]=='Los Producto(s) se han agregado con exito')
                    alertify.log('Los Producto(s) se han agregado con exito');
                    $('#MainContent_chkDescripcion').focus();
                    F_LimpiarGrillaConsulta();
                }
                else 
                {
                    MostrarEspera(false);
                    alertify.log(result.split('~')[2]);

                }

                return false;

                });
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
            
        }
}

function F_LimpiarGrillaConsulta() {
    $('#MainContent_grvConsultaArticulo').empty();
    F_Update_Division_HTML('div_grvConsultaArticulo', GridArticulosInicializado);                            
    $('.ccsestilo').css('background', '#FFFFE0');      
    $('#MainContent_txtArticulo').val('');
    $('#MainContent_txtArticulo').focus();
return true;
}

function F_MostrarTotales(){
var Cuerpo = '#MainContent_';
var lblimporte='';
var chkDel='';
var Total=0;
var Igv=0;
var Subtotal=0;
     $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
             chkDel = '#' + this.id;
             lblimporte = chkDel.replace('chkEliminar', 'lblimporte');
             Total+=parseFloat($(lblimporte).text());
     });
    $(Cuerpo + 'txtTotal').val(Total.toFixed(2));
    $(Cuerpo + 'txtMonto').val(Total.toFixed(2));
    $(Cuerpo + 'txtIgv').val((Total*parseFloat($("#MainContent_ddlIgv option:selected").text())).toFixed(2));
    $(Cuerpo + 'txtSubTotal').val((Total/(1+parseFloat($("#MainContent_ddlIgv option:selected").text()))).toFixed(2));   
}

function F_EliminarTemporal(){
  try 
        {
        var chkSi='';
        var arrDetalle = new Array();
        var hfCodDetalle='';        
               
                $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    hfCodDetalle = chkSi.replace('chkEliminar', 'hfCodDetalle');
                   
                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {                       
                        CodDetalle: $(hfCodDetalle).val()
                        };                                               
                        arrDetalle.push(objDetalle);
                    }
                });
                            
                var Contenedor = '#MainContent_';
                var tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
                var objParams = {
                                    Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                    Filtro_TasaIgv: tasaigv,
                                    Filtro_TasaIgvDscto: tasaigv,
                                    Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                                    Filtro_TipoCambio: $('#MainContent_lblTC').text(),
                                    Filtro_Tasa: $('#MainContent_lblTC').text(),
                                    Filtro_CodMoneda: $('#MainContent_ddlMoneda').val(),
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_EliminarTemporal_NET(arg, function (result) {

                  MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    $('#MainContent_txtMonto').val(result.split('~')[5]);
                    $('#MainContent_txtTotal').val(result.split('~')[5]);
                    $('#MainContent_txtIgv').val(result.split('~')[6]);
                    $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                    $('#MainContent_txtDsctoTotal').val(result.split('~')[8]);
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                    $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblProducto"));
                     $('.ccsestilo').css('background', '#FFFFE0');
                   // if (result.split('~')[2]=='Se han eliminado los productos correctamente.')
                    //alertify.log('Se han eliminado los productos correctamente.');
                }
                else 
                {
                    alertify.log(result.split('~')[2]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
              MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
        }
}

function F_ValidarEliminar(){

 try 
        {
        var chkSi='';
        var x=0;

                $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                               
                     if ($(chkSi).is(':checked')) 
                        x=1;
                        
               });

               if(x==0)
               {
               alertify.log("Seleccione un articulo para eliminar");
               return false;
               }
               else
               {return true;}
               
        }
        
        catch (e) 
        {

            alertify.log("ERROR DETECTADO: " + e);
        }
}

function F_ValidarGrabarDocumento(){
    try 
        {
        var Cuerpo='#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:'; 

        if ($(Cuerpo + 'txtProveedor').val()=='')
                Cadena=Cadena + '<p></p>' + 'Proveedor';
        
        if ($(Cuerpo + 'lblTC').text()=='0')
                Cadena=Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtSerie').val()=='')
                Cadena=Cadena + '<p></p>' + 'Serie de Factura';

        if ($(Cuerpo + 'txtNumero').val()=='')
                Cadena=Cadena + '<p></p>' + 'Numero de Factura';

        if ($(Cuerpo + 'txtEmision').val()=='')
                Cadena=Cadena + '<p></p>' + 'Fecha de Emision';

        if ($(Cuerpo + 'txtPeriodo').val()=='')
                Cadena=Cadena + '<p></p>' + 'Periodo';

        if ($(Cuerpo + 'txtNroOperacion').val().trim()==''  & ($(Cuerpo + 'ddlFormaPago').val()== 10 | $(Cuerpo + 'ddlFormaPago').val()==6 |$(Cuerpo + 'ddlFormaPago').val()==15 ))
              Cadena=Cadena + '<p></p>' + 'NUMERO OPERACION';

        if (!ValidarRuc($(Cuerpo + 'txtNroRuc').val()) & $('#MainContent_txtNroRuc').val() != '55555555555')
            Cadena = Cadena + "<p></p>" + "Ruc Invalido"; 

     var ContProductos = 0;
     var lblProducto='';
     $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
        var chkDel = '#' + this.id;
        lblProducto = chkDel.replace('chkEliminar', 'lblProducto');                                    
        if ($(lblProducto).text().trim() != '')
        ContProductos++;
     });
     if (ContProductos == 0)
        Cadena=Cadena + '<p></p>' + 'No ha ingresado ningun producto';
        
        if (Cadena != 'Ingresar los sgtes. Datos:')
        {alertify.log(Cadena);
        return false;}
        return true;
        }
        
    catch (e) 
        {

            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }
}

function F_GrabarDocumento(){
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Insertar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
  try 
        {       
        var lblcodproducto_grilla='';
        var lblcodunidadventa_grilla='';
        var lblcosto_grilla='';
        var chkSi='';
        var txtcantidad_grilla='';
        var txtprecio_grilla='';
        var arrDetalle = new Array();
        var hfcodunidadventa_grilla='';
        var hfcosto_grilla='';
        var FlagGuia='0';
        var FlagPercepcion=0; 
        var FlagIgv=0; 
        var NotaPedido='0';
        var FacturaAntigua=0;
        var FlagCosteable=0;
        var Contenedor = '#MainContent_';
        
        if($(Contenedor + 'chkPercepcion').is(':checked')) 
        FlagPercepcion=1; 

        if($(Contenedor + 'chkConIgvMaestro').is(':checked')) 
        FlagIgv=1; 

        if($(Contenedor + 'chkFacturaAntigua').is(':checked')) 
        FacturaAntigua=1; 

        if($(Contenedor + 'chkCosteable').is(':checked')) 
        FlagCosteable=1; 

        var Proveedor = ''; var RazonSocial = '';
        var Index= $('#MainContent_txtProveedor').val().indexOf('-');
        Proveedor = $('#MainContent_txtProveedor').val();
        if ( Index ==-1 ) {} else {
            if (isNaN(Proveedor.split('-')[0].trim()) | !ValidarRuc(Proveedor.split('-')[0].trim()))
            {} else
                Proveedor=Proveedor.substr(Proveedor.length - (Proveedor.length -(Index+2)));
        }
        var RazonSocial = Proveedor;

        var CodTipoCliente = 0;
        var NroDni = $('#MainContent_txtNroRuc').val();
        var NroRuc = $('#MainContent_txtNroRuc').val();

        if (NroDni.length == 11)
        {
            NroDni = '';
            CodTipoCliente=2;
        }            

        if (NroRuc.length == 8)
        {
            NroRuc = '';
            CodTipoCliente=1;
        }

                var tasaigv=parseFloat( $("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
                var objParams = {
                                        Filtro_CodTipoDoc: 5,
                                        Filtro_SerieDocSust: $("#MainContent_ddlSerie option:selected").text(),
                                        Filtro_NumeroDocSust: $(Contenedor + 'txtNumero').val(),
                                        Filtro_FechaIngreso: $(Contenedor + 'txtFechaIngreso').val(),
                                        Filtro_FechaRegistro: $(Contenedor + 'txtEmision').val(),
                                        Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
                                        Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
                                        Filtro_ImpSubTotal: $(Contenedor + 'txtSubTotal').val(),
                                        Filtro_ImpIGV: $(Contenedor + 'txtIgv').val(),
                                        Filtro_ImpTotal: $(Contenedor + 'txtTotal').val(),
                                        Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),
                                        Filtro_Descuento: $(Contenedor + 'txtDsctoTotal').val(),
                                        Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
                                        Filtro_CodTasa: $(Contenedor + 'ddlIgv').val() ,
                                        Filtro_Periodo: $(Contenedor + 'txtPeriodo').val(),
                                        Filtro_Vencimiento: $(Contenedor + 'txtVencimiento').val(),
                                        Filtro_TasaIgv: tasaigv,
                                        Filtro_Total: $(Contenedor + 'txtMonto').val(),
                                        Filtro_CodClasificacion: $(Contenedor + 'ddlClasificacion').val(),
                                        Filtro_CodCategoria: $(Contenedor + 'ddlCategoria').val(),
                                        Filtro_CodDetalle: $('#hfCodigoTemporal').val(),
                                        Filtro_FlagPercepcion: FlagPercepcion,
                                        Filtro_CodFacturaAnterior: $('#hfCodFacturaAnterior').val(),
                                        Filtro_FlagIgv: FlagIgv,
                                        Filtro_CodDireccion: $('#hfCodDireccion').val(),
                                        Filtro_CodCliente: $('#hfCodCtaCte').val(),
                                        Filtro_CodDepartamento: $('#hfCodDepartamento').val(),
                                        Filtro_CodProvincia: $('#hfCodProvincia').val(),
                                        Filtro_CodDistrito: $('#hfCodDistrito').val(),
                                        Filtro_ApePaterno: '',
                                        Filtro_CodTipoCtaCte: 2,
                                        Filtro_CodTipoCliente:CodTipoCliente,
                                        Filtro_RazonSocial: Proveedor,
                                        Filtro_NroDni: NroDni, 
                                        Filtro_NroRuc: NroRuc, 
                                        Filtro_Direccion: $(Contenedor + 'txtDireccion').val(),
                                        Filtro_Guia: $(Contenedor + 'txtGuia').val(),
                                        Filtro_CodCajaFisica: $(Contenedor + 'ddlCajaFisica').val(),
                                        Filtro_FacturaAntigua: FacturaAntigua,
                                        Filtro_NroOperacion: $(Contenedor + 'txtNroOperacion').val(),
                                        Filtro_FlagCosteable: FlagCosteable
                               };


                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_GrabarDocumento_NET(arg, function (result) {
                
                  MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {                  
                    if (str_mensaje_operacion=='Se grabo correctamente')
                    {
                        alertify.log('SE GRABO CORRECTAMENTE');
                        F_Nuevo();
                    }
                    else
                    {
                        alertify.log(str_mensaje_operacion);
                    }
                }
                else 
                {
                    alertify.log(result.split('~')[1]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
              MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }
}

function F_Nuevo(){
       $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
       $('.Jq-ui-dtp').datepicker('setDate', new Date());       
       $('#MainContent_ddlTipoDocumento').val('1');
       $('#MainContent_ddlMoneda').val('1');
       $('#MainContent_ddlCategoria').val('1');
       $('#MainContent_ddlClasificacion').val('2');
       $('#MainContent_ddlFormaPago').val('1');
       $('#MainContent_ddlTipoDocumento').val('5');
       $('#hfCodigoTemporal').val('0');
       $('#hfCodCtaCte').val('0');
       $('#MainContent_txtProveedor').val('');
       $('#MainContent_txtNroOperacion').val('');
       $('#MainContent_txtPeriodo').val('');
       $('#MainContent_txtSubTotal').val('0.00');
       $('#MainContent_txtIgv').val('0.00');
       $('#MainContent_txtTotal').val('0.00');
       $('#MainContent_txtMonto').val('0.00');
       $('#MainContent_txtSerie').val('');
       $('#MainContent_txtNumero').val('');
       $('#MainContent_txtNroRuc').val('');
       $('#MainContent_txtVencimiento').val($('#MainContent_txtEmision').val());
       $('#MainContent_txtArticulo').val('');
       $('#MainContent_txtProveedor').focus();
       $("#MainContent_txtPeriodo").val($('#MainContent_txtFechaIngreso').val().substr($('#MainContent_txtFechaIngreso').val().length - 4) + $('#MainContent_txtFechaIngreso').val().substring(3, 5));
       $('#MainContent_chkConIgvMaestro').prop('checked',true);
       $('#MainContent_chkSinIgvMaestro').prop('checked',false);
       $('#MainContent_chkFacturaAntigua').prop('checked',false);
       $('#MainContent_chkCosteable').prop('checked',true);
       $('#hfCodFacturaAnterior').val('0');
       $('#MainContent_ddlTipoDocumento').prop('disabled', false);
       $('#MainContent_txtGuia').val('');       

       try 
        {
              var objParams = {
                                Filtro_CodSerie: '66'
                              };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);

                F_Nuevo_NET(arg, function (result) {
 
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {                  
                   F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[2]);     
                   $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblProducto"));                       
                   $('.ccsestilo').css('background', '#FFFFE0');
                   F_Mostrar_Correlativo(5);
                   F_LimpiarCampos();
                   $('.ccsestilo').css('background', '#FFFFE0');
                }
                else 
                {
                    alertify.log(result.split('~')[1]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }
}

function F_Buscar(){
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
       try 
        {
              var chkNumero='0';
              var chkFecha='0';
              var chkCliente='0';

              if ($('#MainContent_chkNumero').is(':checked'))
              chkNumero='1';

              if ($('#MainContent_chkRango').is(':checked'))
              chkFecha='1';

              if ($('#MainContent_chkCliente').is(':checked'))
              chkCliente='1';
              
              var objParams = {  
                                 Filtro_SerieDoc: $("#MainContent_ddlSerieConsulta option:selected").text(),                                   
                                 Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                                 Filtro_Desde: $('#MainContent_txtDesde').val(),
                                 Filtro_Hasta: $('#MainContent_txtHasta').val(),
                                 Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                                 Filtro_ChkNumero: chkNumero,
                                 Filtro_ChkFecha: chkFecha,
                                 Filtro_ChkCliente: chkCliente,
                                 Filtro_CodTipoDocSust: 5,
                                 Filtro_CodClasificacion: 2,
                                 Filtro_CodEstado: $('#MainContent_ddlEstado').val()                                      
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                 MostrarEspera(true);
                F_Buscar_NET(arg, function (result) {
                
                  MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {                  
                    F_Update_Division_HTML('div_consulta', result.split('~')[2]);    
                    $('#lblGrillaConsulta').text(F_Numerar_Grilla("grvConsulta",'lblNumero')); 
                    if (str_mensaje_operacion!='')                        
                    alertify.log(str_mensaje_operacion);    
                    F_Grilla_Estado_Color('grvConsulta','lblNumero','lblEstado',' .detallesart');              
                }
                else 
                {
                    alertify.log(result.split('~')[1]);
                }

                return false;

                });
        }        
        catch (e) 
        {
            MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }
}

function imgMas_Click(Control) {
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {
        $(Control).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Control).next().html() + '</td></tr>');
        $(Control).attr('src', '../Asset/images/minus.gif');
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }

    return false;
}

function F_EliminarRegistro(Fila) {
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Eliminar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
 try 
        {
    var imgID = Fila.id;
    var lblCodigo = '#' + imgID.replace('imgEliminarDocumento', 'lblCodigo');
    var lblEstado = '#' + imgID.replace('imgEliminarDocumento', 'lblEstado');
    var lblNumero = '#' + imgID.replace('imgEliminarDocumento', 'lblNumero');
    var lblcliente_grilla = '#' + imgID.replace('imgEliminarDocumento', 'lblcliente');
  
    if ($(lblEstado).text()=="CANCELADO TOTAL") 
    {alert ("ESTA ORDEN DE COMPRA SE ENCUENTRA CANCELADA; PRIMERO ELIMINE EL PAGO Y LUEGO ELIMINE LA FACTURA");
    return false;}

      if ($(lblEstado).text()=="FACTURADO") 
    {alert ("ESTE ORDEN DE COMPRA SE ENCUENTRA FACTURADA; ELIMINE LA FACTURA");
    return false;}

    if(!confirm("ESTA SEGURO DE ELIMINAR LA ORDEN DE COMPRA : " + $(lblNumero).text() + "\n" + "DEL PROVEEDOR : " +  $(lblcliente_grilla).text()))
    return false;

     var chkNumero='0';
              var chkFecha='0';
              var chkCliente='0';

              if ($('#MainContent_chkNumero').is(':checked'))
              chkNumero='1';

              if ($('#MainContent_chkRango').is(':checked'))
              chkFecha='1';

              if ($('#MainContent_chkCliente').is(':checked'))
              chkCliente='1';

    var objParams = {
                          Filtro_Codigo: $(lblCodigo).val(),
                          Filtro_SerieDoc: $("#MainContent_ddlSerieConsulta option:selected").text(),     
                          Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                          Filtro_Desde: $('#MainContent_txtDesde').val(),
                          Filtro_Hasta: $('#MainContent_txtHasta').val(),
                          Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                          Filtro_CodTipoDocSust: 5,
                          Filtro_ChkNumero: chkNumero,
                          Filtro_ChkFecha: chkFecha,
                          Filtro_ChkCliente: chkCliente,
                          Filtro_CodClasificacion: 2 
    };

    var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
     MostrarEspera(true);
    F_EliminarRegistro_Net(arg, function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
         MostrarEspera(false);
        if (str_mensaje_operacion == "SE ELIMINO CORRECTAMENTE") {
                F_Update_Division_HTML('div_consulta', result.split('~')[2]);      
                 $('#lblGrillaConsulta').text(F_Numerar_Grilla("grvConsulta",'lblNumero')); 
     alertify.log(result.split('~')[1]);
        }
        else {
             alertify.log(result.split('~')[1]);
        }

        return false;
    });

            }        
        catch (e) 
        {
            MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        } 
}

function F_AnularRegistro(Fila) {
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Anular') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
 try 
        {
    
  
    if ($('#hfEstado').text()=="CANCELADO TOTAL") 
    {alertify.log ("ESTA ORDEN DE COMPRA SE ENCUENTRA CANCELADA; PRIMERO ELIMINE EL PAGO Y LUEGO ELIMINE LA FACTURA");
    return false;}

      if ($('#hfEstado').text()=="FACTURADO") 
    {alertify.log ("ESTA ORDEN DE COMPRA SE ENCUENTRA FACTURADA; ELIMINE LA FACTURA");
    return false;}

        if ($('#hfEstado').text()=="ANULADO") 
    {alertify.log ("ESTA ORDEN DE COMPRA SE ENCUENTRA ANULADA");
    return false;}

    if(!confirm("ESTA SEGURO DE ANULAR LA ORDEN DE COMPRA : " + $('#hfNumero').val() + "\n" + "DEL PROVEEDOR : " +  $('#hfcliente_grilla').val()))
    return false;

     var chkNumero='0';
              var chkFecha='0';
              var chkCliente='0';

              if ($('#MainContent_chkNumero').is(':checked'))
              chkNumero='1';

              if ($('#MainContent_chkRango').is(':checked'))
              chkFecha='1';

              if ($('#MainContent_chkCliente').is(':checked'))
              chkCliente='1';

    var objParams = {
                          Filtro_Codigo: $('#hfCodigo').val(),
                          Filtro_SerieDoc: $("#MainContent_ddlSerieConsulta option:selected").text(),     
                          Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                          Filtro_Desde: $('#MainContent_txtDesde').val(),
                          Filtro_Hasta: $('#MainContent_txtHasta').val(),
                          Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                          Filtro_CodTipoDocSust: 5,
                          Filtro_ChkNumero: chkNumero,
                          Filtro_ChkFecha: chkFecha,
                          Filtro_ChkCliente: chkCliente,
                          Filtro_CodClasificacion: 2 ,
                          Filtro_ObservacionAnular: $('#MainContent_txtObservacionAnulacion').val() 
    };

    var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
     MostrarEspera(true);
    F_AnularRegistro_Net(arg, function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
         MostrarEspera(false);
        if (str_mensaje_operacion == "SE ANULO CORRECTAMENTE") {
                F_Update_Division_HTML('div_consulta', result.split('~')[2]);   
                $('#lblGrillaConsulta').text(F_Numerar_Grilla("grvConsulta",'lblNumero'));    
                $('#div_Anulacion').dialog('close');
     alertify.log(result.split('~')[1]);
        }
        else {
             alertify.log(result.split('~')[1]);
        }

        return false;
    });

            }        
        catch (e) 
        {
            MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        } 
}

function getContentTab(){
    $('#MainContent_txtDesde').val($('#MainContent_txtHasta').val())  ;
    $('#MainContent_chkRango').prop('checked',true);
    F_Buscar();
    return false;
}

function MostrarEspera(pboolMostrar) {
    if (pboolMostrar) {
        $('#dlgWait').dialog({
            autoOpen: false,
            modal: true,
            height: 'auto',
            resizable: false,
            dialogClass: 'alert'
        });

        $('.alert div.ui-dialog-titlebar').hide();
        //        $('.ui-button').remove();
        $('#dlgWait').dialog('open');
    }
    else {
        $('#dlgWait').dialog('close');
    }
}

function F_TipoCambio(){
    try 
        {
              var objParams = {
                                Filtro_Emision: $("#MainContent_txtEmision").val()
                              };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
                    MostrarEspera(true);

                F_TipoCambio_NET(arg, function (result) {
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                    $('#MainContent_lblTC').text(result.split('~')[2]);
                else 
                    alertify.log(result.split('~')[1]);
                
                return false;

                });
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }

}

function F_Mostrar_Correlativo(CodTipoDoc) {

    var arg;

    try {

        var objParams = {
            Filtro_SerieDoc:$("#MainContent_ddlSerie option:selected").text(),
            Filtro_CodTipoDoc: CodTipoDoc
        };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_Mostrar_Correlativo_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") 
                    {
                        $('#MainContent_txtNumero').val(result.split('~')[2]);                       
                    }
                    else {
                        alertify.log(str_mensaje_operacion);
                    }
                }
            );

    } catch (mierror) {
    MostrarEspera(false);
        alertify.log("ERROR DETECTADO: " + mierror);

    }

}

function F_FacturacionOC() {
        var Contenedor = '#MainContent_';
        var Mensaje = "Ingrese los sgtes datos: ";

        if ($(Contenedor + 'txtProveedor').val()=="" || $('#hfCodCtaCte').val()==0)
            Mensaje= Mensaje + "\n" + "Proveedor";
        
        if ($(Contenedor + 'lblTC').text()=="0")
           Mensaje= Mensaje + "\n" + "Tipo de Cambio";
        
        if (Mensaje !="Ingrese los sgtes datos: ")
        {
            alertify.log(Mensaje);
            return false;
        }
        
        try {
            var objParams = {
                Filtro_CodCtaCte:$('#hfCodCtaCte').val(),
                Filtro_CodMoneda:$(Contenedor + 'ddlMoneda').val()
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
            MostrarEspera(true);

            F_FacturacionOC_NET(arg, function (result) {
                MostrarEspera(false);

                var str_resultado_operacion = "";
                var str_mensaje_operacion = "";

                str_resultado_operacion = result.split('~')[0];
                str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1")
                {
                   
                       $('#divFacturacionOC').dialog({
                                resizable: false,
                                modal: true,
                                title: "Facturacion Orden de Compra",
                                title_html: true,
                                height: 500,
                                width: 890,
                                autoOpen: false
                        });
                        F_Update_Division_HTML('div_DetalleOC', result.split('~')[2]);
                          $('.ccsestilo').css('background', '#FFFFE0');
                        if (str_mensaje_operacion!="")
                        alertify.log(str_mensaje_operacion);
                        else
                        $('#divFacturacionOC').dialog('open');

                        return false;

                }
                   
                else
                    alertify.log(result.split('~')[1]);

                return false;

            });
        }

        catch (e) {
            MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }
    }

function F_ValidarDevolucion(Mensaje){
 try 
        {
        var chkSi='';
        var x=0;

                $('#MainContent_grvDetalleOC .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                               
                     if ($(chkSi).is(':checked')) 
                        x=1;
                        
               });

               if(x==0)
               {
               alertify.log(Mensaje);
               return false;
               }
               else
               {return true;}
               
        }
        
        catch (e) 
        {

            alertify.log("ERROR DETECTADO: " + e);
        }
}

function F_Devolucion(){
 try 
        {
                var chkSi='';
                var arrDetalle = new Array();
                var lblcoddetalle_grilla='';   
                var hfCodUndMedida='';
                var hfSerieDocSust = new Array();
                var lblPrecio='';    
                var hfNumeroDocSust='';
                var txtCantidadEntregada = new Array();
                var hfStockActual='';   
                var lblProducto='';   
                var Mensaje = "LOS SGTES PRODUCTOS TIENEN STOCK MENOR QUE LA DEVOLUCION";

                $('#MainContent_grvDetalleOC .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblCodDetalle = chkSi.replace('chkEliminar', 'lblCodDetalle');
                    hfCodArticulo = chkSi.replace('chkEliminar', 'hfCodArticulo');
                    hfCodUndMedida = chkSi.replace('chkEliminar', 'hfCodUndMedida');
                    hfSerieDocSust = chkSi.replace('chkEliminar', 'hfSerieDocSust');
                    lblPrecio = chkSi.replace('chkEliminar', 'lblPrecio');
                    hfNumeroDocSust = chkSi.replace('chkEliminar', 'hfNumeroDocSust');
                    txtCantidadEntregada = chkSi.replace('chkEliminar', 'txtCantidadEntregada');
                    hfStockActual = chkSi.replace('chkEliminar', 'hfStockActual');
                    lblProducto = chkSi.replace('chkEliminar', 'lblProducto');
                  
                  if ($(chkSi).is(':checked')) 
                    {
                       if (parseFloat($(hfStockActual).val()) < parseFloat ($(txtCantidadEntregada).val()) )
                            Mensaje = Mensaje + '<p></p>' + $(lblProducto).text();

                        var objDetalle = {
                        CodDetalle: $(lblCodDetalle).text(),
                        CodArticulo: $(hfCodArticulo).val(),
                        CodUndMedida: $(hfCodUndMedida).val(),
                        SerieDoc: $(hfSerieDocSust).val(),
                        NumeroDoc: $(hfNumeroDocSust).val(),
                        Costo: $(lblPrecio).text(),
                        Cantidad: $(txtCantidadEntregada).val()
                        };                                               
                        arrDetalle.push(objDetalle);
                    }
                });

                if (Mensaje != "LOS SGTES PRODUCTOS TIENEN STOCK MENOR QUE LA DEVOLUCION")
                {
                    alertify.log(Mensaje);
                    return false ;
                }
                            
                var Contenedor = '#MainContent_';
                var tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

                var objParams = {
                                        Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                        Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
                                        Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
                                        Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
                                        Filtro_CodTasa: $(Contenedor + 'ddlIgv').val() ,
                                        Filtro_TasaIgv: tasaigv                                      
                                };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_Devolucion_NET(arg, function (result) {

                  MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                    $('#MainContent_txtMontoOC').val(result.split('~')[4]);
                    $('#MainContent_txtTotalOC').val(result.split('~')[4]);
                    $('#MainContent_txtIgvOC').val(result.split('~')[5]);
                    $('#MainContent_txtSubTotalOC').val(result.split('~')[6]);
                    $('#MainContent_txtDsctoTotalOC').val(result.split('~')[7]);
                    F_Update_Division_HTML('div_DetalleOC', result.split('~')[3]);
                    $('.ccsestilo').css('background', '#FFFFE0');
//                    if (result.split('~')[2]=='Se grabo correctamente')
//                    alertify.log('Se grabo correctamente');
                }
                else 
                {
                    alertify.log(result.split('~')[2]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
              MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
        }
}

function F_ValidarCheck_OC(ControlID) {

    var txtprecio_Grilla = '';
    var ddlLista_grilla = '';
    var txtcant_grilla = '';
    var txtPrecioVenta = '';
    var boolEstado = false;
    var chkok_grilla='';
                   
            chkok_grilla = '#' + ControlID;
            txtCantidadEntregada = chkok_grilla.replace('chkEliminar', 'txtCantidadEntregada');
            txtPrecioVenta = chkok_grilla.replace('chkEliminar', 'txtPrecioVenta');
            lblCantidad = chkok_grilla.replace('chkEliminar', 'lblCantidad');
                 
            boolEstado = $(chkok_grilla).is(':checked');
            if (boolEstado)
            {               
                $(txtCantidadEntregada).prop('disabled', false);
                $(txtPrecioVenta).prop('disabled', false);
                $(txtCantidadEntregada).val($(lblCantidad).text());
                $(txtCantidadEntregada).focus();
            }
            else
            {
                $(txtCantidadEntregada).val('');
                $(txtCantidadEntregada).prop('disabled', true);
                $(txtPrecioVenta).prop('disabled', true);
            }           
        
    return true;
}

function F_ValidarStockGrilla() {
        if (!F_ValidarAgregar())
        return false;
              
        F_AgregarTemporal();
        F_LimpiarGrillaConsulta();
        
        $('#MainContent_txtArticulo').focus();
        return false;
}

function F_ValidarStockGrillaOC(ControlID) {
   
    var txtcantidad_Grilla = '';
    var lblstock = '';
    var txtcant_grilla = '';
    var boolEstado = false;
    var chkok_grilla = '';

    txtcantidad_Grilla = '#' + ControlID;
    chkok_grilla = txtcantidad_Grilla.replace('txtCantidadEntregada', 'chkEliminar');
    lblstock = txtcantidad_Grilla.replace('txtCantidadEntregada', 'lblCantidad');

    
    boolEstado = $(chkok_grilla).is(':checked');

    if (boolEstado &&  parseFloat($(txtcantidad_Grilla).val()) > parseFloat($(lblstock).text())) {
            alertify.log("Stock insuficiente");
            $(txtcantidad_Grilla).val($(lblstock).text());
            return false;
    }
    if ($(txtcantidad_Grilla).val()=='')
        $(txtcantidad_Grilla).val($(lblstock).text());
    
    if (boolEstado==false)
     $(txtcantidad_Grilla).val($(lblstock).text());


    return true;
}

function F_ValidarAgregarOC(){
try 
        {
            var cadena = "Ingrese los sgtes. campos: ";
            var chkSi='';
            var lblCodigo='';
            var txtCantidadEntregada='';
            var x=0;

            $('#MainContent_grvDetalleOC .chkDelete :checkbox').each(function () {
                chkSi = '#' + this.id;
                    
                txtCantidadEntregada = chkSi.replace('chkEliminar', 'txtCantidadEntregada');
                lblCodigo = chkSi.replace('chkEliminar', 'lblCodigo');
                    
                if ($(chkSi).is(':checked')) 
                   {
                     if ($(txtCantidadEntregada).val()=='')
                         cadena=cadena + "\n" + "Cantidad para el Codigo " + $(lblCodigo).text(); 
                     x=1;
                   }
            });

            if(x==0)
               cadena="No ha seleccionado ningun producto";

               if (cadena != "Ingrese los sgtes. campos: ")
                  {
                      alertify.log(cadena);
                      return false;
                  }  
                  return true;                     
        }        
        catch (e) 
        {
            alertify.log("ERROR DETECTADO: " + e);           
        }
}

function F_AgregarTemporalOC(){
try 
        {
       
        var lblcodproducto_grilla='';
        var lblcodunidadventa_grilla='';
        var lblcosto_grilla='';
        var chkSi='';
        var txtcantidad_grilla='';
        var txtprecio_grilla='';
        var txtdscto_grilla='';
        var arrDetalle = new Array();
        var hfcodunidadventa_grilla='';
        var hfcosto_grilla='';
        var lblProducto='';
        var Contenedor = '#MainContent_';  

        var tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1); 
             
                $('#MainContent_grvDetalleOC .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblcodproducto_grilla = chkSi.replace('chkEliminar', 'hfCodArticulo');
                    lblcodunidadventa_grilla = chkSi.replace('chkEliminar', 'hfCodUndMedida');
                    lblcosto_grilla = chkSi.replace('chkEliminar', 'lblPrecio');
                    txtprecio_grilla = chkSi.replace('chkEliminar', 'lblPrecio');
                    txtcantidad_grilla = chkSi.replace('chkEliminar', 'txtCantidadEntregada');
                    hfcodunidadventa_grilla = chkSi.replace('chkEliminar', 'hfCodUndMedida');
                    hfcosto_grilla= chkSi.replace('chkEliminar', 'lblPrecio');
                    lblCodDetalle= chkSi.replace('chkEliminar', 'lblCodDetalle');
                    lblNumero = chkSi.replace('chkEliminar', 'lblNumero');
                    lblProducto = chkSi.replace('chkEliminar', 'lblProducto');
      
                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {
                        CodArticulo: $(lblcodproducto_grilla).val(),
                        Cantidad: $(txtcantidad_grilla).val(),
                        Precio: $(txtprecio_grilla).text() / tasaigv,
                        PrecioDscto: $(txtprecio_grilla).text() / tasaigv,
                        Costo: $(hfcosto_grilla).text(),
                        CostoUnitario: $(hfcosto_grilla).text(),
                        CodUm: $(hfcodunidadventa_grilla).val(),
                        Dscto: 0,
                        CodDetalle: $(lblCodDetalle).text(),                       
                        OC: $(lblNumero).text(),
                        Descripcion: $(lblProducto).text()
                        };
                                               
                        arrDetalle.push(objDetalle);
                    }
                });

               
                                   
//                if ($('#MainContent_chKConIgv').is(':checked'))
//                 tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
//                else
//                 tasaigv=1;
//                
                var objParams = {
                                        Filtro_CodTipoDoc: "5",
                                        Filtro_SerieDoc: $(Contenedor + 'ddlSerie').val(),
                                        Filtro_NumeroDoc: $(Contenedor + 'txtNumero').val(),
                                        Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
                                        Filtro_Vencimiento: $(Contenedor + 'txtVencimiento').val(),
                                        Filtro_CodCliente: $('#hfCodCtaCte').val(),
                                        Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),
                                        Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
                                        Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
                                        Filtro_SubTotal: $(Contenedor + 'txtSubTotal').val(),
                                        Filtro_CodProforma: "0",
                                        Filtro_Igv: $(Contenedor + 'txtIgv').val(),
                                        Filtro_Total: $(Contenedor + 'txtTotal').val(),
                                        Filtro_CodGuia: "0",
                                        Filtro_Descuento: "0",
                                        Filtro_TasaIgv: parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1),
                                        Filtro_TasaIgvDscto: tasaigv,
                                        Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                                        Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle)
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_AgregarTemporal_NET(arg, function (result) {
                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                if (str_resultado_operacion == "1") 
                {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    $('#MainContent_txtTotal').val(result.split('~')[5]);
                    $('#MainContent_txtMonto').val(result.split('~')[5]);
                    $('#MainContent_txtIgv').val(result.split('~')[6]);
                    $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                    $('#MainContent_txtDsctoTotal').val(result.split('~')[8]);
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                    $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblProducto"));
                    $('.ccsestilo').css('background', '#FFFFE0');
                    $('#divFacturacionOC').dialog('close');
//                    if (result.split('~')[2]=='Los Producto(s) se han agregado con exito')
//                    alertify.log('Los Producto(s) se han agregado con exito');
                }
                else 
                {
                    MostrarEspera(false);
                    alertify.log(result.split('~')[2]);

                }

                return false;

                });
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
            
        }
}

function F_LimpiarGrillaConsultaOC(){
         var chkSi='';
         var txtprecio_grilla='';
         var txtcantidad_grilla='';
         var ddlLista_grilla='';

         $('#MainContent_grvConsultaArticulo .chkSi :checkbox').each(function () {
                     chkSi = '#' + this.id;
                     txtprecio_grilla = chkSi.replace('chkOK', 'txtPrecioLibre');
                     txtcantidad_grilla = chkSi.replace('chkOK', 'txtCantidad');
                     ddlLista_grilla = chkSi.replace('chkOK', 'ddlLista');
                     
                     $(txtcantidad_grilla).prop('disabled', true);
                     $(txtprecio_grilla).val('');
                     $(txtcantidad_grilla).val('');
                     $(ddlLista_grilla).val('4');

                     $(chkSi).prop('checked', false);
                       
         });
}
   
function F_BuscarTemporal(){

  try 
        {
        if ($('#hfSerie').val()==0)
        return false;

        var Contenedor = '#MainContent_';
                var tasaigv=parseFloat( $("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
                var objParams = {
                                        Filtro_TasaIgv: tasaigv,
                                        Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                                        Filtro_NotaPedido: 0
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
                MostrarEspera(true);

                F_BuscarTemporal_NET(arg, function (result) {
        
                 MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                    $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblProducto"));
                }
                else 
                {
                    alertify.log(result.split('~')[2]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
        MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
        }
}

function F_VerSeries_Factura(HlkControlID) {
      
        var CodDetalle = '';
                       
        CodDetalle = $('#' + HlkControlID).text();

        try {
            var objParams = {
                Filtro_CodDetalle: CodDetalle
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
            MostrarEspera(true);

            F_VerSeries_Factura_NET(arg, function (result) {
                MostrarEspera(false);

                var str_resultado_operacion = "";
                var str_mensaje_operacion = "";

                str_resultado_operacion = result.split('~')[0];
                str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1")
                {
                    $('#hfFlagSerie').val(1);
                   F_Update_Division_HTML('div_GrillaSerieDetalle', result.split('~')[2]) ;                   
                    if (str_mensaje_operacion != "")
                    {
                       alertify.log(str_mensaje_operacion);
                    }
                    else
                    {
                               
                     $('#div_SerieDetalle').dialog({
                         resizable: false,
                         modal: true,
                         title: "Series",
                         title_html: true,
                         height: 320,
                         width: 400,
                         autoOpen: false
                    });
                   
                 
                    $('#div_SerieDetalle').dialog('open');
                    
                    }
                            
                    return false;
                }
                   
                else
                {
                 alertify.log(result.split('~')[1]);
                }
                return false;
             });
        }

        catch (e) {
            MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }

    }

function F_EditarRegistro(Fila) {

    try {
        var Contenedor = '#MainContent_';
            
        $("#div_Mantenimiento").dialog({
            resizable: false,
            modal: true,
            title: "Edicion Registro",
            title_html: true,
            height: 120,
            width: 300,
            autoOpen: false
        });

        var imgID = Fila.id;

        var lblPeriodo = '#' + imgID.replace('imgEditarRegistro', 'lblPeriodo');
        var lblCodigo = '#' + imgID.replace('imgEditarRegistro', 'lblCodigo');
        
        $(Contenedor + 'txtPeriodoConsulta').val($(lblPeriodo).text());
        $('#hfCodDocumentoVenta').val($(lblCodigo).val());

        $('#div_Mantenimiento').dialog('open');

        return false;


    }

    catch (e) {

        alertify.log("ERROR DETECTADO: " + e);
        return false;
    }

}

function F_EditarTemporal() {

    try {
        var chkSi = '';
        var arrDetalle = new Array();
        var lblcoddetalle_grilla = '';

        var Contenedor = '#MainContent_';

        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);


                  var chkNumero='0';
              var chkFecha='0';
              var chkCliente='0';

              if ($('#MainContent_chkNumero').is(':checked'))
              chkNumero='1';

              if ($('#MainContent_chkRango').is(':checked'))
              chkFecha='1';

              if ($('#MainContent_chkCliente').is(':checked'))
              chkCliente='1';

        var objParams = {
                        Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                        Filtro_Desde: $('#MainContent_txtDesde').val(),
                        Filtro_Hasta: $('#MainContent_txtHasta').val(),
                        Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                        Filtro_ChkNumero: chkNumero,
                        Filtro_ChkFecha: chkFecha,
                        Filtro_ChkCliente: chkCliente,
                        Filtro_Periodo: $('#MainContent_txtPeriodoConsulta').val(),
                        Filtro_CodMovimiento: $('#hfCodDocumentoVenta').val(),
                          Filtro_CodTipoDocSust: 1,
                                        Filtro_CodClasificacion: 2
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_EditarTemporal_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
          
                F_Update_Division_HTML('div_consulta', result.split('~')[2]);    
                    if (str_mensaje_operacion!='')                        
                    alertify.log(str_mensaje_operacion);
                $('#div_Mantenimiento').dialog('close');
            }
            else {
                alertify.log(result.split('~')[2]);
            }

            return false;

        });
    }

    catch (e) {
        MostrarEspera(false);
        alertify.log("ERROR DETECTADO: " + e);
    }
}

function F_ActualizarPrecio(Fila) {
 try 
        {
            var txtPrecio =  '#' + Fila;           
            var hfCodDetalle = txtPrecio.replace('txtPrecio', 'hfCodDetalle');
            var hfPrecio = txtPrecio.replace('txtPrecio', 'hfPrecio');
            var hfCantidad = txtPrecio.replace('txtPrecio', 'hfCantidad');
            var txtCantidad = txtPrecio.replace('txtPrecio', 'txtCantidad');
            var lblProducto = txtPrecio.replace('txtPrecio', 'lblProducto');
            var tasaigv;
            var FlagIgv = 0;
            var Contenedor = '#MainContent_';    
            if(parseFloat($(txtPrecio).val())==parseFloat($(hfPrecio).val()) & parseFloat($(txtCantidad).val())==parseFloat($(hfCantidad).val()))
            {
            $(txtPrecio).val(parseFloat($(txtPrecio).val()).toFixed(2));
            $(txtCantidad).val(parseFloat($(txtCantidad).val()).toFixed(2));
            return false;
            }

            if($(Contenedor + 'chkConIgvMaestro').is(':checked')) 
             FlagIgv = 1;
            
            if ($('#MainContent_chkConIgvMaestro').is(':checked'))
                 tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
            else
                 tasaigv=1;

            var objParams = {
                              Filtro_Precio: ($(txtPrecio).val())/tasaigv,
                              Filtro_Cantidad: $(txtCantidad).val(),
                              Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                              Filtro_CodDetDocumentoVenta: $(hfCodDetalle).val(),
                              Filtro_Descripcion: $(lblProducto).text(),
                              Filtro_TasaIgvDscto: tasaigv,
                              Filtro_TasaIgv: parseFloat( $("#MainContent_ddlIgv option:selected").text()) + parseFloat(1),
                              Filtro_Flag: 0,
                              Filtro_CodTipoOperacion: 2,
                              Filtro_FlagIgv: FlagIgv,
                              Filtro_TipoCambio: $('#MainContent_lblTC').text(),
                              Filtro_Tasa: $('#MainContent_lblTC').text(),
                              Filtro_CodMoneda: $('#MainContent_ddlMoneda').val()
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
            MostrarEspera(true);
            F_ActualizarPrecio_Net(arg, function (result) {

                            var str_resultado_operacion = "";
                            var str_mensaje_operacion = "";

                            str_resultado_operacion = result.split('~')[0];
                            str_mensaje_operacion = result.split('~')[1];
                MostrarEspera(false);
                if (str_mensaje_operacion == "") {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    if (result.split('~')[5]=='0')
                    {
                        $('#MainContent_txtTotal').val('0.00');
                        $('#MainContent_txtIgv').val('0.00');
                        $('#MainContent_txtSubTotal').val('0.00');
                        $('#MainContent_txtMonto').val('0.00');
                    }
                    else
                    {
                        $('#MainContent_txtTotal').val(result.split('~')[5]);
                        $('#MainContent_txtIgv').val(result.split('~')[6]);
                        $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                        $('#MainContent_txtMonto').val(result.split('~')[5]);
                    }
                   
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                    $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblProducto"));
                    $('.ccsestilo').css('background', '#FFFFE0');
                }
                else {
                     F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                     $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblProducto"));
                      $('.ccsestilo').css('background', '#FFFFE0');
                     alertify.log(result.split('~')[1]);
                }

                return false;
            });

            }
        
        catch (e) 
        {
        MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        } 
}

function F_ActualizarCantidad(Fila) {
 try 
        {
            var txtCantidad =  '#' + Fila;           
            var hfCodDetalle = txtCantidad.replace('txtCantidad', 'hfCodDetalle');
            var hfPrecio = txtCantidad.replace('txtCantidad', 'hfPrecio');
            var hfCantidad = txtCantidad.replace('txtCantidad', 'hfCantidad');
            var txtPrecio = txtCantidad.replace('txtCantidad', 'txtPrecio');
            var lblPrecio = txtCantidad.replace('txtCantidad', 'lblPrecio');
            var lblProducto = txtCantidad.replace('txtCantidad', 'lblProducto');
            var tasaigv;
            var FlagIgv = 0;
            var Contenedor = '#MainContent_';    
            if(parseFloat($(txtPrecio).val())==parseFloat($(hfPrecio).val()) & parseFloat($(txtCantidad).val())==parseFloat($(hfCantidad).val()))
            {
            $(txtPrecio).val(parseFloat($(txtPrecio).val()).toFixed(2));
            $(txtCantidad).val(parseFloat($(txtCantidad).val()).toFixed(2));
            return false;
            }

             if($(Contenedor + 'chkConIgvMaestro').is(':checked')) 
             FlagIgv = 1;
            
            if ($('#MainContent_chkConIgvMaestro').is(':checked'))
                 tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
            else
                 tasaigv=1;

            var objParams = {
                              Filtro_Precio: ($(txtPrecio).val())/tasaigv,
                              Filtro_Cantidad: $(txtCantidad).val(),
                              Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                              Filtro_CodDetDocumentoVenta: $(hfCodDetalle).val(),
                              Filtro_Descripcion: $(lblProducto).text(),
                              Filtro_TasaIgv: parseFloat( $("#MainContent_ddlIgv option:selected").text()) + parseFloat(1),
                              Filtro_Flag: 0,
                              Filtro_CodTipoOperacion: 2,
                              Filtro_TasaIgvDscto: tasaigv, 
                              Filtro_FlagIgv: FlagIgv,
                              Filtro_TipoCambio: $('#MainContent_lblTC').text(),
                              Filtro_Tasa: $('#MainContent_lblTC').text(),
                              Filtro_CodMoneda: $('#MainContent_ddlMoneda').val()
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
            MostrarEspera(true);
            F_ActualizarPrecio_Net(arg, function (result) {

                            var str_resultado_operacion = "";
                            var str_mensaje_operacion = "";

                            str_resultado_operacion = result.split('~')[0];
                            str_mensaje_operacion = result.split('~')[1];
                MostrarEspera(false);
                 if (str_mensaje_operacion == "") {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    if (result.split('~')[5]=='0')
                    {
                        $('#MainContent_txtTotal').val('0.00');
                        $('#MainContent_txtIgv').val('0.00');
                        $('#MainContent_txtSubTotal').val('0.00');
                        $('#MainContent_txtMonto').val('0.00');
                    }
                    else
                    {
                        $('#MainContent_txtTotal').val(result.split('~')[5]);
                        $('#MainContent_txtIgv').val(result.split('~')[6]);
                        $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                        $('#MainContent_txtMonto').val(result.split('~')[5]);
                    }
                   
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                    $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblProducto"));
                    $('.ccsestilo').css('background', '#FFFFE0');
                }
                else {
                     F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                     $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblProducto"));
                     $('.ccsestilo').css('background', '#FFFFE0');
                     alertify.log(result.split('~')[1]);
                }

                return false;
            });

            }
        
        catch (e) 
        {
        MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }

 
} 

function F_ValidarCheckSinIgvMaestro(ControlID) {
                       
           var chkok_grilla = '#' + ControlID;
           
           if ($(chkok_grilla).is(':checked'))
           {
               $('#MainContent_chkConIgvMaestro').prop('checked', false);
               $('#MainContent_chKConIgv').prop('checked', false);
               $('#MainContent_chkSinIgv').prop('checked', true);
           }               
           else
           {
               $('#MainContent_chkConIgvMaestro').prop('checked', true);
               $('#MainContent_chKConIgv').prop('checked', true);
               $('#MainContent_chkSinIgv').prop('checked', false);
           }               
         
         F_ActualizarDetalle();
   return false;
}

function F_ValidarCheckConIgvMaestro() {
                       
           if ($('#MainContent_chkConIgvMaestro').is(':checked'))
           {
               $('#MainContent_chkSinIgvMaestro').prop('checked', false);
               $('#MainContent_chkSinIgv').prop('checked', false);
               $('#MainContent_chKConIgv').prop('checked', true);
           }              
           else
           {
               $('#MainContent_chkSinIgvMaestro').prop('checked', true);
               $('#MainContent_chkSinIgv').prop('checked', true);
               $('#MainContent_chKConIgv').prop('checked', false);
           }              
         
         F_ActualizarDetalle();
   return false;
}

function F_ActualizarDetalle(){
  try 
        {
        if($('#MainContent_txtTotal').val()=='0.00')
        return;

        var FlagIgv = 0;
        var Contenedor = '#MainContent_';    
        var tasaigv;
                                   
                if ($('#MainContent_chkConIgvMaestro').is(':checked'))
                 tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
                else
                 tasaigv=1;
                
        if($(Contenedor + 'chkConIgvMaestro').is(':checked')) 
             FlagIgv = 1; 
                
                var objParams = {
                                  Filtro_CodDocumentoVenta: $('#hfCodigoTemporal').val(),
                                  Filtro_TasaIgv: parseFloat( $("#MainContent_ddlIgv option:selected").text()) + parseFloat(1),
                                  Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
                                  Filtro_FlagIgv: FlagIgv,
                                  Filtro_TasaIgvDscto: tasaigv,
                                  Filtro_Tasa: $('#MainContent_lblTC').text(),
                                  Filtro_TipoCambio: $('#MainContent_lblTC').text(),
                                  Filtro_Tasa: $('#MainContent_lblTC').text(),
                                  Filtro_CodMoneda: $('#MainContent_ddlMoneda').val(),
                                };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_ActualizarDetalle_NET(arg, function (result) {
                
                  MostrarEspera(false);

                   var str_resultado_operacion = result.split('~')[0];
                   var str_mensaje_operacion = result.split('~')[1];

                  if (str_mensaje_operacion == "Se actualizó con éxito")
                   {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    if (result.split('~')[5]=='0')
                    {
                         $('#MainContent_txtTotal').val('0.00');
                         $('#MainContent_txtIgv').val('0.00');
                         $('#MainContent_txtSubTotal').val('0.00');
                         $('#MainContent_txtDsctoTotal').val('0.00');
                         $('#MainContent_txtMonto').val('0.00');
                    }
                    else
                    {
                         $('#MainContent_txtTotal').val(result.split('~')[5]);
                         $('#MainContent_txtIgv').val(result.split('~')[6]);
                         $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                         $('#MainContent_txtMonto').val(result.split('~')[5]);
                         $('#MainContent_txtDsctoTotal').val(result.split('~')[8]);
                    }                   
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                    $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblProducto"));
                    $('.ccsestilo').css('background', '#FFFFE0');
                   }
                else 
                {
                     F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                     $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblProducto"));
                     $('.ccsestilo').css('background', '#FFFFE0');
                     alertify.log(result.split('~')[1]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
              MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }
}

function F_CargarGrillaTemporal(){
  try 
        {
        if($('#MainContent_txtTotal').val()=='0.00')
        return;

        var FlagIgv = 0;
        var Contenedor = '#MainContent_';    
        var tasaigv;
                                   
                if ($('#MainContent_chkConIgvMaestro').is(':checked'))
                 tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
                else
                 tasaigv=1;
                
        if($(Contenedor + 'chkConIgvMaestro').is(':checked')) 
             FlagIgv = 1; 
                
                var objParams = {
                                  Filtro_CodDocumentoVenta: $('#hfCodigoTemporal').val(),
                                  Filtro_TasaIgv: parseFloat( $("#MainContent_ddlIgv option:selected").text()) + parseFloat(1),
                                  Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
                                  Filtro_FlagIgv: FlagIgv,
                                  Filtro_TasaIgvDscto: tasaigv,
                                  Filtro_Tasa: $('#MainContent_lblTC').text()
                                };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_CargarGrillaTemporal_NET(arg, function (result) {
                
                  MostrarEspera(false);

                   var str_resultado_operacion = result.split('~')[0];
                   var str_mensaje_operacion = result.split('~')[1];

                  if (str_mensaje_operacion == "Se Grabo Correctamente")
                   {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    if (result.split('~')[5]=='0')
                    {
                         $('#MainContent_txtTotal').val('0.00');
                         $('#MainContent_txtIgv').val('0.00');
                         $('#MainContent_txtSubTotal').val('0.00');
                         $('#MainContent_txtDsctoTotal').val('0.00');
                         $('#MainContent_txtMonto').val('0.00');
                    }
                    else
                    {
                         $('#MainContent_txtTotal').val(result.split('~')[5]);
                         $('#MainContent_txtIgv').val(result.split('~')[6]);
                         $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                         $('#MainContent_txtMonto').val(result.split('~')[5]);
                         $('#MainContent_txtDsctoTotal').val(result.split('~')[8]);
                    }                   
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                    $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblProducto"));
                    $('.ccsestilo').css('background', '#FFFFE0');
                   }
                else 
                {
                     F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                     $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblProducto"));
                     $('.ccsestilo').css('background', '#FFFFE0');
                     alertify.log(result.split('~')[1]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
              MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }
}

function F_ReemplazarDocumento(Fila) {
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Editar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
        try {
            var imgID = Fila.id;
            var lblcodigo = '#' + imgID.replace('imgReemplazar', 'lblCodigo');
            var lblEstado = '#' + imgID.replace('imgReemplazar', 'lblEstado');
            var lblTipoDoc = '#' + imgID.replace('imgReemplazar', 'hfCodTipoDoc');
            var lblCodMoneda = '#' + imgID.replace('imgReemplazar', 'hfCodMoneda');
            var lblNumero = '#' + imgID.replace('imgReemplazar', 'lblNumero');

            if ($(lblEstado).text()!='PENDIENTE')
            {
               alertify.log("LA ORDEN DE COMPRA " + $(lblNumero).text() + " NO SE PUEDE MODIFICAR, DEBE ESTAR PENDIENTE");
               return false;
            }

            var objParams = {
                Filtro_CodMovimiento: $(lblcodigo).val(),
                Filtro_TasaIgv: parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1),
                Filtro_NotaPedido: 0,
                Filtro_CodTipoDoc: $(lblTipoDoc).val(),
                Filtro_TasaIgvDscto: parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1),
                Filtro_Tasa: parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1),
                Filtro_CodMoneda: $(lblCodMoneda).val()
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
            MostrarEspera(true);

            F_ReemplazarFactura_NET(arg, function (result) {
                MostrarEspera(false);

                var str_resultado_operacion = result.split('~')[0];
                var str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") {

                    $('#MainContent_ddlTipoDocumento').val($(lblTipoDoc).val());
                    $('#MainContent_ddlTipoDocumento').prop('disabled', false);

                    $('#hfCodFacturaAnterior').val(result.split('~')[13]);
                    $('#hfCodigoTemporal').val(result.split('~')[2]);

                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[3]);
                    $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblProducto"));
                    $('#MainContent_txtTotal').val(result.split('~')[4]);
                    $('#MainContent_txtMonto').val(result.split('~')[4]);
                    $('#MainContent_txtIgv').val(result.split('~')[5]);
                    $('#MainContent_txtSubTotal').val(result.split('~')[6]);
                    $('#MainContent_txtDsctoTotal').val(result.split('~')[23]);
                    //$('#MainContent_txtAcuentaNV').val(result.split('~')[7]);
                    $('#MainContent_txtNroRuc').val(result.split('~')[8]);
                    $('#MainContent_txtProveedor').val(result.split('~')[9]);
                    $('#MainContent_ddlMoneda').val(result.split('~')[10]);
                    //---------
                    $('#MainContent_ddlFormaPago').val(result.split('~')[11]);
                    $('#hfCodCtaCte').val(result.split('~')[24]);
                    $('#MainContent_txtNumero').val(result.split('~')[14]);
                    $('#MainContent_txtSerie').val(result.split('~')[17]);

                    $('#MainContent_txtEmision').val(result.split('~')[15]);
                    $('#MainContent_txtVencimiento').val(result.split('~')[16]);

                    $('#MainContent_ddlCategoria').val(result.split('~')[18]);
                    $('#MainContent_ddlClasificacion').val(result.split('~')[21]);
                    $('#MainContent_txtPeriodo').val(result.split('~')[20]);
                    $('#MainContent_ddlIgv').val(result.split('~')[22]);

                    $('#MainContent_chkPercepcion').prop('checked', false);
                    if (result.split('~')[19] == '1')
                        $('#MainContent_chkPercepcion').prop('checked', true);

                    if (result.split('~')[34] == '0') {
                        $('#MainContent_chkConIgvMaestro').prop('checked', false);
                        $('#MainContent_chkSinIgvMaestro').prop('checked', true);                    
                    }
                    else
                    {
                        $('#MainContent_chkConIgvMaestro').prop('checked', true);
                        $('#MainContent_chkSinIgvMaestro').prop('checked', false);    
                    }

                    $('#hfCodDireccion').val(result.split('~')[26]);
                    $('#hfCodDepartamento').val(result.split('~')[27]);
                    $('#hfCodProvincia').val(result.split('~')[28]);
                    $('#hfCodDistrito').val(result.split('~')[29]);
                    $('#hfDistrito').val(result.split('~')[30]);
                    $('#MainContent_txtDistrito').val(result.split('~')[30]);
                    $('#hfFlagReemplazotmp').val(result.split('~')[26]);
                    $('#MainContent_txtGuia').val(result.split('~')[31]);

                    if (result.split('~')[33] == '1')
                        $('#MainContent_chkCosteable').prop('checked', true);
                    else
                        $('#MainContent_chkCosteable').prop('checked', false);

                    F_BuscarDireccionesCliente();
                
                    $('.ccsestilo').css('background', '#FFFFE0');
                    $("#divTabs").tabs("option", "active", $("#liRegistro").index());
                }
                else {
                    alert(result.split('~')[1]);
                    return false;
                }
                return false;
            });
        }
        catch (e) {
            MostrarEspera(false);
            alert("Error Detectado: " + e);
            return false;
        }
    }

function F_ImprimirFacturaPDF(Fila) {

 
        var imgID = Fila.id;
        var CodNotaIngreso = $("#" + Fila.id.replace("imgPdf", "lblCodigo")).val();
        var rptURL = '';
        var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
        var TipoArchivo = 'application/pdf';
        var CodMenu = '3000';
        var NombreArchivo = 'rptOrdenDeCompra.rpt';
        var NombreTabla = 'Electronica';

        rptURL = '../Reportes/Crystal.aspx';
        rptURL = rptURL + '?';
        rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
        rptURL = rptURL + 'Codigo=' + CodNotaIngreso + '&';
        rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
        rptURL = rptURL + 'NombreArchivo2=' + NombreArchivo + '&';
        rptURL = rptURL + 'NombreTabla=' + NombreTabla + '&';

        window.open(rptURL, "PopUpRpt", Params);

    return false;
}


function F_ExcelOrdenCompra(Fila) {
    var Cuerpo = '#MainContent_';
    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodMenu = 6;
    var NombreArchivo = 'Xls_Orden_Compra.xlsx';
    var NombreHoja = 'Compra';
    var CodNotaIngreso = $("#" + Fila.id.replace("imgExcel", "lblCodigo")).val();

    rptURL = '../Reportes/Excel.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'Codigo=' + CodNotaIngreso + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'NombreArchivo=' + NombreArchivo + '&';
    rptURL = rptURL + 'NombreHoja=' + NombreHoja + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_ValidaRucDni() {
if (!F_SesionRedireccionar(AppSession)) return false;
    if ($('#MainContent_txtNroRuc').val().length > 0)
    {
        if ($('#MainContent_txtNroRuc').val().trim() === $('#hfNroRuc').val().trim() & 
            $('#MainContent_txtProveedor').val().trim() === $('#hfCliente').val().trim() & 
            $('#MainContent_txtNroRuc').val().trim() != "")
        return false;

    var Index= $('#MainContent_txtNroRuc').val().indexOf('-');
    var Cliente = $('#MainContent_txtNroRuc').val();

    if ( Index ==-1 ) {} else {
    $('#MainContent_txtNroRuc').val(Cliente.split('-')[0].trim());
    }

//        $('#MainContent_txtProveedor').val('');
//        $('#hfCliente').val('');

        //DNI
        if ($('#MainContent_txtNroRuc').val().length == 8)
        {
            var NroRuc = $('#MainContent_txtNroRuc').val();
            F_BuscarDatosPorRucDni($('#MainContent_txtNroRuc').val());
            return true;
        }
        else
        {
            //RUC
            if ($('#MainContent_txtNroRuc').val().length == 11 & $('#MainContent_txtNroRuc').val() != '55555555555')
            {
                $('#MainContent_txtProveedor').focus();
                F_BuscarPadronSunat();
                return true;
            }
            else
            {
                //CLIENTE VARIOS
                if ($('#MainContent_txtNroRuc').val() == '1')
                {
                    $('#MainContent_txtNroRuc').val('11111111111');
                    $('#hfNroRuc').val($('#MainContent_txtNroRuc').val());
                    F_BuscarDatosPorRucDni('11111111111');
                    return true;
                }
                else if ($('#MainContent_txtNroRuc').val() === '55555555555') {
                    return true;
                }
                else
                {
//                    if ( Index ==-1 ) {} else {
                    alertify.log('NRO. RUC/DNI INVALIDO'); 
                    $('#MainContent_txtNroRuc').val('');
                    F_LimpiarCamposDatos();
                    $('#MainContent_txtNroRuc').focus();
//                    }
                    return true;
                }
            }
        }
    }
    else
    {
        if ($('#MainContent_txtNroRuc').val() != $('#hfNroRuc').val())
        {
            F_LimpiarCamposDatos();
            return true;
        }
    }
   return false;
}
// cambio joel 210821
//aca busca si es un nuevo numero de dni o ruc
var API = ""
var ubigeo="";
var ConsultandoPadron = false;
function F_BuscarPadronSunat() {
if (ConsultandoPadron == true)
        return true;

    ConsultandoPadron = true;
        $('#td_loading').css('display', 'block');
        var NroRuc = $('#MainContent_txtNroRuc').val();
        F_LimpiarCampos();
        $('#MainContent_txtNroRuc').val(NroRuc);
         if (API == "") {
         $('#hfCodDepartamento').val("");
         $('#hfCodProvincia').val("");
         $('#hfCodDistrito').val("");
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_TCCuentaCorriente_PadronSunat',
                data: "{'NroRuc':'" + $('#MainContent_txtNroRuc').val() +"','CodTipoCtaCte':'2'}",
                dataType: "json",
                async: true,
                success: function (dbObject) {
                ConsultandoPadron = false;
                var data = dbObject.d;
                try {
                // condiciona joel:si en la base de datos no se encuentra ninguna condicion de ruc se manda para la apisunat
                    if (data.length > 0) {
                    $('#td_loading').css('display', 'none');   
                    if (data.length == 0) {
                        alertify.log('NO SE ENCONTRO EL RUC EN LA BASE DE DATOS');

                        var NroRuc = $('#MainContent_txtNroRuc').val();
                        F_LimpiarCamposDatos();
                        $('#MainContent_txtNroRuc').val(NroRuc);
                        $("#hfCodCtaCte").val('0');
                        $('#MainContent_txtProveedor').prop('disabled', false);
                        if ($('#MainContent_txtProveedor').val().trim() === '')
                            $('#MainContent_txtProveedor').val('--NUEVO PROVEEDOR--');
                        $('#MainContent_txtProveedor').select();
                        ConsultarPadron = false;
                        return true;                    
                    }
                    else if (data[0].split(',')[0] === "-1")
                    {
                        alertify.log('PROBLEMA DE COMUNICACION CON EL SERVICIO DE PADRON SUNAT, SE DESHABILITARA TEMPORALMENTE LA CONSULTA. PUEDE INTERSAR EL NUEVO PROVEEDOR MANUALMENTE.');

                        var NroRuc = $('#MainContent_txtNroRuc').val();
                        F_LimpiarCamposDatos();
                        $('#MainContent_txtNroRuc').val(NroRuc);
                        $("#hfCodCtaCte").val('0');
                        $('#MainContent_txtProveedor').prop('disabled', false);
                        if ($('#MainContent_txtProveedor').val().trim() === '')
                            $('#MainContent_txtProveedor').val('--ERROR DE CONEXION--');
                        $('#MainContent_txtProveedor').select();
                        ConsultarPadron = false;
                        return true;
                    }
                    else {
                    $('#hfCodCtaCte').val(data[0].split(',')[0]); 
                    $('#hfCliente').val(data[0].split(',')[1]); //razon social
                    $('#MainContent_txtNroRuc').val(data[0].split(',')[8]);
                    $('#hfNroRuc').val(data[0].split(',')[8]);
                    $('#MainContent_txtProveedor').val(data[0].split(',')[1]);
                    $('#hfCliente').val(data[0].split(',')[1]);
                    $('#MainContent_txtDireccion').val(data[0].split(',')[2]);
                    $('#MainContent_txtDestino').val(data[0].split(',')[2]);
                    $('#MainContent_txtDistrito').val(data[0].split(',')[4]);
                    $('#hfCodDireccion').val('0');
                    $('#hfCodDepartamento').val(data[0].split(',')[5]);
                    $('#hfCodProvincia').val(data[0].split(',')[6]);
                    $('#hfCodDistrito').val(data[0].split(',')[7]);
                    $('#hfDistrito').val(data[0].split(',')[4]);

                    F_BuscarDireccionPorDefecto();
                    $('#MainContent_txtDistrito').select();

                    }
                 }else{
                     API = "Usuario No Encontrado";
                        console.log(API);
                        F_API_RUC_Buscar();
                        F_BuscarPadronSunat();
                       
                    }
                }
                catch (x) { alertify.log(x); }
                MostrarEspera(false);
            },
                error: function (response) {
                    alertify.log(response.responseText);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                }
            });

}; 
  if (API == "Usuario No Encontrado") {
        //api sunat 
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url:  $('#hfurlapisunat').val() + $('#MainContent_txtNroRuc').val() + $('#hftokenapisunat').val(),
            dataType: "json",
            async: true,
            success: function (dbObject) {
                MostrarEspera(true);
                var data = dbObject.d;                                
                try {
                API = "";
                $('#td_loading').css('display', 'none');
                    $('#MainContent_txtProveedor').val(dbObject.razonSocial); //razon social
                    $('#MainContent_txtNombreComercial').val(dbObject.razonSocial); //razon social
                    ubigeo=dbObject.ubigeo;
                    if (ubigeo==null){
                     alertify.log("La sunat no ofrece direccion ni distrito para los ruc 10,debe colocarlo usted mismo.");
                     }
                    var direccion = dbObject.direccion;
                    var distrito = dbObject.departamento + ' ' + dbObject.provincia + ' ' + dbObject.distrito;
                    $('#MainContent_txtDireccion').val(direccion.replace(distrito, ""));
                     $('#MainContent_txtDestino').val(direccion.replace(distrito, ""));
                    $('#MainContent_txtDireccionEnvio').val(direccion.replace(distrito, ""));
                    $('#MainContent_txtDistrito').val(distrito);
                    $('#hfDistrito').val(distrito);
                    $('#hfNroRuc').val(dbObject.ruc);
                   $('#hfCliente').val(dbObject.razonSocial);
//                    $('#hfUbigeo').val(dbObject.ubigeo);
                    ConsultandoPadron = false;
                    F_BuscarDireccionNuevo();
                }
                catch (x) { }
                MostrarEspera(false);
            },
            error: function (response) {
             if(response.responseText!=''){
                alertify.log(response.responseText);
                }else{
                alertify.log('Verificar conexión');
                $('#td_loading').css('display', 'none');
                }

            },
            failure: function (response) {
                alertify.log(response.responseText);
            }
        });
    }

return true;
}

function F_BuscarDatosPorRucDni(RucDni) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_BuscarDatosPorRucDni',
                data: "{'NroRuc':'" + RucDni +"'}",
                dataType: "json",
                async: false,
                success: function (dbObject) {
                var data = dbObject.d;
                if (data.length > 0)
                {
                    try {
                            $('#hfCodCtaCte').val(data[0].split(',')[0]); 
                            $('#MainContent_txtProveedor').val(data[0].split(',')[1]);
                            $('#hfCliente').val($('#MainContent_txtProveedor').val()); //razon social
                            $('#MainContent_txtNroRuc').val(data[0].split(',')[8]);
                            $('#hfNroRuc').val(data[0].split(',')[8]);
                            $('#MainContent_txtDireccion').val(data[0].split(',')[2]);
                            $('#MainContent_txtDestino').val(data[0].split(',')[2]);
                            $('#MainContent_txtDistrito').val(data[0].split(',')[4]);
                            $('#hfCodDireccion').val('0');
                            $('#hfCodDepartamento').val(data[0].split(',')[5]);
                            $('#hfCodProvincia').val(data[0].split(',')[6]);
                            $('#hfCodDistrito').val(data[0].split(',')[7]);
                            $('#hfDistrito').val(data[0].split(',')[4]);
                            F_BuscarDireccionPorDefecto(); 
                            return true;
                    }
                    catch (x) { alertify.log(x); }
                }
                else
                {
                    var NroRuc = $('#MainContent_txtNroRuc').val();
                    F_LimpiarCamposDatos();
                    $('#MainContent_txtNroRuc').val(NroRuc);
                    if ($('#MainContent_txtNroRuc').val().length == 8)
                    {
                            $("#hfCodCtaCte").val('0');
                            if ($('#MainContent_txtNroRuc').val() != '11111111111') {
                                    $('#MainContent_txtProveedor').val('---NUEVO CLIENTE---');
                                    $('#MainContent_txtProveedor').prop('disabled', false);
                                }


                            $('#MainContent_txtProveedor').select();
                    }
                    return false;
                }



            },


                error: function (response) {
                    alertify.log(response.responseText);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                }
            });



return true;
}

function F_BuscarDireccionesCliente() {
if (!F_SesionRedireccionar(AppSession)) return false;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '../Servicios/Servicios.asmx/F_TCDireccion_ListarXCodDistritoCliente_AutoComplete',
        data: "{'Direccion':'','CodDepartamento':'" + $('#hfCodDepartamento').val() + "','CodProvincia':'" + $('#hfCodProvincia').val() + "','CodDistrito':'" + $('#hfCodDistrito').val() + "','CodCtaCte':'" + $('#hfCodCtaCte').val() + "'}",
        dataType: "json",
        async: false,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                var count = 0;
                $('#MainContent_ddlDireccion').empty();
                $.each(data.rows, function (index, item) {
                    $('#MainContent_ddlDireccion').append($("<option></option>").val(item.CodDireccion).html(item.Direccion));
                    if (count === 0)
                    {
                        $('#MainContent_txtDireccion').val(item.Direccion);
                        $('#hfDireccion').val(item.Direccion);
                        $('#hfCodDireccion').val(item.CodDireccion);
                    }
                    if (Number($('#hfFlagReemplazotmp').val()) != 0 & Number($('#hfFlagReemplazotmp').val()) === Number(item.CodDireccion))
                    {
                        $('#hfFlagReemplazotmp').val('0');
                        $('#MainContent_txtDireccion').val(item.Direccion);
                        $('#hfDireccion').val(item.Direccion);
                        $('#hfCodDireccion').val(item.CodDireccion);
                    }
                    count++;
                });
            }
            catch (x) { alertify.log('El Producto no tiene Imagenes'); }
            MostrarEspera(false);
        },
        complete: function () {
            if (($('#hfCodDireccion').val() == '' | $('#hfCodDireccion').val() == '0') && $('#hfCodCtaCte').val() != 0)
            {
                alertify.log('NO HAY DIRECCION PARA EL DISTRITO ESPECIFICADO')
                $('#MainContent_txtDireccion').val('');
                $('#hfDireccion').val('');
                $('#hfCodDireccion').val('0');
                $('#MainContent_txtCorreo').val('');
            }

        },
        error: function (response) {
            alertify.log(response.responseText);
        },
        failure: function (response) {
            alertify.log(response.responseText);
        }
    });

    return false;
}

function F_BuscarDistrito() {
if (!F_SesionRedireccionar(AppSession)) return false;
//    $('#hfCodDireccion').val('0');
//    $('#MainContent_txtDireccion').val('');
//    $('#hfDireccion').val('');
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '../Servicios/Servicios.asmx/F_TCDistrito_ListarXCodDistrito',
        //data: "{'Direccion':'','CodDepartamento':'" + $('#hfCodDepartamento').val() + "','CodProvincia':'" + $('#hfCodProvincia').val() + "','CodDistrito':'" + $('#hfCodDistrito').val() + "','CodCtaCte':'" + $('#hfCodCtaCte').val() + "'}",
        data: "{'CodDistrito':'" + $('#hfCodDistrito').val() + "'}",
        dataType: "json",
        async: false,
        success: function (data) {
                if (data.d.length >= 1)
                {
                    $('#MainContent_txtDistrito').val(data.d[0].split(',')[3]);
                }
        },
        complete: function () {
        },
        error: function (response) {
            alertify.log(response.responseText);
        },
        failure: function (response) {
            alertify.log(response.responseText);
        }
    });

    return false;
}

function F_BuscarDireccionPorDefecto() {
//    $('#hfCodDireccion').val('0');
//    $('#MainContent_txtDireccion').val('');
//    $('#hfDireccion').val('');
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '../Servicios/Servicios.asmx/F_TCDireccion_ListarXCodDistrito_AutoComplete',
        data: "{'Direccion':'','CodDepartamento':'" + $('#hfCodDepartamento').val() + "','CodProvincia':'" + $('#hfCodProvincia').val() + "','CodDistrito':'" + $('#hfCodDistrito').val() + "','CodCtaCte':'" + $('#hfCodCtaCte').val() + "'}",
        dataType: "json",
        async: false,
        success: function (data) {
                if (data.d.length >= 1)
                {
                    $('#hfCodDireccion').val(data.d[0].split(',')[0]);
                    $('#MainContent_txtDireccion').val(data.d[0].split(',')[1]);
                    $('#hfDireccion').val(data.d[0].split(',')[1]);
                    $('#MainContent_txtCorreo').val(data.d[0].split(',')[5]);
                    if ($('#hfCodCtaCte').val() == 29)
                    {
                        $('#hfCodDistrito').val(data.d[0].split(',')[2]);
                        $('#hfCodProvincia').val(data.d[0].split(',')[3]);
                        $('#hfCodDepartamento').val(data.d[0].split(',')[4]);
                    }
                }
        },
        complete: function () {
            if (($('#hfCodDireccion').val() == '' | $('#hfCodDireccion').val() == '0') && $('#hfCodCtaCte').val() != 0)
            {
                alertify.log('NO HAY DIRECCION PARA EL DISTRITO ESPECIFICADO')
                $('#MainContent_txtDireccion').val('');
                $('#hfDireccion').val('');
                $('#hfCodDireccion').val('0');
                $('#MainContent_txtCorreo').val('');
            }

        },
        error: function (response) {
            alertify.log(response.responseText);
        },
        failure: function (response) {
            alertify.log(response.responseText);
        }
    });

    return false;
}

function F_LimpiarCamposDatos() {
    //Bloqueo de campos
    $('#MainContent_txtProveedor').prop('disabled', true);
            
    //Valores por Defecto
    $('#hfCodCtaCte').val(0);
    $('#MainContent_txtNroRuc').val('');
    $('#hfNroRuc').val('');
    $('#MainContent_txtProveedor').val('');
    $('#hfCliente').val('');
    $('#MainContent_txtDireccion').val('');
    $('#MainContent_txtDistrito').val('');
    $('#hfCodDireccion').val(0);
    $('#hfCodDepartamento').val(0);
    $('#hfCodProvincia').val(0);
    $('#hfCodDistrito').val(0);
    $('#hfDistrito').val('');
    $('#hfDireccion').val('');
    $('#MainContent_txtNroRuc').focus();
    
    
    return true;
}

function F_LimpiarCampos() {
    //Bloqueo de campos
    $('#MainContent_txtProveedor').prop('disabled', true);
            
    //Valores por Defecto
    $('#hfCodCtaCte').val(0);
    $('#MainContent_txtNroRuc').val('');
    $('#hfNroRuc').val('');
    $('#MainContent_txtProveedor').val('');
    $('#hfCliente').val('');
    $('#MainContent_txtDireccion').val('');
    $('#MainContent_txtDistrito').val('');
    $('#hfCodDireccion').val(0);
    $('#hfCodDepartamento').val(0);
    $('#hfCodProvincia').val(0);
    $('#hfCodDistrito').val(0);
    $('#hfDistrito').val('');
    $('#hfDireccion').val('');
    F_Update_Division_HTML('div_grvConsultaArticulo', GridArticulosInicializado);
    F_Update_Division_HTML('div_grvDetalleArticulo',  GridDetalleDocumento);
    $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblProducto"));
    $('#MainContent_txtNroRuc').focus();
    
    
    return true;
}

function esnumero(campo) { return (!(isNaN(campo))); }

function ValidarRuc(valor) {
    valor = trim(valor)
    if (esnumero(valor)) {
        if (valor.length < 11) {
            if (valor.length == 8)
                return true;
        } else if (valor.length == 11) {
            suma = 0
            x = 6
            for (i = 0; i < valor.length - 1; i++) {
                if (i == 4) x = 8
                digito = valor.charAt(i) - '0';
                x--
                if (i == 0) suma += (digito * x)
                else suma += (digito * x)
            }
            resto = suma % 11;
            resto = 11 - resto

            if (resto >= 10) resto = resto - 10;
            if (resto == valor.charAt(valor.length - 1) - '0') {
                return true
            }
        }
    }
    return false
}

function F_FacturacionVentas() {
    var Contenedor = '#MainContent_';
    var Mensaje = "Ingrese los sgtes datos:";

    if ($(Contenedor + 'ddlTipoDocVentas').val() ==null)
        Mensaje = Mensaje + "<p></p>" + "Tipo Doc";

    if ($(Contenedor + 'ddlSerieDocVentas').val() ==null)
        Mensaje = Mensaje + "<p></p>" + "Serie";

    if ($(Contenedor + 'chkNumeroVentas').is(':checked') && $.trim($('#MainContent_txtNumeroDocVentas').val())=='') {
        Mensaje = Mensaje + "<p></p>" + "Numero";
    }     

    if (Mensaje != "Ingrese los sgtes datos:") {
        alertify.log(Mensaje);
        return false;
    }

    var chkNumero='0';
    var chkFecha='0';
    
    if ($(Contenedor + 'chkNumeroVentas').is(':checked'))
        chkNumero='1';
    
    if ($(Contenedor + 'chkFechaVentas').is(':checked'))
        chkFecha='1';
    
    try {
        var objParams = {
            Filtro_CodTipoDoc:  $(Contenedor + 'ddlTipoDocVentas').val(),
            Filtro_SerieDoc:    $("#MainContent_ddlSerieDocVentas option:selected").text(),
            Filtro_Numero:      $(Contenedor + 'txtNumeroDocVentas').val(),
            Filtro_Desde:       $(Contenedor + 'txtDesdeVentas').val(),
            Filtro_Hasta:       $(Contenedor + 'txtHastaVentas').val(),
            Filtro_ChkNumero:   chkNumero,
            Filtro_ChkFecha:    chkFecha,
            Filtro_CodVendedor: $(Contenedor + 'ddlEmpleadoConsulta').val()          
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_Ventas_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                F_Update_Division_HTML('div_Ventas', result.split('~')[2]);
                $('.ccsestilo').css('background', '#FFFFE0');
                return false;
            }
            else
                alertify.log(result.split('~')[1]);
            return false;
        });
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_ValidarVentas() {
    if (!F_ValidarAgregarVentas())
    return false;
          
    F_AgregarTemporalVentas();
    F_LimpiarGrillaConsultaVentas();
      
    return false;
}

function F_ValidarAgregarVentas() {
    try {
        var cadena = "Ingrese los sgtes. campos: ";
        var chkSi = '';
        var lblCodigo = '';
        var txtCantidadEntregada = '';
        var txtPrecioVenta = '';
        var x = 0;

        $('#MainContent_grvVentas .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;

            txtCantidadEntregada = chkSi.replace('chkEliminar', 'txtCantidadEntregada');
            txtPrecioVenta = chkSi.replace('chkEliminar', 'txtPrecioVenta');
            lblCodigo = chkSi.replace('chkEliminar', 'lblCodigo');

            if ($(chkSi).is(':checked')) {
                if ($(txtCantidadEntregada).val() == '')
                    cadena = cadena + "<p></p>" + "Cantidad para el Codigo " + $(lblCodigo).text();

                if ($(txtPrecioVenta).val() == '')
                    cadena = cadena + "<p></p>" + "Precio para el Codigo " + $(lblCodigo).text();
                x = 1;
            }
        });

        if (x == 0)
            cadena = "No ha seleccionado ningun producto";

        if (cadena != "Ingrese los sgtes. campos: ") {
            alertify.log(cadena);
            return false;
        }
        return true;
    }

    catch (e) {

        alertify.log("Error Detectado: " + e);

    }
}

function F_AgregarTemporalVentas() {
    try {

        var hfCodArticulo = '';
        var lblcodunidadventa_grilla = '';
        var lblcosto_grilla = '';
        var chkSi = '';
        var txtcantidad_grilla = '';
        var txtprecio_grilla = '';
        var txtdscto_grilla = '';
        var arrDetalle = new Array();
        var hfCodUndMedida = '';
        var hfcosto_grilla = '';
        var lblProducto = '';
        var hfFechaAnexo = '';
        var Contenedor = '#MainContent_';
        var tasaigv =1;
        var hfCodTipoDoc = '';
        if ($('#MainContent_chkConIgvMaestro').is(':checked'))
             tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);      

        $('#MainContent_grvVentas .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;
            hfCodArticulo = chkSi.replace('chkEliminar', 'hfCodArticulo');
            hfCodUndMedida = chkSi.replace('chkEliminar', 'hfCodUndMedida');           
            txtCantidadEntregada = chkSi.replace('chkEliminar', 'txtCantidadEntregada');
            hfcodunidadventa_grilla = chkSi.replace('chkEliminar', 'hfCodUndMedida');
            txtPrecioVenta = chkSi.replace('chkEliminar', 'txtPrecioVenta');
            hfCodDetalle = chkSi.replace('chkEliminar', 'hfCodDetalle');
            hfCostoUnitario = chkSi.replace('chkEliminar', 'hfCostoUnitario');
            lblNumero = chkSi.replace('chkEliminar', 'lblNumero');
            lblProducto = chkSi.replace('chkEliminar', 'lblProducto');
            hfFechaAnexo = chkSi.replace('chkEliminar', 'hfFechaAnexo');
            hfCodTipoDoc = chkSi.replace('chkEliminar', 'hfCodTipoDoc');

            if ($(chkSi).is(':checked')) {
                var objDetalle = {
                    CodArticulo: $(hfCodArticulo).val(),
                    Cantidad: $(txtCantidadEntregada).val(),
                    Precio: (parseFloat($(txtPrecioVenta).val()))  / parseFloat(tasaigv),
                    PrecioDscto: (parseFloat($(txtPrecioVenta).val()))  / parseFloat(tasaigv) * (1-(parseFloat(0) / 100)),
                    Costo: $(hfCostoUnitario).val(),
                    CodUm: $(hfCodUndMedida).val(),
                    CostoUnitario: $(hfCostoUnitario).val(),
                    Dscto: 0,
                   // CodDetalle: $(hfCodDetalle).val(),
                    CodDetalle: 0,
                    CodDetDocumentoVenta: $(hfCodDetalle).val(),
                    OC: $(lblNumero).text(),
                    Descripcion: $(lblProducto).text().replace("&", "&amp;"),
                    CodTipoDoc: $(hfCodTipoDoc).val(),
                    Acuenta: 0,
                    Fecha: $(hfFechaAnexo).val()
                };

                arrDetalle.push(objDetalle);
            }
        });


        var objParams = {
            Filtro_CodTipoDoc: 5,
            Filtro_SerieDoc: $(Contenedor + 'ddlSerie').val(),
            Filtro_NumeroDoc: $(Contenedor + 'txtNumero').val(),
            Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
            Filtro_Vencimiento: $(Contenedor + 'txtVencimiento').val(),
            Filtro_CodCliente: $('#hfCodCtaCte').val(),
            Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),
            Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
            Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
            Filtro_SubTotal: $(Contenedor + 'txtSubTotal').val(),
            Filtro_CodProforma: "0",
            Filtro_Igv: $(Contenedor + 'txtIgv').val(),
            Filtro_Total: $(Contenedor + 'txtTotal').val(),
            Filtro_CodGuia: "1",
            Filtro_Descuento: "0",
            Filtro_TasaIgv: tasaigv,
            Filtro_TasaIgvDscto:parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1) ,
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
            Filtro_FlagIgv: 1
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_AgregarTemporal_NET(arg, function (result) {
            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {
                $('#hfCodigoTemporal').val(result.split('~')[3]);
                $('#MainContent_txtTotal').val(result.split('~')[5]);
                $('#MainContent_txtMonto').val(result.split('~')[5]);
                $('#MainContent_txtIgv').val(result.split('~')[6]);
                $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                $('#MainContent_txtDsctoTotal').val(result.split('~')[8]);
                $('#hfNotaPedido').val(result.split('~')[9]);
                 if ($('#hfNotaPedido').val() == '5')
                        $('#hfCodCtaCteNP').val($('#hfCodCtaCte').val());
                        else $('#hfCodCtaCteNP').val(0);

                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblProducto"));
                $('.ccsestilo').css('background', '#FFFFE0');
                $('#divFacturacionOC').dialog('close');

                if ($('#MainContent_ddlFormaPago').val() == "1" | $('#MainContent_ddlFormaPago').val() == "6" | $('#MainContent_ddlFormaPago').val() == "15")
                    $('#MainContent_txtAcuenta').val(parseFloat($('#MainContent_txtTotal').val()) - parseFloat($('#MainContent_txtAcuentaNV').val()).toFixed(2));
                
                $('#MainContent_ddlFormaPago').val('11');

                if (result.split('~')[2] == 'Los Producto(s) se han agregado con exito')
                    alertify.log('Los Producto(s) se han agregado con exito');
            }
            else {
                MostrarEspera(false);
                alertify.log(result.split('~')[2]);

            }

            return false;

        });
    }

    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);

    }
}

function F_LimpiarGrillaConsultaVentas() {
    var chkSi = '';
    var txtCantidadEntregada = '';
    var txtPrecioVenta = '';

    $('#MainContent_grvVentas .chkDelete :checkbox').each(function () {
        chkSi = '#' + this.id;
        txtCantidadEntregada = chkSi.replace('chkEliminar', 'txtCantidadEntregada');
        txtPrecioVenta = chkSi.replace('chkEliminar', 'txtPrecioVenta');
       
        $(txtPrecioVenta).prop('disabled', true);
        $(txtCantidadEntregada).prop('disabled', true);
        $(txtPrecioVenta).val('');
        $(txtCantidadEntregada).val('');
        $(chkSi).prop('checked', false);
    });
}

function F_CambioSerie_TipoDoc() {
if (!F_SesionRedireccionar(AppSession)) return false;

    var arg;

    try {
        var objParams =
            {                
                Filtro_CodDoc: $("#MainContent_ddlTipoDocVentas").val()
            };

            
        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_Series_Documentos_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") 
                    {
                        F_Update_Division_HTML('div_SerieDocVentas', result.split('~')[2]);                                 
                        $('#MainContent_ddlSerieDocVentas').css('background', '#FFFFE0');
                        $('.ccsestilo').css('background', '#FFFFE0');                        
                    }
                    else {
                        alertify.log(str_mensaje_operacion);
                    }
                }
            );

    } catch (mierror) {
    MostrarEspera(false);
        alertify.log("Error detectado: " + mierror);

    }

}

function F_Inicializar_Tabla_Almacenes_Stocks() {
        //limpio el div donde se encuentra el table
    var ta = $('#divStocksEmpresas'); ta.empty();
    
    //Table
    var Table = '   <table id="tbStocksAlmacenes" Class="GridView"> <thead> <tr> <th style="width:180px"> otros almacenes </th> <th style="width:25px"> Stock </th> </tr> </thead> ' +
		        '   <tbody> @Body </tbody> </table> ';

    var Row =   '   <tr id="@ID" class="td-tdsel"> ' +
				'       <td> @Almacen </td>' + 
				'       <td id="@Clave" align="right"> @Cuanto </td> ' +
			    '   </tr> ';
    var Cuerpo = '';
    
    var Count = 0;
    $.ajax({
        async: true,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'RegistroFacturaCompraNuevo.aspx/F_Inicializar_Tabla_Almacenes_Stocks_NET',
        dataType: "json",
        //data: JSON.stringify({ 'CodAlterno': objParams }),
        success: function (dbObject) {
            MostrarEspera(true);
            var data = dbObject.d;
            try {
                $.each(data.rows, function (index, item) {
                    Cuerpo += Row.replace("@Almacen", item.Empresa + ' - ' + item.DscAlmacen)
                                    .replace("@Clave", "td" + item.Clave).replace("@ID", "tr" + item.Clave)
                                    .replace("@Cuanto", 0);
                    Count++;
                });

                Table = Table.replace('@Body', Cuerpo);
                //var ta = $('#divProductosRelacionadosListado'); ta.empty();
                ta.append(Table);

//                $('.cssimgAlmacen').each(function() {
//                    $(this).css('display', 'none');
//                });

            }
            catch (x) { alertify.log('El Producto no tiene Imagenes'); }
            MostrarEspera(false);
        },
        error: function (xhr, ajaxOptions, thrownError) {

        },
        async: true
    });

return true;
}

function F_Consultar_Almacenes_Stocks(CodigoProducto) {
    var Marca = $("#" + CodigoProducto.replace("imgAgregar", "hfMarca")).val();
    var CodProductoAzure = $("#" + CodigoProducto.replace("imgAgregar", "hfCodProductoAzure")).val();
    var CodigoInterno = $("#" + CodigoProducto.replace("imgAgregar", "hfCodigoInterno")).val();


    $('#tbStocksAlmacenes .td-tdsel').each(function () {
        trControl = this.id; var len = trControl.length; var tdControl = "#td" + trControl.substring(2, len);
        $(tdControl).text("");
        $(tdControl).append('<img class="cssimgAlmacen" style="width:8px" src="../Asset/images/loading.gif" />');
        
    });

//    $('.cssimgAlmacen').each(function() {
//        $(this).css('display', 'block');
//    });
//    
    F_Consulta_Stock(CodProductoAzure, CodigoInterno);

    return true;

return true;
}

function F_Consulta_Stock(CodigoProducto, CodigoInterno) {

        if (CodigoProducto == "")
            CodigoProducto = 0;

        $.ajax({
            async: true,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            url: '../Servicios/Servicios.asmx/F_Consulta_Stock_Azure_NET',
            dataType: "json",
            data: "{'CodProductoAzure':'" + CodigoProducto + "','CodigoInterno':'" + CodigoInterno + "'}",
            success: function (dbObject) {
                MostrarEspera(true);
                var data = dbObject.d;
                try {
                    $('.cssimgAlmacen').each(function () {
                        $(this).css('display', 'none');
                    });
                    $.each(data.rows, function (index, item) {

                        if (item.ConsultadoSN === '0')
                            $('#td' + item.Clave).text('N/A');
                        else
                            $('#td' + item.Clave).text(item.Stock);
                    });
                }
                catch (x) { alertify.log('El Producto no tiene Imagenes'); }
                MostrarEspera(false);
            },
            complete: function () {

            },
            error: function (xhr, ajaxOptions, thrownError) {

            },
            async: true
        });
        return true;
    }
    
function F_Stock(Control) {
    Ctlgv = Control;
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {

        var grid = $(Control).next();
        F_StockAlmacenes(grid.attr('id'));
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }
    return false;
}

function F_StockAlmacenes(Fila){
  try 
        {             
                var nmrow = 'MainContent_grvConsultaArticulo_pnlOrdersKardex_0';
                var Col = Fila.split('_')[3];
                var CodProducto = $('#' + Fila.replace('pnlOrdersKardex', 'lblcodproducto')).val();      
                var grvNombre = 'MainContent_grvConsultaArticulo_grvDetalleKardex_' + Col;
                Hfgv = '#' + Fila.replace('pnlOrders', 'hfDetalleCargado');

                if ($(Hfgv).val() === "1")
                {
                    $(Ctlgv).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Ctlgv).next().html() + '</td></tr>');
                    $(Ctlgv).attr('src', '../Asset/images/minus.gif');
                }
                else 
                {                                                                                                                                                                                                                        {
                        var objParams = 
                        {                          
                            Filtro_CodProducto: CodProducto,
                             Filtro_grvNombre: grvNombre                       
                        };

                        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                        //MostrarEspera(true);
                        $(Ctlgv).attr('src', '../Asset/images/loading.gif');
                        F_StockAlmacenes_NET(arg, function (result) {
                
                        $(Ctlgv).attr('src', '../Asset/images/minus.gif');
                        //MostrarEspera(false);

                        var str_resultado_operacion = result.split('~')[0];
                        var str_mensaje_operacion = result.split('~')[1];

                        if (str_resultado_operacion === "0")
                        {
                            var p = $('#' + result.split('~')[3]).parent();
                            $(p).attr('id', result.split('~')[3].replace('MainContent', 'div')); $(p).empty();

                            F_Update_Division_HTML($(p).attr('id'), result.split('~')[2]);

                            $(Ctlgv).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Ctlgv).next().html() + '</td></tr>');
                            $(Hfgv).val('1');
                        }
                        else
                        {
                            alertify.log(str_mensaje_operacion);
                        }
                        return false;
                        });        
                }
                }
        }
        catch (e) 
        {
              MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }

        return true;
}

//Joel
//api sunat
//esta funcion buscar la direccion con el ubigeo que se consigue con el api,esta funcion se encuentra en servicios
function F_BuscarDireccionNuevo() {
    if (!F_SesionRedireccionar(AppSession)) return false;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '../Servicios/Servicios.asmx/F_Direccion_Buscar', 
        data: "{'Ubigeo':'" + ubigeo + "'}",
        dataType: "json",
        async: false,
        success: function (dbObject) {
            var data = dbObject.d;
            $('#hfCodDepartamento').val(data[0].split(',')[0]);
            $('#hfCodProvincia').val(data[0].split(',')[1]);
            $('#hfCodDistrito').val(data[0].split(',')[2]);
            return true;

        },
        complete: function () {
            if (($('#hfRegion').val() == '' | $('#hfProvincia').val() == '') && $('#hfDistrito').val() == '') {
                toastr.warning('NO HAY DIRECCION PARA EL DISTRITO ESPECIFICADO')
                $('#MainContent_txtDireccion').val('');
                $('#hfDireccion').val('');
                $('#hfCodDireccion').val('0');
                $('#MainContent_txtCorreo').val('');
            }

        },
        error: function (response) {
            toastr.warning(response.responseText);
        },
        failure: function (response) {
            toastr.warning(response.responseText);
        }
    });

    return false;
}
// esta funcion se encarga de busca la url y el token del api para la busque en la parte de padronsunat
function F_API_RUC_Buscar() {
    if (!F_SesionRedireccionar(AppSession)) return false;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '../Servicios/Servicios.asmx/F_API_RUC_Buscar',
        data: "{}",
        dataType: "json",
        async: false,
        success: function (dbObject) {
            var data = dbObject.d;
            $('#hfurlapisunat').val(data[0].split(',')[0]);
            $('#hftokenapisunat').val(data[0].split(',')[1]);
            
            return true;

        },
        complete: function () {
         
        },
        error: function (response) {
            toastr.warning(response.responseText);
        },
        failure: function (response) {
            toastr.warning(response.responseText);
        }
    });

    return false;
}
//limpia los campos
function F_LimpiarCampos() {
    if (!F_SesionRedireccionar(AppSession)) return false;

    $('#MainContent_txtCliente').val('');
    $('#MainContent_txtDistrito').val('');
    $('#MainContent_txtDireccion').val('');
    $('#MainContent_txtDistrito').val('');
    $('#MainContent_txtNombreComercial').val('');

    $('#hfRegion').val('0');
    $('#hfProvincia').val('0');
    $('#hfDistrito').val('0');

//    $('#hftokenapisunat').val('');
//    $('#hfurlapisunat').val('');
    

    return true;
}

//FINAL

function F_AnularPopUP(Fila) {
    if (!F_SesionRedireccionar(AppSession)) return false;
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Anular') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
   var imgID = Fila.id;
    var lblCodigo = '#' + imgID.replace('imgAnularDocumento', 'lblCodigo');
    var lblEstado = '#' + imgID.replace('imgAnularDocumento', 'lblEstado');
    var lblNumero = '#' + imgID.replace('imgAnularDocumento', 'lblNumero');
    var lblcliente_grilla = '#' + imgID.replace('imgAnularDocumento', 'lblcliente');
  
    if ($(lblEstado).text()=="CANCELADO TOTAL") 
    {alertify.log ("ESTA ORDEN DE COMPRA SE ENCUENTRA CANCELADA; PRIMERO ELIMINE EL PAGO Y LUEGO ELIMINE LA FACTURA");
    return false;}

      if ($(lblEstado).text()=="FACTURADO") 
    {alertify.log ("ESTA ORDEN DE COMPRA SE ENCUENTRA FACTURADA; ELIMINE LA FACTURA");
    return false;}

        if ($(lblEstado).text()=="ANULADO") 
    {alertify.log ("ESTA ORDEN DE COMPRA SE ENCUENTRA ANULADA");
    return false;}

//    if(!confirm("ESTA SEGURO DE ANULAR LA ORDEN DE COMPRA : " + $(lblNumero).text() + "\n" + "DEL PROVEEDOR : " +  $(lblcliente_grilla).text()))
//    return false;

    $('#hfEstado').text($(lblEstado).text());
    $('#hfNumero').val($(lblNumero).text());
    $('#hfcliente_grilla').val($(lblcliente_grilla).text());
    $('#MainContent_txtObservacionAnulacion').val('');
    $('#hfCodigo').val($(lblCodigo).val());
     $('#lblfactanu').text($(lblNumero).text());
    $('#div_Anulacion').dialog({
        resizable: false,
        modal: true,
        title: "Anulacion de Orden de Compra",
        title_html: true,
        height: 210,
        width: 470,
        autoOpen: false
    });
    $('#div_Anulacion').dialog('open');
}
// DETALLE OBSERVACION
var CtlgvAuditoria;
var HfgvAuditoria;
function imgMasAuditoria_Click(Control) {
    CtlgvAuditoria = Control;
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {
        var grid = $(Control).next();
        F_Auditoria(grid.attr('id'));        
        $(Control).attr('src', '../Asset/images/minus.gif');
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }
    return false;
}

function F_Auditoria(Fila) {
    try {
        var Col = Fila.split('_')[3];
        var Codigo = $('#' + Fila.replace('pnlOrdersAuditoria', 'lblCodigo')).val();
        var grvNombre = 'MainContent_grvConsulta_grvDetalleAuditoria_' + Col;
        HfgvAuditoria = '#' + Fila.replace('pnlOrdersAuditoria', 'hfDetalleCargadoAuditoria');

        if ($(HfgvAuditoria).val() === "1") {
                    $(CtlgvAuditoria).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvAuditoria).next().html() + '</td></tr>');
                    $(CtlgvAuditoria).attr('src', '../Asset/images/minus.gif');
        }
        else {
            {
                var objParams =
                        {
                            Filtro_Col: Col,
                            Filtro_Codigo: Codigo,                           
                            Filtro_grvNombre: grvNombre
                        };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                //MostrarEspera(true);
                $(CtlgvAuditoria).attr('src', '../Asset/images/loading.gif');
                F_Auditoria_NET(arg, function (result) {
                $(CtlgvAuditoria).attr('src', '../Asset/images/minus.gif');
                    //MostrarEspera(false);

                    var str_resultado_operacion = result.split('~')[0];
                    var str_mensaje_operacion = result.split('~')[1];

                    if (str_resultado_operacion === "0") {
                        var p = $('#' + result.split('~')[3]).parent();
                        $(p).attr('id', result.split('~')[3].replace('MainContent', 'div')); $(p).empty();

                        F_Update_Division_HTML($(p).attr('id'), result.split('~')[2]);

                        $(CtlgvAuditoria).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvAuditoria).next().html() + '</td></tr>');
                        $(HfgvAuditoria).val('1');
                    }
                    else {
                        toastr.warning(str_mensaje_operacion);
                    }
                    return false;
                });
            }
        }
    }
    catch (e) {
        MostrarEspera(false);
        toastr.warning("ERROR DETECTADO: " + e);
        return false;
    }
    return true;
}

function checkAll(objRef) {
    var checkallid = '#' + objRef.id;

    if ($(checkallid).is(':checked'))
        $('#MainContent_grvDetalleArticulo input:checkbox').prop('checked', true);
    else
        $('#MainContent_grvDetalleArticulo input:checkbox').prop('checked', false);
}

function F_ActualizarCantidadOC(Fila) {
    try {
        var txtCantidad = '#' + Fila;
        var lblCantidad = txtCantidad.replace('txtCantidadEntregada', 'lblCantidad');
     
        if (parseFloat($(txtCantidad).val()) > parseFloat($(lblCantidad).text())) {            
            $(txtCantidad).val(parseFloat($(lblCantidad).text()));
            alertify.log("La cantidad de la compra no puede ser mayor a la cantidad de la venta");
            return false;
        }
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_AgregarTemporalServicio() {
    try { 
        var arrDetalle = new Array();        
        var chkDel = "";
        var txtDescripcion = "";
        var tasaigv = 1;
        var FlagIgv = 0;
   
        var Agregado = false;     
        $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
                chkDel = '#' + this.id;
                txtDescripcion = chkDel.replace('chkEliminar', 'txtDescripcion');
                                    
                if ($(txtDescripcion).val()==$("#MainContent_txtArticuloAgregar").val())
                Agregado = true;
        });

        if (Agregado == true)
        {
            alertify.log('EL PRODUCTO YA SE ENCUENTRA AGREGADO');
            $("#MainContent_txtArticuloAgregar").focus();
            return false;
        }

        if (isNaN($("#MainContent_txtCantidad").val()) == true)
        {
            alertify.log('CANTIDAD NO VALIDA');
            $("#MainContent_txtCantidad").val('1');
            $("#MainContent_txtCantidad").focus();
            return false;
        } 
        if (isNaN($("#MainContent_txtPrecioDisplay").val()) == true)
        {
            alertify.log('PRECIO NO VALIDO');
            $("#MainContent_txtPrecioDisplay").val('0.00');
            $("#MainContent_txtPrecioDisplay").focus();
            return false;        
        } 
        if (Number($("#MainContent_txtCantidad").val()) <= 0)
        {
            alertify.log('CANTIDAD NO VALIDA');
            $("#MainContent_txtCantidad").val('1');
            $("#MainContent_txtCantidad").focus();
            return false;
        } 
        if (Number($("#MainContent_txtPrecioDisplay").val()) <= 0)
        {
            alertify.log('PRECIO NO VALIDO');
            $("#MainContent_txtPrecioDisplay").val('1');
            $("#MainContent_txtPrecioDisplay").focus();
            return false;        
        } 

        //agregado agutierrez
        if ($('#MainContent_chkConIgvMaestro').is(':checked')) {
            tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
            FlagIgv = 1;
        }            

        var objDetalle = {
        CodArticulo: '',
        Cantidad: $("#MainContent_txtCantidad").val(),
        Precio: $("#MainContent_txtPrecioDisplay").val() / tasaigv,
        PrecioDscto: $("#MainContent_txtPrecioDisplay").val() / tasaigv,
        Precio2: 0,
        Exclusivo: 0,
        Costo: 0,
        CodUm: 22,
        Descripcion: $("#MainContent_txtArticuloAgregar").val().toUpperCase(),
        CodDetalle: 0,
        Acuenta: 0,
        CodTipoDoc: 0,
        Filtro_FlagIgv: FlagIgv,
        Filtro_Flag: 0,
        Filtro_TasaIgv: tasaigv,
        Filtro_TasaIgvDscto: parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1)
        };
        arrDetalle.push(objDetalle);

        var Contenedor = '#MainContent_';

        var objParams = {
            Filtro_CodTipoDoc: 1,
            Filtro_SerieDoc: $(Contenedor + 'ddlSerie').val(),
            Filtro_NumeroDoc: $(Contenedor + 'txtNumero').val(),
            Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
            Filtro_Vencimiento: $(Contenedor + 'txtVencimiento').val(),
            Filtro_CodCliente: $(Contenedor + 'hfCodCtaCte').val(),
            Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),
            Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
            Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
            Filtro_SubTotal: $(Contenedor + 'txtSubTotal').val(),
            Filtro_CodProforma: 0,
            Filtro_Igv: $(Contenedor + 'txtIgv').val(),
            Filtro_Total: $(Contenedor + 'txtTotal').val(),
            Filtro_CodGuia: 0,
            Filtro_Descuento: 0,
            Filtro_FlagIgv: FlagIgv,
            Filtro_TasaIgv: tasaigv,
            Filtro_TasaIgvDscto: parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1),
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_Servicio: 1,
            Filtro_NotaPedido: 0,
            Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle)
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_AgregarTemporal_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = result.split('~')[0];
            var str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                $('#hfCodigoTemporal').val(result.split('~')[3]);
                $('#MainContent_txtTotal').val(result.split('~')[5]);
                $('#MainContent_txtIgv').val(result.split('~')[6]);
                $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);               
                $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblProducto"));               
                $('.ccsestilo').css('background', '#FFFFE0');
                F_LimpiarGrillaConsulta();
                if (result.split('~')[2] == 'Los Producto(s) se han agregado con exito')
                    alertify.log('Los Producto(s) se han agregado con exito');

                F_MostrarTotales();

                $('#hfCodProductoAgregar').val('0');
                $('#hfCostoAgregar').val('0');
                $('#hfCodUmAgregar').val('0');
                $('#MainContent_txtCodigoProductoAgregar').val('');
                $('#MainContent_txtStockAgregar').val('');
                $('#MainContent_txtUMAgregar').val('');
                $('#MainContent_txtPrecioDisplay').val('0.00');
                $('#MainContent_ddlPrecio').empty();
                $('#MainContent_txtArticuloAgregar').val('');
                $('#MainContent_txtCantidad').val('1');
                $('#MainContent_txtArticuloAgregar').focus();
                $("#hfMenorPrecioAgregar").val(0);
      
                return false;
            }
            else {
                alertify.log(result.split('~')[2]);
            }
            return false;
        });
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
    }
}