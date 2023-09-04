import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const folderPath = 'input';
const targetTag = '📺Watch';

function findMarkdownFiles(folder) {
  const files = readdirSync(folder);
  const markdownFiles = [];

  for (const file of files) {
    const filePath = join(folder, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      const subMarkdownFiles = findMarkdownFiles(filePath);
      markdownFiles.push(...subMarkdownFiles);
    } else if (file.endsWith('.md')) {
      markdownFiles.push(filePath);
    }
  }

  return markdownFiles;
}

function processMarkdownFile(filePath) {
  try {
    let content = readFileSync(filePath, 'utf8');
    const tagMatch = content.match(/tag:\s*(.*?)\n/);

    if (tagMatch) {

      const existingTags = tagMatch[1];
      if (!existingTags.includes(targetTag)) {

        const updatedTags = `${existingTags} ${targetTag}`;
        content = content.replace(tagMatch[0], `tag: ${updatedTags}\n`);
        
        writeFileSync(filePath, content, 'utf8');
        console.log(`added tag: ${filePath}`);
      }
    } else {
      const lines = content.split('\n');
      lines.splice(1, 0, `tag: ${targetTag}`);
      content = lines.join('\n');

      writeFileSync(filePath, content, 'utf8');
      console.log(`added tag: ${filePath}`);
    }
  } catch (err) {
    console.error(`error occured on file processing: ${filePath}`, err);
  }
}

function processMarkdownFilesInFolder() {
  try {
    const markdownFiles = findMarkdownFiles(folderPath);
    for (const filePath of markdownFiles) {
      processMarkdownFile(filePath);
    }
  } catch (err) {
    console.error('error occured on file processing:', err);
  }
}

processMarkdownFilesInFolder();
