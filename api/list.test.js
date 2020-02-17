import { expect } from 'chai'
import List, { OutOfRangeArrayException } from './list'

describe('Kata | List', () => {
  let list = null
  describe('default', () => {
    beforeEach(() => {
      list = new List()
    })
    it('should create', () => {
      // Then
      expect(list).to.exist
      expect(list).to.be.instanceOf(List)
    })
    it('should have no element', () => {
      // Then
      expect(list.length()).to.equal(0)
    })
  })

  describe('#addElement', () => {
    context('When the list is not full', () => {
      beforeEach(() => {
        // Given
        list = new List()
      })
      context('When the element does not exist', () => {
        it('should add an element to the list', () => {
          // Given
          const element = 'element'
          const element2 = 'element2'
          // When
          list.addElement(element)
          // Then
          expect(list.length()).to.equal(1)
          // When
          list.addElement(element2)
          // Then
          expect(list.length()).to.equal(2)
        })
      })
      context('When the element already exists', () => {
        it('should not add the element', () => {
          // Given
          const element = 'element'
          // When
          list.addElement(element)
          // Then
          expect(list.length()).to.equal(1)
          // When
          list.addElement(element)
          // Then
          expect(list.length()).to.equal(1)
        })
      })
    })
    context('When the list is full', () => {
      beforeEach(() => {
        // Given
        list = new List({ maxSize: 1 })
        list.addElement('randomElement')
      })
      it('should raise an OutOfRangeArrayException', () => {
        // Given
        let error = null
        try {
          // When
          list.addElement('randomElement')
        } catch (raisedError) {
          error = raisedError
        } finally {
          // Then
          expect(error).to.exist
          expect(error).to.be.instanceOf(OutOfRangeArrayException)
          expect(error.message).to.equal('La list ne peut pas contenir plus de 1 element(s)')
        }
      })
    })

    context('When the list is full 2', () => {
      beforeEach(() => {
        // Given
        list = new List({ maxSize: 3 })
        list.addElement('randomElement')
        list.addElement('randomElement2')
        list.addElement('randomElement3')
      })
      it('should raise an OutOfRangeArrayException', () => {
        // Given
        let error = null
        try {
          // When
          list.addElement('randomElement4')
        } catch (raisedError) {
          error = raisedError
        } finally {
          // Then
          expect(error).to.exist
          expect(error).to.be.instanceOf(OutOfRangeArrayException)
          expect(error.message).to.equal('La list ne peut pas contenir plus de 3 element(s)')
        }
      })
    })
  })

  describe('#destroyElement', () => {
    beforeEach(() => {
      list = new List()
      list.addElement('toRemove')
    })
    context('When the given index is inferior to 0', () => {
      it('should return null', () => {
        // Given
        const givenIndex =
        expect(list.length()).to.equal(1)
        // When
        const result = list.destroyElement(-1)
        // Then
        expect(result).to.be.null
        expect(list.length()).to.equal(1)
      })
    })
    context('When the given index is superior to 0', () => {
      context('When the given index is not corresponding to an element', () => {
        it('should return null', () => {
          // Given
          const givenIndex = list.length() + 1
          // When
          const result = list.destroyElement(givenIndex)
          // Then
          expect(result).to.be.null
        })
      })
      context('When the given index is corresponding to an element', () => {
        it('should delete the element', () => {
          // Given
          const givenIndex = 0
          const givenLength = list.length()
          // When
          const result = list.destroyElement(givenIndex)
          // Then
          expect(list.length()).to.equal(givenLength - 1)
          expect(result).to.equal('toRemove')
        })
      })
    })
  })

  describe('#popElement', () => {
    beforeEach(() => {
      list = new List()
    })
    describe('When the list is empty', () => {
      it('should return null', () => {
        // When
        const result = list.popElement()
        // Then
        expect(result).to.be.null
      })
    })
    describe('When the list is not empty', () => {
      beforeEach(() => {
        // Given
        list.addElement('basicElement')
        list.addElement('basicElement2')
        list.addElement('anElementToPop')
      })
      it('should destroy the last element and return it', () => {
        // Given
        const givenLength = list.length()
        // When
        const result = list.popElement()
        // Then
        expect(result).to.equal('anElementToPop')
        expect(list.length()).to.equal(givenLength - 1)
      })
    })
  })

  describe('#shiftElement', () => {
    beforeEach(() => {
      list = new List()
    })
    describe('When the list is empty', () => {
      it('should return null', () => {
        // When
        const result = list.shiftElement()
        // Then
        expect(result).to.be.null
      })
    })
    describe('When the list is not empty', () => {
      beforeEach(() => {
        // Given
        list.addElement('anElementToShift')
        list.addElement('basicElement')
        list.addElement('basicElement2')
      })
      it('should destroy the first element and return it', () => {
        // Given
        const givenLength = list.length()
        // When
        const result = list.shiftElement()
        // Then
        expect(result).to.equal('anElementToShift')
        expect(list.length()).to.equal(givenLength - 1)
      })
    })
  })
})
