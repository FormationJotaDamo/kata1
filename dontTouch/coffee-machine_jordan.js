import MessagePrinter from './message-printer'

export class InvalidStepError extends Error {}
export class InvalidSelectionError extends Error {}

const DRINKS = ['Café', 'Thé', 'Cappuccino']

export default class CoffeeMachine_jordan {
  constructor({ messagePrinter = new MessagePrinter() }) {
    this.step = 0
    this.messagePrinter = messagePrinter
  }

  printMessage(...params) {
    this.messagePrinter.print(params)
  }

  verifyStep(requiredStep) {
    if (this.step !== requiredStep) {
      throw new InvalidStepError(`Vous devez être l'étape ${requiredStep} pour effectuer cette action`)
    }
    return true
  }

  printDrinkMessage() {
    this.verifyStep(0)
    this.printMessage('Veuillez choisir un type de boisson', '1 - Café', '2 - Thé', '3 - Cappuccino')
    this.step++
  }

  chooseDrink(value) {
    this.verifyStep(1)
    if (value > 0 && value < 3) {
      this.printMessage('Vous avez choisi la boisson :', DRINKS[value - 1])
      this.drinkType = value
      this.step++
    } else {
      throw new InvalidSelectionError(`La valeur ${value} n'est pas correcte`)
    }
  }

  printSugarMessage() {
    this.verifyStep(2)
    this.printMessage('Veuillez choisir un nombre de sucre')
    this.step++
  }

  chooseSugar(value) {
    this.verifyStep(3)
    if (value > 0 && value < 6) {
      this.printMessage('Vous avez choisi ', value, ' sucre')
      this.sugar = value
      this.step++
    } else {
      throw new InvalidSelectionError(`La valeur ${value} n'est pas correcte`)
    }
  }

  build() {
    this.verifyStep(4)
    return {
      drinkType: DRINKS[this.drinkType - 1],
      sugar: this.sugar
    }
  }
}
