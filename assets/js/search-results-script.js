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
