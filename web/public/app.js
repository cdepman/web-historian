//app.js

//listener for input field
//handle ajax GET for '/archived/SITEURL'
//on submit, changes to loading
//on success, dom is changed to archived HTML
//if url is archived -> serve up archive
//else addToUrlList and redirect to loading page
//interval to check archive?? animation?
//on event, reload DOM
//
$(document).ready(function(){
  $("#targetForm").submit(function(e){
    alert('clicked!');
      e.preventDefault();
      // $('input').attr('action', "archives/" + e).submit();
  });
}
