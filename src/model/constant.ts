import Leaf from './leaf'
import node from './node';

export default class Constant extends Leaf {
    isEquivalentTo(node: node): boolean {
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
}