import assert from 'assert';

import XLSX from 'xlsx';

function getDataFromXls(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[2]; // Get the first sheet
    const SFTP_acc = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(SFTP_acc); // Convert the sheet to JSON format
    return data;
  };

class SFTPAccInfoCreationPage {

    constructor(page) {

        this.page = page;

        this.Modules = page.locator('#lblheaderModules');
        this.AccInfmodule = page.locator("a[href*='AccessInformation']");
        this.iframe = page.frameLocator('iframe[name="mainwindow"]');
        this.AInew = this.iframe.locator('#btnNew');
        this.AIdesc = this.iframe.locator('#txtDescription');
        this.AItype = this.iframe.locator('#ddType');
        this.AItokentype = this.iframe.locator('#ddAccessTokenType');
        this.SFTPURL = this.iframe.locator('#txtSftpUrl');
        this.SFTPclientid = this.iframe.locator('#txtClientIDS');
        this.SFTPclientsecret = this.iframe.locator('#txtClientSecretS');
        this.SFTPport = this.iframe.locator('#txtPort');
        this.saveMasterdata = this.iframe.locator('#MasterDataSave');
        this.AItypegrid = this.iframe.locator('#ddlType');
        this.gridRefresh = this.iframe.locator('#btnRefresh');
        this.gridRows = this.iframe.locator('tr.odd, tr.even');

    }

    async AISFTPModulechose() {

        await this.Modules.hover();

        await this.page.waitForSelector("a[href*='AccessInformation']", { state: 'visible' });

        await this.AccInfmodule.click();

    }

    async NewAccInf() {

        await this.page.mouse.move(0, 0);

        await this.AInew.click();

        await this.page.waitForLoadState('load');

        await this.saveMasterdata.waitFor({ state: 'visible' });

        await this.page.waitForTimeout(5000);

    }

    async NewAccInfcreation() {


        const filePath = 'testdataconnector.xlsx'; 
        const testDatasftp = getDataFromXls(filePath);

        console.log(testDatasftp);

        for (const row of testDatasftp) {
            
              const xlsxAIType = row['SFTPAccInfo'];
            const xlsxSFTPdescription = row['SFTPdescription'];
            const xlsxSFTPUrl = row['SFTPUrl'];
            const xlsxSFTPClientid = row['SFTPClientid'];
            const xlsxSFTPClientsecret = row['SFTPClientsecret'];
            const xlsxSFTPPort = row['SFTPPort'];


        await this.AIdesc.fill(xlsxSFTPdescription);

        await this.AItype.selectOption({ label: xlsxAIType });

        await this.SFTPURL.fill(xlsxSFTPUrl);

        await this.SFTPclientid.fill(xlsxSFTPClientid);

        await this.SFTPclientsecret.fill(xlsxSFTPClientsecret);

        await this.SFTPport.fill(String(xlsxSFTPPort));

        await this.saveMasterdata.click();

        await this.page.waitForTimeout(3000);
        }
    }

    async NewSFTPAccInfingrid(expect) {


        
        const filePath = 'testdataconnector.xlsx'; 
        const testDatasftp = getDataFromXls(filePath);

        console.log(testDatasftp);

        for (const row of testDatasftp) {
            
              const xlsxAIType = row['SFTPAccInfo'];
            const xlsxSFTPdescription = row['SFTPdescription'];

        await this.AInew.waitFor();

        await this.AItypegrid.selectOption({ label: xlsxAIType });

        await this.page.waitForLoadState('networkidle');

        await this.AIdesc.fill(xlsxSFTPdescription);

        await this.gridRefresh.click();

        await this.page.waitForTimeout(3000);

        let cellText;

        for (let i = 0; i < await this.gridRows.count(); i++) {

            const row = this.gridRows.nth(i);

            const columnIndex = 3;

            const cell = row.locator(`td:nth-child(${columnIndex})`);

            cellText = await cell.textContent();

            if (cellText === xlsxSFTPdescription) {

                console.log("Created the New Access information properly and also available in grid");

                break;

            }
            
        }
        assert.strictEqual(cellText, xlsxSFTPdescription, 'SFTPAccInfo description is not available in grid');
    }
}
}

export { SFTPAccInfoCreationPage };

