
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

	function validarDatos(){
		var empresa = document.getElementById("inputEmpresa").value.toString();
		var interesado = document.getElementById("inputInteresado").value.toString();
		var correo = document.getElementById("inputCorreo").value.toString();
		var fecha = document.getElementById("inputFecha").value;
		var hora = document.getElementById("inputHora").value.toString(); 

		console.log(correo);

		var contadorErrores = 0;

		if(empresa == "" || empresa.length <= 10){
			alertaMensaje("empresa");
			contadorErrores++;
		}

		if(interesado == "" || interesado.length <= 24){
			alertaMensaje("interesado");
			contadorErrores++;
		}

		if(correo == "" || correo <= 15){
			alertaMensaje("correo");
			contadorErrores++;
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
				alert("Fecha Invalida!!");
				contadorErrores++;
			}

		}else{
			contadorErrores++;
		}

		if(!(hora == "")){
			console.log(hora);
			var last = hora.split(":");
			var hora = parseInt(last[0]);
			var min = parseInt(last[1]);
			
			last = hora*60 + min;
			
			console.log(hora*60+min);
			if(!(last>=480 && last<=1020)){
				alert("Hora Inválida, Seleccione una hora entre las 8:00 am y 5:00 pm");
				contadorErrores++;
			}

		}else{
			contadorErrores++;
		}

		if(contadorErrores==0){
			//ajax(empresa, interesado, correo, fecha, hora);
		}else{
			alert("HAY ERRORES");
		}
	}

	function alertaMensaje(mes){
		//Acá se muestra el error visual
		alert(mes);
	}

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
