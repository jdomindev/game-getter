const searchListener = (query, filters) => {
  if (!query && filters.keys.length === 0) {
    $('#modal').dialog({
      modal: true,
      draggable: false,
      buttons: [
        {
          text: "OK",
          click: (function() {
            $(this).dialog("close");
          })
        }
      ]
    })
  } else {
    const filterParams = [];
    for (const [key, value] of Object.entries(filters)) {
      const filterParam = `${key}=${value.join(',')}`;
      filterParams.push(filterParam);
    }
    const filterString = filterParams.join('&');
    window.location.replace(`search-results.html?search=${query}&${filterString}`);
  }
}

//Called on load
$(document).ready(function() {
  $('select').formSelect();
});

//Event Listeners
$('#search-button').click(function() {
  const keywords = $('#search-input').val();
  const filters = {};

  const platforms = $('#platform-select').getSelectedValues();
  if (platforms.length > 0) {
    filters.platforms = platforms;
  }

  const genres = $('#genre-select').getSelectedValues();
  if (genres.length > 0) {
    filters.genres = genres;
  }

  searchListener(keywords, filters);
});