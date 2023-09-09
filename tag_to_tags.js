const fs = require('fs');
const path = require('path');

function convertTagsInFile(filePath) {
  const inputFileContents = fs.readFileSync(filePath, 'utf8');
  const lines = inputFileContents.split('\n');

  const modifiedLines = lines.map(line => {
    if (line.startsWith('tag: ')) {
      const tags = line.split(' ').slice(1);
      const yamlTags = tags.map(tag => `- ${tag}`).join('\n');
      return `tags:\n${yamlTags}`;
    }
    return line;
  });

  const outputContents = modifiedLines.join('\n');
  fs.writeFileSync(filePath, outputContents, 'utf8');
}

function processMdFilesInDirectory(directoryPath) {
  const files = fs.readdirSync(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      processMdFilesInDirectory(filePath);
    } else if (file.endsWith('.md')) {
      convertTagsInFile(filePath);
      console.log(`tag conversion completed: ${filePath}`);
    }
  }
}

// 태그를 변환할 폴더를 지정합니다.
const targetDirectory = 'read';

// 폴더 내의 모든 .md 파일을 변환합니다.
processMdFilesInDirectory(targetDirectory);

console.log('completed all md files conversion');
