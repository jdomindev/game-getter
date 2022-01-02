let next;
let previous;
let count;

const activatePageButton = (url, button) => {
  $(`#${button}`).click(() => {
    const query = url.slice(url.indexOf('&') + 1);
    window.location.replace(`search-results.html?${query}`);
  }).css('display', 'inline');
}

const queryData = () => {
  const queryParams = window.location.search.slice(1);
  let queryUrl = `${urlFront}games?${josesApiKey}&${queryParams}`;
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
  const pageButtons = {};
  pageButtons.previous = data.previous;
  pageButtons.next = data.next;

  for (const button in pageButtons) {
    const url = pageButtons[button];
    if (url) {
      activatePageButton(url, button);
    }
  }

  count = data.count;
  $('#search-results').text(`Deals for ${data.count} games`);

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
          displayCards(data, $('.searchResultsContainer'));
        }
    })
  }

  queryData();
 

  