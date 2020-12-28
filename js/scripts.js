



window.onload = function() {
 
/*	ScrollCalculator.ready(); 
*/


	let mDiv = document.querySelector('#magicDiv'); /*main container*/
	let tDiv = document.querySelector('#bText'); /*texts container*/

	var imgArr = ["img/mundaka.jpg","img/Bermeo.jpg", "img/Gernika.jpg", "img/Sj.jpg", "img/Urdaibai.jpg"];
	var currentImg = 0;

	let tHeight = tDiv.offsetHeight; //height of texts container

	 mDiv.style.height = tHeight + 'px';  /*main container's height = texts container height*/


	/*Add a unique id to each span  Ej: sp0, sp1, sp2....*/
	 $("#bText span").each( function( index, element ){
	    $( this ).attr('id','sp' + index);
	});

	/*Last span has an id="lastSpan" */
	var lastSp = $("span").last().attr('id', 'lastSpan');
	 
	let imgFixedActive = false;
	let imgPast = false;
	let rev = false;

	var pos = Math.round(ScrollCalculator.getYCoordinateAt($("#imgFixed"), 'middle','middle'));
	console.log(pos)
	var end = Math.round(ScrollCalculator.getYCoordinateAt($("#lastSpan"), 'bottom','top'));

	var ch1 = Math.round(ScrollCalculator.getYCoordinateAt($("#sp1"), 'top','top'));
	var ch2 = Math.round(ScrollCalculator.getYCoordinateAt($("#sp3"), 'top','top'));
	var ch3 = Math.round(ScrollCalculator.getYCoordinateAt($("#sp4"), 'top','top'));
	var ch4 = Math.round(ScrollCalculator.getYCoordinateAt($("#sp5"), 'top','top'));
	var ch5 = Math.round(ScrollCalculator.getYCoordinateAt($("#lastSpan"), 'top','top'));
  	
  	var lastViewportHeight = window.innerHeight;  // 625
  	var imgHeight = $("#imgFixed")[0].offsetHeight;  //375
  	var imgFixedTop = (lastViewportHeight - imgHeight) / 2;  // 125

	applyScrollStyles();

	//Recalcula la posición de inicio para fixear la imagen si se redimensiona el viewport
	window.addEventListener('resize', function(e) {
		/*console.log("Alto nuevo viewport " + innerHeight);*/
		if(imgFixedActive){
			let scalaPercentage = (window.innerHeight * 100) / lastViewportHeight;
/*			console.log(lastViewportHeight + " -> " + window.innerHeight + " = " + scalaPercentage);
*/			pos = pos * scalaPercentage; 
		}else{
			pos = Math.round(ScrollCalculator.getYCoordinateAt($("#imgFixed"), 'middle','middle'));
		}

		lastViewportHeight = window.innerHeight;
	});



	window.addEventListener('scroll', function(e) { 

		applyScrollStyles();

	}); 

	function applyScrollStyles(){
		var scroll1 = window.scrollY;

		let offset = window.innerHeight * 0.05; //margen del 5% de la altura del viewport
		
		/*We need a scroll range, otherwise this won't work if the user scrolls fast*/
		if(scroll1 > (pos - offset) && scroll1 < (end + offset)){
		/*When #imgFixed reaches the desired position, add position: fixed and top: the current position
			of the element (to avoid jumpings)*/
			if(!imgFixedActive){
				$("#imgFixed").css("top", imgFixedTop); // Fija el contenedor en la mitad de la pantalla
				$("#imgFixed").addClass("fixedEl");
				imgFixedActive = true;
			}
		}else{
			if(imgFixedActive){ // Si estamos fuera del efecto e imgFixedActive es true, es que ya hemos
				// dejado atrás el efecto
				$("#imgFixed").removeClass("fixedEl");
				imgFixedActive = false; // Pasamos el flag a false. Ahora si volvemos a entrar en el efecto
				// se aplicará la primera parte del if (línea 71) y volverá a fixear el elemento
				imgPast = true;
			}
		}



		/*Replace images */

		if(scroll1 > (pos - offset) && scroll1 < (ch1 + offset)){
			$(".imgCont:not(#img1)").css('opacity', 0);
				$('#img1').css('opacity', 1);

		}
		
		if(scroll1 > (ch1 - offset) && scroll1 < (ch2 + offset)){
			$(".imgCont:not(#img2)").css('opacity', 0);
				$('#img2').css('opacity', 1);

		}

		if(scroll1 > (ch2 - offset) && scroll1 < (ch3 + offset)){
			$(".imgCont:not(#img3)").css('opacity', 0);
				$('#img3').css('opacity', 1);

		}

		if(scroll1 > (ch3 - offset) && scroll1 < (ch4 + offset)){
			$(".imgCont:not(#img4)").css('opacity', 0);
				$('#img4').css('opacity', 1);

		}

		if(scroll1 > (ch4 - offset) && scroll1 < (ch5 + offset)){
			$(".imgCont:not(#img5)").css('opacity', 0);
				$('#img5').css('opacity', 1);

		}



		
	}

















};





