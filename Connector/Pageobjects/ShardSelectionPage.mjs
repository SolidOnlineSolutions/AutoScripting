import assert from 'assert';

class ShardSelectionPage {

    constructor(page) {

        this.page = page;

        this.mandantbrowser = page.locator('#btnMandantBrowser');

        this.mandantDetailsFrame = page.frameLocator('#kop');

        this.popupbrowser = page.frameLocator('#popupFrameDraggable');

        this.mandantsearchtxtbox = this.popupbrowser.locator('#browSearch');

        this.mandantlist = this.popupbrowser.locator('#divGrid #gvBrowse tr:nth-child(2) td:nth-child(2)');

        this.mandantDetails = this.mandantDetailsFrame.locator('#table2 tbody tr td:nth-child(1) table tbody tr td #lblHdr3');

    }

    async MandantChose() {



        await this.mandantbrowser.click();

        await this.mandantsearchtxtbox.fill(process.env.Shardname);

        await this.mandantsearchtxtbox.press('Enter');

        await this.mandantlist.waitFor({ state: 'visible' });

        await this.mandantlist.click();

        const mandantAndOwner = await this.mandantDetails.textContent();

        const mandantAndOwnerInArray = mandantAndOwner.split(',');

        const mandantName = mandantAndOwnerInArray[1];

        console.log(mandantName);

        const expectedValue = process.env.Shardname;

        console.log(process.env.ShardName)

        assert.strictEqual(mandantName, expectedValue, 'Mandant name is wrong');
    }



}



export { ShardSelectionPage };
