# Module 8: Software Quality Assurance, ISO 9000 & Capability Maturity Models

def get_mod8():
    return {
        "id": "quality-assurance",
        "number": 8,
        "title": "Software Quality Assurance, ISO 9001, SEI CMM, PSP & Six Sigma",
        "shortTitle": "SQA & ISO/CMM",
        "ects": "4.0 ECTS",
        "readTime": "28 min read",
        "updated": "Course Slides: quality_system.pdf",
        "sourceSlide": "quality_system.pdf",
        "slideUrl": "slides/quality_system.pdf",
        "summary": "Exhaustive treatment of Software Quality Systems: McCall's 11 quality factors, QC vs QA vs TQM evolution, ISO 9001 clauses translated to software terms, SEI CMM 5 levels and KPAs, ISO 9001 vs SEI CMM comparison, Watts Humphrey's PSP, and Six Sigma DMAIC methodology.",
        "tags": ["#ISO9001", "#SEICMM", "#QualityAssurance", "#PSP", "#SixSigma", "#KPAs", "#McCallFactors"],
        "subsections": [
            {
                "id": "quality-evolution",
                "title": "8.1 Software Quality Concepts: From Inspection to Total Quality Management",
                "content": r"""### 🎯 Core Intuition ("Checking Broken Eggs vs. Building a Sturdy Henhouse")
Imagine running an egg farm:
- **Quality Control (QC - Product Inspection):** You sit at the end of the conveyor belt with a magnifying glass. When an egg comes out cracked, you throw it in the trash. You inspect products after the damage is done (**post-facto**).
- **Quality Assurance (QA - Process Prevention):** You inspect the conveyor belts, pad the nesting boxes with soft hay, and upgrade the temperature controls so eggs don't crack in the first place (**defect prevention**).
- **Total Quality Management (TQM - Cultural Excellence):** Every single person on the farm—from the chicken feed supplier to the delivery truck driver—is trained, empowered, and continuously improving processes so zero defective eggs are ever produced (**continuous organizational excellence**).

---

### 📚 What is Software Quality? Traditional vs. Modern View
- **Traditional View (Joseph Juran):** *"Quality is fitness of purpose."* If the software compiles and runs what the user asked for, it has quality.
- **Modern View (Multi-Attribute Vector):** Fitness of purpose is a necessary but completely insufficient condition. A software product can compute correct numbers but be completely unmaintainable, insecure, or impossible to port to new hardware. Quality is a multi-dimensional vector comprising functional and non-functional attributes.

---

### 🏛️ Jim McCall's 11 Software Quality Factors (1977)
McCall organized software quality into three operational perspectives:

1. **Product Operation Factors (How well does it run today?):**
   - *Correctness:* Does the software satisfy its functional specifications?
   - *Reliability:* Does it execute without failure over time (MTTF)?
   - *Efficiency:* How efficiently does it consume CPU, memory, disk, and network bandwidth?
   - *Integrity (Security):* Can it protect data against unauthorized malicious intrusion?
   - *Usability:* How easily can human operators learn and navigate the interface?
2. **Product Revision Factors (How easily can it be changed tomorrow?):**
   - *Maintainability:* How easily can bugs be diagnosed and repaired?
   - *Flexibility:* How easily can new business features be added?
   - *Testability:* How easily can automated test harnesses verify its internal state?
3. **Product Transition Factors (How easily can it move to new environments?):**
   - *Portability:* Can it run on different hardware platforms and operating systems?
   - *Reusability:* Can its modules be extracted and reused in other commercial systems?
   - *Interoperability:* How easily does it exchange data with external third-party systems?

---

### ⚖️ The Evolution of Quality Paradigms: QC vs. QA vs. TQM
The course slides provide a definitive comparison across the three epochs of quality systems:""",
                "table": {
                    "headers": ["Aspect", "Quality Control (QC)", "Quality Assurance (QA)", "Total Quality Management (TQM)"],
                    "rows": [
                        ["Primary Focus", "Product-oriented inspection", "Process-oriented prevention", "Total organizational culture & continuous improvement"],
                        ["Execution Mechanism", "Test and inspect completed software to reject defective builds", "Establish and audit engineering processes throughout lifecycle", "Empower every employee; statistical process control and customer delight"],
                        ["Timing", "Post-facto (After code is written and integrated)", "Continuous (During requirements, design, coding, testing)", "Continuous lifelong philosophy across all company departments"],
                        ["Responsibility", "Dedicated Testing / Inspection team", "SQA audit team + Software Engineers", "Everyone in the organization (from CEO to junior intern)"],
                        ["Economic Cost", "High scrap and rework cost (finding bugs late)", "Lower rework cost (phase containment of errors)", "Lowest lifecycle cost; maximum customer retention and defect elimination"]
                    ]
                },
                "callout": {
                    "type": "pine",
                    "title": "Exam Mantra: QA vs. QC",
                    "text": "Every university exam asks: 'What is the difference between QA and QC?' Answer: 'Quality Control (QC) is product-focused and detects defects post-facto via testing. Quality Assurance (QA) is process-focused and prevents defects from being introduced by auditing and improving the development lifecycle.'"
                }
            },
            {
                "id": "iso-9000-software",
                "title": "8.2 ISO 9000 & ISO 9001 Quality System Requirements for Software",
                "content": r"""### 🎯 Core Intuition ("Say What You Do, Do What You Say, Prove It")
Imagine a world-class restaurant chain with 500 locations. How does head office ensure that a burger prepared in Paris tastes identical to a burger prepared in Tokyo? 
1. They write down the exact recipe and cooking temperature (**Document the Process**).
2. The chefs follow the recipe strictly (**Execute the Process**).
3. Quality inspectors review cooking logs and kitchen thermometers (**Audit the Process**).

That is the essence of **ISO 9000 certification**: *"Say what you do, do what you say, and record evidence to prove you did it!"*

---

### 📚 The ISO 9000 Series Overview
Published by the International Organization for Standardization (ISO), ISO 9000 is an international consortium standard that specifies the requirements for an organization's Quality Management System (QMS).

#### The Three Standards in the ISO 9000 Family:
1. **ISO 9001 (The Full Engineering Lifecycle):** Applies to organizations engaged in the **Design, Development, Production, Installation, and Servicing** of products. (Software development organizations MUST be certified under ISO 9001!).
2. **ISO 9002 (Production & Installation):** Applies to manufacturing plants that produce goods according to existing third-party designs (does not include software design).
3. **ISO 9003 (Final Inspection & Testing):** Applies to testing laboratories and warehouses that only inspect finished goods.
- **ISO 9000-3 Guidelines:** A specialized guidance document published specifically to interpret and translate the generic manufacturing clauses of ISO 9001 into software engineering terminology!

---

### 📋 Summary of ISO 9001 Requirements in Software Terms (Slide 15)
In university exams, professors ask: *"How do generic ISO 9001 requirements translate into software engineering terms?"*""",
                "table": {
                    "headers": ["ISO 9001 Clause", "Generic Manufacturing Requirement", "Software Engineering Translation (Course Slides)"],
                    "rows": [
                        ["Management Responsibility", "Define quality policy and appoint a quality executive", "Senior executive must sponsor SQA team with authority to halt shipment of buggy software"],
                        ["Quality System", "Documented quality manual and procedures", "Documented software development lifecycle (SDLC) methodology and coding standards"],
                        ["Contract Review", "Verify customer requirements before accepting orders", "Formal review and sign-off of the Software Requirements Specification (SRS) with customer"],
                        ["Design Control", "Plan and verify product designs through design reviews", "Formal architectural design reviews, detailed design inspections, and traceability matrices"],
                        ["Document Control", "Approve, distribute, and track changes to documents", "Formal Software Configuration Management (SCM) using Git version control and change boards"],
                        ["Purchasing", "Verify quality of purchased materials and parts", "Evaluating and testing third-party COTS libraries, open-source packages, and cloud APIs"],
                        ["Process Control", "Controlled production conditions and documented work instructions", "Enforcing standard coding conventions, peer code reviews, and automated CI/CD pipelines"],
                        ["Inspection and Testing", "Inspect goods at receiving, in-process, and final", "Executing Unit Testing, Integration Testing, System Testing, and Acceptance Testing"],
                        ["Corrective and Preventive Action", "Investigate root cause of non-conformities", "Root cause defect analysis (RCA) and post-mortem retrospectives to prevent recurring bugs"],
                        ["Internal Quality Audits", "Regular internal audits of quality system execution", "Independent SQA team audits software projects to ensure teams follow documented plans"]
                    ]
                },
                "callout": {
                    "type": "amber",
                    "title": "Exam Trap: Critical Shortcomings of ISO 9001 Certification",
                    "text": "What are the limitations of ISO 9001? (Slide 16): 1) ISO 9001 certifies process consistency, NOT product excellence. (An organization that writes down a terrible process and follows it religiously can still receive ISO 9001 certification!). 2) It does not provide a graduated scale of process maturity (it is binary: Certified or Not Certified). 3) It imposes significant paperwork and administrative overhead."
                }
            },
            {
                "id": "sei-cmm-levels",
                "title": "8.3 The SEI Capability Maturity Model (CMM) & Key Process Areas (KPAs)",
                "content": r"""### 🎯 Core Intuition ("From White-Belt to Grandmaster")
In martial arts, you don't just ask: *"Are you certified in karate?"* (Binary). 
You look at the belt system:
- **White Belt (Level 1):** You flail your arms wildly. You might win a fight by sheer luck or personal heroism, but you have zero discipline.
- **Black Belt (Level 4):** You measure your heart rate, calculate reaction times in milliseconds, and strike with statistical precision.
- **Grandmaster (Level 5):** You continuously refine your art, teaching new katas to eliminate flaws before they happen.

The **SEI Capability Maturity Model (CMM)** is the martial arts belt system of software organizations!

---

### 📚 Genesis: The Software Engineering Institute (SEI)
Developed in the late 1980s by Watts Humphrey at Carnegie Mellon University's Software Engineering Institute (SEI), funded by the US Department of Defense (DoD). The US military was fed up with software defense contractors delivering software years late and millions over budget. The DoD required a quantitative tool to assess contractor **process capability** before awarding billion-dollar contracts.

---

### 🥋 The Five Levels of Software Process Maturity (Strict Order)
The CMM establishes a strict five-level hierarchy:

```
[Level 5: OPTIMIZING] ─── Continuous process improvement & defect prevention
         ▲
[Level 4: MANAGED]   ─── Quantitative metrics & statistical process control
         ▲
[Level 3: DEFINED]   ─── Organization-wide standard engineering process
         ▲
[Level 2: REPEATABLE]─── Basic project management discipline & tracking
         ▲
[Level 1: INITIAL]   ─── Ad-hoc, chaotic, heroic efforts, unpredictable
```

#### Detailed Breakdown of the 5 Levels & Key Process Areas (KPAs):

#### Level 1: Initial (The Ad-Hoc / Heroic Level)
- **Characteristics:** The software process is ad-hoc, chaotic, and occasionally turbulent.
- **Hero-Dependent:** Success depends entirely on the exceptional heroic efforts of individual star programmers who work 80-hour weeks. If the star developer quits, the project collapses.
- **Cost & Schedule:** Completely unpredictable. When deadlines loom, testing is abandoned.
- **KPAs:** Zero KPAs (Entry baseline).

#### Level 2: Repeatable (The Project Management Discipline Level)
- **Characteristics:** Basic project management disciplines are established. Planning, cost estimation, tracking, and requirements baselines are maintained on individual projects.
- **Repeatable:** Past successes can be repeated on *similar* projects with similar team members.
- **Key Process Areas (KPAs) for Level 2 (Exam Must-Know!):**
  1. *Requirements Management (RM):* Baselines requirements and manages changes.
  2. *Software Project Planning (SPP):* Establishes realistic estimates for resources and schedules.
  3. *Software Project Tracking & Oversight (SPTO):* Monitors actual progress against the SPMP.
  4. *Software Subcontract Management (SSM):* Manages third-party vendors.
  5. *Software Quality Assurance (SQA):* Audits processes and deliverables.
  6. *Software Configuration Management (SCM):* Controls baselines and code versions.

#### Level 3: Defined (The Institutionalized Process Level)
- **Characteristics:** The management and engineering processes are documented, standardized, and integrated into an **organization-wide standard software process** (the organization's core DNA).
- Projects tailor the organization's standard process to their specific needs.
- **Key Process Areas (KPAs) for Level 3:**
  1. *Organization Process Focus (OPF):* Coordinates process improvement activities.
  2. *Organization Process Definition (OPD):* Maintains standard lifecycle models and guidelines.
  3. *Training Program (TP):* Trains all engineers and managers in standard methodologies.
  4. *Integrated Software Management (ISM):* Tailors standard processes into project plans.
  5. *Software Product Engineering (SPE):* Executes disciplined design, coding, and testing.
  6. *Intergroup Coordination (IC):* Facilitates collaboration between software and hardware teams.
  7. *Peer Reviews (PR):* Conducts formal inspections to eliminate defects early.

#### Level 4: Managed (The Quantitative & Statistical Level)
- **Characteristics:** The software process and product quality are **quantitatively measured, tracked, and controlled**.
- Detailed software metrics (defect density, code productivity, test coverage) are collected into an organization-wide database.
- **Key Process Areas (KPAs) for Level 4:**
  1. *Quantitative Process Management (QPM):* Controls process performance statistically.
  2. *Software Quality Management (SQM):* Sets quantitative quality goals and monitors metrics.

#### Level 5: Optimizing (The Continuous Improvement Level)
- **Characteristics:** The entire organization focuses on continuous, incremental, and innovative process improvement.
- **Defect Prevention:** Rather than just fixing bugs, the organization analyzes root causes to alter processes so that class of defect can *never occur again*.
- **Key Process Areas (KPAs) for Level 5:**
  1. *Defect Prevention (DP):* Systematic root-cause defect analysis and elimination.
  2. *Technology Change Management (TCM):* Evaluates and adopts innovative new SE tools and tech.
  3. *Process Change Management (PCM):* Continuously improves standard engineering processes.

---

### ⚖️ Master Comparison: ISO 9001 vs. SEI CMM (Slide 22)""",
                "table": {
                    "headers": ["Aspect", "ISO 9001", "SEI Capability Maturity Model (CMM)"],
                    "rows": [
                        ["Origin & Scope", "International standards consortium (ISO); applies to all manufacturing/services", "Software Engineering Institute (SEI / US DoD); designed exclusively for software"],
                        ["Evaluation Scale", "Binary pass/fail: Certified or Not Certified", "Graduated 5-level evolutionary maturity hierarchy (Level 1 to Level 5)"],
                        ["Quality Approach", "Ensures compliance with documented organizational procedures", "Prescribes industry best engineering practices and continuous process improvement"],
                        ["Equivalence Point", "Roughly corresponds to SEI CMM Level 2 / early Level 3", "Encompasses Level 3, Level 4 (Metrics), and Level 5 (Continuous optimization)"],
                        ["Focus on Process Improvement", "Minimal; focuses on process compliance and consistency", "Central core mission; each level provides KPAs to climb to the next level"]
                    ]
                },
                "callout": {
                    "type": "pine",
                    "title": "Exam Mnemonic: The 5 CMM Levels",
                    "text": "Remember: 'I-R-D-M-O' -> Initial (1) -> Repeatable (2) -> Defined (3) -> Managed (4) -> Optimizing (5). If asked: 'At which level are peer reviews introduced?' -> LEVEL 3 (DEFINED)! 'At which level is statistical process control introduced?' -> LEVEL 4 (MANAGED)!"
                }
            },
            {
                "id": "psp-six-sigma",
                "title": "8.4 Personal Software Process (PSP) & Six Sigma DMAIC Methodology",
                "content": r"""### 🎯 Core Intuition ("The Olympic Athlete's Training Journal")
How does an Olympic runner win the gold medal? They don't just run around a track and guess their speed. They log every workout in a journal: *Time slept: 8 hrs. Heart rate: 52 bpm. 100m split: 10.2s. Stride angle: 42 degrees.* They track their personal data to systematically eliminate microseconds of waste.

**Watts Humphrey's Personal Software Process (PSP)** is that exact scientific training journal for an individual software engineer!

---

### 🧑‍💻 Watts Humphrey's Personal Software Process (PSP)
While CMM addresses organization-wide maturity, Watts Humphrey recognized that organizational process is meaningless if individual programmers write sloppy code. PSP is a scaled-down industrial engineering discipline designed for individual developers:
- **Core Principle:** Engineers measure their own work, analyze their own defects, and use personal historical metrics to plan future commitments accurately.
- **Key Tracking Metrics:**
  - *Time Spent:* Logged by phase (Planning, Design, Coding, Code Review, Compiling, Testing, Post-mortem).
  - *Defects Injected:* In which phase was the bug introduced?
  - *Defects Removed:* In which phase was the bug detected? (Enables engineers to compute their personal phase containment effectiveness!).

#### The PSP Evolution Hierarchy:
1. **PSP0 (Baseline Process):** Simple time logging and defect recording.
2. **PSP1 (Personal Planning):** Size estimation (PROBE method) and schedule forecasting.
3. **PSP2 (Personal Quality):** Introduction of personal design reviews and personal code review checklists before compiling.
4. **PSP3 (Cyclic Development):** Scaling PSP techniques to larger module development.

---

### 📊 Six Sigma Quality & The DMAIC Methodology
Pioneered by Motorola and popularized by General Electric, Six Sigma is a disciplined, data-driven approach for eliminating defects in any process.

#### The Mathematical Six Sigma Benchmark:
$$\mathbf{3.4 \text{ Defects Per Million Opportunities (DPMO)}} \quad (99.99966\% \text{ Accuracy})$$
- Six Sigma treats a defect as anything that results in customer dissatisfaction.

#### The Five DMAIC Phases (Exam Core):
1. **Define (D):** Define the problem, customer quality requirements (Critical-to-Quality - CTQ parameters), and project goals.
2. **Measure (M):** Measure the current process performance and collect baseline defect data.
3. **Analyze (A):** Analyze the data using statistical tools (Pareto charts, Ishikawa fishbone diagrams) to identify the root causes of defects.
4. **Improve (I):** Formulate, implement, and verify solutions that eliminate the root causes.
5. **Control (C):** Institute statistical process control charts, standard operating procedures, and automated monitors to ensure improvements persist over time.""",
                "table": {
                    "headers": ["DMAIC Phase", "Primary Goal", "Key Analytical Tools", "Deliverable Output"],
                    "rows": [
                        ["Define (D)", "Identify customer CTQ requirements and defect problem", "Project Charter, Process Flowcharts", "Problem Statement & Project Charter"],
                        ["Measure (M)", "Establish baseline defect and performance data", "Data Collection Plan, Pareto Charts", "Current Defect Rate / Baseline Process Sigma"],
                        ["Analyze (A)", "Identify root causes of variation and failure", "Ishikawa Fishbone Diagram, 5-Whys, ANOVA", "Verified Root Causes of Defects"],
                        ["Improve (I)", "Implement solutions to eliminate root causes", "Design of Experiments, Pilot Testing", "Validated Improved Process Solution"],
                        ["Control (C)", "Standardize and sustain improvements permanently", "Statistical Process Control (SPC) Charts", "Control Plan & Standard Operating Procedures"]
                    ]
                },
                "callout": {
                    "type": "pine",
                    "title": "Exam Mnemonic: Six Sigma DMAIC",
                    "text": "Remember: 'D-M-A-I-C' -> Define -> Measure -> Analyze -> Improve -> Control. And remember the golden Six Sigma number: 3.4 DPMO (Defects Per Million Opportunities)!"
                }
            }
        ]
    }
