export const formatId = (id) => {
  return String(id).padStart(3, '0');
}

export const removeLeadingZeros = (id) => {
  const result = String(id).replace(/^0+/, '');
  return result === '' ? '0' : result;
}

export const getImage = (id) => {
  const url = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/'
  return url + formatId(id) + '.png';
}