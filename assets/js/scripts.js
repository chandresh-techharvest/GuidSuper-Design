
/*===================================*
PAGE JS
*===================================*/

(function($) {
	'use strict';
	
	/*===================================*
	01. LOADING JS
	/*===================================*/
	$(window).on('load', function() {
		var preLoder = $(".lds-ellipsis");
		preLoder.delay(700).fadeOut(700);
		setTimeout(function () {
				$(".preloader").delay(700).fadeOut(700).addClass('loaded');
			}, 800);
	});

	/*===================================*
	02. BACKGROUND IMAGE JS
	*===================================*/
	/*data image src*/
	$(".background_bg").each(function() {
		var attr = $(this).attr('data-img-src');
		if (typeof attr !== typeof undefined && attr !== false) {
			$(this).css('background-image', 'url(' + attr + ')');
		}
	});
	
	/*===================================*
	03. ANIMATION JS
	*===================================*/
	$(function() {
	
		function ckScrollInit(items, trigger) {
			items.each(function() {
				var ckElement = $(this),
					AnimationClass = ckElement.attr('data-animation'),
					AnimationDelay = ckElement.attr('data-animation-delay');
	
				ckElement.css({
					'-webkit-animation-delay': AnimationDelay,
					'-moz-animation-delay': AnimationDelay,
					'animation-delay': AnimationDelay,
					opacity: 0
				});
	
				var ckTrigger = (trigger) ? trigger : ckElement;
	
				ckTrigger.waypoint(function() {
					ckElement.addClass("animated").css("opacity", "1");
					ckElement.addClass('animated').addClass(AnimationClass);
				}, {
					triggerOnce: true,
					offset: '90%',
				});
			});
		}
	
		ckScrollInit($('.animation'));
		ckScrollInit($('.staggered-animation'), $('.staggered-animation-wrap'));
	
	});
	
	/*===================================*
	04. MENU JS
	*===================================*/
	//Main navigation scroll spy for shadow
	$(window).on('scroll', function() {
		var scroll = $(window).scrollTop();

	    if (scroll >= 150) {
	        $('header.fixed-top').addClass('nav-fixed');
	    } else {
	        $('header.fixed-top').removeClass('nav-fixed');
	    }

	});
	
	//Show Hide dropdown-menu Main navigation 
	$( document ).on('ready', function () {
		$( '.dropdown-menu a.dropdown-toggler' ).on( 'click', function () {
			//var $el = $( this );
			//var $parent = $( this ).offsetParent( ".dropdown-menu" );
			if ( !$( this ).next().hasClass( 'show' ) ) {
				$( this ).parents( '.dropdown-menu' ).first().find( '.show' ).removeClass( "show" );
			}
			var $subMenu = $( this ).next( ".dropdown-menu" );
			$subMenu.toggleClass( 'show' );
			
			$( this ).parent( "li" ).toggleClass( 'show' );
	
			$( this ).parents( 'li.nav-item.dropdown.show' ).on( 'hidden.bs.dropdown', function () {
				$( '.dropdown-menu .show' ).removeClass( "show" );
			} );
			
			return false;
		});
	});
	
	//Hide Navbar Dropdown After Click On Links
	var navBar = $(".header_wrap");
	var navbarLinks = navBar.find(".navbar-collapse ul li a.page-scroll");

    $.each( navbarLinks, function() {

      var navbarLink = $(this);

        navbarLink.on('click', function () {
          navBar.find(".navbar-collapse").collapse('hide');
		  $("header").removeClass("active");
        });

    });
	
	//Main navigation Active Class Add Remove
	$('.navbar-toggler').on('click', function() {
		$("header").toggleClass("active");
		if($('.search-overlay').hasClass('open'))
		{
			$(".search-overlay").removeClass('open');
			$(".search_trigger").removeClass('open');
		}
	});
	
	$( document ).on('ready', function() {
		if ($('.header_wrap').hasClass("fixed-top") && !$('.header_wrap').hasClass("transparent_header") && !$('.header_wrap').hasClass("no-sticky")) {
			$(".header_wrap").before('<div class="header_sticky_bar d-none"></div>');
		}
	});
	
	$(window).on('scroll', function() {
		var scroll = $(window).scrollTop();

	    if (scroll >= 150) {
	        $('.header_sticky_bar').removeClass('d-none');
			$('header.no-sticky').removeClass('nav-fixed');
			
	    } else {
	        $('.header_sticky_bar').addClass('d-none');
	    }

	});
	
	var setHeight = function() {
		var height_header = $(".header_wrap").height();
		$('.header_sticky_bar').css({'height':height_header});
	};
	
	$(window).on('load', function() {
	  setHeight();
	});
	
	$(window).on('resize', function() {
	  setHeight();
	});
	
	$('.sidetoggle').on('click', function () {
		$(this).addClass('open');
		$('body').addClass('sidetoggle_active');
		$('.sidebar_menu').addClass('active');
		$("body").append('<div id="header-overlay" class="header-overlay"></div>');
	});
	
	$(document).on('click', '#header-overlay, .sidemenu_close',function() {
		$('.sidetoggle').removeClass('open');
		$('body').removeClass('sidetoggle_active');
		$('.sidebar_menu').removeClass('active');
		$('#header-overlay').fadeOut('3000',function(){
			$('#header-overlay').remove();
		});  
		 return false;
	});
	/*===================================*
	05. SMOOTH SCROLLING JS
	*===================================*/
	// Select all links with hashes
	
	
	var topheaderHeight = $(".top-header").innerHeight();
	var mainheaderHeight = $(".header_wrap").innerHeight();
	var headerHeight = mainheaderHeight - topheaderHeight + 20;
    $('a.page-scroll[href*="#"]:not([href="#"])').on('click', function() {
		$('a.page-scroll.active').removeClass('active');
		$(this).closest('.page-scroll').addClass('active');
        // On-page links
        if ( location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname ) {
          // Figure out element to scroll to
          var target = $(this.hash),
              speed= $(this).data("speed") || 800;
              target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top - headerHeight
            }, speed);
          }
        }
    });
	$(window).on('scroll', function(){
		var lastId,
			// All list items
			menuItems = $(".header_wrap").find("a.page-scroll"),
			topMenuHeight = $(".header_wrap").innerHeight() + 20,
			// Anchors corresponding to menu items
			scrollItems = menuItems.map(function(){
			  var items = $($(this).attr("href"));
			  if (items.length) { return items; }
			});
		var fromTop = $(this).scrollTop()+topMenuHeight;
	   
	   // Get id of current scroll item
		var cur = scrollItems.map(function(){
		 if ($(this).offset().top < fromTop)
		   return this;
	   });
	   // Get the id of the current element
	   cur = cur[cur.length-1];
	   var id = cur && cur.length ? cur[0].id : "";
	   
	   if (lastId !== id) {
		   lastId = id;
		   // Set/remove active class
		   menuItems.closest('.page-scroll').removeClass("active").end().filter("[href='#"+id+"']").closest('.page-scroll').addClass("active");
	   }  
		
	});
		
	
	/*===================================*
	06. SEARCH JS
	*===================================*/
    
	$(".close-search").on("click", function() {
		$(".search_wrap,.search_overlay").removeClass('open');
		$("body").removeClass('search_open');
	});
	
	var removeClass = true;
	$(".search_wrap").after('<div class="search_overlay"></div>');
	$(".search_trigger").on('click', function () {
		$(".search_wrap,.search_overlay").toggleClass('open');
		$("body").toggleClass('search_open');
		removeClass = false;
		if($('.navbar-collapse').hasClass('show'))
		{
			$(".navbar-collapse").removeClass('show');
			$(".navbar-toggler").addClass('collapsed');
			$(".navbar-toggler").attr("aria-expanded", false);
		}
	});
	$(".search_wrap form").on('click', function() {
		removeClass = false;
	});
	$("html").on('click', function () {
		if (removeClass) {
			$("body").removeClass('open');
			$(".search_wrap,.search_overlay").removeClass('open');
			$("body").removeClass('search_open');
		}
		removeClass = true;
	});
	
	/*===================================*
	07. SCROLLUP JS
	*===================================*/
	$(window).on('scroll', function() {
		if ($(this).scrollTop() > 150) {
			$('.scrollup').fadeIn();
		} else {
			$('.scrollup').fadeOut();
		}
	});
	
	$(".scrollup").on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 600);
		return false;
	});
	
	
	/*===================================*
	10. COUNTER JS
	*===================================*/
	var timer = $('.counter');
	if(timer.length) {
		timer.appear(function () {
		  timer.countTo();
	  });
	}
	

		
	/*===================================*
	11. MASONRY JS
	*===================================*/
	function grid_selectors() {
		var $grid_selectors  = $(".grid_container");
		var filter_selectors = ".grid_filter > li > a";
		if( $grid_selectors.length > 0 ) {
			$grid_selectors.imagesLoaded(function(){
				if ($grid_selectors.hasClass("masonry")){
					$grid_selectors.isotope({
						itemSelector: '.grid_item',
						percentPosition: true,
						layoutMode: "masonry",
						masonry: {
							columnWidth: '.grid-sizer'
						},
					});
				} 
				else {
					$grid_selectors.isotope({
						itemSelector: '.grid_item',
						percentPosition: true,
						layoutMode: "fitRows",
					});
				}
			});
		}
	
		//isotope filter
		$(document).on( "click", filter_selectors, function() {
			$(filter_selectors).removeClass("current");
			$(this).addClass("current");
			var dfselector = $(this).data('filter');
			if ($grid_selectors.hasClass("masonry")){
				$grid_selectors.isotope({
					itemSelector: '.grid_item',
					layoutMode: "masonry",
					masonry: {
						columnWidth: '.grid_item'
					},
					filter: dfselector
				});
			} 
			else {
				$grid_selectors.isotope({
					itemSelector: '.grid_item',
					layoutMode: "fitRows",
					filter: dfselector
				});
			}
			return false;
		});
		
		$('.portfolio_filter').on('change', function() {
			$grid_selectors.isotope({
			  filter: this.value
			});
		});

		$(window).on("resize", function () {
			setTimeout(function () {
				$grid_selectors.find('.grid_item').removeClass('animation').removeClass('animated'); // avoid problem to filter after window resize
				$grid_selectors.isotope('layout');
			}, 300);
		});
	}
	
	$('.link_container').each(function () {
		$(this).magnificPopup({
			delegate: '.image_popup',
			type: 'image',
			mainClass: 'mfp-zoom-in',
			removalDelay: 500,
			gallery: {
				enabled: true
			}
		});
	});
	
	$( window ).on( "load", function() {
		grid_selectors()
	});
	
		/*load more button*/
	var initShow = $('.loadmore').data('item'); //number of items loaded on init & onclick load more button
	var show = $('.loadmore').data('item-show');

	var size_item = $('.loadmore [class*="item-show"]').length;
	var v = initShow;
	$('.loadmore [class*="item-show"]').hide(); // hide all divs with class `listing`
	$('.loadmore [class*="item-show"]:lt(' + v + ')').show();

	if ($('.loadmore [class*="item-show"]').length > initShow) {

	} else {
		$("#load_more, .load_more").hide();
	}

	$('#load_more, .load_more').click(function () {
		v = (v + show <= size_item) ? v + show : size_item;
		$('.loadmore [class*="item-show"]:lt(' + v + ')').show();
		// hide load more button if all items are visible
		var message = $('.loadmore').data('finish-message');
		if ($(".loadmore [class*='item-show']:visible").length >= size_item) {
			$("#load_more, .load_more").hide();
			$('.load_more_wrap').append("<span class='alert alert-info'>" + message + "</span>");
		}
	
		grid_selectors()

	});

	/*===================================*
	12. SLIDER JS
	*===================================*/
	function carousel_slider() {
		$('.carousel_slider').each( function() {
			var $carousel = $(this);
			$carousel.owlCarousel({
				dots : $carousel.data("dots"),
				loop : $carousel.data("loop"),
				items: $carousel.data("items"),
				margin: $carousel.data("margin"),
				mouseDrag: $carousel.data("mouse-drag"),
				touchDrag: $carousel.data("touch-drag"),
				autoHeight: $carousel.data("autoheight"),
				center: $carousel.data("center"),
				nav: $carousel.data("nav"),
				rewind: $carousel.data("rewind"),
				navText: ['<i class="ion-arrow-left-c"></i>', '<i class="ion-arrow-right-c"></i>'],
				autoplay : $carousel.data("autoplay"),
				animateIn : $carousel.data("animate-in"),
				animateOut: $carousel.data("animate-out"),
				autoplayTimeout : $carousel.data("autoplay-timeout"),
				smartSpeed: $carousel.data("smart-speed"),
				responsive: $carousel.data("responsive"),
				stagePadding:$carousel.data("stagepadding"),
			});	
		});
	}
	function slick_slider() {
		$('.slick_slider').each( function() {
			var $slick_carousel = $(this);
			$slick_carousel.slick({
				arrows: $slick_carousel.data("arrows"),
				dots: $slick_carousel.data("dots"),
				infinite: $slick_carousel.data("infinite"),
				centerMode: $slick_carousel.data("center-mode"),
				centerPadding: $slick_carousel.data("center-padding"),
				vertical: $slick_carousel.data("vertical"),
				fade: $slick_carousel.data("fade"),
				cssEase: $slick_carousel.data("css-ease"),
				autoplay: $slick_carousel.data("autoplay"),
				verticalSwiping: $slick_carousel.data("vertical-swiping"),
				autoplaySpeed: $slick_carousel.data("autoplay-speed"),
				speed: $slick_carousel.data("speed"),
				pauseOnHover: $slick_carousel.data("pause-on-hover"),
				draggable: $slick_carousel.data("draggable"),
				slidesToShow: $slick_carousel.data("slides-to-show"),
				slidesToScroll: $slick_carousel.data("slides-to-scroll"),
				asNavFor: $slick_carousel.data("as-nav-for"),
				focusOnSelect: $slick_carousel.data("focus-on-select"),
				responsive: $slick_carousel.data("responsive"),
			});	
		});
	}
	
	$(document).on("ready", function() {
		if ($(".articles_slider").length > 0){
			$('.articles_slider').owlCarousel({
				loop:false,
				nav:true,
				dots:false,
				margin:20,
				responsiveClass:true,
				navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
				responsive:{
					0:{
						items:1,
						loop:true,	
						stagePadding:60
					},
					540:{
						items:1,
						loop:true,
						stagePadding:100
					},
					767:{
						items:1,
						loop:true,
						stagePadding:110
					},
					768:{
						items:3,
					},
					992:{
						items:4,
					}
				}
			})
		}
	});
	
	$(document).on("ready", function() {
		carousel_slider();
		slick_slider();
	});
	/*===================================*
	13. CONTACT FORM JS
	*===================================*/
	$("#submitButton").on("click", function(event) {
	    event.preventDefault();
	    var mydata = $("form").serialize();
	    $.ajax({
	        type: "POST",
	        dataType: "json",
	        url: "contact.php",
	        data: mydata,
	        success: function(data) {
	            if (data.type === "error") {
	                $("#alert-msg").removeClass("alert, alert-success");
	                $("#alert-msg").addClass("alert, alert-danger");
	            } else {
	                $("#alert-msg").addClass("alert, alert-success");
	                $("#alert-msg").removeClass("alert, alert-danger");
	                $("#first-name").val("Enter Name");
	                $("#email").val("Enter Email");
					$("#phone").val("Enter Phone Number");
	                $("#subject").val("Enter Subject");
	                $("#description").val("Enter Message");

	            }
	            $("#alert-msg").html(data.msg);
	            $("#alert-msg").show();
	        },
	        error: function(xhr, textStatus) {
	            alert(textStatus);
	        }
	    });
	});
	
	/*===================================*
	14. POPUP JS
	*===================================*/
	$('.content-popup').magnificPopup({
		type: 'inline',
		preloader: true,
		mainClass: 'mfp-zoom-in',
	});
	
	$('.image_gallery').each(function() { // the containers for all your galleries
		$(this).magnificPopup({
			delegate: 'a', // the selector for gallery item
			type: 'image',
			gallery: {
			  enabled: true,
			},
		});
	});
	
	$('.popup-ajax').magnificPopup({
		type: 'ajax',
		callbacks: {
			ajaxContentAdded: function() {
				carousel_slider();
				slick_slider();
			 }
		}
	});
	
	$('.video_popup, .iframe_popup').magnificPopup({
		type: 'iframe',
		removalDelay: 160,
		mainClass: 'mfp-zoom-in',
		preloader: false,
		fixedContentPos: false
	});
	
	/*===================================*
	15. Select dropdowns
	*===================================*/
	
	if ($('select').length) {
	// Traverse through all dropdowns
	$.each($('select'), function (i, val) {
		var $el = $(val);
		
		if ($el.val()===""){ 
			$el.addClass('first_null'); 
		}
		
		if (!$el.val()) {
			$el.addClass('not_chosen');
		}
		
		$el.on('change', function () {
			if (!$el.val())
				$el.addClass('not_chosen');
			else
				$el.removeClass('not_chosen');
		});
		
	  });
	}
	
	/*===================================*
	16. PROGRESS BAR JS
	*===================================*/
	$('.progress-bar').each(function(){
		var width = $(this).attr('aria-valuenow');
		$(this).appear(function() {
			$(this).css('width', width + '%');
			$(this).children('.count_pr').css('left', width + '%');
			$(this).find('.count').countTo({
				from: 0,
                to: width,
				time: 3000,
				refreshInterval: 50,
			});
		});
	});
	
	/*===================================*
    17.MAP JS
    *===================================*/	
	if ($("#map").length > 0){
		google.maps.event.addDomListener(window, 'load', init);
	}
	
	var map_selector = $('#map');
	function init() {
		
		var mapOptions = {
			zoom: map_selector.data("zoom"),
			mapTypeControl: false,
			center: new google.maps.LatLng(map_selector.data("latitude"), map_selector.data("longitude")), // New York
		  };
		var mapElement = document.getElementById('map');
		var map = new google.maps.Map(mapElement, mapOptions);
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(map_selector.data("latitude"), map_selector.data("longitude")),
			map: map,
			icon: map_selector.data("icon"),
			title: map_selector.data("title"),
		});
		var iwContent = '<div id="iw_container" style="width: 250px;">' +'<img src="https://bestwebcreator.com/adage/demo/assets/images/logo_dark.png" style="max-width: 100px;margin-bottom: 10px;"/><p style="margin-bottom: 0;line-height: 20px;">All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.Iipsum consectetur adipiscing elitllus blandit massa enim.</p></div>';
		var infowindow = new google.maps.InfoWindow();
		infowindow.setContent(iwContent);
		infowindow.open(map, marker);
		google.maps.event.addListener(marker, 'click', function() {
		  infowindow.open(map, marker);
		});
	}	

	
	/*===================================*
    18. COUNTDOWN JS
    *===================================*/
    $('.countdown_time').each(function() {
        var endTime = $(this).data('time');
        $(this).countdown(endTime, function(tm) {
            $(this).html(tm.strftime('<div class="countdown_box"><div class="countdown-wrap"><span class="countdown days">%D </span><span class="cd_text">Days</span></div></div><div class="countdown_box"><div class="countdown-wrap"><span class="countdown hours">%H</span><span class="cd_text">Hours</span></div></div><div class="countdown_box"><div class="countdown-wrap"><span class="countdown minutes">%M</span><span class="cd_text">Minutes</span></div></div><div class="countdown_box"><div class="countdown-wrap"><span class="countdown seconds">%S</span><span class="cd_text">Seconds</span></div></div>'));
        });
    });
	
	/*===================================*
	19. Scroll To Fixed Item Js
	*===================================*/
	$(document).on('ready', function() {
		var fsi = $(".fixed_scroll_item");
		if ($(fsi).length > 0){
			$(fsi).stick_in_parent({
				offset_top: fsi.data('margintop')
			});
		}
	});
	/*===================================*
	20. List Grid JS
	*===================================*/
	$('.shorting_icon').on('click',function() {
		if ($(this).hasClass('grid')) {
			$('.shop_container').removeClass('list').addClass('grid');
			$(this).addClass('active').siblings().removeClass('active');
		}
		else if($(this).hasClass('list')) {
			$('.shop_container').removeClass('grid').addClass('list');
			$(this).addClass('active').siblings().removeClass('active');
		}
		$(".shop_container").append('<div class="loading_pr"><div class="mfp-preloader"></div></div>');
		setTimeout(function(){
		  $('.loading_pr').remove();
		}, 800);
	});
	
	/*===================================*
	21. TOOLTIP JS
	*===================================*/
	$(function () {
		$('[data-toggle="tooltip"]').tooltip({
			trigger: 'hover',
		});
	});
	$(function () {
		$('[data-toggle="popover"]').popover();
	});
	
	/*===================================*
	22. PRODUCT COLOR JS
	*===================================*/
	$('.product_color_switch span').each(function() {
		var get_color = $(this).attr('data-color');
		$(this).css("background-color", get_color);
	});
	
	$('.product_color_switch span,.product_size_switch span').on("click", function() {
		$(this).siblings(this).removeClass('active').end().addClass('active');
	});
	
	/*===================================*
	23. QUICKVIEW POPUP + ZOOM IMAGE + PRODUCT SLIDER JS
	*===================================*/
	var image = $('#product_img');
	//var zoomConfig = {};
	var zoomActive = false;
	
    zoomActive = !zoomActive;
	if(zoomActive) {
		if ($(image).length > 0){
			$(image).elevateZoom({
				cursor: "crosshair",
				easing : true, 
				gallery:'pr_item_gallery',
				zoomType: "inner",
				galleryActiveClass: "active"
			}); 
		}
	}
	else {
		$.removeData(image, 'elevateZoom');//remove zoom instance from image
		$('.zoomContainer:last-child').remove();// remove zoom container from DOM
	}
	
	$.magnificPopup.defaults.callbacks = {
    open: function() {
      $('body').addClass('zoom_image');
    },
    close: function() {
      // Wait until overflow:hidden has been removed from the html tag
      setTimeout(function() {
        $('body').removeClass('zoom_image');
		$('.zoomContainer:last-child').remove();
      	}, 100);
    	}
  	};
	
	$('.plus').on('click', function() {
		if ($(this).prev().val()) {
			$(this).prev().val(+$(this).prev().val() + 1);
		}
	});
	$('.minus').on('click', function() {
		if ($(this).next().val() > 1) {
			if ($(this).next().val() > 1) $(this).next().val(+$(this).next().val() - 1);
		}
	});
	
	 /*===================================*
	24. PRICE FILTER JS
	*===================================*/

	$(document).ready(function(){
		if ($('#inputbox').length) {
		  $("#inputbox").val(50000);
		  $( "#slider" ).slider({
			range: "min",
			value: 50000,
			min: 0,
			max: 1000000,
			slide: function( event, ui ) {
			  var value = $( "#slider" ).slider( "option", "value" );
			  //on slide update inputbox
			  $('#inputbox').val( value);
			  
			   //whatever other tasks you need to do.
			}
		  });
	  
		  $("#inputbox").keyup( function(){
			
			 //whatever other tasks you need to do.
			
			$( "#slider" ).slider( "option", "value", parseInt($(this).val()) );
			
			//whatever other tasks you need to do.
			
		  });
		}
	});
	
	
	
	/*===================================*
	25. RATING STAR JS
	*===================================*/
	$(document).on("ready", function(){
	  $('.star_rating span').on('click', function(){
			var onStar = parseFloat($(this).data('value'), 10); // The star currently selected
			var stars = $(this).parent().children('.star_rating span');
			for (var i = 0; i < stars.length; i++) {
				$(stars[i]).removeClass('selected');
			}
			for (i = 0; i < onStar; i++) {
				$(stars[i]).addClass('selected');
			}
		});
	});
	
	/*===================================*
	26. CHECKBOX CHECK THEN ADD CLASS JS
	*===================================*/
	$('.create-account,.different_address').hide();
	$('#createaccount:checkbox').change(function(){
		if($(this).is(":checked")) {
			$('.create-account').slideDown();
		} else {
			$('.create-account').slideUp();
		}
	});
	$('#differentaddress:checkbox').change(function(){
		if($(this).is(":checked")) {
			$('.different_address').slideDown();
		} else {
			$('.different_address').slideUp();
		}
	});
	
	/*===================================*
	27. Cart Page Payment option
	*===================================*/	
	$(document).on('ready', function(){
		$('[name="payment_option"]').on('change', function() {
			var $value = $(this).attr('value');
			$('.payment-text').slideUp();
			$('[data-method="'+$value+'"]').slideDown();
		});
	});
	
	/*===================================*
	28. Cart Page Payment option
	*===================================*/	
	var $chart = $('.circular_bar_chart');
		$chart.appear(function() {
			$chart.easyPieChart({
				trackWidth: $chart.data('track-width'),
				lineWidth: $chart.data('line-width'),
				delay: 5000,
				barColor: $chart.data('bar-color'),
				scaleColor: false,
				scaleLength: 0,
				lineCap: 'round',
				trackColor: $chart.data('track-color'),
				size: $chart.data('size'),
				animate: {
					duration: 3000, 
					enabled: true
				},
				//lineCap: 'butt',
				onStep: function(from, to, percent) {$(this.el).find('.percent').text(Math.round(percent));}
			});	
		});

			
	/*==============================================================
    29. FIT VIDEO JS
    ==============================================================*/
    if ($(".fit-videos").length > 0){
		$(".fit-videos").fitVids({ 
			customSelector: "iframe[src^='https://w.soundcloud.com']"
		});
	}
	
	/*==============================================================
    30. STEP JS
    ==============================================================*/
	$(".process_step_wrap").prepend('<div class="steps_progress"></div>');
	var count = $(".process_tab").find("li").length - 1;
	var total = 100 * ($(".process_tab").find("li.complete").length - 1 ) / count;
	$('.process_tab').parent().find(".steps_progress").css({
		width: total + "%"
	});
	$('.process_tab li a').on("click", function() {
		$(this).parent().removeClass("compl	ete");
		$(this).parent().prevAll().addClass("complete");
		$(this).parent().nextAll().removeClass("complete");
		$(this).parent().addClass("complete");
		var count = $(".process_tab").find("li").length - 1;
		var total = 100 * ($(".process_tab").find("li.complete").length - 1 ) / count;
		$('.process_tab').parent().find(".steps_progress").css({
			width: total + "%"
		});
		
	});
	
	/*==============================================================
    31. DROPDOWN JS
    ==============================================================*/
	if ($(".custome_select").length > 0){
		$(document).on('ready', function() {
			$(".custome_select").msDropdown();
		});
	}
	
	/*===================================*
	32. DATEPICKER JS
	*===================================*/
	if ($(".datepicker").length > 0){
		var $datepicker_selector = $(".datepicker");
		$datepicker_selector.datepicker({
			autoHide: true,
			format: $datepicker_selector.data("format"),
			zIndex: 2048,
		});
    }	
	
	/*===================================*
	33. ONLOAD POPUP JS
	*===================================*/
	
	$(window).on('load',function(){
		setTimeout(function() {
			$("#onload-popup").modal('show', {}, 500);
		}, 3000);
		
	});
	
	/*===================================*
	34. TIMEPICKER JS
	*===================================*/
	if ($(".timepicker").length > 0){
		$('.timepicker').each( function() {
			var $timepicker = $(this);
			$timepicker.mdtimepicker({
				readOnly: false,
				theme: $timepicker.data("theme"),	 
			});
		});
	}
	
	/*===================================*
	35. TABLE FILTER JS
	*===================================*/
	
	$(document).on("ready", function() {
		$('.classes_filter li a').on("click", function() {
			var ourClass = $(this).attr('data-filter');
			
			$('.classes_filter li a').removeClass('current');
			$(this).addClass('current');
			
			if(ourClass == 'all') {
				$('[data-classes-schedule]').removeClass('invisible');
			}
			else {
				$('[data-classes-schedule]').addClass('invisible');
				$("[data-classes-schedule=" + ourClass +"]").removeClass('invisible');
			}
			return false;
		});
	});
	
	/*===================================*
	36. SHOW HIDE PASSWORD
	*===================================*/
	
	$(".toggle-password").on('click', function () {

	  $(this).toggleClass("fas fa-eye-slash fas fa-eye");
	  var input = $($(this).attr("data-toggle"));
	  if (input.attr("type") == "password") {
		input.attr("type", "text");
	  } else {
		input.attr("type", "password");
	  }
	});
	
	/*===================================*
	37. FORM VALIDATION
	*===================================*/
	window.addEventListener('load', function() {
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
		var forms = document.getElementsByClassName('needs-validation');
	// Loop over them and prevent submission
		var validation = Array.prototype.filter.call(forms, function(form) {
		form.addEventListener('submit', function(event) {
			if (form.checkValidity() === false) {
				event.preventDefault();
				event.stopPropagation();
			}
			form.classList.add('was-validated');
			}, false);
		});
	}, false);
	
	

	/*toggle js*/
	$(function(){
		$('.togglebox, .mobile_toggle').click(function(){
			$(this).toggleClass('on');
			$('.toggle_text, .simple_text_reading .small_container').toggle();
		});
	});
	
	$(function(){
		$('.transcript-header').click(function(){
			$(this).toggleClass('on');
			$('.transcript-body').toggle();
			if($(this).text() == 'Show Transcript'){
			   $(this).text('Hide Transcript');
			} else {
			   $(this).text('Show Transcript');
			}
		});
	});
	
	/*tooltip js*/
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	})

	/*toggle switch js*/
	$(document).ready(function() {
		$(".ToggleSwitch").on("change", function () {
			ToggleSwitch(this);
		})
	});
	function ToggleSwitch(ele) {
		if($(ele).prop("checked") == true){
			$('.form_switch').addClass('on');
			$('.form_switch').removeClass('off');
			$('body').addClass('font-preview');
		}
		else if($(ele).prop("checked") == false){
			$('.form_switch').addClass('off');
			$('.form_switch').removeClass('on');
			$('body').removeClass('font-preview');
		}
	}
	
	/*mobile tab responsive*/
	(function ($){
		$.fn.responsiveTabs = function() {
		this.addClass('responsive-tabs'),
		this.append($('<span class="dropdown-arrow"></span>')),
	
		this.on("click", "li > a.active, span.dropdown-arrow", function (){
				this.toggleClass('open');
			}.bind(this)), this.on("click", "li > a:not(.active)", function() {
				this.removeClass("open")
			}.bind(this)); 
		}
	})(jQuery);
	$(document).ready(function() {
		$('.mobile_tabs').responsiveTabs();
	});
	
	if (screen.width <= 767) {
		$('.categories_list ul').each(function(){
			var list=$(this),
				select=$(document.createElement('select')).insertBefore($(this).hide()).change(function(){
			  window.location.href=$(this).val();
			});
			$('>li a', this).each(function(){
			  
			  var option=$(document.createElement('option'))
			   .appendTo(select)
			   .val(this.href)
			   .html($(this).html());
			  if($(this).attr('class') === 'selected'){
				option.attr('selected','selected');
			  }
			});
			list.remove();
		});
	}
	
	$( document ).ready(function () {
	  $(".FormsMoreBox").slice(0, 4).show();
	  	$(".FormsMoreBox").hide();
		$(".FormsMoreBox").slice(0, 4).show();
		if ($(".FormsBox:hidden").length != 0) {
		  $("#FormloadMore").show();
		}   
		$("#FormloadMore").on('click', function (e) {
		  e.preventDefault();
		  $(".FormsMoreBox:hidden").slice(0, 5).slideDown();
		  if ($(".FormsMoreBox:hidden").length == 0) {
			$("#FormloadMore").fadeOut('slow');
		  }
		});
	});

	$( document ).ready(function () {
	  $(".articlesMoreBox").slice(0, 8).show();
	  	$(".articlesMoreBox").hide();
		$(".articlesMoreBox").slice(0, 8).show();
		if ($(".articlesBox:hidden").length != 0) {
		  $("#articlesMore").show();
		}   
		$("#articlesMore").on('click', function (e) {
		  e.preventDefault();
		  $(".articlesMoreBox:hidden").slice(0, 8).slideDown();
		  if ($(".articlesMoreBox:hidden").length == 0) {
			$("#articlesMore").fadeOut('slow');
		  }
		});
	});
	
	$( document ).ready(function () {
	  $(".ContentMoreBox").slice(0, 8).show();
	  	$(".ContentMoreBox").hide();
		$(".ContentMoreBox").slice(0, 8).show();
		if ($(".ContentBox:hidden").length != 0) {
		  $("#ContentloadMore").show();
		}   
		$("#ContentloadMore").on('click', function (e) {
		  e.preventDefault();
		  $(".ContentMoreBox:hidden").slice(0, 8).slideDown();
		  if ($(".ContentMoreBox:hidden").length == 0) {
			$("#ContentloadMore").fadeOut('slow');
		  }
		});
	});

	/*Footer Toogle*/
	$(document).ready(function(){
		var accordionOpen = $('footer .mobile_toogle .widget_title'),
				secondDepth = $('footer .mobile_toogle .widget_links');
		
		accordionOpen.on('click',function(){
				accordionOpen.closest('footer .mobile_toogle').removeClass('on');
				$(this).closest('footer .mobile_toogle').addClass('on');
				
		});
	});
	
	/*video js*/
	if ($('video').length) {
		var video = videojs('video').ready(function(){
		  // Set up any options.
		  var options = {
			//showTitle: false,
			showTrackSelector: false,
		  };
	
		  // Initialize the plugin.
		  var transcript = this.transcript(options);
	
		  // Then attach the widget to the page.
		  var transcriptContainer = document.querySelector('#transcript');
		  transcriptContainer.appendChild(transcript.el()); 
		}); 
		var video = videojs('mobilevideo').ready(function(){
		  // Set up any options.
		  var options = {
			//showTitle: false,
			showTrackSelector: false,
		  };
	
		  // Initialize the plugin.
		  var transcript = this.transcript(options);
	
		  // Then attach the widget to the page.
		  var transcriptContainer = document.querySelector('#mobiletranscript');
		  transcriptContainer.appendChild(transcript.el()); 
		}); 

		 
	}

		
	// cookie policy
	$(document).on('ready', function() {
	  if (document.cookie.indexOf("accepted_cookies=") < 0) {
		$('.cookie-overlay').removeClass('d-none').addClass('d-block');
	  }
	
	  $('.accept-cookies').on('click', function() {
		document.cookie = "accepted_cookies=yes;"
		$('.cookie-overlay').removeClass('d-block').addClass('d-none');
	  })
	
	  // expand depending on your needs
	  $('.close-cookies').on('click', function() {
		$('.cookie-overlay').removeClass('d-block').addClass('d-none');
	  })
	})
		
})(jQuery);