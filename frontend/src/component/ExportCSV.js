import * as XLSX from 'xlsx';

export function exportCSV (datas, file) {
  const workbook = XLSX.utils.book_new();
  console.log("data",datas)
  // Convert the filtered data to CSV format
  datas.forEach(userData => {
    const { data, fileName } = userData;
    const worksheet = XLSX.utils.aoa_to_sheet([]);

    let rowIndex = 1; // Start from row 2 (index 1) to leave space for headers
    XLSX.utils.sheet_add_aoa(worksheet, [["Date","Type de pointage"]], {origin: `A${rowIndex}`, cellStyles: {backgroundColor: {rgb: '000000'}}});

    rowIndex = rowIndex+2

    worksheet['!cols'] = [
      { wch: 20 }, // Width of the Date column
      { wch: 20 }  // Width of the Type de pointage column
    ];
    // Group data by day
    const groupedByDay = {};
    data.forEach(entry => {
        const date = new Date(entry.Heure).toLocaleDateString();
        if (!groupedByDay[date]) {
            groupedByDay[date] = [];
        }
        groupedByDay[date].push(entry);
    });

    // Iterate through each day's data
    for (const date in groupedByDay) {
        const dayData = groupedByDay[date];
        const sortedByHour = dayData.sort((a, b) => a.Heure.localeCompare(b.Heure));
        
        // Add the day header with colored background
        XLSX.utils.sheet_add_aoa(worksheet, [[`Date: ${date}`]], {origin: `A${rowIndex}`,cellStyles: {backgroundColor: {rgb: '000000'}}});
        XLSX.utils.sheet_add_aoa(worksheet, [[]], {origin: `A${rowIndex}`, skipHeader: true, cellStyles: {backgroundColor: {rgb: 'FFFF00'}}});
        rowIndex++;

        // Append each hour and its type below the day header
        sortedByHour.forEach(entry => {
          const time = new Date(entry.Heure).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'});
          XLSX.utils.sheet_add_aoa(worksheet, [[time, entry.typeHeure]], {origin: `A${rowIndex}`});
          rowIndex++;
        });
        rowIndex++; // Add an extra row for spacing
    }
    
    // Append the worksheet to the workbook with the user's fileName
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName);
});
  // Generate the filename based on the user's first name
  const filename = `${file}.xlsx`;

  XLSX.writeFile(workbook, filename);
};


// export function exportCSV (data, fileName) {
//   const workbook = XLSX.utils.book_new();
//   // Convert the filtered data to CSV format
//   const csvHeader = `Heure,typeHeure\n`;

//   const csvRows = data
//     .map(row => `${row.Heure},${row.typeHeure}`)
//     .join('\n')
    
//   const csvContent = `data:text/csv;charset=utf-8,${csvHeader}${csvRows}`;

//   // Generate the filename based on the user's first name
//   const filename = `${fileName}.csv`;

//   // Create a Blob and trigger the download
//   const encodedUri = encodeURI(csvContent);
//   const link = document.createElement('a');
//   link.setAttribute('href', encodedUri);
//   link.setAttribute('download', filename);
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

