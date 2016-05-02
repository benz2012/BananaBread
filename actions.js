$(function(){

	$('.section-controller').click(function(){
		var id = $(this).attr('id')
		var idNum = id.substr(id.length - 1);

		var section = '#sec' + idNum;
		$(section).toggle();

		if( $(section).is(':visible') ) {
		    $(this).addClass('active');
		}
		else {
			$(this).removeClass('active');   
		}
	});

	$(document).on({
	    mouseenter: function () {
	    	if ($(this).hasClass('glyphicon-star-empty')) {
	    		$(this).removeClass('glyphicon-star-empty');
	    		$(this).addClass('glyphicon-star');
	    	}
	    	else if ($(this).hasClass('glyphicon-star') && !$(this).hasClass('saved')) {
	    		$(this).removeClass('glyphicon-star');
	    		$(this).addClass('glyphicon-star-empty');
	    	};
	    },
	    mouseleave: function() {
	    	if ($(this).hasClass('glyphicon-star-empty')) {
	    		$(this).removeClass('glyphicon-star-empty');
	    		$(this).addClass('glyphicon-star');
	    	}
	    	else if ($(this).hasClass('glyphicon-star') && !$(this).hasClass('saved')) {
	    		$(this).removeClass('glyphicon-star');
	    		$(this).addClass('glyphicon-star-empty');
	    	};
	    }
	}, ".glyphicon");

	$(document).on({
		click: function() {
			if ($(this).hasClass('glyphicon-star')) {
				if ($(this).hasClass('saved')) {
					$(this).removeClass('saved');
					removeArticle();
				}
				else {
					$(this).addClass('saved');
					saveArticle($(this).parent());
				};	
			};
		}
	}, ".glyphicon");

	function saveArticle(obj){
		var title = obj[0].childNodes[1].childNodes[0].nodeValue;
		var descrip = obj[0].childNodes[1].childNodes[2].childNodes[0].nodeValue;
		var myData = {"title": title, "descrip": descrip}

		if (typeof(Storage) !== "undefined") {
			if (localStorage.articles) {
				var currentArray = JSON.parse(localStorage.getItem("articles"));
			} else {
				var currentArray = [];
			}
			currentArray.push(myData);
			localStorage.setItem("articles", JSON.stringify(currentArray));
		};
	}

});

