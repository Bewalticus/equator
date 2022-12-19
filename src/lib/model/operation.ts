import Node from "./node";

export default abstract class Operation extends Node {
    operator: string;
    constructor(operator: string) {
        super();
        this.operator = operator;
    }
}