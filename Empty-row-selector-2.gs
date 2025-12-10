//
// Felipe García.
//
// Created by Gemini AI on 3 - december - 2025
//
// This scrip selects a number of rows above or below a mouse selected 
// cell but only the cells that coincide vetically with filled cells on
// the reference row.
//
// It ask for: - the number of rows to be selected from the row with the mouse cliked cell.
//               with a plus or minus sign to specify if the selected rows will be above or below.
//               Then, this sscript eliminates asking for one parameter (above or below) reducing 
//               the execution time.
//
// for individual use of this scrip only:
//
//function onOpen() {
//SpreadsheetApp.getUi()
//    .createMenu('⚡ Fast Tools')
//    .addItem('Select Rows (+/-)', 'quickSelectRows')
//    .addToUi();
//}
function Empty_rows_selector_2() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var ui = SpreadsheetApp.getUi();
  
  // 1. Get Context
  var activeCell = sheet.getActiveCell();
  var activeRow = activeCell.getRow();
  var activeCol = activeCell.getColumn();
  var lastDataCol = sheet.getLastColumn();
  
  // Width math
  var widthToSelect = lastDataCol - activeCol + 1;
  if (widthToSelect < 1) widthToSelect = 1;

  // 2. SINGLE PROMPT: Ask for Number AND Direction at once
  // "5" = 5 rows below
  // "-5" = 5 rows above
  var input = ui.prompt('Quick Select', 'Enter rows:\n(Positive = Below, Negative = Above)', ui.ButtonSet.OK_CANCEL);
  
  if (input.getSelectedButton() != ui.Button.OK) return;
  
  var text = input.getResponseText();
  var n = parseInt(text);

  if (isNaN(n) || n === 0) {
    ui.alert('Please enter a valid non-zero number.');
    return;
  }

  var startRow;
  var rowsToSelect = Math.abs(n); // Convert -5 to just 5 for the height

  // 3. Calculate Logic
  if (n > 0) {
    // POSITIVE = BELOW
    startRow = activeRow + 1;
  } else {
    // NEGATIVE = ABOVE
    startRow = activeRow - rowsToSelect;
    if (startRow < 1) {
      ui.alert('Error: Not enough rows above.');
      return;
    }
  }

  // 4. Execute immediately
  sheet.getRange(startRow, activeCol, rowsToSelect, widthToSelect).activate();
}