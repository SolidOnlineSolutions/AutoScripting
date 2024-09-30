const crypto = require('crypto');

function encrypt(text, key) {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

const key = 'SecretKey';  // Replace this with your secure key
const username = 'Saravanakumar@solidonline.com';  // Replace this with your plain-text username
const password = '';  // Replace this with your plain-text password

const encryptedUsername = encrypt(username, key);
const encryptedPassword = encrypt(password, key);

console.log(`Encrypted Username: ${encryptedUsername}`);
console.log(`Encrypted Password: ${encryptedPassword}`);
