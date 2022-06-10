const math = "/math";
const ca = "/classical_algebra/";
const calc = "/calculus/";
const stat = "/statistics/";
const dm = "/discrete_mathematics/";
const log = "/logic/";
const cs = "/cs";
const fs = "/foundations";
const dsa = "/data_structures_and_algorithms";
const gr = "/graphics/";
const asy = "/asynchronous_programming";
const ja = "/java/";
const js = "/javascript/";
const cpp = "/cpp/";
const pro = "/problems/";
const swf = "swift/";
const sys = "/systems/";
const tls = "/tools/";
const shells = "shells/";
const git = "git/";
const lang = "/languages/";
const mob = "/mobile_systems/";
const sa = "/static_arrays/";
const da = "/dynamic_arrays/";
const str = "/strings/";
const mtr = "/matrices/";
const ll = "/linked_lists/";
const cl = "/circular_lists/";
const dbl = "/doubly_linked_lists/";
const stack = "/stacks/";
const heap = "/heaps/";
const queue = "/queues/";
const tree = "/trees/";
const mway = "mway_trees/"
const clang = "c/";

const Routes = [
	{ name: "Front Matter", path: "/" },
	{ name: "Review of Computer Science",
		path: `${cs}/preface`,
		children: [
			{ name: "Foundations with Java", path: `${cs}${fs}/preface`, children: [
				{ name: "Variables & Types", path: `${cs}${fs}${ja}variables_and_types` },
				{ name: "Conditionals", path: `${cs}${fs}${ja}conditionals` },
				{ name: "Variable Scope", path: `${cs}${fs}${ja}variable_scope` },
				{ name: "Arrays", path: `${cs}${fs}${ja}arrays` },
				{ name: "Loops", path: `${cs}${fs}${ja}loops` },
			]},
			{ name: "Asynchronous Programming with JavaScript", path: `${cs}${asy}/preface`, children: [
				{ name: "Fundamentals", path: `${cs}${asy}${js}fundamentals` },
				{ name: "Control Flow", path: `${cs}${asy}${js}control_flow` },
				{ name: "Arrays", path: `${cs}${asy}${js}arrays` },
				{ name: "Object Literals", path: `${cs}${asy}${js}object_literals` },
				{ name: "Keyword 'this'", path: `${cs}${asy}${js}keyword_this` },
				{ name: "Functional Programming Techniques", path: `${cs}${asy}${js}functional_programming` },
			]},
			{ name: "Data Structures & Algorithms with C++", path: `${cs}${dsa}/intro`, children: [
					{ name: "Language: C++",
						path: `${cs}${dsa}/language_overview_cpp`,
						children: [
							{ name: "Errors", path: `${cs}${dsa}${cpp}errors` },
							{ name: "Operators", path: `${cs}${dsa}${cpp}operators` },
							{ name: "Variables & Types", path: `${cs}${dsa}${cpp}variables_and_types`, },
							{ name: "Header Files", path: `${cs}${dsa}${cpp}header_files` },
							{ name: "Overflow", path: `${cs}${dsa}${cpp}overflow` },
							{ name: "Bitwise Operators", path: `${cs}${dsa}${cpp}bitwise_operators`, },
							{ name: "Value v. Reference Semantics", path: `${cs}${dsa}${cpp}value_reference_semantics`, },
							{ name: "Strings", path: `${cs}${dsa}${cpp}strings` },
							{ name: "Functions", path: `${cs}${dsa}${cpp}functions`,
								children: [
									{ name: "Function Overloading", path: `${cs}${dsa}${cpp}function_overloading`, },
									{ name: "Function Templates", path: `${cs}${dsa}${cpp}function_templates`, },
									{ name: "Argument Passing", path: `${cs}${dsa}${cpp}argument_passing`, },
									{ name: "Function Returns", path: `${cs}${dsa}${cpp}function_returns`, },
									{ name: "Variable Scope", path: `${cs}${dsa}${cpp}variable_scope`, },
									{ name: "Static Variables", path: `${cs}${dsa}${cpp}static_variables`, },
									{ name: "Recursion Generally", path: `${cs}${dsa}${cpp}recursion`, },
								],
							},
							{ name: "Preprocessing", path: `${cs}${dsa}${cpp}preprocessing`, },
							{ name: "Libraries", path: `${cs}${dsa}${cpp}libraries` },
							{ name: "I/O Streams", path: `${cs}${dsa}${cpp}io_streams` },
							{ name: "Namespaces", path: `${cs}${dsa}${cpp}namespaces` },
							{ name: "Collections", path: `${cs}${dsa}${cpp}collections` },
							{ name: "Pointers", path: `${cs}${dsa}${cpp}pointers` },
							{ name: "Classes", path: `${cs}${dsa}${cpp}classes` },
							{ name: "Friend Functions", path: `${cs}${dsa}${cpp}friend_functions`, },
							{ name: "Metaprogramming: Templates", path: `${cs}${dsa}${cpp}templates`, },
						],
					},
					{ name: "Prelude: Data Structures & Algorithms", path: `${cs}${dsa}/dsa_overview`, },
					{ name: "Complexity Analysis", path: `${cs}${dsa}/dsa_complexity_analysis`, },
					{ name: "Numeric Algorithms", path: `${cs}${dsa}/dsa_numeric_algorithms`, },
					{ name: "Static Arrays", path: `${cs}${dsa}${sa}arrays`,
						children: [
							{ name: "Linear Search", path: `${cs}${dsa}${sa}arrays#linear-search`, },
							{ name: "Binary Search", path: `${cs}${dsa}${sa}arrays#binary-search`, },
							{ name: "Max Finder", path: `${cs}${dsa}${sa}arrays#max-finder` },
							{ name: "Min Finder", path: `${cs}${dsa}${sa}arrays#min-finder` },
							{ name: "Summation", path: `${cs}${dsa}${sa}arrays#summate` },
							{ name: "Arithmetic Mean", path: `${cs}${dsa}${sa}arrays#arithmetic-mean`, },
							{ name: "Reversal", path: `${cs}${dsa}${sa}arrays#reversal` },
							{ name: "Shifting Elements", path: `${cs}${dsa}${sa}arrays#shift` },
							{ name: "Rotating Elements", path: `${cs}${dsa}${sa}arrays#rotate`, },
							{ name: "Sorted Insertion", path: `${cs}${dsa}${sa}arrays#sorted-insert`, },
							{ name: "Is this Array Sorted?", path: `${cs}${dsa}${sa}arrays#sort-check`, },
							{ name: "Cost-benefit Analysis: Arrays", path: `${cs}${dsa}${sa}arrays#cost-benefit-analysis-arrays`, },
						],
					},
					{ name: "Dynamic Arrays", path: `${cs}${dsa}${da}dynamic_arrays` },
					{ name: "Strings", path: `${cs}${dsa}${str}strings` },
					{ name: "Matrices", path: `${cs}${dsa}${mtr}matrices` },
					{ name: "Linked Lists", path: `${cs}${dsa}${ll}linked_lists` },
					{ name: "Circular Linked Lists", path: `${cs}${dsa}${cl}circular_linked_lists`, },
					{ name: "Doubly Linked Lists", path: `${cs}${dsa}${dbl}doubly_linked_lists`, },
					{ name: "Stacks", path: `${cs}${dsa}${stack}stacks` },
					{ name: "Queues", path: `${cs}${dsa}${queue}queues` },
					{ name: "Trees", path: `${cs}${dsa}${tree}intro`, children: [
							{ name: "Binary Trees", path: `${cs}${dsa}${tree}binary_trees`, },
							{ name: "Tree Traversal", path: `${cs}${dsa}${tree}tree_traversal`,
								children: [
									{ name: "Preorder Traversal", path: `${cs}${dsa}${tree}preorder`, },
									{ name: "Inorder Traversal", path: `${cs}${dsa}${tree}inorder`, },
									{ name: "Postorder Traversal", path: `${cs}${dsa}${tree}postorder`, },
									{ name: "Breadth-first Traversal", path: `${cs}${dsa}${tree}breadth_first`, },
									{ name: "Comparing Traversal Methods", path: `${cs}${dsa}${tree}comparing_traversal_methods`, },
									{ name: "Traversal Sketching", path: `${cs}${dsa}${tree}traversal_sketching`, },
									{ name: "Traversal Complexities", path: `${cs}${dsa}${tree}traversal_complexities`, },
									{ name: "Traversal Generation", path: `${cs}${dsa}${tree}traversal_generation`, },
								],
							},
							{ name: "Order Determination", path: `${cs}${dsa}${tree}order_determination`, },
							{ name: "Tree Summation", path: `${cs}${dsa}${tree}tree_sum`, },
							{ name: "Binary Search Trees (BST)", path: `${cs}${dsa}${tree}binary_search_trees`,
								children: [
									{ name: "Searching BSTs", path: `${cs}${dsa}${tree}searching_binary_search_trees`, },
									{ name: "Inserting New Nodes", path: `${cs}${dsa}${tree}bst_insertion`, },
									{ name: "BST Constructor", path: `${cs}${dsa}${tree}bst_constructor`, },
									{ name: "Deleting Nodes", path: `${cs}${dsa}${tree}bst_node_deletion`, },
									{ name: "BST Traversal Generation", path: `${cs}${dsa}${tree}bst_traversal_generation`, },
									{ name: "BST Costs", path: `${cs}${dsa}${tree}bst_costs`, },
								],
							},
							{ name: "AVL Trees", path: `${cs}${dsa}${tree}avl_trees`, children: [
								{ name: "Rotations", path: `${cs}${dsa}${tree}avl_trees#rotations`},
								{ name: "Right-rotation", path: `${cs}${dsa}${tree}avl_trees#right-rotation`},
								{ name: "Left-rotation", path: `${cs}${dsa}${tree}avl_trees#left-rotation`},
								{ name: "Right-left-rotation", path: `${cs}${dsa}${tree}avl_trees#right-left-rotation`},
								{ name: "Left-left-rotation", path: `${cs}${dsa}${tree}avl_trees#left-left-rotation`},
								{ name: "General Form of AVL Rotations", path: `${cs}${dsa}${tree}avl_trees#general-form-of-avl-rotations`},

							]},
							{ name: "Multiway Search Trees", path: `${cs}${dsa}${tree}${mway}preface` },
						],
					},
					{ name: "Heaps", path: `${cs}${dsa}${heap}heaps` },
					{ name: "Common Problems", path: `${cs}${dsa}${pro}preface` },
				],
			},
			{ name: "Computer Graphics", path: `${cs}${gr}preface`, children: [
				{ name: "Scenes", path: `${cs}${gr}scenes` },
				{ name: "Object Transformation", path: `${cs}${gr}object_transformation` },
				{ name: "Animations", path: `${cs}${gr}animations` },
				{ name: "Cameras", path: `${cs}${gr}cameras` },
			] },
			{ name: "Computer Systems", path: `${cs}${sys}intro`, children: [
					{ name: "The C Language", path: `${cs}${sys}${clang}c_basics` },
					{ name: "Digital Signals", path: `${cs}${sys}digital_signals` },
					{ name: "Boolean Logic", path: `${cs}${sys}boolean_logic` },
					{ name: "Logic Gates", path: `${cs}${sys}logic_gates` },
					{ name: "The ALU", path: `${cs}${sys}alu` },
					{ name: "Implementing Time", path: `${cs}${sys}time` },
					{ name: "Memory", path: `${cs}${sys}memory` },
					{ name: "RAM", path: `${cs}${sys}ram` },
					{ name: "PC", path: `${cs}${sys}pc` },
					{ name: "Machine Language", path: `${cs}${sys}machine_language` },
					{ name: "Memory Hierarchy", path: `${cs}${sys}memory_hierarchy` },
					{ name: "Computer Networks", path: `${cs}${sys}networks`, children: [
						{ name: "The Network Core", path: `${cs}${sys}network_core` },
						{ name: "The Internet & ISPs", path: `${cs}${sys}isp` },
					]},
				],
			},
			{ name: "Mobile Systems", path: `${cs}${mob}preface`, children: [
				{ name: "MVVM", path: `${cs}${mob}mvvm` },
				{ name: "Swift", path: `${cs}${mob}${swf}intro`, children: []},
			] },
			{ name: "Computer Languages", path: `${cs}${lang}preface`, children: [
				{ name: "Introduction to Parsing", path: `${cs}${lang}intro_to_parsing` },
			]},
			{ name: "Tools", path: `${cs}${tls}intro`, children: [
				{ name: "Bash", path: `${cs}${tls}${shells}basics` },
				{ name: "Git", path: `${cs}${tls}${git}basics` },
			]},
		],
	},
	{ name: "Review of Mathematics", path: `${math}/preface`,children: [
			{ name: "Classical Algebra", path: `${math}${ca}intro`, children: [
					{ name: "Addition", path: `${math}${ca}addition` },
					{ name: "Closure", path: `${math}${ca}closure` },
					{ name: "Distributivity", path: `${math}${ca}distributivity` },
					{ name: "Division & Divisibility", path: `${math}${ca}division_and_divisibility`, },
					{ name: "Proportions", path: `${math}${ca}proportions`, },
					{ name: "Rational Expressions", path: `${math}${ca}rational_expressions`, },
					{ name: "Expansions", path: `${math}${ca}expansions` },
					{ name: "Exponentiation", path: `${math}${ca}exponentiation` },
					{ name: "Inequalities", path: `${math}${ca}inequalities` },
					{ name: "Absolute Value", path: `${math}${ca}absolute_value` },
					{ name: "Multiplication", path: `${math}${ca}multiplication` },
					{ name: "Multivariable Relationships", path: `${math}${ca}multivariable_relationships`, },
					{ name: "Number Sets", path: `${math}${ca}number_sets` },
					{ name: "Perfect Powers", path: `${math}${ca}perfect_powers` },
					{ name: "Radicals", path: `${math}${ca}radicals` },
					{ name: "Order of Operations", path: `${math}${ca}order_of_operations`, },
					{ name: "Logarithms", path: `${math}${ca}logarithms` },
					{ name: "Rational Numbers", path: `${math}${ca}rational_numbers`, },
					{ name: "Irrational Numbers", path: `${math}${ca}irrational_numbers`, },
					{ name: "Imaginary Numbers", path: `${math}${ca}imaginary_numbers`, },
					{ name: "Decimal System", path: `${math}${ca}decimal_system` },
					{ name: "Real Numbers", path: `${math}${ca}real_numbers` },
					{ name: "Expressions", path: `${math}${ca}expressions` },
					{ name: "Equation Families", path: `${math}${ca}equation_families`, },
					{ name: "Truth Sets & Sentences", path: `${math}${ca}truth_sets` },
					{ name: "Conditional Equations", path: `${math}${ca}conditional_equations`, },
					{ name: "Linear Equations in One Variable", path: `${math}${ca}linear_equations_1_variable`, },
					{ name: "Expression Domain", path: `${math}${ca}expression_domain`, },
					{ name: "Polynomial Equations", path: `${math}${ca}polynomial_equations`, },
					{ name: "Inequations", path: `${math}${ca}inequations` },
					{ name: "Quadratics", path: `${math}${ca}quadratics` },
					{ name: "Solving Quadratics", path: `${math}${ca}solving_quadratics`, },
					{ name: "Binomial Theorem", path: `${math}${ca}binomial_theorem`, },
					{ name: "Matrices", path: `${math}${ca}matrices`, },
				],
			},
			{ name: "Logic", path: `${math}${log}preface`, children: [
				{ name: "Propositional Logic", path: `${math}${log}propositional_logic` },
				{ name: "Arguments", path: `${math}${log}arguments` },
			]},
			{ name: "Discrete Mathematics", path: `${math}${dm}preface`, children: [
				{ name: "Induction", path: `${math}${dm}induction` },
				{ name: "Invariants", path: `${math}${dm}invariants` },
				{ name: "Strong Induction", path: `${math}${dm}strong_induction` },
				{ name: "Number Theory", path: `${math}${dm}number_theory` },
				{ name: "Set Theory", path: `${math}${dm}set_theory` },
			]},
			{ name: "Calculus", path: `${math}${calc}preface`, children: [
				{ name: "Intervals", path: `${math}${calc}intervals` },
				{ name: "The Cartesian Plane", path: `${math}${calc}cartesian_plane` },
				{ name: "The Distance Formula", path: `${math}${calc}distance_formula` },
				{ name: "Slope", path: `${math}${calc}slope` },
				{ name: "Functions", path: `${math}${calc}functions` },
				{ name: "Functions & Graphs", path: `${math}${calc}function_graphs` },
				{ name: "The Absolute Value Function", path: `${math}${calc}absolute_value_function` },
				{ name: "Exponential Functions", path: `${math}${calc}exponential_functions` },
				{ name: "Logarithmic Functions", path: `${math}${calc}logarithmic_functions` },
			]},
			{ name: "Statistics", path: `${math}${stat}preface`, children: [
				{ name: "Foundational Definitions", path: `${math}${stat}foundational_definitions` },
			]},
		],
	},
];

export default Routes;
