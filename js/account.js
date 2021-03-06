function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

    $('#profimg').attr('src', profile.getImageUrl());
    $('#signinbtn').css('display','none');
    $('#namefield').text(profile.getName()).css('display','inline');
    $('#signout').css('display','block');

    $.post("http://localhost:8000/login",{id_token: googleUser.getAuthResponse().id_token}, function(data){
        console.log(data);
    });


    //makeLogInRequest(googleUser.getAuthResponse().id_token);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    $('#profimg').attr('src', '../template/templates/dashboard/images/user.jpg');
    $('#signinbtn').css('display','inline');
    $('#namefield').css('display','none');
    $('#signout').css('display','none');
}