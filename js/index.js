/* alert("본 사이트는 크롬에 최적화 되어있으며, 1920x1080 (100%) 해상도에 최적화 되어 있습니다.") */



 $(document).ready(function(){
	    //스크롤바가 이동될때마다 스크롤 위치값 나타내기 
      $(window).scroll(function(){
        $("#txt1").text($(this).scrollTop());
      });

/*//////////////////first page yellow ball */

function random(low, high) {
  return Math.random() * high + low ;
}

class Visual {
  constructor() {
    this.canvas = document.querySelector('#canvas');
    this.context = this.canvas.getContext('2d');
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.particleLength = 400;
    this.particles = [];
    this.particleMaxRadius = 70;

    this.handleMouseMoveBind = this.handleMouseMove.bind(this);
    this.handleClickBind = this.handleClick.bind(this);
    this.handleResizeBind = this.handleResize.bind(this);

    this.initialize();
    this.render();
  }

  initialize() {
    this.resizeCanvas();
    for (let i = 0; i < this.particleLength; i++) {
      this.particles.push(this.createParticle(i));
    }
    this.bind();
  }

  bind() {
    document.body.addEventListener('mousemove', this.handleMouseMoveBind, false);
    document.body.addEventListener('click', this.handleClickBind, false);
    window.addEventListener('resize', this.handleResizeBind, false);
  }
  
  unbind() {
    document.body.removeEventListener('mousemove', this.handleMouseMoveBind, false);
    document.body.removeEventListener('click', this.handleClickBind, false);
    window.removeEventListener('resize', this.handleResizeBind, false);
  }

  handleMouseMove(e) {
    this.enlargeParticle(e.clientX, e.clientY);
  }

  handleClick(e) {
    this.burstParticle(e.clientX, e.clientY);
  }

  handleResize() {
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.canvasWidth = document.body.offsetWidth;
    this.canvasHeight = document.body.offsetHeight;
    this.canvas.width = this.canvasWidth * window.devicePixelRatio;
    this.canvas.height = this.canvasHeight * window.devicePixelRatio;
    this.context = this.canvas.getContext('2d');
    this.context.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  createParticle(id, isRecreate) {
    const radius = random(1, this.particleMaxRadius);
    const x = isRecreate ? -radius - random(0, this.canvasWidth) : random(0, this.canvasWidth);
    let y = random(this.canvasHeight / 2 - 150, this.canvasHeight / 1 + 150);
    y += random(-100, 100);
    const alpha = random(0.05, 1);

    return {
      id: id,
      x: x,
      y: y,
      startY: y,
      radius: radius,
      defaultRadius: radius,
      startAngle: 0,
      endAngle: Math.PI * 5,
      alpha: alpha,
      color: { r: 255 , g: 230, b: random(0, 100)},
      speed: alpha + 1,
      amplitude: random(50, 400),
      isBurst: false
    };
  }

  drawParticles() {
    this.particles.forEach(particle => {
      this.moveParticle(particle);

      // particle
      this.context.beginPath();
      this.context.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.alpha})`;
      this.context.arc(particle.x, particle.y, particle.radius, particle.startAngle, particle.endAngle);
      this.context.fill();
    });
  }

  moveParticle(particle) {
    particle.x += particle.speed;
    particle.y = particle.startY + particle.amplitude * Math.sin(((particle.x / 5) * Math.PI) / 180);
  }

  enlargeParticle(clientX, clientY) {
    this.particles.forEach(particle => {
      if (particle.isBurst) return;

      const distance = Math.hypot(particle.x - clientX, particle.y - clientY);

      if (distance <= 40) {
        const scaling = (100 - distance) / 1.5;
        TweenMax.to(particle, 0.5, {
          radius: particle.defaultRadius + scaling,
          ease: Power2.easeOut
        });
      } else {
        TweenMax.to(particle, 0.5, {
          radius: particle.defaultRadius,
          ease: Power2.easeOut
        });
      }
    });
  }


  render() {
    // canvas
    this.context.clearRect(0, 0, this.canvasWidth + this.particleMaxRadius * 2, this.canvasHeight);

    // particle
    this.drawParticles();

    // particle
    this.particles.forEach(particle => {
      if (particle.x - particle.radius >= this.canvasWidth) {
        this.particles[particle.id] = this.createParticle(particle.id, true);
      }
    });

    requestAnimationFrame(this.render.bind(this));
  }
}

new Visual();








/* skill bar _________________________*/
$(".bar").each(function(){
  $(this).find(".bar-inner").animate({
    width: $(this).attr("data-width")
  },2000)
});


//nav menu right bottom
$("nav").hide(); //퀵메뉴 숨기기
//스크롤이 350이상일때 TOP버튼 보이게 하고 스크롤을 올리면 다시 숨김
$(window).scroll(function(){

  if($(this).scrollTop()>780){
    $("nav").fadeIn();
  }else{
    $("nav").fadeOut();
  }

  // if($(this).scrollTop()>=4381 && $(this).scrollTop()<4825){
  //     $("nav").fadeIn();
  //   }else{
  //     $("nav").fadeOut();
  //   }
 



  $("nav ul li").mouseover(function(){
    $("nav ul li").css({"width":"200px"});
      $("nav ul li a .scroll_hover").css({"display":"inline-block"});
  });
  
  $("nav ul li").mouseout(function(){
    $("nav ul li a .scroll_hover").css({"display":"none"});
  });
});



//스크롤 위치에 따라 오른쪽 퀵메뉴 오버되게 함

$(window).scroll(function(){




  //scroll 800-1599
  if($(this).scrollTop()>=728 && $(this).scrollTop()<1535){
    $("nav ul .scb2").css({"width":"200px", "transition":"all 0.3s"});
    $("nav ul .scb2 a .scroll_hover").css({"display":"inline-block"});
  }else{
    $("nav ul .scb2").css({"width":"35px"});
    $("nav ul .scb2 a .scroll_hover").css({"display":"none"});
  }


  //scroll 1600-2999
  if($(this).scrollTop()>=1535 && $(this).scrollTop()<2565){

    $("nav ul .scb3").css({"width":"200px", "border-radius":"25px","transition":"all 0.3s"});
    $("nav ul .scb3 a .scroll_hover").css({"display":"inline-block"});
  }else{
    $("nav ul .scb3").css({"width":"35px"});
    $("nav ul .scb3 a .scroll_hover").css({"display":"none"});
  }
    //scroll 1600-2999
    if($(this).scrollTop()>=2565 && $(this).scrollTop()<3489){

      $("nav ul .scb4").css({"width":"200px", "border-radius":"25px","transition":"all 0.3s"});
      $("nav ul .scb4 a .scroll_hover").css({"display":"inline-block"});
    }else{
      $("nav ul .scb4").css({"width":"35px"});
      $("nav ul .scb4 a .scroll_hover").css({"display":"none"});
    }

    //scroll btn 과 겹쳐서 잠시 닫음 
    
    if($(this).scrollTop()>=3489 && $(this).scrollTop()<4381){
  
      $("nav ul .scb5").css({"width":"200px", "border-radius":"25px","transition":"all 0.3s"});
      $("nav ul .scb5 a .scroll_hover").css({"display":"inline-block"});
    }else{
      $("nav ul .scb5").css({"width":"35px"});
      $("nav ul .scb5 a .scroll_hover").css({"display":"none"});
    }
  
    //scroll 1600-2999
    if($(this).scrollTop()>=4825 && $(this).scrollTop()<5016){
      $("nav ul .scb6").css({"width":"200px", "border-radius":"25px","transition":"all 0.3s"});
      $("nav ul .scb6 a .scroll_hover").css({"display":"inline-block"});
    }else{
      $("nav ul .scb6").css({"width":"35px"});
      $("nav ul .scb6 a .scroll_hover").css({"display":"none"});
    }
     //scroll 350~799 (대략 위치 미리잡아놔야함)
  if($(this).scrollTop()>=5016&& $(this).scrollTop()<5516){
    $("nav ul .scb7").css({"width":"200px", "transition":"all 0.3s"});
    $("nav ul .scb7 a .scroll_hover").css({"display":"inline-block"});
  }else{
    $("nav ul .scb7").css({"width":"35px"});
    $("nav ul .scb7 a .scroll_hover").css({"display":"none"});
  }
});


  //오른쪽 퀵메뉴가 보일때 클릭시 각 콘텐츠의 위치로 이동
  $("nav ul .scb1").click(function(){
    $("body,html").animate({scrollTop:"0px"},700);
  });

  $("nav ul .scb2").click(function(){
    $("body,html").animate({scrollTop:"839x"},700);
  });

  $("nav ul .scb3").click(function(){
    $("body,html").animate({scrollTop:"1781px"},700);
  });
  $("nav ul .scb4").click(function(){
    $("body,html").animate({scrollTop:"2709px"},700);
  });
  $("nav ul .scb5").click(function(){
    $("body,html").animate({scrollTop:"3528px"},700);
  });
  $("nav ul .scb6").click(function(){
    $("body,html").animate({scrollTop:"4445px"},700);
  });
  $("nav ul .scb7").click(function(){
    $("body,html").animate({scrollTop:"5327px"},700);
  });












/* tab menu */
 $(".tab>li").click(function(){
    
  tval=$(this).index();
  tnum=+295*tval; //가로폭 증가됨 295

  $(".tab-highlight").animate({left:tnum});
  $(".tab>li>a").css("color","#fff");//탭의 모든 글자색
  $(this).find(">a").css("color","#fffbc0"); //선택된 탭의 글자색

  $(".panel>ul").hide();//기존의 보여진 내용 숨기기
  $($(this).find(">a").attr("href")).fadeIn(); //새로 선택된 내용 href 연결된 내용 보여주기

});
///////////////////////////////////////////////////pop1

  $(".panel #tab1 li").click(function(){
    $("#popup .pop").css({display:"block"});
    $("#popup .m_btn").css({display:"block"});
    $(".m_btn .g_page").css({display:"block"});
/*     $(".m_btn .g_page2").css({display:"none"});
    $(".m_btn .g_page3").css({display:"none"}); */
    g_pop=$(this).index();

    $(".m_btn .g_page span:nth-child(1)").text(g_pop+1); //오른쪽 사단 페이지 넘버표시
    $("html").css({overflowY:"hidden"}); //기존 html 스크롤 숨기기
    $(".pop li").eq(g_pop).show(); //g_pop index에 해당하는 팝업보이기
    $("#popup").stop(true,true).fadeIn(); //검정배경 
		$(".pop li").scrollTop(0);
        return false;

      });

  //오른쪽 상단 버튼-다음보기
  $(".m_btn>.right_btn").click(function(){
    if(g_pop<25){

      $(".pop>li").eq(g_pop).stop().fadeOut(); //기존거 사라짐
			g_pop++;

			$(".m_btn .g_page span:nth-child(1)").text(g_pop+1);
			$(".pop>li").eq(g_pop).stop().fadeIn();

    }

  });


  //오른쪽 상단 버튼-이전보기
  $(".m_btn .left_btn").click(function(){

    if(g_pop>0){
      $(".pop>li").eq(g_pop).stop().fadeOut(); //기존거 사라짐
      g_pop--;

      $(".m_btn .g_page>span:nth-child(1)").text(g_pop+1);
      $(".pop>li").eq(g_pop).stop().fadeIn();
    }



});
  
  ////////////////////////pop2/////////////

  
  $(".panel #tab2 li").click(function(){
    $("#popup .pop2").css({display:"block"});
    $("#popup .m_btn2").css({display:"block"});
    $(".m_btn2 .g_page2").css({display:"block"});


    k_pop=$(this).index();

    $(".m_btn2 .g_page2 span:nth-child(1)").text(k_pop+1); //오른쪽 사단 페이지 넘버표시
    $("html").css({overflowY:"hidden"}); //기존 html 스크롤 숨기기
    $(".pop2>li").eq(k_pop).show(); //g_pop index에 해당하는 팝업보이기
    $("#popup").stop(true,true).fadeIn(); //검정배경 

    $(".pop2>li").scrollTop(0);
    return false;
    
  });

  //오른쪽 상단 버튼-다음보기
  $(".m_btn2 .right_btn").click(function(){

    if(k_pop<14){

      $(".pop2>li").eq(k_pop).stop().fadeOut(); //기존거 사라짐
      k_pop++;

      $(".m_btn2 .g_page2 span:nth-child(1)").text(k_pop+1);
      $(".pop2>li").eq(k_pop).stop().fadeIn();

    }
  });
   //오른쪽 상단 버튼-이전보기
  $(".m_btn2 .left_btn").click(function(){

    if(k_pop>0){
      $(".pop2>li").eq(k_pop).stop().fadeOut(); //기존거 사라짐
      k_pop--;

      $(".m_btn2 .g_page2 span:nth-child(1)").text(k_pop+1);
      $(".pop2>li").eq(k_pop).stop().fadeIn();
    }

  });



    //////////////////////////////////////////////////////pop3
  
    $(".panel #tab3 li").click(function(){
      $("#popup .pop3").css({display:"block"});
      $("#popup .m_btn3").css({display:"block"});
      $(".m_btn3 .g_page3").css({display:"block"});
      /*       $(".m_btn .g_page").css({display:"none"});
      $(".m_btn .g_page2").css({display:"none"}); */
  
      h_pop=$(this).index();
  
      $(".m_btn3 .g_page3 span:nth-child(1)").text(h_pop+1); //오른쪽 사단 페이지 넘버표시
      $("html").css({overflowY:"hidden"}); //기존 html 스크롤 숨기기
      $(".pop3>li").eq(h_pop).show(); //g_pop index에 해당하는 팝업보이기
      $("#popup").stop(true,true).fadeIn(); //검정배경 

      $(".pop3>li").scrollTop(0);
      return false;
      
    });
  
    //오른쪽 상단 버튼-다음보기
    $(".m_btn3 .right_btn").click(function(){
  
      if(h_pop<10){
  
        $(".pop3>li").eq(h_pop).stop().fadeOut(); //기존거 사라짐
        h_pop++;
  
        $(".m_btn3 .g_page3 span:nth-child(1)").text(h_pop+1);
        $(".pop3>li").eq(h_pop).stop().fadeIn();
  
      }
    });
     //오른쪽 상단 버튼-이전보기
    $(".m_btn3 .left_btn").click(function(){
  
      if(h_pop>0){
        $(".pop3>li").eq(h_pop).stop().fadeOut(); //기존거 사라짐
        h_pop--;
  
        $(".m_btn3 .g_page3 span:nth-child(1)").text(h_pop+1);
        $(".pop3>li").eq(h_pop).stop().fadeIn();
      }

    });


    //오른쪽 상단 버튼-닫기
  $(".btn_close").click(function(){ 
    
    $("html").css({overflowY:"scroll"});
		$("#popup").stop(true,true).fadeOut();
		$(".pop>li").stop(true,true).hide();
    $(".pop2>li").stop(true,true).hide();
    $(".pop3>li").stop(true,true).hide();

    $(".m_btn").css({display:"none"});
    $(".m_btn2").css({display:"none"});
    $(".m_btn3").css({display:"none"}); 
    
    $("#popup ul").css({display:"none"});
    return false;
  });



/* webpage */
function guide1() {
  $(".w_slide_btn>i").toggleClass("active");
}
auto1 = setInterval(guide1, 700);
  //태블릿 화면(오버시 화면 올라가게)
  $(".w_tab_slide ul li:nth-child(n)").mouseenter(function () {
    $(this).css("background-position", "0 110.5%");
  });
  


  $(".w_tab_slide ul li:nth-child(n)").mouseleave(function () {
    $(this).css("background-position", "0 0");
  });

//웹디자인 슬라이드_________________________________
$(".w_list li").click(function () {

  clearInterval(auto1); //화살표 깜빡거림 멈추게

  $(".w_list li").removeClass("btn_active"); //기존 숫자
  $(this).addClass("btn_active"); //클릭한 숫자

  val=$(this).index(); 

  $(".w_txt_slide ul").animate({"left":-340*val+"px"});  //왼쪽 설명텍스트 슬라이드
  $(".w_tab_slide ul").animate({"left":-659*val+"px"});  //오른쪽 태블릿이미지 슬라이드
});

/* resposival */

  $(".r_tab_slide").mouseenter(function () {
    $(this).css("background-position", "0 100%");
  });
  $(".r_tab_slide").mouseleave(function () {
    $(this).css("background-position", "0 0");
  });

  $(".b_tab_slide").mouseenter(function () {
    $(this).css("background-position", "0 100%");
  });
  $(".b_tab_slide").mouseleave(function () {
    $(this).css("background-position", "0 0");
  });
  $(".g_tab").mouseenter(function () {
    $(".g_tab_slide").css("background-position", "0 100%");
  });
  $(".g_tab").mouseleave(function () {
    $(".g_tab_slide").css("background-position", "0 0");
  });

/*  */
$(".rbtnp button").click(function(){//각 메뉴를 클릭했을때
  $(this).next().show(); //다음 형제인 .pop을 보이게함
  $("html").css({overflowY:"none"});//body스크롤없앰
  return false;
});




/*검정 배경 클릭시 닫기*/
$(".pop_e").click(function(){
  $("html").css({"overflow-y":"scroll"});
  $(".pop_e").hide();
  return false;
});

$(".pop_re").click(function(){
  $("html").css({"overflow-y":"scroll"});
  $(".pop_re").hide();
  return false;
});





/////////////mobile visual silid////////////////
let simg=$(".bo_slide ul");
let simgli=$(".bo_slide ul li");
let sbtn=$(".slideon ul li");
let snext=$(".sideon_btn .nex");
let spre=$(".sideon_btn .pre");
let simg_w=simgli.width();   //이미지의 가로너비
let simg_n=simgli.length;  //이미지의 총개수  
let soldidx=0;  //기존이미지
let sindex=0;  //선택된 새이미지


//index번째 비주얼이미지 이동하는 함수생성
function slideImg(sindex){

  targetX=-(sindex*simg_w); //움직이는 거리(너비)

  simg.animate({left:targetX},700);  //위에서 계산한 거리만큼 움직임

  soldidx=sindex;

};

//슬라이드 자동함수 생성
function slideAuto(){

  sindex++;	
  if(sindex==simg_n){ //simg_n은 이미지개수 4, index는 0,1,2,3
    sindex=0;
  }
  slideImg(sindex);

};

auto=setInterval(slideAuto,3000);


//하단버튼 클릭
sbtn.click(function(){

  clearInterval(auto);  //버튼클릭시 자동함수 해지
  $(".play").hide();
  $(".stop").show();

  sindex=$(this).index();
  slideImg(sindex);
  auto=setInterval(slideAuto,3000); //버튼 클릭안할땐 다시 자동함수 실행

});

//좌우버튼 클릭
snext.click(function(){

  clearInterval(auto);
  $(".play").hide();
  $(".stop").show();

  sindex++;	
  if(sindex>simg_n-1){ //마지막 이미지까지 오면 다시 첫번재 이미지부터 다시....
    sindex=0;      
  }
  slideImg(sindex);
  auto=setInterval(slideAuto,3000);

});

spre.click(function(){

  clearInterval(auto);
  $(".play").hide();
  $(".stop").show();
  
  sindex--;
  if(sindex<0){  //첫번째 이미지까지 오면 다시 맨 마지막 이미지부터 다시....
    sindex=simg_n-1; //총개수 4(이미지4컷)에서 1을 뺀 3->index=3(0,1,2,3) 
  } 	
  slideImg(sindex);
  auto=setInterval(slideAuto,3000);
});

//Play,Stop 클릭
$(".play").hide();  //처음에는 Stop버튼은 보이게 하기위해 Play버튼은 숨김

$(".stop").click(function(){
  clearInterval(auto);
  $(".stop").hide();
  $(".play").show();
});
$(".play").click(function(){
  auto=setInterval(slideAuto,3000);
  $(".play").hide();
  $(".stop").show();
});

/// booking popup///
$(".botext>span").click(function(){
  $(".pop5").show(); //다음 형제인 .pop을 보이게함
  $("html").css({overflowY:"hidden"});//body스크롤없앰
  return false;
});


/*검정 배경 클릭시 닫기*/
$(".pop5").click(function(){
  $("html").css({"overflow-y":"scroll"});
  $(".pop5").hide();
  return false;
});

//webplaning_06____________________________
$(".ppanel>li:not(:first)").hide();
// 첫번째를 제외한 나머지 내용 숨기기

$(".ptab>li").click(function(){
  $(".ptab>li").removeClass("select");//기존선택된 selected클래스 삭제
  $(this).addClass("select"); //새로 선택된 selected 클래스 생성
  $(".ppanel>li").hide();//기존의 보여진 내용 숨기기
  $($(this).find("a").attr("href")).show(); //새로 선택된 내용 href 연결된 내용 보여주기

});

//popup_pt1____
  $("#pt2 .ptb_gul").click(function(){
    $(this).next().show(); //다음 형제인 .pop을 보이게 함
    $("html").css({overflowY:"hidden"}); //스크롤바 없앰
    return false;
  });
  //colse버튼과
  $(".close, .pt1_popup").click(function(){
    $(".pt1_popup").hide(); //.pop을 안보이게 함
    $("html").css({"overflow-y":"scroll"}); //html스크롤 다시 보이게 함
  });


});


