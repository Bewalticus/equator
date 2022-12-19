import Equation from "../model/equation";
import SolverStrategy from "./solverStrategy";
import RemoveMultiplierFromVariable from "./strategies/RemoveMultiplierFromVariable";
import RemoveSummandFromVariable from "./strategies/RemoveSummandFromVariable";

export default class EquationSolver {
    private equation: Equation;
    private strategies: SolverStrategy[] = [];

    constructor(equation: Equation) {
        this.equation = equation;
        this.strategies.push(new RemoveSummandFromVariable());
        this.strategies.push(new RemoveMultiplierFromVariable());
    }

    solve(): [boolean, Equation] {
        var [changed, simplified] = this.equation.simplify();
        var strategyChanged;
        this.strategies.forEach(strategy => { [strategyChanged, simplified] = strategy.apply(simplified); changed = changed || strategyChanged; });
        return [changed, simplified];
    }
}