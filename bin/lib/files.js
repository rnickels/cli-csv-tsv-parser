const fs = require('fs');
const path = require('path');
const lineReader = require('line-reader');
const Promise = require('bluebird');

module.exports = {

  parseFile: async (filePath, numberOfFields, extension) => {
    try {
      const correctData = [];
      const incorrectData = [];
      let lineCount = 0;

      const splitter = extension === 'csv' ? ',' : '\t';

      const eachLine = Promise.promisify(lineReader.eachLine);

      await eachLine(filePath, line => {
        if (lineCount > 0) {
          console.log(`line ${lineCount}`, line);
          if (line.split(splitter).length === numberOfFields) {
            correctData.push(line);
          } else {
            incorrectData.push(line);
          }
        }

        lineCount++;
      });

      return { correctData, incorrectData }
    } catch (error) {
      throw error;
    }
  },

  writeOutputFile: async (data, file) => {
    if (data && data.length) {
      let writeString = '';

      data.forEach(line => {
        writeString = `${writeString}${line}\n`;
      });

      fs.writeFile(file, writeString, error => {
        if (error) {
          throw error;
        }

        console.log(`Records written to ${file}.`);
      });
    }
  },

  removeOldOutputFiles: (dir) => {
    fs.readdir(dir, (error, files) => {
      if (error) throw error;

      for (const file of files) {
        fs.unlink(path.join(dir, file), error => {
          if (error) throw error;
        });
      }
    });
  },

};