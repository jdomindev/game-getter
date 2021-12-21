var raysApiKey = "key=a2f96b8c6ee949b1a819b121660cd2bf";
var urlFront = "https://api.rawg.io/api/";


const queryGames = () => {
    const gameResults = {} 
  const gameUrl = `${urlFront}games?${raysApiKey}&page_size=40`;
//   const testUrl ='https://api.rawg.io/api/games?key=a2f96b8c6ee949b1a819b121660cd2bf'

  $.ajax({
        url: gameUrl,
        method:'GET'
  }).then(function(data){
      console.log(data.next);
      console.log(data.results);
  })
};
queryGames()