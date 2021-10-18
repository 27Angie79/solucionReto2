function consultar(){
    $.ajax({    
            url : 'https://g09437f63923553-baseprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
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
                var tabla = "<left><table border='1'><tr><th>ID</th><th>MENSAJE</th></tr>";
                var filas = "";
                for(i = 0;  i < json.items.length; i++){
                   filas += "<tr>";
                   filas +="<td>"+json.items[i].id+"</td>";
                   filas +="<td>"+json.items[i].mensaje+"</td>";
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
            url : 'https://g09437f63923553-baseprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message/'+idConsultar,

            type : 'GET',
            dataType : 'json',
            
            error : function(xhr, status) {
                alert('Ha sucedido un problema.');
            },
            complete : function(xhr, status) {
                alert('Petición realizada.');
            },
            success : function(json) {
                $("#mensaje").val(json.items[0].name);
                console.log(json);
            }
        });
}

function guardar(){
   
    var misDatos = {
        id: $("#id").val(),
        mensaje: $("#mensaje").val(),
    }
    var datoConvertido = JSON.stringify(misDatos);
$.ajax({    
    url : 'https://g09437f63923553-baseprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
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
        mensaje: $("#mensaje").val(),
    }
    var datoConvertido = JSON.stringify(misDatos);
$.ajax({    
    url : 'https://g09437f63923553-baseprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
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
        mensaje: $("#mensaje").val(),
    }
    var datoConvertido = JSON.stringify(misDatos);
$.ajax({    
    url : 'https://g09437f63923553-baseprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
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
    $("#mensaje").val("");
}

function soloLectura(){
    $("#id").prop("readonly",false);
}

