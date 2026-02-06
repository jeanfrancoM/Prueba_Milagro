class TabulatorComponent extends HTMLElement {

    _tabulator = null;
    _columns = null;
    _data = null;
    _lColumns = null;
    _searchAmount = false;


  constructor( { divContainer, data, columns, tabulatorTitle, showRowCount, rowsCountTitle, selectable, rowMenu, maxHeight, search, searchInAllSources, downloadMethods, pdfDownloadProps, onInitLoadData, onFinishLoadData, onFinishRender, pagination, groupBy, showDataTree, showTopBar = true }) {
    super();

    //REGULACION/NORMALIZACION DE PARAMETROS
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    showRowCount = (showRowCount != null && showRowCount != undefined) ? showRowCount : false; 
    selectable = (selectable != null && selectable != undefined) ? selectable : false; 
    //si busca por todos los campos de la tabla, tanto visibles como ocultos
    searchInAllSources = (searchInAllSources != null && searchInAllSources != undefined) ? searchInAllSources : false; 
    downloadMethods = (downloadMethods != null && downloadMethods != undefined) ? downloadMethods : false; 
    pdfDownloadProps = (pdfDownloadProps != null && pdfDownloadProps != undefined) ? pdfDownloadProps : { name: "data.pdf", orientation: "l", title: "Data", unit: "pt", format: [1600, 1210], compress: true, margin: [40, 40, 40, 40] }; 
    pagination = (pagination != null && pagination != undefined) ? pagination : false; 
    showDataTree = (showDataTree != null && showDataTree != undefined) ? showDataTree : false; 
    
    

    //ASIGNACION DE PROPIEDADES
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    const _this = this
    this._columns = columns;
    this._data = data;


    //CONSTRUCCION DE COLUMNS PARA BUSQUEDA
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    this._lColumns = [];
    this._columns.forEach(col => {
        if (col["field"] != undefined) {
            this._lColumns.push(col["field"])
        } else if (col["columns"] != undefined) {
            col["columns"].forEach(subcol => {
                this._lColumns.push( subcol["field"])
            });   
        }
    });

    if (searchInAllSources == true) {
        if (Object.values(data).length > 0) { 
            const firstData = Object.keys(Object.values(data)[0]).forEach(col => { 
                const existe = this._lColumns.find(x => x == col);
                if (existe == undefined) this._lColumns.push(col);
            });
        }
    }


    //LIMPIEZA CONTAINER PRINCIPAL
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    $("#" + divContainer).empty();


    //NOMBRE DE DIVS DE TRABAJO
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    const div_TopBar_Name = divContainer + "_TopBar"; //CONTENEDOR PRINCIPAL DE LA BARRA SUPERIOR

    //ROW1 CONTENEDOR DEL TITULO Y BARRA DE DESCARGA Y SEARCH
    const div_row_1_Name = divContainer + "_TopBar_row1"; //CONTENEDOR ROW1 -- AQUI VA EL TITULO Y LA BARRA SEARCH
    const div_row_1_div1_Name = divContainer + "_TopBar_row1_div1"; //AQUI VA EL TITULO
    const div_row_1_div2_Name = divContainer + "_TopBar_row1_div2"; //AQUI VA EL CONTENEDOR DEL SEARCH
    const div_row_1_div2_Search_Name = divContainer + "_TopBar_row1_div2_search"; //AQUI VA EL CONTENEDOR DEL SEARCH
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    //::     ROW1-DIV1: TITULO                        ::::    ROW1-DIV2: SEARCH  => ROW1-DIV2-SEARCH    ::
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    //::                                          CANTIDAD DE ROWS                                      ::
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    //ROW2 CANTIDAD DE REGISTROS
    const div_row_2_Name = divContainer + "_TopBar_row2"; //CONTENEDOR ROW2 -- CANTIDAD DE REGISTROS
    

    //CONSTRUCCION DE LA BARRA SUPERIOR (TOPBAR)
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
   
/// <reference path="../Asset/images/ajax-loader2.gif" />


    //ROW1 DIV1 - TITULO DEL TABULATOR
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    let _tabulatorTitle = "";
    if (tabulatorTitle != null && tabulatorTitle != undefined) {
        if (tabulatorTitle.trim() != "") {
            _tabulatorTitle = tabulatorTitle.trim();
        } else {
            _tabulatorTitle = "&nbsp;";
        }
    } else {
        _tabulatorTitle = "&nbsp;";
    }

    $("#" + div_row_1_div1_Name).append('<span class="tabulatorTitle" style="font-weight: bold; color: #497494; font-size: 15px;" >' + _tabulatorTitle + '</span>');


    //ROW1 DIV2 - BARRA DE EXPORTACION
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    


    //ROW1 DIV2 - BARRA DE SEARCH
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
  

    //APPEND LOADING CARGANDO...
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------
    $("#" + div_row_2_Name).empty();
    if (showRowCount == true) {
        $("#" + div_row_2_Name).append('<div><span class="tabulator-cantidadregistros"><img src="../Asset/images/loading.gif" alt="Cargando..." width="8" height="8"> Cargando...</span></div>');
    }

    //BUID TABULATOR
    //-----------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------

    //para ver cuanto fila quiere q se muestre en la tabla
    const divTabulatorName = divContainer + "_Tabulator"
    $("#" + divContainer).append('<div id="' + divTabulatorName + '" class="tabulator-custom" ></div>');
    if (maxHeight != null && maxHeight != undefined) {
        $("#" + divTabulatorName).css('max-height', maxHeight.toString() + "px");
    } else {
        // Si maxHeight no se proporciona, puedes establecer una altura predeterminada
        $("#" + divTabulatorName).css('max-height', '300px'); // Ajusta la altura predeterminada según sea necesario
    }

    var tabulatorProps = {
        layout:"fitColumns",
        columns: columns,
        data: [],
        renderVerticalBuffer:maxHeight, //set virtual DOM buffer to 300px
        renderHorizontal:"virtual",
        columnDefaults: {
            tooltip: true,         //show tool tips on cells
        },
        tooltipsHeader: true,
        selectable: selectable,
        rowContextMenu: rowMenu,
        groupBy: groupBy,
        groupHeader:function(value, count, data, group){
            //value - the value all members of this group share
            //count - the number of rows in this group
            //data - an array of all the row data objects in this group
            //group - the group component for the group
            return "<span style='font-size:0.75rem; color:#0030db;'>" + value + "</span><span style='font-size:0.75rem; color:#0030db; margin-left:20px;'>(" + count + " item)</span>";
        },
        groupToggleElement:"header",
    };

    if (pagination == true) {
        tabulatorProps["pagination"] = "local";       //paginate the data
        var rowsPerPage = Math.floor(((maxHeight - 115) / 20) + 0.13) ;
        tabulatorProps["paginationSize"] = rowsPerPage;    //allow 7 rows per page of data
        tabulatorProps["paginationCounter"] = "rows"; //display count of paginated rows in footer   
    }

    if (showDataTree == true) {
        tabulatorProps["dataTree"] = true;
        tabulatorProps["dataTreeStartExpanded"] = true;
    } 

    this._tabulator = new Tabulator("#" + divTabulatorName, tabulatorProps);

    this._tabulator.on("dataProcessed", function(){
        onFinishLoadData();
    });

    this._tabulator.on("dataLoading", function(data){
        onInitLoadData();
    });

    this._tabulator.on("dataLoaded", function(data){
    });

    this._tabulator.on("renderStarted", function(){
        onInitLoadData();
    });

    this._tabulator.on("renderComplete", function(){
        
    });


    //subscribe to event
    setTimeout(() => {  
        this._tabulator.setData(data).then(function(){

            //ROW2 - MOSTRAR CANTIDAD DE ROWS DE LA DATA
            //-----------------------------------------------------------------------------------------------------------
            //-----------------------------------------------------------------------------------------------------------
            $("#" + div_row_2_Name).empty();
            if (showRowCount == true) {
                let cantidadRows = 0        
                let _RowsCountTitle = "Cant. de Registros: "
                try { cantidadRows = data.length; formatNumber(cantidadRows); } catch (e) { }
                try { if (rowsCountTitle != null && rowsCountTitle != undefined) _RowsCountTitle = rowsCountTitle; } catch (e) { }
                $("#" + div_row_2_Name).append('<span class="tabulator-cantidadregistros" style="color: #0860a3 ;font-size: 11px ;;">' + _RowsCountTitle + cantidadRows + '</span>');
            } else {
                $("#" + div_row_2_Name).attr("style", "display:none");
            }

            onFinishRender();
            return;
        });
    }, 100);
  }



  updateData(newData) {
    _tabulator.updateData(newData)
    return true;
  }

}

customElements.define("mi-app-element", TabulatorComponent);