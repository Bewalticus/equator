import Equation from "../model/equation";

export default class EquationSystemSolver {
    unsolved: Equation[];
    solved: Equation[] = [];

    constructor(equations: Equation[]) {
        this.unsolved = equations;
    }

    solve() {
        var changed: boolean;
        var circuitBreaker = 0;
        do {
            // simplify still unsolved equations
            var solveResults = this.unsolved.map(equation => equation.solve());
            var solvedResults = solveResults.filter(result => { return result[1].isVariableDefinition(); });
            if (solvedResults.length > 0) {
                changed = true;
                circuitBreaker = 10;
            }
            var unsolvedResults = solveResults.filter(result => { return !result[1].isVariableDefinition(); });
            unsolvedResults.forEach(result => { changed = changed || result[0]; });
            // filter out now solved equations
            var recentlySolved = solvedResults.map(result => result[1]);
            this.unsolved = unsolvedResults.map(result => result[1]);
            this.solved = this.solved.concat(recentlySolved);
            // replace solved variables with values
            var varReplacementResult = this.unsolved.map(equation => equation.replaceVariables(this.solved));
            varReplacementResult.forEach(result => { changed = changed || result[0]; });
            this.unsolved = varReplacementResult.map(result => result[1]);
            circuitBreaker--;
        } while (changed && circuitBreaker > 0);
    }
}