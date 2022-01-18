//Search function in jQuery
$('#searchInput').keyup(() => {
  //Get search value
  let data = $('#searchInput').val();

  //Send search to server
  $.ajax({
    url: '/search/blog',
    type: 'POST',
    data: JSON.stringify({ search: data }),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    async: true,
    //On successful response
    success: (response) => {
      let searchField = $('#searchResult');
      searchField.empty();

      //If User find
      if (response.user) {
        for (let i = 0; i < response.user.length; i++) {
          searchField.append(`
          <li class="list-group-item">
            <a href="/user/${response.user[i]._id}">${response.user[i].username}</a>
          </li>
        `);
        }
        //If null result
      } else if (response.error) {
        searchField.append(`<li class="list-group-item">${response.error}</li>`);
      }
    },
  }).fail((err) => {
    console.log(err);
  });
});
