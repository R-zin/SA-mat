import json

flashcards = [
  {
    "id": 1,
    "category": "Software Testing",
    "question": "What does McCabe's Cyclomatic Complexity V(G) calculate, and what are its three equivalent formulas?",
    "hint": "Recall Euler graph theory, predicate counting, and planar regions.",
    "answer": "It computes the number of linearly independent paths through the program's Control Flow Graph (CFG), defining the exact minimum number of test cases required for 100% basis path branch coverage. Standard upper ceiling is V(G) <= 10.\n1. Euler Formula: V(G) = E - N + 2P (For single program P=1 -> E - N + 2)\n2. Predicate Formula: V(G) = P(predicates) + 1\n3. Planar Regions: V(G) = Enclosed Regions + 1",
    "formula": "V(G) = E - N + 2P = P_{\\text{predicates}} + 1 = \\text{Regions}"
  },
  {
    "id": 2,
    "category": "Modular Design",
    "question": "List the 7 levels of Cohesion from WORST to BEST with brief definitions.",
    "hint": "Remember mnemonic: Co-Lo-Tem-Pro-Com-Seq-Func.",
    "answer": "1. Coincidental (Worst): Arbitrary, accidental grouping of unrelated tasks.\n2. Logical (Low): Tasks in the same broad logical category, selected by a control flag.\n3. Temporal (Low-Med): Tasks grouped purely because they execute at the same time (e.g. startup).\n4. Procedural (Med): Tasks grouped because they execute in an algorithmic sequence without sharing data.\n5. Communicational (Med-High): Tasks operate on the exact same input/output data structure.\n6. Sequential (High): Output of task A feeds as direct input to task B (Pipeline).\n7. Functional (Best): All elements contribute to ONE single, atomic, well-defined mathematical task."
  },
  {
    "id": 3,
    "category": "Modular Design",
    "question": "List the 5 classes of Coupling from WORST (most coupled) to BEST (least coupled).",
    "hint": "Remember mnemonic: Con-Com-Ctrl-St-Dat.",
    "answer": "1. Content Coupling (Worst): Directly modifying or branching into another module's private internal code or memory.\n2. Common Coupling (Very Bad): Multiple modules reading and mutating shared global variables.\n3. Control Coupling (Bad): Passing a flag/switch that dictates the internal branching logic of the called module.\n4. Stamp Coupling (Acceptable): Passing an entire composite record when the called module only needs 1 or 2 fields.\n5. Data Coupling (Best): Modules communicate exclusively by passing atomic primitive scalars (int, float, string) where all parameters are used."
  },
  {
    "id": 4,
    "category": "Project Estimation",
    "question": "According to Putnam's Software Equation, how does cost/effort scale when delivery schedule is compressed?",
    "hint": "Derive from S = Ck * K^(1/3) * td^(4/3).",
    "answer": "Development effort varies inversely with the FOURTH POWER of development time: Effort ∝ 1 / (td^4).\nA modest schedule compression of 20% (td' = 0.8 td) results in 1 / (0.8)^4 = 2.441x (a 144% increase in required human effort and budget)!",
    "formula": "K = \\frac{S^3}{C_k^3 \\cdot t_d^4} \\implies \\text{Effort} \\propto \\frac{1}{t_d^4}"
  },
  {
    "id": 5,
    "category": "Project Management",
    "question": "What is Barry Boehm's 75% Compression Limit and what does Brooks' Law state?",
    "hint": "Recall limits of hiring engineers to meet late deadlines.",
    "answer": "Boehm's 75% Limit states: 'No software project schedule can be compressed by more than 25% (i.e. below 75% of nominal development time Tdev) regardless of budget or manpower added.'\nBrooks' Law states: 'Adding manpower to a late software project makes it later' due to exponential communication overhead [N(N-1)/2 channels] and senior engineer mentoring drag.",
    "formula": "\\text{Communication Channels} = \\frac{N(N-1)}{2}"
  },
  {
    "id": 6,
    "category": "Testing Concepts",
    "question": "What is the precise academic difference between an Error, a Fault (Bug), and a Failure?",
    "hint": "Think human action vs static code vs dynamic execution.",
    "answer": "1. Error: A human action, mistake, or cognitive misunderstanding made during analysis, design, or coding.\n2. Fault (Bug / Defect): A static flaw or incorrect step in design documents or source code introduced as a result of an error.\n3. Failure: An observable incorrect runtime behavior during execution that deviates from the SRS specification."
  },
  {
    "id": 7,
    "category": "Software Quality",
    "question": "What are the 5 maturity levels of the SEI Capability Maturity Model (CMM) in strict order?",
    "hint": "Remember mnemonic: I-R-D-M-O.",
    "answer": "Level 1: Initial (Chaotic, ad-hoc, hero-dependent, unpredictable cost & schedule).\nLevel 2: Repeatable (Project-level discipline: Requirements Management, Project Planning, SQA, SCM).\nLevel 3: Defined (Organization-wide standard engineering process: Training, Peer Reviews, Integrated Management).\nLevel 4: Managed (Quantitative process measurement: Software Quality Management, Statistical Process Control).\nLevel 5: Optimizing (Continuous process improvement: Defect Prevention, Technology Change Management)."
  },
  {
    "id": 8,
    "category": "Architectural Design",
    "question": "Name Philippe Kruchten's 4+1 Architectural Views and the primary audience for each.",
    "hint": "Logical, Process, Development, Physical + Scenarios.",
    "answer": "1. Logical View: Domain abstractions & class models -> End-users, business analysts.\n2. Process View: Concurrency, threads, IPC, synchronization, latency -> System integrators.\n3. Development View: Packages, subsystems, modules, libraries -> Software developers, build engineers.\n4. Physical View: Hardware servers, network links, execution topology -> DevOps, system engineers.\n+1. Scenarios / Use Cases: Validates and unifies the 4 views through concrete workflows -> All stakeholders."
  },
  {
    "id": 9,
    "category": "Project Estimation",
    "question": "In Basic COCOMO, what are the Effort and Development Time formulas for Organic Mode?",
    "hint": "Parameters a=2.4, b=1.05, c=2.5, d=0.38.",
    "answer": "Effort = 2.4 * (KLOC)^1.05 Person-Months [PM]\nNominal Time (Tdev) = 2.5 * (Effort)^0.38 Months\nAverage Staffing = Effort / Tdev Engineers.\nExponent b > 1 (1.05) indicates diseconomy of scale due to communication overhead.",
    "formula": "\\text{Effort} = 2.4 \\times (\\text{KLOC})^{1.05}, \\quad T_{\\text{dev}} = 2.5 \\times (\\text{Effort})^{0.38}"
  },
  {
    "id": 10,
    "category": "CI/CD & Deployment",
    "question": "What are the essential Next.js configuration properties required for GitHub Pages static hosting?",
    "hint": "Think export, base path, unoptimized images, and trailing slash.",
    "answer": "1. output: 'export' (Generates static HTML/JS/CSS in out/ directory).\n2. basePath: '/<repo-name>' (Ensures asset links resolve correctly on GitHub Pages subpaths).\n3. images: { unoptimized: true } (Disables server-side image optimizer since GitHub Pages has no Node runtime).\n4. trailingSlash: true (Generates folder/index.html to prevent 404s on direct URL refresh).",
    "formula": "\\mathtt{output: \\text{'export'}}, \\quad \\mathtt{basePath: \\text{'/<repo>'}}, \\quad \\mathtt{images.unoptimized: true}"
  },
  {
    "id": 11,
    "category": "SDLC Models",
    "question": "Explain Phase Containment of Errors and the Defect Amplification Model.",
    "hint": "What happens when an error escapes into downstream phases?",
    "answer": "Phase Containment of Errors mandates that defects must be eliminated in the exact phase they are introduced.\nIf a requirements error escapes undetected into design, it amplifies into multiple flawed modules; in coding, into hundreds of flawed lines.\nDefect repair cost escalates exponentially: $1x (Requirements) -> $5x (Design) -> $10x (Coding) -> $50x (System Testing) -> $100x-$200x (Post-Release Production)."
  },
  {
    "id": 12,
    "category": "SDLC Models",
    "question": "What is the inherent fatal flaw of the Classical Waterfall Model?",
    "hint": "Think about feedback loops between phases.",
    "answer": "Classical Waterfall is idealistic: it assumes humans make zero errors in feasibility, requirements, and design, and strictly prohibits feedback loops between phases. In real life, discovering an architectural defect during system testing requires cascading rework through design and requirements—an impossibility in pure classical waterfall."
  },
  {
    "id": 13,
    "category": "SDLC Models",
    "question": "Explain the 4 quadrants of Boehm's Spiral Model and what radial and angular coordinates represent.",
    "hint": "Remember O-R-E-P.",
    "answer": "Quadrant I: Objective Setting (Identify objectives, alternatives, and constraints).\nQuadrant II: Risk Assessment & Reduction (Analyze risks; resolve via prototyping and simulation - defining hallmark).\nQuadrant III: Development & Validation (Implement deliverable via waterfall or agile).\nQuadrant IV: Review & Planning (Customer review; plan next loop).\n- Radial Distance (r): Cumulative financial cost incurred to date.\n- Angular Dimension (θ): Percentage progress achieved within the phase."
  },
  {
    "id": 14,
    "category": "Requirements Engineering",
    "question": "Distinguish between Functional Requirements (FR) and Non-Functional Requirements (NFR).",
    "hint": "What the system does vs how it performs.",
    "answer": "Functional Requirements (FR) define concrete services, calculations, data transformations, and input-output behaviors the system must perform (e.g. 'search appointment list').\nNon-Functional Requirements (NFR) define runtime constraints, quality attributes, and environmental boundaries: Product requirements (speed, memory, reliability), Organizational requirements (standards, tools), and External requirements (privacy laws, safety regulations)."
  },
  {
    "id": 15,
    "category": "Requirements Engineering",
    "question": "What is Tacit Knowledge and why does Ethnography uncover it better than Interviews?",
    "hint": "Knowledge that experts take for granted.",
    "answer": "Tacit Knowledge is deep operational and organizational knowledge that domain experts perform automatically by habit and intuition, making it difficult for them to articulate during interviews ('everyone knows that!').\nEthnography immerses the analyst in the workplace as an observer, discovering how work is actually performed in practice versus theoretical manuals, uncovering unstated social and operational workflows."
  },
  {
    "id": 16,
    "category": "Agile Development",
    "question": "State the 4 Core Values of the Agile Manifesto.",
    "hint": "Pairs of 'X over Y'.",
    "answer": "1. Individuals and interactions over processes and tools\n2. Working software over comprehensive documentation\n3. Customer collaboration over contract negotiation\n4. Responding to change over following a plan\n(While there is value in the items on the right, we value the items on the left more!)."
  },
  {
    "id": 17,
    "category": "Agile Development",
    "question": "Explain the Test-Driven Development (TDD) cycle and its three distinct phases.",
    "hint": "Red -> Green -> Refactor.",
    "answer": "1. RED: Write an automated unit test for a new micro-feature before writing code. Run the test suite and confirm it FAILS (validates test sensitivity).\n2. GREEN: Write the bare minimum simplest code needed to make the failing test PASS (even hardcoding is allowed).\n3. REFACTOR: Clean up the code, eliminate duplication, improve variable names; verify test suite REMAINS 100% green."
  },
  {
    "id": 18,
    "category": "Agile Development",
    "question": "Summarize the '3-3-4' of the Scrum framework.",
    "hint": "3 Roles, 3 Artifacts, 4 Ceremonies.",
    "answer": "3 Roles: Product Owner (owns backlog & ROI), Scrum Master (servant leader, coach, removes blockers), Development Team (cross-functional, self-organizing 5-9 members).\n3 Artifacts: Product Backlog (DEEP list), Sprint Backlog (sprint commitment + tasks), Increment (shippable product increment).\n4 Ceremonies: Sprint Planning, Daily Scrum (15-min standup), Sprint Review (live demo), Sprint Retrospective (process improvement)."
  },
  {
    "id": 19,
    "category": "Software Testing",
    "question": "Give the test case count formulas for Standard BVA, Robustness, and Worst-Case testing for n variables.",
    "hint": "4n+1, 6n+1, 5^n.",
    "answer": "For n continuous input variables:\n- Standard BVA: 4n + 1 test cases (holds n-1 at nominal while varying 1 through min, min+, max-, max).\n- Robustness Testing: 6n + 1 test cases (adds out-of-bound min- and max+ to test error handling).\n- Worst-Case Testing: 5^n test cases (full Cartesian product of {min, min+, nom, max-, max}).\n- Robust Worst-Case: 7^n test cases.",
    "formula": "\\text{BVA} = 4n + 1, \\quad \\text{Robustness} = 6n + 1, \\quad \\text{Worst-Case} = 5^n"
  },
  {
    "id": 20,
    "category": "Software Testing",
    "question": "State Harlan Mills' Error Seeding formula and how remaining defects are estimated.",
    "hint": "Ratio: n/N = s/S.",
    "answer": "Let S = seeded artificial errors, s = seeded errors found during testing, N = total actual errors originally present, n = actual errors found.\nAssuming equal detection rates: n / N = s / S\nTotal Estimated Errors: N = (S * n) / s\nRemaining Undetected Errors: N - n = n * ((S - s) / s).\nExample: S=100, s=90, n=50 -> Remaining = 50 * (10/90) = 5.56 ≈ 6 errors remaining.",
    "formula": "N = \\frac{S \\times n}{s}, \\quad \\text{Remaining} = n \\left(\\frac{S - s}{s}\\right)"
  },
  {
    "id": 21,
    "category": "Software Testing",
    "question": "Why does 100% Statement Coverage NOT guarantee 100% Branch Coverage?",
    "hint": "Consider a single-armed if statement.",
    "answer": "Statement coverage requires only that every statement executes once. Consider:\n`if (x > 0) { y = 100 / x; }`\nA single test case with x = 5 executes both lines, achieving 100% Statement Coverage! However, the False branch (x <= 0) was NEVER executed. If x = 0 occurs in production, division by zero crashes the system. Branch coverage requires testing both True and False outcomes."
  },
  {
    "id": 22,
    "category": "Project Estimation",
    "question": "What are the 5 functional components of Albrecht's Function Point (FP) metric?",
    "hint": "ILF, EIF, EI, EO, EQ.",
    "answer": "1. Internal Logical Files (ILF): User-identifiable logical data groups maintained inside the application (database tables).\n2. External Interface Files (EIF): Files referenced/queried by the application but maintained externally.\n3. External Inputs (EI): Ingress transactions updating internal files.\n4. External Outputs (EO): Egress reports/messages involving algorithmic calculations.\n5. External Inquiries (EQ): Input-output retrieval without modifying internal database state.\nFormula: FP = UFP * [0.65 + 0.01 * sum(F_k)].",
    "formula": "UFP = \\sum (\\text{Count} \\times \\text{Weight}), \\quad FP = UFP \\times \\left[0.65 + 0.01 \\sum_{k=1}^{14} F_k\\right]"
  },
  {
    "id": 23,
    "category": "Software Quality",
    "question": "Distinguish between Quality Control (QC), Quality Assurance (QA), and Total Quality Management (TQM).",
    "hint": "Inspection vs Prevention vs Organizational Culture.",
    "answer": "Quality Control (QC): Product-focused post-facto inspection. Completed software is tested to detect and reject defective builds.\nQuality Assurance (QA): Process-focused defect prevention. SDLC processes, standards, and guidelines are defined and audited to prevent bugs from being injected.\nTotal Quality Management (TQM): Continuous, organization-wide cultural commitment. Every employee is empowered to improve processes continuously, maximizing customer satisfaction."
  },
  {
    "id": 24,
    "category": "Software Quality",
    "question": "What is the primary difference between ISO 9001 and SEI CMM?",
    "hint": "Binary certification vs 5-level maturity gradient.",
    "answer": "ISO 9001 is a binary pass/fail certification covering manufacturing and services, certifying that an organization complies with its own documented procedures ('say what you do, do what you say'). It roughly equates to CMM Level 2 / early Level 3.\nSEI CMM is designed exclusively for software, offering a graduated 5-level evolutionary maturity hierarchy (Level 1 to Level 5) that prescribes specific Key Process Areas (KPAs) for continuous engineering improvement."
  },
  {
    "id": 25,
    "category": "Software Quality",
    "question": "What is the Six Sigma defect benchmark and what does the DMAIC cycle stand for?",
    "hint": "3.4 DPMO and Define-Measure-Analyze-Improve-Control.",
    "answer": "Six Sigma defect target is 3.4 Defects Per Million Opportunities (DPMO), representing 99.99966% statistical defect-free accuracy.\nThe DMAIC improvement cycle stands for:\n- D: Define the problem and customer Critical-to-Quality (CTQ) requirements.\n- M: Measure current process performance and defect baseline.\n- A: Analyze data using statistical tools to find root causes of defects.\n- I: Improve the process by implementing and verifying solutions.\n- C: Control the process via standard operating procedures and control charts.",
    "formula": "\\text{Six Sigma Target} = \\mathbf{3.4 \\text{ DPMO}} \\quad (99.99966\\% \\text{ Accuracy})"
  }
]

header = """export interface Flashcard {
  id: number;
  question: string;
  category: string;
  hint: string;
  answer: string;
  formula?: string;
}

export const FLASHCARDS: Flashcard[] = """

content = header + json.dumps(flashcards, indent=2) + ";\n"

with open("src/data/flashcards.ts", "w", encoding="utf-8") as f:
  f.write(content)

print(f"Successfully generated {len(flashcards)} flashcards in src/data/flashcards.ts")
