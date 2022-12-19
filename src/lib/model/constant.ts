import Equation from './equation';
import Leaf from './leaf';
import Node from './node';

export default class Constant extends Leaf {
    isEquivalentTo(node: Node): boolean {
        return (node instanceof Constant) && node.value == this.value;
    }
    value: number;
    constructor(value: number) {
        super();
        this.value = value;
    }

    toString(): string {
        return this.value.toString();
    }

    replaceVariables(variables: Equation[]): [false, Node] {
        return [false, this];
    }
}