import Constant from "../model/constant";
import Equation from "../model/equation";
import Node from "../model/node";
import Operation from "../model/operation";
import Add from "../model/operations/add";
import Multiply from "../model/operations/multiply";
import Variable from "../model/variable";

export class ParseException extends Error {
};

function parse(term: string): Node | Equation[] {
    var tokens = term.split(" ");
    var stack: Node[] = [];
    var equationStack: Equation[] = [];
    tokens.forEach(token => {
        if (['=', '+', '*'].includes(token)) {
            var right = stack.pop();
            var left = stack.pop();
            if (token === "=") {
                if (stack.length > 0) {
                    throw new ParseException("stack not exhausted on equal sign");
                }
                equationStack.push(new Equation(left, right));
            } else {
                var operation: Operation;
                if (token === "+") {
                    operation = new Add(left, right);
                } else if (token === "*") {
                    operation = new Multiply(left, right);
                }
                stack.push(operation);
            }
        } else if (!isNaN(Number(token))) {
            stack.push(new Constant(Number(token)));
        } else if (/^[a-z]+$/.test(token)) {
            stack.push(new Variable(token));
        } else {
            throw new ParseException(`unknown token ${token}`);
        }
    });
    if (stack.length == 0) {
        if (equationStack.length == 0) {
            throw new ParseException("stack exhausted on end of term");
        } else {
            return equationStack;
        }
    }
    if (stack.length > 0 && equationStack.length > 0) {
        throw new ParseException("stack not exhausted but term includes equations");
    }
    var result = stack.pop();
    if (stack.length > 0) {
        throw new ParseException("stack not exhausted after result evaluation");
    }
    return result;
}

export function parseNode(term: string): Node {
    var result = parse(term);
    if (result instanceof Node) {
        return result;
    }
    throw new ParseException("term cannot be resolved to a node");
}

export function parseEquation(term: string): Equation {
    var result = parse(term);
    if (result instanceof Array) {
        if (result.length == 1) {
            return result[0];
        }
    }
    throw new ParseException("term cannot be resolved to an equation");
}

export function parseEquationSystem(term: string): Equation[] {
    var result = parse(term);
    if (result instanceof Array) {
        return result;
    }
    throw new ParseException("term cannot be resolved to an equation system");
}