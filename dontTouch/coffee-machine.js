
export class InvalidStepError extends Error {

}

export class InvalidSelectionError extends Error {

}

export default class CoffeeMachine {

  constructor({messagePrinter}) {
    this.step = 0
    this.messagePrinter = messagePrinter
    this.arrDrinkTypes = ['Café', 'Thé', 'Cappuccino']
    this.drinkType = null
    this.sugar = null
  }

  printMessage(...params) {
    this.messagePrinter.print(params)
  }

  verifyStep(givenStep){
    if (this.step === givenStep) {
      return true
    }
    else {
      throw new InvalidStepError(`Vous devez être l'étape ${givenStep} pour effectuer cette action`)
    }
  }

  printDrinkMessage() {
    this.verifyStep(0)
    const types = []
    this.arrDrinkTypes.forEach((item, index)=> {
      types.push(`${index+1} - ${item}`)
    } )
    this.printMessage( 'Veuillez choisir un type de boisson',
      ...types)
    this.step++
  }

  chooseDrink(value) {
    this.verifyStep(1)
    if (value <= 3 && value >= 1) {
      this.printMessage('Vous avez choisi la boisson :', this.arrDrinkTypes[value - 1])
      this.step++
      this.drinkType = value
    }
    else {
      throw new InvalidSelectionError(`La valeur ${value} n'est pas correcte`)
    }
  }

  printSugarMessage() {
    this.verifyStep(2)
    this.printMessage('Veuillez choisir un nombre de sucre','1 à 5 sucres')
    this.step++
  }

  chooseSugar(value) {
    this.verifyStep(3)
    if(value <= 5 && value >= 1) {
      this.printMessage('Vous avez choisi le nombre de sucre :', value)
      this.step++
      this.sugar = value
    }
    else {
      throw new InvalidSelectionError(`La valeur ${value} n'est pas correcte`)
    }
  }

  build() {
    this.verifyStep(4)
    return {
        drinkType : this.arrDrinkTypes[this.drinkType - 1 ],
        sugar : this.sugar
    }
  }
}
