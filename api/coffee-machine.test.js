import { stub } from 'sinon'
import Chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import CoffeeMachine, { InvalidSelectionError, InvalidStepError } from './coffee-machine'
import MessagePrinter from "./message-printer";

let machine
let messagePrinter

Chai.use(sinonChai)

describe('Unit | Coffee Machine', () => {
  beforeEach(() => {
    messagePrinter = {
      print: stub().named('MessagePrinter.print')
    }
    machine = new CoffeeMachine({ messagePrinter })
  })

  describe('constructor', () => {
    it('should create', () => {
      expect(machine).to.exist
    })

    it('should set the step to 0', () => {
      expect(machine.step).to.deep.equal(0)
    })

    it('should create a new messagePrinter', () => {
      expect(machine.messagePrinter).to.exist
    })
  })

  describe('#verifyStep', () => {
    context('When the given step is correct', () => {
      it('should return true', () => {
        // Given
        const givenStep = 0
        machine.step = givenStep
        // When
        const result = machine.verifyStep(givenStep)
        // Then
        expect(result).to.deep.equal(true)
      })
    })

    context('When the given step is incorrect', () => {
      it('should throw InvalidStepError', () => {
        // Given
        let error
        const givenStep = 0
        machine.step = givenStep + 1
        // Then
        try {
          // When
          machine.verifyStep(givenStep)
        } catch (raisedError) {
          error = raisedError
        } finally {
          // Then
          expect(error).to.exist
          expect(error).to.be.instanceOf(InvalidStepError)
          expect(error.message).to.equal('Vous devez être l\'étape 0 pour effectuer cette action')
        }
      })
    })
  })

  describe('#printMessage', () => {
    context('When there is one message', () => {
      it('should print the given message with given param', () => {
        // Given
        const message = 'Message'
        // When
        machine.printMessage(message)
        // Then
        expect(messagePrinter.print).to.have.been.calledOnce
        expect(messagePrinter.print).to.have.been.calledWithExactly([message])
      })
    })

    context('When there is multiple message', () => {
      it('should print the given message with given params', () => {
        // Given
        const message = 'Message'
        const message2 = 'Message2'
        const message3 = 'Message3'
        // When
        machine.printMessage(message, message2, message3)
        // Then
        expect(messagePrinter.print).to.have.been.calledOnce
        expect(messagePrinter.print).to.have.been.calledWithExactly([message, message2, message3])
      })
    })
  })

  describe('#printDrinkMessage', () => {
    beforeEach(() => {
      machine.verifyStep = stub().named('CoffeeMachine.verifyStep')
      machine.printMessage = stub().named('CoffeeMachine.printMessage')
    })

    it('should call verifyStep', () => {
      // When
      machine.printDrinkMessage()
      // Then
      expect(machine.verifyStep).to.have.been.calledOnce
      expect(machine.verifyStep).to.have.been.calledWithExactly(0)
    })

    it('should call printDrinkMessage', () => {
      // When
      machine.printDrinkMessage()
      // Then
      expect(machine.printMessage).to.have.been.calledOnce
      expect(machine.printMessage).to.have.been.calledWithExactly(
        'Veuillez choisir un type de boisson',
        '1 - Café',
        '2 - Thé',
        '3 - Cappuccino'
      )
    })
    it('should increase the step', () => {
      // When
      machine.printDrinkMessage()
      // Then
      expect(machine.step).to.equal(1)
    })
  })

  describe('#chooseDrink', () => {
    beforeEach(() => {
      machine.step = 1
      machine.verifyStep = stub().named('CoffeeMachine.verifyStep')
      machine.printMessage = stub().named('CoffeeMachine.printMessage')
    })

    context('When the value is incorrect', () => {
      context('When the value is under 1', () => {
        it('should throw InvalidStepError', () => {
          // Given
          let error
          // Then
          try {
            // When
            machine.chooseDrink(-1)
          } catch (raisedError) {
            error = raisedError
          } finally {
            // Then
            expect(error).to.exist
            expect(error).to.be.instanceOf(InvalidSelectionError)
            expect(error.message).to.equal('La valeur -1 n\'est pas correcte')
          }
        })
      })
      context('When the value is above 3', () => {
        it('should throw InvalidStepError', () => {
          // Given
          let error
          // Then
          try {
            // When
            machine.chooseDrink(4)
          } catch (raisedError) {
            error = raisedError
          } finally {
            // Then
            expect(error).to.exist
            expect(error).to.be.instanceOf(InvalidSelectionError)
            expect(error.message).to.equal('La valeur 4 n\'est pas correcte')
          }
        })
      })
    })

    context('When the value is correct', () => {
      it('should call method verifyStep with value 1', () => {
        // Given
        const expectedStep = 1
        // When
        machine.chooseDrink(1)
        // Then
        expect(machine.verifyStep).to.have.been.calledOnce
        expect(machine.verifyStep).to.have.been.calledWithExactly(expectedStep)
      })

      it('should call method verifyStep with value 1', () => {
        // Given
        const value = 1
        // When
        machine.chooseDrink(value)
        // Then
        expect(machine.printMessage).to.have.been.calledOnce
        expect(machine.printMessage).to.have.been.calledWithExactly('Vous avez choisi la boisson :', 'Café')
      })

      it('should increase the step', () => {
        // Given
        const value = 1
        // When
        machine.chooseDrink(value)
        // Then
        expect(machine.step).to.deep.equal(2)
      })

      it('should increase set the drinkType', () => {
        // Given
        const value = 1
        // When
        machine.chooseDrink(value)
        // Then
        expect(machine.drinkType).to.deep.equal(value)
      })
    })
  })

  describe('#printSugarMessage', () => {
    // Clarisse TODO
    // verifyStep 3
    // printMessage 'Veuillez choisir un nombre de sucre
    // increase step
  })

  describe('#chooseSugar', () => {
    // Clarisse TODO
    // VerifyStep 4
    // ???
    // Throw InvalidSelectionError value incorrect
  })

  describe('#build', () => {
    // Clarisse TODO
    // No information
    beforeEach(() => {
      machine.verifyStep = stub().named('CoffeeMachine.verifyStep')
    })

    it('should call verifyStep', () => {
      // When
      machine.build()
      // Then
      expect(machine.verifyStep).to.have.been.calledOnce
      expect(machine.verifyStep).to.have.been.calledWithExactly(4)
    })
  })
})

describe('Integration | Coffee Machine', () => {
  beforeEach(() => {
    const messagePrinter = new MessagePrinter()
    machine = new CoffeeMachine({ messagePrinter })
  })

  it('🎉🎉🎉 should call all the method 🎉🎉🎉', () => {
    machine.printDrinkMessage()
    machine.chooseDrink(1)
    machine.printSugarMessage()
    machine.chooseSugar(5)

    const result = machine.build()
    expect(result).to.deep.equal({
      drinkType: 'Café',
      sugar: 5
    })
  })
})
