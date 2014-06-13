$(function(){

  $(':checkbox')
    .each(function(){
      if (localStorage[this.id] == '1')  $(this).attr('checked', true);
    })
    .on('change', function(){
      localStorage[this.id] = $(this).is(':checked') ? '1' : '0';
    });

});