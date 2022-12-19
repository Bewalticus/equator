import Constant from "../../../lib/model/constant";
import Add from "../../../lib/model/operations/add";
import { parseNode } from "../../../lib/parser/rpnParser";

describe('Add operation test suite', () => {
    test("simple simplify", () => {
        var term = parseNode("2 3 +");
        var simplified = term.simplify();
        expect(simplified).toStrictEqual([true, new Constant(5)]);
    });

    test("sub term simplification w/o complex term", () => {
        var term = parseNode("2 3 + 4 5 + +");
        var simplified = term.simplify();
        expect(simplified).toStrictEqual([true, new Constant(14)]);
    });

    test("sub term simplification w/o complex but multiplication", () => {
        var term = parseNode("2 3 * 4 5 * +");
        var simplified = term.simplify();
        expect(simplified).toStrictEqual([true, new Constant(26)]);
    });

    test("no simplification", () => {
        var term = parseNode("2 x +");
        var simplified = term.simplify();
        expect(simplified).toStrictEqual([false, parseNode("2 x +")]);
    });

    test("simplifiy to 2 times complex subterm", () => {
        var term = parseNode("x x +");
        var simplified = term.simplify();
        expect(simplified).toStrictEqual([true, parseNode("2 x *")]);
    });

    test("simplifiy to 2 times complex subterm and constant", () => {
        var term = parseNode("7 x + x +");
        var simplified = term.simplify();
        expect(simplified).toStrictEqual([true, parseNode("7 2 x * +")]);
    });

});