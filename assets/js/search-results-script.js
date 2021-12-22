var raysApiKey = "key=a2f96b8c6ee949b1a819b121660cd2bf";
var urlFront = "https://api.rawg.io/api/";


const queryData = (filters) => {
  let typeData;
  let typeUrl = `${urlFront}games?${raysApiKey}`;
  for (const [key, value] of Object.entries(filters)) {
    const queryParam = `&${key}=${value.join(',')}`;
    typeUrl += queryParam;
  }

  $.ajax(
    {
      url: typeUrl,
      method:'GET'
    }
  )
  .then(data => {
    console.log(data);
    }
  );
};

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
  function searchByNameCheapShark(gameName){
      var searchUrl = `https://www.cheapshark.com/api/1.0/games?title=${gameName}`
      $.ajax({
          url:searchUrl,
          method:'GET'
      }).then(function(data){
          console.log(data);
      })
      
  }
  searchByNameCheapShark('Skyrim')
  queryDeals()