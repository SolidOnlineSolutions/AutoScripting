import XLSX from 'xlsx'; // Import XLSX

function getDataFromXls(filePath, sheetIndex) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[sheetIndex]; // Get the desired sheet by index
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet); // Convert the sheet to JSON format
    return data;
}

class SystemSettingsCreationPage {

   

    constructor(page) {
        this.page = page;
        this.popupFrame = page.frameLocator('iframe[name="popupFrameDraggable"]');
        this.iframe = page.frameLocator('iframe[name="mainwindow"]');
        this.mainpop = this.iframe.frameLocator('iframe[name="popupFrameDraggable"]');
        this.filePath = 'testdataconnector.xlsx'; // Define the path to your file
        this.loadSheetData();
    }

    loadSheetData() {
        // Reading data from two different sheets (Sheet1 and Sheet2)
        this.sheet1Data = getDataFromXls(this.filePath, 6); // Data from Sheet1
        this.sheet2Data = getDataFromXls(this.filePath, 3); // Data from Sheet2
        this.sheet3Data = getDataFromXls(this.filePath, 2); // Data from Sheet1
        this.sheet4Data = getDataFromXls(this.filePath, 5);
    }

    async navigateToSystemSettings() {
        const Modules = this.page.locator('#lblheaderModules');
        await Modules.hover();
        await this.page.getByRole('link', { name: 'System settings' }).click();
        await this.page.mouse.move(0, 0);
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(6000);
        //await this.captureScreenshot('system_settings');
    }

    async performSystemSettingsActions() {

        console.log(this.sheet1Data, this.sheet2Data);

        for (let i = 0; i < this.sheet1Data.length && i < this.sheet2Data.length; i++) {
            const sheet1Row = this.sheet1Data[i];
            const sheet2Row = this.sheet2Data[i];

            // Sheet1 data
            const xlsxSYSSETTINGDESC = sheet1Row['SysSettingDesc'];
            
            // Sheet2 data
            const xlsxSYSDESC= sheet2Row['SYSDESC'];
            

        await this.iframe.getByRole('textbox', { name: 'Description' }).click();
        await this.iframe.getByRole('textbox', { name: 'Description' }).fill(xlsxSYSSETTINGDESC);
        await this.iframe.getByRole('textbox', { name: 'System' }).click();
        await this.iframe.locator('#btnSystemEntity').click();
        await this.mainpop.getByPlaceholder('Search').fill(xlsxSYSDESC);

        //await this.page.pause();

        await this.mainpop.getByRole('button', { name: 'Search' }).click();
        await this.mainpop.getByRole('cell', { name: xlsxSYSDESC, exact: true }).click();
        await this.iframe.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(6000);
        //await this.captureScreenshot('system_settings_saved');
    }
}

    async addNewRule() {
        await this.iframe.getByRole('link', { name: 'Master data' }).click();
        await this.iframe.getByRole('button', { name: 'Add new rule' }).click();
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(6000);
        //await this.captureScreenshot('add_new_rule');

    }

    async fillNewRule() {
        //SFTPdescription

        console.log(this.sheet1Data, this.sheet2Data);

        for (let i = 0; i < this.sheet1Data.length && i < this.sheet2Data.length; i++) {
            const sheet3Row = this.sheet3Data[i];
            const sheet4Row = this.sheet4Data[i];

            // Sheet1 data
            const xlsxSFTPdescription = sheet3Row['SFTPdescription'];
            
            // Sheet2 data
            const xlsxTemplateName= sheet4Row['TemplateName'];


        await this.iframe.getByLabel('Topic', { exact: true }).waitFor({ state: 'visible' });
        await this.iframe.getByLabel('Topic', { exact: true }).selectOption('3');
        await this.iframe.getByLabel('Transport mechanism').selectOption('3');
        await this.iframe.locator('#chkUseAccessInfo').check();
        await this.iframe.getByLabel('Access information', { exact: true }).click();

        await this.mainpop.getByPlaceholder('Search').fill(xlsxSFTPdescription);
        await this.mainpop.getByRole('button', { name: 'Search' }).click();
        await this.mainpop.getByRole('cell', { name: xlsxSFTPdescription , exact: true }).click();

        await this.iframe.getByLabel('Type', { exact: true }).selectOption('1');
        await this.iframe.getByLabel('HTTP method').selectOption('0');
        await this.iframe.getByLabel('Order', { exact: true }).selectOption('1');
        await this.iframe.getByLabel('Mapping template', { exact: true }).click();

        await this.mainpop.getByPlaceholder('Search').fill(xlsxTemplateName);
        await this.mainpop.getByRole('button', { name: 'Search' }).click();
        await this.mainpop.getByRole('cell', { name: xlsxTemplateName, exact: true  }).click();
        

        await this.iframe.locator('#chkDonotMoveFile').check();
        await this.iframe.getByLabel('IN Folder').click();
        await this.iframe.getByLabel('IN Folder').fill('/Training/monish1/RR103/User');
        await this.iframe.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForLoadState('load');
       
       
    }
  
}
}


export  { SystemSettingsCreationPage };