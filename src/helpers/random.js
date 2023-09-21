const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function randomString(length=16) {
  var result           = '';
  var charactersLength = ALPHABET.length;
  for ( var i = 0; i < length; i++ ) {
    result += ALPHABET.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
