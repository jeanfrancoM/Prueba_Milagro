var AppSession = "../Reportes/Ventas_RankingVenta.aspx";

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('.Jq-ui-dtp').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
    $('.Jq-ui-dtp').datepicker('setDate', new Date());


    $('#MainContent_btnReporte').click(function () {
        try {
            if ($('#MainContent_txtRanking').val() == '') {
                alertify.log("INGRESAR RANKING");
                return false;
            }
            F_Reporte();
            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });


    $('#MainContent_btnExcel').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if ($('#MainContent_txtRanking').val() == '') {
                alertify.log("INGRESAR RANKING");
                return false;
            }

            F_Excel()
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
        return false;
    });

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

    F_Controles_Inicializar();

    F_Derecha();

    $('#MainContent_ddlSucursal').css('background', '#FFFFE0');
    $('#MainContent_txtDesde').css('background', '#FFFFE0');
    $('#MainContent_txtHasta').css('background', '#FFFFE0');
    $('#MainContent_txtRanking').css('background', '#FFFFE0');
    $("#MainContent_txtRanking").ForceNumericOnly();
});

function F_Controles_Inicializar() {
    var arg;

    try {
        var objParams =
            {
                Filtro_CodSerie: 67
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
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_Sucursal', result.split('~')[2]);
                        $('#MainContent_ddlSucursal').css('background', '#FFFFE0');
                        $('#MainContent_ddlSucursal').val('0');
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

function F_Reporte() {
    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = 5;
    var CodMenu = 3001;
    var Titulo = "REPORTE RANKING DE VENTAS";
    var SubTitulo = "DESDE " + $("#MainContent_txtDesde").val() + " HASTA " + $('#MainContent_txtHasta').val();
    var NombreTabla = "RankingVentas";
    var NombreArchivo = "Web_Reporte_Ventas_rptRankingVentas.rpt";
    var NombreArchivo2 = "Web_Reporte_Ventas_rptRankingVentas.rpt";
 
    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'Titulo=' + Titulo + '&';
    rptURL = rptURL + 'SubTitulo=' + SubTitulo + '&';
    rptURL = rptURL + 'CodAlmacen=' + $('#MainContent_ddlSucursal').val() + '&';
    rptURL = rptURL + 'Desde=' + $("#MainContent_txtDesde").val() + '&';
    rptURL = rptURL + 'Hasta=' + $('#MainContent_txtHasta').val() + '&';
    rptURL = rptURL + 'Ranking=' + $('#MainContent_txtRanking').val() + '&';
    rptURL = rptURL + 'NombreTabla=' + NombreTabla + '&';
    rptURL = rptURL + 'NombreArchivo=' + NombreArchivo + '&';
    rptURL = rptURL + 'NombreArchivo2=' + NombreArchivo2 + '&';    
    
    window.open(rptURL, "PopUpRpt", Params);

    return false;
}



function F_Excel() {
    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var CodMenu = 5;
    var CodVendedor = 0;
    var Sumarizado = 0;
    var Desde = $("#MainContent_txtDesde").val();
    var Hasta = $('#MainContent_txtHasta').val();
    var TipoArchivo = 'application/pdf';
    var NombreHoja = 'RANKING';
    var NombreArchivo = "RankingVentas.xlsx";

    var Titulo = "REPORTE RANKING DE VENTAS";
    var SubTitulo = "DESDE " + $("#MainContent_txtDesde").val() + " HASTA " + $('#MainContent_txtHasta').val();
    var NombreTabla = "RankingVentas";

    if ($('#MainContent_txtCliente').val() == '')
        $('#hfCodCtaCte').val(0);

    if ($('#MainContent_txtCliente').val() != $('#hfCliente').val()) {
        $('#hfCodCtaCte').val(0);
        $('#MainContent_txtCliente').val('');
    }
 

 




    rptURL = '../Reportes/Excel.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'Titulo=' + Titulo + '&';
    rptURL = rptURL + 'SubTitulo=' + SubTitulo + '&';
    rptURL = rptURL + 'CodAlmacen=' + $('#MainContent_ddlSucursal').val() + '&';
    rptURL = rptURL + 'Desde=' + $("#MainContent_txtDesde").val() + '&';
    rptURL = rptURL + 'Hasta=' + $('#MainContent_txtHasta').val() + '&';
    rptURL = rptURL + 'Ranking=' + $('#MainContent_txtRanking').val() + '&';
    rptURL = rptURL + 'NombreTabla=' + NombreTabla + '&';
    rptURL = rptURL + 'NombreArchivo=' + NombreArchivo + '&';
    rptURL = rptURL + 'NombreHoja=' + NombreHoja + '&';   
 
    window.open(rptURL, "PopUpRpt", Params);

    return false;
}



//function F_Excel() {
//    var rptURL = '';
//    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
//    

//    var CodMenu = 206;
//    var Desde = $("#MainContent_txtDesde").val();
//    var Hasta = $('#MainContent_txtHasta').val();
//    var CodAlmacen = $('#MainContent_ddlSucursal').val();
//    var Ranking = $('#MainContent_txtRanking').val();
//    var Titulo = "RANKING DE VENTAS";
//    var SubTitulo = "DESDE " + Desde + " HASTA " + Hasta;
//    var NombreHoja = "RankingVentas";
//    var NombreArchivo = "RankingVentas.xlsx";

//    rptURL = '../Reportes/Web_Pagina_ConstruirExcel.aspx';
//    rptURL += '?CodMenu=' + CodMenu;
//    rptURL += '&Desde=' + Desde;
//    rptURL += '&Hasta=' + Hasta;
//    rptURL += '&CodAlmacen=' + CodAlmacen;
//    rptURL += '&Ranking=' + Ranking;
//    rptURL += '&Titulo=' + encodeURIComponent(Titulo);
//    rptURL += '&SubTitulo=' + encodeURIComponent(SubTitulo);
//    rptURL += '&NombreHoja=' + encodeURIComponent(NombreHoja);
//    rptURL += '&NombreArchivo=' + encodeURIComponent(NombreArchivo);

//    window.open(rptURL, "PopUpRpt", Params);

//    return false;
//}


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





