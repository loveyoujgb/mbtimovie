//테스트 연결
function addList() {
    const list = $('#listInput').val()
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: {list_give: list},
        success: function (response) {
            alert(response["msg"])
        }
    })
}
function to_choice() {
location.href="/choice"
}

/*손현수*/

function to_movie() {
    window.location.href="/movie"
}


$(document).ready(function () {
    show_movie();
});
  function show_movie() {
      $.ajax({
          type: 'GET',
          url: '/MM',
          data:{},
          success:function (response){
            let rows = response['all_movie']
              for (let i = 0; i <rows.length;i++){
                  let mbti= rows[i]['mbti']
                  let title = rows[i]['title']
                  let story = rows[i]['story']
                  let director = rows[i]['director']
                  let reason = rows[i]['reason']


              }
          }
      });
  }



/*정성일*/
function sign_in() {
    let username = $("#input-username").val()
    let password = $("#input-password").val()

    if (username == "") {
        $("#help-id-login").text("아이디를 입력해주세요.")
        $("#input-username").focus()
        return;
    } else {
        $("#help-id-login").text("")
    }

    if (password == "") {
        $("#help-password-login").text("비밀번호를 입력해주세요.")
        $("#input-password").focus()
        return;
    } else {
        $("#help-password-login").text("")
    }
    $.ajax({
        type: "POST",
        url: "/sign_in",
        data: {
            username_give: username,
            password_give: password
        },
        success: function (response) {
            if (response['result'] == 'success') {
                $.cookie('mytoken', response['token'], {path: '/'});
                window.location.replace("/")
                alert(`${username}님,안녕하세요!`)
            } else {
                alert(response['msg'])
            }
        }
    });
}

function sign_up() {
    let username = $("#input-username").val()
    let password = $("#input-password").val()
    let password2 = $("#input-password2").val()
    console.log(username, password, password2)


    if ($("#help-id").hasClass("is-danger")) {
        alert("아이디를 다시 확인해주세요.")
        return;
    } else if (!$("#help-id").hasClass("is-success")) {
        alert("아이디 중복확인을 해주세요.")
        return;
    }

    if (password == "") {
        $("#help-password").text("비밀번호를 입력해주세요.").removeClass("is-safe").addClass("is-danger")
        $("#input-password").focus()
        return;
    } else if (!is_password(password)) {
        $("#help-password").text("비밀번호의 형식을 확인해주세요. 영문과 숫자 필수 포함, 특수문자(!@#$%^&*) 사용가능 8-20자").removeClass("is-safe").addClass("is-danger")
        $("#input-password").focus()
        return
    } else {
        $("#help-password").text("사용할 수 있는 비밀번호입니다.").removeClass("is-danger").addClass("is-success")
    }
    if (password2 == "") {
        $("#help-password2").text("비밀번호를 입력해주세요.").removeClass("is-safe").addClass("is-danger")
        $("#input-password2").focus()
        return;
    } else if (password2 != password) {
        $("#help-password2").text("비밀번호가 일치하지 않습니다.").removeClass("is-safe").addClass("is-danger")
        $("#input-password2").focus()
        return;
    } else {
        $("#help-password2").text("비밀번호가 일치합니다.").removeClass("is-danger").addClass("is-success")
    }
    $.ajax({
        type: "POST",
        url: "/sign_up/save",
        data: {
            username_give: username,
            password_give: password
        },
        success: function (response) {
            alert("회원가입을 축하드립니다!")
            window.location.replace("/login")
        }
    });

}

function toggle_sign_up() {
    $("#sign-up-box").toggleClass("is-hidden")
    $("#div-sign-in-or-up").toggleClass("is-hidden")
    $("#btn-check-dup").toggleClass("is-hidden")
    $("#help-id").toggleClass("is-hidden")
    $("#help-password").toggleClass("is-hidden")
    $("#help-password2").toggleClass("is-hidden")
}

function is_nickname(asValue) {
    var regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,10}$/;
    return regExp.test(asValue);
}

function is_password(asValue) {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
    return regExp.test(asValue);
}

function check_dup() {
    let username = $("#input-username").val()
    console.log(username)
    if (username == "") {
        $("#help-id").text("아이디를 입력해주세요.").removeClass("is-safe").addClass("is-danger")
        $("#input-username").focus()
        return;
    }
    if (!is_nickname(username)) {
        $("#help-id").text("아이디의 형식을 확인해주세요. 영문과 숫자, 일부 특수문자(._-) 사용 가능. 2-10자 길이").removeClass("is-safe").addClass("is-danger")
        $("#input-username").focus()
        return;
    }
    $("#help-id").addClass("is-loading")
    $.ajax({
        type: "POST",
        url: "/sign_up/check_dup",
        data: {
            username_give: username
        },
        success: function (response) {

            if (response["exists"]) {
                $("#help-id").text("이미 존재하는 아이디입니다.").removeClass("is-safe").addClass("is-danger")
                $("#input-username").focus()
            } else {
                $("#help-id").text("사용할 수 있는 아이디입니다.").removeClass("is-danger").addClass("is-success")
            }
            $("#help-id").removeClass("is-loading")

        }
    });
}

  function logout() {
            alert('로그아웃 되었습니다.')
            window.location.href = "/login"
   $.removeCookie('mytoken', {path: '/movie'});
        }

//메인페이지 슬라이드 기능
    var index = 0;   //이미지에 접근하는 인덱스
    window.onload = function(){
        slideShow();
    }

    function slideShow() {
    var i;
    var x = document.getElementsByClassName("slide1");  //slide1에 대한 dom 참조
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";   //처음에 전부 display를 none으로 한다.
    }
    index++;
    if (index > x.length) {
        index = 1;  //인덱스가 초과되면 1로 변경
    }
    x[index-1].style.display = "block";  //해당 인덱스는 block으로
    setTimeout(slideShow, 3500);   //함수를 4초마다 호출

}


//choice movie 병합

        function INTJ(){
            if($('#INTJ-movie').css('display') == 'none'){
            $('#INTJ-movie').show();
        }else{
            $('#INTJ-movie').hide();
        }
        }
        function INTP(){
            if($('#INTJ-movie').css('display') == 'none'){
            $('#INTJ-movie').show();
        }else{
            $('#INTJ-movie').hide();
        }
        }
        function ENTJ(){
            if($('#INTJ-movie').css('display') == 'none'){
            $('#INTJ-movie').show();
        }else{
            $('#INTJ-movie').hide();
        }
        }
        function ENTP(){
            if($('#INTJ-movie').css('display') == 'none'){
            $('#INTJ-movie').show();
        }else{
            $('#INTJ-movie').hide();
        }
        }
         function INFJ(){
            if($('#INTJ-movie').css('display') == 'none'){
            $('#INTJ-movie').show();
        }else{
            $('#INTJ-movie').hide();
        }
        }
         function INFP(){
            if($('#INTJ-movie').css('display') == 'none'){
            $('#INTJ-movie').show();
        }else{
            $('#INTJ-movie').hide();
        }
        }
          function ENFJ(){
            if($('#INTJ-movie').css('display') == 'none'){
            $('#INTJ-movie').show();
        }else{
            $('#INTJ-movie').hide();
        }
        }
          function ENFP(){
            if($('#INTJ-movie').css('display') == 'none'){
            $('#INTJ-movie').show();
        }else{
            $('#INTJ-movie').hide();
        }
        }
          function ISTJ(){
            if($('#INTJ-movie').css('display') == 'none'){
            $('#INTJ-movie').show();
        }else{
            $('#INTJ-movie').hide();
        }
        }
          function ISFJ(){
            if($('#INTJ-movie').css('display') == 'none'){
            $('#INTJ-movie').show();
        }else{
            $('#INTJ-movie').hide();
        }
        }
                  function ESTJ(){
            if($('#ESTJ-movie').css('display') == 'none'){
            $('#ESTJ-movie').show();
        }else{
            $('#ESTJ-movie').hide();
        }
        }
                  function ESFJ(){
            if($('#ESFJ-movie').css('display') == 'none'){
            $('#ESFJ-movie').show();
        }else{
            $('#ESFJ-movie').hide();
        }
        }
                          function ISTP(){
            if($('#ISTP-movie').css('display') == 'none'){
            $('#ISTP-movie').show();
        }else{
            $('#ISTP-movie').hide();
        }
        }
                          function ISFP(){
            if($('#ISFP-movie').css('display') == 'none'){
            $('#ISFP-movie').show();
        }else{
            $('#ISFP-movie').hide();
        }
        }
                                  function ESTP(){
            if($('#ESTP-movie').css('display') == 'none'){
            $('#ESTP-movie').show();
        }else{
            $('#ESTP-movie').hide();
        }
        }
                                  function ESFP(){
            if($('#ESFP-movie').css('display') == 'none'){
            $('#ESFP-movie').show();
        }else{
            $('#ESFP-movie').hide();
        }
        }
