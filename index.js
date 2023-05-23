
	var scroll = window.requestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60) };

	var elementsToShow = document.querySelectorAll('.scrolleable');

	function loop() {
		elementsToShow.forEach(function (element) {
			if (isElementInViewport(element)) {
				element.classList.add('is-visible');
			} else {
				element.classList.remove('is-visible');
			}
		});

		scroll(loop);
	}

	loop();

	function isElementInViewport(el) { 
		if (typeof jQuery === "function" && el instanceof jQuery) {
			el = el[0];
		}
		var rect = el.getBoundingClientRect();
		return (
			(rect.top <= 0 && rect.bottom >= 0)
			||
			(rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
				rect.top <= (window.innerHeight || document.documentElement.clientHeight))
			||
			(rect.top >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
		);
	}

	var slides = document.querySelectorAll('.slide'); 
    var currentSlide = 0;  
    function nextSlide() {   
		
		slides[currentSlide].classList.remove('active');
		slides[currentSlide].classList.add('disabled');	
		currentSlide = (currentSlide + 1) % slides.length;
		
		slides[currentSlide].classList.remove('disabled');
		slides[currentSlide].classList.add('active');

		//Eliminar Rudio
		slides[(currentSlide +slides.length-2) % slides.length].classList.remove('disabled');
    }
	
    setInterval(nextSlide, 5000); 
	var strAlert="";
	function validarDatos(){
		limpiezaErrores();
		strAlert="";
		var empresa = document.getElementById("inputEmpresa").value.toString();
		var interesado = document.getElementById("inputInteresado").value.toString();
		var correo = document.getElementById("inputCorreo").value.toString();
		var fecha = document.getElementById("inputFecha").value;
		var hora = document.getElementById("inputHora").value.toString();  
 

		if(empresa == "" || empresa.length <= 10){
			ErrorVisual("inputEmpresa");
			strAlert+="El nombre de la empresa deberá de ser de por lo menos 10 dígitos de longitud.</br>"; 
		}

		if(interesado == "" || interesado.length <= 24){
			ErrorVisual("inputInteresado");
			strAlert+="El nombre del interesado deberá de ser de por lo menos 24 dígitos de longitud.</br>"; 
		}

		if(correo == "" || correo <= 15){
			ErrorVisual("inputCorreo");
			strAlert+="El correo electrónico deberá de ser de por lo menos 15 dígitos de longitud.</br>"; 
		}

		if(!(fecha == "")){ 

			diasPorMes = [31,29,31,30,31,30,31,31,30,31,30,31];

			var cita = fecha.split("-"); 
			
			var hoy = new Date().toLocaleDateString().split("/"); 

			var yearGap = cita[0]-hoy[2];
			var mesGap = cita[1]-hoy[0];
			var diaGap = cita[2]-hoy[1];
			
			var flag = true;

			if(yearGap>=0){
				if(mesGap>=0){
					
					if(diaGap>=7 && mesGap==0 ){
						//Dia valida
						flag = false;
					}
					if( mesGap>0){
						flag = false;
					}

				}
			}
			
			console.log(yearGap+" / "+mesGap+" / "+diaGap);

			if(flag){ 
				strAlert+="La fecha establecida debe de ser por lo menos 7 días despues del día actual.</br>";
				ErrorVisual("inputFecha"); 
			}

		}else{
			strAlert+="El campo de la fecha no puede estar vacío.</br>";
			ErrorVisual("inputFecha"); 
		}

		if(!(hora == "")){ 
			var last = hora.split(":");
			var hora = parseInt(last[0]);
			var min = parseInt(last[1]);
			
			last = hora*60 + min;
			
			console.log(hora*60+min);
			if(!(last>=480 && last<=1020)){
				ErrorVisual("inputHora");
				strAlert+="La hora seleccionada debe de estar entre las 8:00 am y 5:00 pm.</br>"; 
			}

		}else{
			ErrorVisual("inputHora");
			strAlert+="El campo de la hora no puede estar vacío."; 
		}

		if(strAlert==""){
			//ajax(empresa, interesado, correo, fecha, hora);
			limpiarDatos();
			showAlert("Felicidades","Tu solicitud ha sido procesada de forma correcta","verde");
		}else{
			//Acá desplegar
			showAlert("Tu solicitud tiene algunos errores",strAlert,"rojo");
		}
	}

	function ErrorVisual(idRecibido){
		document.getElementById(idRecibido).classList.add('mistake');	
	}

	function limpiezaErrores(idRecibido){
		if(idRecibido==null){
			arreglo=["inputEmpresa","inputInteresado","inputCorreo","inputFecha","inputHora"]; 

			for(var i=0;i<arreglo.length;i++) { 
				document.getElementById(arreglo[i]).classList.remove('mistake');	 
			}
		}else{
			document.getElementById(idRecibido).classList.remove('mistake');
		}

		
	} 

	function limpiarDatos(){
		document.getElementById("inputEmpresa").value="";
		document.getElementById("inputInteresado").value="";
		document.getElementById("inputCorreo").value="";
		document.getElementById("inputFecha").value="";
		document.getElementById("inputHora").value="";

		limpiezaErrores();
	}

    function showAlert(title,message,color) {
		if(color=="rojo"){
			document.getElementById("custom-alert").style.color="rgb(243, 109, 106);";
		}else{
			document.getElementById("custom-alert").style.color="rgb(90, 222, 53 )";
		}
        var alertElement = document.getElementById('custom-alert');
        
        var messageElement = document.getElementById('alert-message');
        var alertTitle = document.getElementById('alert-title');

        alertTitle.innerText = title;
        messageElement.innerHTML = message;
        alertElement.style.display = 'block';
    }

    function hideAlert() {
        var alertElement = document.getElementById('custom-alert');
        
        alertElement.style.display = 'none';
    }

    var closeButton = document.getElementById('alert-close').addEventListener('click', hideAlert);

	function ajax(empresa, interesado, correo, fecha, hora){
		//Ajax ejecutado
		alert("Se compila!");
		if(window.XMLHttpRequest){xml = new XMLHttpRequest();}else{xml = ActiveXObject("Microsoft.XMLHTTP");} 
		
		var info = "bussiness="+empresa+"&interested="+interesado+"&mail="+correo+"&date="+fecha+"&time="+hora;

		xml.onreadystatechange = function(){
			if(xml.readyState==4 && xml.status==200){
				var mensaje = xml.responseText;
				
				if(mensaje =="realizado"){  
					alert("LOGICA REALIZADA");
				}
				
			}
		}

		xml.open("POST","insertQuery.php",true);
		xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xml.send(info);
	}
