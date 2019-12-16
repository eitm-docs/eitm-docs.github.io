function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function getBase(l) {
	if (l && isNumeric(l) && l >= 0) {
		var b = "../".repeat(l);
	} else {
		var b = "";
	}
	return b;
}

function getHeader(b, p) {
	return "<h1>Expert-Informed Topic Models for Document Set Discovery [blinded for review]</h1>";
}
				
function getFooter(b, p) {
	return "";
}



function showTab(id) {
	$('#tabL-'+id+' a').tab('show');
	return false;
}

document.addEventListener("DOMContentLoaded", function() {
	var b = getBase(window.linkLevel);
	var p = (/^file/.test(window.location.protocol))?"/index.html":"";
	document.getElementById('header').innerHTML = getHeader(b, p);
	document.getElementById('footer').innerHTML = getFooter(b, p);
	/* make links clickable offline */
	if (/^file/.test(window.location.protocol)) {
		var anchors = document.getElementsByTagName('a');
		for (var i = 0; i < anchors.length; i++) {
			if(anchors[i].dataset.role && anchors[i].dataset.role == "internal") {
				anchors[i].href += '/index.html';
			}			
		}
	}
	
	// Navbar and dropdowns
	var toggle = document.getElementsByClassName('navbar-toggle')[0],
		collapse = document.getElementsByClassName('navbar-collapse')[0],
		dropdowns = document.getElementsByClassName('dropdown'),
		navbar = document.getElementsByClassName('navbar-header')[0];;

	// Toggle if navbar menu is open or closed
	function toggleMenu() {
		collapse.classList.toggle('collapse');
		collapse.classList.toggle('in');
	}
	
	// close menu
	function closeMenu(e) {
		collapse.classList.add('collapse');
		collapse.classList.remove('in');
	}

	// Close all dropdown menus
	function closeMenus() {
		for (var j = 0; j < dropdowns.length; j++) {
			dropdowns[j].getElementsByClassName('dropdown-toggle')[0].classList.remove('dropdown-open');
			dropdowns[j].classList.remove('open');
		}
	}

	// Add click handling to dropdowns
	for (var i = 0; i < dropdowns.length; i++) {
		dropdowns[i].addEventListener('click', function() {
			if (document.body.clientWidth < 768) {
				var open = this.classList.contains('open');
				closeMenus();
				if (!open) {
					this.getElementsByClassName('dropdown-toggle')[0].classList.toggle('dropdown-open');
					this.classList.toggle('open');
				}
			}
		});
	}

	// Close dropdowns when screen becomes big enough to switch to open by hover
	function closeMenusOnResize() {
		if (document.body.clientWidth >= 768) {
			closeMenus();
			collapse.classList.add('collapse');
			collapse.classList.remove('in');
		}
	}

	function redirectClick(e) {
		if(toggle.style.display != 'none') {
			if (!e.target.classList.contains('icon-bar') && !e.target.classList.contains('navbar-toggle')) {
				toggleMenu();
			}
		}
		e.stopPropagation();
	}
	
	// Event listeners
	window.addEventListener('resize', closeMenusOnResize, false);
	navbar.addEventListener('click', redirectClick, false);
	document.addEventListener('click', closeMenu, false);
	toggle.addEventListener('click', toggleMenu, false);
});