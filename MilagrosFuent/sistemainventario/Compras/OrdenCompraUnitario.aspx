<%@ Page Title="Orden Compra" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"   CodeBehind="OrdenCompraUnitario.aspx.cs" Inherits="SistemaInventario.Compras.OrdenCompraUnitario" %>
 
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"  type="text/javascript"></script>      
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>
    <script src="../Scripts/alertify.min.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript" language="javascript"  charset="UTF-8"></script>      
    <script src="../Scripts/inputatajos/kibo.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript" src="OrdenCompraUnitario.js" charset="UTF-8"></script>
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"   type="text/css" />     
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo">
        REGISTRO ORDEN DE COMPRA</div>
    <div id="divTabs">
        <ul>
            <li id="liRegistro"><a href="#tabRegistro">Registro</a></li>
            <li id="liConsulta"><a href="#tabConsulta" onclick="getContentTab();">Consulta</a></li>
        </ul>
        <div id="tabRegistro">
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    ORDEN de Compras
                </div>
                <div>
                    <table cellpadding="0" cellspacing="0" class="form-inputs" width="750">
                        <tr>
                            <td style="font-weight: bold">
                               Proveedor
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>                                    
                                        <td style="padding-left: 5px">
                                            <asp:TextBox ID="txtNroRuc" runat="server" Width="70px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" MaxLength="11" onblur="F_ValidaRucDni(); return false;"></asp:TextBox>
                                        </td>
                                        <td id="td_loading" style="font-weight: bold; padding-left: 5px; display: none">
                                            <img src="../Asset/images/loading.gif" />
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtProveedor" runat="server" Width="445px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold; padding-left: 5px">
                                            Distrito
                                        </td>
                                        <td style="padding-left: 10px">
                                            <asp:TextBox ID="txtDistrito" runat="server" Width="326px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>

                                            <td style="display:none;">
                                            <div id="div_tipodocumento">
                                                <asp:DropDownList ID="ddlTipoDocumento" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="78">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Direccion
                            </td>
                            <td>
                                <table>
                                    <tr>
                                        <td>
                                            <asp:TextBox Style="width: 508px; position: absolute; color: blue; font-family: Arial;
                                                font-weight: bold; background: rgb(255, 255, 224);" ID="txtDireccion" runat="server"
                                                autocomplete="off"></asp:TextBox>
                                            <asp:DropDownList ID="ddlDireccion" Style="width: 528px" runat="server">
                                            </asp:DropDownList>
                                        </td>
                                        <td style="font-weight: bold">
                                            Moneda
                                        </td>
                                        <td style="padding-left: 11px">
                                            <div id="div_moneda">
                                                <asp:DropDownList ID="ddlMoneda" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="79">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="font-weight: bold">
                                            Serie
                                        </td>
                                        <td>
                                            <div id="div_Serie">
                                                <asp:DropDownList ID="ddlSerie" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="50">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtNumero" runat="server" Width="60" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold">
                                            Igv
                                        </td>
                                        <td>
                                            <div id="div_igv">
                                                <asp:DropDownList ID="ddlIgv" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="60">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Caja
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                 
                        <td>
                         <div id="div_CajaFisica">
                                                <asp:DropDownList ID="ddlCajaFisica" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="120">
                                                </asp:DropDownList>
                                            </div>
                        </td>
                         <td>
                                            <asp:CheckBox runat="server" ID="chkConIgvMaestro" Text="Con/Igv" onclick="F_ValidarCheckConIgvMaestro(this.id);"
                                                Checked="True" Font-Bold="True" />
                                        </td>
                                        <td>
                                            <asp:CheckBox runat="server" ID="chkSinIgvMaestro" Text="Sin/Igv" onclick="F_ValidarCheckSinIgvMaestro(this.id);"
                                                Font-Bold="True" />
                                        </td>
                                      
                              <td style="font-weight: bold">
                                Emision
                            </td>
                                        <td style="padding-left: 3px;">
                                             <asp:TextBox ID="txtEmision" runat="server" Width="50px" CssClass="Jq-ui-dtp" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True" ReadOnly="True"></asp:TextBox>
                                        </td>
                                        
                                        <td style="font-weight: bold">
                                            condicion pago
                                        </td>
                                        <td>
                                            <div id="div_formapago">
                                                <asp:DropDownList ID="ddlFormaPago" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="80">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                   <td style="font-weight: bold">
                                            NRO. OP.
                                        </td>
                                        <td style="padding-left: 15px;">
                                             <asp:TextBox ID="txtNroOperacion" runat="server" Width="75px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>
                                       
                                    
                                        <td style="padding-left: 4px;font-weight: bold">
                                            total
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtTotal" runat="server" Width="80px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" ReadOnly="True" Text="0.00" CssClass="Derecha"></asp:TextBox>
                                        </td>
                                         <td>
                                            <div>
                                                <asp:Label ID="Label1" runat="server" Text="T.C." Font-Bold="True"></asp:Label>
                                                <asp:Label ID="lblTC" runat="server" Text="Label" Font-Bold="True"></asp:Label>
                                            </div>
                                        </td>
                                             <td>
                                            <asp:CheckBox runat="server" ID="chkCosteable" Text="NO COSTEABLE" Font-Bold="True" />
                                        </td>
                                            <td style="font-weight: bold;display:none;">
                                            SubTotal
                                        </td>
                                        <td style="font-weight: bold; padding-left: 1px;display:none;">
                                            <asp:TextBox ID="txtSubTotal" runat="server" Width="80px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" ReadOnly="True" Text="0.00" CssClass="Derecha"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold;display:none;">
                                            Igv
                                        </td>
                                        <td style="padding-left: 12px;display:none;">
                                            <asp:TextBox ID="txtIgv" runat="server" Width="80px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" ReadOnly="True" Text="0.00" CssClass="Derecha"></asp:TextBox>
                                        </td>
                                        <td style="display: none">
                                            <div id="div_Categoria">
                                                <asp:DropDownList ID="ddlCategoria" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="135">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="display: none">
                                            <asp:CheckBox ID="chkPercepcion" runat="server" Text="Percepcion" Font-Bold="True" />
                                        </td>
                                        <td style="display: none;">
                                            <asp:TextBox ID="txtGuia" runat="server" Width="278px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>
                                        <td style="display: none;">
                                            <asp:TextBox ID="txtFechaIngreso" runat="server" Width="55px" CssClass="Jq-ui-dtp"
                                                Font-Names="Arial" ForeColor="Blue" Font-Bold="True" ReadOnly="True"></asp:TextBox>
                                        </td>
                                        <td style="display: none;">
                                            <asp:TextBox ID="txtPeriodo" runat="server" Width="37px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" CssClass="MesAnioPicker" ReadOnly="true"></asp:TextBox>
                                        </td>
                                          <td style="font-weight: bold;display:none;">
                                            <asp:CheckBox runat="server" ID="chkFacturaAntigua" Text="Ft. Ant." Font-Bold="True" />
                                        </td>
                                             <td style="font-weight: bold; display: none;">
                                            vcto
                                        </td>
                                        <td style="display: none;">
                                            <asp:TextBox ID="txtVencimiento" runat="server" Width="50px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" ReadOnly="True"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                       
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">
                            </td>
                            <td align="right">
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="display: none;">
                                            <div id="div_clasificacion">
                                                <asp:DropDownList ID="ddlClasificacion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="115">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="font-weight: bold; padding-left: 5px; display: none;">
                                            descuento
                                        </td>
                                        <td style="display: none;">
                                            <asp:TextBox ID="txtDsctoTotal" runat="server" Width="65px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" ReadOnly="True" Text="0.00" CssClass="Derecha"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold; display: none;">
                                            Monto
                                        </td>
                                        <td style="display: none;">
                                            <asp:TextBox ID="txtMonto" runat="server" Width="80px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" Text="0.00" CssClass="Derecha"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:Button ID="btnNuevo" runat="server" Text="Nuevo (F1)" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnAgregarProducto" runat="server" Text="Agregar (F2)" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnVentas" runat="server" Text="Ventas (F3)" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnEliminar" runat="server" Text="Eliminar (F5)" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnGrabar" runat="server" Text="Grabar (F6)" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                </div>
            </div>
            <div style="padding-top: 5px;">
               <table cellpadding="0" cellspacing="0" align="center">
                                    <tr>
                                        <td style="font-weight: bold">
                                           Cantidad de Registros:
                                        </td>
                                        <td style="font-weight: bold">
                                            <label id="lblCantidadRegistro"></label>
                                        </td>                                
                                    </tr>
                                </table>
            </div>
            <div id="div_grvDetalleArticulo" >
                <asp:GridView ID="grvDetalleArticulo" runat="server" AutoGenerateColumns="False"
                    border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                    Width="1017px">
                    <Columns>
                       <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                         <HeaderTemplate>
                                                                <asp:CheckBox ID="checkAll" runat="server" onclick="checkAll(this);" />
                                                            </HeaderTemplate>
                            <ItemTemplate>
                                <asp:CheckBox runat="server" ID="chkEliminar" CssClass="chkDelete" Text="" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="CodigoProducto" HeaderText="Codigo">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="Producto">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblProducto" Text='<%# Bind("Producto") %>'></asp:Label>
                                <asp:HiddenField ID="hfCodArticulo" runat="server" Value='<%# Bind("CodArticulo") %>' />
                                <asp:HiddenField ID="hfCodDetalle" runat="server" Value='<%# Bind("CodDetalle") %>' />
                            </ItemTemplate>
                        </asp:TemplateField>     
                        <asp:TemplateField HeaderText="Cantidad" ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:TextBox runat="server" ID="txtCantidad" Width="75px" Font-Bold="true" Style="text-align: center;"
                                    CssClass="ccsestilo" Font-Names="Arial" ForeColor="Blue" Text='<%# Bind("Cantidad") %>'
                                    onblur="F_ActualizarCantidad(this.id); return false;"></asp:TextBox>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="UM" HeaderText="UM">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="Precio" ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:TextBox runat="server" ID="txtPrecio" Width="75px" Font-Bold="true" Style="text-align: center;"
                                    Font-Names="Arial" CssClass="ccsestilo" ForeColor="Blue" Text='<%# Bind("Precio") %>'
                                    onblur="F_ActualizarPrecio(this.id); return false;"></asp:TextBox>
                            </ItemTemplate>
                        </asp:TemplateField>        

                              <asp:TemplateField HeaderText="Importe">
                            <ItemStyle HorizontalAlign="Right" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblimporte" Text='<%# Bind("Importe") %>'   CssClass="detallesart"></asp:Label>
                     
                            </ItemTemplate>
                        </asp:TemplateField> 
                    </Columns>
                </asp:GridView>
            </div>
        </div>
        <div id="tabConsulta">
            <div id='divConsulta' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    Criterio de busqueda
                </div>
                <div class="ui-jqdialog-content">
                    <table cellpadding="0" cellspacing="0" class="form-inputs">
                        <tbody>
                            <tr>
                                <td style="font-weight: bold;">
                                    Serie
                                </td>
                                <td>
                                    <div id="div_SerieConsulta">
                                        <asp:DropDownList ID="ddlSerieConsulta" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" Width="60">
                                        </asp:DropDownList>
                                    </div>
                                </td>
                                <td>
                                    <asp:CheckBox ID="chkNumero" runat="server" Text="Numero" Font-Bold="True" />
                                </td>
                                <td>
                                    <asp:TextBox ID="txtNumeroConsulta" runat="server" Width="45" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                </td>
                                <td>
                                    <asp:CheckBox ID="chkRango" runat="server" Text="Fecha" Font-Bold="True" />
                                </td>
                                <td>
                                    <asp:TextBox ID="txtDesde" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtHasta" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                </td>
                                <td>
                                    <asp:CheckBox ID="chkCliente" runat="server" Text="Proveedor" Font-Bold="True" />
                                </td>
                                <td>
                                    <asp:TextBox ID="txtClienteConsulta" runat="server" Width="320" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                </td>
                                <td style="font-weight: bold">
                                    ESTADO
                                </td>
                                <td>
                                    <div id="div_Estado">
                                        <asp:DropDownList ID="ddlEstado" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" Width="120">
                                        </asp:DropDownList>
                                    </div>
                                </td>
                                <td style="display: none;">
                                    <div id="div_ClasificacionConsulta">
                                        <asp:DropDownList ID="ddlClasificacionConsulta" runat="server" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True" Width="110">
                                        </asp:DropDownList>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:Button ID="btnBuscarConsulta" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                </div>
            </div>
              <div style="padding-top: 5px;">
               <table cellpadding="0" cellspacing="0" align="center">
                                    <tr>
                                        <td style="font-weight: bold">
                                           Cantidad de Registros:
                                        </td>
                                        <td style="font-weight: bold">
                                            <label id="lblGrillaConsulta"></label>
                                        </td>                                
                                    </tr>
                                </table>
            </div>
            <div id="div_consulta">
                <asp:GridView ID="grvConsulta" runat="server" AutoGenerateColumns="False" border="0"
                    CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="1018px"
                    OnRowDataBound="grvConsulta_RowDataBound">
                    <Columns>   
                        <asp:TemplateField>
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgEliminarDocumento" ImageUrl="~/Asset/images/EliminarBtn.png"
                                    ToolTip="ELIMINAR ORDEN DE COMPRA" OnClientClick="F_EliminarRegistro(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField>
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgAnularDocumento" ImageUrl="~/Asset/images/Eliminar.jpg"
                                    ToolTip="ANULAR ORDEN DE COMPRA" OnClientClick="F_AnularPopUP(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField>
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgReemplazar" ImageUrl="~/Asset/images/Reemplazo.png"
                                    ToolTip="ACTUALIZAR ORDEN DE COMPRA" OnClientClick="F_ReemplazarDocumento(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>

                        <asp:TemplateField HeaderText="" Visible="true">
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgPdf" ImageUrl="~/Asset/images/pdf.png" ToolTip="VISUALIZAR PDF"
                                    OnClientClick="F_ImprimirFacturaPDF(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>

                         <asp:TemplateField HeaderText="" Visible="true">
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgExcel" ImageUrl="~/Asset/images/excel.gif" ToolTip="EXEL"
                                    OnClientClick="F_ExcelOrdenCompra(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>

                        <asp:TemplateField HeaderText="A">
                            <ItemTemplate>
                                <img id="imgMasAuditoria" alt="" style="cursor: pointer" src="../Asset/images/plus.gif"
                                    onclick="imgMasAuditoria_Click(this);" title="Auditoria" />
                                <asp:Panel ID="pnlOrdersAuditoria" runat="server" Style="display: none">
                                    <asp:GridView ID="grvDetalleAuditoria" runat="server" border="0" CellPadding="0"
                                        CellSpacing="1" AutoGenerateColumns="False" GridLines="None" class="GridView">
                                        <Columns>
                                            <asp:BoundField DataField="Auditoria" HeaderText="Auditoria">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Left" />
                                            </asp:BoundField>
                                        </Columns>
                                    </asp:GridView>
                                </asp:Panel>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField>
                            <ItemTemplate>
                                <img id="imgMas" alt="" style="cursor: pointer" src="../Asset/images/plus.gif" onclick="imgMas_Click(this);"
                                    title="Ver Detalle" />
                                <asp:Panel ID="pnlOrders" runat="server" Style="display: none">
                                    <asp:GridView ID="grvDetalle" runat="server" border="0" CellPadding="0" CellSpacing="1"
                                        AutoGenerateColumns="False" GridLines="None" class="GridView">
                                        <Columns>
                                            <asp:BoundField DataField="Codigo" HeaderText="Codigo">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Left" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="Producto" HeaderText="Descripcion">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Left" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="Cantidad" HeaderText="Cantidad">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Right" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="CantidadEntregada" HeaderText="Facturado">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Right" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="UM" HeaderText="UM">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Left" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="Precio" HeaderText="Precio">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Right" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="Anexo2" HeaderText="Anexo Ventas">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Left" />
                                            </asp:BoundField>
                                        </Columns>
                                    </asp:GridView>
                                </asp:Panel>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Numero">
                            <ItemStyle HorizontalAlign="Right" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblNumero" Text='<%# Bind("Numero") %>'  CssClass="detallesart"></asp:Label>
                                <asp:HiddenField ID="hfCodTipoDoc" runat="server" Value='<%# Bind("CodTipoDoc") %>' />
                                <asp:HiddenField ID="hfCodMoneda" runat="server" Value='<%# Bind("CodMoneda") %>' />
                                <asp:HiddenField ID="lblCodigo" runat="server" Value='<%# Bind("Codigo") %>' />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="RazonSocial" HeaderStyle-HorizontalAlign="Center">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblcliente" Text='<%# Bind("RazonSocial") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="Emision" HeaderText="Emision">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>                  
                        <asp:BoundField DataField="Condicion" HeaderText="Condicion">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Vcto" HeaderText="Vcto">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>
                         <asp:BoundField DataField="FechaCancelacion" HeaderText="Cancel.">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Moneda" HeaderText="Mon">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Total" HeaderText="Total">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:BoundField DataField="TipoCambio" HeaderText="TC">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="Estado" HeaderStyle-HorizontalAlign="Center">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblEstado" Text='<%# Bind("Estado") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                            <asp:BoundField DataField="Costeable" HeaderText="Costeable">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>
                    </Columns>
                </asp:GridView>
            </div>
        </div>
    </div>
    <div id="divFacturacionOC" style="display: none;">
        <table cellpadding="0" cellspacing="0" width="850">
            <tr>
                <td align="right" style="padding-top: 10px;">
                    <asp:Button ID="btnDevolverItemOC" runat="server" Text="Devolver" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnAgregarItemOC" runat="server" Text="Agregar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                </td>
            </tr>
            <tr>
                <td style="padding-top: 5px;">
                    <div id="div_DetalleOC">
                        <asp:GridView ID="grvDetalleOC" runat="server" AutoGenerateColumns="False" border="0"
                            CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="860px">
                            <Columns>
                                <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                                    <ItemTemplate>
                                        <asp:CheckBox runat="server" ID="chkEliminar" CssClass="chkDelete" Text="" onclick="F_ValidarCheck_OC(this.id);" />
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="ID">
                                    <ItemStyle HorizontalAlign="Center" />
                                    <ItemTemplate>
                                        <asp:Label runat="server" ID="lblCodDetalle" Text='<%# Bind("CodDetalle") %>'></asp:Label>
                                        <asp:HiddenField ID="hfCodDetDocumentoVenta" runat="server" Value='<%# Bind("CodDetDocumentoVenta") %>' />
                                        <asp:HiddenField ID="hfCodArticulo" runat="server" Value='<%# Bind("CodArticulo") %>' />
                                        <asp:HiddenField ID="hfCodUndMedida" runat="server" Value='<%# Bind("CodUndMedida") %>' />
                                        <asp:HiddenField ID="hfCodMovimiento" runat="server" Value='<%# Bind("CodMovimiento") %>' />
                                        <asp:HiddenField ID="hfSerieDocSust" runat="server" Value='<%# Bind("SerieDocSust") %>' />
                                        <asp:HiddenField ID="hfNumeroDocSust" runat="server" Value='<%# Bind("NumeroDocSust") %>' />
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:BoundField DataField="Fecha" HeaderText="Fecha">
                                    <HeaderStyle HorizontalAlign="Center" />
                                    <ItemStyle HorizontalAlign="Left" />
                                </asp:BoundField>
                                <asp:TemplateField HeaderText="Numero">
                                    <ItemStyle HorizontalAlign="Right" />
                                    <ItemTemplate>
                                        <asp:Label runat="server" ID="lblNumero" Text='<%# Bind("Numero") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Codigo">
                                    <ItemStyle HorizontalAlign="Left" />
                                    <ItemTemplate>
                                        <asp:Label runat="server" ID="lblCodigo" Text='<%# Bind("Codigo") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:BoundField DataField="Producto" HeaderText="Descripcion">
                                    <HeaderStyle HorizontalAlign="Center" />
                                    <ItemStyle HorizontalAlign="Left" />
                                </asp:BoundField>
                                <asp:TemplateField HeaderText="Compra">
                                    <ItemStyle HorizontalAlign="Right" />
                                    <ItemTemplate>
                                        <asp:Label runat="server" ID="lblCantidad" Text='<%# Bind("Cantidad") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:BoundField DataField="UM" HeaderText="UM">
                                    <HeaderStyle HorizontalAlign="Center" />
                                    <ItemStyle HorizontalAlign="Left" />
                                </asp:BoundField>
                                <asp:TemplateField HeaderText="Cantidad" ItemStyle-HorizontalAlign="Center">
                                    <ItemTemplate>
                                        <asp:TextBox runat="server" ID="txtCantidadEntregada" Width="55px" CssClass="ccsestilo"
                                            Style="text-align: center;" Font-Names="Arial" ForeColor="Blue" Font-Bold="True"
                                            Enabled="False" onblur="F_ActualizarCantidadOC(this.id);"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Precio">
                                    <ItemStyle HorizontalAlign="Right" />
                                    <ItemTemplate>
                                        <asp:Label runat="server" ID="lblPrecio" Text='<%# Bind("Precio") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                            </Columns>
                        </asp:GridView>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div id="divConsultaArticulo" style="display: none;">
        <div id='divCabecera' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                Criterio de busqueda
            </div>
            <div class="ui-jqdialog-content">
                <table cellpadding="0" cellspacing="0" class="form-inputs">
                    <tbody>
                        <tr>
                            <td style="font-weight: bold">
                                Descripcion
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="padding-left: 5px; font-weight: bold">
                                            <asp:CheckBox ID="chkDescripcion" runat="server" Text="descripcion" Font-Bold="True"
                                                Style="display: none;" />
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtArticulo" runat="server" Width="717px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>
                                        <td>
                                            <asp:Button ID="btnBuscarArticulo" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                                Font-Names="Arial" Font-Bold="True" Width="120" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <div class="linea-button">
            </div>







            <div>
                <table>
                    <tr>
                        <td valign="top">
                            <div style="overflow-y: scroll; height: 375px;">
                                <div id="div_grvConsultaArticulo" style="padding-top: 5px">
                                    <asp:GridView ID="grvConsultaArticulo" runat="server" AutoGenerateColumns="False"
                                        border="0" CellPadding="0" CellSpacing="1" CssClass="GridView GridView-MaxHeight"
                                        GridLines="None" Width="970px" OnRowDataBound="grvConsultaArticulo_RowDataBound">
                                        <Columns>
                                            <asp:TemplateField>
                                                <ItemTemplate>
                                                    <asp:ImageButton runat="server" ID="imgAgregar" ImageUrl="~/Asset/images/ok.gif"
                                                        ToolTip="Agregar" OnClientClick="F_AgregarArticulo(this.id,1); return false;" />
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                    
                                            <asp:TemplateField HeaderText="Código" Visible="false">
                                                <ItemStyle Font-Bold="true" />
                                                <ItemTemplate>
                                                    <asp:Label runat="server" ID="hlkCodNeumaticoGv" Text='<%# Bind("CodigoInterno") %>' Font-Size="Medium"></asp:Label>
                                                    <asp:HiddenField ID="lblcodproducto" runat="server" Value='<%# Bind("CodProducto") %>' />
                                                    <asp:HiddenField ID="hfcodunidadventa" runat="server" Value='<%# Bind("CodUnidadVenta") %>' />
                                                    <asp:HiddenField ID="hfcosto" runat="server" Value='<%# Bind("Costo") %>' />
                                                    <asp:HiddenField ID="lblPrecio1" runat="server" Value='<%# Bind("Precio1") %>' />
                                                    <asp:HiddenField ID="lblPrecio2" runat="server" Value='<%# Bind("Precio2") %>' />
                                                    <asp:HiddenField ID="lblPrecio3" runat="server" Value='<%# Bind("Precio3") %>' />                                                    
                                                    <asp:HiddenField ID="hfDescripcion" runat="server" Value='<%# Bind("Descripcion") %>' />                                             
                                                    <asp:HiddenField ID="hfCodigoAlternativo" runat="server" Value='<%# Bind("Codigo2") %>' />
                                                    <asp:HiddenField ID="hfFlagProductoInicial" runat="server" Value='<%# Bind("FlagProductoInicial") %>' />
                                                    <asp:HiddenField ID="hfMoneda" runat="server" Value='<%# Bind("Moneda") %>' />
                                                    <asp:HiddenField ID="hfStock" runat="server" Value='<%# Bind("Stock") %>' />
                                                    <asp:HiddenField ID="hfCodigoInterno" runat="server" Value='<%# Bind("CodigoInterno") %>' />
                                                    <asp:HiddenField ID="hfCodProductoAzure" runat="server" Value='<%# Bind("CodProductoAzure") %>' />
                                                    <asp:HiddenField ID="hfDetalleCargado" runat="server" Value='0' />
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                    
                                    
                         <%--                  <asp:TemplateField HeaderText="Descripcion" HeaderStyle-HorizontalAlign="Center">
                                                <ItemStyle HorizontalAlign="Left" />
                                                <ItemTemplate>
                                                    <asp:HyperLink runat="server" ID="lblProducto" Font-Underline="true" ForeColor="Blue" Font-Size="Medium"
                                                        Style="cursor: hand" Text='<%# Bind("Descripcion") %>' onclick="F_AgregarArticuloFromDsc(this.id); return false;">
                                                    </asp:HyperLink>
                                                </ItemTemplate>
                                            </asp:TemplateField>--%>


                                            
                          <asp:TemplateField HeaderText="Descripcion">
                                      <ItemStyle HorizontalAlign="Left" />
                                                <ItemTemplate>
                                                    <asp:Label runat="server" ID="lblProducto" Text='<%# Bind("Descripcion") %>' Font-Size="12PX"></asp:Label>
                                                </ItemTemplate>
                                 </asp:TemplateField>





<%--                             <asp:TemplateField HeaderText="Descripcion" ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:TextBox runat="server" ID="txtDescripcion" Font-Bold="true" CssClass="ccsestilo"
                                    Width="480px" Font-Names="Arial" ForeColor="Blue" Text='<%# Bind("Producto") %>'
                                    onchange="F_ActualizarDescripcionNP(this.id); return false;"></asp:TextBox>
                            </ItemTemplate>
                            <ItemStyle HorizontalAlign="Center"></ItemStyle>
                        </asp:TemplateField>
--%>


                                                  <asp:TemplateField HeaderText="Marca">
                                                <ItemStyle HorizontalAlign="Left" />
                                                <ItemTemplate>
                                                    <asp:Label runat="server" ID="lblMarca" Text='<%# Bind("Marca") %>' Font-Size="12PX"></asp:Label>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderText="Stock">
                                                <ItemStyle HorizontalAlign="Center" />
                                                <ItemTemplate>
                                                    <asp:Label runat="server" ID="lblstock" Text='<%# Bind("Stock") %>' Font-Size="12PX"></asp:Label>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderText="UM">
                                                <ItemStyle HorizontalAlign="Center" />
                                                <ItemTemplate>
                                                    <asp:Label runat="server" ID="lblUM" Text='<%# Bind("UM") %>'></asp:Label>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:BoundField DataField="Costo" HeaderText="Costo">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Right" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="Moneda" HeaderText="Mon">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Center" />
                                            </asp:BoundField>                                     
                                        </Columns>
                                    </asp:GridView>
                                </div>
                            </div>
                        </td>
                        <td valign="top">
                          
                            <div id="div_ultimoprecio">
                                <div class="ui-jqdialog-content">
                                    <div class="ui-jqdialog-content">
                                        <%--COMBO--%>
                                        <div id="divcombo">
                                            <%--<asp:Label runat="server" ID="lblID" Text='<%# Bind("ID") %>'></asp:Label>--%>
                                            <asp:Label runat="server" ID="lbCodProducto" Text=""></asp:Label>
                                            <asp:Label runat="server" ID="lbCodNeumatico" Text=""></asp:Label>
                                            <asp:TextBox ID="txtClienteDropTop" runat="server" Width="227px" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True" ReadOnly="true"></asp:TextBox>
                                            <asp:DropDownList ID="ddlDropTop" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True">
                                                <asp:ListItem Text="Top 5" Value="5"></asp:ListItem>
                                                <asp:ListItem Text="Top 10" Value="10"></asp:ListItem>
                                                <asp:ListItem Text="Top 15" Value="15"></asp:ListItem>
                                            </asp:DropDownList>
                                            <asp:Button ID="btnBuscarTop" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                                Font-Names="Arial" Font-Bold="True" Width="120" />
                                        </div>
                                        <%--GRID CON LOS ULTIMOS PRECIOS--%>
                                        <div id="div_grvConsultaUltimosPrecios" style="padding-top: 5px;">
                                            <asp:GridView ID="grvConsultaUltimosPrecios" runat="server" AutoGenerateColumns="False"
                                                border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                                                Width="227px">
                                                <Columns>
                                                    <asp:BoundField DataField="Precio" HeaderText="Precio Unitario">
                                                        <HeaderStyle HorizontalAlign="Center" />
                                                        <ItemStyle HorizontalAlign="Right" />
                                                    </asp:BoundField>
                                                    <asp:BoundField DataField="Moneda" HeaderText="Moneda">
                                                        <HeaderStyle HorizontalAlign="Center" />
                                                        <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>
                                                    <asp:BoundField DataField="Cantidad" HeaderText="Cantidad" Visible="false">
                                                        <HeaderStyle HorizontalAlign="Center" />
                                                        <ItemStyle HorizontalAlign="Right" />
                                                    </asp:BoundField>
                                                    <asp:BoundField DataField="Fecha" HeaderText="Fecha" Visible="false">
                                                        <HeaderStyle HorizontalAlign="Center" />
                                                        <ItemStyle HorizontalAlign="Right" />
                                                    </asp:BoundField>
                                                    <asp:BoundField DataField="Factura" HeaderText="Factura" Visible="false">
                                                        <HeaderStyle HorizontalAlign="Center" />
                                                        <ItemStyle HorizontalAlign="Right" />
                                                    </asp:BoundField>
                                                </Columns>
                                            </asp:GridView>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="linea-button">
            </div>
            <div class="ui-jqdialog-content">
                <table cellpadding="0" cellspacing="0" class="form-inputs">
                    <tbody>
                        <tr>
                            <td style="font-weight: bold">
                                Codigo
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:TextBox ID="txtCodigoProductoAgregar" runat="server" Width="425px" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True" ReadOnly="true" Font-Size="16"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold">
                                            Stock
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtStockAgregar" runat="server" Width="100px" Font-Names="Arial"
                                                CssClass="Derecha" ForeColor="Blue" Font-Bold="True" ReadOnly="true" Font-Size="16"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold">
                                            UM
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtUMAgregar" runat="server" Width="100px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" ReadOnly="true" Font-Size="16"></asp:TextBox>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                          
                            <td colspan='2'>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>

  <td style="font-weight: bold;">
                                <asp:CheckBox ID="chkServicios" runat="server" Text="Servicios" Font-Bold="True" style = "display:none;" />
                            </td>
                                        <td>
                                            <asp:TextBox ID="txtArticuloAgregar" runat="server" Width="700px" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True" Font-Size="16"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold">
                                            Cantidad
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtCantidad" runat="server" Width="40px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" CssClass="Derecha" Font-Size="16"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold">
                                            costo
                                        </td>
                                        <td>
                                            <asp:TextBox Style="width: 80px; color: blue; font-family: Arial; font-weight: bold;
                                             background: rgb(255, 255, 224);" ID="txtPrecioDisplay" runat="server" CssClass="Derecha" Font-Size="16"></asp:TextBox>
                                            <%--                                            <asp:DropDownList ID="ddlPrecio" Style="width: 100px" runat="server" Font-Size="16">
                                                <asp:ListItem Value="test1">test1</asp:ListItem>
                                                <asp:ListItem Value="test2">test2</asp:ListItem>
                                            </asp:DropDownList>--%>
                                        </td>
                                        <td style="font-weight: bold">
                                            <asp:Label ID="lblMonedaAgregar" runat="server" Text="" Font-Bold="True"></asp:Label>
                                        </td>
                                        <td>
                                            <asp:Button ID="btnAgregar" runat="server" Text="Agregar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                                Font-Names="Arial" Font-Bold="True" Width="120" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div id="div_Mantenimiento" style="display: none;">
        <div class="ui-jqdialog-content">
            <table cellpadding="0" cellspacing="0" class="form-inputs">
                <tr>
                    <td colspan="2">
                        <asp:Button ID="btnGrabarEdicion" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" />
                    </td>
                </tr>
                <tr>
                    <td style="padding-top: 10px;" colspan='2'>
                        <table>
                            <tr>
                                <td style="font-weight: bold">
                                    Periodo
                                </td>
                                <td>
                                    <asp:TextBox ID="txtPeriodoConsulta" runat="server" Width="75px" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True" CssClass="MesAnioPicker" ReadOnly="true"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="divFacturarVentas" style="display: none;">
        <table cellpadding="0" cellspacing="0" width="850">
            <tr style="padding-top: 20px;">
                <td style="font-weight: bold">
                    Tipo Doc
                </td>
                <td>
                    <table cellpadding="0" cellspacing="0">
                        <tr>
                            <td>
                                <div id="div_TipoDocVentas">
                                    <asp:DropDownList ID="ddlTipoDocVentas" runat="server" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" Width="85px">
                                        <asp:ListItem Value="1">FACTURA</asp:ListItem>
                                        <asp:ListItem Value="2">BOLETA</asp:ListItem>
                                        <asp:ListItem Value="16">NOTA DE VENTA</asp:ListItem>
                                    </asp:DropDownList>
                                </div>
                            </td>
                            <td style="font-weight: bold; padding-left: 5px;">
                                Serie
                            </td>
                            <td>
                                <div id="div_SerieDocVentas">
                                    <asp:DropDownList ID="ddlSerieDocVentas" runat="server" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True">
                                    </asp:DropDownList>
                                </div>
                            </td>
                            <td style="padding-left: 5px;">
                                <asp:CheckBox ID="chkNumeroVentas" runat="server" Text="Numero" Font-Bold="True" />
                            </td>
                            <td style="padding-left: 5px;">
                                <asp:TextBox ID="txtNumeroDocVentas" runat="server" Width="40" Font-Names="Arial"
                                    ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                            </td>
                            <td style="padding-left: 5px;">
                                <asp:CheckBox ID="chkFechaVentas" runat="server" Text="Fecha" Font-Bold="True" Checked="True" />
                            </td>
                            <td style="padding-left: 5px;">
                                <asp:TextBox ID="txtDesdeVentas" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                            </td>
                            <td style="padding-left: 5px;">
                                <asp:TextBox ID="txtHastaVentas" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                            </td>
                            <td style="font-weight: bold; padding-left: 5px;">
                                VENDEDOR
                            </td>
                            <td style="padding-left: 5px;">
                                <div id="div_EmpleadoConsulta">
                                    <asp:DropDownList ID="ddlEmpleadoConsulta" runat="server" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" Width="115">
                                    </asp:DropDownList>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr align="right">
                <td style="padding-top: 10px;" colspan='2'>
                    <table cellpadding="0" cellspacing="0">
                        <tr>
                            <td>
                                <asp:Button ID="btnBuscarVentas" runat="server" Text="BUSCAR" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                    Font-Names="Arial" Width="120" />
                            </td>
                            <td>
                                <asp:Button ID="btnAgregarVentas" runat="server" Text="Agregar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                    Font-Names="Arial" Width="120" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="padding-top: 5px;" colspan='2'>
                    <div id="div_Ventas">
                        <asp:GridView ID="grvVentas" runat="server" AutoGenerateColumns="False" border="0"
                            CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="860px">
                            <Columns>
                                <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                                    <ItemTemplate>
                                        <asp:CheckBox runat="server" ID="chkEliminar" CssClass="chkDelete" Text="" onclick="F_ValidarCheck_OC(this.id);" />
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:BoundField DataField="Fecha" HeaderText="Fecha">
                                    <HeaderStyle HorizontalAlign="Center" />
                                    <ItemStyle HorizontalAlign="Right" />
                                </asp:BoundField>
                                <asp:TemplateField HeaderText="Numero">
                                    <ItemStyle HorizontalAlign="Left" />
                                    <ItemTemplate>
                                        <asp:Label runat="server" ID="lblNumero" Text='<%# Bind("Numero") %>'></asp:Label>
                                        <asp:HiddenField ID="hfCodArticulo" runat="server" Value='<%# Bind("CodArticulo") %>' />
                                        <asp:HiddenField ID="hfCodUndMedida" runat="server" Value='<%# Bind("CodUndMedida") %>' />
                                        <asp:HiddenField ID="hfCodMovimiento" runat="server" Value='<%# Bind("CodMovimiento") %>' />
                                        <asp:HiddenField ID="hfSerieDoc" runat="server" Value='<%# Bind("SerieDoc") %>' />
                                        <asp:HiddenField ID="hfNumeroDoc" runat="server" Value='<%# Bind("NumeroDoc") %>' />
                                        <asp:HiddenField ID="hfCostoUnitario" runat="server" Value='<%# Bind("CostoUnitario") %>' />
                                        <asp:HiddenField ID="hfCodDetalle" runat="server" Value='<%# Bind("CodDetalle") %>' />
                                        <asp:HiddenField ID="hfCodTipoDoc" runat="server" Value='<%# Bind("CodTipoDoc") %>' />
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Codigo">
                                    <ItemStyle HorizontalAlign="Left" />
                                    <ItemTemplate>
                                        <asp:Label runat="server" ID="lblCodigo" Text='<%# Bind("Codigo") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Descripcion">
                                    <ItemStyle HorizontalAlign="Left" />
                                    <ItemTemplate>
                                        <asp:Label runat="server" ID="lblProducto" Text='<%# Bind("Producto") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Cantidad">
                                    <ItemStyle HorizontalAlign="Right" />
                                    <ItemTemplate>
                                        <asp:Label runat="server" ID="lblCantidad" Text='<%# Bind("Cantidad") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:BoundField DataField="UM" HeaderText="UM">
                                    <HeaderStyle HorizontalAlign="Center" />
                                    <ItemStyle HorizontalAlign="Left" />
                                </asp:BoundField>
                                <asp:TemplateField HeaderText="Cantidad" ItemStyle-HorizontalAlign="Center">
                                    <ItemTemplate>
                                        <asp:TextBox runat="server" ID="txtCantidadEntregada" Width="55px" Font-Bold="true"
                                            CssClass="ccsestilo" Style="text-align: center;" Font-Names="Arial" onblur="F_ActualizarCantidadOC(this.id);"
                                            ForeColor="Blue" Enabled="False"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Costo" ItemStyle-HorizontalAlign="Center">
                                    <ItemTemplate>
                                        <asp:TextBox runat="server" ID="txtPrecioVenta" Width="55px" Font-Bold="true" CssClass="ccsestilo"
                                            Style="text-align: center;" Font-Names="Arial" onblur="F_ValidarVentas(this.id);"
                                            ForeColor="Blue" Enabled="False"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateField>
                            </Columns>
                        </asp:GridView>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div id="div_Anulacion" style="display: none;">
        <div class="ui-jqdialog-content">
            <table cellpadding="0" cellspacing="0">
                <tr>

                <td  style="font-weight: bold">
                ORDEN DE COMPRA
                </td>
                <td style="font-weight: bold">
                       <label id="lblfactanu"></label>
                    </td>
                 
                  
                </tr>
                <tr>
                   <td  colspan='2' style="font-weight: bold">
                        ¿ PORQUE LO ESTAS ANULANDO ?
                    </td>
                </tr>
                <tr>
                  <td colspan='2'>
                           <asp:TextBox ID="txtObservacionAnulacion" runat="server" Width="450px" Font-Names="Arial"
                        ForeColor="Blue" Font-Bold="True" TextMode="MultiLine" Rows="10"  Height="80"></asp:TextBox>
                    </td>
                 
                </tr>
                <tr>
                   <td colspan='2' style="font-weight: bold;padding-top:5px;"  align="right">
                        <asp:Button ID="btnAnular" runat="server" Text="Anular" class="ui-button ui-widget
    ui-state-default ui-corner-all ui-button-text-only" Font-Names="Arial" Font-Bold="True" Width="120" />
                    </td>
                </tr>
            </table>
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
    <input id="hfCodCtaCte" type="hidden" value="0" />
    <input id="hfCodCtaCteConsulta" type="hidden" value="0" />
    <input id="hfCodigoTemporal" type="hidden" value="0" />
    <input id="hfCodDocumentoVenta" type="hidden" value="0" />
    <input id="hfCodFacturaAnterior" type="hidden" value="0" />
    <input id="hfNroRuc" type="hidden" value="0" />
    <input id="hfCliente" type="hidden" value="0" />
    <input id="hfCodDireccion" type="hidden" value="0" />
    <input id="hfCodDepartamento" type="hidden" value="0" />
    <input id="hfCodProvincia" type="hidden" value="0" />
    <input id="hfCodDistrito" type="hidden" value="0" />
    <input id="hfDistrito" type="hidden" value="0" />
    <input id="hfFlagReemplazotmp" type="hidden" value="0" />
    <%--solo sirve para el momento en que se esta reemplazando y asignando las direcciones.... se cambia a cero cuando ya se fijo su direccion--%>
    <input id="hfCodProductoAgregar" type="hidden" value="0" />
    <input id="hfMenorPrecioAgregar" type="hidden" value="0" />
    <input id="hfCostoAgregar" type="hidden" value="0" />
    <input id="hfCodUmAgregar" type="hidden" value="0" />
    <input id="hfurlapisunat" type="hidden" value="0" />
    <input id="hftokenapisunat" type="hidden" value="0" />
    <input id="hfEstado" type="hidden" value="0" />
    <input id="hfNumero" type="hidden" value="0" />
    <input id="hfcliente_grilla" type="hidden" value="0" />
    <input id="hfCodigo" type="hidden" value="0" />
</asp:Content>
