let page;

const { test:Connector,expect} = require('@playwright/test');

import {LoginPage} from '../Pageobjects/LoginPage';

import {ShardSelectionPage} from '../Pageobjects/ShardSelectionPage.mjs';

import {SFTPAccInfoCreationPage}  from '../Pageobjects/SFTPAccInfoCreationPage.mjs';

import { SysCreationPage } from '../Pageobjects/SysCreationPage.mjs';

import { RecipieUpdationPage } from '../Pageobjects/RecipieUpdationPage.mjs';

import { MappingCreationPage } from '../Pageobjects/MappingCreationPage.mjs';

import { SystemSettingsCreationPage } from '../Pageobjects/SystemSettingsCreationPage.mjs';

import { FTPPage } from '../Pageobjects/InputDataPushInFTP.mjs';

import { LoggingPage } from '../Pageobjects/LoggingPage.mjs';

import {PeopleEntityPage} from '../Pageobjects/PeopleEntityPage.mjs';

Connector.beforeAll(async ({ browser }) => {

    page = await browser.newPage();

    const login = new LoginPage(page);

    const shard = new ShardSelectionPage(page);

    await login.goTo();

    //await login.SSOLogin();

    //await login.savedCookies();

    await shard.MandantChose();


});

Connector('Systems Creation', async () => {

    const system = new SysCreationPage(page);

    await system.SYSModulechose();

    await system.NewSys();

    await system.systemcreation();

    await system.NewsysteminGrid();

});

Connector('Accessinfo Creation', async () => {

    const SFTPAccinfo = new SFTPAccInfoCreationPage(page);

    await SFTPAccinfo.AISFTPModulechose();

    await SFTPAccinfo.NewAccInf();

    await SFTPAccinfo.NewAccInfcreation();

    await SFTPAccinfo.NewSFTPAccInfingrid();

});

Connector('Mapping Creation', async () => {

    const mapping = new MappingCreationPage(page);

    await mapping.MappingCreation();

});

Connector('Systemsetting Creation', async () => {

    const SysSetting = new SystemSettingsCreationPage(page);

    await SysSetting.navigateToSystemSettings();

    await SysSetting.performSystemSettingsActions();

    await SysSetting.addNewRule();

    await SysSetting.fillNewRule();

});
/*
Connector('Recipie update', async () => {

    const Recipie = new RecipieUpdationPage(page);

    await Recipie.navigateToRecipie();

    await Recipie.RecipieRegularImp();

    await Recipie.ResponseFeedback();

    await Recipie.RetryMechanism();

    //await Recipie.RecipieRegularExp();

});

/*
Connector('File Upload in FTP', async () => {

    const ftpPage = new FTPPage();

    await ftpPage.connectToFTP();
  
    const localFilePath = 'E:/InputDataForFTP/Test.json';

    const remoteFilePath = '/TestFTPAutomation/Test.json';
  
    await ftpPage.uploadFile(localFilePath, remoteFilePath);

    console.log('File uploaded successfully');


});

Connector('Logging', async () => {

    const logging = new LoggingPage(page);

    const candidate = new PeopleEntityPage(page);

    await logging.loggingModuleChose();

    await logging.loggingSetup();

    await logging.GoAction();

    await logging.loggingData();

    await logging.entityInLogging();

    //await candidate.peopleModuleChose();

    //await candidate.peopleFromGrid();



});
*/


