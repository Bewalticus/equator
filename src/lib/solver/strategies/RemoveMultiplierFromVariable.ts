import Constant from "../../model/constant";
import Equation from "../../model/equation";
import Add from "../../model/operations/add";
import SolverStrategy from "../solverStrategy";
import Variable from "../../model/variable";
import Node from "../../model/node";
import Multiply from "../../model/operations/multiply";

export default class RemoveMultiplierFromVariable extends SolverStrategy {
    apply(equation: Equation): [boolean, Equation] {
        if (this.check(equation.leftNode, equation.rightNode)) {
            return [true, this._apply(equation.leftNode as unknown as Multiply, equation.rightNode)];
        }
        if (this.check(equation.rightNode, equation.leftNode)) {
            return [true, this._apply(equation.rightNode as unknown as Multiply, equation.leftNode)];
        }
        return [false, equation];
    }

    check(multiplyNode: Node, constantNode: Node) {
        var right = (multiplyNode instanceof Multiply) && (constantNode instanceof Constant);
        if (multiplyNode instanceof Multiply && right) {
            var mulNode = multiplyNode as Multiply;
            right = (mulNode.leftNode instanceof Variable && mulNode.rightNode instanceof Constant)
                || (mulNode.leftNode instanceof Constant && mulNode.rightNode instanceof Variable);
        }
        return right;
    }

    _apply(multiplyNode: Multiply, constantNode: Node): Equation {
        var singleConstant = constantNode as Constant;
        var mulVariable: Variable;
        var mulConstant: Constant;
        if (multiplyNode.leftNode instanceof Variable) {
            mulVariable = multiplyNode.leftNode;
            mulConstant = multiplyNode.rightNode as Constant;
        }
        if (multiplyNode.leftNode instanceof Constant) {
            mulVariable = multiplyNode.rightNode as Variable;
            mulConstant = multiplyNode.leftNode;
        }
        return new Equation(mulVariable, new Constant(singleConstant.value / mulConstant.value));
    }
}