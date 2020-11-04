/* Set up a data attribute for the links to use as the pseudo element content */

var anchors = document.querySelectorAll('.special-link')
anchors.forEach(function (anchor) {
  var linkText = anchor.innerText;
  console.log('Setting: ', linkText);
  anchor.setAttribute('data-linkText', linkText);
});


/*Smooth scroll*/
/*
$(function(){
    
    $("#navigation a, footer a, .smooth-scroll").on("click", function(event){
       event.preventDefault();
        var hash = this.hash;
        
        var height_nav = getComputedStyle(document.getElementById('navigation'), null);
        
        var height_nav = parseInt(height_nav.height.split("px")[0],10);
        
        var margin_titre = getComputedStyle(document.getElementById('titre'), null);
        
        var margin_titre = parseInt(margin_titre.marginTop.split("px")[0],10);
        
        var scroll_minus = height_nav + margin_titre;
        
        $('body,html').animate({scrollTop: $(hash).offset().top-scroll_minus} , 900 , function(){window.location.hash = hash-scroll_minus;})
    });
})
*/