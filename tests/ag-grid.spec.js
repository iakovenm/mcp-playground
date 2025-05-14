// tests/ag-grid.spec.js
const { test, expect } = require("@playwright/test");
const { AgGridPage } = require("../pages/ag-grid-page");

test.describe("AG Grid Performance Example", () => {
  test("Should filter the Language column and display filtered record", async ({
    page,
  }) => {
    const grid = new AgGridPage(page);
    await grid.goto();
    // Filter by "English" in Language column
    await grid.filterColumn("Language", "English");
    expect(await grid.cell(0,4)).toHaveText("English");
  });

});
