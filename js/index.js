$(document).ready(function () {
    //網頁加載logo
    if(window.innerWidth > 1180) {
        var data = sessionStorage.getItem('loading');
        if( data == 'ok' ) {
            $('.loadingArea').remove();
        }
        $(function() {
            var data = sessionStorage.getItem('loading');
            if( data != 'ok' ) {
                $(".loadingArea").addClass('show');

                setTimeout(function() {
                    $('.loadingArea').remove();
                    sessionStorage.setItem('loading','ok');
                },1200);  //原4200。太久了，調成1200。
            }
        });
    }
    $(document).ready(function () {
        setTimeout(function () {
            $('.outerWrap').css('opacity', '1');
        }, 1300); //原200。調成在logo(1200)後出現outerWrap(1300)
    });
    //  防曝光
    setTimeout(function () {
        $('outerWrap').css('opacity', '1');
    }, 500);

    //submenu網頁版選單
    $('.dropDown').hover(function(){
        if($(this).parent().hasClass('nav')) return false;
        $(this).find('.submenu').stop(false,true).slideDown(200);
    },function(){
        if($(this).parent().hasClass('nav')) return false;
        $(this).find('.submenu').stop(false,true).slideUp(200);
    });

    $('.menu .submenuDown').hover(function(){
        $(this).find('.submenuBox').stop(false,false).slideDown(300);
    },function(){
        $(this).find('.submenuBox').stop(false,false).slideUp(300);
    });

    //m_menu手機版選單
    var $m_menu = $('ul.menu').clone();
    var $top_m_menu = "";

    $m_menu.insertAfter('.m_menu .hideBox p.sp_menu').removeClass().addClass('nav').find('b').remove().end().append($top_m_menu).children('a').wrap('<li>').end().find('li.dropDown').each(function(){
        $(this).children('a').removeClass().append('<i class="fa fa-angle-down /"').attr('href','');
    })

    $('.m_menu').find('a.main').click(function(){
        if(!$(this).parents('.m_menu').hasClass('active')){
            $(this).parents('.m_menu').addClass('active');
            $(this).addClass('show');
            $('.m_menu').find('.mask').fadeIn(100);
            $('.m_menu').find('.hideBox').addClass('show');
            $('body').css('overflow','hidden');
            $('.m_menu').find('.mask').click(function(){
                $('.m_menu').removeClass('active');
                $('.m_menu').find('.hideBox').removeClass('show');
                $('.m_menu').find('mask').fadeOut();
            })
        }else{
            $(this).parents('.m_menu').removeClass('active');
            $(this).removeClass('show');
            $('.m_menu').find('.mask').fadeOut();
            $('.m_menu').find('.hideBox').removeClass('show');
            $('body').css('overflow','auto');
        }
        return false;
    })

    //移除 有languageBox 的 li
    $('.m_menu ul.nav > li .languageBox').parent().remove();
    
    //submenu 手機版選單 加上數字
    var menuLen = $('.m_menu ul.nav > li').length;
    for(var $i=0; $i < menuLen; $i++){
        var tmp = $i<9? '0'+($i+1) :($i+1);
        $('.m_menu ul.nav > li > a').eq($i).prepend('<div class="num">'+tmp+'</div>');
    }
    //submenu 手機版選單 兩層
    $('.m_menu .submenu').each(function(){
        $(this).find('a').pretend('<div class="num">．</div>')
    })
    $('.m_menu li.submenuDown').children('a').click(function(){
        $(this).siblings().slideToggle();
        return false;
    })

    //mobile classLink
    var $clone = $('ul.classLink').clone().removeClass('classLink'),
        $current_txt = $('ul.classLink').find('.current').text();
    $('ul.classLink').after('<div class="m_classLink"><a class="main"><b></b><i class="fa fa-angle-down"></a></div>');
    $('.m_classLink').append($clone).find('a.main b').text($current_txt);

    $('.m_classLink').click(function(){
        if($(this).hasClass('open')){
            $(this).removeClass('open').find('ul').stop().slideUp(200);
            $(this).find('a.main').find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
        }else{
            $(this).addClass('open').find('ul').stop().slideDown(200);
            $(this).find('a.main').find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
        }
    });
    
    //mobile 產品內容 side_menu兩層
    var $clone = $('.side_menu > ul').clone(),
        $current_txt = "";
    
        var currentLen = $('.slide_menu > ul .current').length;
        for(var $i=0; $i<currentLen; $++){
            if($i!=0){
                $current_txt+=' - ';
            }
            $current_txt+=$('.slide_menu > ul .current').eq($i).text();
        }
    $('.side_menu > ul').after('<div class="m_side_menu"><a class="main"><b></b><i class="fa fa-angle-down"></i></a></div>');
    
    $('.m_side_menu').append($clone).find('a.main b').text($current_txt);
    
    $('.m_side_menu').click(function(){
        if($(this).hasClass('open')){
            $(this).removeClass('open').find('ul').stop().slideUp(200);
            $(this).find('a.main').find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
        }else{
            $(this).addClass('open').find('ul').stop().slideDown(200);
            $(this).find('a.main').find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
        }
    });
    $('.m_slide_menu li.subMenu > a').click(function(){
        if($(this).parent().hasClass('open')){
            $(this).parent().removeClass('open').find('dl').stop().slideUp(200);
        }else{
            $(this).parent().addClass('open').find('dl').stop().slideDown(200);
        }
        return false;
    })


    // 網頁版language
    $('.language a.current').each(function(){
        var currentLanguage = $(this).text();
        $(this).parent().siblings().find('.main').text(currentLanguage);
    })

    $('.languageBtn').click(function(){
        if(!$(this).hasClass('open')){
            $(this).addClass('open');
            $(this).siblings().slideDown();
        }else{
            $(this).removeClass('open');
            $(this).siblings().slideUp();
        }
    });

    //網頁下滑時header滿版
    headerActive();
    $(window).scroll(function(){
        headerActive();
    });
    function headerActive(){
        var offsetTop = $(window).scrollTop();

        if(offsetTop > 0){
            if(!$('header').hasClass('active')){
                $('header').addClass('active');
            }
        }else{
            if($('header').hasClass('active')){
                $('header').removeClass('active');
            }
        }
    }


    
    //首圖banner slick
    $('.bannerImage').slick({
        autoplay: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true, //淡入淡出
        arrows: true,
        autoplay: false,
        autoplaySpeed: 2000,
        cssEase: 'ease-in-out'
    })

    //產品productList slick
    if(window.innerWidth > 1180){
        var data = sessionStorage.getItem('loading');
        if( data == 'ok' ){
            setTimeout(function(){
                $(".bannerBox .slick-slide[data-slick-index='0']").addClass("show");
                $('#banner').slick("slickSetOption", "autoplay", true, true);
            },500);
        }else{
            setTimeout(function(){
                $(".bannerBox .slick-slide[data-slick-index='0']").addClass("show");
                $('#banner').slick("slickSetOption", "autoplay", true, true);
            },4500);
        }
    }else{
        setTimeout(function(){
            $(".bannerBox .slick-slide[data-slick-index='0']").addClass("show");
            $('#banner').slick("slickSetOption", "autoplay", true, true);
        },500);
    }
    $('.productList').slick({
        dots: false,
        infinite: true, 
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        speed: 600,
        autoplaySpeed: 3000,
        cssEase:'cubic-bezier(0.645, 0.045, 0.355, 1)',
        responsive: [
            {
                breakpoint: 1081,
                settings:{
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '25%',
                    dots: true,
                }
            },
            {
                breakpoint: 768,
                settings:{
                    slidesToShow: 1, 
                    centerMode: true,
                    centerPadding: '25%',
                    dots: true,
                }
            },
            {
                breakpoint: 481,
                settings:{
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '80px',
                    dots: true,
                }
            },
            {
                breakpoint: 361,
                settings:{
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '40px',
                    dots: true,
                }
            },
        ]
    })

    //coreList slick
    var $coreRunTime = 4000;

    // add abnner dot
    if($('.coreList li').length > 1) {

        $('.coreBox').append('<div class="dotBox"></div>');

        for(var $i=0; $i < $('.coreList li').length; $i++){
            $('.coreBox .dotBox').append('<div class="dot" data-id="'+$i+'"><svg class="stroke" height="30" width="30" ><circle cx="15" cy="15" r="4"/></svg></div>');
        }
        $('.coreBox .dotBox .dot').eq(0).addClass('show').find('.stroke').addClass('ani');
    }
    $('.dotBox .dot').click(function(){
        $('.coreList').slick('slickGoTo', $(this).data('id'));
    })

    $('.coreBox .dotBox .stroke').css('animation-duration', $coreRunTime+'ms');
    
    $('.coreList').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: $coreRunTime,
        cssEase: 'linear'
    })
    .on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.coreBox .dotBox .stroke').removeClass('ani');
        $('.coreBox .dotBox .dot').removeClass('show');
    })
    .on('afterChange', function(event, slick, currentSlide){
        $('.coreBox .dotBox .dot').eq(currentSlide).addClass('show').find('.stroke').addClass('ani');
    });

    //aboutList slick
    var $aboutRunTime = 4000;

    // add abnner dot
    if($('.aboutList li').length > 1) {

        $('.aboutBox').append('<div class="dotBox"></div>');

        for(var $i=0; $i < $('.aboutList li').length; $i++){
            $('.aboutBox .dotBox').append('<div class="dot" data-id="'+$i+'"><svg class="stroke" height="30" width="30" ><circle cx="15" cy="15" r="4"/></svg></div>');
        }
        $('.aboutBox .dotBox .dot').eq(0).addClass('show').find('.stroke').addClass('ani');
    }
    $('.dotBox .dot').click(function(){
        $('.aboutList').slick('slickGoTo', $(this).data('id'));
    })

    $('.aboutBox .dotBox .stroke').css('animation-duration', $aboutRunTime+'ms');
    
    $('.aboutList').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: $aboutRunTime,			
        cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        responsive: [
            {
                breakpoint: 9999,
                settings: "unslick"
            },
            {
                breakpoint: 521,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 441,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 200,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.aboutBox .dotBox .stroke').removeClass('ani');
        $('.aboutBox .dotBox .dot').removeClass('show');
    })
    .on('afterChange', function(event, slick, currentSlide){
        $('.aboutBox .dotBox .dot').eq(currentSlide).addClass('show').find('.stroke').addClass('ani');
    });

    //appList slick
    $('.appList').slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: false,
        speed: 600,
        autoplaySpeed: 3000,
        cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '25%',
                }
            },
            {
                breakpoint: 481,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '80px',
                }
            }
            ,
            {
                breakpoint: 361,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '40px',
                }
            }
        ]
    });

    $(window).on('resize', function() {
        $('.aboutList').slick('resize');
        $('.coreList').slick('resize');
    });




    //下滑時各Area addClass show
    $(window).on('load',function(){
        //Init ScrollMagic
        var controller = new ScrollMagic.Controller();

        var antiArray=[
            '.productArea',
            '.productArea .titleBox',
            '.coreArea .wrap',
            '.aboutArea',
            '.aboutArea .wrap',
            '.appArea',
            '.contactArea',
        ];
        
        var len = antiArray.length;
        for(var i=0; i < len; i++){
            var dom = 'scene'+i;
            dom = new ScrollMagic.Scene({
                triggerElement: antiArray[i],
                triggerHook: 0.7, //show, when scrolled 10% into view
                reverse: false //反向捲軸不會有效果(只發生一次)
            })
                //.addIndicators() // this requires a plugin
                .setClassToggle(antiArray[i], 'show') //add class to project01
                .addTo(controller);
        }
        
        sense = new ScrollMagic.Scene({
            triggerElement: '.productBox',
            triggerHook: 0.7, // show, when scrolled 10% into view
            reverse: false	// 反向卷軸不會有效果(只發生一次)
        })
        // .addIndicators() // this requires a plugin
        .setClassToggle('.productBox', 'show') // add class to project01
        .addTo(controller)
        .on("enter", function (e) {
            $('.productList').slick("slickSetOption", "autoplay", true, true);
        });

        sense = new ScrollMagic.Scene({
            triggerElement: '.appBox',
            triggerHook: 0.7, // show, when scrolled 10% into view
            reverse: false	// 反向卷軸不會有效果(只發生一次)
        })
        // .addIndicators() // this requires a plugin
        .setClassToggle('.appBox', 'show') // add class to project01
        .addTo(controller)
        .on("enter", function (e) {
            $('.appList').slick("slickSetOption", "autoplay", true, true);
        });
    });


    //core hover num&img
    $('.coreArea .dotNumBox .dotNum')
    .mouseenter(function(){
        $(this).addClass('current');
        $('.coreArea ul li[data-index='+$(this).data('index')+']').addClass('current');
    })
    .mouseleave(function(){
        $(this).removeClass('current');
        $('.coreArea ul li[data-index='+$(this).data('index')+']').removeClass('current');
    });

    $('.coreArea ul li')
    .mouseenter(function(){
        $(this).addClass('current');
        $('.coreArea .dotNumBox .dotNum[data-index='+$(this).data('index')+']').addClass('current');
    })
    .mouseleave(function(){
        $(this).removeClass('current');
        $('.coreArea .dotNumBox .dotNum[data-index='+$(this).data('index')+']').removeClass('current');
    });


    //gotop
    $('.goTop').click(function(){
        $('body,html').stop().animate({scrollTop:0});
        return false;
    });

    $('.scrollDown,.scrollDownIns').click(function () {
        var $width = window.innerWidth;
        if($width > 1180) {
            $('html, body').stop().animate({scrollTop:$('#mainArea').offset().top - 89}, 500);
        }else {
            $('html, body').stop().animate({scrollTop:$('#mainArea').offset().top - 79}, 500);
        }
        return false;
    });
    
    
});

