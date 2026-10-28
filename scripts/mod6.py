# Module 6: Software Testing Strategies & Debugging

def get_mod6():
    return {
        "id": "testing-debugging",
        "number": 6,
        "title": "Software Testing Strategies, McCabe Cyclomatic Complexity & Debugging",
        "shortTitle": "Testing & Debugging",
        "ects": "4.0 ECTS",
        "readTime": "32 min read",
        "updated": "Course Slides: LECT 7-Testing and debugging_new.pdf & Whitebox_Blackbox.pdf",
        "sourceSlide": "LECT 7-Testing and debugging_new.pdf & Whitebox_Blackbox.pdf",
        "slideUrl": "slides/LECT 7-Testing and debugging_new.pdf",
        "summary": "Exhaustive treatment of Software Testing: The Error-Fault-Failure defect chain, Black-box ECP and BVA (4n+1, 6n+1, 5^n), White-box coverage hierarchy, McCabe Cyclomatic Complexity V(G) graph theory proofs, basis path testing, Mills' error seeding numerical, and systematic debugging.",
        "tags": ["#CyclomaticComplexity", "#BoundaryValueAnalysis", "#EquivalencePartitioning", "#BasisPathTesting", "#ErrorSeeding", "#WhiteBox", "#BlackBox"],
        "subsections": [
            {
                "id": "testing-foundations",
                "title": "6.1 Testing Fundamentals: Error, Fault, Failure & Verification vs. Validation",
                "content": """### 🎯 Core Intuition ("The Distracted Baker, The Poisoned Cake & The Sick Customer")
Imagine a baker preparing wedding cakes:
1. **The Error (Human Mistake):** The baker is sleepy and accidentally grabs a jar of salt instead of sugar. This is a mental lapse (**Error**).
2. **The Fault (The Bug in the Code):** The unbaked cake batter now has 2 cups of salt in it. The batter sits silently on the counter. It isn't hurting anyone yet, but it contains a dormant defect (**Fault / Bug**).
3. **The Failure (Observable Runtime Breakdown):** The customer takes a bite of the cake at the wedding, spits it out in disgust, and demands a refund. The system has exhibited an observable failure (**Failure**).

A dormant fault in code does NOT become a failure until execution touches that exact line under specific input conditions!

---

### 📚 The Defect Chain (Strict Academic Definitions)
- **Error (Mistake):** A human action or cognitive misunderstanding that produces an incorrect result (e.g. typing `<` instead of `<=`, or misreading the SRS).
- **Fault (Bug / Defect):** An incorrect step, process, or data definition in a software artifact (design document or source code). It is the static manifestation of an error.
- **Failure:** The inability of a software system or component to perform its required functions within specified performance requirements during execution. It is the dynamic, observable deviation from the SRS.

#### The Hospital System Billing Example (From Course Slides):
- *The Error:* The developer thinks appointment consultation tax is $10\\%$ instead of $5\\%$.
- *The Fault:* The developer types `taxRate = 0.10;` in `BillingService.java`.
- *The Failure:* At month-end, 10,000 patients are billed an extra 50 USD, causing a financial audit crisis!

---

### ⚖️ Verification vs. Validation (Barry Boehm's Classic Axioms)
In university exams, professors universally ask: *"Distinguish between Verification and Validation."*

```
                     ┌───────────────────────────────────┐
                     │ Software Development Process Tree │
                     └─────────────────┬─────────────────┘
                                       │
            ┌──────────────────────────┴──────────────────────────┐
            ▼                                                     ▼
     [VERIFICATION]                                         [VALIDATION]
"Are we building the product RIGHT?"                 "Are we building the RIGHT product?"
- Objective: Conformance to specifications           - Objective: Fitness for customer purpose
- Checks static artifacts (SRS, UML, Code)           - Executes dynamic software in runtime
- Techniques: Reviews, Inspections, Static Walkthrough- Techniques: System Testing, Beta Trials
```

#### Detailed Comparison:
- **Verification:** Evaluates whether intermediate deliverables produced during a given development phase fulfill the conditions established at the start of that phase. (Static reviews, code walk-throughs, formal mathematical proofs).
- **Validation:** Evaluates the complete, integrated software product at the end of the development lifecycle to determine whether it satisfies customer operational requirements and real-world intent. (Dynamic black-box testing, usability labs, customer acceptance tests).

---

### 🚫 The Fallacy of Exhaustive Testing
Can we ever test a program 100% to prove it has zero bugs?
- **Edsger Dijkstra's Inviolable Theorem:**
  > *"Program testing can be used to show the presence of bugs, but never to show their absence!"*
- **Mathematical Proof (Exhaustive Testing Impossibility):**
  Consider a trivial function adding two 32-bit signed integers:
  `int add(int a, int b) { return a + b; }`
  - Total input space: $2^{32} \\times 2^{32} = 2^{64} \\approx 1.84 \\times 10^{19}$ test cases!
  - If a supercomputer executes **1 billion test cases per second**, testing this two-line function would take:
    $$\\frac{1.84 \\times 10^{19}}{10^9 \\times 60 \\times 60 \\times 24 \\times 365.25} \\approx 584 \\textbf{ Years!}$$
- **Conclusion:** Exhaustive testing of non-trivial programs is mathematically impossible. Therefore, software testing is the art of designing an **optimal, non-redundant test suite** that maximizes the probability of exposing the maximum number of faults with minimal test executions!""",
                "table": {
                    "headers": ["Dimension", "Verification", "Validation"],
                    "rows": [
                        ["Guiding Question", "\"Are we building the product right?\"", "\"Are we building the right product?\""],
                        ["Evaluation Mechanism", "Static analysis: Inspections, reviews, walkthroughs, desk-checking", "Dynamic execution: Running test suites against compiled binaries"],
                        ["Artifacts Evaluated", "SRS documents, architectural designs, class models, source code", "Executable software build in production or staging environments"],
                        ["Target Standard", "Conformance to design specifications and formal rules", "Conformance to user expectations and operational business intent"],
                        ["Personnel Involved", "Software developers, peer reviewers, quality assurance analysts", "End-users, client acceptance committees, testing teams"]
                    ]
                },
                "callout": {
                    "type": "amber",
                    "title": "Exam Definition: Test Case vs. Test Suite",
                    "text": "A Test Case is a formal triplet: [Input Data, Execution Preconditions, Expected Output]. A Test Suite is a curated collection of multiple non-redundant test cases designed to achieve a defined coverage goal (e.g. 100% branch coverage)."
                }
            },
            {
                "id": "blackbox-testing",
                "title": "6.2 Black-Box Testing: Equivalence Partitioning & Boundary Value Analysis",
                "content": """### 🎯 Core Intuition ("The Vending Machine & The Edge of the Cliff")
Imagine testing a vending machine that accepts coins between 1 USD and 10 USD:
- You don't need to insert 10,000 different shiny 5-dollar coins. If one 5-dollar coin works, all 5-dollar coins work! You divide inputs into buckets (**Equivalence Class Partitioning**).
- Where do things break in real life? At the edges! When you put in a 0-dollar coin (too low), a 1-dollar coin (exact min boundary), a 10-dollar coin (exact max boundary), or an 11-dollar coin (too high). Mechanical gears and code logic fail at the borders (**Boundary Value Analysis**).

---

### 📦 1. Equivalence Class Partitioning (ECP)
ECP is a foundational black-box testing technique that partitions the input domain of a program into disjoint subsets called **Equivalence Classes**, such that executing a single test case from a class is representative of all inputs in that class.

#### Two Types of Equivalence Classes:
1. **Valid Equivalence Classes:** Groups of valid inputs that the system is formally specified to process correctly.
2. **Invalid Equivalence Classes:** Groups of invalid inputs or edge-error states that the system must detect, reject, and handle gracefully.

#### The Commission Problem Case Study (Slide Highlight):
A sales agent sells three items:
- Locks (45 USD each, limit: 1 to 70 per month)
- Stocks (30 USD each, limit: 1 to 80 per month)
- Barrels (25 USD each, limit: 1 to 90 per month)
- Commission tiers: $10\\%$ on sales up to 1,000 USD; $15\\%$ on sales between 1,000 and 1,800 USD; $20\\%$ on sales exceeding 1,800 USD.
- *Input Equivalence Classes:*
  - Valid: $\\text{Locks} \\in [1, 70]$, $\\text{Stocks} \\in [1, 80]$, $\\text{Barrels} \\in [1, 90]$.
  - Invalid: $\\text{Locks} < 1$, $\\text{Locks} > 70$, non-numeric values, negative quantities.

---

### 📏 2. Boundary Value Analysis (BVA) & Test Case Derivation
Empirical software research shows that the vast majority of coding bugs cluster right at the boundaries of input ranges (due to off-by-one errors like typing `<` instead of `<=`).

#### Value Selection for a Continuous Range $[a, b]$:
For an input variable with valid range between minimum $a$ and maximum $b$, BVA selects five critical values:
1. $a$ (Exact Minimum)
2. $a + 1$ (Just Above Minimum / Minimum+)
3. $\\frac{a + b}{2}$ (Nominal / Typical Average)
4. $b - 1$ (Just Below Maximum / Maximum-)
5. $b$ (Exact Maximum)

---

### 🔢 Quantitative BVA Formulas for $n$ Input Variables
A standard university exam question asks: *"Calculate the number of test cases generated by Standard BVA, Robustness Testing, and Worst-Case Testing for $n$ variables."*""",
                "formula": {
                    "latex": "\\text{Standard BVA} = 4n + 1, \\quad \\text{Robustness} = 6n + 1, \\quad \\text{Worst-Case} = 5^n, \\quad \\text{Robust Worst-Case} = 7^n",
                    "explanation": "For n input variables: Standard BVA holds all variables at nominal while varying 1 variable through {min, min+, max-, max} (4 cases each) plus 1 all-nominal case (4n + 1). Robustness adds {min-, max+} (6n + 1). Worst-Case takes the full Cartesian product of all 5 values (5^n)!"
                },
                "table": {
                    "headers": ["Testing Methodology", "Values Selected per Variable", "Test Count Formula", "Example: n = 3 Variables"],
                    "rows": [
                        ["Standard BVA", "{min, min+, nom, max-, max}", "4n + 1", "4(3) + 1 = 13 Test Cases"],
                        ["Robustness Testing", "{min-, min, min+, nom, max-, max, max+}", "6n + 1", "6(3) + 1 = 19 Test Cases"],
                        ["Worst-Case BVA", "Full Cartesian combinations of {min, min+, nom, max-, max}", "5^n", "5^3 = 125 Test Cases"],
                        ["Robust Worst-Case BVA", "Full Cartesian combinations of all 7 values", "7^n", "7^3 = 343 Test Cases"]
                    ]
                },
                "callout": {
                    "type": "pine",
                    "title": "Exam Numerical: Commission Problem BVA",
                    "text": "For the Commission Problem with 3 variables (Locks, Stocks, Barrels): Standard BVA yields 4(3) + 1 = 13 test cases. Robustness testing yields 6(3) + 1 = 19 test cases. Worst-case testing yields 5^3 = 125 test cases!"
                }
            },
            {
                "id": "whitebox-testing",
                "title": "6.3 White-Box Testing & Coverage Criteria Hierarchy",
                "content": """### 🎯 Core Intuition ("The X-Ray Machine")
If Black-Box testing is judging a car solely by turning the key and stepping on the gas pedal, **White-Box testing** is putting the car on a hydraulic lift, opening the engine hood, and hooking up digital oscilloscopes to inspect the spark plugs, crankshaft rotation, and fuel injectors. You inspect the **internal source code logic, control branches, and execution paths**.

---

### 📚 The White-Box Coverage Hierarchy
White-box testing designs test cases based on the internal control structure of the program. Coverage metrics measure how thoroughly a test suite exercises the source code:

```
[WEAKEST]   Statement Coverage (Node Coverage)
    │
    ▼
Branch Coverage (Edge Coverage / Decision Coverage)
    │
    ▼
Condition Coverage (Predicate Coverage)
    │
    ▼
Multiple Condition Coverage (Branch-Condition Coverage)
    │
    ▼
[STRONGEST] Path Coverage (All Possible Execution Trajectories)
```

---

#### 1. Statement Coverage (Weakest Metric)
- **Definition:** Requires designing test cases such that every executable program statement is executed at least once during test suite run.
- **Formula:**
  $$\\text{Statement Coverage} = \\frac{\\text{Number of Executed Statements}}{\\text{Total Executable Statements}} \\times 100\\%$$
- **Fatal Weakness (Exam Trap):** Statement coverage can achieve $100\\%$ while missing entire decision outcomes!
  ```c
  // If input x > 0, both lines execute -> 100% Statement Coverage!
  // BUT the False branch (x <= 0) is NEVER tested!
  if (x > 0) {
      y = 100 / x;
  }
  ```
  If `x = 0`, a division-by-zero crash occurs, but Statement Coverage never tested `x <= 0`!

#### 2. Branch Coverage (Edge Coverage / Decision Coverage)
- **Definition:** Requires test cases to make each decision predicate evaluate to **True** at least once and **False** at least once.
- Every edge in the program's Control Flow Graph must be traversed.
- Branch coverage strictly subsumes Statement Coverage (achieving $100\\%$ Branch Coverage guarantees $100\\%$ Statement Coverage).

#### 3. Condition Coverage (Predicate Coverage)
- **Definition:** In compound conditional expressions containing boolean operators (`&&`, `||`), each individual atomic boolean condition must evaluate to True and False at least once.
- *Example:* `if (A || B)`
  - Branch coverage requires only that the compound expression evaluates to True once and False once.
  - Condition coverage requires $A$ to be $\\{T, F\\}$ and $B$ to be $\\{T, F\\}$.

#### 4. Path Coverage (Strongest Metric)
- **Definition:** Requires designing test cases to execute every distinct linearly independent execution trajectory from the program's entry node to its exit node.
- **The Loop Problem:** If a program contains an unbounded loop that can iterate up to $k$ times:
  $$\\text{Paths} \\approx 1 + 2 + 3 + \\dots + k$$
  Path coverage becomes mathematically infinite or computationally intractable for any non-trivial software!""",
                "table": {
                    "headers": ["Coverage Metric", "What it Exercises", "Relative Thoroughness", "Primary Practical Limitation"],
                    "rows": [
                        ["Statement Coverage", "Every executable code statement at least once", "Weakest (Baseline)", "Completely misses False branches of single-armed if statements"],
                        ["Branch Coverage", "Every branch outcome (True & False edge) of every decision", "Standard Industry Minimum", "Does not test all permutations of compound sub-conditions"],
                        ["Condition Coverage", "Every atomic boolean variable evaluated to True and False", "High", "May achieve condition coverage without exercising all branch edges!"],
                        ["Path Coverage", "Every possible trajectory through the Control Flow Graph", "Strongest (Theoretical Ideal)", "Infinite or astronomically large for programs with loops"]
                    ]
                },
                "callout": {
                    "type": "amber",
                    "title": "Exam Trap: Branch Coverage vs. Condition Coverage",
                    "text": "Does Condition Coverage guarantee Branch Coverage? NO! If you have 'if (A && B)': Test 1: A=True, B=False (Branch=False). Test 2: A=False, B=True (Branch=False). Both conditions experienced True and False, but the True branch of the if statement was NEVER executed!"
                }
            },
            {
                "id": "cyclomatic-complexity",
                "title": "6.4 McCabe's Cyclomatic Complexity V(G) & Basis Path Testing",
                "content": """### 🎯 Core Intuition ("Counting the Distinct Road Trips")
Imagine a road map between City A and City B. There is a highway, two mountain detours, and a river ferry. How many fundamentally different road trips can you take without repeating yourself? 

In 1976, Thomas McCabe applied mathematical graph theory to software code. **McCabe's Cyclomatic Complexity Metric $V(G)$** measures the exact structural complexity of a program and calculates the **exact minimum number of test cases** required to guarantee that every single branch in the code is executed at least once!

---

### 📊 Mapping Code to a Control Flow Graph (CFG)
Before calculating complexity, code statements are mapped to a directed graph $G = (V, E)$:
- **Nodes ($N$):** Represent sequential blocks of code (statements with no branching).
- **Edges ($E$):** Represent directed control flow transfers between nodes.
- **Decision Nodes (Predicate Nodes):** Nodes containing conditional branching statements (`if`, `while`, `for`, `case`).

```
                ( Node 1: Entry )
                       │
                       ▼
              < Predicate Node 2 > ──── (True Branch) ───┐
                       │                                 │
                 (False Branch)                          ▼
                       │                         [ Node 3: Process ]
                       ▼                                 │
              < Predicate Node 4 >                       │
                  /          \\                           │
            (True)            (False)                    │
              /                  \\                      │
             ▼                    ▼                      │
       [ Node 5 ]            [ Node 6 ]                  │
             │                    │                      │
             └──────────┬─────────┘                      │
                        ▼                                │
                 ( Node 7: Merge ) <─────────────────────┘
                        │
                        ▼
                 ( Node 8: Exit )
```

---

### 🔢 The Three Equivalent Formulas for Cyclomatic Complexity $V(G)$
In university exams, professors require you to know all three mathematically equivalent formulas:

1. **Formula 1: Graph-Theoretic Euler Formula**
   $$V(G) = E - N + 2P$$
   - Where $E$ = number of edges, $N$ = number of nodes, and $P$ = number of connected components.
   - For a single program / procedure ($P = 1$):
     $$V(G) = E - N + 2$$
2. **Formula 2: Predicate Node Theorem**
   $$V(G) = P_{\\text{predicates}} + 1$$
   - Where $P_{\\text{predicates}}$ is the number of decision points containing conditional branching.
3. **Formula 3: Planar Enclosed Regions Theorem**
   $$V(G) = \\text{Number of Enclosed Planar Regions} + 1$$

---

### ⚠️ The Compound Predicate Rule (The #1 Exam Pitfall)
When calculating predicate nodes, if a conditional statement contains compound boolean operators (`&&`, `||`):
> **Each atomic condition counts as an independent decision point!**

*Example:*
`if (A > 0 && B < 50)`
- This is NOT 1 predicate node. Because compilers implement short-circuit evaluation, it generates **TWO distinct binary decision nodes** in the CFG!
- Predicates = 2, so $V(G) = 2 + 1 = 3$.

---

### 📋 Connection Matrix (Graph Matrix) Method
The lecture slides explain the **Connection Matrix** method for deriving complexity:
1. Construct an $N \\times N$ square matrix where rows and columns represent nodes.
2. Put a `1` if a directed edge exists from Node $i$ to Node $j$; otherwise put `0`.
3. In each row, count the number of 1s, subtract 1 from each row count (ignoring rows with 0 edges), and sum the result $+ 1$.
   $$V(G) = \\sum (\\text{Row Out-Degree} - 1) + 1$$

---

### 🧪 Deriving Linearly Independent Basis Paths
A set of **linearly independent basis paths** is an execution path set such that every path introduces at least one new edge that is not part of any prior path.
- Standard Industry Ceiling: $V(G) \\le 10$.
  - $V(G) \\le 10$: Well-structured code, low testability risk, easily maintainable.
  - $11 \\le V(G) \\le 20$: Moderate complexity, higher risk; refactoring advised.
  - $V(G) > 50$: Untestable, error-prone, severe violation of structured programming!""",
                "formula": {
                    "latex": "V(G) = E - N + 2P = P_{\\text{predicates}} + 1 = \\text{Regions}",
                    "explanation": "Guarantees the exact minimum number of test cases needed to achieve 100% basis path branch coverage. For a program with E=14 edges and N=11 nodes (P=1): V(G) = 14 - 11 + 2 = 5 test cases!"
                },
                "callout": {
                    "type": "pine",
                    "title": "Exam Solved Numerical: Procedure Average",
                    "text": "Exam Question: 'A procedure Control Flow Graph has 14 edges, 11 nodes, and 4 predicate nodes. Find V(G).' Calculation: Method 1: V(G) = E - N + 2 = 14 - 11 + 2 = 5. Method 2: V(G) = Predicates + 1 = 4 + 1 = 5. Exactly 5 test cases are required for basis path coverage!"
                }
            },
            {
                "id": "integration-debugging",
                "title": "6.5 Integration Strategies, Error Seeding & Systematic Debugging",
                "content": """### 🎯 Core Intuition ("Scaffolding the Skyscraper & Counting Fish in a Lake")
- **Integration Testing:** You don't just dump 500 car parts into a pile and turn the key. You build the engine, test it with a test battery (**driver**), attach the transmission using a fake wooden chassis (**stub**), and build out systematically.
- **Harlan Mills' Error Seeding (Fish in a Lake):** How do wildlife biologists estimate how many fish are in a lake? You catch 100 fish, paint a yellow dot on their tails (**seed them**), and throw them back. Next week, you catch 90 yellow fish and 50 unpainted fish. Using simple ratios, you deduce exactly how many wild fish are left in the lake!

---

### 🧩 1. Integration Testing Strategies
Modules must be combined systematically:

#### A. Big-Bang Integration (The Anti-Pattern)
- All modules are compiled and linked together in one single simultaneous shot.
- **Why It Is Disastrous:** When the system crashes, it is virtually impossible to isolate which module introduced the bug or which interface signature was corrupted.

#### B. Top-Down Integration
- Starts at the top root controller and works downwards through the control hierarchy.
- **Stubs Required:** Subordinate modules that have not yet been implemented are replaced by **Stubs** (dummy helper routines that accept parameters and return hardcoded simulated responses).
- **Variations:**
  - *Depth-First:* Integrates all components along a major architectural control path.
  - *Breadth-First:* Integrates all modules directly subordinate to the current level before moving deeper.
- **Advantage:** Verifies major architectural control flows and high-level decision paths early.

#### C. Bottom-Up Integration
- Starts at the leaf modules (database adapters, mathematical utilities) and works upwards.
- **Drivers Required:** Parent modules that have not yet been written are replaced by **Drivers** (temporary test harnesses that invoke child subroutines with test parameters).
- **Advantage:** Low-level utility algorithms and data manipulation routines are thoroughly verified early.

#### D. Sandwich (Hybrid) Integration
- Blends top-down for the upper business control layers with bottom-up for the lower utility/infrastructure layers. Minimizes both stubs and drivers.

---

### 🐟 2. Error Seeding (Harlan Mills' Defect Estimation Technique)
How can a project manager know how many undetected bugs remain in the code?
Dr. Harlan Mills formulated **Fault Seeding**:
1. Introduce a known number $S$ of artificial, representative faults into the codebase.
2. Let the testing team execute tests without telling them which errors were seeded.
3. Count how many seeded errors $s$ were discovered, and how many real errors $n$ were discovered.

#### Mathematical Ratio Formulation:
$$\\frac{n}{N} = \\frac{s}{S}$$

Rearranging gives the total estimated actual errors originally in the system ($N$):
$$N = \\frac{S \\times n}{s}$$

The number of **undetected remaining errors** in the system is:
$$\\text{Remaining Defects} = N - n = n \\left(\\frac{S - s}{s}\\right)$$

---

### 🔢 Solved University Exam Numerical (Slide 131)
> **Exam Problem:** *During testing, 100 artificial errors were seeded into the software system ($S = 100$). The test team discovered 90 of the seeded errors ($s = 90$). In addition, they discovered 50 real system errors ($n = 50$). Calculate the total estimated errors in the system and the number of undetected errors remaining.*

#### Step-by-Step Solution:
1. Total estimated errors in the system ($N$):
   $$N = \\frac{S \\times n}{s} = \\frac{100 \\times 50}{90} = \\frac{5000}{90} \\approx 55.56 \\approx 56 \\text{ total defects}$$
2. Estimated remaining undetected defects:
   $$\\text{Remaining} = n \\left(\\frac{S - s}{s}\\right) = 50 \\times \\left(\\frac{100 - 90}{90}\\right) = 50 \\times \\frac{10}{90} = \\frac{500}{90} \\approx 5.56 \\approx \\mathbf{6 \\text{ errors remaining!}}$$

---

### 🔬 3. Systematic Debugging Methodologies
Debugging is the process of locating and correcting the cause of an observed failure.
1. **Brute Force:** Adding dozens of `print` statements, memory dumps, or running line-by-line in a debugger. (Inefficient; causes information overload).
2. **Backtracking:** Tracing backward through the source code from the exact location where failure symptoms were observed (e.g. following the call stack back up to the erroneous variable assignment).
3. **Cause Elimination (Scientific Deduction):** Formulate a formal hypothesis regarding what could cause the symptom, design a targeted micro-test to prove or disprove the hypothesis, and eliminate invalid theories systematically.""",
                "table": {
                    "headers": ["Integration Strategy", "Scaffolding Required", "Primary Advantage", "Critical Vulnerability"],
                    "rows": [
                        ["Big-Bang", "None", "No scaffolding overhead", "Impossible to isolate defect causes; catastrophic failure risk"],
                        ["Top-Down", "Stubs (Simulate child modules)", "Major architectural and UI control flows verified early", "Requires complex stubs; low-level utility bugs detected very late"],
                        ["Bottom-Up", "Drivers (Simulate calling parents)", "Low-level data access and utility algorithms verified early", "Requires writing throwaway drivers; high-level system flows tested last"],
                        ["Sandwich", "Both Stubs and Drivers (Fewer of each)", "Balances high-level architectural flows with low-level data testing", "More complex coordination"]
                    ]
                },
                "callout": {
                    "type": "pine",
                    "title": "Exam Definition: Drivers vs. Stubs",
                    "text": "A Driver is a temporary calling program (written for bottom-up integration) that simulates a parent module by passing test arguments to a child. A Stub is a temporary dummy module (written for top-down integration) that simulates a called child by accepting parameters and returning a fixed dummy value."
                }
            }
        ]
    }
