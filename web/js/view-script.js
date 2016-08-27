$(document).ready(function() {
  console.log('view ready');
  const getEntry = (id) => {
    const defer = $.Deferred();
    $.ajax({
      url: '/blog/' + id,
      method: 'GET',
      success: defer.resolve,
      error: defer.reject
    });
    return defer.promise();
  };
  const inId = $('#entryId');
  const id = inId.val();
  const out = $('#entry');
  getEntry(id).then((resp) => {
    const obj = JSON.parse(resp);
    out.empty();
    const card = $('<div class="card">');
    const content = $('<div class="card-content">');
    const title = $('<span class="card-title">');
    const dt = new Date(obj.date.date);
    const date = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate();
    const time = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
    title.append(obj.title).append(' | ').append($('<span>').append(date + ' ' + time));
    content.append(title).append($('<p>').append(obj.body));
    card.append(content);
    out.append(card);
  });
});