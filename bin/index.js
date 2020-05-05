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

    await Promise.all([
      files.writeOutputFile(correctData, `./output/correctly_formatted.${userInput.fileFormat}`),
      files.writeOutputFile(incorrectData, `./output/incorrectly_formatted.${userInput.fileFormat}`),
    ]);
  } catch (error) {
    throw error;
  }
}

run();
