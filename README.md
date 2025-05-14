# AG Grid Testing Framework with Playwright

This framework demonstrates how to effectively test AG Grid functionality using Playwright and JavaScript. It provides a robust solution for automating AG Grid interactions with a focus on maintainability and reliability.

## 🌟 Highlights

- **AG Grid Integration**: Specialized tools and methods for interacting with AG Grid components including filtering, sorting, and cell value manipulation.
- **Modular Architecture**: Implements the Page Object Model (POM) for better code organization and maintainability.
- **Robust Selectors**: Uses ARIA attributes and role-based selectors for reliable element identification.
- **Detailed Reports**: Generates insightful reports using Playwright's HTML reporting for better debugging and analysis.
- **Maintainable Tests**: Clear and concise test structure that's easy to understand and extend.

## 🛠️ Setup Guide

1. Clone the repository and navigate to the project directory.
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## 🔍 Running Tests

Run all tests:
```bash
npx playwright test
```

Run specific test file:
```bash
npx playwright test tests/ag-grid.spec.js
```

Run tests with specific tag:
```bash
npx playwright test --grep '@ag-grid'
```

## 📈 Reporting

Generate and view detailed HTML reports for test results:
```bash
npx playwright show-report
```

## 🔑 Key Features

### AG Grid Testing Capabilities

The framework provides robust capabilities for testing AG Grid components:

#### Grid Interaction Methods
- **Column Filtering**: Test column filtering functionality with support for various filter types
- **Row Selection**: Verify row selection behavior
- **Cell Operations**: Test cell value updates and validation
- **Grid Navigation**: Methods for reliable grid traversal and element location

#### Page Object Pattern Implementation
The framework implements a comprehensive Page Object Model for AG Grid testing:

```javascript
// Example usage of AG Grid page object
const grid = new AgGridPage(page);
await grid.goto();
await grid.filterColumn("Language", "English");
await grid.verifyCell(0, 4, "English");
```

### Reliable Element Selection

The framework uses ARIA attributes and role-based selectors for robust element identification:
- Uses `[role="grid"]` for grid container
- Uses `[role="row"]` for row elements
- Uses `[role="columnheader"]` for column headers
- Uses `[aria-colindex]` for precise cell targeting

### Available VS Code Tasks

The framework includes pre-configured VS Code tasks for common operations:
- **Run All Tests**: Execute all test suites
- **Run Tests (Headed)**: Run tests with browser visible
- **Show Test Report**: Open the test results report
- **Start MCP Server**: Start the Model Context Protocol server

To run these tasks in VS Code:
1. Press `Ctrl+Shift+P`
2. Type "Tasks: Run Task"
3. Select the desired task from the list
