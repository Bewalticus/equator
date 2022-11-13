import Constant from "./constant";
import Node from "./node";
import Variable from "./variable";

export default class Equation {
    leftNode: Node;
    rightNode: Node;
    constructor(leftNode: Node, rightNode: Node) {
        this.leftNode = leftNode;
        this.rightNode = rightNode;
    }

    simplify(): Equation {
        return new Equation(this.leftNode.simplify(), this.rightNode.simplify());
    }

    toString(): string {
        return `${this.leftNode.toString()} = ${this.rightNode.toString()}`;
    }

    isVariableDefinition(): boolean {
        return ((this.leftNode instanceof Variable) && (this.rightNode instanceof Constant)) || ((this.leftNode instanceof Constant) && (this.rightNode instanceof Variable));
    }
}