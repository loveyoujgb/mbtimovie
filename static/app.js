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
function to_login() {
    window.location.href = "/login"
}