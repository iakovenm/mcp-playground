// pages/ag-grid-page.js
const { expect } = require("@playwright/test");

class AgGridPage {
  constructor(page) {
    this.page = page;
  }

  // Locators as getters
  get grid() {
    return this.page.locator('[role="grid"]');
  }
  get rows() {
    return this.page.locator('[role="row"]');
  }

  getRowsInGrid(rowIndex) {
    return this.page.locator(`.ag-center-cols-container [row-index="${rowIndex}"]`);
  }
  get columnHeaders() {
    return this.page.locator('[role="columnheader"]');
  }

  async filterButtonByCol(name) {
    // Get the column index for the given name
    const headers = await this.columnHeaders.allTextContents();
    const colIdx = headers.findIndex(h => h.includes(name));
    // The filter row is the third rowgroup, and its gridcells match the columns
    return this.page.locator('[role="rowgroup"]').nth(2)
      .locator('[role="row"]').first()
      .locator('[role="gridcell"]').nth(colIdx)
      .locator('button[aria-label="Open Filter Menu"]');
  }

  filterCheckboxByValue(value) {
    return this.page.locator(`.ag-set-filter-item:has-text("${value}") input`)
  }
  cell(rowIdx, colIdx) {
    // Use aria-colindex for robust cell selection
    return this.getRowsInGrid(rowIdx)
      .locator(`[role="gridcell"][aria-colindex="${colIdx}"]`);
  } // +2 skips header and filter row

  async goto() {
    await this.page.goto("https://www.ag-grid.com/example/");
    await expect(this.grid).toBeVisible();
  }
  async openFilter(columnName) {
    // Find the column index by header text using [aria-colindex]
    const headerCells = this.page.locator('[role="columnheader"]');
    const headerCount = await headerCells.count();
    let colAriaIndex = null;
    for (let i = 0; i < headerCount; i++) {
      const text = await headerCells.nth(i).textContent();
      if (text && text.includes(columnName)) {
        colAriaIndex = await headerCells.nth(i).getAttribute('aria-colindex');
        break;
      }
    }
    if (!colAriaIndex) throw new Error(`Column "${columnName}" not found`);

    // Find the filter row and cell by [aria-colindex]
    const filterRows = this.page.locator('[role="row"]');
    const rowCount = await filterRows.count();
    let filterBtn = null;
    for (let i = 0; i < rowCount; i++) {
      const cell = filterRows.nth(i).locator(`[role="gridcell"][aria-colindex="${colAriaIndex}"]`);
      const btn = cell.locator('button[aria-label="Open Filter Menu"]');
      if (await btn.count() > 0 && await btn.isVisible()) {
        filterBtn = btn;
        break;
      }
    }
    if (!filterBtn) throw new Error(`Filter button for column "${columnName}" not found`);
    await filterBtn.click();
  }
  
  async filterColumn(colName, filterValue) {
    await this.openFilter(colName);
    await this.filterCheckboxByValue("(Select All)").click();
    await this.filterCheckboxByValue(filterValue).click();
    await this.page.keyboard.press("Escape");
  }

}

module.exports = { AgGridPage };
