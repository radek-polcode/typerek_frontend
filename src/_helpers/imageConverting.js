import image2base64 from 'image-to-base64';
import config from '../_config/production';

export const imageConverting = {
  // base64StringToImage,
  createImageLink,
  imageToBase64String
}

function imageToBase64String(filepath) {
  if (filepath === undefined) {
    return undefined
  } else {
    image2base64(filepath)
      .then(
        (response) => {
          console.log(response)
        }
      )
      .catch(
        (error) => {
          console.log(error)
        }
      )
  }
}

function createImageLink(link) {
  return config.apiUrl + link
}

// function base64StringToImage(string, name) {
//   if (string === undefined) {
//     return undefined
//   } else {
//     return Base64.decode(string)
//   }   
// }