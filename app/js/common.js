if($('.slider').length) {
	$('.slider').slick({
		dots: true,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		prevArrow: '<span class="arrow arrow__left"></span>.',
		nextArrow: '<span class="arrow arrow__right"></span>.',
	});
}

if($('.reviews').length) {
	$('.reviews').slick({
		dots: true,
		infinite: true,
		speed: 500,
		fade: false,
		cssEase: 'linear',
		prevArrow: '<span class="arrow arrow__left"></span>.',
		nextArrow: '<span class="arrow arrow__right"></span>.',
	});
}
$('.product').slick({
    dots: false,
    infinite: true,
    speed: 500,
    fade: false,
    cssEase: 'linear',
    asNavFor: '.product-nav',
    prevArrow: '<span class="arrow arrow__left"></span>.',
    nextArrow: '<span class="arrow arrow__right"></span>.',
});

$('.product-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    focusOnSelect: true,
    asNavFor: '.product'
});



$('.menu-inner').click(function e() {
    $(this).find('.hamburger').toggleClass('animate');
	  $(this).parent().find('.submenu').slideToggle('open');
});

$('.filter-title').on('click', function() {
    $(this).toggleClass('active');
    $(this).parent().children('.filter-desc').slideToggle('open');
});

$('.tabs__head').click(function (e) {
	if(!$(this).hasClass('active')) {
		$('.tabs__head').removeClass('active');
		$(this).addClass('active')
		var mobile = $(this).attr('data-phone');
		$('.tabs__item').removeClass('active');
		$('.tabs__item[data-phone='+ mobile +']').addClass('active')
	}
})


function YandexReadyHandler() {
    var map = new ymaps.Map("contacts-map", {
        center: [55.781286568959175, 37.60038749999997],
        zoom: 17,
        controls: [],
        type: "yandex#map"
    }, {
        suppressMapOpenBlock: true
    });
    map.geoObjects.add(new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: [55.78138028583478, 37.60034994907376],
                hideIconOnBalloonOpen: false
            },
            properties: {
                balloonContent: decodeURIComponent("%D0%B3.%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%9D%D0%BE%D0%B2%D0%BE%D1%81%D0%BB%D0%BE%D0%B1%D0%BE%D0%B4%D1%81%D0%BA%D0%B0%D1%8F%0A%D1%83%D0%BB%D0%B8%D1%86%D0%B0%2C%2014%2F19C8"),
                iconCaption: decodeURIComponent("Captain%20Gadget"),
                hintCaption: decodeURIComponent("Captain%20Gadget"),
            }
        }, {
            preset: "islands#blueDotIcon",
        })
    );
    return map;
}