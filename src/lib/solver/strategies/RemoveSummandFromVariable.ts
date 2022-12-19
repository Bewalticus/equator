import Constant from "../../model/constant";
import Equation from "../../model/equation";
import Add from "../../model/operations/add";
import SolverStrategy from "../solverStrategy";
import Variable from "../../model/variable";
import Node from "../../model/node";

export default class RemoveSummandFromVariable extends SolverStrategy {
    apply(equation: Equation): [boolean, Equation] {
        if (this.check(equation.leftNode, equation.rightNode)) {
            return [true, this._apply(equation.leftNode as unknown as Add, equation.rightNode)];
        }
        if (this.check(equation.rightNode, equation.leftNode)) {
            return [true, this._apply(equation.rightNode as unknown as Add, equation.leftNode)];
        }
        return [false, equation];
    }

    check(sumNode: Node, constantNode: Node) {
        var right = (sumNode instanceof Add) && (constantNode instanceof Constant);
        if (sumNode instanceof Add && right) {
            var addNode = sumNode as Add;
            right = (addNode.leftNode instanceof Variable && addNode.rightNode instanceof Constant)
                || (addNode.leftNode instanceof Constant && addNode.rightNode instanceof Variable);
        }
        return right;
    }

    _apply(sumNode: Add, constantNode: Node): Equation {
        var singleConstant = constantNode as Constant;
        var sumVariable: Variable;
        var sumConstant: Constant;
        if (sumNode.leftNode instanceof Variable) {
            sumVariable = sumNode.leftNode;
            sumConstant = sumNode.rightNode as Constant;
        }
        if (sumNode.leftNode instanceof Constant) {
            sumVariable = sumNode.rightNode as Variable;
            sumConstant = sumNode.leftNode;
        }
        return new Equation(sumVariable, new Constant(singleConstant.value - sumConstant.value));
    }
}