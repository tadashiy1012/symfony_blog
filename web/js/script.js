$(document).ready(function() {
  console.log('ready');
  const getEntries = () => {
    const defer = $.Deferred();
    $.ajax({
      url: '/blog/',
      method: 'GET',
      success: defer.resolve,
      error: defer.reject
    });
    return defer.promise();
  };
  const postEntry = (data) => {
    const defer = $.Deferred();
    $.ajax({
      url: '/blog/create',
      method: 'POST',
      data: JSON.stringify(data),
      success: defer.resolve,
      error: defer.reject
    });
    return defer.promise();
  };
  const drawEntries = () => {
    const out = $('#entries');
    getEntries().then((resp) => {
      const entries = JSON.parse(resp).reverse();
      out.empty();
      for (let obj of entries) {
        const card = $('<div class="card">');
        const content = $('<div class="card-content">');
        const anc = $('<a href="/view/' + obj.id + '">');
        const title = $('<span class="card-title">');
        const dt = new Date(obj.date.date);
        const date = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate();
        const time = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
        title.append(obj.title).append(' | ').append($('<span>').append(date + ' ' + time));
        anc.append(title);
        content.append(anc).append($('<p>').append(obj.body));
        card.append(content);
        out.append(card);
      }
    }, (err) => {
      console.log(err);
    });
  };
  const wBtn = $('#writeBtn');
  const modal = $('#modal1');
  const cancelBtn = $('#cancelBtn');
  const submitBtn = $('#submitBtn');
  wBtn.on('click', () => {
    modal.openModal();
  });
  cancelBtn.on('click', () => {
    modal.closeModal();
  });
  submitBtn.on('click', () => {
    const inTitle = $('#inTitle');
    const inBody = $('#inBody');
    const data = {title: inTitle.val(), body: inBody.val()};
    postEntry(data).then(() => {
      alert('success!');
      drawEntries();
      modal.closeModal();
    }, () => {
      alert('fail!');
      modal.closeModal();
    });
  });
  drawEntries();
});