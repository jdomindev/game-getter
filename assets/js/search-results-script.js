const raysApiKey = "key=a2f96b8c6ee949b1a819b121660cd2bf";
const urlFront = "https://api.rawg.io/api/";
let next;
let previous;
let count;


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
    collectResults(data);
    }
  );
};

function collectResults(data) {
  const results = data.results;
  next = data.next;
  previous = data.previous;
  count = data.count;
  for (const result of results) {
    searchByNameCheapShark(result);
  }
}

function searchByNameCheapShark(game){
    var searchUrl = `https://www.cheapshark.com/api/1.0/deals?title=${game.name}`
    $.ajax({
        url: searchUrl,
        method:'GET'
    }).then(function(data){
        if (data.length > 0) {
          displayCards(data, $('#results'));
        }
    })
  }

  queryData();
 

  