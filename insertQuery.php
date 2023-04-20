<?php 
    $empresa = $_POST['bussiness'];
    $interesado = $_POST['interested'];
    $correo = $_POST['mail'];
    $fecha = $_POST['date'];
    $hora = $_POST['time']; 

    $conexion = mysqli_connect("localhost","root","","citasregistradas")or die("Error: Error en la conexion con la base de datos");

    mysqli_query($conexion,"insert into citasregistradas(empresa,representante,correo,fecha,hora) values ('$empresa','$interesado','$correo','$fecha','$hora,')")or die("Error en el insert");
    
    echo "realizado";
    
?>