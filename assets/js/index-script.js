var brandLogo = document.querySelector(".brand-logo")
      brandLogo.classList.add("left")

const searchListener = (query, filters) => {
  if (!query && !filters.keys) {
    $('.modal').modal('open');
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
  $("#modal").modal();
  $("select").formSelect();
});

//search for deals
function queryDeals() {
  var cheapSharkUrl = "https://www.cheapshark.com/api/1.0/deals?pageSize=10";
  $.ajax({
    url: cheapSharkUrl,
    method: "GET",
  }).then(function(data) {
    displayCards(data, $(".topGetsContainer"));
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
