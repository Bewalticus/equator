import Node from "./node";
import Operation from "./operation";

export default abstract class BinaryOperation extends Operation {
    leftNode: Node;
    rightNode: Node;
    constructor(leftNode: Node, operator: string, rightNode: Node) {
        super(operator);
        this.leftNode = leftNode;
        this.rightNode = rightNode;
    }

    toString(): string {
        return `(${this.leftNode.toString()} ${this.operator} ${this.rightNode.toString()})`;
    }

    equivalentSubterms(node: BinaryOperation): boolean {
        return (this.leftNode.isEquivalentTo(node.leftNode) && this.rightNode.isEquivalentTo(node.rightNode)) || (this.leftNode.isEquivalentTo(node.rightNode) && this.rightNode.isEquivalentTo(node.leftNode));
    }
}
