function ajax(){
    if(window.XMLHttpRequest){xml = new XMLHttpRequest();}else{xml = ActiveXObject("Microsoft.XMLHTTP");}

    var conto = document.getElementById('usuario').value;
    var pass = document.getElementById('contra').value;
    
    var info = "account="+conto+"&newpass="+pass+"&passif="+passiff;

    xml.onreadystatechange =function(){
        if(xml.readyState==4 && xml.status==200){
            var mensaje = xml.responseText;
            
            if(mensaje=="accertare()"){
                //Existe Usuario
                
                document.getElementById("usuario").style.display="none";
                document.getElementById("contrasss").style.display="inline-flex";
                
                result.innerHTML = "";
                
                corretto();
                
                passiff=1;
                
                contra.focus();
                
                var cuenta= document.getElementById("testodiconta");
                
                var containgresada=document.getElementById("usuario");
                
                cuenta.value= containgresada.value;
                
            }
            else if(mensaje=="Ingrese la cuenta."||mensaje=="Cuenta inexistente, por favor ingrese de nuevo."){
                //No Existe Usuario
                
                result.innerHTML = mensaje;
                scorretto();
            }
            else{
                //Contraseña Responde
                
                if(mensaje=="Contraseña incorrecta, ingrese de nuevo."){
                    result.innerHTML = mensaje;
                    scorretto();
                }else{
                    
                    corretto();
                    document.getElementById("forme").submit();
                }
                
            }
        }
    }

    xml.open("POST","esistente.php",true);
    xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xml.send(info);
}