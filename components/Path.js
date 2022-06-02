const math = '/math';
const ca = '/classical_algebra/';
const cs = '/cs';
const dsa = '/data_structures_and_algorithms/';

export const Paths = {
	home: "/",
	cs_review: "/cs_review",
	cs_preface: "/cs/preface",
	math_preface: '/math/preface',
	math_speaking_mathematically: '/math/speaking_mathematically',
	math_real_numbers: '/math/real_numbers',
	cs_art1: "/cs/java_variables_and_types",
	cs: {
		data_structures_and_algorithms: {
			intro: `${cs}${dsa}intro`,
			language_overview_cpp: `${cs}${dsa}language_overview_cpp`,
			cpp_errors: `${cs}${dsa}cpp_errors`,
			cpp_operators: `${cs}${dsa}cpp_operators`,
			cpp_variables_and_types: `${cs}${dsa}cpp_variables_and_types`,
		}
	},
	math: {
		classical_algebra: {
			addition: `${math}${ca}addition`,
			closure: `${math}${ca}closure`,
			distributivity: `${math}${ca}distributivity`,
			division_and_divisibility: `${math}${ca}division_and_divisibility`,
			expansions: `${math}${ca}expansions`,
			exponentiation: `${math}${ca}exponentiation`,
			inequalities: `${math}${ca}inequalities`,
			multiplication: `${math}${ca}multiplication`,
			multivariable_relationships: `${math}${ca}multivariable_relationships`,
			number_sets: `${math}${ca}number_sets`,
			perfect_powers: `${math}${ca}perfect_powers`,
			radicals: `${math}${ca}radicals`,
			order_of_operations: `${math}${ca}order_of_operations`,
			logarithms: `${math}${ca}logarithms`,
			rational_numbers: `${math}${ca}rational_numbers`,
			irrational_numbers: `${math}${ca}irrational_numbers`,
			imaginary_numbers: `${math}${ca}imaginary_numbers`,
			decimal_system: `${math}${ca}decimal_system`,
			real_numbers: `${math}${ca}real_numbers`,
			expressions: `${math}${ca}expressions`,
			equation_families: `${math}${ca}equation_families`,
			truth_sets: `${math}${ca}truth_sets`,
			conditional_equations: `${math}${ca}conditional_equations`,
			linear_equations_1_variable: `${math}${ca}linear_equations_1_variable`,
			expression_domain: `${math}${ca}expression_domain`,
			polynomial_equations: `${math}${ca}polynomial_equations`,
			inequations: `${math}${ca}inequations`,
			quadratics: `${math}${ca}quadratics`,
			solving_quadratics: `${math}${ca}solving_quadratics`,
			binomial_theorem: `${math}${ca}binomial_theorem`,
		}
	}
};
export default Paths;
