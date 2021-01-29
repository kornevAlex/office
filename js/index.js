
/*выпадающее окно добавления студента */
$(function(){ 
  $('.btn').on('click',function(){
    $('.popup').css({
      'transform':'translateY(0)',
      'z-index':'999'
    });
    
    $('body').addClass('overlay');
    
    $('.popup form').animate({
      left:'0'
    },1000);
    

    
    $('.popup > .close').on('click',function(){
      $(this).parent().css({
      'transform':'translateY(-500%)'
     });
      $('body').removeClass('overlay');
    });
  });
});