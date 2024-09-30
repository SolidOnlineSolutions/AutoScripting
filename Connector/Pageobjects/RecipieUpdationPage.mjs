
//require('dotenv').config();

const assert = require('assert');


class RecipieUpdationPage{

constructor(page){

this.page = page;

this.Modules = page.locator('#lblheaderModules');
 
this.mainframe = page.frameLocator('#mainwindow');

this.frame = this.mainframe.frameLocator('iframe[src*="FreeField297"]');

this.RegularImpSysSet = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField297_89C69B39-85B5-47FB-8323-247E47A6C64F');

this.RegularExp1 = this.mainframe.locator('span.ajax__tab_outer').nth(1); // Selects the 2nd <span> element with class 'ajax__tab_outer'

this.RegularExp2 = this.page.frameLocator('iframe[name="mainwindow"]').getByRole('link', { name: 'Solid Online to target system (A>B)' });

this.RegularExpSysSet = this.page.frameLocator('iframe[name="mainwindow"]').getByRole('img');

this.RegularExpSysSetsearch = this.page.frameLocator('iframe[name="mainwindow"]').frameLocator('iframe[name="popupFrameDraggable"]').getByPlaceholder('Search');

this.RegularExpSysSetfill = this.page.frameLocator('iframe[name="mainwindow"]').frameLocator('iframe[name="popupFrameDraggable"]').getByPlaceholder('Search');

this.RegularExpSysSetsearchbtn = this.page.frameLocator('iframe[name="mainwindow"]').frameLocator('iframe[name="popupFrameDraggable"]').getByRole('button', { name: 'Search' });

this.RegularExpSysSetclick = this.page.frameLocator('iframe[name="mainwindow"]').frameLocator('iframe[name="popupFrameDraggable"]').getByRole('cell', { name: 'carerix_foreasyflex' });

this.RegularExpActive = this.mainframe.locator('#tabRecipe_pnl_BB188D3D-D78E-437E-9DF5-9BDFC6CC0759_chk_bb188d3d-d78e-437e-9df5-9bdfc6cc0759_BB188D3D-D78E-437E-9DF5-9BDFC6CC0759');
 
this.popupframe = page.frameLocator('#popupFrameDraggable');

this.systemsetting=process.env.Systemsettingdesc;

this.resultSsetting = this.frame.locator(`tr[onclick*="${this.systemsetting}"]`);

this.IntervalType = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField463_89C69B39-85B5-47FB-8323-247E47A6C64F');
 
this.timing1 = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField299_89C69B39-85B5-47FB-8323-247E47A6C64F');

this.timingtype1 = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField314_89C69B39-85B5-47FB-8323-247E47A6C64F');

this.timing2 = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_Freefield379_89C69B39-85B5-47FB-8323-247E47A6C64F');

this.timingtype2 = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_Freefield380_89C69B39-85B5-47FB-8323-247E47A6C64F');

this.timing3 = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_Freefield381_89C69B39-85B5-47FB-8323-247E47A6C64F');

this.timingtype3 = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_Freefield382_89C69B39-85B5-47FB-8323-247E47A6C64F');

this.timing4 = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_Freefield383_89C69B39-85B5-47FB-8323-247E47A6C64F');

this.timingtype4 = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_Freefield384_89C69B39-85B5-47FB-8323-247E47A6C64F');

this.starttime = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField465_89C69B39-85B5-47FB-8323-247E47A6C64F');

this.endtime = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField466_89C69B39-85B5-47FB-8323-247E47A6C64F');

this.startstoplog = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField500_89C69B39-85B5-47FB-8323-247E47A6C64F');

this.performanceanalysis = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField504_89C69B39-85B5-47FB-8323-247E47A6C64F');

//Response report
this.successResp = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField261_89C69B39-85B5-47FB-8323-247E47A6C64F');
this.funResp = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField260_89C69B39-85B5-47FB-8323-247E47A6C64F');
this.techResp= this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField271_89C69B39-85B5-47FB-8323-247E47A6C64F');

//Batch report
this.successBatch = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField273_89C69B39-85B5-47FB-8323-247E47A6C64F');
this.funBatch = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField272_89C69B39-85B5-47FB-8323-247E47A6C64F');
this.techBatch= this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField276_89C69B39-85B5-47FB-8323-247E47A6C64F');

//Batch report (detailed)
this.successDetailBatch = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField278_89C69B39-85B5-47FB-8323-247E47A6C64F');
this.funDetailBatch = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField277_89C69B39-85B5-47FB-8323-247E47A6C64F');
this.techDetailBatch= this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField279_89C69B39-85B5-47FB-8323-247E47A6C64F');

//Sent day report
this.successDayReport = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField514_89C69B39-85B5-47FB-8323-247E47A6C64F');
this.funDayReport = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField515_89C69B39-85B5-47FB-8323-247E47A6C64F');
this.techDayReport= this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField516_89C69B39-85B5-47FB-8323-247E47A6C64F');

this.attempt1 = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_Freefield373_89C69B39-85B5-47FB-8323-247E47A6C64F');
this.attempt1type = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_Freefield374_89C69B39-85B5-47FB-8323-247E47A6C64F');

this.attempt2 = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_Freefield375_89C69B39-85B5-47FB-8323-247E47A6C64F');
this.attempt2type = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_Freefield376_89C69B39-85B5-47FB-8323-247E47A6C64F');

this.attempt3 = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_Freefield377_89C69B39-85B5-47FB-8323-247E47A6C64F');
this.attempt3type = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_Freefield378_89C69B39-85B5-47FB-8323-247E47A6C64F');

this.monDay = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField306_89C69B39-85B5-47FB-8323-247E47A6C64F');
this.tuesDay = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField307_89C69B39-85B5-47FB-8323-247E47A6C64F');
this.wednesDay = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField308_89C69B39-85B5-47FB-8323-247E47A6C64F');
this.thursDay = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField309_89C69B39-85B5-47FB-8323-247E47A6C64F');
this.friDay = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField310_89C69B39-85B5-47FB-8323-247E47A6C64F');
this.saturDay = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField311_89C69B39-85B5-47FB-8323-247E47A6C64F');
this.sunDay = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_FreeField312_89C69B39-85B5-47FB-8323-247E47A6C64F');

this.RegularImpActive = this.mainframe.locator('#tabRecipe_pnl_89C69B39-85B5-47FB-8323-247E47A6C64F_chk_89c69b39-85b5-47fb-8323-247e47a6c64f_89C69B39-85B5-47FB-8323-247E47A6C64F');

this.recipieModule=this.page.locator("a[href*='Recipe']");
}

async navigateToRecipie(){

    await this.Modules.hover();

    await this.page.waitForSelector("a[href*='Recipe']", { state: 'visible' });

    await this.recipieModule.click();


}

async RecipieRegularImp(){

    await this.page.mouse.move(0, 0);

    await this.page.waitForTimeout(2000);

    await this.RegularImpSysSet.click();
  
//await page.waitForLoadState('networkidle');
  
await this.frame.locator('input[placeholder="Search"]').fill(process.env.Systemsettingdesc);
 
await this.frame.locator('input[placeholder="Search"]').press('Enter');
 
await this.resultSsetting.waitFor();
 
await this.resultSsetting.click();

await this.page.waitForTimeout(4000);
 
await this.page.waitForLoadState('load');
 
await this.IntervalType.selectOption("Tijdsinterval");
 
await this.page.waitForLoadState('load');
 
//Interval

await this.timing1.fill("1");

await this.timingtype1.selectOption("Minuut / Minuten");

await this.timing2.fill("1");

await this.timingtype2.selectOption("Minuut / Minuten");

await this.timing3.fill("1");

await this.timingtype3.selectOption("Minuut / Minuten");

await this.timing4.fill("1");

await this.timingtype4.selectOption("Minuut / Minuten");
  
//Start time and End time
await this.starttime.fill('07:00');
await this.endtime.fill('18:00');

//Day(s) of the week
await this.monDay.check();
await this.tuesDay.check();
await this.wednesDay.check();
await this.thursDay.check();
await this.friDay.check();
await this.saturDay.check();
await this.sunDay.check();

//Start and stop log and Performance analysis
await this.startstoplog.check();
await this.performanceanalysis.check();

//A Tab active
await this.RegularImpActive.check();

await this.page.waitForLoadState('load');

await this.page.waitForTimeout(5000);

}

 async ResponseFeedback(){

//Responses to source system
await this.successResp.check();
await this.funResp.check();
await this.techResp.check();

//Batch report
await this.successBatch.check();
await this.funBatch.check();
await this.techBatch.check();

//Batch report (detailed)
await this.successDetailBatch.check();
await this.funDetailBatch.check();
await this.techDetailBatch.check();

//Sent day report
await this.successDayReport.check();
await this.funDayReport.check();
await this.techDayReport.check();

}

async RetryMechanism(){
await this.attempt1.fill("10");
await this.attempt1type.selectOption("Seconde / Seconden");

await this.attempt2.fill("20");
await this.attempt2type.selectOption("Seconde / Seconden");

await this.attempt3.fill("30");
await this.attempt3type.selectOption("Seconde / Seconden");

}

async RecipieRegularExp(){

await this.RegularExp1.click();

await this.RegularExp2.click();

await this.RegularExpSysSet.click();

await this.RegularExpSysSetsearch.click();

await this.RegularExpSysSetfill.fill('carerix_foreasyflex');

await this.RegularExpSysSetsearchbtn.click();

await this.RegularExpSysSetclick.click();

await this.page.waitForLoadState('load');

await this.page.waitForTimeout(5000);

await this.RegularExpActive.check();

await this.page.frameLocator('iframe[name="mainwindow"]').getByRole('button', { name: 'Save' }).click();

await this.page.pause();

}

  
}
export { RecipieUpdationPage };