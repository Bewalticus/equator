import Equation from "./equation";
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

    replaceVariables(variables: Equation[]): [boolean, Node] {
        var variable = variables.filter(variable => (variable.leftNode as Variable).name == this.name);
        if (variable.length == 0) {
            return [false, this];
        }
        return [true, variable[0].rightNode];
    }
}