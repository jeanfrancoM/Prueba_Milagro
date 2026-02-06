<%@ Page Title="Descarga XML Sunat" Language="C#" MasterPageFile="~/Site.Master"
    AutoEventWireup="true" CodeBehind="DescargasSunatXML.aspx.cs" Inherits="SistemaInventario.Ventas.DescargasSunatXML"
    EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"
        type="text/javascript"></script>
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>
    <script src="../Scripts/alertify.min.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript" language="javascript"
        charset="UTF-8"></script>
    <script src="../Scripts/inputatajos/kibo.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript" src="DescargasSunatXML.js" charset="UTF-8"></script>
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
    <script src="../Asset/css/tooltipbutton/jquery.toolbar.js" type="text/javascript"></script>
    <link href="../Asset/css/tooltipbutton/jquery.toolbar.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/sss.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/toars/toastr.min.css" rel="stylesheet" type="text/css" />
    <script src="../Asset/toars/toastr.min.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <table>
        <tr valign="top">
            <td style="width: 1100px" valign="top">
                <div class="titulo" style="width: 1045px">
                    <asp:Label ID="lbTipoDocumento" runat="server" Text="Factura" Font-Bold="False" Font-Size="Large"
                        Visible="false"></asp:Label>
                    <asp:Label ID="Label3" runat="server" Text="Descarga de XMl de Documentos Sunat" Font-Bold="False"
                        Font-Size="Large"></asp:Label>
                </div>
                <div id="divTabs" style="width: 1045px">
                    <div id="tabConsulta">
                        <div id="divConsulta" class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                Criterio de busqueda
                            </div>
                            <div class="ui-jqdialog-content" style="padding: 0.5rem">
                                <div style="display: flex; width: 100%; height: auto; align-items: stretch;">
                                    <div style="width: 50px; text-align: right; padding: 4px 4px 0 0; font-weight: bold;">
                                        Desde
                                    </div>
                                    <div style="width: 60px;">
                                        <asp:TextBox ID="txtDesde" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                    </div>
                                    <div style="width: 50px; text-align: right; padding: 4px 4px 0 0; font-weight: bold;">
                                        Hasta
                                    </div>
                                    <div style="width: 60px;">
                                        <asp:TextBox ID="txtHasta" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                    </div>
                                    <div style="width: 80px; text-align: right; padding: 0 4px 0 0;">
                                        <asp:CheckBox ID="chkCliente" runat="server" Text="Cliente" Font-Bold="True" />
                                    </div>
                                    <div style="flex: 1;">
                                        <asp:TextBox ID="txtClienteConsulta" runat="server" Width="100%" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                    </div>
                                    <div style="width: 130px;">
                                        <!-- Contenido del div de la derecha -->
                                    </div>
                                </div>
                            </div>
                            <div class="linea-button" style="height: 25px">
                                <table style="float: right; width: auto">
                                    <tr>
                                        <td>
                                            <asp:Button ID="btnImpresionPedidos" runat="server" Text="Imprimir" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                                Font-Names="Arial" Font-Bold="True" Width="120" Visible="false" />
                                        </td>
                                        <td>
                                            <asp:Button ID="btnBuscarConsulta" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                                Font-Names="Arial" Font-Bold="True" Width="120" />
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div style="padding-top: 5px">
                            <table cellpadding="0" cellspacing="0" align="center">
                                <tr>
                                    <td style="font-weight: bold">
                                        Cantidad de Registros:
                                    </td>
                                    <td style="font-weight: bold">
                                        <label id="lblGrillaConsulta">
                                        </label>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div id="div_consulta">
                            <asp:GridView ID="grvConsulta" runat="server" AutoGenerateColumns="False" border="0"
                                CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="1016px"
                                OnRowDataBound="grvConsulta_RowDataBound">
                                <Columns>
                                    <asp:TemplateField HeaderText="Empresa" HeaderStyle-HorizontalAlign="Center">
                                        <ItemStyle HorizontalAlign="Left" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblEmpresa" Text='<%# Bind("Empresa") %>' CssClass="detallesart"></asp:Label>
                                            <asp:HiddenField ID="hfCodDocumentoVenta" runat="server" Value='<%# Bind("CodDocumentoVenta") %>' />
                                            <asp:HiddenField ID="hfEmpresa" runat="server" Value='<%# Bind("Empresa") %>' />
                                            <asp:HiddenField ID="hfTD" runat="server" Value='<%# Bind("TD") %>' />
                                            <asp:HiddenField ID="hfNumero" runat="server" Value='<%# Bind("Numero") %>' />
                                            <asp:HiddenField ID="hfCliente" runat="server" Value='<%# Bind("Cliente") %>' />
                                            <asp:HiddenField ID="hfEmision" runat="server" Value='<%# Bind("Emision") %>' />
                                            <asp:HiddenField ID="hfVencimiento" runat="server" Value='<%# Bind("Vencimiento") %>' />
                                            <asp:HiddenField ID="hfMoneda" runat="server" Value='<%# Bind("Moneda") %>' />
                                            <asp:HiddenField ID="hfTC" runat="server" Value='<%# Bind("TC") %>' />
                                            <asp:HiddenField ID="hfTotal" runat="server" Value='<%# Bind("Total") %>' />
                                            <asp:HiddenField ID="hfCondicion" runat="server" Value='<%# Bind("Condicion") %>' />
                                            <asp:HiddenField ID="hfEstado" runat="server" Value='<%# Bind("Estado") %>' />
                                            <asp:HiddenField ID="hfDeuda" runat="server" Value='<%# Bind("Deuda") %>' />
                                            <asp:HiddenField ID="hfSaldo" runat="server" Value='<%# Bind("Saldo") %>' />
                                            <asp:HiddenField ID="hfCodCtaCte" runat="server" Value='<%# Bind("CodCtaCte") %>' />
                                            <asp:HiddenField ID="hfUsuario" runat="server" Value='<%# Bind("Usuario") %>' />
                                            <asp:HiddenField ID="hfCodArchivoSunatXML" runat="server" Value='<%# Bind("CodArchivoSunatXML") %>' />
                                            <asp:HiddenField ID="hfEstadoSunat" runat="server" Value='<%# Bind("EstadoSunat") %>' />
                                            <asp:HiddenField ID="hfAño" runat="server" Value='<%# Bind("Año") %>' />
                                            <asp:HiddenField ID="hfCodTraslado_GuiaRemision" runat="server" Value='<%# Bind("CodTraslado_GuiaRemision") %>' />
                                            <asp:HiddenField ID="hfNumero_GuiaRemision" runat="server" Value='<%# Bind("Numero_GuiaRemision") %>' />
                                            <asp:HiddenField ID="hfCodArchivoSunatXMLTraslado_GuiaRemision" runat="server" Value='<%# Bind("CodArchivoSunatXMLTraslado_GuiaRemision") %>' />
                                            <asp:HiddenField ID="hfEstadoTraslado_GuiaRemision" runat="server" Value='<%# Bind("EstadoTraslado_GuiaRemision") %>' />
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:BoundField DataField="TD" HeaderText="TD" HeaderStyle-HorizontalAlign="Center">
                                        <HeaderStyle HorizontalAlign="Center" />
                                        <ItemStyle HorizontalAlign="Center" Width="25px" />
                                    </asp:BoundField>
                                    <asp:BoundField DataField="Numero" HeaderText="Numero" HeaderStyle-HorizontalAlign="Center">
                                        <HeaderStyle HorizontalAlign="Center" />
                                        <ItemStyle HorizontalAlign="Center" Width="80px" />
                                    </asp:BoundField>
                                    <asp:BoundField DataField="Cliente" HeaderText="Cliente" HeaderStyle-HorizontalAlign="Center">
                                        <HeaderStyle HorizontalAlign="Center" />
                                        <ItemStyle HorizontalAlign="Left" />
                                    </asp:BoundField>
                                    <asp:BoundField DataField="Emision" HeaderText="Emision" HeaderStyle-HorizontalAlign="Center">
                                        <HeaderStyle HorizontalAlign="Center" />
                                        <ItemStyle HorizontalAlign="Center"  Width="75px"/>
                                    </asp:BoundField>
                               <%--     <asp:BoundField DataField="Vencimiento" HeaderText="Vencimiento" HeaderStyle-HorizontalAlign="Center">
                                        <HeaderStyle HorizontalAlign="Center" />
                                        <ItemStyle HorizontalAlign="Center" Width="75px"/>
                                    </asp:BoundField>--%>
                                    <asp:BoundField DataField="Moneda" HeaderText="Mon" HeaderStyle-HorizontalAlign="Center">
                                        <HeaderStyle HorizontalAlign="Center" />
                                        <ItemStyle HorizontalAlign="Center" Width="25px" />
                                    </asp:BoundField>
                                    <asp:TemplateField HeaderText="Total">
                                        <ItemStyle HorizontalAlign="Right" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblTotal" Text='<%# Bind("Total") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="Estado">
                                        <ItemStyle HorizontalAlign="Left" Width="100px"/>
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblEstado" Text='<%# Bind("Estado") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="Estado Sunat">
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblEstadoSunat" Text='<%# Bind("EstadoSunat") %>'></asp:Label>
                                        </ItemTemplate>
                                        <ItemStyle HorizontalAlign="Left" Width="90px"/>
                                    </asp:TemplateField>
                                    <asp:TemplateField>
                                        <ItemTemplate>
                                            <asp:ImageButton runat="server" ID="imgDownloadFT" ImageUrl="~/Asset/images/descarga.png"
                                                ToolTip="DESCARGAR XML SUNAT" OnClientClick="F_DescargarArchivoXML(this); return false;" Width="20" Height="18" />
                                        </ItemTemplate>
                                        <ItemStyle HorizontalAlign="Center" Width="25px"/>
                                  </asp:TemplateField>
                                    <%--        <asp:BoundField DataField="Numero_GuiaRemision" HeaderText="GUIA" HeaderStyle-HorizontalAlign="Center">
                                        <HeaderStyle HorizontalAlign="Center" />
                                        <ItemStyle HorizontalAlign="Center" Width="80px" />
                                    </asp:BoundField>
                                    <asp:TemplateField>
                                        <ItemTemplate>
                                            <asp:ImageButton runat="server" ID="imgDownloadGUIA" ImageUrl="~/Asset/images/arrow.png"
                                                ToolTip="Descargar XML Sunat" OnClientClick="F_DescargarArchivoXMLGUIA(this); return false;" Width="14" Height="9" />
                                        </ItemTemplate>
                                        <ItemStyle HorizontalAlign="Center" Width="25px"/>
                                    </asp:TemplateField>--%>

                                </Columns>
                            </asp:GridView>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    </table>
    <div id="div_NumeroDocumento" style="background-color: #cce6ff; text-align: center;
        display: none">
        <br />
        <br />
        <center>
            <asp:Label ID="Label6" runat="server" Text="Numero de Cotizacion" Font-Bold="true"
                Font-Size="Large" Style="text-align: center"></asp:Label>
        </center>
        <br />
        <center>
            <asp:Label ID="lblNumeroDocumento" runat="server" Text="" Font-Bold="true" Font-Size="XX-Large"
                Style="text-align: center"></asp:Label>
        </center>
        <br />
    </div>
    <div id="dlgWait" style="background-color: #cce6ff; text-align: center; display: none">
        <br />
        <br />
        <div id="div_wait" style="display: block">
            <center>
                <asp:Label ID="Label7" runat="server" Text="PROCESANDO..." Font-Bold="true" Font-Size="Large"
                    Style="text-align: center"></asp:Label>
            </center>
            <br />
            <center>
                <img alt="Wait..." src="../Asset/images/ajax-loader2.gif" />
            </center>
        </div>
    </div>
    <input id="hfCodCtaCte" type="hidden" value="0" />
    <input id="hfCodCtaCteConsulta" type="hidden" value="0" />
    <input id="hfCodigoTemporal" type="hidden" value="0" />
    <input id="hfCodDocumentoVenta" type="hidden" value="0" />
    <input id="hfNotaPedido" type="hidden" value="0" />
    <input id="hfCodCtaCteNP" type="hidden" value="0" />
    <input id="hfCodUsuario" type="hidden" value="0" />
    <input id="hfCodDepartamento" type="hidden" value="0" />
    <input id="hfCodProvincia" type="hidden" value="0" />
    <input id="hfCodDistrito" type="hidden" value="0" />
    <input id="hfCodProforma" type="hidden" value="0" />
    <input id="hfCodTraslado" type="hidden" value="0" />
    <input id="hfPartida" type="hidden" value="" />
    <input id="hfCodNotaVenta" type="hidden" value="0" />
    <input id="hfCodSede" type="hidden" value="0" />
    <input id="hfCodTipoCliente" type="hidden" value="0" />
    <input id="hfCodDireccion" type="hidden" value="0" />
    <input id="hfCodTipoDoc2" type="hidden" value="0" />
    <input id="hfNroRuc" type="hidden" value="" />
    <input id="hfDistrito" type="hidden" value="" />
    <input id="hfDireccion" type="hidden" value="" />
    <input id="hfCliente" type="hidden" value="" />
    <input id="hfCodTransportista" type="hidden" value="0" />
    <input id="hfCodDireccionTransportista" type="hidden" value="0" />
    <input id="hfCodFacturaAnterior" type="hidden" value="0" />
    <input id="hfNumeroAnterior" type="hidden" value="0" />
    <input id="hfSaldoCreditoFavor" type="hidden" value="0" />
    <input id="hfCodProductoAgregar" type="hidden" value="0" />
    <input id="hfMenorPrecioAgregar" type="hidden" value="0" />
    <input id="hfCostoAgregar" type="hidden" value="0" />
    <input id="hfCodUmAgregar" type="hidden" value="0" />
    <input id="hfCodDireccionDefecto" type="hidden" value="0" />
    <input id="hfFlagRuc" type="hidden" value="0" />
    <input id="hfurlapisunat" type="hidden" value="0" />
    <input id="hftokenapisunat" type="hidden" value="0" />
    <input id="hfCodigo" type="hidden" value="0" />
    <input id="hfEstado" type="hidden" value="0" />
    <input id="hfNumeroAnulacion" type="hidden" value="0" />
    <input id="hfnumero_grilla" type="hidden" value="0" />
    <input id="hfcliente_grilla" type="hidden" value="0" />
    <input id="hfcodtipodoc_grilla" type="hidden" value="0" />
    <input id="hfIdAlmacen" type="hidden" value="0" />
    <input id="hfPrecioExclusivo" type="hidden" value="0" />
    <input id="hfLimiteMayorista" type="hidden" value="0" />
    <input id="hfCantidadMayorista" type="hidden" value="0" />
    <input id="hfPrecio1" type="hidden" value="0" />
    <input id="hfCodProducto" type="hidden" value="0" />
    <input id="hfCodCategoria" type="hidden" value="1" />
    <input id="hfCodDetalleMotor" type="hidden" value="0" />
    <input id="DescripcionMotor" type="hidden" value="0" />
    <input id="hfMotorEdicion" type="hidden" value="0" />
</asp:Content>
