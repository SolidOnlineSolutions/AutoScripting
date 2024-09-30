import assert from 'assert';
import XLSX from 'xlsx'; // Import XLSX

function getDataFromXls(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[3]; // Get the desired sheet
    const System = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(System); // Convert the sheet to JSON format
    return data;
}

class SysCreationPage {

    constructor(page) {
        this.page = page;

        this.Modules = page.locator('#lblheaderModules');
        this.iframe = page.frameLocator('#mainwindow');
        this.Systemnew = this.iframe.locator('#BtnNew');
        this.SystemdescBrowser = this.iframe.locator('#Locale');
        this.SystemPopupBrowser = this.iframe.frameLocator('#popupFrameDraggable');
        this.SystemDutchText = this.SystemPopupBrowser.locator('#txtDescription');
        this.Systemtype = this.iframe.locator('#FreeField67');
        this.Timezone = this.iframe.locator('#FreeField72');
        this.TimeStamp = this.iframe.locator('#FreeField75');
        this.ResponseType = this.iframe.locator('#FreeField64');
        this.ResponseField = this.iframe.locator('#FreeField66');
        this.sysmodule = page.locator('#div11 a[href*="EntityList"]');
        this.statustextbox = this.page.frameLocator('iframe[name="mainwindow"]').frameLocator('iframe[name="popupFrameDraggable"]').getByPlaceholder('Search');
        this.statuscode = this.page.frameLocator('iframe[name="mainwindow"]').frameLocator('iframe[name="popupFrameDraggable"]').getByRole('cell', { name: '200', exact: true });
        this.savestatus = this.page.frameLocator('iframe[name="mainwindow"]').frameLocator('iframe[name="popupFrameDraggable"]').getByRole('button', { name: 'Select' });
        this.descsave = this.SystemPopupBrowser.locator('#btnSave');
        this.saveMasterdata = this.iframe.locator('#btnSave');
        this.statusbrowser = this.iframe.locator('#StatuscodesID');
        this.systemGridDescription = this.iframe.locator('#TxtRow01');
        this.gridRefresh = this.iframe.locator('#BtnRefresh');
        this.gridRows = this.iframe.locator('tr.odd, tr.even');
        this.statuspopupbrowser = this.iframe.frameLocator('iframe[name="popupFrameDraggable"]');
        this.statusdropdown = this.statuspopupbrowser.locator('#cmbSearchpattern');
    }

    async SYSModulechose() {
        await this.Modules.hover();
        await this.page.waitForSelector('#div11 a[href*="EntityList"]', { state: 'visible' });
        await this.sysmodule.click();
    }

    async NewSys() {
        await this.page.mouse.move(100, 100);
        await this.Systemnew.click();
        await this.page.waitForLoadState('load');
        await this.TimeStamp.waitFor({ state: 'visible' });
    }

    async systemcreation() {
        const filePath = 'testdataconnector.xlsx';
        const testDatasyst = getDataFromXls(filePath);

        console.log(testDatasyst);

        for (const row of testDatasyst) {
            const xlsxSYSTYPE = row['SYSTYPE'];
            const xlsxSYSDESC = row['SYSDESC'];
            const xlsxTIMEZONE = row['TIMEZONE'];
            const xlsxRESPONSEFILETYPE = row['RESPONSEFILETYPE'];
            const xlsxRESPONSEFIELD = row['RESPONSEFIELD'];
            const xlsxStatuscodeis = row['Statuscodeis'];

            await this.Systemtype.selectOption({ value: xlsxSYSTYPE });
            await this.SystemdescBrowser.waitFor();
            await this.page.waitForTimeout(2000);
            await this.SystemdescBrowser.click();
            await this.page.waitForLoadState('load');
            await this.SystemDutchText.fill(xlsxSYSDESC);
            await this.descsave.click();
            await this.page.waitForLoadState('load');
            await this.TimeStamp.waitFor({ state: 'visible' });
            await this.TimeStamp.click();
            await this.Timezone.selectOption({ value: xlsxTIMEZONE });
            await this.ResponseType.selectOption({ label: xlsxRESPONSEFILETYPE });
            await this.ResponseField.selectOption({ label: xlsxRESPONSEFIELD });
            await this.statusbrowser.click();
            await this.page.waitForLoadState('load');
            await this.statustextbox.fill(String(xlsxStatuscodeis));
            await this.statustextbox.press('Enter');
            await this.page.waitForLoadState('load');
            await this.statuscode.waitFor({ state: 'visible' });
            await this.statuscode.click();
            await this.savestatus.click();
            await this.page.waitForLoadState('load');
            await this.saveMasterdata.waitFor({ state: 'visible' });
            await this.saveMasterdata.click();
            await this.page.waitForTimeout(10000);
        }
    }

    async NewsysteminGrid() {

        const filePath = 'testdataconnector.xlsx';
        const testDatasyst = getDataFromXls(filePath);

        console.log(testDatasyst);

        for (const row of testDatasyst) {

            const xlsxSYSDESC = row['SYSDESC'];

        await this.page.waitForLoadState('load');
        await this.systemGridDescription.waitFor({ state: 'visible' });
        await this.systemGridDescription.fill(xlsxSYSDESC);
        await this.gridRefresh.click();
        await this.page.waitForTimeout(6000);
        await this.systemGridDescription.waitFor();

        let cellText;

        for (let i = 0; i < await this.gridRows.count(); i++) {
            const row = this.gridRows.nth(i);
            const columnIndex = 2;
            const cell = row.locator(`td:nth-child(${columnIndex})`);
            cellText = await cell.textContent();
            console.log(cellText);

            if (cellText === xlsxSYSDESC) {
                console.log("Created the New System properly and also available in grid");
                break;
            }
        }
    

        assert.strictEqual(cellText, xlsxSYSDESC, 'System description is not available in grid');
    }
}
}

export { SysCreationPage };
