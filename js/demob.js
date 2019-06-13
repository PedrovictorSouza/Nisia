/*$(window).ready(function(){
    $(this).one('mousemove', function() { 
        // mouse move
    }).one('scroll', function(){
        homeAnimation();
    });
});*/

function toggleMenu() {
	if(x.matches) {
		var menuBox = document.getElementById('menu-box');    
		if(menuBox.style.display == "flex") { // if is menuBox displayed, hide it
		menuBox.style.display = "none";
		}
		else { // if is menuBox hidden, display it
		menuBox.style.display = "flex";
		}
	}

	var x = window.matchMedia("(max-width: 700px)")
	myFunction(x) // Call listener function at run time
	x.addListener(myFunction) // Attach listener function on state changes
	
  }
  

{
	setTimeout(() => document.body.classList.add('render'), 60);
	const navdemos = Array.from(document.querySelectorAll('nav.demos > .demo'));
	const total = navdemos.length;
	const current = navdemos.findIndex(el => el.classList.contains('demo--current'));
	const navigate = (linkEl) => {
		document.body.classList.remove('render');
		document.body.addEventListener('transitionend', () => window.location = linkEl.href);
	};
	navdemos.forEach(link => link.addEventListener('click', (ev) => {
		ev.preventDefault();
		navigate(ev.target);
	}));
	document.addEventListener('keydown', (ev) => {
		const keyCode = ev.keyCode || ev.which;
		let linkEl;
		if ( keyCode === 37 ) {
			linkEl = current > 0 ? navdemos[current-1] : navdemos[total-1];
		}
		else if ( keyCode === 39 ) {
			linkEl = current < total-1 ? navdemos[current+1] : navdemos[0];
		}
		else {
			return false;
		}
		navigate(linkEl);
	});

	imagesLoaded('.glitch__img', { background: true }, () => {
		document.body.classList.remove('loading');
		document.body.classList.add('imgloaded');
	});


	const logo = document.getElementById('logo');
	let navigation = document.getElementsByTagName("li");
}

	var countTotal = 0;
	function rotatePentagon(x) {
		var geral = document.getElementsByClassName("st3");
		var pentagon = document.getElementById('pp');
		var photo = document.getElementById('perfil');

	function profileSelect(nameX,nameY) {
			document.getElementById(nameX).classList.add("st2");
			document.getElementById(nameY).classList.add("st3");	
			document.getElementById('ecossistem__texto').innerHTML = "";
		}

		if (x === 3) {
				profileSelect("path5","text5");
				pentagon.style.transform = 'rotate(-72deg)';
				document.getElementById('cir').setAttribute("cx", 840);
				document.getElementById('cir').setAttribute("cy", 137);
				document.getElementById('ecossistem__texto').innerHTML = "O INÍCIO DO CICLO.<br><br><span class=\"meetings\">Erradicando tabus: tecnologia sem gênero<br><br>Construindo mindset digital a partir de ciencias humanas<br><br>A ponte com o mercado de trabalho<br><br>Como evitar a obsolescência de currículo<br><br>Tolkit didático<br><br></span>";
				photo.src = "./img/nisia.png";
				countTotal++;
				console.log(pentagon);

		} else if (x === 1) {	
				profileSelect("path4","text4");
				pentagon.style.transform = 'rotate(-288deg)';
				document.getElementById('cir').setAttribute("cx", 113);
				document.getElementById('cir').setAttribute("cy", 670);
				document.getElementById('ecossistem__texto').innerHTML = "O DESENVOLVIMENTO<br><br><span class=\"meetings\">Os primeiros passos - os caminhos possíveis. como e por onde começar?<br><br>Tecnologia não é tudo igual<br><br>A importância da multidisciplinaridade<br><br>A dinâmica do conhecimento digital e a necessidade do estudo constante<br><br>O aprender além, muito além, da sala de aula<br><br>As referências</span>";
				photo.src = "./img/malala.png";
				countTotal++;
				console.log(countTotal);
			
		} else if (x === 2){
				profileSelect("path1","text1");
				pentagon.style.transform = 'rotate(0deg)';
				document.getElementById('cir').setAttribute("cx", 285);
				document.getElementById('cir').setAttribute("cy", 137);
				document.getElementById('ecossistem__texto').innerHTML = "O GIVE BACK.<br><br> <span class=\"meetings\">Repassar aprendizado<br><br>O apoio às iniciativas de base<br><br>O contato empresa-escola<br><br>A retroalimentação do ciclo com a observação dos resultados.</span> ";
				countTotal+= 1;
				photo.src = "./img/dorothy.png";
				console.log(countTotal);
		


			
		} else if (x === 0) {
				profileSelect("path3","text3");
				pentagon.style.transform = 'rotate(-216deg)';
				document.getElementById('cir').setAttribute("cx", 570);
				document.getElementById('cir').setAttribute("cy", 1000);
				document.getElementById('ecossistem__texto').innerHTML = "GAME ON<br><br><span class=\"meetings\">O mercado de trabalho tradicional, as startups e o profissional freelancer.<br><br>planejamento de carreira<br><br>a importância de se conhecer as estruturas de um negócio<br><br>as habilidades complementares e indispensáveis<br><br>empatia, atitude e resiliencia</span>";
				countTotal+= 1;
				photo.src = "./img/ada.png";
				console.log(countTotal);

			
		} else if (x === 4) {
				profileSelect("path2","text2");
				pentagon.style.transform = 'rotate(-144deg)';
				document.getElementById('cir').setAttribute("cx", 1017);
				document.getElementById('cir').setAttribute("cy", 670);
				document.getElementById('ecossistem__texto').innerHTML = "O RESULTADO<br><br><span class=\"meetings\"> A compreensão da dinâmica: semear, cuidar, colher, multiplicar<br><br>O entendimento histórico do funcionamento desse mercado: Os tabus, a resistencia, o estereótipo, as desigualdades<br><br>A necessidade de multiplicar talentos e apoiar escolas<br><br>A construção de um ambiente acolhedor<br><br>A marca empregadora e inspiradora</span>";
				countTotal+= 1;
				photo.src = "./img/susan.png";
				console.log(countTotal);
			
		}		
	}

	function homeAnimation() {

		if(window.pageYOffset > 0) {
			window.scrollTo(0,0);
		} else if (window.pageXOffset > 0) {
			window.scrollTo(300,0);
			console.log('por aqui');
		}
		
		var titleNisia = document.getElementById('title_nisia');
		var project = document.getElementById('project');
		titleNisia.style.maxWidth = "8vw";
		titleNisia.style.position = "fixed";
		if ($(window).width() < 960) {
			titleNisia.style.maxWidth = "23vw";
			titleNisia.style.top = "1.5vh";
			titleNisia.style.left = "13vw";
			titleNisia.style.zIndex = "1002";
		 }
		 else {
			titleNisia.style.top = "1.5vh";
			titleNisia.style.left = "5vw";
			titleNisia.style.zIndex = "1002";
		 }

		 $([document.documentElement, document.body]).animate({
			scrollTop: $("#project").offset().top
		}, 300);
		

		setTimeout(function(){ project.classList.add('reveal'); }, 600);
		
		project.style.display = "flex";

		if(window.pageYOffset > 0) {
			window.scrollTo(0,0);
		} else if (window.pageYOffset > 0 && window.pageXOffset > 0) {
			window.scrollTo(-500,0);
		}
	}

	const systemPage = [
		window.innerHeight, // 0
		window.innerHeight * 2 , //1
		window.innerWidth, // 2
		window.innerWidth * 2 //3
	]

	function goEcossistem(y,x) {

		let currentPosX = window.pageXOffset;
		let currentPosY = window.pageYOffset;
		let finalPosX = systemPage[x];
		let finalPosY = systemPage[y];
		let totalPosX = Math.abs(currentPosX - finalPosX);
		let totalPosY = Math.abs(currentPosY - finalPosY);

		window.scrollTo({
			top: totalPosY,
			left: 0,
			behavior: 'smooth'
		  });
		
		  setTimeout(function(){
			window.scrollTo({
				top: stepsSection,
				left: totalPosX,
				behavior: 'smooth'
			  });
		  }, 800)
		console.log(currentPosY + ' c x');
		console.log(finalPosY + ' f x');
		console.log(totalPosY + ' posição x');
	}
	
	function changePhoto() {
		setInterval(function(){ 
		var change = document.getElementsByClassName('glitch__img');
	
	 	if(imageA() === 'ana') {
			for(var i = 0; i < change.length; i++) {
				change[i].style.background = "url(./img/nisia_home_ana.png) no-repeat center";
				change[i].style.backgroundSize = "cover";
			}
		} else {
			for(var i = 0; i < change.length; i++) {
				change[i].style.background = "url(./img/nisia_home.png) no-repeat center";
				change[i].style.backgroundSize = "cover";
			}
		}

		}, 3000);
		
		

	}



	function history() {
		var texto = document.getElementById('texto');
		$('#texto').show('slow');
		$('#yes').css('background-color', 'white');
		$('#yes').css('color', 'red');
	}

	function deactivateHistory() {
		$('#texto').hide('slow');
		$('#yes').css('background-color', 'transparent');
		$('#yes').css('color', 'red');
	}

	function numeroA(min,max) {
		var numero = Math.random() * (max - min) + min;
		console.log(Math.round(numero));
	}

	function imageA() {
		let glitchImgs = ['ana','jonas'];
		var choose = glitchImgs[Math.floor(Math.random() * glitchImgs.length)];
		return choose;

	}

	function fixOffset() {
		window.scrollTo(0,0);
	}

	function start() {
		document.getElementById("#sistema__b").style.color = "red";
	}

	

	changePhoto();






