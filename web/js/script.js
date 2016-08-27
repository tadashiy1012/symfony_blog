$(document).ready(function() {
  console.log('ready');
  const getEntries = () => {
    const defer = $.Deferred();
    $.ajax({
      url: '/blog',
      method: 'GET',
      success: defer.promise,
      error: defer.reject
    });
    return defer.promise();
  };
  const out = $('#entries');
  getEntries().then((resp) => {
    const entries = JSON.parse(resp);
    console.log(entries);
  });
});