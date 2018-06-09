$.get('/getDistinctTags').done(function(response){
     $('#tags').empty()
     alert(response);
     $.each(response, function(val, text) {
        $('#tags').append( $('<option></option>').val(val).html(text) )
        });
     $("#mypar").html(response.amount);
});