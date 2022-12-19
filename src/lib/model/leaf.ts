import Node from './node';

export default abstract class Leaf extends Node {
    simplify(): [false, Node] {
        return [false, this];
    }
}
