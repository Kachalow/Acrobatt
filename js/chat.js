var socket = io.connect();

function stripHTML(str) {
    var strippedText = $("<div/>").html(str).text();
    return strippedText;
}

// on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function(){
    // call the server-side function 'adduser' and send one parameter (value of prompt)
    socket.emit('adduser', stripHTML(prompt("What's your name?")));
});

// listener, whenever the server emits 'updatechat', this updates the chat body
socket.on('updatechat', function (username, data) {
    $('.conversation').append('<b>'+username + ':</b> ' + data + '<br>');
        $('.conversation').animate({scrollTop: $('.conversation').prop("scrollHeight")}, 0);

});

// listener, whenever the server emits 'updateusers', this updates the username list
socket.on('updateusers', function(data) {
    $('.users').empty();
    $.each(data, function(key, value) {
        $('.users').append('<div>' + key + '</div>');
    });
});

// on load of page
$(function(){
    // when the client clicks SEND
    $('.message-send').click( function() {
        var message = stripHTML($('.message-input').val());


        $('.message-input').val('');
        // tell server to execute 'sendchat' and send along one parameter
        socket.emit('sendchat', message);
    });

    // when the client hits ENTER on their keyboard
    $('.message-input').keypress(function(e) {
        if(e.which == 13) {
            $(this).blur();
            $('.message-send').focus().click();
            $('.message-input').focus();
        }
    });

    // set the focus on input box by default
    $('.message-input').focus();
    $('.users').hide();

    $('.user-hover').mouseover(function(){
        $('.users').show();
    }).mouseout(function(){
        $('.users').hide();
    });


});