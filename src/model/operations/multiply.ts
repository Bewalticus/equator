import BinaryOperation from "../binaryOperation";
import Constant from "../constant";
import Node, { PossibleNode } from "../node";
import Variable from "../variable";

export default class Multiply extends BinaryOperation {
    isEquivalentTo(node: Node): boolean {
        return (node instanceof Multiply) && this.equivalentSubterms(node);
    }

    constructor(leftNode: Node, rightNode: Node) {
        super(leftNode, "*", rightNode);
    }

    simplify(): Node {
        var leftSimplified = this.leftNode.simplify();
        var rightSimplified = this.rightNode.simplify();
        if (leftSimplified instanceof Constant && rightSimplified instanceof Constant) {
            return new Constant(leftSimplified.value * rightSimplified.value);
        }
        // try to simplify addition across sub-terms
        var simplified = this.simplifyAcrossSubTerms(leftSimplified, rightSimplified);
        if (simplified) return simplified;
        // no simplify solution found, just return simplified sub-terms
        return new Multiply(leftSimplified, rightSimplified);
    }

    simplifyAcrossSubTerms(term1: Node, term2: Node): PossibleNode {
        var [term1Constant, term1Complex] = this.extractConstantFromSubterm(term1);
        var [term2Constant, term2Complex] = this.extractConstantFromSubterm(term2);
        if (!term1Constant && !term2Constant) return undefined;
        var product = 1;
        var complex: Node[] = [];
        var rightSubterm: Node = undefined;
        if (term1Constant) product *= term1Constant.value;
        if (term2Constant) product *= term2Constant.value;
        if (term1Complex) complex.push(term1Complex);
        if (term2Complex) complex.push(term2Complex);
        if (complex.length == 2) {
            if (complex[0].isEquivalentTo(complex[1])) {
                rightSubterm = complex[0];
                product *= 2;
            } else {
                rightSubterm = new Multiply(complex[0], complex[1]);
            }
        } else {
            rightSubterm = complex[0];
        }
        return new Multiply(new Constant(product), rightSubterm);
    }

    extractConstantFromSubterm(term: Node): [Constant | undefined, PossibleNode] {
        if (term instanceof Constant) return [term, undefined];
        if (term instanceof Variable) return [undefined, term];
        if (!(term instanceof Multiply)) return [undefined, term];
        if (term.leftNode instanceof Constant) return [term.leftNode, term.rightNode];
        if (term.rightNode instanceof Constant) return [term.rightNode, term.leftNode];
        return [undefined, term];
    }
}