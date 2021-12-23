var raysApiKey = "key=a2f96b8c6ee949b1a819b121660cd2bf";
var urlFront = "https://api.rawg.io/api/";

const searchListener = (query, filters) => {
  if (!query && filters.keys.length === 0) {
    $("#modal").dialog({
      modal: true,
      draggable: false,
      buttons: [
        {
          text: "OK",
          click: function () {
            $(this).dialog("close");
          },
        },
      ],
    });
  } else {
    const filterParams = [];
    for (const [key, value] of Object.entries(filters)) {
      const filterParam = `${key}=${value.join(",")}`;
      filterParams.push(filterParam);
    }
    const filterString = filterParams.join("&");
    window.location.replace(
      `search-results.html?search=${query}&${filterString}`
    );
  }
};

//Called on load
$(document).ready(function () {
  $("select").formSelect();
});

//search for deals
function queryDeals() {
  var cheapSharkUrl = "https://www.cheapshark.com/api/1.0/deals";
  $.ajax({
    url: cheapSharkUrl,
    method: "GET",
  }).then(function(data) {
    for (i = 0; i < data.length; i++) {
      displayCards(data, $(".topGetsContainer"));
    }
  });
}
queryDeals();

//Event Listeners
$("#search-button").click(function () {
  const keywords = $("#search-input").val();
  const filters = {};


  const platformSelect = document.querySelector('#platform-select');
  const platformInstance = M.FormSelect.getInstance(platformSelect);
  const platforms = platformInstance.getSelectedValues();

  if (platforms.length > 0) {
    filters.platforms = platforms;
  }


  const genreSelect = document.querySelector('#genre-select');
  const genreInstance = M.FormSelect.getInstance(genreSelect);
  const genres = genreInstance.getSelectedValues();

  if (genres.length > 0) {
    filters.genres = genres;
  }

  searchListener(keywords, filters);
});
