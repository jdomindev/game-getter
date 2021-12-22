var raysApiKey = "key=a2f96b8c6ee949b1a819b121660cd2bf";
var urlFront = "https://api.rawg.io/api/";


const queryData = () => {
  const queryParams = window.location.search.slice(1);
  let queryUrl = `${urlFront}games?${raysApiKey}&${queryParams}`;
  $.ajax(
    {
      url: queryUrl,
      method:'GET'
    }
  )
  .then(data => {
    displayResults(data);
    }
  );
};

function displayResults(data) {
  const results = data.results;
  const next = data.next;
  const previous = data.previous;
  for (const result of results) {
    searchByNameCheapShark(result);
  }
}

//search for deals
function queryDeals(){
  var cheapSharkUrl = 'https://www.cheapshark.com/api/1.0/deals'
    $.ajax({
      url:cheapSharkUrl,
      method: 'GET'
    }).then(function(data){
      console.log(data)
    })
  }
//   need to move to index.html
  function searchByNameCheapShark(game){
      var searchUrl = `https://www.cheapshark.com/api/1.0/games?title=${game.name}`
      $.ajax({
          url:searchUrl,
          method:'GET'
      }).then(function(data){
          console.log(data);
          if (data) {
            makeCard(game, data);
          }
      })
      
  }
  searchByNameCheapShark('Skyrim')
  queryDeals()
  queryData();