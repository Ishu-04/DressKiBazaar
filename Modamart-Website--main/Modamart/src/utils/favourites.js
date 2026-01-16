export function getFavourites() {
  const stored = localStorage.getItem('likedProducts');
  return stored ? JSON.parse(stored) : [];
}

export function setFavourites(favs) {
  localStorage.setItem('likedProducts', JSON.stringify(favs));
  window.dispatchEvent(new CustomEvent('likedCountUpdated', { detail: favs.length }));
}

export function toggleFavourite(id) {
  let favs = getFavourites();
  if (favs.includes(id)) {
    favs = favs.filter((itemId) => itemId !== id);
  } else {
    favs.push(id);
  }
  setFavourites(favs);
  return favs;
}

export function removeFavourite(id) {
  let favs = getFavourites().filter((itemId) => itemId !== id);
  setFavourites(favs);
  return favs;
}