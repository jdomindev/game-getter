const josesApiKey = "13f0865d360448869a9a58bf94ea926f";
var urlFront = "https://api.rawg.io/api/";

function createCard(game, stores, isWishList) {
  const storeData = stores.filter(store => store.storeID === game.storeID);
  const storeName = storeData[0].storeName;
  var card = $("<div>").attr("class", "card");
  var cardImage = $("<div>").attr("class", "card-image");
  var img = $("<img>").attr("class", "card-img");
  var cardTitle = $("<p>").attr("class", "card-title");
  var btn = $("<a>").attr(
    "class",
    "btn-floating halfway-fab waves-effect waves-light red"
  ).data('game', game);
  var btnContent = $("<i>").attr("class", "material-icons");
  if (isWishList) {
    btn.addClass('delete-button');
    btnContent.text("delete");
    btn.click(function() {
      if (!localStorage.getItem('wishList')) {
        localStorage.setItem('wishList', '[]');
      }
      const wishList = JSON.parse(localStorage.getItem('wishList'));
      const instanceTitle = $(this).data("game").title;
      const instanceStoreID = $(this).data("game").storeID;
      const filteredList = wishList.filter(item => item.title !== instanceTitle && item.storeID !== instanceStoreID);
      localStorage.setItem('wishList', JSON.stringify(filteredList));
      window.location.reload();
    });
  } else {
    btn.addClass('add-button');
    btnContent.text("add");
    btn.click(function() {
      if (!localStorage.getItem('wishList')) {
        localStorage.setItem('wishList', '[]');
      }
      const wishList = JSON.parse(localStorage.getItem('wishList'));
      const instanceTitle = $(this).data("game").title;
      const instanceStoreID = $(this).data("game").storeID;
      const listFilter = wishList.filter(item => item.title === instanceTitle && item.storeID === instanceStoreID);
      if (listFilter.length === 0) {
        wishList.push($(this).data("game"));
        localStorage.setItem('wishList', JSON.stringify(wishList));
        M.toast({html: `${instanceTitle} from ${storeName} added to wish list`});
      } else {
        M.toast({html: `${instanceTitle} from ${storeName} already in wish list`});
      }
    });
  }
  btn.append(btnContent);
  
  cardTitle.text(game.title);

  img.attr("src", game.thumb);
  img.attr("alt", "Sorry No Image Found");

  card.append(cardTitle);
  cardImage.append(img, btn);
  card.append(cardImage);

  
  const cardContent = $("<div>").attr("class", "card-content");

  const normalPrice = game.normalPrice;
  const salePrice = game.salePrice;
  const savings = Math.round(game.savings);
  const storeSpan = $("<span>").attr('class', 'store-name').text(storeName);
  const normalPriceSpan = $("<span>").attr('class', 'normal-price').text(normalPrice).css('text-decoration', 'line-through');
  const salePriceSpan = $("<span>").attr('class', 'sale-price').text(salePrice);
  const savingsSpan = $("<span>").attr('class', 'savings').text(`${savings}%`);

  const cardDeal = $("<span>").append([storeSpan, normalPriceSpan, salePriceSpan, savingsSpan]).css({"display": "flex", "justify-content": "space-between"});
  cardContent.append(cardDeal);
  card.append(cardContent);

  return card;
}

function displayCards(cheapsharkData, container, isWishList = false){
  const queryUrl = `https://www.cheapshark.com/api/1.0/stores`;
  $.ajax(
    {
      url: queryUrl,
      method:'GET'
    }
  )
  .then(stores => {
    for (let i = 0; i < cheapsharkData.length; i++) {
      const card = createCard(cheapsharkData[i], stores, isWishList);
      container.append(card);
    }
  });
}