
//const { test:Connector,expect} = require('@playwright/test');

const { test: Connector, expect } = require('@playwright/test');

const { LoginPage } = require('../Pageobjects/LoginPage.mjs');

const { ShardSelectionPage } = require('../Pageobjects/ShardSelectionPage.mjs');

Connector('SSOlogin', async ({ page }) => {

    const login = new LoginPage(page);

    const Shard = new ShardSelectionPage(page);

    await login.goTo();

    await login.SSOLogin();

    //await login.saveCookies();

});

