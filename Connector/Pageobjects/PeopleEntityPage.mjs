import assert from 'assert';

class PeopleEntityPage{

    constructor(page){

        this.page = page;

        this.entityModules = this.page.locator('#lblHeaderStamgegevens');

        this.iframe = this.page.frameLocator('#mainwindow');
        
        this.gridRefresh = this.iframe.locator('#BtnRefresh'); 

        this.gridRows = this.iframe.locator('tr.odd, tr.even');

        this.peopleEntity = this.page.locator('a[target="mainwindow"]:has-text("Persons")');

        this.entityRefresh = this.iframe.locator('#BtnRefresh');

        this.peoplecode = this.iframe.locator('#TxtRow00');

        this.gridRows = this.iframe.locator('tr.odd, tr.even');

        this.cell = null;

        this.cellText = null;

        //this.entitCode= this.iframe.locator(`a.News`, { hasText: dynamicValue });
        
    }

    async waitForAllRequests(expectedUrlCount) {
      let requests = new Set();
  
      // Listen for requests
      this.page.on('request', request => {
          requests.add(request.url());
      });
  
      // Listen for responses
      await this.page.waitForResponse(response => {
          // Remove the URL from the set if it's in there
          requests.delete(response.url());
          return requests.size === 0; // Check if all requests are done
      });
  
      // Wait until the number of requests matches the expected number
      await this.page.waitForFunction((expectedCount) => {
          return window.performance.getEntriesByType('resource')
              .filter(entry => entry.initiatorType === 'xmlhttprequest').length >= expectedCount;
      }, {}, expectedUrlCount); // Pass expectedUrlCount here
  }

    async peopleModuleChose(){
    
        await this.entityModules.hover();
            
        //await this.page.waitForSelector('a[target="mainwindow"]:has-text("Persons")', { state: 'visible' });
            
        await this.peopleEntity.click();
            
        }

        async peopleFromGrid(){

            let dynamicvalue = process.env.entityId;

            await this.page.mouse.move(100, 100);

            await this.page.waitForTimeout(6000);
        
            await this.entityRefresh.click();

            await this.page.waitForTimeout(6000); 

            await this.peoplecode.fill(process.env.entityId);

            await this.entityRefresh.click();

            await this.page.waitForTimeout(6000); 

            const entityCode = this.iframe.locator(`a.News`, { hasText: process.env.entityId });

            await entityCode.click();

            let cellText;
        
            for (let i = 0; i < await this.gridRows.count(); i++) {
        
            const row = this.gridRows.nth(i);
        
            const columnIndex = 1;
            
            this.cell = row.locator(`td:nth-child(${columnIndex})`); 
        
            this.cellText = await this.cell.textContent();

            console.log(this.cellText);
            
            if(this.cellText === process.env.entityId){
        
              console.log("Candidate available in grid");

              await this.cell.click();
        
              break;
        
            }
          }

          await this.page.pause();

          assert.strictEqual(cellText, process.env.SYSDESC, 'System description is not available in grid');
        }
    
    }
    export {PeopleEntityPage};


