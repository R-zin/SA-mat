export interface Flashcard {
  id: number;
  question: string;
  category: string;
  hint: string;
  answer: string;
  formula?: string;
}

export const FLASHCARDS: Flashcard[] = [
  {
    id: 1,
    category: "Software Testing",
    question: "What does McCabe's Cyclomatic Complexity M = E - N + 2P calculate, and what is the standard recommended ceiling?",
    hint: "Recall graph theory edges, nodes, and independent paths.",
    answer: "It computes the number of linearly independent paths through the program's Control Flow Graph (CFG), defining the minimum number of test cases required for 100% basis path branch coverage. The recommended upper bound is M <= 10; higher values indicate unmaintainable, error-prone modules.",
    formula: "M = E - N + 2P = \\text{Predicate Nodes} + 1"
  },
  {
    id: 2,
    category: "Modular Design",
    question: "List the 7 levels of Cohesion from WORST to BEST.",
    hint: "Think Coincidental to Functional.",
    answer: "1. Coincidental (worst - accidental grouping)\n2. Logical (flag switches between dissimilar tasks)\n3. Temporal (tasks grouped by execution time)\n4. Procedural (tasks follow an execution sequence)\n5. Communicational (tasks share input/output data)\n6. Sequential (output of task A feeds input of task B)\n7. Functional (best - single, focused, atomic purpose)."
  },
  {
    id: 3,
    category: "Modular Design",
    question: "List the 5 classes of Coupling from WORST (most coupled) to BEST (least coupled).",
    hint: "Think Content down to Data.",
    answer: "1. Content Coupling (worst - branching into or mutating another module's internal code/memory)\n2. Common Coupling (shared global variables)\n3. Control Coupling (passing flags that direct internal logic)\n4. Stamp Coupling (passing composite structures when only subset is used)\n5. Data Coupling (best - passing atomic primitive scalars)."
  },
  {
    id: 4,
    category: "Project Estimation",
    question: "According to Putnam's Software Equation, how does cost/effort scale when delivery schedule is compressed?",
    hint: "Look at the relationship between Effort and td.",
    answer: "Effort varies inversely with the FOURTH POWER of development time: Effort ∝ 1 / (td^4). A relatively small schedule compression of 20% approximately doubles the required human effort and cost!",
    formula: "\\text{Effort} \\propto \\frac{1}{t_d^4}"
  },
  {
    id: "5",
    idNum: 5,
    category: "Project Management",
    question: "What is Boehm's 75% limit and what does Brooks' Law state?",
    hint: "Recall limits of hiring engineers to meet late deadlines.",
    answer: "Boehm observed that no software project schedule can be compressed by more than 25% (i.e. below 75% of nominal time) regardless of budget or personnel hired. Brooks' Law states: 'Adding manpower to a late software project makes it later' due to exponential communication overhead (N(N-1)/2 channels) and senior engineer mentoring drag."
  } as any,
  {
    id: 6,
    category: "Testing Concepts",
    question: "What is the precise difference between an Error, a Fault (Bug), and a Failure?",
    hint: "Think human action vs static code vs dynamic execution.",
    answer: "1. Error: A human mistake or cognitive misunderstanding.\n2. Fault (Bug): A static flaw in code or design introduced by an error (a dormant defect).\n3. Failure: An observable incorrect runtime behavior during execution that deviates from the SRS specification."
  },
  {
    id: 7,
    category: "Software Quality",
    question: "What are the 5 maturity levels of the SEI Capability Maturity Model (CMM)?",
    hint: "Initial to Optimizing.",
    answer: "Level 1: Initial (ad-hoc, chaotic, hero-dependent)\nLevel 2: Repeatable (basic project management discipline, SQA, SCM)\nLevel 3: Defined (organization-wide standardized engineering process)\nLevel 4: Managed (quantitative measurement & statistical process control)\nLevel 5: Optimizing (continuous process improvement & defect prevention)."
  },
  {
    id: 8,
    category: "Architectural Design",
    question: "Name Kruchten's 4+1 Architectural Views and the primary audience for each.",
    hint: "Logical, Process, Development, Physical + Scenarios.",
    answer: "1. Logical View (End-users, analysts - domain abstractions & class models)\n2. Process View (Integrators - concurrency, threads, IPC, latency)\n3. Development View (Developers - package hierarchy, modules, builds)\n4. Physical View (DevOps, Network engineers - deployment nodes, servers)\n+1. Scenarios/Use Cases (All stakeholders - unifies and validates the 4 views)."
  },
  {
    id: 9,
    category: "Project Estimation",
    question: "In Basic COCOMO, what are the Effort and Development Time formulas for Organic Mode?",
    hint: "Parameters 2.4, 1.05, 2.5, 0.38.",
    answer: "Effort = 2.4 * (KLOC)^1.05 Person-Months\nNominal Development Time (Tdev) = 2.5 * (Effort)^0.38 Months\nAverage Staffing = Effort / Tdev persons.",
    formula: "\\text{Effort} = 2.4 \\times (\\text{KLOC})^{1.05}, \\quad T_{\\text{dev}} = 2.5 \\times (\\text{Effort})^{0.38}"
  },
  {
    id: 10,
    category: "CI/CD & Deployment",
    question: "What are the three essential Next.js configuration properties required for GitHub Pages static hosting?",
    hint: "Think export, base path, and images.",
    answer: "1. output: 'export' (generates static HTML/JS/CSS in out/ directory)\n2. basePath: '/<repo-name>' (ensures asset links resolve on GitHub Pages subpaths)\n3. images: { unoptimized: true } (disables server-side image optimizer since GitHub Pages is purely static)\n4. trailingSlash: true (prevents 404s on direct URL refreshes).",
    formula: "\\mathtt{output: \\text{'export'}}, \\quad \\mathtt{basePath: \\text{'/<repo>'}}, \\quad \\mathtt{images.unoptimized: true}"
  }
];
