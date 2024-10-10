jQuery(document).ready(function(){
  jQuery('#contact-form').on('submit',function(e) {  //Don't foget to change the id form
  jQuery.ajax({
      url:'contact.php', //===PHP file name====
      data:jQuery(this).serialize(),
      type:'POST',
      success:function(data){
          swal({
              title: "Thank You!",
              text: "Your request has been submitted successfully. We will contact to you soon.",
              icon: "success",
             timer: 3000
           }).then(function() {
            jQuery('#contact-form')[0].reset();
                   });
        
      },
      error:function(data){

         swal({
              title: "Oops...",
              text: "Something went wrong :(",
              icon: "error",
             timer: 3000
           })
      },
  
    });
    e.preventDefault(); //This is to Avoid Page Refresh and Fire the Event "Click"
  }); 
});