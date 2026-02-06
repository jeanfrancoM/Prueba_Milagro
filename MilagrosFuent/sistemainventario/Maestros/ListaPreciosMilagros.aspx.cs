using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.OleDb;
using System.Data.Common;
using System.Data.SqlClient;
using System.Data;
using CapaNegocios;
using CapaEntidad;
using SistemaInventario.Clases;
using System.Collections;
using System.Configuration;
using System.Web.Services;
using OfficeOpenXml;
using System.IO;

namespace SistemaInventario.Maestros
{
    public partial class ListaPreciosMilagros : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            String Menu = Request.QueryString["Mn"]; String Opcion = Request.QueryString["Op"];
            //if (Menu == null | (_menu != Menu | _opcion != Opcion) | Utilitarios.Menu.F_PermisoOpcion(_menu, _opcion) == false)
            //{
            //    Response.Redirect("../Maestros/TipoCambio.aspx");
            //    return;
            //}

            //Utilitarios.Menu.ModificarAccesos((System.Web.UI.WebControls.Menu)Master.FindControl("NavigationMenu"), Convert.ToInt32((Session["CodUsuario"])));

            Utilitarios.Menu.EstablecerPermisos(int.Parse(Session["CodUsuario"].ToString()));
            Utilitarios.Menu.ModificarAccesos((System.Web.UI.WebControls.Menu)Master.FindControl("NavigationMenu"), Convert.ToInt32((Session["CodUsuario"])));

            if (!IsPostBack)
            {
                //P_Inicializar_GrillaVacia_DetalleArticulo();
                //P_Controles_Inicializar();
            }
        }

        protected void btnImport_Click(object sender, EventArgs e)
        {           
            string Mensaje = "";
            Label1.Text = "";
            HiddenField1.Value = DateTime.Now.ToString("yyyyMMddHHmmss");
            string MensajeErrorCarga;
            GenerarExcel(out MensajeErrorCarga);
            if (MensajeErrorCarga == "")
            {
                ProcedimientoTrasladar(ref Mensaje);
                Label1.Text = Mensaje;
            }
        }

        protected void btnFormato_Click(object sender, EventArgs e)
        { 
             
        DocumentoVentaCabCE objEntidad = null;
        DocumentoVentaCabCN objOperacion = null;

        objOperacion = new DocumentoVentaCabCN();
        objEntidad = new DocumentoVentaCabCE();
        DataTable dtTabla = null;

            dtTabla=objOperacion.F_ObtenerFormato();

        using(ExcelPackage pck = new ExcelPackage())
        {

            ExcelWorksheet ws = pck.Workbook.Worksheets.Add("VENTAS");

        if (dtTabla.Rows.Count == 0)
        {
            DataRow dr = dtTabla.NewRow();
            for (int i = 0; i < dtTabla.Columns.Count; i++)
            {
                dr[i] = "";
            } dtTabla.Rows.Add(dr);

        }
        else
        {
            ws.Cells["A1"].LoadFromDataTable(dtTabla, true);
            ws.Cells[ws.Dimension.Address].AutoFitColumns();
        }

        using (MemoryStream ms = new MemoryStream())
        {
            pck.SaveAs(ms);
            ms.Position = 0;

            Response.Clear();
            Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            Response.AddHeader("Content-Disposition", "attachment; filename=CargaListaPrecios.xlsx");
            Response.BinaryWrite(ms.ToArray());
            Response.Flush();
            HttpContext.Current.ApplicationInstance.CompleteRequest();
        
           }

        }
     }


        protected void btnNuevo_Click(object sender, EventArgs e)
        {
            HiddenField1.Value = "0";
         
            //Label1.Text = "";
            btnImport.Enabled = true;
            FileUpload1.Enabled = true;


            Response.Redirect(Request.RawUrl);
        }

    
        private void GenerarExcel(out string MensajeError)
        {
            MensajeError = "";
            string ExcelContentType = "application/vnd.ms-excel";
            string Excel2010ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            if (FileUpload1.HasFile)
            {
                if (FileUpload1.PostedFile.ContentType == ExcelContentType || FileUpload1.PostedFile.ContentType == Excel2010ContentType)
                {
                    string path;
                    string excelConnectionString;
                    string Cadena;
                    try
                    {
                        path = string.Concat(Server.MapPath("~/Temporales/"), FileUpload1.FileName);
                        FileUpload1.SaveAs(path);
                   
                        excelConnectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=Excel 8.0", path);
                        Cadena = string.Format("Select [Codigo],[Descripcion],[UM],[PLISTAFOBDOLAR],[PLISTAFOBSOL],[VENTAXMAYOR],[INCLUYEIGVMAYOR],[VENTAXMENOR],[INCLUYEIGVMENOR],[UBICACION]," + HiddenField1.Value + " AS IDPruebasExcelCab,'" + FileUpload1.FileName + "' AS NombreArchivo FROM [{0}] ", "VENTAS$");
                        
                        using (OleDbConnection connection = new OleDbConnection(excelConnectionString))
                        {
                            OleDbCommand command = new OleDbCommand(Cadena, connection);

                            connection.Open();

                            using (DbDataReader dr = command.ExecuteReader())
                            {
                                string sqlConnectionString = ConfigurationManager.ConnectionStrings["BDCONEXION"].ConnectionString;
                                using (SqlBulkCopy bulkCopy = new SqlBulkCopy(sqlConnectionString))
                                {
                                    bulkCopy.DestinationTableName = "LISTAPRECIOSMILAGROSEXCEL";
                                    bulkCopy.ColumnMappings.Add("[Codigo]", "Codigo");
                                    bulkCopy.ColumnMappings.Add("[Descripcion]", "Descripcion");
                                    bulkCopy.ColumnMappings.Add("[UM]", "UM");
                                    bulkCopy.ColumnMappings.Add("[PLISTAFOBDOLAR]", "PLISTAFOBDOLAR");
                                    bulkCopy.ColumnMappings.Add("[PLISTAFOBSOL]", "PLISTAFOBSOL");
                                    bulkCopy.ColumnMappings.Add("[VENTAXMAYOR]", "VENTAXMAYOR");
                                    bulkCopy.ColumnMappings.Add("[INCLUYEIGVMAYOR]", "INCLUYEIGVMAYOR");
                                    bulkCopy.ColumnMappings.Add("[VENTAXMENOR]", "VENTAXMENOR");
                                    bulkCopy.ColumnMappings.Add("[INCLUYEIGVMENOR]", "INCLUYEIGVMENOR");
                                    bulkCopy.ColumnMappings.Add("[UBICACION]", "UBICACION");
                                    bulkCopy.ColumnMappings.Add("[IDPruebasExcelCab]", "IDPruebasExcelCab");
                                    bulkCopy.ColumnMappings.Add("[NombreArchivo]", "NombreArchivo");
                                    bulkCopy.WriteToServer(dr);
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        try
                        {
                            MensajeError = "Error en la lectura del excel. <p></p> " +
                                            "Descripción: " + ex.Message.ToString() + " <p></p>  <p></p> " +
                                            " debe tener cuenta que las columnas deben estar identificadas de la siguiente manera:  <p></p> " +
                                            " <b>[A]=Codigo, [B]=Descripcion, [C]=UM, [D]=Precio</b>";
                            Label1.Text = MensajeError;
                        }
                        catch (Exception exx)
                        { }


                    }
                }
            }
        }

        private void ProcedimientoTrasladar(ref string Mensaje)
        {
            DocumentoVentaCabCE objEntidad = null;
            DocumentoVentaCabCN objOperacion = null;

            objEntidad = new DocumentoVentaCabCE();

            objEntidad.IDPruebasExcelCab = Convert.ToInt64(HiddenField1.Value);

            objOperacion = new DocumentoVentaCabCN();

            objOperacion.F_ListaPreciosMilagrosExcel_ACTUALIZARPRODUCTOS(objEntidad);

            Mensaje = objEntidad.MsgError;
        }
    }
}
