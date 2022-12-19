import Constant from "./constant";
import EquationSolver from "../solver/equationSolver";
import Node from "./node";
import Variable from "./variable";

export default class Equation {
    leftNode: Node;
    rightNode: Node;
    constructor(leftNode: Node, rightNode: Node) {
        this.leftNode = leftNode;
        this.rightNode = rightNode;
    }

    simplify(): [boolean, Equation] {
        var [leftChanged, newLeft] = this.leftNode.simplify();
        var [rightChanged, newRight] = this.rightNode.simplify();
        if (leftChanged || rightChanged)
            return [true, new Equation(newLeft, newRight)];
        return [false, this];
    }

    toString(): string {
        return `${this.leftNode.toString()} = ${this.rightNode.toString()}`;
    }

    isVariableDefinition(): boolean {
        var isVariable = ((this.leftNode instanceof Variable) && (this.rightNode instanceof Constant)) || ((this.leftNode instanceof Constant) && (this.rightNode instanceof Variable));
        // normalize equation to variable definition (left is variable and right is value)
        if (isVariable && (this.leftNode instanceof Constant)) {
            var temp = this.leftNode;
            this.leftNode = this.rightNode;
            this.rightNode = temp;
        }
        return isVariable;
    }

    solve(): [boolean, Equation] {
        return new EquationSolver(this).solve();
    }

    replaceVariables(variables: Equation[]): [boolean, Equation] {
        var [changedLeft, newLeft] = this.leftNode.replaceVariables(variables);
        var [changedRight, newRight] = this.rightNode.replaceVariables(variables);
        if (changedLeft || changedRight)
            return [true, new Equation(newLeft, newRight)];
        return [false, this];
    }

}