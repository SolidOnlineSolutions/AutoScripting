import { test as setup } from '@playwright/test'

const authFile = '.auth/user.json'

const { LoginPage } = require('../Pageobjects/LoginPage.mjs');

const { ShardSelectionPage } = require('../Pageobjects/ShardSelectionPage.mjs');

setup('MFA login', async ({ page }) => {

  const login = new LoginPage(page);

  const Shard = new ShardSelectionPage(page);

  await login.goTo();

  await login.SSOLogin();

  await page.context().storageState({ path: authFile });

  console.log("Storage state saved to:", authFile);


})