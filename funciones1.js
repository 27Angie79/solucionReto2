function consultar(){
    $.ajax({    
            url : 'https://g09437f63923553-baseprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume',
            type : 'GET',
            dataType : 'json',
            
            error : function(xhr, status) {
                alert('Ha sucedido un problema.');
            },
            complete : function(xhr, status) {
                alert('Petición realizada.');
            },
            success : function(json) {
                $("#resultado").empty();
                var tabla = "<left><table border='1'><tr><th>ID</th><th>NAME</th><th>BRAND</th><th>MODEL</th><th>CATEGORY ID</th>";
                var filas = "";
                for(i = 0;  i < json.items.length; i++){
                   filas += "<tr>";
                   filas +="<td>"+json.items[i].id+"</td>";
                   filas +="<td>"+json.items[i].brand+"</td>";
                   filas +="<td>"+json.items[i].model+"</td>";  
                   filas +="<td>"+json.items[i].category_id+"</td>";   
                   filas +="<td>"+json.items[i].name+"</td>";   
                   filas += "</tr>";      
                }
                $("#resultado").append(tabla + filas+"</table></left>");
                console.log(json);
            }
        });
}
function consultarId(){
    var idConsultar = $("#id").val();
    $.ajax({    
            url : 'https://g09437f63923553-baseprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume/'+idConsultar,

            type : 'GET',
            dataType : 'json',
            
            error : function(xhr, status) {
                alert('Ha sucedido un problema.');
            },
            complete : function(xhr, status) {
                alert('Petición realizada.');
            },
            success : function(json) {
                $("#brand").val(json.items[0].brand);
                $("#model").val(json.items[0].model);
                $("#category_id").val(json.items[0].category_id);
                $("#name").val(json.items[0].name);
                console.log(json);
            }
        });
}

function guardar(){
    var misDatos = {
        id: $("#id").val(),
        brand: $("#brand").val(),
        model: $("#model").val(),
        category_id: $("#category_id").val(),
        name: $("#name").val(),
    }
    var datoConvertido = JSON.stringify(misDatos);
$.ajax({    
    url : 'https://g09437f63923553-baseprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
    data : datoConvertido,
    type : 'POST',
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    statusCode : {201:function(json, textStatus, xhr) {
        alert('Guardado.');
        limpiarFormulario();
        consultar();
    }},
});
}

function editarInformacion(){
    var misDatos = {
        id: $("#id").val(),
        brand: $("#brand").val(),
        model: $("#model").val(),
        category_id: $("#category_id").val(),
        name: $("#name").val(),
    }
    var datoConvertido = JSON.stringify(misDatos);
$.ajax({    
    url : 'https://g09437f63923553-baseprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
    data : datoConvertido,
    type : 'PUT',
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    statusCode : {201:function(json, textStatus, xhr) {
        alert('Guardado.');
        limpiarFormulario();
        consultar();
    }},
});
}

function borrarId(){
    var misDatos = {
        id: $("#id").val(),
        brand: $("#brand").val(),
        model: $("#model").val(),
        category_id: $("#category_id").val(),
        name: $("#name").val(),
    }
    var datoConvertido = JSON.stringify(misDatos);
$.ajax({    
    url : 'https://g09437f63923553-baseprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
    data : datoConvertido,
    type : 'DELETE',
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    statusCode : {201:function(json, textStatus, xhr) {
        alert('Guardado.');
        limpiarFormulario();
        consultar();
    }},
    complete : function(xhr, status) {
        alert('Petición realizada.');
        consultar();
    },
    error : function(xhr, status) {
        alert('Ha sucedido un problema.');
        consultar();
    },
});
}

function validarCampo(campo){
    if(campo.val() != "")
        return true
    else
        return false;

}

function limpiarFormulario(){
    $("#id").val("");
    $("#brand").val("");
    $("#model").val("");
    $("#category_id").val("");
    $("#name").val("");
}

function soloLectura(){
    $("#id").prop("readonly",false);
}

