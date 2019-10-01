const LEAF_NODE = true;
class ExpressionTree {

  constructor(token, isLeaf) {
    this.children = [];
    this.token = token;
    this.isLeaf = isLeaf;
  }

  setToken(token) {
    this.token = token;
  }

  addChild(child) {
    this.children.push(child);
  }

  /*
   * eval() is a function,
   * that evaluates the SCEME program contained in this expressionTree
   * and returns the answer
   */

  eval() {
    if (this.isLeaf) return +this.token;

    let operator = op(this.token);
    let args = [];
    for (let child of this.children) {
      args.push(child.eval());
    }
    let error = operator.err(args);
    if (error == null) {
      return operator.func(args)
    } else {
      console.error(error);
      return undefined;
    }
  }
}