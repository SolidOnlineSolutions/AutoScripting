import crypto from 'crypto';

import * as OTPAuth from "otpauth";

import fs from 'fs';

function decrypt(encryptedText, key) {

    const decipher = crypto.createDecipher('aes-256-cbc', key);

    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');

    decrypted += decipher.final('utf8');
    
    return decrypted;

  }

class LoginPage{

constructor(page){

this.page = page;

this.username = page.locator('#i0116');

this.password = page.locator('#i0118');

this.userclick = page.locator('#idSIButton9');

this.passclick = page.locator('#idSIButton9');

this.signotherway = page.locator('#signInAnotherWay');

this.authcode = page.locator('div.content');

this.authTextbox = page.locator('#idTxtBx_SAOTCC_OTC');

this.submit = page.locator('#idSubmit_SAOTCC_Continue');

const key = 'SecretKey';  

this.decryptedUsername1 = decrypt(process.env.ENCRYPTED_USERNAME1, key);

this.decryptedPassword1 = decrypt(process.env.ENCRYPTED_PASSWORD1, key);

}

async goTo(){

await this.page.goto('https://connectortest.solidonline.com/');

}

async saveCookies() {

  await this.page.goto('https://connectoracc.solidonline.com/');

  await this.page.waitForTimeout(40000); 

  const cookies = await this.page.context().cookies();

  fs.writeFileSync('cookies.json', JSON.stringify(cookies));

  console.log('Cookies saved successfully!');

}

async savedCookies() {
  
  const cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));

  await this.page.context().addCookies(cookies);

  await this.page.goto('https://connectoracc.solidonline.com/');

}

async SSOLogin(){

    await this.username.fill(this.decryptedUsername1);

    await this.userclick.click();

    await this.password.fill(this.decryptedPassword1);

    await this.passclick.click();

    await this.signotherway.click();

    await this.authcode.nth(1).click();

    const otpInput = await this.page.waitForSelector('#idTxtBx_SAOTCC_OTC');

    let totp = new OTPAuth.TOTP({

      issuer: "Microsoft",

      algorithm: "SHA1",

      digits: 6,

      period: 30,

      secret: OTPAuth.Secret.fromBase32(process.env.M365_OTP_SECRET),

    });

    console.log(totp);

    const code = totp.generate();  
    
    await otpInput.fill(code);

    console.log(code);

    await this.page.locator('#idSubmit_SAOTCC_Continue').click();

    const authFile = '.auth/user.json'

    await this.page.locator('#idSIButton9').click();

}

}

export {LoginPage};