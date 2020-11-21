//Varables to grab the required info from node_modules
const inquirer = require ('inquirer');
const fs = require ('fs');
const util = require ('util');

//Write fileASYNC variable
const writeFileAsync = util.promisify(fs.writeFile);

//Ask user for user input in an array of questions
const questions = () =>
    inquirer.prompt([
        {
            type: "input",
            message: "What is your GitHub username",
            name: "gitHubName"
        },
        {
            type: "input",
            message: "What is your email address?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your project's name?",
            name: "projectName"
        },
        {
            type: "input",
            message: "Please write a short description of your project?",
            name: "projectDescription"
        },
        {
            type: "list",
            message: "What kind of license should your project have?",
            choices: [
                "MIT",
                "APACHE 2.0",
                "GPL 3.0",
                "BSD 3",
            ],
            name: "license"
        },
        {
            type: "command",
            message: "What command should be run to install dependencies?",
            name: "installDep"
        },
        {
            type: "command",
            message: "What command should be run to run tests?",
            name: "commandTest"
        },
        {
            type: "input",
            message: "What does the user need to know about using the repo?",
            name: "usingRepo"
        },
        {
            type: "input",
            message: "What does the user need to know about contributing to the repo?",
            name: "contributeRepo"
        },
    ]);


// function to write README file
const generateREADME = (answer) =>
    `
    #  ${answer.projectName}

    ##${answer.projectDescription}

    ##Table of Contents

    *[Instalation]

    *

    *

    *

    *

    *

    ##Installation

        To install neccessary dependencies, run the following command:

    '''
    ${answer.installDep}
    '''

    ##Usage

    ${answer.usingRepo}

    ##License

    ${answer.license}

    ##Contributing

    ${answer.contributeRepo}

    ## Tests

    To run tests, run the following command:

    '''
    ${answer.commandTest}
    '''

    ##Questions

    If you have any questions about the repo, please open an issue or contact me directly at ${answer.email}.
    You can find more of my work at ${answer.gitHubName}
    `;

questions()
.then((answer) => writeFileAsync('README.md', generateREADME(answer)))
.then(() => console.log("Successfully wrote to the README.md"))
.catch((err) => console.error(err));
