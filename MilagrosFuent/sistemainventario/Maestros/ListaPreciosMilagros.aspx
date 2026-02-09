<%@ Page Title="Lista Previa" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" 
CodeBehind="ListaPreciosMilagros.aspx.cs" Inherits="SistemaInventario.Maestros.ListaPreciosMilagros" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"
        type="text/javascript"></script>
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>
    <script src="../Scripts/alertify.min.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript"></script>
    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo" style="width: 400px">
        Carga de Lista de Precios</div>
    <div>
        <div id="tabRegistro">
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 1200px">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix"
                    style="width: 1200px">
                    Datos de Lista de Precios
                </div>
                <div>
                    <table cellpadding="0" cellspacing="0" class="form-inputs" width="300">
                        <tr>
                            <td style="font-weight: bold">
                                Excel
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:FileUpload ID="FileUpload1" runat="server" />
                                        </td>
                                        <td>
                                            <asp:Label ID="Label1" runat="server" Font-Bold="True"></asp:Label>
                                            <asp:HiddenField ID="HiddenField1" runat="server" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
              
                    </table>
                   
                                </div>

                  <div>
                <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 19px; margin-top: 10px; color: #003366; table-layout: fixed;">
     
                    <tr style="background-color: #e6f2ff;">
                        <td colspan="3" style="padding: 10px 0; font-weight: bold; border: 1px solid #cce0ff; text-align: center; font-size: 20px;">
                            🧾 FORMATO REQUERIDO PARA EL ARCHIVO EXCEL:
                        </td>
                    </tr>

                    <tr>
                        <td colspan="3" style="padding: 10px 15px; border: 1px solid #cce0ff; font-size: 18px;">
                              A = CODIGO, B = DESCRIPCION, C = UM, D = PLISTAFOBDOLAR, E = PLISTAFOBSOL, F = VENTAXMAYOR, G = INCLUYEIGVMAYOR,
                             H = VENTAXMENOR, I = INCLUYEIGVMENOR, J = UBICACION
                        </td>
                    </tr>

                    <tr style="background-color: #f0f8ff;">
                        <td style="padding: 12px 15px; border: 1px solid #cce0ff; font-size:14px">
                            <div style="font-size: 20px; font-weight: bold;">🔷 Columnas Generales</div>
                            CODIGO, DESCRIPCION, UM, INCLUYEIGVMAYOR, INCLUYEIGVMENOR,UBICACION
                             deben ser de tipo general.
                        </td>
                        <td style="padding: 12px 15px; border: 1px solid #cce0ff; font-size:14px">
                            <div style="font-size: 20px; font-weight: bold;">📁 Nombre de la hoja</div>
                            La hoja del Excel debe llamarse <strong>VENTAS</strong>.
                        </td>
                        <td style="padding: 12px 15px; border: 1px solid #cce0ff; font-size:14px">
                            <div style="font-size: 20px; font-weight: bold;">📦 Productos inactivos</div>
                            PRODUCTOS QUE NO ESTEN EN LA LISTA SE PONDRAN INACTIVOS
                        </td>
                    </tr>

                    <tr style="background-color: #f0f8ff;">
                       <td style="padding: 12px 15px; border: 1px solid #cce0ff; font-size:14px">
                            <div style="font-size: 18px; font-weight: bold;">🔹 Columnas de tipo NUMERO</div>
                            LAS COLUMNAS PLISTAFOBDOLAR,PLISTAFOBSOL,VENTAXMAYOR,
                            VENTAXMENOR DEBEN DE SER DE TIPO NUMERO.
                        </td>
                        <td style="padding: 12px 15px; border: 1px solid #cce0ff; font-size:14px">
                            <div style="font-size: 18px; font-weight: bold;">❌ Sin letras en numeros</div>
                            EN LAS COLUMNAS TIPO NUMERO NO DEDE APARECER NINGUN LETRA,CASO CONTRARIO NO CARGARA EL EXCEL.
                        </td>
                        <td style="padding: 12px 15px; border: 1px solid #cce0ff; font-size:14px">
                            <div style="font-size: 18px; font-weight: bold;">❌ Sin numeros en texto</div>
                            EN LAS COLUMNAS INCLUYEIGVMAYOR, INCLUYEIGVMENOR Y UM NO DEDE APARECER NINGUN NUMERO,CASO CONTRARIO NO CARGARA EL EXCEL.
                        </td>
                    </tr>

                    <tr style="background-color: #f0f8ff;">
                     <td style="padding: 12px 15px; border: 1px solid #cce0ff; font-size:14px">
                            <div style="font-size: 18px; font-weight: bold;">⚠️ Codigos unicos</div>
                            EN LA COLUMNAS CODIGO NO DEBEN DE REPETIRSE LOS CODIGOS.
                        </td>
                       <td style="padding: 12px 15px; border: 1px solid #cce0ff; font-size:14px">
                            <div style="font-size: 18px; font-weight: bold;">❗ Sin filas vacias</div>
                           NO DEBEN DE HABER FILAS VACIOS,SI FALTAN ALGUN DATO EL EXCEL NO CARGARA.
                        </td>
                       <td style="padding: 12px 15px; border: 1px solid #cce0ff; font-size:14px">
                            <div style="font-size: 18px; font-weight: bold;">❌ Sin fuentes asiaticas</div>
                            Evitar usar fuentes asiaticas en el archivo Excel.
                        </td>
                    </tr>
                </table>
            </div>






                <div class="linea-button">
                 
                   <asp:Button ID="btnNuevo" runat="server" Text="Nuevo" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" OnClick="btnNuevo_Click" />

                    <asp:Button ID="btnImport" runat="server" Text="Cargar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" OnClick="btnImport_Click" />

                    <asp:Button ID="btnExcel" runat="server" Text="Descargar Formato" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="150" OnClick="btnFormato_Click" />



                </div>
            </div>
        </div>
    </div>
    <div id="dlgWait" style="background-color: #CCE6FF; text-align: center; display: none;">
        <br />
        <br />
        <center>
            <asp:Label ID="Label2" runat="server" Text="PROCESANDO..." Font-Bold="true" Font-Size="Large"
                Style="text-align: center"></asp:Label></center>
        <br />
        <center>
            <img alt="Wait..." src="../Asset/images/ajax-loader2.gif" /></center>
    </div>
</asp:Content>
