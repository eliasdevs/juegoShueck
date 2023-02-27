$(document).ready(function(){	 
	let imagenes = ["burro.jpg", "dragona.jpeg","encantador.png","fiona.jpg","gatoconbotas.png","Lord_Farquaad.jpeg"];			
	var lista1=[];var lista2=[]; var parejasencontradas=[];//almaneca las posiciones de las 6 imagenes en el vector imagenes
	var tmp1,tmpX1,tmp2,tmpX2;//contiene la imagen 1 y 2 al clickear
	var tmpValor1, tmpValor2,tmpComparador;
	var tmpContador=10;
	$("#intentos").text(tmpContador);	
	function crear_lista(){
		var tmp= []; 
		contador=1;
		do{
			var numeroAleatorio=(Math.floor((Math.random() * 6) +1))-1;												
			if (tmp.includes(numeroAleatorio)==false) {								
				tmp.push(numeroAleatorio);			
				contador++;					
			}	
		}while(contador<=6);
		return tmp;

	}
	function imprimir_imagen(arreglo1, arreglo2){
		var contadorCeldas=0;
		for (var i = 0; i <=5; i++) {
			var col1 = $('<div/>', {
				'class' : 'col',
				'identificativo'    : arreglo1[i],
				'contador':contadorCeldas++ 
			});
			var col2 = $('<div/>', {
				'class' : 'col',
				'identificativo'    : arreglo2[i],
				'contador':contadorCeldas++
			});

			var img1=$('<img/>', {
				'class' : 'imgPersonaje',
				'src'    : 'personajes/'+imagenes[arreglo1[i]] 
			});
			var img2=$('<img/>', {
				'class' : 'imgPersonaje',
				'src'    : 'personajes/'+imagenes[arreglo2[i]] 
			});
			var imgX1=$('<img/>', {
				'class' : 'imgX',
				'src'    : 'personajes/x.jpg' 
			});
			var imgX2=$('<img/>', {
				'class' : 'imgX',
				'src'    : 'personajes/x.jpg' 
			});
			col1.append(img1);			
			col1.append(imgX1);
			$(".row").append(col1);
			col2.append(img2);
			col2.append(imgX2);			
			$(".row").append(col2);
			
		}
		
	}
	lista1=crear_lista();
	lista2=crear_lista();
	imprimir_imagen(lista1,lista2);
	
	//INICIA LOGICA DE CARTAS
	$(".col").click(function(){	
		if (parejasencontradas.includes(this.getAttribute("identificativo"))==false) {
			if (tmpContador>0) {
				if (tmp1==null) {
					tmp1=this.querySelector(".imgPersonaje").style;
					tmp1.display="block";
					tmpX1=this.querySelector(".imgX").style;
					tmpX1.display="none";		
					tmpValor1=this.getAttribute("identificativo");
					tmpComparador=this.getAttribute("contador");
				}else{
					if (tmp2==null) {
						tmp2=this.querySelector(".imgPersonaje").style;
						tmp2.display="block";
						tmpX2=this.querySelector(".imgX").style;
						tmpX2.display="none";	
						tmpValor2=this.getAttribute("identificativo");
						if (tmpComparador==this.getAttribute("contador")) {
							alertify.error('Selecciona otra carta');
							tmp1.display="none";
							tmpX1.display="block";		
							tmp2.display="none";
							tmpX2.display="block";		
							//REINICIO DE VALORES						
							tmpValor1=null,tmpValor2=null,tmp1=null,tmpX1=null,tmp2=null,tmpX2=null;
						}else{
							if (tmp2!=null) {
								if (tmpValor1==tmpValor2) {
									alertify.success('Perfecto');
									parejasencontradas.push(tmpValor2);
									tmpValor1=null,tmpValor2=null,tmp1=null,tmpX1=null,tmp2=null,tmpX2=null;
									if (parejasencontradas.length==6) {
										alertify.alert("Sherk","Felicidades", function(){
											alertify.success('Ganaste');
										});
									}
								}else{			
									alertify.error('Sigue intentando');
									tmp1.display="none";
									tmpX1.display="block";		
									tmp2.display="none";
									tmpX2.display="block";		
							//REINICIO DE VALORES						
							tmpValor1=null,tmpValor2=null,tmp1=null,tmpX1=null,tmp2=null,tmpX2=null;
							tmpContador--;
							$("#intentos").text(tmpContador);
							if (tmpContador==0) {
								alertify.alert("Sherk","UPS!! Se agotaron los intentos", function(){
									$("#cuerpo").prop('disabled',true);
								});
							}
						}
					}
				}				
			}
		}
	}else{
		alertify.error('Has agotado tus intentos');
	}
}
});
	//FINALIZA LOGICA DE CARTAS


});