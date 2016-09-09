$(document).ready(function () {

    console.log('Script is running!');
    var documentWidth = $(document).width();
    console.log(documentWidth);

    // ПРЕДЗАГРУЗКА
    $(window).load(function () {
        $('.preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

    //Логотип нажатие
    var $logo = $('.logo');
    $logo.mousedown(function () {
        $(this).addClass('pressed');
    });
    $logo.mouseup(function () {
        $(this).removeClass('pressed');
    });

    //Наведение на форму поиска
    var $sForm = $('.topsearch');
    var $sButton = $('.submit-search');
    $sForm.mouseover(function () {
        $sButton.addClass('hover');
    });
    $sForm.mouseout(function () {
        if (!($sButton.hasClass('active'))) {
            $sButton.removeClass('hover');
        }
    });

    if (documentWidth <= 950) {
        var $sForm = $('.topsearch-alt');
        var $sButton = $('.submit-search');
        $sForm.mouseover(function () {
            $sButton.addClass('hover');
        });
        $sForm.mouseout(function () {
            if (!($sButton.hasClass('active'))) {
                $sButton.removeClass('hover');
            }
        });
    }

    //Активация формы
    var $sForm = $('.topsearch');
    $sForm.focusin(function () {
        $sButton.addClass('active');
    });
    $sForm.focusout(function () {
        $sButton.removeClass('active');
    });

    if (documentWidth <= 950) {
        var $sForm = $('.topsearch-alt');
        $sForm.focusin(function () {
            $sButton.addClass('active');
        });
        $sForm.focusout(function () {
            $sButton.removeClass('active');
        });
    }

    // Placeholder показать/скрыть
    $sForm.focusin(function () {
        $(this).attr('placeholder', '');
    });
    $sForm.focusout(function () {
        $(this).attr('placeholder', 'ПОИСК:');
    });

    // Слайдер
    $('section.awSlider .carousel').carousel({
        pause: "hover",
        interval: 4000
    });

    // Наведение на карточку товара
    var $popItemCont = $('.pop-item-container');
    var $popItemBg = $('.pop-item-bg');
    var $newRibbon = $('.new-ribbon');
    var $popItemImg = $('.pop-item-content-img');
    var $popItemBtns = $('.pop-item-btns');
    $('.pop-item-container').mouseenter(function () {
        $(this).addClass('hover');
        $(this).addClass('hover');
        $(this).find('.new-ribbon').addClass('hover');
        $(this).find('.pop-item-content-img').addClass('hidden');
        $(this).find('.pop-item-btns').removeClass('hidden');
    });
    $('.pop-item-container').mouseleave(function () {
        $(this).removeClass('hover');
       $('.new-ribbon').removeClass('hover');
        $('.pop-item-content-img').removeClass('hidden');
        $('.pop-item-btns').addClass('hidden');

    });

    // Вкладки сервисов

    $('.tabpanel').hide();
    $('.tabpanel.active').show();
    var li_button = $('.tabs li');

    li_button.click(function () {

        var tabs = $(this).closest('.service-tabs');
        var current_panel = $(this).attr('data-panelNum');
        tabs.find(li_button).removeClass('active');
        // Добавляем класс active к текущей вкладке
        $(this).addClass('active');
        console.log(current_panel);
        // Добавляем класс active к панели, убираем с других
        tabs.find('.tabpanel').removeClass('active');
        tabs.find('#' + current_panel).addClass('active');
        // Прячем панели и показываем активную панель
        tabs.find('.tabpanel').hide();
        tabs.find('#' + current_panel).show();

    });

    // Карта
    ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
                center: [55.68698, 37.529654],
                zoom: 16,
                controls: [],
            }, {
                searchControlProvider: 'yandex#search'
            }),


            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: 'Техномарт',
                balloonContent: 'Техномарт'
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: 'img/mapIcon.png',
                // Размеры метки.
                iconImageSize: [30, 42],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-20, -42]
            });

        myMap.geoObjects.add(myPlacemark);
    });

    // Адаптивность

    var altMenuFlag = 0;
    //$('.mainmenu-container-alt').hide();
    /*
    if(documentWidth<=768) {
        $('.topsearch').hide();
    } else {
        $('.topsearch').show();    
    } 
    

    if(documentWidth<=950) {
        $('.container-fluid.mainmenu-container').hide(); 
        $('.main-menu-toggle').show();
    } else {
        $('.container-fluid.mainmenu-container').show();
        $('.main-menu-toggle').hide();
    }
 
    
    $(window).resize(function(){
    var documentWidth = $(document).width();
    if(documentWidth<=768) {
        $('.topsearch').hide();
    } else {
        $('.topsearch').show(); 
    }
        
    /*
    if(documentWidth<=950) {
        $('.container-fluid.mainmenu-container').hide();
        $('.main-menu-toggle').show();
    } else {
        $('.container-fluid.mainmenu-container').show();    $('.main-menu-toggle').hide();
    }
   
        
    });
     */

    $('.main-menu-toggle').on('click', function () {
        if (altMenuFlag === 0) {
            $('.mainmenu-container-alt').fadeIn(200);
            altMenuFlag = 1;
        } else {
            $('.mainmenu-container-alt').fadeOut(200);
            altMenuFlag = 0;
        }
    });

    $('.menu-close').on('click', function () {
        $('.mainmenu-container-alt').fadeOut(200);
        altMenuFlag = 0;
    });


    // Сворачивание/разворачивание фильтра

    var $cFilterHeader = $('.c-filter-header');
    var $filterContainer = $('.filter-container');

    $cFilterHeader.on('click', function () {
        if ($(this).hasClass('active')) {

            $(this).removeClass('active');

            $(this).closest('.filter-block').find('.filter-container').slideUp(300);


        } else {
            $(this).addClass('active');
            $(this).closest('.filter-block').find('.filter-container').slideDown(300);
        }
    });
    /*
        // Выбор диапазона
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 300000,
            values: [0, 300000],
            slide: function (event, ui) {
                $("#price-min").val(+ui.values[0]);
                $("#price-max").val(ui.values[1]);
            }
        });
        $("#price-min").val($("#slider-range").slider("values", 0));
        $("#price-max").val($("#slider-range").slider("values", 1));
    */

    // Смена акитвности фильтра
    var $sortUp = $('.sort-arrow-up');
    var $sortDown = $('.sort-arrow-down');
    var $sortA = $('.sort-a');
    $sortUp.mousedown(function () {
        if ($(this).hasClass('active')) {} else {
            $(this).addClass('active');
            $sortDown.removeClass('active');
        }
    });
    $sortDown.mousedown(function () {
        if ($(this).hasClass('active')) {} else {
            $(this).addClass('active');
            $sortUp.removeClass('active');
        }
    });
    $sortA.mousedown(function () {
        $sortA.removeClass('active');
        if ($(this).hasClass('active')) {
            $sortA.removeClass('active');
        } else {
            $(this).addClass('active');

        }
    });

});