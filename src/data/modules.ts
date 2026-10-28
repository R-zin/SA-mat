export interface SubSection {
  id: string;
  title: string;
  badge?: string;
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
    caption?: string;
  };
  formula?: {
    latex: string;
    explanation: string;
  };
  table?: {
    headers: string[];
    rows: (string | number)[][];
  };
  callout?: {
    type: "spruce" | "amber" | "pine" | "slate";
    title: string;
    text: string;
  };
}

export interface ModuleData {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  ects: string;
  readTime: string;
  updated: string;
  sourceSlide: string;
  slideUrl: string;
  summary: string;
  tags: string[];
  subsections: SubSection[];
}

export const MODULES: ModuleData[] = [
  {
    id: "sdlc-models",
    number: 1,
    title: "Software Engineering Foundations & Life Cycle Models",
    shortTitle: "SDLC Models",
    ects: "4.0 ECTS",
    readTime: "22 min read",
    updated: "Course Slides: Part 1 & CSE312 Part 2",
    sourceSlide: "Part 1.pdf & CSE312 Software_part2.pdf",
    slideUrl: "slides/CSE312 Software_part2.pdf",
    summary:
      "Historical genesis of Software Engineering, the 1968 NATO Software Crisis, Program vs Software Product dichotomy, and rigorous comparative analysis of Classical Waterfall, Iterative, Prototyping, Evolutionary, Spiral, RAD, and V-Models.",
    tags: ["#SoftwareCrisis", "#Waterfall", "#SpiralModel", "#VModel", "#RAD", "#PhaseContainment"],
    subsections: [
      {
        id: "se-foundations",
        title: "1.1 The Software Crisis & Emergence of Software Engineering",
        content: `Software engineering was formally christened at the landmark 1968 NATO Science Committee conference in Garmisch, Germany. The assembly addressed the profound "Software Crisis" that emerged when computers shifted from first/second generation vacuum tubes to powerful third-generation integrated circuits (IBM System/360).

Hardware processing capabilities had exploded by orders of magnitude while software development techniques remained crude, ad-hoc artisanal crafts. Software projects routinely suffered from catastrophic schedule slippages, astronomical cost overruns, intractable bugs, and frequent total abandonment.

Key drivers of the Software Crisis:
1. Economic Cost Inversion: In 1960, hardware accounted for ~80% of project costs while software was ~20%. By the 1980s and present day, this ratio inverted: software engineering and lifelong maintenance consume over 85%-90% of total lifetime IT expenditures.
2. Human Cognitive Ceiling: Individual human working memory cannot track non-linear codebases exceeding ~1,000 lines without systematic structural abstraction.
3. Intangibility of Software: Unlike civil bridges or mechanical turbines, software progress cannot be visually verified without rigorous specification and phase gates.`,
        callout: {
          type: "spruce",
          title: "Formal Definition (Fritz Bauer / IEEE Standard 610.12)",
          text: "Software Engineering is the systematic approach to the development, operation, maintenance, and retirement of software; that is, the application of engineering to software."
        },
        table: {
          headers: ["Attribute", "Simple Program", "Software Product"],
          rows: [
            ["Author & User", "Single developer is typically the sole user", "Developed by large multi-disciplinary teams for thousands/millions of users"],
            ["Documentation", "Sparse or non-existent comments", "Exhaustive SRS, Design Docs, API Specs, Test Plans, and User Manuals"],
            ["User Interface", "Basic CLI, minimal input validation", "Ergonomic, accessible, robust error handling & recovery"],
            ["Cost Distribution", "100% development, negligible maintenance", "20%-30% initial development; 70%-80% lifetime maintenance & evolution"],
            ["Test Harness", "Ad-hoc manual checking", "Automated Unit, Integration, System, and Continuous Regression suites"]
          ]
        }
      },
      {
        id: "classical-waterfall",
        title: "1.2 Classical Waterfall Model & Phase Effort Distribution",
        content: `The Classical Waterfall Model (originally introduced by Winston Royce in 1970 as a baseline critique) is an idealistic linear-sequential software development lifecycle. It mandates that each phase must complete 100% with verified entry and exit deliverables before the subsequent phase commences.

Sequential Phases:
1. Feasibility Study: Evaluates financial, technical, operational, and schedule feasibility. Produces the Feasibility Report.
2. Requirements Analysis & Specification: Elicitation and formalization of system behavior. Produces the Software Requirements Specification (SRS) document.
3. Design: Transforms the SRS into an architectural model (High-Level Design decomposing into modules) and Detailed Design (algorithms, data structures, interface signatures).
4. Coding & Unit Testing: Implementation in programming language; modules are tested in isolation using stubs and drivers.
5. Integration & System Testing: Modules are incrementally integrated; system is validated against SRS functional and non-functional requirements.
6. Maintenance: Operates over the remainder of the software lifecycle, encompassing Corrective (bug fixing), Adaptive (porting to new OS/hardware), and Perfective (adding new customer features) maintenance.`,
        formula: {
          latex: "\\text{Phase Effort: } \\text{Feasibility: } 10\\%, \\; \\text{Reqs: } 10\\%, \\; \\text{Design: } 20\\%, \\; \\text{Coding: } 20\\%, \\; \\text{Testing: } 40\\%",
          explanation: "During development, Testing dominates resource consumption (40%). Over the total 15-20 year system lifecycle, Maintenance consumes 60%–80% of total lifecycle budget."
        },
        callout: {
          type: "amber",
          title: "Fatal Inherent Flaw of Classical Waterfall",
          text: "Classical Waterfall prohibits feedback paths between phases. It assumes humans make zero errors in requirements and design. In practice, discovering a defect during system testing requires cascading rework through design and requirements—an impossibility in pure classical waterfall."
        }
      },
      {
        id: "iterative-waterfall",
        title: "1.3 Iterative Waterfall & Defect Amplification Economics",
        content: `The Iterative Waterfall Model introduces realistic feedback paths from each phase back to its immediate predecessor. When defects are discovered during coding or testing, the design or requirements are formally updated.

Phase Containment of Errors:
A central tenet of modern software engineering is that defects must be identified and eliminated in the same phase they are introduced. If an error in requirements escapes into design, it amplifies into multiple erroneous modules; if it escapes into coding, it manifests as hundreds of flawed lines.

Defect Repair Cost Escalation:
- Requirements Phase: $1x (e.g. $100 to fix SRS wording)
- Design Phase: $5x (update module interfaces & diagrams)
- Coding Phase: $10x (rewrite classes and unit tests)
- System Testing: $50x (re-execute regression suites, update integration harnesses)
- Post-Release Operations: $100x–$200x (field patches, downtime, liability, PR damage)`,
        codeSnippet: {
          language: "text",
          code: `[Requirements] <====== (Feedback on ambiguous reqs) =======\\
       |                                                     |
       v                                                     |
    [Design] <=========== (Feedback on unfeasible design) ==|
       |                                                     |
       v                                                     |
    [Coding] <=========== (Feedback on syntax/unit failure) |
       |                                                     |
       v                                                     |
   [Testing] <===============================================/`,
          caption: "Feedback loops in Iterative Waterfall Model"
        }
      },
      {
        id: "spiral-boehm",
        title: "1.4 Boehm's Risk-Driven Spiral Model",
        content: `Formulated by Barry Boehm in 1988, the Spiral Model is a meta-model that encapsulates other models (Waterfall, Prototyping) within a structured, risk-driven framework.

Each traversal (cycle) of the spiral represents one development phase. Each 360-degree cycle is partitioned into four quadrants:
1. Quadrant I (Determine Objectives, Alternatives, & Constraints): Define target functionalities, performance goals, design choices, and contractual boundaries.
2. Quadrant II (Evaluate Alternatives, Identify & Resolve Risks): The defining hallmark of the Spiral Model. Formally assesses technical and operational risks using rapid prototyping, algorithmic simulation, mathematical proofs, and benchmarking.
3. Quadrant III (Develop & Verify Next-Level Product): Implements the artifacts using waterfall, evolutionary, or RAD techniques based on the risk profile.
4. Quadrant IV (Plan Next Phase): Customer evaluates the deliverable; management assesses whether to commit budget to the next outer loop.

Dimensions of the Spiral:
- Radial distance ($r$): Represents the cumulative financial cost incurred to date.
- Angular dimension ($\\theta$): Represents the percentage progress made toward overall project completion.`,
        callout: {
          type: "pine",
          title: "When to select the Spiral Model?",
          text: "The Spiral model is ideally suited for massive, high-risk, mission-critical systems (aerospace, defense, medical automation) where financial commitment is multi-million dollar and unexpected failure is catastrophic. It is ill-suited for small, low-risk internal corporate software due to high risk-assessment overhead."
        }
      },
      {
        id: "v-model-rad",
        title: "1.5 V-Model, Prototyping & RAD Comparative Matrix",
        content: `The V-Model (Verification and Validation Model) explicitly couples every development milestone on the downward left branch of the 'V' with a corresponding testing level on the upward right branch.
- Business Requirements $\\longleftrightarrow$ User Acceptance Testing (UAT)
- System Specification $\\longleftrightarrow$ System Testing
- Architectural Design $\\longleftrightarrow$ Integration Testing
- Detailed Module Design $\\longleftrightarrow$ Unit Testing
- Coding (Vertex of the V)

The Prototyping Model builds an interactive mock-up (throwaway or evolutionary) when users cannot formulate exact requirements in advance.
The Rapid Application Development (RAD) model employs visual CASE tools, component reuse, and strict 60–90 day timeboxes for data-intensive information systems.`,
        table: {
          headers: ["Life Cycle Model", "Risk Management", "Reqs Flexibility", "Customer Involvement", "Best Application Domain"],
          rows: [
            ["Classical Waterfall", "Zero (Fatal)", "Extremely Rigid", "Only at start and delivery", "Educational theory only"],
            ["Iterative Waterfall", "Low", "Moderate", "Phase-end reviews", "Well-understood systems with stable tech"],
            ["Prototyping Model", "Moderate (UI risk)", "High", "Continuous during prototyping", "Novel interactive UI systems, uncertain requirements"],
            ["Evolutionary Model", "Moderate", "High", "Continuous every increment", "Large commercial software sold in releases"],
            ["Spiral Model", "Extremely High", "High (between loops)", "Formal gatekeeper at Quadrant IV", "Mission-critical, massive enterprise & defense"],
            ["RAD Model", "Low to Medium", "Moderate (Timebox fixed)", "Intensive in JAD workshops", "Enterprise database apps with reusable modules"],
            ["V-Model", "Moderate", "Low to Moderate", "Heavy in UAT validation", "Safety-critical systems needing traceability"]
          ]
        }
      }
    ]
  },
  {
    id: "requirements-engineering",
    number: 2,
    title: "Requirements Engineering & SRS Specifications",
    shortTitle: "Requirements Eng",
    ects: "4.0 ECTS",
    readTime: "24 min read",
    updated: "Course Slides: Chapter 4 Requirements Engineering",
    sourceSlide: "Lect4.Req Eng,.pdf",
    slideUrl: "slides/Lect4.Req Eng,.pdf",
    summary:
      "Comprehensive requirements engineering lifecycle: Functional vs Non-Functional requirements, FURPS+, quantitative metric formalization, elicitation methodologies (interviews, ethnography, use cases), and IEEE 830 SRS structure.",
    tags: ["#IEEE830", "#NFR", "#FunctionalRequirements", "#Mentcare", "#Ethnography", "#Traceability"],
    subsections: [
      {
        id: "req-definitions",
        title: "2.1 What is a Requirement? User vs System Requirements",
        content: `Requirements Engineering (RE) is the systematic process of discovering, analyzing, documenting, validating, and managing the services that customers require from a system, along with the operational and environmental constraints under which it operates.

Davis's Requirements Abstraction Spectrum:
Requirements range along a continuum from abstract high-level business goals down to microscopic, mathematically formal constraints.
1. User Requirements: High-level statements in natural language and intuitive diagrams outlining system services and operational constraints for clients, non-technical managers, and end-users.
2. System Requirements: Detailed, contractually binding technical descriptions of functions, services, and operational constraints. Forms the engineering foundation for software architects, systems designers, and test engineers.

System Stakeholders:
Any individual or organization affected by the system directly or indirectly. In the course case study (Mentcare Clinic Health System):
- Direct Users: Clinical psychologists, doctors, nurses, psychiatric receptionists.
- Indirect Users: Medical records staff, health authority administrators.
- Governance & Oversight: Medical ethics compliance officers, patient privacy ombudsmen.
- External Subjects: Mental health patients and emergency contacts.`,
        codeSnippet: {
          language: "text",
          code: `User Requirement (U-1.2):
The Mentcare system shall generate monthly summary reports detailing drug usage and prescription costs for each clinic branch.

System Requirement (S-1.2.1):
On the last working day of each calendar month at 23:59 UTC, the reporting engine shall execute an SQL aggregation query over the Prescriptions table, grouping by clinic_id, calculating total dosage, dispensed volume, and unit cost. The resulting encrypted PDF shall be dispatched to the Medical Director's registered endpoint via TLS 1.3.`,
          caption: "Contrast between User Requirement and formal System Requirement"
        }
      },
      {
        id: "fr-nfr",
        title: "2.2 Functional vs Non-Functional Requirements & Metrics",
        content: `Requirements are partitioned into two fundamental orthogonal classes:

1. Functional Requirements (FR):
Define system behaviors, reactions to specific inputs, calculations, data transformations, and explicit operations the system must perform (or explicitly must NOT perform).

2. Non-Functional Requirements (NFR):
Define the emergent quality properties and constraints imposed on the system services. They often dictate the overall software architecture more aggressively than functional features.
- Product Requirements: Runtime behavior (speed, memory, error recovery, UI ergonomics).
- Organizational Requirements: Engineering standards, programming languages, build tooling, delivery schedules.
- External Requirements: Legislative mandates, GDPR compliance, medical safety certifications, ISO standards.`,
        callout: {
          type: "amber",
          title: "The Gold Standard: Quantitative Metrics for NFRs",
          text: "Vague non-functional statements such as 'the system shall be lightning fast' or 'the software shall be user-friendly' are contractually unverifiable and dangerous. Always express NFRs using quantifiable, measurable metrics."
        },
        table: {
          headers: ["Quality Dimension", "Measurable Engineering Metric", "Sample Target Specification"],
          rows: [
            ["Execution Speed", "Processed transactions/sec, 99th percentile response time", "< 120ms response time under 1,500 concurrent sessions"],
            ["Footprint Size", "Megabytes of volatile memory (RAM), storage sectors", "Compile output binary < 35MB; RAM footprint < 256MB"],
            ["Ease of Use", "Training duration required, user error frequency", "New operator achieves 95% task proficiency after 2 hours training"],
            ["Reliability", "Mean Time To Failure (MTTF), Availability percentage", "MTTF > 2,000 operational hours; 99.99% system availability"],
            ["Robustness", "Time to recover state after power fault, crash probability", "100% database recovery within 30 seconds of failover"],
            ["Portability", "Percentage of platform-dependent statements", "< 1.5% target-specific code; compiles on Linux, macOS, and Windows"]
          ]
        }
      },
      {
        id: "elicitation-techniques",
        title: "2.3 Requirements Elicitation Methodologies",
        content: `Elicitation is rarely a simple matter of asking customers what they want. Customers frequently suffer from the "Yes, but..." syndrome, confuse wants with needs, or cannot articulate tacit procedural knowledge.

Primary Elicitation Techniques:
1. Closed & Open Interviews:
   - Closed: Specific, pre-scripted questions to clarify known parameters.
   - Open: Broad exploratory discussions to reveal organizational dynamics and undocumented assumptions.
2. Scenarios & User Stories:
   - Walkthrough of concrete, realistic end-to-end task flows (e.g. "Nurse Sarah registers an uncooperative emergency patient during network partition").
3. Ethnography / Participant Observation:
   - An objective analyst embeds directly inside the operational work environment to observe how personnel actually perform tasks versus what official manuals specify.
   - Strengths: Discovers tacit knowledge, social workarounds, and implicit team collaboration patterns.
   - Weaknesses: Cannot discover novel future capabilities or innovations outside existing operations.`,
        callout: {
          type: "spruce",
          title: "Ethnography vs Traditional Elicitation",
          text: "Traditional interviews reveal what people think they do or what they wish they did. Ethnography reveals what people actually do in practice when pressured by real-world system constraints."
        }
      },
      {
        id: "srs-ieee830",
        title: "2.4 The IEEE 830 Standard SRS Document Structure",
        content: `The Software Requirements Specification (SRS) is the definitive contractual agreement between customer and developers. Under IEEE Standard 830, the document is hierarchically organized:

1. Introduction
   1.1 Purpose of the document
   1.2 Scope of the product
   1.3 Definitions, acronyms, and abbreviations
   1.4 References
   1.5 Overview of document structure
2. Overall Description
   2.1 Product perspective (standalone or sub-system)
   2.2 Product functions (summary block diagram)
   2.3 User characteristics (educational profile, domain expertise)
   2.4 General constraints (regulatory policies, hardware limits)
   2.5 Assumptions and dependencies
3. Specific Requirements
   - Detailed functional requirements with input/output invariants
   - External interface requirements (User, Hardware, Software, Communications)
   - Performance and scalability requirements
   - Design constraints (languages, standards, database schemas)
   - Software system attributes (reliability, availability, security, maintainability)

Attributes of a High-Quality SRS:
- Complete (all features specified)
- Consistent (no contradictory statements)
- Unambiguous (only one possible semantic interpretation)
- Verifiable (empirically testable by an independent QA team)
- Modifiable & Traceable (every requirement has a unique persistent identifier)`
      }
    ]
  },
  {
    id: "agile-development",
    number: 3,
    title: "Agile Software Development & Scrum Framework",
    shortTitle: "Agile SW Dev",
    ects: "4.0 ECTS",
    readTime: "20 min read",
    updated: "Course Slides: Chapter 3 Agile Software Development",
    sourceSlide: "Lect3.Agile SW Dev.pdf",
    slideUrl: "slides/Lect3.Agile SW Dev.pdf",
    summary:
      "Agile philosophy, 4 manifesto values, 12 core principles, Extreme Programming (XP) engineering practices (TDD, Refactoring, Pair Programming), Scrum roles, ceremonies, artifacts, story points, and burn-down analytics.",
    tags: ["#AgileManifesto", "#Scrum", "#TDD", "#ExtremeProgramming", "#UserStories", "#Velocity"],
    subsections: [
      {
        id: "agile-manifesto",
        title: "3.1 The Agile Manifesto & Core Philosophy",
        content: `In February 2001, seventeen software practitioners convened at Snowbird, Utah, to formulate an alternative to the heavy, bureaucratic, documentation-choked plan-driven methodologies of the 1980s and 1990s.

The 4 Foundational Value Statements:
1. Individuals and interactions over processes and tools
2. Working software over comprehensive documentation
3. Customer collaboration over contract negotiation
4. Responding to change over following a plan

While there is value in the items on the right, Agile values the items on the left more.

The 12 Supporting Principles:
- Welcome changing requirements, even late in development.
- Deliver working software frequently (weeks rather than months).
- Business people and developers must work together daily.
- Build projects around motivated individuals in supportive environments.
- Face-to-face conversation is the most efficient communication conduit.
- Working software is the primary measure of progress.
- Sustainable development pace: sponsors, developers, and users should maintain a constant pace indefinitely (no death marches).
- Continuous attention to technical excellence and good architectural design enhances agility.
- Simplicity—the art of maximizing the amount of work not done—is essential.
- The best architectures, requirements, and designs emerge from self-organizing teams.`,
        callout: {
          type: "pine",
          title: "The Project Management Iron Triangle",
          text: "In Plan-Driven projects, Scope is fixed while Cost and Schedule vary. In Agile projects, Cost and Schedule (timeboxes) are fixed while Scope is variable and prioritized."
        }
      },
      {
        id: "xp-practices",
        title: "3.2 Extreme Programming (XP) Engineering Practices",
        content: `Created by Kent Beck, Extreme Programming pushed recognized software engineering best practices to extreme levels. If code review is good, we review continuously (Pair Programming). If testing is good, everyone tests constantly (TDD). If simplicity is good, we implement only today's requirement (YAGNI - You Aren't Gonna Need It).

Influential XP Technical Practices:
1. Test-Driven Development (TDD): Write failing automated tests before writing production code.
2. Refactoring: Continuously restructure internal code without changing external observable behavior to eliminate code smells and reduce technical debt.
3. Pair Programming: Two developers work at one workstation. The 'Driver' writes code; the 'Navigator' reviews syntax, considers architectural implications, and spots corner cases.
4. Collective Code Ownership: Any team member can modify any part of the codebase at any time; eliminates knowledge silos and developer bottlenecks.
5. Continuous Integration (CI): Code is merged into the main trunk and automatically tested multiple times per day.`,
        codeSnippet: {
          language: "text",
          code: `         +----------------------------------+
         | 1. RED: Write a failing test     |
         +----------------------------------+
                          |
                          v
         +----------------------------------+
         | 2. GREEN: Write minimal code     |
         |    to make the test pass         |
         +----------------------------------+
                          |
                          v
         +----------------------------------+
         | 3. REFACTOR: Clean design,       |
         |    remove duplication, optimize  |
         +----------------------------------+`,
          caption: "Kent Beck's Red-Green-Refactor Cycle in TDD"
        }
      },
      {
        id: "scrum-framework",
        title: "3.3 Scrum Roles, Ceremonies & Artifacts",
        content: `Scrum is an iterative, incremental agile management framework for product development.

Scrum Roles:
- Product Owner (PO): Holds single-point accountability for product value. Manages and prioritizes the Product Backlog.
- Scrum Master: Servant-leader and facilitator. Removes team impediments, shields the team from external distractions, and ensures adherence to Scrum theory.
- Development Team: Cross-functional, self-organizing group of 5–9 professionals who build the increment.

Scrum Ceremonies (Timeboxed):
- Sprint: 1 to 4 week iteration producing a usable, potentially releasable Increment.
- Sprint Planning: Team inspects the backlog, defines the Sprint Goal, and forecasts backlog items.
- Daily Scrum: 15-minute daily synchronization meeting. What did I do yesterday? What will I do today? What blockers exist?
- Sprint Review: Live demonstration of the completed increment to stakeholders.
- Sprint Retrospective: Team inspects its own processes, relationships, and tooling to implement continuous quality improvements in the subsequent sprint.

Scrum Artifacts:
- Product Backlog: DEEP (Detailed appropriately, Estimated, Emergent, Prioritized).
- Sprint Backlog: Selected backlog items plus the technical plan for delivering them.
- Increment: Sum of all completed backlog items satisfying the Definition of Done (DoD).`,
        table: {
          headers: ["Scrum Concept", "Purpose", "Primary Metric / Artifact"],
          rows: [
            ["User Story", "Expresses requirement from user perspective", "Template: As a <role>, I want <goal>, so that <benefit>"],
            ["Story Point", "Relative measure of effort, complexity & uncertainty", "Fibonacci sequence: 1, 2, 3, 5, 8, 13, 21"],
            ["Planning Poker", "Consensus estimation technique preventing anchoring bias", "Cards revealed simultaneously by all engineers"],
            ["Velocity", "Amount of story points completed per sprint", "Used to forecast release schedules over rolling average"],
            ["Burn-down Chart", "Plots remaining work against remaining sprint days", "Visualizes sprint progress and scope creep"]
          ]
        }
      }
    ]
  },
  {
    id: "architectural-design",
    number: 4,
    title: "Architectural Design & 4+1 Viewpoints",
    shortTitle: "Architectural Design",
    ects: "4.0 ECTS",
    readTime: "28 min read",
    updated: "Course Slides: Chapter 6 Architectural Design",
    sourceSlide: "Lect 5- Architectural design.pdf",
    slideUrl: "slides/Lect 5- Architectural design.pdf",
    summary:
      "The critical bridge between requirements and system implementation: Kruchten's 4+1 View Model, architectural decisions driven by non-functional quality attributes, and architectural styles (Layered, Repository, Client-Server, Pipe & Filter, MVC).",
    tags: ["#4Plus1Views", "#MVC", "#LayeredArchitecture", "#PipeAndFilter", "#RepositoryPattern", "#NonFunctionalTradeoffs"],
    subsections: [
      {
        id: "arch-importance",
        title: "4.1 Software Architecture & Non-Functional Drivers",
        content: `Architectural design is concerned with understanding how a software system should be organized and designing the overall structure of that system. It represents the earliest set of design decisions, which are the hardest to change downstream.

Primary Advantages of Explicit Architecture:
1. Stakeholder Communication: Serves as a high-level lingua franca uniting end-users, executives, system architects, and operations engineers.
2. System Analysis: Enables early evaluation of whether the system can satisfy critical non-functional quality attributes.
3. Large-Scale Asset Reuse: Architectural patterns can be systematically instantiated across entire product families.

Architectural Quality Attribute Trade-Offs:
- Performance: Maximize locality; localize critical operations within a few large components to reduce inter-process communication latency.
- Security: Implement defense in depth; employ a layered structure with innermost protected assets and peripheral validation layers.
- Safety: Isolate safety-critical operations into dedicated, independently verifiable sub-systems with redundant hardware fallbacks.
- Availability: Structure system with replicated, fault-tolerant redundant components to allow hot-swapping and seamless failover.
- Maintainability: Utilize fine-grained, self-contained, loosely coupled modules that can be altered without cascading ripple effects.`,
        callout: {
          type: "spruce",
          title: "Architecture vs Detailed Design",
          text: "Architecture is the structure of structures—it defines high-level components, public connectors, and structural invariants. Detailed design determines internal algorithms, localized data structures, and procedural logic within individual components."
        }
      },
      {
        id: "kruchten-4plus1",
        title: "4.2 Philippe Kruchten's 4+1 View Model",
        content: `A single architectural diagram cannot capture all facets of a complex distributed system without becoming unintelligible. Philippe Kruchten proposed the 4+1 View Model to capture software architecture from distinct stakeholder viewpoints:

1. Logical View:
   - Target Audience: End-users, business analysts, domain designers.
   - Focus: Functional services provided by the system.
   - Notation: Class diagrams, state diagrams, object models depicting domain entities and domain relationships.
2. Process View:
   - Target Audience: System integrators, performance engineers.
   - Focus: Dynamic runtime aspects: concurrency, threads, processes, inter-process communication, response times, synchronization, and scalability.
3. Development / Implementation View:
   - Target Audience: Programmers, software build managers.
   - Focus: Static organization of code in the software development environment.
   - Notation: Package diagrams, component diagrams, module dependencies, repository structures.
4. Physical / Deployment View:
   - Target Audience: Systems engineers, cloud DevOps, network architects.
   - Focus: Distribution of software modules across physical hardware processors, VMs, edge containers, and communication networks.
+1. Use Cases / Scenarios View:
   - The central unifier. Select scenarios drive and validate the other four views, illustrating how elements from the logical, process, development, and physical views cooperate to deliver required business outcomes.`,
        table: {
          headers: ["View", "Primary Concerns", "UML / Modeling Tools", "Key Stakeholders"],
          rows: [
            ["Logical", "Domain abstractions, entity relationships, business functions", "Class Diagrams, Object Hierarchies", "Clients, Users, Systems Analysts"],
            ["Process", "Concurrency, threads, IPC, latency, throughput", "Activity Diagrams, Sequence Diagrams", "Performance Architects, Integrators"],
            ["Development", "Package hierarchy, component modularity, build targets", "Package Diagrams, Component Diagrams", "Developers, Code Reviewers, Release Eng"],
            ["Physical", "Servers, network nodes, cloud topologies, protocols", "Deployment Diagrams, Topology Maps", "DevOps, Network & Systems Engineers"],
            ["Scenarios (+1)", "Validation of use case execution across all views", "Use Case Diagrams, Interaction Flows", "All Stakeholders"]
          ]
        }
      },
      {
        id: "arch-patterns",
        title: "4.3 Major Architectural Patterns & Structural Schematics",
        content: `An architectural pattern is an abstract, stylized description of good design practice that has been tried and tested across diverse environments.

1. Layered (N-Tier) Architecture:
   - Organizes the system into layers with specific responsibilities.
   - Invariant: A layer only depends on layers below it.
   - Closed Layering: Layer $N$ can only invoke immediate Layer $N-1$ (highest isolation).
   - Open Layering: Layer $N$ can bypass intermediate layers to invoke Layer $N-2$ (higher performance, lower isolation).

2. Repository (Blackboard) Pattern:
   - Sub-systems exchange data through a centralized shared data repository.
   - Passive Repository: Clients query and update data on demand.
   - Active Blackboard: The repository notifies registered agents when data of interest changes.
   - Ideal for: IDEs (Eclipse, VS Code), CAD systems, AI expert diagnostics.

3. Client-Server Architecture:
   - Functionality is distributed across independent server components offering services and client components requesting services over a network protocol.

4. Pipe and Filter Pattern:
   - Functional transformations (filters) process their stream inputs to produce stream outputs without buffering entire datasets.
   - Classic examples: UNIX shell pipelines (\`cat log.txt | grep ERROR | awk ...\`), modern video transcoding pipelines, compiler frontends.

5. Model-View-Controller (MVC):
   - Separates model state and domain business logic from presentation (View) and user interaction handling (Controller).`,
        codeSnippet: {
          language: "text",
          code: `[User Interaction] 
       |
       v
+--------------+        updates state        +--------------+
|  Controller  | --------------------------> |    Model     |
+--------------+                             +--------------+
       ^                                            |
       | selects view                               | state notification
       v                                            v
+-----------------------------------------------------------+
|                           View                            |
|                 (HTML / Canvas Rendering)                 |
+-----------------------------------------------------------+`,
          caption: "Data and control flows in Model-View-Controller (MVC) Pattern"
        }
      }
    ]
  },
  {
    id: "cohesion-coupling",
    number: 5,
    title: "Modular Design: Cohesion, Coupling & SA/SD",
    shortTitle: "Cohesion & Coupling",
    ects: "4.0 ECTS",
    readTime: "24 min read",
    updated: "Course Slides: Software Design - Cohesion and Coupling",
    sourceSlide: "lect 6-Cohesion and coupling.pdf",
    slideUrl: "slides/lect 6-Cohesion and coupling.pdf",
    summary:
      "Deep mathematical and structural analysis of functional independence: 7 levels of Cohesion (Coincidental to Functional), 5 levels of Coupling (Content to Data), module fan-in/fan-out bounds, and Structured Analysis / Structured Design (SA/SD).",
    tags: ["#FunctionalIndependence", "#Cohesion", "#Coupling", "#FanInFanOut", "#SASD", "#StructureChart"],
    subsections: [
      {
        id: "functional-independence",
        title: "5.1 Functional Independence & Modularity Concepts",
        content: `A good software design decomposes a system into clean, discrete modules. A module is a logically separable part of a program (a function, class, package, or compilation unit) with a clear interface.

Functional Independence:
A module is functionally independent if it performs a single distinct function and interacts minimally with other parts of the system.
Why is Functional Independence vital?
1. Understandability: An engineer can grasp the module's behavior without understanding the entire multi-thousand-line codebase.
2. Error Isolation: Defect blast radius is strictly confined within module boundaries.
3. Modifiability: Internal algorithms or data structures can be overhauled without causing ripple effects throughout the system.

Two qualitative criteria measure functional independence:
- Cohesion: Measures the degree of internal functional binding among tasks within a single module.
- Coupling: Measures the degree of interdependence and connectivity between distinct modules.
Design Maxim: Maximize Cohesion (internal strength), Minimize Coupling (external entanglement).`,
        callout: {
          type: "spruce",
          title: "The Golden Rule of Module Structure",
          text: "High internal cohesion paired with loose external coupling is the foundational prerequisite for maintainable, testable, and reusable software."
        }
      },
      {
        id: "cohesion-levels",
        title: "5.2 The 7 Levels of Cohesion (Worst to Best)",
        content: `Cohesion represents the internal glue of a module. The 7 recognized levels from worst to best:

1. Coincidental Cohesion (Worst / Level 1):
Tasks within the module have no meaningful relationship whatsoever; they are randomly bundled together.
Example: A utility file containing \`printReport()\`, \`computeTax()\`, \`reverseString()\`, and \`openSerialPort()\`.

2. Logical Cohesion (Level 2):
Tasks perform logically similar activities, but which task executes is determined by a flag parameter passed from outside.
Example: A single routine \`handleInput(deviceType)\` containing a monolithic switch statement to process mouse clicks, keyboard strokes, or scanner inputs.

3. Temporal Cohesion (Level 3):
Tasks are grouped solely because they must execute at roughly the same time during program execution.
Example: An \`initialization()\` module that allocates heap memory, initializes hardware timers, clears window buffers, and reads configuration files.

4. Procedural Cohesion (Level 4):
Tasks execute in a specific sequence dictated by a procedure or algorithm, but operate on different data items.
Example: \`readStudentRecords_checkGraduationEligibility_updateHostelAllocation()\`.

5. Communicational Cohesion (Level 5):
All tasks operate on the exact same input dataset or produce the exact same output dataset.
Example: \`updateStudentRecordAndPrintGradeCard(studentData)\`.

6. Sequential Cohesion (Level 6):
Elements of the module form a pipeline where the output data of one task becomes the direct input to the next task.
Example: \`extractHTMLTokens() -> parseSyntaxTree() -> validateGrammar()\`.

7. Functional Cohesion (Best / Level 7):
All elements of the module cooperate to achieve one and only one mathematically or logically coherent function.
Example: \`calculateStandardDeviation(array)\`, \`computeMatrixDeterminant()\`.`,
        table: {
          headers: ["Cohesion Level", "Desirability", "Internal Binding Mechanism", "Maintenance Impact"],
          rows: [
            ["Coincidental", "1 (Worst)", "Purely accidental grouping", "Horrible; modifications cause unexpected side-effects"],
            ["Logical", "2 (Poor)", "Shared logical category selected by flag", "Difficult; modifying one case risks breaking other flags"],
            ["Temporal", "3 (Marginal)", "Grouped by time of execution", "Weak; reordering tasks can cause race conditions"],
            ["Procedural", "4 (Moderate)", "Grouped by execution sequence", "Fair; tasks are entangled by chronological flow"],
            ["Communicational", "5 (Good)", "Grouped by shared input/output data", "Good; clear data boundaries across operations"],
            ["Sequential", "6 (Very Good)", "Output of task A feeds input of task B", "Very Good; natural functional pipeline"],
            ["Functional", "7 (Ideal)", "Single, focused, atomic purpose", "Optimal; perfectly testable and reusable"]
          ]
        }
      },
      {
        id: "coupling-levels",
        title: "5.3 The 5 Classes of Coupling (Worst to Best)",
        content: `Coupling indicates how closely two modules interact. High coupling guarantees ripple effects: changing module A breaks module B.

The 5 classes of coupling from worst (highest entanglement) to best (lowest entanglement):

1. Content Coupling (Worst / Most Coupled):
One module directly accesses, branches into, or mutates the internal code, state, or memory of another module.
Example: Module A uses a \`goto\` to jump into a label inside Module B, or modifies private fields of B in-memory.

2. Common Coupling:
Modules share global variables or global memory areas.
Dangers: Any module can corrupt shared state; catastrophic bugs where identifying which of 50 modules corrupted a global counter requires days of debugging.

3. Control Coupling:
Data passed from one module to another is used explicitly to direct the internal control flow and decision logic of the called module (e.g. passing boolean flags, status codes).

4. Stamp (Data Structure) Coupling:
Two modules share a composite data structure (e.g. a struct, record, or class), but the called module only needs a tiny fraction of the data fields.
Example: Passing the entire \`Employee\` object (with 40 fields including salary, address, bank details) to a function that only needs \`employee.name\`.

5. Data Coupling (Best / Lowest Coupling):
Modules communicate exclusively by passing simple, atomic primitive values (e.g. \`int\`, \`float\`, \`string\`) as parameters.
Example: \`computeArea(length, width)\`.`,
        callout: {
          type: "amber",
          title: "Why Stamp Coupling is a Defect Magnet",
          text: "Stamp coupling creates spurious dependencies. If the Employee record layout changes (e.g. adding biometric credentials), every routine that accepted Employee must be recompiled and retested, even routines that only printed the employee's name!"
        }
      },
      {
        id: "module-structure-metrics",
        title: "5.4 Module Hierarchy & Structural Metrics (Fan-In / Fan-Out)",
        content: `A well-designed software system exhibits a clean control hierarchy represented by a tree or directed acyclic graph (Structure Chart).

Key Structural Metrics:
- Depth: The number of levels from the root controlling module to the lowest leaf module.
- Width: The maximum horizontal span of control across any single level.
- Fan-Out: The number of sub-modules directly invoked by a given module.
  - High Fan-Out (e.g. > 7): Indicates a "Brain / God Module" attempting to micromanage too many tasks. Hard to comprehend and test.
  - Design guideline: Ideal Fan-Out is 3 to 7 ($5 \\pm 2$ based on human cognitive limits).
- Fan-In: The number of higher-level modules that invoke a given module.
  - High Fan-In is highly desirable: It signals high reusability of a utility component (e.g. a string parser or encryption library invoked by 20 distinct services).`,
        codeSnippet: {
          language: "text",
          code: `              [ Root Controller ]          <--- High-level coordination
                 /     |     \\             (Fan-out = 3)
                v      v      v
             [ ModA ] [ ModB ] [ ModC ]
                \\      |      /
                 v     v     v
              [ Shared Utility ]           <--- High Fan-In (= 3) -> Reusable!`,
          caption: "Fan-In vs Fan-Out in Structure Chart"
        }
      }
    ]
  },
  {
    id: "testing-debugging",
    number: 6,
    title: "Software Testing, Metrics & Debugging Strategies",
    shortTitle: "Testing & Debugging",
    ects: "4.0 ECTS",
    readTime: "30 min read",
    updated: "Course Slides: Lect 7 Testing and debugging & Whitebox_Blackbox",
    sourceSlide: "LECT 7-Testing and debugging_new.pdf & Whitebox_Blackbox.pdf",
    slideUrl: "slides/LECT 7-Testing and debugging_new.pdf",
    summary:
      "Comprehensive verification & validation foundations: Error vs Fault vs Failure, Black-Box techniques (Equivalence Partitioning, BVA, Robustness), White-Box structural testing, McCabe's Cyclomatic Complexity derivation, Integration strategies, and Debugging methodologies.",
    tags: ["#McCabeComplexity", "#ControlFlowGraph", "#BlackBoxTesting", "#BoundaryValueAnalysis", "#UnitTesting", "#Debugging"],
    subsections: [
      {
        id: "vv-terminology",
        title: "6.1 Testing Fundamentals: Verification vs Validation & Failure Chain",
        content: `Software testing is the process of executing a program with the deliberate intention of finding errors. Testing demonstrates the presence of defects, never their total absence.

The Defect Causation Chain:
1. Error (Mistake): A human cognitive error or misunderstanding made by a programmer, designer, or analyst.
2. Fault / Bug: The physical manifestation of an error in the source code or design document. A dormant defect.
3. Failure: An observable incorrect dynamic behavior of the system during runtime execution that deviates from the SRS specification.
Note: A fault can lie dormant for years without causing a failure if the execution path triggering it is never exercised!

Verification vs Validation (Boehm's Classical Distinction):
- Verification: "Are we building the product right?" Checks whether the software conforms to its preceding specification (phase containment reviews, static analysis, unit test proofs).
- Validation: "Are we building the right product?" Checks whether the completed software actually satisfies genuine customer needs and operational workflows (acceptance testing, user trials).`,
        callout: {
          type: "spruce",
          title: "Pareto Principle in Testing (80/20 Rule)",
          text: "Approximately 80% of all software failures originate in just 20% of program modules. Once a module proves buggy, intense testing and potential total refactoring of that specific module yields the highest return on testing investment."
        }
      },
      {
        id: "black-box-testing",
        title: "6.2 Black-Box Testing: Equivalence Partitioning & BVA",
        content: `Black-Box (Functional) Testing examines only the input and output behavior of the system without inspecting the internal code structure.

1. Equivalence Class Partitioning (ECP):
Divides the infinite domain of input data into finite partitions such that test data from any single partition is assumed to behave identically to all other members of that class.
- Valid Equivalence Classes: Representative inputs that the system is designed to process successfully.
- Invalid Equivalence Classes: Illegal inputs (out-of-range, bad types, negative values) designed to verify error handling.

2. Boundary Value Analysis (BVA):
Errors cluster predominantly at boundaries rather than in the center of input ranges (off-by-one errors, loop termination bugs, \`<=\` vs \`<\`).
For an input variable with valid range $[min, max]$, BVA evaluates 5 canonical values:
$min, \\; min+1, \\; nominal, \\; max-1, \\; max$

Test Case Count Formulas for $n$ Independent Variables:
- Standard BVA: $4n + 1$ test cases (each variable tested at its 4 boundary points while others remain nominal, plus 1 all-nominal test).
- Robustness Testing: Incorporates extreme invalid boundaries $min-1$ and $max+1$. Generates $6n + 1$ test cases.
- Worst-Case Testing: Removes the independence assumption; evaluates the Cartesian product of all boundary values: $5^n$ test cases.
- Robust Worst-Case Testing: Evaluates the Cartesian product of all 7 values: $7^n$ test cases.`,
        table: {
          headers: ["Methodology", "Evaluated Points per Variable", "Test Case Count (n Variables)", "Error Focus"],
          rows: [
            ["Standard BVA", "min, min+1, nom, max-1, max", "4n + 1", "Single boundary faults"],
            ["Robustness Testing", "min-1, min, min+1, nom, max-1, max, max+1", "6n + 1", "Single boundary + boundary handling"],
            ["Worst-Case Testing", "All combinations of 5 values", "5^n", "Multi-variable interaction faults"],
            ["Robust Worst-Case", "All combinations of 7 values", "7^n", "Multi-variable extreme boundary faults"]
          ]
        }
      },
      {
        id: "white-box-mccabe",
        title: "6.3 White-Box Testing & McCabe's Cyclomatic Complexity",
        content: `White-Box (Structural) Testing inspects internal code logic, control flow branches, loops, and data paths.

Testing Coverage Hierarchy:
Statement Coverage $\\subset$ Branch / Decision Coverage $\\subset$ Condition Coverage $\\subset$ Multiple Condition Coverage (MCC) $\\subset$ Path Coverage.
- Statement Coverage: Every line executed at least once (weakest structural metric).
- Branch Coverage: Every edge (True and False branch of every decision) executed.
- Path Coverage: Every possible execution trajectory executed (often infinite due to loops).

McCabe's Cyclomatic Complexity Metric $V(G)$:
Proposed by Thomas McCabe in 1976 based on graph theory. It measures the quantitative structural complexity of a program by calculating the number of linearly independent paths through its Control Flow Graph (CFG).

Three mathematically equivalent formulas:
1. $V(G) = E - N + 2P$ (Where $E$ = edges, $N$ = nodes, $P$ = connected components. For a single program $P=1 \\implies V(G) = E - N + 2$)
2. $V(G) = \\text{Predicate Nodes} + 1$ (Where a Predicate Node is any node containing a conditional decision branch like \`if\`, \`while\`, \`case\`)
3. $V(G) = \\text{Number of Enclosed Regions} + 1$ (In a planar graph)`,
        formula: {
          latex: "V(G) = E - N + 2P = P_{\\text{predicates}} + 1 = \\text{Regions}",
          explanation: "Guarantees the exact minimum number of test cases required to achieve 100% basis path branch coverage. Standard ceiling: V(G) <= 10."
        },
        callout: {
          type: "amber",
          title: "Practical Rule for Compound Predicates",
          text: "When evaluating expressions like 'if (A && B)', count it as TWO predicate nodes because the compiler translates short-circuit operators into two distinct sequential decision branches."
        }
      },
      {
        id: "testing-levels-debugging",
        title: "6.4 Integration Strategies & Systematic Debugging",
        content: `Testing proceeds hierarchically through levels:
1. Unit Testing: Tests individual functions/classes using Driver programs (simulates calling parent) and Stub programs (simulates called children).
2. Integration Testing:
   - Big-Bang Integration: All modules linked simultaneously. Disastrous: impossible to isolate which module introduced a crash.
   - Top-Down Integration: Starts at the root controller and works down using Stubs. Advantage: verifies major architectural control flows early.
   - Bottom-Up Integration: Starts at the leaves and works up using Drivers. Advantage: verifies utility functions and data access layers early.
   - Sandwich / Hybrid Integration: Blends top-down for top layers and bottom-up for bottom layers.
3. System & Acceptance Testing: Validates full integrated bundle (Smoke, Stress, Load, Security, Alpha & Beta trials).

Debugging Approaches:
- Brute Force: Scattering print statements or core dumps. Least intellectual, high overhead.
- Backtracking: Tracing backward through program state from the point of failure until the causative anomaly is located. Effective for small modules.
- Cause Elimination: Hypothesize potential bug causes, formulate tests to confirm or refute each hypothesis, and eliminate candidates via systematic deduction.`,
        table: {
          headers: ["Integration Technique", "Auxiliary Code Needed", "Advantages", "Disadvantages"],
          rows: [
            ["Big-Bang", "None", "None", "Debugging is catastrophic; error location untraceable"],
            ["Top-Down", "Stubs", "Major control bugs spotted early; demoable early", "Needs complex stubs; low-level utility bugs detected late"],
            ["Bottom-Up", "Drivers", "Reusable utilities validated early; easy test cases", "Needs drivers; high-level architectural flaws detected late"],
            ["Sandwich", "Both Stubs and Drivers", "Balances benefits; parallel team execution", "Higher total scaffolding overhead"]
          ]
        }
      }
    ]
  },
  {
    id: "project-management",
    number: 7,
    title: "Project Management, Estimation & Schedule Compression",
    shortTitle: "Project Management",
    ects: "4.0 ECTS",
    readTime: "32 min read",
    updated: "Course Slides: Software Project Management",
    sourceSlide: "Project Management.pdf",
    slideUrl: "slides/Project Management.pdf",
    summary:
      "Quantitative software cost estimation: LOC vs Function Points (FP), Boehm's Basic & Intermediate COCOMO models, Putnam's Resource Allocation, Norden-Rayleigh staffing dynamics, quartic schedule compression penalties, and Brooks' Law.",
    tags: ["#COCOMO", "#FunctionPoints", "#PutnamModel", "#RayleighCurve", "#BrooksLaw", "#CostEstimation"],
    subsections: [
      {
        id: "size-metrics-fp",
        title: "7.1 Size Metrics: LOC vs Albrecht's Function Points",
        content: `Accurate project estimation requires estimating software size early.

Lines of Code (LOC / KLOC):
- Pros: Simple to count, direct intuitive meaning, automatable.
- Cons: Language dependent (1 line of Python != 1 line of Assembly), rewards verbose messy programmers, cannot be computed during early requirements phase.

Albrecht's Function Point (FP) Metric (1979):
Language-independent metric derived directly from the Software Requirements Specification based on external functional capabilities delivered to the user.

5 Functional Component Types:
1. Internal Logical Files (ILF): User-identifiable groups of logically related data maintained inside the application boundaries (e.g. database tables).
2. External Interface Files (EIF): Data files referenced and accessed by the application, but maintained by an external system.
3. External Inputs (EI): Ingress transactions from users or external systems that update internal files.
4. External Outputs (EO): Egress reports or messages generated for users involving mathematical algorithms or derived calculations.
5. External Inquiries (EQ): Input-output combinations resulting in direct data retrieval without altering internal database state.`,
        formula: {
          latex: "UFP = \\sum_{i=1}^{5} \\sum_{j=1}^{3} (\\text{Count}_{ij} \\times \\text{Weight}_{ij}), \\quad FP = UFP \\times \\left[0.65 + 0.01 \\times \\sum_{k=1}^{14} F_k\\right]",
          explanation: "UFP is Unadjusted Function Points. F_k represents the degree of influence (0 to 5) across 14 General System Characteristics (data comms, performance, transaction rate, etc.)."
        },
        table: {
          headers: ["Component", "Low Weight", "Average Weight", "High Weight"],
          rows: [
            ["Internal Logical Files (ILF)", "7", "10", "15"],
            ["External Interface Files (EIF)", "5", "7", "10"],
            ["External Inputs (EI)", "3", "4", "6"],
            ["External Outputs (EO)", "4", "5", "7"],
            ["External Inquiries (EQ)", "3", "4", "6"]
          ]
        }
      },
      {
        id: "cocomo-models",
        title: "7.2 Boehm's Basic & Intermediate COCOMO Models",
        content: `The Constructive Cost Model (COCOMO) formulated by Barry Boehm in 1981 predicts human effort (Person-Months) and development time (months) based on system size in KLOC.

Project Development Modes:
1. Organic Mode: Small teams, experienced personnel working in familiar in-house environments with relaxed requirements.
2. Semi-Detached Mode: Medium-sized teams with mixed experience levels working under moderate system constraints.
3. Embedded Mode: Software must operate within tight hardware, regulatory, and operational constraints (e.g. flight control, medical implants).

Basic COCOMO Mathematical Equations:
$\\text{Effort} = a \\times (\\text{KLOC})^b \\quad [\\text{Person-Months}]$
$\\text{Nominal Time } T_{\\text{dev}} = c \\times (\\text{Effort})^d \\quad [\\text{Months}]$
$\\text{Average Staffing} = \\frac{\\text{Effort}}{T_{\\text{dev}}} \\quad [\\text{Persons}]$`,
        table: {
          headers: ["Mode", "a (Effort)", "b (Exponent)", "c (Time)", "d (Exponent)"],
          rows: [
            ["Organic", "2.4", "1.05", "2.5", "0.38"],
            ["Semi-Detached", "3.0", "1.12", "2.5", "0.35"],
            ["Embedded", "3.6", "1.20", "2.5", "0.32"]
          ]
        },
        callout: {
          type: "spruce",
          title: "Intermediate COCOMO: Effort Adjustment Factor (EAF)",
          text: "Intermediate COCOMO adjusts the nominal effort using 15 Cost Drivers across Product, Hardware, Personnel, and Project attributes: Effort = a * (KLOC)^b * EAF, where EAF = Product of all 15 ratings. Coefficients for Intermediate: Organic (a=3.2), Semi-Detached (a=3.0), Embedded (a=2.8)."
        }
      },
      {
        id: "putnam-schedule-compression",
        title: "7.3 Putnam's Model & The Quartic Cost of Schedule Compression",
        content: `Norden and Putnam established that human staffing across a multi-year software project follows a Rayleigh-Norden distribution curve rather than a flat rectangular allotment.

Rayleigh Curve Dynamics:
- Minimal staff at inception (planning and requirements).
- Staffing ramps up non-linearly to a peak ($t_d$) exactly at system testing and initial release.
- 40% of the total project effort occurs before $t_d$; 60% of effort occurs after $t_d$ during system testing, deployment, and ongoing maintenance.

Putnam's Software Equation:
$S = C_k \\times K^{1/3} \\times t_d^{4/3}$
Where $S$ is source lines of code, $K$ is total lifecycle effort (Person-Years), $t_d$ is development time, and $C_k$ is the state-of-technology constant ($C_k=2$ for poor environment, $C_k=8$ for good SE environment, $C_k=11$ for elite environment).

The Quartic Penalty of Schedule Compression:
Rearranging Putnam's equation shows that effort varies inversely with the fourth power of development time:
$\\text{Effort} \\propto \\frac{1}{t_d^4}$!
Implication: Attempting to compress the delivery schedule by just 20% approximately doubles the human effort and cost required ($1 / 0.8^4 \\approx 2.44\\times$).`,
        callout: {
          type: "amber",
          title: "Boehm's 75% Compression Limit & Brooks' Law",
          text: "Boehm discovered an inviolable software engineering law: 'No project schedule can be compressed by more than 25% (i.e. below 75% of nominal time) regardless of how many engineers or servers are purchased.' Fred Brooks famously codified this in Brooks' Law: 'Adding manpower to a late software project makes it later' due to exponential communication overhead (N(N-1)/2 channels) and senior engineer mentoring drag."
        }
      }
    ]
  },
  {
    id: "quality-assurance",
    number: 8,
    title: "Software Quality Assurance, ISO 9000 & Capability Maturity Models",
    shortTitle: "SQA & ISO/CMM",
    ects: "4.0 ECTS",
    readTime: "22 min read",
    updated: "Course Slides: Software Quality Assurance",
    sourceSlide: "quality_system.pdf",
    slideUrl: "slides/quality_system.pdf",
    summary:
      "Evolution of quality systems (QC -> QA -> TQM), McCall's quality factors, ISO 9000 and ISO 9001 requirements for software, SEI Capability Maturity Model (CMM 5 levels and KPAs), Watts Humphrey's PSP, and Six Sigma DMAIC methodology.",
    tags: ["#ISO9001", "#SEICMM", "#QualityAssurance", "#PSP", "#SixSigma", "#KPAs"],
    subsections: [
      {
        id: "quality-evolution",
        title: "8.1 Quality Concepts: From Inspection to Total Quality Management",
        content: `Historically, quality was viewed simply as "fitness of purpose" (J.M. Juran). In modern software engineering, quality is a multi-attribute vector (McCall's 11 factors: Correctness, Reliability, Efficiency, Integrity, Usability, Maintainability, Testability, Flexibility, Portability, Reusability, Interoperability).

The Evolution of Quality Paradigms:
1. Quality Control (QC):
   - Focus: Product inspection.
   - Mechanism: Inspect completed software to detect and reject defective items post-facto.
   - Limitation: Catching bugs after they are baked in is exorbitantly expensive.
2. Quality Assurance (QA):
   - Focus: Process governance.
   - Mechanism: Define systematic processes, coding guidelines, design reviews, and quality audits so that defects are prevented from being introduced in the first place.
3. Total Quality Management (TQM):
   - Focus: Culture of continuous process improvement.
   - Mechanism: Involves every individual in the organization. Processes are continuously re-engineered based on metric feedback loops to minimize variance.`,
        table: {
          headers: ["Dimension", "Quality Control (QC)", "Quality Assurance (QA)", "Total Quality Management (TQM)"],
          rows: [
            ["Primary Focus", "Finished Product", "Engineering Process", "Continuous Process Improvement"],
            ["Orientation", "Detective (post-facto)", "Preventative (during build)", "Cultural & Strategic (lifelong)"],
            ["Responsibility", "Dedicated Inspection Team", "All Project Engineers & SQA", "Entire Enterprise from CEO down"],
            ["Action Taken", "Reject/rework failed code", "Audit processes & enforce standards", "Re-engineer systems to eliminate defect causes"]
          ]
        }
      },
      {
        id: "iso-9000",
        title: "8.2 ISO 9000 & ISO 9001 Quality Framework for Software",
        content: `Published by the International Organization for Standardization, the ISO 9000 series defines standards for establishing, documenting, and maintaining an effective quality system.
- ISO 9001: The premier standard applying to organizations that design, develop, produce, install, and service products.
- ISO 9000-3: Specific official guidance document explaining how to apply ISO 9001 clauses to software development.

Key Requirements of ISO 9001 for Software Organizations:
- Clause 4.1: Management responsibility; explicit quality policy and independent quality auditors.
- Clause 4.4: Documented design control procedures; formal design reviews and verification stages.
- Clause 4.5: Document and data control; change authorization tracking.
- Clause 4.8: Product traceability through all stages of development.
- Clause 4.14: Corrective and preventive action; root-cause defect analysis.

Shortcoming of ISO 9001 Certification:
ISO 9001 guarantees process adherence and repeatability, but does NOT guarantee that the resulting software is technologically superior or bug-free. An organization with a documented, audited process that produces awful software can still qualify for ISO 9001!`,
        callout: {
          type: "amber",
          title: "The Classic ISO 9000 Caveat",
          text: "ISO 9001 ensures you do what you document, and document what you do. It does not measure the intrinsic capability or maturity of the software engineering processes themselves."
        }
      },
      {
        id: "sei-cmm",
        title: "8.3 SEI Capability Maturity Model (CMM) 5 Levels & KPAs",
        content: `Developed by Watts Humphrey and the Software Engineering Institute (SEI) at Carnegie Mellon University, the Capability Maturity Model (CMM) provides a staged evolutionary roadmap for assessing and improving an organization's software process maturity.

The 5 Levels of Process Maturity:

Level 1: Initial (Chaotic)
- Characteristics: Ad-hoc, disorganized processes. Success depends entirely on individual heroes working 80-hour weeks. When heroes leave, projects fail. Cost and schedule estimates are wildly unpredictable.

Level 2: Repeatable (Project-Level Discipline)
- Characteristics: Basic project management techniques are established. Past successes can be repeated on similar applications.
- Key Process Areas (KPAs): Requirements Management, Software Project Planning, Software Project Tracking & Oversight, Software Subcontract Management, Software Quality Assurance, Software Configuration Management (SCM).

Level 3: Defined (Organization-Wide Standards)
- Characteristics: Software engineering and management processes are standardized, documented, and integrated into a company-wide Standard Software Process (SSP).
- KPAs: Organization Process Focus, Organization Process Definition, Training Program, Integrated Software Management, Software Product Engineering, Intergroup Coordination, Peer Reviews.

Level 4: Managed (Quantitative & Statistical Control)
- Characteristics: Quantitative quality goals are set for products and processes. Comprehensive process metrics are continuously collected and analyzed.
- KPAs: Quantitative Process Management, Software Quality Management.

Level 5: Optimizing (Continuous Innovation & Defect Prevention)
- Characteristics: The entire organization focuses on continuous process improvement using statistical feedback and piloting innovative technologies.
- KPAs: Defect Prevention, Technology Change Management, Process Change Management.`,
        table: {
          headers: ["Maturity Level", "Core Theme", "Predictability & Risk", "Key Process Areas (KPAs) Focus"],
          rows: [
            ["1. Initial", "Ad-hoc Heroics", "Unpredictable / High Risk", "No KPAs (total chaos)"],
            ["2. Repeatable", "Project Management", "Disciplined Projects", "Reqs Mgmt, Project Planning, SQA, SCM"],
            ["3. Defined", "Engineering Standards", "Consistent across Enterprise", "Peer Reviews, Process Definition, Training"],
            ["4. Managed", "Quantitative Measurement", "Statistical Process Control", "Quantitative Metrics & Quality Control"],
            ["5. Optimizing", "Continuous Improvement", "Highest Quality / Minimal Defects", "Defect Prevention, Tech & Process Evolution"]
          ]
        }
      },
      {
        id: "psp-six-sigma",
        title: "8.4 Personal Software Process (PSP) & Six Sigma",
        content: `Personal Software Process (PSP):
Developed by Watts Humphrey to translate CMM principles to individual engineers. Engineers track their own estimated vs actual code size, log every defect with injection and removal phase, and conduct personal code reviews before compiling. PSP yields dramatic 50%+ reductions in defect density before code ever reaches peer review.

Six Sigma:
Originating at Motorola and popularized by GE, Six Sigma is a disciplined, data-driven approach for eliminating defects in any process.
- 6-Sigma Quality Standard: 3.4 defects per million opportunities (DPMO) assuming a 1.5 standard deviation long-term drift.
- DMAIC Cycle:
  1. Define the system goals and customer critical-to-quality (CTQ) requirements.
  2. Measure the current process baseline and defect rates.
  3. Analyze data to determine the root cause of failures.
  4. Improve the process by designing and piloting creative solutions.
  5. Control the improved process with statistical process charts to sustain gains.`,
        callout: {
          type: "pine",
          title: "Six Sigma Defect Density Contrast",
          text: "Typical commercial software operates between 2-Sigma and 3-Sigma (~66,800 to 6,210 defects per million lines of code). Achieving 6-Sigma (3.4 DPMO) requires ultra-rigorous cleanroom software engineering, formal verification proofs, and zero-defect discipline."
        }
      }
    ]
  },
  {
    id: "github-pages-guide",
    number: 9,
    title: "Next.js Static Site Deployment to GitHub Pages: Comprehensive Manual",
    shortTitle: "GitHub Pages Deployment",
    ects: "CI/CD Pipeline",
    readTime: "18 min read",
    updated: "Live Production Configuration",
    sourceSlide: "Architectural Deployment & Hosting Blueprint",
    slideUrl: "slides/Lect 5- Architectural design.pdf",
    summary:
      "Exhaustive end-to-end technical manual for configuring, building, and deploying Next.js static websites to GitHub Pages via automated GitHub Actions workflows, basePath resolution, custom domains, and troubleshooting 404s.",
    tags: ["#GitHubPages", "#NextJS", "#GitHubActions", "#StaticExport", "#CI_CD", "#BasePathVariable"],
    subsections: [
      {
        id: "gh-architecture",
        title: "9.1 Next.js Static Export Architecture for GitHub Pages",
        content: `GitHub Pages is a static file hosting service. Unlike Vercel, AWS ECS, or a dedicated Node.js VPS, GitHub Pages has NO dynamic Node.js server runtime.

Therefore, Next.js applications deployed to GitHub Pages must be compiled into purely static HTML, CSS, JavaScript, and asset bundles using Next.js Static Site Generation (SSG).

Key Next.js Architectural Constraints:
1. Static Export: Must configure \`output: 'export'\` in \`next.config.mjs\`. This forces \`next build\` to output a standalone static folder (\`out/\`).
2. Server Actions & Dynamic SSR: Server-side rendering APIs (\`getServerSideProps\`, dynamic request headers, middleware, and live server actions) are not supported on static hosts.
3. Image Optimization: The default \`<Image />\` component depends on an active Node.js server to resize images on the fly. On static exports, you must configure \`images: { unoptimized: true }\`.
4. Trailing Slashes: GitHub Pages expects directory-based index files (\`/docs/index.html\`) rather than bare filenames (\`/docs.html\`). Setting \`trailingSlash: true\` eliminates 404 errors on page reload.
5. Base Path Mapping: If your project lives at \`https://username.github.io/my-repo/\`, all script tags, CSS links, and image references must be prefixed with \`/my-repo\`.`,
        callout: {
          type: "spruce",
          title: "The Base Path Dilemma Solved",
          text: "If you hardcode basePath: '/my-repo', your local development server runs at localhost:3000/my-repo/ and custom domains break. The solution is dynamic environment-aware detection."
        }
      },
      {
        id: "next-config-code",
        title: "9.2 The Production next.config.mjs Blueprint",
        content: `The following configuration handles local development, GitHub Actions builds, and custom domain overrides seamlessly:`,
        codeSnippet: {
          language: "javascript",
          code: `/** @type {import('next').NextConfig} */
const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

let basePath = '';
if (envBasePath !== undefined) {
  basePath = envBasePath;
} else if (process.env.GITHUB_ACTIONS) {
  // Fallback to repository name if running in GitHub Actions without custom domain
  basePath = '/SA-mat';
}

const nextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath ? \`\${basePath}/\` : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;`,
          caption: "next.config.mjs supporting both local dev and GitHub Pages static hosting"
        }
      },
      {
        id: "actions-workflow",
        title: "9.3 Automated GitHub Actions CI/CD Pipeline (.github/workflows/deploy.yml)",
        content: `Create the deployment pipeline file at \`.github/workflows/deploy.yml\`. This workflow triggers on every push to \`main\`, sets up Node.js 20, builds the Next.js static bundle with the repository basePath, and deploys directly to the GitHub Pages edge CDN.`,
        codeSnippet: {
          language: "yaml",
          code: `name: Deploy Next.js to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Setup Pages
        uses: actions/configure-pages@v5
        with:
          static_site_generator: next

      - name: Install Dependencies
        run: npm ci

      - name: Build Next.js Static Export
        env:
          NEXT_PUBLIC_BASE_PATH: /\${{ github.event.repository.name }}
        run: npm run build

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`,
          caption: "Complete .github/workflows/deploy.yml pipeline"
        }
      },
      {
        id: "step-by-step-walkthrough",
        title: "9.4 Step-by-Step Repository Setup & Verification",
        content: `Follow these exact steps to activate and verify GitHub Pages deployment:

Step 1: Commit and Push Code
Execute in your local terminal:
\`\`\`bash
git add .
git commit -m "feat: complete CSE312 Nordic documentation portal & GitHub Pages CI/CD"
git push -u origin main
\`\`\`

Step 2: Enable GitHub Pages Source
1. Navigate to your repository on GitHub: \`https://github.com/R-zin/SA-mat\`.
2. Click **Settings** (gear icon) in the top repository tabs.
3. In the left navigation menu, click **Pages** (under the "Code and automation" category).
4. Under **Build and deployment** > **Source**, change the dropdown from "Deploy from a branch" to **GitHub Actions**.

Step 3: Monitor Workflow Execution
1. Click the **Actions** tab in your repository.
2. Select the latest workflow run: "Deploy Next.js to GitHub Pages".
3. Observe the \`build\` and \`deploy\` jobs. Once green, the step output will provide your public URL:
   \`https://r-zin.github.io/SA-mat/\`

Step 4: Custom Domain Configuration (Optional)
If attaching a custom domain (e.g. \`docs.example.com\`):
1. Place a file named \`CNAME\` in the \`public/\` folder containing your domain name.
2. In your DNS provider (Cloudflare, Namecheap, Route53), add a CNAME record pointing \`docs\` to \`r-zin.github.io\`.
3. Check the "Enforce HTTPS" checkbox in GitHub Pages Settings.`,
        callout: {
          type: "amber",
          title: "Troubleshooting: The Dreaded Blank Page or Missing CSS",
          text: "If your deployed site renders without CSS styles or images, open Developer Tools (F12) > Console. If you see 404 errors for '/_next/static/...', your basePath was not included! Ensure NEXT_PUBLIC_BASE_PATH is set to '/<repo-name>' in the build step, or verify trailingSlash: true in next.config.mjs."
        }
      }
    ]
  }
];
