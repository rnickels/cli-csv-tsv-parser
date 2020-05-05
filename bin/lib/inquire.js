const inquirer = require('inquirer');
const fs = require('fs');

module.exports = {
  promptUserQuestions: () => {
    const questions = [
      {
        name: 'filePath',
        type: 'input',
        message: 'Please enter the full or relative path to the file for parsing:',
        validate: (value) => validateFilePath(value),
      },
      {
        name: 'fileFormat',
        type: 'list',
        message: 'How is the file formatted? Comma-Separated Values (CSV) or Tab-Separated Values (TSV)?',
        choices: ['CSV', 'TSV'],
        filter: (value) => value.toLowerCase(),
      },
      {
        name: 'numberOfFields',
        type: 'number',
        message: 'How many fields should each record have?',
        validate: (value) => validateNumberOfFields(value),
      }
    ];

    return inquirer.prompt(questions);
  },
};

const validateFilePath = async (filePath) => {
  if (!filePath || !filePath.length) return false;

  const trimmedPath = filePath.trim();
  if (!fs.existsSync(trimmedPath)) {
    return 'File not found. Please enter a valid file path.';
  }

  return true;
}

const validateNumberOfFields = async (numberOfFields) => {
  const num = Number(numberOfFields);

  if (isNaN(num)) {
    return 'The number of fields must be a valid number.';
  }

  return true;
}
