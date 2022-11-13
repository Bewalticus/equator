export default abstract class Node {
    abstract toString(): string;
    abstract simplify(): Node;
    abstract isEquivalentTo(node: Node): boolean;
}

export type PossibleNode = Node | undefined;
