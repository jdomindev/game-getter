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
  }).then(function (data) {
    console.log(data);
    // createCard(data)
    displayTopGets(data)
  });
}
queryDeals();

function displayTopGets(cheapsharkData){
  console.log(cheapsharkData);
  for(i=0;i<cheapsharkData.length;i++){
   var game= cheapsharkData[i]

  }
}

function createCard(game) {
 
    var card = $("<div>").attr("class", "card");
    var cardImage = $("<div>").attr("class", "card-image");
    var img = $("<img>");
    var cardTitle = $("<p>").css("class", "card-title");
    var addBtn = $("<a>").attr(
      "class",
      "btn-floating halfway-fab waves-effect waves-light red"
    );
    var btnContent = $("<i>").attr("class", "material-icons");
    btnContent.text("add");
    addBtn.append(btnContent);
    cardTitle.text(data[i].title);

    img.attr("src", data[i].thumb);
    img.attr("alt", "Sorry No Image Found");

    cardImage.append(img,cardTitle,addBtn);
    card.append(cardImage);

    $(".topGetsContainer").append(card);
    console.log(data[i]);
  
}

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
