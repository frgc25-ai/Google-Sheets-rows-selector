/* 
Felipe Raymundo García Cavazos.

Created by Gemini AI and me on 3 - december - 2025

This scrip selects a number of rows above or below a mouse selected 
cell but only the cells that coincide vetically with filled cells on
the reference row.

It ask for: - the number of rows to be selected from the row with the mouse cliked cell.
            - if the selected rows will be above or below the reference mouse clicked cell.

for individual use of this scrip only:

function onOpen() {
  SpreadsheetApp.getUi()
     .createMenu('⚡ Selection Tools')
     .addItem('Empty-rows-selector-1', 'selectExistingRows')
     .addToUi();
}
*/
function Empty_rows_selector_1() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var ui = SpreadsheetApp.getUi();
  
  // 1. Get Context (Row AND Column)
  var activeCell = sheet.getActiveCell();
  var activeRow = activeCell.getRow();
  var activeCol = activeCell.getColumn(); 
  var lastDataCol = sheet.getLastColumn();

  // Calculate width: From current column to the last column with data
  var widthToSelect = lastDataCol - activeCol + 1;
  // Safety check: If you are to the right of the data, select at least 1 cell
  if (widthToSelect < 1) widthToSelect = 1;

  // 2. Ask: "How many rows (n)?"
  var input = ui.prompt('Select Rows', 'How many rows to select?', ui.ButtonSet.OK_CANCEL);
  if (input.getSelectedButton() != ui.Button.OK) return;
  
  var n = parseInt(input.getResponseText());
  if (isNaN(n) || n < 1) {
    ui.alert('Please enter a valid number greater than 0.');
    return;
  }

  // 3. Ask: "Direction?"
  var response = ui.alert('Direction', 'Select rows ABOVE the current line?\n(Click "No" for BELOW)', ui.ButtonSet.YES_NO_CANCEL);
  if (response == ui.Button.CANCEL) return;

  var startRow;

  // 4. Calculate the Start Row
  if (response == ui.Button.YES) {
    // ABOVE: Move back "n" rows
    startRow = activeRow - n;
    if (startRow < 1) {
      ui.alert('Error: Not enough rows above to select.');
      return;
    }
  } else {
    // BELOW: Start at next row
    startRow = activeRow + 1;
  }

  // 5. Execute Selection
  sheet.getRange(startRow, activeCol, n, widthToSelect).activate();
}