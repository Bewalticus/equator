import Equation from "./equation";

export default abstract class Node {
    abstract toString(): string;
    abstract simplify(): [boolean, Node];
    abstract isEquivalentTo(node: Node): boolean;
    abstract replaceVariables(variables: Equation[]): [boolean, Node];
}

export type PossibleNode = Node | undefined;
