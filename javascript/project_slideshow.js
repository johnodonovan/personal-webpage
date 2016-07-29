jQuery(function($){
   
   var current = null;                                                  // Element actuellement survolé
   var t = parseInt($('#content a:first span.title').css('top'));       // Position du titre par rapport au top
   var l = parseInt($('#content a:first span.descr').css('left'));      // Poisition du contenu par rapport à la gauche
   
   // Lorsque l'on survole un des lien
   $('#content a').mouseover(function(){
       // On vérifie que l'on ne suvole pas l'élément courant
       if(current && $(this).index() != current.index()){
           // On cache les infos de l'élément précédement sélectionné
           current.find('span.bg').stop().fadeOut();
           current.find('span.title').show().animate({
               top : t - 25,
               opacity : 0
           });
           current.find('span.descr').show().animate({
               left : l - 50,
               opacity : 0
           });
           current.find('span.project_status').show().animate({
               left : l - 50,
               opacity : 0
           });
           current.find('span.project_icons').show().animate({
               left : l - 50,
               opacity : 0
           });
           


       }
       // Si on survol l'éménent déja sélectionné on ne fait rien de plus
       if(current && $(this).index() == current.index()){
           return null;
       }
       // On anime le fond/titre et description
       $(this).find('span.bg').hide().stop().fadeTo(500,0.7);
       $(this).find('span.title').stop().css({
           opacity : 0,
           top : t + 25
       }).animate({
           opacity : 1,
           top : t
       });
       $(this).find('span.descr').stop().css({
           opacity : 0,
           left : l + 50
       }).animate({
           opacity : 1,
           left : l
       });
       $(this).find('span.project_status').stop().css({
           opacity : 0,
           left : l + 50
       }).animate({
           opacity : 1,
           left : l
       });  
       $(this).find('span.project_icons').stop().css({
           opacity : 0,
           left : l + 50
       }).animate({
           opacity : 1,
           left : l
       });              

       // On modifie l'élément courant
       current = $(this); 
   });
   
   //Lorsque la souris sors des blocs, on enlève le titre ainsi que la description
   $('#content a').mouseleave(function(){
       current.find('span.bg').stop().fadeOut();
       current.find('span.title').show().animate({
           opacity : 0
       });
       current.find('span.descr').show().animate({
           opacity : 0
       });
       current = null;
	});
	
});