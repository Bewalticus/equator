import Leaf from "./leaf";
import Node from "./node";

export default class Variable extends Leaf {
    isEquivalentTo(node: Node): boolean {
        return (node instanceof Variable) && node.name == this.name;
    }

    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }

    toString(): string {
        return this.name;
    }
}