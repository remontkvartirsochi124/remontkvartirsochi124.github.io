$(document).ready(function() {
/*
    $('.section__btn').click(function (e) {
        e.preventDefault();
        $(this).closest('.section__box').find('.section__drop').slideToggle();
    });

    jQuery(window).scroll(function(){
        var $sections = $('.section');
	      $sections.each(function(i,el){
        var top  = $(el).offset().top-200;
        var bottom = top +$(el).height();
        var scroll = $(window).scrollTop();
        var id = $(el).attr('id');
		    	if( scroll > top && scroll < bottom){
		            $('a.active').removeClass('active');
					$('a[href="#'+id+'"]').addClass('active');
          };
		    });
		 });

		$("nav").on("click","a", function (event) {
		        // исключаем стандартную реакцию браузера
		        event.preventDefault();

		        // получем идентификатор блока из атрибута href
		        var id  = $(this).attr('href'),

		        // находим высоту, на которой расположен блок
		            top = $(id).offset().top-170;

		        // анимируем переход к блоку, время: 800 мс
		        $('body,html').animate({scrollTop: top}, 800);
		    });
*/
		$(".burger__btn").click(function() {
			$("nav, .burger__close").addClass("active");
		});

		$(".burger__close").click(function() {
			$("nav").removeClass("active");
			$(this).removeClass("active");
		});
        
        $(".calc-button").on("click", function(){
            var sizeValue = $("#calc-input").val(),
            	result = sizeValue * parseInt($(".price-value").text().replace(' ', '')),
            	calcResult = $('.calc-result').show();
            	sizeValue >= 1 ? calcResult.html('Стоимость ремонта: <strong>' + result  + ' ₽</strong>') : calcResult.text("Укажите площадь квартиры для расчёта!");                
            return false;
        });
});
