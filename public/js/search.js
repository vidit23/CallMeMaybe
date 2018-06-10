$.get('/getDistinctTags').done(function(response){
     $('#tags').empty()
     $('#tags').append( $('<option selected disabled hidden></option>').html('Choose here'))
     //alert(response);
     $.each(response, function(val, text) {
        $('#tags').append( $('<option ></option>').val(text).html(text) )
        });
     $("#mypar").html(response.amount);
});

/*
<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
*/

$(function() {

    $('#logout').on('click',  function(){
        alert('You are logged out now. ');
        window.location ='/logout';
    });

    $('#tagstable').on('click', 'tr', function(){
        console.log( $(this).context.id)
        $v=$(this).context.id
        $.get("/video",
        {
          username: $(this).context.id
        },
        function(data,status){
            window.location.replace('/video?username='+ $v)
            console.log("Data: " + data + "\nStatus: " + status);
        });        
    });
    $('#tags').change(function() {
        console.log($('#tags').val())
        $.get("/getUserByTag", {tag: $('#tags').val()},function(data){
            console.log(data)
            
            $('#tagstable').empty()
            $temp='<thead class="thead-dark"><tr><th scope="col">Name</th><th scope="col">Email</th><th scope="col">Rank</th></tr></thead><tbody>'
            $('#tagstable').append( $temp)
            $.each(data, function(val, text) {
                var $name=text['name']
                var $email=text['email']
                var $ranking=text['ranking']
                console.log($name)
                console.log($email)
                console.log($ranking)
                $temp='<tr id='+$email+'>'
                $temp+='<td>'+$name+'</td>'
                $temp+='<td>'+$email+'</td>'
                $temp+='<td>'+$ranking+'</td></tr>'
                //$('#tagstable').append( $('<td></td>').val($email).html($email) )
                //$('#tagstable').append( $('<td></td>').val($ranking).html($ranking) )
                $('#tagstable').append( $temp)
            });
            $('#tagstable').append( $('</tbody></table>'))
            
             $("#mypar").html(data.amount);


            
        });
    });

});

