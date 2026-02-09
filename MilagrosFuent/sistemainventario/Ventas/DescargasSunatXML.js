var AppSession = "../Ventas/DescargasSunatXML.aspx";

var CodigoMenu = 4000;
var CodigoInterno = 10;
var CodCategoria = 1;

//----------------------------
var CodigoEmpresa = 3; //1 Vensertec //2Lubricentro

//control de posicion de agregar productos
var TipoCliente = "";
$(document).ready(function () {
  if (!F_SesionRedireccionar(AppSession)) return false;

  document.onkeydown = function (evt) {
    return (evt ? evt.which : event.keyCode) != 13;
  };

  $("#MainContent_txtClienteConsulta").autocomplete({
    source: function (request, response) {
      $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete",
        data:
          "{'NroRuc':'" +
          "" +
          "','RazonSocial':'" +
          request.term +
          "','CodTipoCtaCte':'1','CodTipoCliente':'" +
          $("#hfCodTipoCliente").val() +
          "'}",
        dataType: "json",
        async: true,
        success: function (data) {
          response(
            $.map(data.d, function (item) {
              return {
                label: item.split(",")[1],
                val: item.split(",")[0],
                Direccion: item.split(",")[2],
              };
            })
          );
        },
        error: function (response) {
          alertify.log(response.responseText);
        },
        failure: function (response) {
          alertify.log(response.responseText);
        },
      });
    },
    select: function (e, i) {
      $("#hfCodCtaCteConsulta").val(i.item.val);
    },
    minLength: 3,
  });

  $(".Jq-ui-dtp").datepicker({
    changeMonth: true,
    changeYear: true,
    dateFormat: "dd/mm/yy",
    maxDate: "0",
  });

  $(".Jq-ui-dtp").datepicker($.datepicker.regional["es"]);
  $(".Jq-ui-dtp").datepicker("setDate", new Date());

  var date = new Date(); // Obtiene la fecha actual
  date.setDate(date.getDate() - 1); // Resta 7 días
  $("#MainContent_txtDesde").datepicker("setDate", date); // Establece la nueva fecha en el datepicker

  $("#MainContent_txtDesde").datepicker({
    onSelect: function () {
      var date = $(this).datepicker("getDate");
      if (date) {
        date.setDate(1);
        $(this).datepicker("setDate", date);
      }
    },
  });

  $("#MainContent_txtDesde").datepicker({
    beforeShowDay: function (date) {
      return [date.getDate() == 1, ""];
    },
  });

  F_Controles_Inicializar();

  $("#MainContent_btnBuscarConsulta").click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
    try {
      F_Buscar();
      return false;
    } catch (e) {
      alertify.log("Error Detectado: " + e);
    }
  });

  $("#MainContent_txtNumeroConsulta").ForceNumericOnly();

  F_Derecha();

  F_InicializarCajaTexto();
});

$().ready(function () {
  $(document).everyTime(600000, function () {
    if (!F_ValidaSesionActiva(AppSession)) return false;
  });
});

// $(document).on(
//   "change",
//   "select[id $= 'MainContent_ddlSerieConsulta']",
//   function () {
//     F_Buscar();
//   }
// );
function F_Controles_Inicializar() {
  var arg;

  try {
    var objParams = {};

    arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
    MostrarEspera(true);
    F_Controles_Inicializar_NET(arg, function (result) {
      var str_resultado_operacion = "";
      var str_mensaje_operacion = "";

      str_resultado_operacion = result.split("~")[0];
      str_mensaje_operacion = result.split("~")[1];
      MostrarEspera(false);
      if (str_resultado_operacion == "1") {
        $("#hfCodUsuario").val(result.split("~")[9]);
        $("#hfCodSede").val(result.split("~")[10]);
        $(".ccsestilo").css("background", "#FFFFE0");
      } else {
        alertify.log(str_mensaje_operacion);
      }

      $("#toolbar-options").toolbar({
        content: "#toolbar-options",
        position: "bottom",
      });
    });
  } catch (mierror) {
    MostrarEspera(false);
    alertify.log("Error detectado: " + mierror);
  }
}

function F_Buscar() {
  //if (F_PermisoOpcion(CodigoMenu, CodigoInterno, "Consultar") === "0")
   // return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion

  try {
    var chkFecha = "1";
    var chkCliente = "0";

    //if ($("#MainContent_chkRango").is(":checked")) chkFecha = "1";

    if ($("#MainContent_chkCliente").is(":checked")) chkCliente = "1";

    var objParams = {
      Filtro_Desde: $("#MainContent_txtDesde").val(),
      Filtro_Hasta: $("#MainContent_txtHasta").val(),
      Filtro_CodCtaCte: $("#hfCodCtaCteConsulta").val(),
      Filtro_ChkFecha: chkFecha,
      Filtro_ChkCliente: chkCliente,
    };

    var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

    MostrarEspera(true);
    F_Buscar_NET(arg, function (result) {
      MostrarEspera(false);

      var str_resultado_operacion = "";
      var str_mensaje_operacion = "";

      str_resultado_operacion = result.split("~")[0];
      str_mensaje_operacion = result.split("~")[1];

      if (str_resultado_operacion == "1") {
        F_Update_Division_HTML("div_consulta", result.split("~")[2]);
        $("#lblGrillaConsulta").text(
          F_Numerar_Grilla("grvConsulta", "lblnumero")
        );

        if (str_mensaje_operacion != "") alertify.log(str_mensaje_operacion);
      } else {
        alertify.log(result.split("~")[1]);
      }

      $("#toolbar-options").toolbar({
        content: "#toolbar-options",
        position: "bottom",
      });
      return false;
    });
  } catch (e) {
    MostrarEspera(false);
    alertify.log("Error Detectado: " + e);
    return false;
  }
}

function MostrarEspera(pboolMostrar) {
  if (pboolMostrar) {
    $("#dlgWait").dialog({
      autoOpen: false,
      modal: true,
      height: "auto",
      resizable: false,
      dialogClass: "alert",
    });

    $(".alert div.ui-dialog-titlebar").hide();
    //        $('.ui-button').remove();
    $("#dlgWait").dialog("open");
  } else {
    $("#dlgWait").dialog("close");
  }
}

function F_InicializarCajaTexto() {
  $("#MainContent_txtDesde").css("background", "#FFFFE0");

  $("#MainContent_txtHasta").css("background", "#FFFFE0");

  $("#MainContent_txtClienteConsulta").css("background", "#FFFFE0");

  return false;
}

function F_DescargarArchivoXML(Fila) {
  var imgID = Fila.id;
  var hfCodArchivoSunatXML =
    "#" + imgID.replace("imgDownloadFT", "hfCodArchivoSunatXML");
  var CodArchivoSunatXML = $(hfCodArchivoSunatXML).val();

  var dtx = new Date();
  var timex = dtx.getHours() + dtx.getMinutes() + dtx.getSeconds();

  $.ajax({
    type: "POST",
    url: "../Servicios/Servicios.asmx/DescargarXML?time=" + timex,
    data: "{'CodArchivoSunatXML':'" + CodArchivoSunatXML + "'}",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    async: false,
    success: function (obj, status) {
      var archivos = obj.d;
      console.log("archivos", archivos);

      try{
      var base64String = archivos.ArchivoRptaB64; // Reemplaza con tu string Base64

      // Convierte el string Base64 en un blob
      var byteCharacters = atob(base64String);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var blob = new Blob([byteArray], { type: "application/octet-stream" });

      // Crea una URL del objeto blob
      var blobUrl = URL.createObjectURL(blob);

      // Crea un enlace invisible
      var a = document.createElement("a");
      a.style.display = "none";

      // Asigna la URL del objeto blob al enlace
      a.href = blobUrl;

      // Asigna un nombre de archivo al enlace (puedes cambiarlo según tus necesidades)
      a.download = "R-" + archivos.NombreArchivo + ".xml";

      // Agrega el enlace al documento
      document.body.appendChild(a);

      // Simula un clic en el enlace para iniciar la descarga
      a.click();

      // Elimina el enlace después de la descarga
      document.body.removeChild(a);

      // Libera la URL del objeto blob
      URL.revokeObjectURL(blobUrl);
      }

      catch(ex){}

      try
      {
       base64String = archivos.ArchivoEnvB64; // Reemplaza con tu string Base64

      // Convierte el string Base64 en un blob
      var byteCharacters = atob(base64String);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var blob = new Blob([byteArray], { type: "application/octet-stream" });

      // Crea una URL del objeto blob
      var blobUrl = URL.createObjectURL(blob);

      // Crea un enlace invisible
      var a = document.createElement("a");
      a.style.display = "none";

      // Asigna la URL del objeto blob al enlace
      a.href = blobUrl;

      // Asigna un nombre de archivo al enlace (puedes cambiarlo según tus necesidades)
      a.download = archivos.NombreArchivo + ".xml";

      // Agrega el enlace al documento
      document.body.appendChild(a);

      // Simula un clic en el enlace para iniciar la descarga
      a.click();

      // Elimina el enlace después de la descarga
      document.body.removeChild(a);

      // Libera la URL del objeto blob
      URL.revokeObjectURL(blobUrl);
      }
      catch(ex){
      
      }

      
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      Espera = true;
      Resultado = false;
    },
  });

  return;
}

function F_DescargarArchivoXMLGuia(Fila) {
  var imgID = Fila.id;
  var hfCodArchivoSunatXML =
    "#" + imgID.replace("imgDownloadGUIA", "hfCodTraslado_GuiaRemision");
  var CodArchivoSunatXML = $(hfCodArchivoSunatXML).val();

  if (parseInt(CodArchivoSunatXML)==0)
      return false;

  var dtx = new Date();
  var timex = dtx.getHours() + dtx.getMinutes() + dtx.getSeconds();

  $.ajax({
    type: "POST",
    url: "../Servicios/Servicios.asmx/DescargarXML?time=" + timex,
    data: "{'CodArchivoSunatXML':'" + CodArchivoSunatXML + "'}",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    async: false,
    success: function (obj, status) {
      var archivos = obj.d;
      console.log("archivos", archivos);

      try{
      var base64String = archivos.ArchivoRptaB64; // Reemplaza con tu string Base64

      // Convierte el string Base64 en un blob
      var byteCharacters = atob(base64String);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var blob = new Blob([byteArray], { type: "application/octet-stream" });

      // Crea una URL del objeto blob
      var blobUrl = URL.createObjectURL(blob);

      // Crea un enlace invisible
      var a = document.createElement("a");
      a.style.display = "none";

      // Asigna la URL del objeto blob al enlace
      a.href = blobUrl;

      // Asigna un nombre de archivo al enlace (puedes cambiarlo según tus necesidades)
      a.download = "R-" + archivos.NombreArchivo + ".xml";

      // Agrega el enlace al documento
      document.body.appendChild(a);

      // Simula un clic en el enlace para iniciar la descarga
      a.click();

      // Elimina el enlace después de la descarga
      document.body.removeChild(a);

      // Libera la URL del objeto blob
      URL.revokeObjectURL(blobUrl);
      }

      catch(ex){}

      try
      {
       base64String = archivos.ArchivoEnvB64; // Reemplaza con tu string Base64

      // Convierte el string Base64 en un blob
      var byteCharacters = atob(base64String);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var blob = new Blob([byteArray], { type: "application/octet-stream" });

      // Crea una URL del objeto blob
      var blobUrl = URL.createObjectURL(blob);

      // Crea un enlace invisible
      var a = document.createElement("a");
      a.style.display = "none";

      // Asigna la URL del objeto blob al enlace
      a.href = blobUrl;

      // Asigna un nombre de archivo al enlace (puedes cambiarlo según tus necesidades)
      a.download = archivos.NombreArchivo + ".xml";

      // Agrega el enlace al documento
      document.body.appendChild(a);

      // Simula un clic en el enlace para iniciar la descarga
      a.click();

      // Elimina el enlace después de la descarga
      document.body.removeChild(a);

      // Libera la URL del objeto blob
      URL.revokeObjectURL(blobUrl);
      }
      catch(ex){
      
      }

      
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      Espera = true;
      Resultado = false;
    },
  });

  return;
}
