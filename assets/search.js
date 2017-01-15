search = function(str) {   
  return $('section.post').filter(function() { 
    return ($('a',this).text().toLowerCase().indexOf(str) >= 0 
      || $('span',this).text().toLowerCase().indexOf(str) >= 0)
    })
}

$(function() {
  $('#search input').keyup(function() {
    $(this).parent().removeClass('zeroresults')
    t = $(this).val().toLowerCase();
    if (t != "") {
      $('section.post').addClass('excluded'); 
      results = search($(this).val().toLowerCase());
      results.removeClass('excluded').addClass('included')
      if (results.length < 1) $(this).parent().addClass('zeroresults')
    } else {
      $('section.post').removeClass('included excluded');
    } 
  })
});
