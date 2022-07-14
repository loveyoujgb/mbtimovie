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
location.href="/movie"
}

//<------로그인 창-------->
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
                window.location.replace("/movie")
                alert(`${username}님,안녕하세요!`)
            } else {
                alert(response['msg'])
            }
        }
    });
}

//<------회원가입 창-------->
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
       $.removeCookie('mytoken', {path: '/'});
        }

  function toggle_like(post_id, type) {
console.log(post_id, type)
let $a_like = $(`#${post_id} a[aria-label='heart']`)
let $i_like = $a_like.find("i")
if ($i_like.hasClass("fa-heart")) {
$.ajax({
    type: "POST",
    url: "/update_like",
    data: {
        post_id_give: post_id,
        type_give: type,
        action_give: "unlike"
    },
    success: function (response) {
        console.log("unlike")
        $i_like.addClass("fa-heart-o").removeClass("fa-heart")
        $a_like.find("span.like-num").text(num2str(response["count"]))
    }
})
} else {
$.ajax({
    type: "POST",
    url: "/update_like",
    data: {
        post_id_give: post_id,
        type_give: type,
        action_give: "like"
    },
    success: function (response) {
        console.log("like")
        $i_like.addClass("fa-heart").removeClass("fa-heart-o")
        $a_like.find("span.like-num").text(num2str(response["count"]))
    }
})

}
}

function post() {
  let comment = $("#textarea-post").val()
  let today = new Date().toISOString()
  $.ajax({
      type: "POST",
      url: "/posting",
      data: {
          comment_give: comment,
          date_give: today
      },
      success: function (response) {
          $("#modal-post").removeClass("is-active")
          window.location.reload()
      }
  })
}

function num2str(count) {
      if (count > 10000) {
          return parseInt(count / 1000) + "k"
      }
      if (count > 500) {
          return parseInt(count / 100) / 10 + "k"
      }
      if (count == 0) {
          return ""
      }
      return count
  }

function get_posts(username) {
    if (username == undefined) {
        username = ""
    }
  $.ajax({
      type: "GET",
      url: `/get_posts?username_give=${username}`,
      data: {},
      success: function (response) {
          if (response["result"] == "success") {
              let posts = response["posts"]
              for (let i = 0; i < posts.length; i++) {
                  let post = posts[i]
          }}
          }})}

function to_movie(mm) {
        $.ajax({
      type: "GET",
      url: '/get_posts',
      data: {},
      success: function (response) {
              let posts = response["posts"]
              for (let i = 0; i < posts.length; i++) {
                  let post = posts[i]
                  let title = post["title"]
                  let story = post["story"]
                  let director = post["director"]
                  let type = post["type"]
                  let mbti = post["mbti"]
                  let img = post["img"]
                  let class_heart = post['heart_by_me'] ? "fa-heart" : "fa-heart-o"
                  let count_heart = post['count_heart']
                  let html_temp = `<div class="mbti-list"><div class =${mbti}>
                                        <div class="card ">
                                        <div class="poster">
                                          <img src="${img}" class="card-img-top" width="100%" height="100%" alt="...">
                                         </div>
                                        <div class="movie-contents">
                                          <h5 id = "card-3" class="movie-title">${title}</h5>
                                            <div class="heart" id="${post["_id"]}">
                                             <a aria-label="heart" onclick="toggle_like('${post['_id']}', 'heart')">
                                              <span ><i class="fa ${class_heart} fa-2x" aria-hidden="true"></i></span>&nbsp;<span style="font-size: 18pt" class="like-num">${count_heart}</span>
                                             </a>
                                          </div>
                                          <p class="text">${director}"</p>
                                          <p class="text">${type}"</p>
                                          <p style="font-size: 12pt" class="text">${story}"</p>
                                          <span>#${mbti}</span>
                                       </div>
                                      </div>
                                      </div>
                                  </div>`
                  $("#post-outbox").append(html_temp)
                  var tag = document.getElementsByClassName(mbti)
                  for (let i = 0; i < tag.length; i++) {
                      $(tag[i]).hide();
                  }
                  var tag_P = document.getElementsByClassName(mm);
                  $(tag_P[0]).show();
                  for (let i = 0; i < tag_P.length; i++) {
                  console.log(tag_P[i])}
              }}})}