import { readdirSync, readFileSync, renameSync } from 'fs';
import { join } from 'path';


function sanitizeFilename(filename) {
    return filename.replace(/[\\/:"*?<>|]+/g, '');
}
  
const directoryPath = "input";
const files = readdirSync(directoryPath);

files.forEach((file) => {
    const filePath = join(directoryPath, file);
    const fileContent = readFileSync(filePath, 'utf8');
  
    const titleRegex = /title:\s*(.*)/i;
    const match = fileContent.match(titleRegex);
  
    if (match && match[1]) {
      const title = match[1].trim();
      const sanitizedTitle = sanitizeFilename(title);
      const newFileName = sanitizedTitle + '.md';
      const newFilePath = join(directoryPath, newFileName);
  
      renameSync(filePath, newFilePath);
  
      console.log(`Renamed ${file} to ${newFileName}`);
    } else {
      console.log(`No title found in ${file}`);
    }
  });