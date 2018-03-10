class Animator {
  arr = []
  public addListener(obj) {
    this.arr.push(obj)
  }

  public animate() {
    this.arr.forEach(x => x.animate())
  }
}

export default Animator