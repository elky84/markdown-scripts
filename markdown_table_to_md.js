const fs = require('fs');
const path = require('path');

function parseMarkdownTable(mdText) {
  const lines = mdText.trim().split('\n');
  const headers = lines[0].split('|').map(header => header.trim());
  const dataRows = lines.slice(2, -1);

  const tableData = dataRows.map(row => {
    const values = row.split('|').map(value => value.trim());
    const rowData = {};

    for (let i = 0; i < headers.length; i++) {
      rowData[headers[i]] = values[i];
    }

    return rowData;
  });

  return tableData;
}

function createMarkdownFiles(tableData, outputFolder) {
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }

  tableData.forEach((rowData, index) => {
    const { name, url, tags, rating, year } = rowData;

    // input meta data spec
    const meta = `---
name: ${name}
url: ${url}
tags: ${tags}
rating: ${rating}
year: ${year}
---
`;

    const fileName = `${name.replace(/\s+/g, '_').toLowerCase()}.md`;
    const filePath = path.join(outputFolder, fileName);

    fs.writeFileSync(filePath, meta, { flag: 'w' });
  });
}

function processMarkdownFile(inputFilePath, outputFolder) {
  const mdText = fs.readFileSync(inputFilePath, 'utf-8');
  const tableData = parseMarkdownTable(mdText);
  createMarkdownFiles(tableData, outputFolder);
}

const inputFilePath = 'listen.md';
const outputFolder = 'output';

processMarkdownFile(inputFilePath, outputFolder);
