$(document).ready(function(){
  $('.dropdown-submenu p.test').on("click", function(e){
    $(this).next('ul').toggle();
    e.stopPropagation();
    e.preventDefault();
  });
});