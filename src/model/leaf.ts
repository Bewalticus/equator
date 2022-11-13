import Node from './node';

export default abstract class Leaf extends Node {
    simplify(): Node {
        return this;
    }
}
