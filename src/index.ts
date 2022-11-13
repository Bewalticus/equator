import Constant from "./model/constant";
import Equation from "./model/equation";
import Add from "./model/operations/add";
import Multiply from "./model/operations/multiply";
import Variable from "./model/variable";

function showSimplification(equation: Equation) {
    console.log(`Original equation: ${equation.toString()}`);
    console.log(`Simplified equation: ${equation.simplify().toString()}`);
    console.log("")
}

showSimplification(new Equation(new Variable("x"), new Add(new Constant(5), new Add(new Constant(7), new Constant(8)))));

showSimplification(new Equation(new Variable("x"), new Multiply(new Constant(5), new Add(new Constant(7), new Constant(8)))));

showSimplification(new Equation(new Variable("x"), new Add(new Constant(5), new Multiply(new Constant(7), new Constant(8)))));

showSimplification(new Equation(new Variable("x"), new Add(new Variable("y"), new Add(new Constant(7), new Constant(8)))));

showSimplification(new Equation(new Variable("x"), new Add(new Constant(5), new Add(new Variable("y"), new Constant(8)))));

showSimplification(new Equation(new Variable("x"), new Add(new Constant(5), new Multiply(new Variable("y"), new Constant(8)))));

showSimplification(new Equation(new Variable("x"), new Multiply(new Constant(5), new Add(new Variable("y"), new Constant(8)))));

showSimplification(new Equation(new Variable("x"), new Multiply(new Constant(5), new Multiply(new Variable("y"), new Constant(8)))));

showSimplification(new Equation(new Variable("x"), new Add(new Add(new Constant(5), new Variable("y")), new Add(new Variable("y"), new Constant(8)))));

showSimplification(new Equation(new Variable("x"), new Multiply(new Constant(5), new Add(new Variable("y"), new Variable("y")))));
