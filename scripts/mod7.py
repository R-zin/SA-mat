# Module 7: Software Project Management & Metrics

def get_mod7():
    return {
        "id": "project-management",
        "number": 7,
        "title": "Software Project Management: Estimation, COCOMO & Putnam's Model",
        "shortTitle": "Project Management",
        "ects": "4.0 ECTS",
        "readTime": "32 min read",
        "updated": "Course Slides: Project Management.pdf",
        "sourceSlide": "Project Management.pdf",
        "slideUrl": "slides/Project Management.pdf",
        "summary": "Mastery of software project management: SPMP document, LOC vs Albrecht Function Points (UFP, 14 GSCs, VAF), Boehm's Basic & Intermediate COCOMO with 400 KLOC solved across all 3 modes, Putnam software equation, the Quartic Penalty mathematical proof, and team structures.",
        "tags": ["#COCOMO", "#FunctionPoints", "#PutnamModel", "#RayleighCurve", "#BrooksLaw", "#QuarticPenalty", "#TeamStructures"],
        "subsections": [
            {
                "id": "spmp-metrics",
                "title": "7.1 Software Project Management, SPMP & Size Metrics: LOC vs. Function Points",
                "content": r"""### 🎯 Core Intuition ("Measuring a Novel by Word Count vs. Plot Complexity")
Imagine an author hired to write a mystery thriller. The publisher says: *"We will pay you $10 for every page you write."* 
What does the author do? They write long, rambling, repetitive paragraphs full of filler words to inflate the page count! That is what happens when you measure software size by **Lines of Code (LOC)**: it penalizes concise, elegant programmers and rewards verbose, copy-pasting coders.

Instead, what if the publisher pays based on the number of complex plot twists, character arcs, and mystery clues? That is **Albrecht's Function Point (FP) Metric**. It measures what the software actually *does for the user*, completely independent of whether it was written in Python, C++, or Java!

---

### 📚 Why Software Projects Fail & The SPMP Document
The course slides enumerate why project management in software is dramatically more challenging than in civil or mechanical engineering:
1. **Intangibility:** Software progress is invisible; you cannot watch a physical structure rise from the ground.
2. **Volatile Requirements:** Customer requirements change continuously during development (The Moving Target Problem).
3. **Rapid Technological Obsolescence:** Software tools, frameworks, and hardware change every 18 months.

#### The Software Project Management Plan (SPMP Document — IEEE 1058):
The SPMP is the master blueprint governing project execution. Its standardized sections include:
1. *Introduction:* Project overview, deliverables, evolution plan.
2. *Project Organization:* Process model, organizational chart, internal/external interfaces, team responsibilities.
3. *Managerial Process Plans:* Management objectives, monitoring and control mechanisms, risk management plan.
4. *Technical Process Plans:* Development methodologies, tools, programming languages, quality assurance plan.
5. *Work Packages, Schedule, and Budget:* Work Breakdown Structure (WBS), Gantt charts, PERT/CPM critical paths, resource allocation.

---

### 📏 Size Metric 1: Lines of Code (LOC / KLOC)
- **Definition:** KLOC is Kilo (1,000) Lines of Code.
- **Fatal Shortcomings of LOC (Exam Favorite):**
  1. *Programming Language Dependency:* A routine implemented in 50 lines of Python might require 300 lines of Java or 1,200 lines of Assembly. LOC rewards the least productive language!
  2. *Penalizes Clean Code:* A junior developer who copy-pastes 500 lines gets credit for 'more progress' than a senior architect who replaces that mess with a 20-line recursive function.
  3. *Unusable Early in the Project:* You cannot accurately count lines of code during the Requirements or Design phases—the exact time when cost estimates are needed to sign client contracts!

---

### 🧮 Size Metric 2: Allan Albrecht's Function Point (FP) Metric
Proposed by Allan Albrecht at IBM in 1979, Function Points measure the functional size of an application based exclusively on external capabilities visible to users.

#### The 5 Functional Component Types:
1. **Internal Logical Files (ILF):** User-identifiable groups of logically related data maintained entirely inside the application boundaries (e.g. database tables).
2. **External Interface Files (EIF):** Files or databases referenced and queried by the application, but maintained by an external system.
3. **External Inputs (EI):** Ingress transactions from users or external systems that update internal files (e.g. registration forms, data updates).
4. **External Outputs (EO):** Egress reports, derived calculations, or messages generated for users involving mathematical algorithms (e.g. monthly invoices, trend charts).
5. **External Inquiries (EQ):** Input-output combinations resulting in direct data retrieval without altering any internal database state (e.g. balance inquiry, search).

#### Complexity Weight Matrix:
Each component is classified as having **Low**, **Average**, or **High** complexity:""",
                "table": {
                    "headers": ["Functional Component", "Low Weight", "Average Weight", "High Weight"],
                    "rows": [
                        ["Internal Logical Files (ILF)", "7", "10", "15"],
                        ["External Interface Files (EIF)", "5", "7", "10"],
                        ["External Inputs (EI)", "3", "4", "6"],
                        ["External Outputs (EO)", "4", "5", "7"],
                        ["External Inquiries (EQ)", "3", "4", "6"]
                    ]
                },
                "formula": {
                    "latex": "UFP = \\sum_{i=1}^{5} \\sum_{j=1}^{3} (\\text{Count}_{ij} \\times \\text{Weight}_{ij}), \\quad VAF = 0.65 + 0.01 \\times \\sum_{k=1}^{14} F_k, \\quad FP = UFP \\times VAF",
                    "explanation": "UFP is Unadjusted Function Points. VAF is the Value Adjustment Factor derived from the 14 General System Characteristics (F_k), each rated from 0 (no influence) to 5 (strong influence). The sum of F_k ranges from 0 to 70, causing VAF to vary between 0.65 (-35%) and 1.35 (+35%)."
                },
                "callout": {
                    "type": "pine",
                    "title": "Exam Solved Numerical: Albrecht Function Points",
                    "text": "Exam Problem: A project has 4 ILFs (Average: 10), 2 EIFs (Average: 7), 12 EIs (Average: 4), 8 EOs (Average: 5), and 6 EQs (Average: 4). The sum of 14 GSC ratings is 35. Find FP.\nStep 1 (UFP): UFP = (4×10) + (2×7) + (12×4) + (8×5) + (6×4) = 40 + 14 + 48 + 40 + 24 = 166 UFP.\nStep 2 (VAF): VAF = 0.65 + 0.01(35) = 0.65 + 0.35 = 1.00.\nStep 3 (Final FP): FP = 166 × 1.00 = 166 Function Points!"
                }
            },
            {
                "id": "cocomo-models",
                "title": "7.2 Barry Boehm's COCOMO Suite: Basic, Intermediate & Detailed",
                "content": r"""### 🎯 Core Intuition ("Predicting the Building Bill Before Laying Bricks")
If you ask three general contractors how much a house will cost:
- Contractor A guesses based on gut feeling (**Expert Judgment**).
- Contractor B assembles a secret council of 5 builders who vote anonymously until they agree (**Delphi Cost Estimation**).
- Contractor C takes the exact square footage ($KLOC$), looks up historical data tables for your neighborhood soil, and computes the cost using mathematical formulas (**Barry Boehm's COCOMO**).

---

### 📚 The Constructive Cost Model (COCOMO)
Formulated by Dr. Barry W. Boehm in 1981 based on empirical analysis of 63 software projects at TRW, COCOMO predicts human effort (Person-Months) and calendar duration (Months) as a function of system size in KLOC.

#### The Three Project Development Modes (Exam Standard):
1. **Organic Mode:** Small development teams working in familiar, in-house environments with relaxed, well-understood requirements (e.g. simple accounting system).
2. **Semi-Detached Mode:** Medium-sized teams with mixed experience levels working under moderate system constraints and deadlines (e.g. database compiler, ERP module).
3. **Embedded Mode:** Software must operate under severe hardware, software, regulatory, and operational constraints; changing code or interfaces is extraordinarily difficult (e.g. flight control, nuclear power grid, real-time medical firmware).

---

### 🔢 Basic COCOMO Mathematical Equations
The mathematical equations governing Basic COCOMO:

$$\begin{aligned}
\text{Effort} &= a \times (\text{KLOC})^b \quad [\text{Person-Months}] \\[4pt]
T_{\text{dev}} &= c \times (\text{Effort})^d \quad [\text{Calendar Months}] \\[4pt]
\text{Average Staffing} &= \frac{\text{Effort}}{T_{\text{dev}}} \quad [\text{Engineers}]
\end{aligned}$$

#### The Constants Table for Basic COCOMO:""",
                "table": {
                    "headers": ["Project Development Mode", "a (Effort Multiplier)", "b (Effort Exponent)", "c (Schedule Multiplier)", "d (Schedule Exponent)"],
                    "rows": [
                        ["Organic Mode", "2.4", "1.05", "2.5", "0.38"],
                        ["Semi-Detached Mode", "3.0", "1.12", "2.5", "0.35"],
                        ["Embedded Mode", "3.6", "1.20", "2.5", "0.32"]
                    ]
                },
                "formula": {
                    "latex": "\\text{Why } b > 1: \\quad \\text{Effort} \\propto (\\text{KLOC})^b \\implies \\text{Diseconomy of Scale!}",
                    "explanation": "Because exponent b > 1 in all modes (1.05, 1.12, 1.20), human effort grows super-linearly with size. Doubling system size MORE than doubles the person-months required due to exponential inter-module interface and human communication overhead: N(N-1)/2!"
                },
                "callout": {
                    "type": "pine",
                    "title": "Master Exam Numerical: 400 KLOC in All Three Modes (Slide 40)",
                    "text": "Exam Question: 'A 400 KLOC software system is to be developed. Estimate Effort, Development Time (Tdev), and Average Staffing across Organic, Semi-Detached, and Embedded modes.'\n\n1. Organic Mode (a=2.4, b=1.05, c=2.5, d=0.38):\n• Effort = 2.4 × (400)^1.05 = 2.4 × 542.45 = 1,301.9 Person-Months (PM)\n• Tdev = 2.5 × (1301.9)^0.38 = 2.5 × 15.22 = 38.05 Months\n• Average Staffing = 1301.9 / 38.05 = 34.2 Engineers\n\n2. Semi-Detached Mode (a=3.0, b=1.12, c=2.5, d=0.35):\n• Effort = 3.0 × (400)^1.12 = 3.0 × 815.1 = 2,445.3 Person-Months (PM)\n• Tdev = 2.5 × (2445.3)^0.35 = 2.5 × 15.39 = 38.48 Months\n• Average Staffing = 2445.3 / 38.48 = 63.5 Engineers\n\n3. Embedded Mode (a=3.6, b=1.20, c=2.5, d=0.32):\n• Effort = 3.6 × (400)^1.20 = 3.6 × 1319.5 = 4,750.2 Person-Months (PM)\n• Tdev = 2.5 × (4750.2)^0.32 = 2.5 × 15.01 = 37.53 Months\n• Average Staffing = 4750.2 / 37.53 = 126.6 Engineers\n\nCritical Insight: In Embedded mode, the same 400 KLOC requires nearly 4× the human effort (4,750 PM vs 1,301 PM) due to extreme regulatory and hardware coupling!"
                }
            },
            {
                "id": "staffing-putnam",
                "title": "7.3 Staffing Models, Putnam's Equation & The Quartic Penalty of Schedule Compression",
                "content": r"""### 🎯 Core Intuition ("Nine Women Cannot Make a Baby in One Month")
Fred Brooks famously codified the ultimate law of software engineering in his 1975 book *The Mythical Man-Month*:
> **Brooks' Law:** *"Adding manpower to a late software project makes it later!"*

Why? Because if a project has 5 engineers, there are 10 communication channels between them. If you panic and add 5 more engineers, you now have 45 communication channels! The new engineers know nothing, and the senior engineers have to stop coding completely to mentor them.

Worse, **Peter Putnam proved mathematically** that if your boss demands you compress the schedule by just 20%, you don't just work 20% harder; the required human effort explodes by **244%**!

---

### 📈 The Norden-Rayleigh Staffing Curve
Peter Norden and Lawrence Putnam observed that software project staffing does not look like a flat box. It follows a **Rayleigh Curve**:

```
Staffing Level E(t)
     ▲
     │              Peak Staffing (At Delivery td)
     │                     ▲
     │                    / \\
     │                   /   \\
     │                  /     \\
     │                 /       \\
     │                /         \\
     │               /           \\
     │              /             \\
     │  40% of Total Effort       60% of Total Effort
     │  Occurs Before td          Occurs After td (Maintenance)
     │             /               \\
     └────────────┴─────────────────┴──────────────────► Time t
                 0                 td
```

#### Mathematical Formulation of Rayleigh Curve:
$$E(t) = \frac{K}{t_d^2} t e^{-t^2 / (2 t_d^2)}$$
- Where $E(t)$ is manpower at time $t$, $K$ is total lifecycle effort, and $t_d$ is the delivery date.
- **Key Empirical Fact (Exam Favorite):** Exactly **40%** of total project effort occurs *before* delivery $t_d$; **60%** of total lifecycle effort occurs *after* delivery $t_d$ during ongoing maintenance and evolution!

---

### ⚡ Putnam's Software Equation & The Quartic Penalty
Lawrence Putnam formulated the fundamental equation relating software size, lifecycle effort, and development time:

$$S = C_k \times K^{1/3} \times t_d^{4/3}$$
- Where $S$ is source lines of code (LOC).
- $K$ is total lifecycle effort (Person-Years).
- $t_d$ is development time (Years).
- $C_k$ is the state-of-technology constant:
  - $C_k = 2$ (Poor software environment; no modern tools)
  - $C_k = 8$ (Good software engineering environment; automated testing, CASE tools)
  - $C_k = 11$ (Elite software engineering environment; highly mature team)

---

### 🔢 Mathematical Proof: The Quartic Penalty of Schedule Compression
A standard 10-mark university exam question asks: *"Derive the relationship between development effort and delivery time from Putnam's equation, and explain the economic consequence of compressing a project schedule."*

#### Step-by-Step Mathematical Derivation:
1. Start with Putnam's Software Equation:
   $$S = C_k K^{1/3} t_d^{4/3}$$
2. Divide both sides by $C_k t_d^{4/3}$:
   $$K^{1/3} = \frac{S}{C_k t_d^{4/3}}$$
3. Cube both sides of the equation:
   $$K = \frac{S^3}{C_k^3 \times (t_d^{4/3})^3} = \frac{S^3}{C_k^3 \times t_d^4}$$
4. For a fixed software size $S$ and technology constant $C_k$, group constants into a proportionality constant $C$:
   $$\mathbf{K \propto \frac{1}{t_d^4}} \quad \implies \quad \mathbf{\text{Effort} \propto \frac{1}{t_d^4}!}$$

#### The Brutal Economic Consequence:
Human effort varies **inversely with the FOURTH POWER of development time**!
Suppose management demands a **20% compression** in schedule ($t_d' = 0.8 t_d$):
$$\text{New Effort } K' = \frac{K}{(0.8)^4} = \frac{K}{0.4096} \approx \mathbf{2.441 \times K}$$
Attempting to deliver the project just 20% earlier more than **doubles (244%) the required budget and manpower**!

---

### 🛑 Barry Boehm's Inviolable 75% Compression Limit
Boehm analyzed hundreds of software projects to test the limits of schedule compression:
> **The 75% Law:** *"No software project schedule can be compressed by more than 25% (i.e. below 75% of its nominal development time $T_{\text{dev}}$), regardless of how many millions of dollars are spent or how many hundreds of engineers are hired!"*
Any attempt to compress schedule below $0.75 T_{\text{dev}}$ results in total project cancellation.""",
                "table": {
                    "headers": ["Schedule Compression Attempted", "Multiplier on Development Effort (1 / td^4)", "Feasibility Status"],
                    "rows": [
                        ["0% Compression (Nominal Schedule: td = 1.0)", "1.00x Effort (Base Budget)", "Nominal Planned Schedule"],
                        ["10% Schedule Compression (td = 0.90)", "1 / (0.9)^4 = 1.52x (+52% Effort)", "Feasible with targeted overtime"],
                        ["20% Schedule Compression (td = 0.80)", "1 / (0.8)^4 = 2.44x (+144% Effort)", "Severe financial penalty; high defect risk"],
                        ["25% Schedule Compression (td = 0.75)", "1 / (0.75)^4 = 3.16x (+216% Effort)", "Boehm's Maximum Inviolable Theoretical Limit!"],
                        ["> 25% Compression (e.g. td = 0.50)", "1 / (0.5)^4 = 16.00x (+1,500% Effort)", "IMPOSSIBLE (The Impossible Zone: 100% Cancellation)"]
                    ]
                },
                "callout": {
                    "type": "amber",
                    "title": "Exam Trap: Brooks' Law Communication Formula",
                    "text": "Why does adding manpower make late projects later? Formula: N(N-1)/2 channels. If N=10, channels = 45. If N=20, channels = 190 (a 422% explosion in communication overhead). Engineers spend 100% of their workday in meetings explaining code to newcomers!"
                }
            },
            {
                "id": "team-structures",
                "title": "7.4 Software Team Structures: Democratic vs. Chief Programmer",
                "content": r"""### 🎯 Core Intuition ("The Communes vs. The Surgical Operating Theater")
- **Democratic Team (The Hippie Commune):** Everyone sits in a circle, all voices are equal, decisions are made by unanimous consensus, and everyone shares code without ego. Great for writing art or doing novel research; terrible if you have a hard deadline next Friday.
- **Chief Programmer Team (The Surgical Theater):** In an operating room, the Chief Surgeon holds the scalpel and performs the critical heart bypass. The anesthesiologist, head nurse, and surgical tech assist silently. One master mind commands; communication channels are strictly minimized.

---

### 👥 1. Democratic Team Structure (Gerald Weinberg — 1971)
- **Concept:** Based on **Egoless Programming**. Software code is treated as a collective artifact belonging to the team, not private personal property.
- **Mechanism:** No formal hierarchy. Decisions are reached through open discussion and consensus. Leadership rotates dynamically depending on who has the best domain expertise for the current task.
- **Communication Channels:** Fully interconnected mesh network:
  $$\text{Channels} = \frac{N(N-1)}{2}$$
- **Advantages:** Exceptionally high job satisfaction; low turnover; excellent for novel research problems where no established engineering playbook exists.
- **Disadvantages:** High communication overhead for teams $> 6$ people. Debates drag on endlessly; decision paralysis when consensus cannot be reached under strict deadlines.

---

### 👨‍⚕️ 2. Chief Programmer Team (Terry Baker & Harlan Mills — IBM 1971)
- **Concept:** Modeled explicitly on a surgical operating team.
- **The Core Roles (Slide Highlights):**
  1. **Chief Programmer:** A world-class senior software architect who personally designs the entire system, writes all critical algorithms, and codes the core interfaces.
  2. **Backup Programmer:** Senior peer who shadows the Chief, understands the entire design, and is ready to step in immediately if the Chief gets sick. Develops test cases.
  3. **Program Clerk:** Administrative specialist who maintains all project documentation, archives test decks, logs defect reports, and coordinates build releases. (Relieves engineers of all paperwork!).
  4. **Toolsmith / Specialized Experts:** System programmers who maintain compilers, build scripts, performance profilers, and database adapters.
- **Communication Channels:** Centralized star topology ($N - 1$ channels).
- **Advantages:** Maximum engineering velocity; clean conceptual integrity (one single brain designed the whole architecture); low communication overhead.
- **Disadvantages:** Severe single point of failure (if the Chief Programmer burns out or quits, the project dies); low team morale for junior members who feel like mere code monkeys.

---

### ⚖️ Master Comparison: Democratic vs. Chief Programmer Team""",
                "table": {
                    "headers": ["Dimension", "Democratic Team Structure", "Chief Programmer Team Structure"],
                    "rows": [
                        ["Leadership Hierarchy", "Decentralized, egoless, rotating peer leadership", "Strict centralized command hierarchy under Chief Programmer"],
                        ["Communication Topology", "Complete mesh network: N(N-1)/2 channels", "Centralized star network: N - 1 channels"],
                        ["Decision-Making Speed", "Slow; requires consensus and collaborative debate", "Extremely fast; Chief Programmer makes executive decisions"],
                        ["Conceptual Integrity", "Moderate; compromise between diverse opinions", "High; unified vision of a single master architect"],
                        ["Single Point of Failure", "Low; team members cross-cover seamlessly", "High; total vulnerability to Chief Programmer departure"],
                        ["Best Suited For", "Novel R&D, research prototypes, exploratory designs", "Well-understood systems under urgent, rigid delivery deadlines"]
                    ]
                },
                "callout": {
                    "type": "pine",
                    "title": "Exam Summary: Controlled Decentralized Teams",
                    "text": "Modern software engineering (e.g. Spotify model, Scrum of Scrums) uses Controlled Decentralized Teams: A senior technical lead coordinates with autonomous agile sub-teams (5-8 members each), combining the conceptual integrity of Chief Programmer with the high morale of Democratic teams!"
                }
            }
        ]
    }
