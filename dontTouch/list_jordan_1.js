export class OutOfRangeArrayException extends Error {}

export default  class DontTouchList {
  constructor({ maxSize = Number.MAX_SAFE_INTEGER } = {}) {
    this._arr = []
    this._maxSize = maxSize
  }

  length() {
    return this._arr.length
  }

  addElement(element) {
    if (this.length() === this._maxSize) {
      throw new OutOfRangeArrayException(`La list ne peut pas contenir plus de ${this._maxSize} element(s)`)
    }
    if (!this._arr.find(_element => _element === element)) {
      this._arr.push(element)
    }
  }

  destroyElement(index) {
    let result = null
    if (index >= 0 && index < this.length()) {
      result = this._arr[index]
      this._arr.splice(index, 1)
    }
    return result
  }

  popElement() {
    return this.destroyElement(this.length() - 1)
  }

  shiftElement() {
    return this.destroyElement(0)
  }
}
