export class OutOfRangeArrayException extends Error {}

export default class List_clarisse_1 {
  constructor({ maxSize = Number.MAX_SAFE_INTEGER } = {}) {
    this.myArray = []
    this.maxSize = maxSize
  }

  length() {
    return this.myArray.length
  }
  addElement(element) {
    if(this.length() === this.maxSize){
      throw new OutOfRangeArrayException(`La list ne peut pas contenir plus de ${this.maxSize} element(s)`)
    }
     if(!this.myArray.find(_element => _element === element)){
       this.myArray.push(element)
    }
  }
  destroyElement(givenIndex) {
    if(givenIndex < 0 || givenIndex >= this.length() ){
      return null
    }
     const result = this.myArray.splice(givenIndex, 1)
     return result[0]
  }
  popElement() {
    return this.destroyElement(this.length() -1)
  }
  shiftElement() {
    return this.destroyElement(0)
  }
}
