//require('dotenv').config();
const path = require('path');

import XLSX from 'xlsx'; // Import XLSX

function getDataFromXls(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[5]; // Get the first sheet
  const Mapping = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(Mapping); // Convert the sheet to JSON format
  return data;
};


class MappingCreationPage {
  constructor(page) {
    this.page = page;
    this.mainframe = this.page.frameLocator('#mainwindow');
    
    // Locators
    this.modulemenu = this.page.locator('#lblheaderModules');
    this.module = this.page.getByRole('link', { name: 'Mapping', exact: true });
    this.templatetext = this.mainframe.locator('#txtTemplateName');
    this.mappingfiletype = this.mainframe.getByRole('radio', { name: 'JSON' });
    this.targettopic = this.mainframe.locator('#ddlTargetTopic');
    this.mappingsave = this.mainframe.getByRole('button', { name: 'Save' });
    this.mappingexpand = this.mainframe.getByRole('button', { name: 'Expand' });
    this.targetnode1 = this.mainframe.locator('#tvTargetn3CheckBox');
    this.sourcenode1 = this.mainframe.locator('#tvSourcen1CheckBox');
    this.mappingnodesave = this.mainframe.getByRole('button', { name: 'Save' });
    this.sourcenode2 = this.mainframe.locator('#tvSourcen2CheckBox');
    this.targetnode2 = this.mainframe.locator('#tvTargetn24CheckBox');
    this.fileChooserButton = this.mainframe.getByRole('button', { name: 'Choose file' });
    this.fileInput = this.mainframe.locator('input[type="file"]');
  }

  async openFileChooser() {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.fileChooserButton.click();
    const fileChooser = await fileChooserPromise;
    return fileChooser;
  }

  async uploadFile(filePath) {
    const fileChooser = await this.openFileChooser();
    await fileChooser.setFiles(filePath);
  }

  async fillTemplate(templateName) {
    if (typeof templateName !== 'string' || !templateName.trim()) {
      throw new Error(`Invalid templateName: ${templateName}`);
    }
    await this.templatetext.click(); // Focus on the text box
    await this.templatetext.fill(templateName); // Fill the text box with the template name
  }

  async selectFileType() {
    await this.mappingfiletype.check();
  }

  async selectTargetTopic(option) {
    await this.targettopic.selectOption(option);
  }

  async saveMapping() {
    await this.mappingsave.click();
  }

  async expandMapping() {
    await this.mappingexpand.click();
  }

  async checkCheckbox(locator) {
    // Ensure checkbox is checked or attempt to check it
    const isChecked = await locator.isChecked();
    if (!isChecked) {
      console.error(`Checkbox ${await locator.evaluate(el => el.id)} is not checked. Attempting to check.`);
      await locator.click(); // Attempt a direct click to check the checkbox
      await this.page.waitForTimeout(1000); // Wait for state to update
    }

    // Recheck the checkbox state
    const finalChecked = await locator.isChecked();
    if (!finalChecked) {
      throw new Error(`Checkbox ${await locator.evaluate(el => el.id)} is still not checked after retry.`);
    }
  }

  async checkNodes() {
    // Check target node 1
    await this.targetnode1.check();
    
    // Check source node 1
    await this.sourcenode1.check();
    
    // Save the current state
    await this.mappingnodesave.click();
    
    // Ensure the target node 2 checkbox is checked
    console.log('Checking target node 2 state...');
    await this.checkCheckbox(this.targetnode2);
    
    // Ensure the source node 2 checkbox is checked
    console.log('Checking source node 2 state...');
    await this.checkCheckbox(this.sourcenode2);

    // Save after checking nodes
    await this.mappingnodesave.click();
  }

  async MappingCreation() {

    const filePath = 'testdataconnector.xlsx'; 
        const testDatasftp = getDataFromXls(filePath);

        console.log(testDatasftp);

        for (const row of testDatasftp) {
            
              const xlsxMappingtemplate = row['TemplateName'];

   
    await this.modulemenu.hover();
    await this.module.click();
    await this.page.mouse.move(0, 0);

    // Fill the template text box with the desired description
    await this.fillTemplate(xlsxMappingtemplate); 

    // Select file type
    await this.selectFileType();

    // Select target topic
    await this.selectTargetTopic('8438586E-2BE0-48FF-845A-2F2BE4BA83ED');

    // Upload file
    const filePath = path.resolve(__dirname, '../Add_User_Post.json');
    await this.uploadFile(filePath);

    // Save mapping
    await this.saveMapping();

    // Wait for the page to load and elements to be stable
    await this.page.waitForLoadState('load');
    await this.page.waitForTimeout(5000);

    // Expand mapping and check nodes
    await this.expandMapping();
    await this.page.waitForLoadState('load');
    await this.page.waitForTimeout(5000);

    //await this.page.pause();
    await this.checkNodes();

        }
  }
}

export { MappingCreationPage };
