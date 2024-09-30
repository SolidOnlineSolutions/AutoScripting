import assert from 'assert';

class LoggingPage {

    constructor(page) {

        this.page = page;

        this.settingModule = page.locator('#lblHeaderSettings');

        this.loggingMenu = page.locator("a[href*='Logging']");

        this.iframe = page.frameLocator('iframe[name="mainwindow"]');

        //this.goButton = this.iframe.locator("#btnGOab");    

        this.loggingMessage = this.iframe.locator('#lbl_success');

        this.gridRows = this.iframe.locator('tr.odd, tr.even');

        this.refreshButton = this.iframe.locator('#btnRefresh');

        this.startDate = this.iframe.locator('#txtStartDate');

        this.endDate = this.iframe.locator('#txtEndDate');

        this.startTime = this.iframe.locator('#txtStartTime');

        this.endTime = this.iframe.locator('#TxtEndTime');

        this.cellText = null;

        this.cellText2 = null;

        this.timeIs = null;

        this.endDateIs = null;

        this.endDateValueIs = null;

        this.waybackGo = this.iframe.locator('[title="Start application B>A (one-time, without updating the last execution time)"]');

        this.regularGo = this.iframe.locator('[title="Start application A>B (one-time, without updating the last execution time) "]')

        this.batchId = null;

        this.entityEdit = this.iframe.locator('#btnSave');

        this.firstName = this.iframe.locator('#FreeField162');

        this.surName = this.iframe.locator('#FreeField164');

        this.entityId = null;

        this.count = null;

        this.entityFO1 = null;

        this.entityModules = this.page.locator('#lblHeaderStamgegevens');

        this.processingElement = this.iframe.locator('#tblsourceImportToolLog_processing');

        this.people = this.page.locator('a[target="mainwindow"]:has-text("Persons")');

        this.entityId = this.iframe.locator(`a.News`, { hasText: process.env.entityId });
    }

    async loggingModuleChose() {

        await this.settingModule.hover();

        await this.page.waitForSelector("a[href*='Logging']", { state: 'visible' });

        await this.loggingMenu.click();

    }

    async loggingSetup() {

        await this.page.mouse.move(0, 0);

        //this.endDateIs = await endDate.textContent();

        this.endDateValueIs = await this.endDate.getAttribute('value');

        for (let i = 0; i < 1; i++) {

            const row = this.gridRows.nth(i);

            const loggingdescription1 = 10;

            const cell = row.locator(`td:nth-child(${loggingdescription1})`);

            this.cellText = await cell.textContent();

            const dateTimeIs = this.cellText.split(' ');

            this.timeIs = dateTimeIs[1].substring(0, 5);

            break;

        }

        await this.startTime.fill(this.timeIs);

        console.log(this.endDateValueIs);

        await this.startDate.fill(this.endDateValueIs);


    }

    async GoAction() {

        await this.regularGo.click();

        //await this.waybackGo.click();

        await this.page.waitForTimeout(3000);

        await this.page.waitForLoadState('load');

        await this.refreshButton.waitFor({ state: 'visible' });

        //await this.gridLoad.textContent();

        await this.refreshButton.click();

        await this.page.waitForTimeout(4000);

        await this.page.waitForLoadState('load');

        await this.refreshButton.waitFor({ state: 'visible' });

    }

    async loggingData() {

        let i = 0;

        let message1 = "Process completed.Supplier blocked.";

        const loggingdescription1 = 4;

        while (true) {

            const row = this.gridRows.nth(i);

            const cell1 = row.locator(`td:nth-child(${loggingdescription1})`);

            this.cellText = await cell1.textContent();

            if (this.cellText !== message1) {

                console.log("Logging process going");

                await this.refreshButton.click();

                await this.page.waitForTimeout(4000);

                await this.page.waitForLoadState('load');

                await this.refreshButton.waitFor({ state: 'visible' });

            } else if (this.cellText === message1) {

                console.log("Logging process completed");

                for (let i = 0; i < 1; i++) {

                    const row = this.gridRows.nth(i);

                    const loggingdescription2 = 11;

                    this.batchId = row.locator(`td:nth-child(${loggingdescription2})`);

                    await this.batchId.click();

                    assert.strictEqual(this.cellText, message1, 'Batch id clicked');

                }

                break;

            }

        }

    }

    async entityInLogging() {

        await this.page.waitForTimeout(5000);

        console.log("Batch opened");

        let recordStatus = "Process completed.Supplier blocked.";

        this.count = await this.gridRows.count();

        console.log(this.count);

        //const isVisible = await this.processingElement.isVisible();

        for (let i = 0; i < await this.gridRows.count(); i++) {

            const row = this.gridRows.nth(i);

            const columnIndex3 = 4;

            const cell2 = row.locator(`td:nth-child(${columnIndex3})`);

            this.cellText2 = await cell2.textContent();

            console.log(this.cellText2);

            if (this.cellText2 === recordStatus) {

                console.log("Candidate record created properly");

                //const columnIndex4 = 7;

                //this.entityId = row.locator(`td:nth-child(${columnIndex4})`);

                //this.iframe.locator(`a.News`, { hasText: process.env.entityId });

                this.entityId = process.env.entityid; // Retrieve dynamic value from environment variables

                this.entitylocator = row.locator(`a:has-text("${this.entityId}")`);

                await this.entitylocator.click();

                //this.entityFO1 = await this.entityId.textContent();

                //await this.page.pause();

                //assert.strictEqual(this.cellText2, recordStatus, 'Entity clicked')

                break;

            }


        }


        /*await this.page.waitForTimeout(5000);
        
        await this.page.waitForLoadState('load');
        
        await this.entityEdit.waitFor({ state: 'visible' });
        
        const firstNameIs = await this.firstName.textContent();
        
        const surNameIs = await this.surName.textContent();
        
        assert.strictEqual(firstNameIs, process.env.FirstName, 'FirstName not matched');
        
        assert.strictEqual(surNameIs, process.env.LastName, 'LastName not matched');*/

    }

    async peopleEntity() {

        await this.entityModules.hover();

        await this.page.waitForSelector("a[href*='AccessInformation']", { state: 'visible' });

        await this.people.click();


    }

}

export { LoggingPage };