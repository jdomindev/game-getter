const wishListData = JSON.parse(localStorage.getItem('wishList'));

displayCards(wishListData, $('.wishlistContainer'), isWishList = true);