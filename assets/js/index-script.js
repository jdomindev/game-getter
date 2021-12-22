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
    const queryString = queryParams.join('&');
    window.location.replace(`search-results.html?search=${query}&${queryString}`);
  }
}

//Called on load
$(document).ready(function() {
  $('select').formSelect();
});

//Event Listeners