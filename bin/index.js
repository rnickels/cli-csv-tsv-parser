#!/usr/bin/env node

const chalk = require('chalk');
const figlet = require('figlet');
const inquire = require('./lib/inquire');
const files = require('./lib/files');

files.removeOldOutputFiles('./output');

console.log(
  chalk.yellow(
    figlet.textSync('Runbeck', { horizontalLayout: 'full' })
  )
);

const run = async () => {
  try {
    const userInput = await inquire.promptUserQuestions();

    const { correctData, incorrectData } = await files.parseFile(
      userInput.filePath,
      userInput.numberOfFields,
      userInput.extension,
    );

    console.log('correctData', correctData);
    console.log('incorrectData', incorrectData);
    console.log('extension', userInput.fileFormat);

    await Promise.all([
      files.writeOutputFile(correctData, `./output/correctly_formatted.${userInput.fileFormat}`),
      files.writeOutputFile(incorrectData, `./output/incorrectly_formatted.${userInput.fileFormat}`),
    ]);
  } catch (error) {
    console.error(error);
  }
}

run();
