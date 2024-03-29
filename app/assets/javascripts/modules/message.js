$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      let html = 
        `<div class="MessageBox" data-message-id=${message.id}>
          <div class="message-list">
            <div class="content1">
              <div class="name">
                ${message.user_name}
              </div>
              <div class="update">
                ${message.created_at}
              </div>
            </div>
            <div class="content2">
              <p class="Message__content">
                ${message.content}
              </p>
              <img class="Message__image" src="${message.image}">
            </div>
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="MessageBox" data-message-id=${message.id}>
        <div class="message-list">
          <div class="content1">
            <div class="name">
              ${message.user_name}
            </div>
            <div class="update">
              ${message.created_at}
            </div>
          </div>
          <div class="content2">
            <p class="Message__content">
              ${message.content}
            </p>
          </div>
        </div>
      </div>`
      return html;
    };  
  }

  $('.message-form').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.MessageField').append(html);
      $('form')[0].reset();
      $('.MessageField').animate({ scrollTop: $('.MessageField')[0].scrollHeight});
      $(".send-button").prop("disabled", false);
    })
    .fail(function(data) {
      console.log(data)
      alert("メッセージ送信に失敗しました");
      $(".send-button").prop("disabled", false);
    });
  });
  
});