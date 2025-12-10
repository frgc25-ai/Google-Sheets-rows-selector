/* --- In Menu.gs ---
Felipe García, 3-december-2025

This scrit controlls the calling of "Empty-row-selector" routines from the menu.
*/
function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('⚡ Selection Tools')
      // Original menu items
      .addItem('Empty_rows_selector_1', 'Empty_rows_selector_1') 
      .addItem('Empty_rows_selector_2', 'Empty_rows_selector_2')
      //
      // 👈 NEW LINE ADDED HERE 
      //.addItem('🗑️ Delete All Empty Rows', 'deleteEmptyRows') 
      //
      .addToUi();
}