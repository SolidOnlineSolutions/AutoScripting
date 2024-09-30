
require('dotenv').config();

const assert = require('assert');

class AccinfoCreation{

constructor(page){
    
this.page = page;

this.Modules = page.locator('#lblheaderModules');
this.AccInfmodule = page.locator("a[href*='AccessInformation']");

this.iframe = page.frameLocator('iframe[name="mainwindow"]');
this.AInew = this.iframe.locator('#btnNew'); 
this.AIdesc = this.iframe.locator('#txtDescription');
this.AItype = this.iframe.locator('#ddType'); 
this.AItokentype = this.iframe.locator('#ddAccessTokenType'); 
this.AIclientid = this.iframe.locator('#txtUsername'); 
this.AIclientsecret = this.iframe.locator('#txtPassword'); 
this.saveMasterdata = this.iframe.locator('#MasterDataSave'); 
this.AItypegrid = this.iframe.locator('#ddlType'); 
this.gridRefresh = this.iframe.locator('#btnRefresh'); 
this.gridRows = this.iframe.locator('tr.odd, tr.even'); 

}

    async Modulechose(){
    
        await this.Modules.hover();
            
        await this.page.waitForSelector("a[href*='AccessInformation']", { state: 'visible' });
            
        await this.AccInfmodule.click();
            
        }
    
    async NewAccInf(){
    
        await this.page.mouse.move(0, 0);
                
        await this.AInew.click();

        await this.AIdesc.waitfor();
    
        //await this.page.waitForLoadState('networkidle');
                
        }
    
    async NewAccInfcreation(){
            
        await this.AIdesc.fill(process.env.description);
                    
        await this.AItype.selectOption({ label: process.env.APIAccInfo });
                
        await this.AItokentype.selectOption({ label: process.env.AccInftokentype });
    
        await this.AIclientid.fill(process.env.ClientID);
    
        await this.AIclientsecret.fill(process.env.ClientSecret);
    
        await this.saveMasterdata.click();
                    
        }    
    
    async NewAccInfingrid(expect){
    
        await this.AInew.waitFor();
    
        await this.AItypegrid.selectOption({ label: process.env.APIAccInfo });
    
        await this.page.waitForLoadState('networkidle');
    
        await this.AIdesc.fill(process.env.description);
    
        await this.gridRefresh.click();
    
        await this.page.waitForTimeout(3000); 
    
        for (let i = 0; i < await this.gridRows.count(); i++) {
    
        const row = this.gridRows.nth(i);
    
        const columnIndex = 3;
        
        const cell = row.locator(`td:nth-child(${columnIndex})`); 
    
        const cellText = await cell.textContent();

        expect(cellText).toBe(process.env.AIdesc);
        
        //if(cellText === process.env.description){
    
         // console.log("Created the New Access information properly and also available in grid");
    
         // break;
    
        //}
      }
    }
}
    //module.exports = {AccinfoCreation};

    export { AccinfoCreation };

    