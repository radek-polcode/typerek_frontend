import config from '../_config/production';

export const imageHelper = {
  createImageLink,
}

function createImageLink(link) {
  return config.apiUrl + link
}

