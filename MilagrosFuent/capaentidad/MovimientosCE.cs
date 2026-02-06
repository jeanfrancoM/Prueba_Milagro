using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class MovimientosCE
{
   
    public int CodMovimiento { get; set; }
    public int CodEmpresa { get; set; }
    public int CodAlmacen { get; set; }
    public int CodOrdenCompra { get; set; }
    public int CodTraslado { get; set; }
    public int CodTipoDocNota { get; set; }
    public string SerieNota { get; set; }
    public string NumeroNota { get; set; }
    public int CodCtaCte { get; set; }
    public int CodTipoDoc { get; set; }
    public string SerieDocPro { get; set; }
    public string NumeroDocPro { get; set; }
    public int CodOrdenTrabajo { get; set; }
    public string SerieDocOT { get; set; }
    public string NumeroDocOT { get; set; }
    public int CodTipoOperacion { get; set; }
    public int CodProducto { get; set; }
    public int CodMoneda { get; set; }
    public decimal TipoCambio { get; set; }
    public decimal CantidadIng { get; set; }
    public decimal CostoCompra { get; set; }
    public decimal CantidadSal { get; set; }
    public decimal ValorVenta { get; set; }
    public int CodUndMedidaIng { get; set; }
    public int CodUndEquv { get; set; }
    public decimal CantxEquivalencia { get; set; }
    public int NroMesAnio { get; set; }
    public int CodEstado { get; set; }
    public int CodUsuario { get; set; }
    public DateTime FechaRegistro { get; set; }
    public int CodUsuarioAnul { get; set; }
    public DateTime FechaAnulacion { get; set; }
    public decimal CostoMovimiento { get; set; }
    public DateTime Desde { get; set; }
    public DateTime Hasta { get; set; }
    public string CodAlterno { get; set; }
    public int CodAlmacenFisico { get; set; }
    public string XmlDetalle { get; set; }
    public int Ordenamiento { get; set; }


    //VARIABLE DE TABULADOR
    public int id { get; set; }
    public int Codigo { get; set; }
    public string Operacion { get; set; }
    public string Registro { get; set; }
    public string RazonSocial { get; set; }
    public string Numero { get; set; }
    public decimal Costo { get; set; }
    public decimal CostoS { get; set; }
    public string Moneda { get; set; }
    public decimal TC { get; set; }
    public decimal Precio { get; set; }
    public string Inicial { get; set; }


    public string Ingreso { get; set; }

    public string Salida { get; set; }
    public string Final { get; set; }

    public string UM { get; set; }

    public string Anexo { get; set; }
    public string FechaAnexo { get; set; }


    public decimal StockActual { get; set; }
    public decimal SaldoInicial { get; set; }
    public string CodigoSuperior { get; set; }



    public decimal CostoSoles { get; set; }
    public decimal COstoDOLARES { get; set; }
    public decimal UBSOLES { get; set; }
    public decimal UBDOLARES { get; set; }
}
