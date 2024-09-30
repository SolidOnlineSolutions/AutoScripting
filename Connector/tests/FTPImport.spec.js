const { test:Connector,expect} = require('@playwright/test');

import { FTPPage } from '../Pageobjects/InputDataPushInFTP.mjs';

Connector('File Upload in SFTP', async () => {

    const ftpPage = new FTPPage();

    await ftpPage.connectToFTP();
  
    const localFilePath = 'E:/InputDataForFTP/Test.json';

    const remoteFilePath = '/TestFTPAutomation/Test.json';
  
    await ftpPage.uploadFile(localFilePath, remoteFilePath);

    console.log('File uploaded successfully');


});