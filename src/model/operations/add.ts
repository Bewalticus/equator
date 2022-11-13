import BinaryOperation from "../binaryOperation";
import Constant from "../constant";
import Node, { PossibleNode } from "../node";
import Variable from "../variable";
import Multiply from "./multiply";

export default class Add extends BinaryOperation {
    isEquivalentTo(node: Node): boolean {
        return (node instanceof Add) && this.equivalentSubterms(node);
    }
    constructor(leftNode: Node, rightNode: Node) {
        super(leftNode, "+", rightNode);
    }

    simplify(): Node {
        var leftSimplified = this.leftNode.simplify();
        var rightSimplified = this.rightNode.simplify();
        var simplified;
        if (leftSimplified instanceof Constant && rightSimplified instanceof Constant) {
            simplified = new Constant(leftSimplified.value + rightSimplified.value);
        }
        if (!simplified) {
            // try to simplify addition across sub-terms
            simplified = this.simplifyAcrossSubTerms(leftSimplified, rightSimplified);
        }
        if (!simplified) {
            // no simplify solution found, just return simplified sub-terms
            simplified = new Add(leftSimplified, rightSimplified);
        }
        if ((simplified instanceof Add) && (simplified.leftNode.isEquivalentTo(simplified.rightNode))) {
            simplified = new Multiply(new Constant(2), simplified.leftNode).simplify();
        }
        return simplified; 
    }

    simplifyAcrossSubTerms(term1: Node, term2: Node): PossibleNode {
        var [term1Constant, term1Complex] = this.extractConstantFromSubterm(term1);
        var [term2Constant, term2Complex] = this.extractConstantFromSubterm(term2);
        if (!term1Constant && !term2Constant) return undefined;
        var sum = 0;
        var complex: Node[] = [];
        var rightSubterm: Node = undefined;
        if (term1Constant) sum += term1Constant.value;
        if (term2Constant) sum += term2Constant.value;
        if (term1Complex) complex.push(term1Complex);
        if (term2Complex) complex.push(term2Complex);
        if (complex.length == 2) {
            if (complex[0].isEquivalentTo(complex[1])) {
                rightSubterm = new Multiply(new Constant(2), complex[0]).simplify();
            } else {
                rightSubterm = new Add(complex[0], complex[1]);
            }
        } else {
            rightSubterm = complex[0];
        }
        return new Add(new Constant(sum), rightSubterm);
    }

    extractConstantFromSubterm(term: Node): [Constant | undefined, PossibleNode] {
        if (term instanceof Constant) return [term, undefined];
        if (term instanceof Variable) return [undefined, term];
        if (!(term instanceof Add)) return [undefined, term];
        if (term.leftNode instanceof Constant) return [term.leftNode, term.rightNode];
        if (term.rightNode instanceof Constant) return [term.rightNode, term.leftNode];
        return [undefined, term];
    }
}
