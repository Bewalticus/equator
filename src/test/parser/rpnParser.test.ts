import Constant from "../../lib/model/constant";
import Equation from "../../lib/model/equation";
import Add from "../../lib/model/operations/add";
import Multiply from "../../lib/model/operations/multiply";
import Variable from "../../lib/model/variable";
import { parseEquation, parseEquationSystem, parseNode } from "../../lib/parser/rpnParser";

describe('RPN parser test suite', () => {
    test('variable', () => {
        var parsed = parseNode("x");
        expect(parsed).toStrictEqual(new Variable('x'));
    });

    test('constant', () => {
        var parsed = parseNode("4");
        expect(parsed).toStrictEqual(new Constant(4));
    });

    test('simple addition', () => {
        var parsed = parseNode("4 5 +");
        expect(parsed).toStrictEqual(new Add(new Constant(4), new Constant(5)));
    });

    test('simple equation', () => {
        var parsed = parseEquation("x 0 =");
        expect(parsed).toStrictEqual(new Equation(new Variable('x'), new Constant(0)));
    });

    test('simple equation with operation', () => {
        var parsed = parseEquation("4 x + 0 =");
        expect(parsed).toStrictEqual(new Equation(new Add(new Constant(4), new Variable('x')), new Constant(0)));
    });

    test('complex equation', () => {
        var parsed = parseEquation("3 x * 2 x * y + =");
        expect(parsed).toStrictEqual(new Equation(new Multiply(new Constant(3), new Variable("x")), new Add(new Multiply(new Constant(2), new Variable("x")), new Variable("y"))));
    });

    test('equation system', () => {
        var equations: Equation[] = [];
        equations.push(new Equation(new Multiply(new Variable("x"), new Constant(2)), new Add(new Add(new Constant(5), new Variable("y")), new Add(new Variable("y"), new Constant(8)))));
        equations.push(new Equation(new Variable("y"), new Constant(6)));
        var parsed = parseEquationSystem("x 2 * 5 y + y 8 + + = y 6 =");
        expect(parsed).toStrictEqual(equations);
    });
});