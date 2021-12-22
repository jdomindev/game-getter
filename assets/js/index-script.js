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

//search for deals
function queryDeals() {
    var cheapSharkUrl = "https://www.cheapshark.com/api/1.0/deals";
    $.ajax({
      url: cheapSharkUrl,
      method: "GET",
    }).then(function (data) {
      console.log(data);
      for (i = 0; i < data.length; i++) {
        var topCard = $("<div>").attr("class", "border");
        var name = $("<p>").css("font-weight", "bold");
        name.text(data[i].title)
        topCard.append(name)
        $(".topGetsContainer").append(topCard);
        console.log(data[i].title);
      }
  
      
    });
  }
  queryDeals();

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