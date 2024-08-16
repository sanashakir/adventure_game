#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

class Player {
  name: string;
  fuel: number = 100;

  constructor(name: string) {
    this.name = name;
  }

  fuelDecrease() {
    this.fuel -= 20;
  }

  fuelIncrease() {
    this.fuel = 100;
  }
}

class Opponent {
  name: string;
  fuel: number = 100;

  constructor(name: string) {
    this.name = name;
  }

  fuelDecrease() {
    this.fuel -= 20;
  }

  attack(player: Player) {
    player.fuelDecrease();
  }
}

let playerResponse = await inquirer.prompt({
  name: "name",
  type: "input",
  message: "Please enter your name:",
});

console.log(chalk.bold.yellowBright(`Welcome, ${playerResponse.name}!`));

let opponentResponse = await inquirer.prompt({
  name: "select",
  type: "list",
  message: "Select your opponent:",
  choices: ["Banshee", "Gorgon", "Titan"],
});

let p1 = new Player(playerResponse.name);
let o1 = new Opponent(opponentResponse.select);

do {
  console.log(
    `${chalk.bold.yellowBright(p1.name)} VS ${chalk.red.bold(o1.name)}`
  );

  let ask = await inquirer.prompt({
    name: "option",
    type: "list",
    message: "Select your action:",
    choices: ["Attack", "Drink Potion", "Run for your life"],
  });

  if (ask.option === "Attack") {
    let playerHit = Math.floor(Math.random() * 2); // Randomly decide if player hits
    let opponentHit = Math.floor(Math.random() * 2); // Randomly decide if opponent hits

    if (playerHit > 0) {
      o1.fuelDecrease();
      console.log(chalk.bold.yellowBright(`You hit ${o1.name}!`));
    } else {
      console.log(chalk.bold.red(`${o1.name} dodged your attack!`));
    }

    if (opponentHit > 0) {
      o1.attack(p1);
      console.log(chalk.bold.red(`${o1.name} hits you!`));
    } else {
      console.log(chalk.bold.yellowBright(`You dodged ${o1.name}'s attack!`));
    }

    console.log(chalk.bold.yellowBright(`${p1.name} fuel is ${p1.fuel}`));
    console.log(chalk.bold.red(`${o1.name} fuel is ${o1.fuel}`));

    if (p1.fuel <= 0) {
      console.log(
        chalk.bgWhite.blueBright.inverse("You Lose, Please Try Again........")
      );
      process.exit();
    }

    if (o1.fuel <= 0) {
      console.log(chalk.bgWhite.redBright.inverse("You Win........"));
      process.exit();
    }
  }

  if (ask.option === "Drink Potion") {
    p1.fuelIncrease();
    console.log(
      chalk.green.bgWhiteBright(
        `You drink a health potion. Your fuel is: ${p1.fuel}`
      )
    );
  }

  if (ask.option === "Run for your life") {
    console.log(
      chalk.bgWhite.magentaBright.inverse("You Lose, Please Try Again........")
    );
    process.exit();
  }
} while (true);
