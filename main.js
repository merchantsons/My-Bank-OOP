#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// A Class in terms of OOP is blueprint for creating objects.
// A class is like a blueprint for creating similar things.
console.log(chalk.yellowBright(`
███    ███ ██    ██     ██████   █████  ███    ██ ██   ██ 
████  ████  ██  ██      ██   ██ ██   ██ ████   ██ ██  ██  
██ ████ ██   ████       ██████  ███████ ██ ██  ██ █████   
██  ██  ██    ██        ██   ██ ██   ██ ██  ██ ██ ██  ██  
██      ██    ██        ██████  ██   ██ ██   ████ ██   ██ `));
console.log(chalk.greenBright(`                                                     ____  
                                                    /    )
                                    ----__----__---/____/-
                                      /   ) /   ) /       
                                    _(___/_(___/_/________`));
console.log(chalk.red("                                           By Merchantsons"));
console.log(chalk.yellowBright("**********************************************************"));
console.log(chalk.yellowBright("                ACCOUNT MANAGEMENT SYSTEM                 "));
console.log(chalk.yellowBright("     Working Account Numbers # 95201 - 95202 - 95203      "));
console.log(chalk.yellowBright("**********************************************************"));
//Bank Account Class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Withdraw & Debit
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.redBright(`\n  Withdrawal of $${amount} successful, Your remaining balance is $${this.balance}\n`));
        }
        else {
            console.log(chalk.redBright(`Your account have insufficient balance for this transaction.`));
        }
    }
    // Deposit & Credit
    deposit(amount) {
        if (amount >= 100) {
            console.log(chalk.redBright.bold.italic(`\n  After transaction fee of amount 1$ charged in to your account. `));
            amount -= 1; // fee charge for over hundred $ transaction
        }
        this.balance += amount;
        console.log(chalk.greenBright.bold.italic(`  Your Deposit Of $${amount} successfuly made. You new balance is $${this.balance} now.\n`));
    }
    // Checking Balance
    checkBalance() {
        console.log(chalk.cyanBright.bold.italic(`\n  Your Account Balance is $${this.balance}\n`));
    }
}
// Customer Class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobilNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobilNumber = mobileNumber;
        this.account = account;
    }
}
// Create database of bank accounts
const accounts = [
    new BankAccount(95201, 5000),
    new BankAccount(95202, 1050),
    new BankAccount(95203, 7800),
];
// Create database of customer via array
const customers = [
    new Customer("Jamal", "Khan", "Male", 20, 3223362654, accounts[0]),
    new Customer("Sara", "Ahmed", "Female", 18, 3459876321, accounts[1]),
    new Customer("Jawed", "Kamal", "Male", 38, 3652245669, accounts[2]),
];
// Interactive Function Use Bank Account
async function service() {
    const accountNumberInput = await inquirer.prompt({
        name: "accountNumber",
        type: "number",
        message: chalk.yellowBright("Please Enter Your Valid Account Number:")
    });
    const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
    do {
        if (customer) {
            console.log(chalk.bgCyanBright.bold.italic(`\n   ${customer.firstName} ${customer.lastName}! online.  \n`));
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Please Select Your Desire Option",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter your desire amount to deposit :"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const witndrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter your desire amount to withdraw :"
                    });
                    customer.account.withdraw(witndrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log(chalk.greenBright("\nExiting from online banking system now!!"));
                    console.log(chalk.redBright("Thankyou for using MY BANK OOP Online Banking, Godbye!!!"));
                    return;
            }
        }
        else {
            console.log(chalk.red.italic("\nSorry!! we have not found your account in our database, Kindly contact your branch!!"));
            console.log(chalk.greenBright.italic("Thankyou for using MY BANK OOP Online Banking, Godbye!!!"));
            return;
        }
    } while (true);
}
service();
