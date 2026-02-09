using System;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using OfficeOpenXml;
using OfficeOpenXml.Drawing;
using OfficeOpenXml.Style;
using CapaEntidad;
using CapaNegocios;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Globalization;
using System.Drawing;
using Newtonsoft.Json;

namespace SistemaInventario.Reportes
{
    public partial class Excel : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            GridView GridView1 = (GridView)Session["Excel"];

            switch (Convert.ToInt32(Request["CodMenu"]))
            {
                case 1:
                    ExportGridToExcel(Request["Titulo"].ToString(), GridView1);
                    break;
                case 2:
                    P_Pedido();
                    break;
                case 3:
                    P_PedidosDespachados();
                    break;
                case 4:
                    P_PedidosCerrados();
                    break;
                case 5:
                    P_ReporteVentasRanking_Ventas();
                    break;
                case 6:
                    P_OrdenCompra();
                    break;
            }
        }

        //private void P_OrdenCompra()
        //{
        //    NotaIngresoSalidaCabCE obj = new NotaIngresoSalidaCabCE();
        //    NotaIngresoSalidaCabCN cn = new NotaIngresoSalidaCabCN();

        //    obj.CodMovimiento = Convert.ToInt32(Request.QueryString["Codigo"]);
        //    obj.CodTipoFormato = 1;

        //    DataTable dt = cn.F_OrdenCompraCab_VistaPreliminar(obj);
        //    if (dt.Rows.Count == 0)
        //        throw new Exception("No se encontraron datos");

        //    string serie = dt.Rows[0]["SerieDoc"].ToString();
        //    string numero = dt.Rows[0]["NumeroDoc"].ToString();
        //    decimal subtotal = Convert.ToDecimal(dt.Rows[0]["Gravada"]);
        //    decimal igv = Convert.ToDecimal(dt.Rows[0]["Igv"]);
        //    decimal total = Convert.ToDecimal(dt.Rows[0]["Total"]);

        //    string ruta = Server.MapPath(Request.QueryString["NombreArchivo"]);
        //    byte[] fileBytes = File.ReadAllBytes(ruta);

        //    using (ExcelPackage pck = new ExcelPackage())
        //    {
        //        pck.Load(new MemoryStream(fileBytes));
        //        var ws = pck.Workbook.Worksheets[Request.QueryString["NombreHoja"]];

               
        //        ws.DeleteRow(8, 50000, true);

        //        // NUMERO DE ORDEN
        //        ws.Cells["D3:E3"].Merge = true;
        //        ws.Cells["D3:E3"].Value = serie + "-" + numero;
        //        ws.Cells["D3:E3"].Style.Font.Bold = true;
        //        ws.Cells["D3:E3"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

        //        // DETALLE EN FILA 8
        //        DataTable dtDetalle = dt.DefaultView.ToTable(false,
        //            "Cantidad", "Descripcion", "PrecioUnitario", "Importe"
        //        );

        //        ws.Cells["B7"].LoadFromDataTable(dtDetalle, false);


       
        //        ws.Column(3).AutoFit(); 

        //        //   CANTIDAD
        //        ws.Cells["B7:B" + (7 + dtDetalle.Rows.Count - 1)]
        //            .Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

               
        //        ws.Column(4).Style.Numberformat.Format = "#,##0.00";
        //        ws.Column(5).Style.Numberformat.Format = "#,##0.00";
        //        ws.Column(6).Style.Numberformat.Format = "#,##0.00";

        //        // calcular inicial incio
        //        int inicio = 7;                
        //        int columnas = dtDetalle.Rows.Count;
        //        int ultimofila = inicio + columnas;

        //        int Subtotal = ultimofila + 3; //mas 3 por que pidio 3
        //        int Igv = ultimofila + 4;
        //        int Total = ultimofila + 5;

        //        // totales
        //        ws.Cells["D" + Subtotal].Value = "B.I";
        //        ws.Cells["E" + Subtotal].Value = subtotal;

        //        ws.Cells["D" + Igv].Value = "IGV";
        //        ws.Cells["E" + Igv].Value = igv;

        //        ws.Cells["D" + Total].Value = "TOTAL";
        //        ws.Cells["E" + Total].Value = total;
        //        ws.Cells["E" + Total].Style.Font.Bold = true;

            
        //        using (MemoryStream ms = new MemoryStream())
        //        {
        //            pck.SaveAs(ms);
        //            byte[] content = ms.ToArray();

        //            Response.Clear();
        //            Response.ContentType =
        //                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        //            Response.AddHeader("content-disposition",
        //                "attachment; filename=" + Request.QueryString["NombreArchivo"]);
        //            Response.BinaryWrite(content);
        //            Response.End();
        //        }
        //    }
        //}


        private void P_OrdenCompra()
        {
            NotaIngresoSalidaCabCE obj = new NotaIngresoSalidaCabCE();
            NotaIngresoSalidaCabCN cn = new NotaIngresoSalidaCabCN();

            obj.CodMovimiento = Convert.ToInt32(Request.QueryString["Codigo"]);
            obj.CodTipoFormato = 1;

            DataTable dt = cn.F_OrdenCompraCab_VistaPreliminar(obj);
            if (dt.Rows.Count == 0)
                throw new Exception("No se encontraron datos");

            
            string serie = dt.Rows[0]["SerieDoc"].ToString();
            string numero = dt.Rows[0]["NumeroDoc"].ToString();
            string ruc = dt.Rows[0]["Ruc"].ToString();
            string razon = dt.Rows[0]["RazonSocial"].ToString();
            string direccion = dt.Rows[0]["Direccion"].ToString();
            string emision = dt.Rows[0]["Emision"].ToString();
            string vencimiento = dt.Rows[0]["Vencimiento"].ToString();

            decimal subtotal = Convert.ToDecimal(dt.Rows[0]["Gravada"]);
            decimal igv = Convert.ToDecimal(dt.Rows[0]["Igv"]);
            decimal total = Convert.ToDecimal(dt.Rows[0]["Total"]);

            
            string ruta = Server.MapPath(Request.QueryString["NombreArchivo"]);
            byte[] fileBytes = File.ReadAllBytes(ruta);

            using (ExcelPackage pck = new ExcelPackage())
            {
                pck.Load(new MemoryStream(fileBytes));
                var ws = pck.Workbook.Worksheets[Request.QueryString["NombreHoja"]];

                //  
                ws.DeleteRow(18, 5000, true);

            

                // numero oc 
                ws.Cells["D5:E5"].Merge = true;
                ws.Cells["D5:E5"].Value = serie + "-" + numero;
                ws.Cells["D5:E5"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells["D5:E5"].Style.Font.Bold = true;

                // fecha emision 
                ws.Cells["B12"].Value = emision;

                //ruc cliente 
                ws.Cells["B13"].Value = ruc;

                // razonsocial
                ws.Cells["B14"].Value = razon;

                // direccion
                ws.Cells["B15:E15"].Merge = true;
                ws.Cells["B15:E15"].Value = direccion;

                // vencimiento
                ws.Cells["E12"].Value = vencimiento;

            
                DataTable dtDetalle = dt.DefaultView.ToTable(false,
                    "PLACA","Cantidad", "Descripcion", "PrecioUnitario", "Importe"
                );

                int rowStart = 18;

                ws.Cells["A" + rowStart].LoadFromDataTable(dtDetalle, false);

                //  
                ws.Cells["A" + rowStart + ":A" + (rowStart + dtDetalle.Rows.Count - 1)]
                    .Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;


                ws.Cells["B" + rowStart + ":B" + (rowStart + dtDetalle.Rows.Count - 1)]
                  .Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

                // Auto
                //ws.Column(3).AutoFit();

           
                //ws.Column(4).Style.Numberformat.Format = "#,##0.00"; // PU
                //ws.Column(5).Style.Numberformat.Format = "#,##0.00"; // PT

                ws.Cells["D16:E1000"].Style.Numberformat.Format = "#,##0.00";
                ws.Cells["E16:E1000"].Style.Numberformat.Format = "#,##0.00";


    
                int lastRow = rowStart + dtDetalle.Rows.Count;

                int rowBI = lastRow + 3;
                int rowIgv = lastRow + 4;
                int rowTotal = lastRow + 5;

                ws.Cells["D" + rowBI].Value = "B.I";
                ws.Cells["E" + rowBI].Value = subtotal;

                ws.Cells["D" + rowIgv].Value = "IGV";
                ws.Cells["E" + rowIgv].Value = igv;

                ws.Cells["D" + rowTotal].Value = "TOTAL";
                ws.Cells["E" + rowTotal].Value = total;
                ws.Cells["E" + rowTotal].Style.Font.Bold = true;

                using (MemoryStream ms = new MemoryStream())
                {
                    pck.SaveAs(ms);
                    byte[] content = ms.ToArray();

                    Response.Clear();
                    Response.ContentType =
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    Response.AddHeader("content-disposition",
                        "attachment; filename=" + Request.QueryString["NombreArchivo"]);
                    Response.BinaryWrite(content);
                    Response.End();
                }
            }
        }



        private void P_ReporteVentasRanking_Ventas()
        {

            DocumentoVentaCabCE objEntidadVenta = new DocumentoVentaCabCE();
            DocumentoVentaCabCN objOperacionVenta = new DocumentoVentaCabCN();

            objEntidadVenta.CodAlmacen = Convert.ToInt32(Request.QueryString["CodAlmacen"]);
            objEntidadVenta.Ranking = Convert.ToInt32(Request.QueryString["Ranking"]);
            objEntidadVenta.Desde = Convert.ToDateTime(Request.QueryString["Desde"]);
            objEntidadVenta.Hasta = Convert.ToDateTime(Request.QueryString["Hasta"]);

            DataTable dtTabla = objOperacionVenta.F_DOCUMENTOVENTACAB_RANKINGVENTAS_REPORTE(objEntidadVenta);
            dtTabla.TableName = Request.QueryString["NombreArchivo"].ToString();

            string subtitulo = "Desde " + Request.QueryString["Desde"] + " Hasta " + Request.QueryString["Hasta"];


            using (ExcelPackage pck = new ExcelPackage())
            {
                // ExcelWorksheet ws = pck.Workbook.Worksheets.Add(Request.QueryString["NombreHoja"].ToString());

                var filePath = Server.MapPath(Request.QueryString["NombreArchivo"].ToString());
                byte[] fileBytes = File.ReadAllBytes(filePath);  // leemos el archivo desde disco una vez (no lo guardamos)
                pck.Load(new MemoryStream(fileBytes));

                var ws = pck.Workbook.Worksheets[Request.QueryString["NombreHoja"].ToString()];
                ws.DeleteRow(3, 50000, true);

                //ws.Cells["A1"].Value = "RANKING DE VENTAS";
                //ws.Cells["A2"].Value = subtitulo;
                //ws.Cells["A1:B1"].Merge = true;
                //ws.Cells["A1"].Style.Font.Size = 14;
                //ws.Cells["A1"].Style.Font.Bold = true;
                //ws.Cells["A2"].Style.Font.Italic = true;
                //ws.Cells["A2"].Style.Font.Size = 10;
                //ws.Cells["A2"].Style.Font.Color.SetColor(Color.Gray);


                //ws.Cells["A4"].LoadFromDataTable(dtTabla, true);

                DataTable dtFiltrado = dtTabla.DefaultView.ToTable(false,
                    "Posicion", "NroRuc", "RazonSocial", "Total"


                );
                ws.Cells["A3"].LoadFromDataTable(dtFiltrado, false);


                ws.Cells["D:D"].Style.Numberformat.Format = "#,##0.00";



                ws.Cells[ws.Dimension.Address].AutoFitColumns();


                using (MemoryStream ms = new MemoryStream())
                {
                    pck.SaveAs(ms);
                    byte[] content = ms.ToArray();


                    Response.Clear();
                    Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    Response.AddHeader("content-disposition", "attachment; filename=" + Request.QueryString["NombreArchivo"]);
                    Response.BinaryWrite(content);
                    Response.Flush();
                    Response.End();
                }
            }
        }

        public void ExportGridToExcel(String nameReport, GridView wControl)
        {
            Response.Clear();
            Response.Buffer = true;
            Response.ClearContent();
            Response.ClearHeaders();
            Response.Charset = "";
            string FileName = nameReport + DateTime.Now + ".xls";
            StringWriter strwritter = new StringWriter();
            HtmlTextWriter htmltextwrtter = new HtmlTextWriter(strwritter);
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.ContentType = "application/vnd.ms-excel";
            Response.AddHeader("Content-Disposition", "attachment;filename=" + FileName);
            wControl.GridLines = GridLines.Both;
            wControl.HeaderStyle.Font.Bold = true;
            wControl.RenderControl(htmltextwrtter);
            Response.Write(strwritter.ToString());
            Response.End();            
        }

        public void P_Pedido()
        {
            FileInfo newFile = new FileInfo(Server.MapPath("Pedido.xlsx"));

            ExcelPackage pck = new ExcelPackage(newFile);

            var ws = pck.Workbook.Worksheets["Pedido"];

            for (int i = 1; i < 10000; i++)
                ws.DeleteRow(1);

            DocumentoVentaCabCE objEntidad = new DocumentoVentaCabCE();
            DocumentoVentaCabCN objOperacion = new DocumentoVentaCabCN();
            var XmlDetalle = "";

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(Request["XmlDetalle"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodNotaPedido = '" + item.CodNotaPedido + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

            objEntidad.XmlDetalle = XmlDetalle;

            DataTable dtTabla = null;

            dtTabla = objOperacion.F_NotaPedidoDet_ListarAprobados(objEntidad);

            ws.Cells["A1"].LoadFromDataTable(dtTabla, true);          
                        
            String Cadena2  = "A1:E1";
            String Cadena = "A1:E1," + "A" + Convert.ToString(dtTabla.Rows.Count) + ":" + "E" + Convert.ToString(dtTabla.Rows.Count);

            using (var cabecera = ws.Cells[Cadena2]) 
            {
                cabecera.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                cabecera.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                cabecera.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                cabecera.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                System.Drawing.Color colFromHex = System.Drawing.ColorTranslator.FromHtml("#CCCCCC");
                cabecera.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                cabecera.Style.Fill.BackgroundColor.SetColor(colFromHex);
                cabecera.Style.Font.Bold = true;
                cabecera.Style.Font.SetFromFont(new Font("Arial", 11));
                cabecera.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            }

            using (ExcelRange rng = ws.Cells[Cadena])
            {
                rng.Style.Font.Bold = true;
                rng.Style.Font.SetFromFont(new Font("Arial", 10));
                rng.AutoFitColumns();
            }

            pck.Save();
         
            Response.ContentType = "application/octet-stream";
            Response.AppendHeader("Content-Disposition", "attachment; filename=Pedido.xlsx");
            Response.TransmitFile(Server.MapPath("Pedido.xlsx"));
            Response.End();
        }

        public void P_PedidosDespachados()
        {
            FileInfo newFile = new FileInfo(Server.MapPath("PedidosDespachos.xlsx"));

            ExcelPackage pck = new ExcelPackage(newFile);

            var ws = pck.Workbook.Worksheets["Despacho"];

            for (int i = 1; i < 10000; i++)
                ws.DeleteRow(2);

            DocumentoVentaCabCE objEntidad = new DocumentoVentaCabCE();
            DocumentoVentaCabCN objOperacion = new DocumentoVentaCabCN();
            var XmlDetalle = "";

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(Request["XmlDetalle"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodNotaPedido = '" + item.CodNotaPedido + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

            objEntidad.XmlDetalle = XmlDetalle;

            DataTable dtTabla = null;

            dtTabla = objOperacion.F_NotaPedidoDespachos_Listar(objEntidad);

            ws.Cells["A2"].LoadFromDataTable(dtTabla, true);

            ws.DeleteRow(2);

            //String Cadena2 = "A1:E1";
            //String Cadena = "A1:E1," + "A" + Convert.ToString(dtTabla.Rows.Count) + ":" + "E" + Convert.ToString(dtTabla.Rows.Count);

            //using (var cabecera = ws.Cells[Cadena2])
            //{
            //    cabecera.Style.Border.Top.Style = ExcelBorderStyle.Thin;
            //    cabecera.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
            //    cabecera.Style.Border.Left.Style = ExcelBorderStyle.Thin;
            //    cabecera.Style.Border.Right.Style = ExcelBorderStyle.Thin;
            //    System.Drawing.Color colFromHex = System.Drawing.ColorTranslator.FromHtml("#CCCCCC");
            //    cabecera.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
            //    cabecera.Style.Fill.BackgroundColor.SetColor(colFromHex);
            //    cabecera.Style.Font.Bold = true;
            //    cabecera.Style.Font.SetFromFont(new Font("Arial", 11));
            //    cabecera.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            //}

            //using (ExcelRange rng = ws.Cells[Cadena])
            //{
            //    rng.Style.Font.Bold = true;
            //    rng.Style.Font.SetFromFont(new Font("Arial", 10));
            //    rng.AutoFitColumns();
            //}

            pck.Save();

            Response.ContentType = "application/octet-stream";
            Response.AppendHeader("Content-Disposition", "attachment; filename=PedidosDespachos.xlsx");
            Response.TransmitFile(Server.MapPath("PedidosDespachos.xlsx"));
            Response.End();
        }

        public void P_PedidosCerrados()
        {
            FileInfo newFile = new FileInfo(Server.MapPath("PedidosCerrados.xlsx"));

            ExcelPackage pck = new ExcelPackage(newFile);

            var ws = pck.Workbook.Worksheets["Despacho"];

            for (int i = 1; i < 10000; i++)
                ws.DeleteRow(2);

            DocumentoVentaCabCE objEntidad = new DocumentoVentaCabCE();
            DocumentoVentaCabCN objOperacion = new DocumentoVentaCabCN();
            var XmlDetalle = "";

            dynamic jArr2 = Newtonsoft.Json.JsonConvert.DeserializeObject(Request["XmlDetalle"].ToString());

            foreach (dynamic item in jArr2)
            {
                XmlDetalle = XmlDetalle + "<D ";
                XmlDetalle = XmlDetalle + " CodNotaPedido = '" + item.CodNotaPedido + "'";
                XmlDetalle = XmlDetalle + " />";
            }

            XmlDetalle = "<R><XmlLC> " + XmlDetalle + "</XmlLC></R>";

            objEntidad.XmlDetalle = XmlDetalle;

            DataTable dtTabla = null;

            dtTabla = objOperacion.F_NotaPedidoCerrados_Listar(objEntidad);

            ws.Cells["A2"].LoadFromDataTable(dtTabla, true);

            ws.DeleteRow(2);

            pck.Save();

            Response.ContentType = "application/octet-stream";
            Response.AppendHeader("Content-Disposition", "attachment; filename=PedidosCerrados.xlsx");
            Response.TransmitFile(Server.MapPath("PedidosCerrados.xlsx"));
            Response.End();
        }


        public override void VerifyRenderingInServerForm(Control control)
        {
            
        }  
    }
}
