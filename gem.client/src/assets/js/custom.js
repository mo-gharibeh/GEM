/*-----------------------------------------------------------------------------------

    Template Name: Gym On

    Note: This is Custom Js file

-----------------------------------------------------------------------------------

    Js INDEX

    ===================

        01 marquee_text
        02 Counter Style One
        03 Team Slider
        04 Featured Slider One
        05 f-slider-three
        06 myslider
        07 Client Slider
        08 Client Review Slider
        09 c-slider
        10 blog-slider
        11 Nice Select
        12 P-Slider
        13 Project Detail Slider
        14 c-data
        15 Products List Grid
        16 wwb-ul li
        17 mobile-nav
        18 #mobile-menu
        19 #desktop-menu
        20 #res-cross
        21 li-pd-imgs
        22 Cart Popup
        23 Sticky Header
        24 Preloader
        25. days time
        26 scrollTop

-----------------------------------------------------------------------------------*/



jQuery(document).ready(function($){if($.isFunction($.fn.marquee)){$('.marquee_text').marquee({direction:'left',duration:20000,gap:50,delayBeforeStart:0,duplicated:!0,startVisible:!0})}
"use strict";if($(".counter")[0]){$('.counter').counterUp({delay:10,time:1000})}
if($(".team-slider")[0]){$('.team-slider.owl-carousel').owlCarousel({loop:!0,nav:!0,navText:["<i class='fa-solid fa-arrow-left-long'></i>","<i class='fa-solid fa-arrow-right-long'></i>"],dots:!1,touchDrag:!1,mouseDrag:!1,margin:10,navContainer:'.team-slider-nav',responsive:{0:{items:1},756:{items:2},992:{items:3},1200:{items:4}}})}
if($(".f-slider-one")[0]){$('.f-slider-one.owl-carousel').owlCarousel({items:1,loop:!0,margin:0,stagePadding:0,dots:!0,autoplay:!0,animateOut:'fadeOut',touchDrag:!1,mouseDrag:!1})}
if($(".f-slider-three")[0]){$('.f-slider-three').owlCarousel({items:1,loop:!0,margin:0,stagePadding:0,dots:!0,autoplay:!0,smartSpeed:2000,})}
if($(".myslider")[0]){$('.myslider').owlCarousel({items:1,loop:!0,dots:!0,smartSpeed:1000,dotsData:!0,nav:!1,autoplay:!0,mouseDrag:!1,})}
if($(".client-slider")[0]){$('.client-slider.owl-carousel').owlCarousel({items:5,autoplay:!0,autoplayTimeout:3000,autoplayHoverPause:!1,dots:!1,responsive:{0:{items:1},600:{items:2},800:{items:3},1000:{items:5}}})}
if($(".client-review-slider")[0]){$('.client-review-slider.owl-carousel').owlCarousel({items:1,autoplay:!0,autoplayTimeout:3000,autoplayHoverPause:!1,dots:!0,})}
if($(".c-slider")[0]){$('.c-slider.owl-carousel').owlCarousel({loop:!0,items:1,dots:!1,autoplay:!0,autoplayTimeout:3000,autoplayHoverPause:!1,nav:!0,navText:["<i class='fa-solid fa-arrow-left-long'></i>","<i class='fa-solid fa-arrow-right-long'></i>"],responsive:{0:{nav:!1,},768:{nav:!0}}})}
if($(".blog-slider")[0]){$('.blog-slider.owl-carousel').owlCarousel({items:3,center:!0,loop:!0,margin:12,dots:!0,autoplay:!0,autoplayTimeout:3000,autoplayHoverPause:!1,responsive:{0:{items:1},768:{center:!1,items:2},1000:{items:3}}})}
if($("select")[0]){$('select').niceSelect()}
if($(".p-slider.owl-carousel")[0]){$('.p-slider.owl-carousel').owlCarousel({items:3,loop:!0,center:!0,dots:!0,autoplay:!0,autoplayTimeout:3000,autoplayHoverPause:!1,responsive:{0:{items:1},768:{center:!1,items:2,},1100:{items:3}}})}
if($(".p-d-slider")[0]){$('.p-d-slider.owl-carousel').owlCarousel({items:1,dots:!0,})}
$(".contact-us .c-data ul li").click(function(){$(".contact-us .c-data a").removeClass("active");$(this).children("a").addClass("active");var m_index=$(this).index();if(m_index==0){$(".c-cards .card").removeClass("active")
$($(".c-cards .card:nth-child(1)")).addClass("active");console.log("yes")};if(m_index==1){$(".c-cards .card").removeClass("active")
$($(".c-cards .card:nth-child(2)")).addClass("active");console.log("yes")};if(m_index==2){$(".c-cards .card").removeClass("active")
$($(".c-cards .card:nth-child(3)")).addClass("active");console.log("yes")};if(m_index==3){$(".c-cards .card").removeClass("active")
$($(".c-cards .card:nth-child(4)")).addClass("active");console.log("yes")};if(m_index==4){$(".c-cards .card").removeClass("active")
$($(".c-cards .card:nth-child(5)")).addClass("active");console.log("yes")}});if($(".shop-filter")[0]){$(".shop-filter a.list").click(function(){$(".p-slider").removeClass("grid");$(".p-slider").addClass("list")});$(".shop-filter a.grid").click(function(){$(".p-slider").removeClass("list");$(".p-slider").addClass("grid")})}
$(".wwb-ul li").hover(function(){$(".wwb-ul li").removeClass("active");$(this).addClass("active")});$('.mobile-nav .menu-item-has-children').on('click',function(event){$(this).toggleClass('active');event.stopPropagation()});$('#mobile-menu').click(function(){$(this).toggleClass('open');$('#mobile-nav').toggleClass('open')});$('#desktop-menu').click(function(){$(this).toggleClass('open');$('.desktop-menu').toggleClass('open')});$('#res-cross').click(function(){$('#mobile-nav').removeClass('open');$('#mobile-menu').removeClass('open')});$('.li-pd-imgs').on('click',function(){var img_src="";$('.li-pd-imgs.nav-active').removeClass('nav-active');$(this).addClass('nav-active');img_src=$(this).find('img').attr('src');$('#NZoomContainer').children('img').attr('src',img_src)});var boxWidth=$("#lightbox").width();$(".white_content").animate({opacity:0,width:0,right:-10000});$("#close").on('click',function(){$(".white_content").animate({opacity:0,width:0,right:-1000})});$("#show").on('click',function(){$(".white_content").animate({opacity:1,right:0})});var new_scroll_position=0;var last_scroll_position;var header=document.getElementById("stickyHeader");window.addEventListener('scroll',function(e){last_scroll_position=window.scrollY;if(new_scroll_position<last_scroll_position&&last_scroll_position>100){header.classList.remove("slideDown");header.classList.add("slideUp")}else if(last_scroll_position<100){header.classList.remove("slideDown")}else if(new_scroll_position>last_scroll_position){header.classList.remove("slideUp");header.classList.add("slideDown")}
new_scroll_position=last_scroll_position})});$(window).on('load',function(){$("body").addClass("page-loaded")});if($('.tabs-box').length){$('.tabs-box .tab-buttons .tab-btn').on('click',function(e){e.preventDefault();var target=$($(this).attr('data-tab'));if($(target).is(':visible')){return!1}else{target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');$(this).addClass('active-btn');target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');$(target).fadeIn(300);$(target).addClass('active-tab')}})}
if(jQuery("#days").length){(function(){const second=1000,minute=second*60,hour=minute*60,day=hour*24;let today=new Date(),dd=String(today.getDate()).padStart(2,"0"),mm=String(today.getMonth()+1).padStart(2,"0"),yyyy=today.getFullYear(),nextYear=yyyy+1,dayMonth="9/21/",birthday=dayMonth+yyyy;today=mm+"/"+dd+"/"+yyyy;if(today>birthday){birthday=dayMonth+nextYear}
const countDown=new Date(birthday).getTime(),x=setInterval(function(){const now=new Date().getTime(),distance=countDown-now;document.getElementById("days").innerText=Math.floor(distance/(day)),document.getElementById("hours").innerText=Math.floor((distance%(day))/(hour)),document.getElementById("minutes").innerText=Math.floor((distance%(hour))/(minute)),document.getElementById("seconds").innerText=Math.floor((distance%(minute))/second);if(distance<0){document.getElementById("headline").innerText="event";document.getElementById("countdown").style.display="none";document.getElementById("content").style.display="block";clearInterval(x)}},0)}())}
function scrollTopPercentage(){const scrollPercentage=()=>{const scrollTopPos=document.documentElement.scrollTop;const calcHeight=document.documentElement.scrollHeight-document.documentElement.clientHeight;const scrollValue=Math.round((scrollTopPos/calcHeight)*100);const scrollElementWrap=$("#scroll-percentage");scrollElementWrap.css("background",`conic-gradient( #fff ${scrollValue}%, #411111 ${scrollValue}%)`);if(scrollTopPos>100){scrollElementWrap.addClass("active")}else{scrollElementWrap.removeClass("active")}
if(scrollValue<99){$("#scroll-percentage-value").text(`${scrollValue}%`)}else{$("#scroll-percentage-value").html('<i class="fa-solid fa-arrow-up-long"></i>')}}
window.onscroll=scrollPercentage;window.onload=scrollPercentage;function scrollToTop(){document.documentElement.scrollTo({top:0,behavior:"smooth"})}
$("#scroll-percentage").on("click",scrollToTop)}
scrollTopPercentage();function reveal1(){var reveals=document.querySelectorAll(".reveal1");for(var i=0;i<reveals.length;i++){var windowHeight=window.innerHeight;var elementTop=reveals[i].getBoundingClientRect().top;var elementVisible=150;if(elementTop<windowHeight-elementVisible){reveals[i].classList.add("active")}}}
window.addEventListener("scroll",reveal1);document.addEventListener('click',(e)=>{const colorOption=e.target.closest('.color-option');if(!colorOption)return;document.querySelectorAll('.color-option').forEach(colorOption=>colorOption.classList.remove('is-selected'));colorOption.classList.add('is-selected');const color=colorOption.dataset.color;let root=document.documentElement;root.style.setProperty('--theme-color',color)});$(document).ready(function(){$(".color-group").click(function(){$(".color-group").toggleClass("active")})})