import Constant from "./lib/model/constant";
import Equation from "./lib/model/equation";
import EquationSystemSolver from "./lib/solver/equationSystemSolver";
import Add from "./lib/model/operations/add";
import Multiply from "./lib/model/operations/multiply";
import Variable from "./lib/model/variable";

function showSimplification(equation: Equation) {
    console.log(`Original equation: ${equation.toString()}`);
    console.log(`Simplified equation: ${equation.simplify().toString()}`);
    console.log("");
}

function showEquations(label: string, equations: Equation[]) {
    console.log(label);
    equations.forEach(equation => console.log(`  ${equation.toString()}`));
}

function showSolving(equations: Equation[]) {
    showEquations("Before the solving:", equations);
    var solver = new EquationSystemSolver(equations);
    solver.solve();
    showEquations("Solved values:", solver.solved);
    showEquations("Unsolved equations:", solver.unsolved);

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

var equations: Equation[] = [];

equations.push(new Equation(new Variable("x"), new Add(new Add(new Constant(5), new Variable("y")), new Add(new Variable("y"), new Constant(8)))));
equations.push(new Equation(new Variable("y"), new Constant(6)));
showSolving(equations);

equations = [];
equations.push(new Equation(new Multiply(new Variable("x"), new Constant(2)), new Add(new Add(new Constant(5), new Variable("y")), new Add(new Variable("y"), new Constant(8)))));
equations.push(new Equation(new Variable("y"), new Constant(6)));
showSolving(equations);

equations = [];
equations.push(new Equation(new Multiply(new Constant(3), new Variable("x")), new Add(new Multiply(new Constant(2), new Variable("x")), new Variable("y"))));
equations.push(new Equation(new Variable("y"), new Constant(6)));
showSolving(equations);
