import Equation from "../model/equation";

export default abstract class SolverStrategy {
    abstract apply(equation: Equation): [boolean, Equation];
}