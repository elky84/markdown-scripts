const fs = require('fs');
const path = require('path');

function convertTagsInFile(filePath) {
  const inputFileContents = fs.readFileSync(filePath, 'utf8');
  const lines = inputFileContents.split('\n');

  const modifiedLines = [];
  let shouldAddBookTag = true;

  for (const line of lines) {
    if (line.startsWith('tag: ')) {
        continue;
    } else if (line.startsWith('tags: ')) {
      // 'tags:' 행은 기존 값 뒤에 "📚Book"을 추가
      const existingTags = line.split(' ').slice(1);
      existingTags.push('📚Book');
      const formattedTags = tags.map(tag => `- "${tag.replace(/,/g, '')}"`).join('\n');
      modifiedLines.push(`tags:\n${formattedTags}`);
      shouldAddBookTag = false;
    } else {
      modifiedLines.push(line);
    }
  }

  if (shouldAddBookTag) {
    // 'tags:' 행이 없으면 새로 추가
    modifiedLines.push('tags:');
    modifiedLines.push('- "📚Book"');
  }

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
