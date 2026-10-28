# Module 4: Architectural Design & Patterns

def get_mod4():
    return {
        "id": "architectural-design",
        "number": 4,
        "title": "Software Architecture: 4+1 Views, Classical, Advanced & Application Patterns",
        "shortTitle": "Architectural Design",
        "ects": "4.0 ECTS",
        "readTime": "29 min read",
        "updated": "Course Slides: Lect 5- Architectural design.pdf",
        "sourceSlide": "Lect 5- Architectural design.pdf",
        "slideUrl": "slides/Lect 5- Architectural design.pdf",
        "summary": "Exhaustive coverage of software architecture: Kruchten's 4+1 View Model, 11 architectural patterns (MVC, Layered, Client-Server, Pipe & Filter, PAC, Microkernel, Blackboard, Broker, Master-Slave, MVVM, Microservices), and application architectures (ATM transaction systems, Mentcare, compiler repository vs pipeline).",
        "tags": ["#Kruchten4Plus1", "#MVC", "#LayeredArchitecture", "#Microkernel", "#Blackboard", "#Broker", "#Compilers", "#ATMSystem"],
        "subsections": [
            {
                "id": "arch-foundations",
                "title": "4.1 Software Architecture Foundations & Kruchten's 4+1 View Model",
                "content": """### 🎯 Core Intuition ("The Skeletal Framework")
If software code is like the individual bricks and electrical wires inside a building, **Software Architecture** is the structural steel skeleton. It determines whether the building is an open-air stadium, a high-rise hospital, or a subterranean nuclear bunker. You cannot change a stadium into a skyscraper by swapping a few bricks; you have to redesign the foundational skeleton. Software architecture makes early, fundamental design decisions that dictate all subsequent non-functional properties (performance, security, scalability, and modifiability).

---

### 📚 Formal Definitions & The Three Advantages of Explicit Architecture
Bass, Clements, and Kazman define software architecture as:
> *"The software architecture of a system is the set of structures needed to reason about the system, which comprise software elements, relations among them, and properties of both."*

#### Three Fundamental Advantages of Explicit Architecture (Slide Highlights):
1. **Stakeholder Communication:** Architecture serves as a high-level, common conceptual model that enables non-technical clients, system analysts, project managers, and lead engineers to discuss system capabilities without getting lost in low-level code syntax.
2. **Early System Analysis of Non-Functional Qualities:** By inspecting the architectural model, architects can formally evaluate whether the system will satisfy latency constraints, security perimeters, and reliability targets *before* millions of dollars are spent writing code.
3. **Large-Scale System Reuse:** Architectural patterns, styles, and component frameworks can be systematically reused across entire families of related commercial products (Software Product Lines).

---

### 📐 Kruchten's 4+1 View Model of Software Architecture
A single architectural diagram cannot capture all perspectives of a complex system. Philippe Kruchten (1995) established the **4+1 View Model**, organizing architecture into four distinct perspectives unified by a central scenario view:

```
                  ┌───────────────────────┐
                  │     Logical View      │
                  │ (Classes, Abstraction)│
                  │ Target: End-Users     │
                  └───────────┬───────────┘
                              │
 ┌───────────────────────┐    │    ┌───────────────────────┐
 │     Process View      │    │    │   Development View    │
 │ (Concurrency, IPC)    ├────┼────┤ (Packages, Modules)   │
 │ Target: Integrators   │    │    │ Target: Developers    │
 └───────────────────────┘    │    └───────────────────────┘
                              │
                  ┌───────────┴───────────┐
                  │    +1 Use Cases /     │
                  │       Scenarios       │
                  │ Target: All Audience  │
                  └───────────┬───────────┘
                              │
                  ┌───────────┴───────────┐
                  │     Physical View     │
                  │ (Hardware Nodes, Cloud)│
                  │ Target: DevOps / SysEng│
                  └───────────────────────┘
```

#### Detailed Breakdown of the 4+1 Views (Exam Focus):
1. **The Logical View:**
   - **Focus:** Shows the functional abstractions and domain entities of the system.
   - **Artifacts:** UML Class Diagrams, Object Diagrams, State Machine Diagrams.
   - **Target Audience:** End-users, business analysts, domain specialists.
2. **The Process View:**
   - **Focus:** Captures runtime concurrency, threads of execution, inter-process communication (IPC), synchronization locks, and system response time.
   - **Artifacts:** Sequence Diagrams, Activity Diagrams, Communication Diagrams.
   - **Target Audience:** System integrators, performance engineers.
3. **The Development View (Implementation View):**
   - **Focus:** Illustrates the static software organization of the codebase—how code is decomposed into packages, libraries, namespaces, and compilation units.
   - **Artifacts:** Component Diagrams, Package Diagrams.
   - **Target Audience:** Software developers, build managers.
4. **The Physical View (Deployment View):**
   - **Focus:** Details the physical hardware distribution—servers, cloud instances, network links, virtualization, and storage topography.
   - **Artifacts:** Deployment Diagrams.
   - **Target Audience:** System engineers, DevOps specialists, network administrators.
5. **The +1 Scenarios / Use Cases View (The Glue):**
   - **Focus:** A small set of critical use cases that illustrate how the four other views work harmoniously to execute a user workflow. It validates the architecture and unifies the perspectives.""",
                "table": {
                    "headers": ["Kruchten Architectural View", "Key Concerns Addressed", "Primary UML Diagrams", "Primary Stakeholder"],
                    "rows": [
                        ["Logical View", "Domain functionality, class abstractions, relationships", "Class Diagrams, Object Diagrams", "End-Users, Domain Experts"],
                        ["Process View", "Concurrency, threads, IPC, synchronization, scalability", "Sequence Diagrams, Activity Diagrams", "System Integrators, Performance Testers"],
                        ["Development View", "Package structure, code modules, third-party libraries", "Component Diagrams, Package Diagrams", "Software Programmers, Build Engineers"],
                        ["Physical View", "Hardware topology, network links, execution servers", "Deployment Diagrams", "System Administrators, DevOps Engineers"],
                        ["+1 Scenarios View", "Validates and binds the 4 views together using concrete workflows", "Use Case Diagrams, Interaction Diagrams", "All Stakeholders (Unified View)"]
                    ]
                },
                "callout": {
                    "type": "pine",
                    "title": "Exam Tip: Why is it called '4+1' instead of '5' Views?",
                    "text": "In viva exams, professors frequently ask: 'Why 4+1 and not 5?' Answer: Because the 4 views (Logical, Process, Development, Physical) represent distinct structural perspectives of the system. The +1 (Scenarios) is NOT a separate architectural structure; it is the validating operational key that ties the other 4 structural views together!"
                }
            },
            {
                "id": "classic-patterns",
                "title": "4.2 Classical Architectural Patterns: MVC, Layered, Client-Server & Pipe-Filter",
                "content": """### 🎯 Core Intuition ("Blueprints Tested by Time")
When civil engineers design a suspension bridge, they don't invent suspension cables from scratch. They reuse a proven pattern: two large towers, curved suspension cables, and vertical hangers. In software engineering, an **Architectural Pattern** is a stylized, reusable solution to a commonly occurring architectural problem in a given context.

---

### 🏛️ The Four Classical Architectural Patterns

#### 1. Model-View-Controller (MVC) Pattern
- **Core Concept:** Decouples the internal domain data and business logic (**Model**) from user interface presentations (**View**) and user input handling (**Controller**).
- **Component Roles:**
  - *Model:* Encapsulates application state, business logic, and database entities. Notifies Views when state changes (Observer pattern).
  - *View:* Renders data retrieved from the Model to the user. Maintains zero business logic.
  - *Controller:* Receives user events (mouse clicks, keystrokes, HTTP requests), translates them into Model mutations or View updates.
- **Web Application Mapping:** In modern web frameworks (Rails, Django, Spring MVC, Express), the HTTP request hits the Router/Controller, the Controller calls the Model/ORM, and the Controller selects an HTML/JSON View to return to the client browser.
- **Advantages:** Independent UI modification without touching business logic; multiple simultaneous views of the same data (e.g. pie chart and spreadsheet table).
- **Disadvantages:** Additional architectural complexity; inefficient for simple linear CRUD screens.

#### 2. Layered Architecture Pattern
- **Core Concept:** Organizes system functionality into a vertical stack of hierarchical layers. Each layer provides services to the layer immediately above it and consumes services exclusively from the layer immediately below it.
- **The Generic 4-Layer Hierarchy:**
  1. *Presentation Layer (Top):* GUI components, CLI, web screens.
  2. *Application Layer:* Workflow orchestration, user session management.
  3. *Business / Domain Logic Layer:* Core business algorithms, rules, calculations.
  4. *Data Access / Infrastructure Layer (Bottom):* Database queries, file I/O, external network adapters.
- **Strict vs. Relaxed Layering:**
  - *Strict Layering:* Layer $N$ can ONLY invoke Layer $N-1$. (Maximizes maintainability and modifiability).
  - *Relaxed Layering:* Layer $N$ can bypass intermediate layers to invoke Layer $N-2$ directly. (Improves performance at the cost of coupling).
- **The iLearn System Case Study (Slide Highlight):** The course slides illustrate an educational portal (`iLearn`) organized into 4 layers: User Interface $\\to$ Academic Services (grading, attendance) $\\to$ Storage Adapters $\\to$ Relational Database.
- **Advantages:** High maintainability; a layer can be completely replaced (e.g., swapping PostgreSQL for MongoDB) without affecting upper layers, provided interface signatures remain constant.
- **Disadvantages:** Performance overhead as data must traverse multiple layers (cascading calls); difficulty in cleanly partitioning complex cross-cutting logic.

#### 3. Client-Server Architecture Pattern
- **Core Concept:** A centralized, high-capacity **Server** provides specialized services (database, compute, streaming) to multiple remote, independent **Clients** communicating over a computer network.
- **Variations:**
  - *Two-Tier Architecture:* Thin Client (GUI only) + Fat Server (App logic + Database), OR Fat Client (GUI + App logic) + Database Server.
  - *Three-Tier / Multi-Tier Architecture:* Client (Tier 1) $\\to$ Application Server (Tier 2) $\\to$ Database Server (Tier 3).
- **The Film Library Case Study (Slide Highlight):** A central movie archive server hosts high-resolution video streams; thousands of distributed client terminals query the catalog, stream video, and process playback commands.
- **Advantages:** Centralized administration and security; servers can be scaled independently of clients.
- **Disadvantages:** Single point of failure (if the server crashes, all clients fail); network latency and bandwidth bottlenecks.

#### 4. Pipe and Filter Architecture Pattern
- **Core Concept:** Decomposes a processing task into a sequence of autonomous data transformation components called **Filters**, connected by data stream channels called **Pipes**.
- **Execution Mechanism:** Each filter consumes a stream of data from its input pipe, performs a discrete transformation, and streams the transformed data into its output pipe. Filters run concurrently in a pipeline.
- **Classic Example:** UNIX shell pipelines:
  `cat access.log | grep "404" | cut -d' ' -f1 | sort | uniq -c`
- **Advantages:** Extreme reusability (filters can be rearranged like LEGO blocks); natural support for parallel processing and streaming concurrency.
- **Disadvantages:** Data transformation overhead (filters must constantly parse and serialize data streams like strings/bytes); poor fit for interactive graphical user interfaces.""",
                "table": {
                    "headers": ["Architectural Pattern", "Primary Architectural Invariant", "Key Strength", "Critical Vulnerability"],
                    "rows": [
                        ["Model-View-Controller", "Strict decoupling of UI representation from state and input", "Enables multiple concurrent views; independent UI development", "Overhead and complexity for simple, non-interactive applications"],
                        ["Layered Architecture", "Monotonic downward dependency hierarchy ($N \\to N-1$)", "High maintainability and portability; plug-and-play layers", "Performance drag from layered pass-through serialization"],
                        ["Client-Server", "Decentralized clients request services from centralized servers", "Centralized security, data consistency, and resource management", "Server is a single point of failure and network bandwidth bottleneck"],
                        ["Pipe and Filter", "Linear data transformation streams with independent filters", "High throughput, streaming concurrency, and component reusability", "Inefficient for interactive systems; repeated data parsing overhead"]
                    ]
                },
                "callout": {
                    "type": "amber",
                    "title": "Exam Trap: Layer Bypassing",
                    "text": "If asked: 'What is the risk of relaxed layering?' Answer: 'When Layer 4 directly invokes Layer 1 to boost performance, it creates tight coupling across the entire stack. Changing the database schema then breaks the GUI code, destroying the maintainability benefit of layered design!'"
                }
            },
            {
                "id": "advanced-patterns",
                "title": "4.3 Advanced Architectural Patterns: Microkernel, Blackboard, Broker & Microservices",
                "content": """### 🎯 Core Intuition ("The Operating System, The Expert Council & The Embassy")
When you install an operating system or modern code editor (like VS Code), the core engine is tiny (a **Microkernel**); you add all capabilities via extensions and plugins. 

When a team of distinct medical experts (cardiologist, neurologist, toxicologist) stand around a whiteboard to solve an unknown poison mystery, they share a single central board (**Blackboard Architecture**). 

When diplomats from 50 countries who speak different languages want to trade goods, they coordinate through a centralized customs **Broker**.

---

### 🏛️ The Seven Advanced Architectural Patterns from Course Slides

#### 1. Presentation-Abstraction-Control (PAC) Pattern
- **Structure:** Hierarchical agent tree where each agent contains three internal components:
  - *Presentation:* Handles sensory input and visual output.
  - *Abstraction:* Maintains underlying data and business logic.
  - *Control:* Mediates between Presentation and Abstraction and manages communication with other PAC agents in the tree hierarchy.
- **Contrast with MVC:** MVC has one global Model and multiple Views. PAC distributes the system into a tree of cooperating mini-agents (Top-level, Intermediate, and Bottom-level agents).

#### 2. Microkernel Architecture Pattern (Plugin Architecture)
- **Structure:** Divides the system into two distinct architectural parts:
  1. **Minimal Core Microkernel:** Implements only the bare minimum essential system rules (e.g. lifecycle, memory allocation, event bus).
  2. **Plug-in Components:** Independent modules that attach to the microkernel via defined extension interfaces to provide specialized business features.
- **Classic Examples:** Modern operating systems (Mach, QNX), IDEs (Eclipse, VS Code), and web browsers.
- **Advantages:** Extreme extensibility and customization; plug-ins can be added, updated, or disabled at runtime without recompiling the core kernel.
- **Disadvantages:** High complexity in designing a stable, future-proof microkernel API.

#### 3. Blackboard Architecture Pattern
- **Structure:** Solves non-deterministic, complex computational problems where no closed-form algorithmic solution exists. Consists of three parts:
  1. **Blackboard:** A centralized shared data repository containing current problem state and hypothesis data.
  2. **Knowledge Sources (KS):** Independent specialized expert modules (e.g. acoustic expert, phonetic expert, syntactic parser).
  3. **Control Component:** Monitors blackboard state changes and selects which Knowledge Source executes next.
- **Execution:** When the state of the blackboard updates, matching Knowledge Sources trigger, analyze the data, and write partial solutions back to the blackboard.
- **Classic Examples:** Speech recognition (HEARSAY-II), submarine sonar signal interpretation, radar tracking.

#### 4. Broker Architecture Pattern
- **Structure:** Coordinates communication and service invocation in distributed systems across heterogenous networks.
- **Core Components:**
  - *Clients:* Request services.
  - *Servers:* Expose remote services.
  - *Broker:* Central registry that locates servers, routes client requests, marshals/unmarshals parameters, and returns results.
- **Classic Examples:** CORBA, Java RMI registries, message brokers (RabbitMQ, Kafka).

#### 5. Master-Slave Architecture Pattern
- **Structure:** A **Master** component divides a large computational workload into identical sub-tasks, distributes them to multiple **Slave** worker nodes, and consolidates the intermediate results into a final output.
- **Advantages:** Fault tolerance (if a slave node crashes, the master simply reassigns the sub-task to another slave) and high parallel computing throughput.
- **Classic Examples:** MapReduce, distributed web crawlers, database read-replica clusters.

#### 6. Model-View-ViewModel (MVVM) Architecture
- **Structure:** Evolved from MVC for modern rich GUI frameworks (WPF, Angular, Vue, React).
- **The ViewModel:** Exposes data streams and commands to the View. Uses **Two-Way Declarative Data Binding**: when the user types in an input field, the ViewModel updates automatically; when data changes in the ViewModel, the UI updates instantly without manual DOM manipulation.

#### 7. Microservices Architecture Pattern
- **Structure:** Decomposes a large monolithic enterprise application into a suite of small, autonomous, independently deployable micro-services.
- **Characteristics:** Each microservice runs in its own process, owns its own private database (Database-per-Service pattern), and communicates via lightweight network protocols (HTTP REST, gRPC). Polyglot programming and independent auto-scaling.""",
                "table": {
                    "headers": ["Advanced Pattern", "Central Organizing Paradigm", "Real-World Industrial Exemplar", "Primary Trade-off"],
                    "rows": [
                        ["Microkernel", "Minimal core engine + dynamic extensible plug-ins", "Eclipse IDE, VS Code, Linux Kernel modules", "Difficult to evolve microkernel core API once plug-ins proliferate"],
                        ["Blackboard", "Central shared memory blackboard + opportunistic expert modules", "AI Speech Recognition, Submarine Sonar Tracking", "Non-deterministic execution order; difficult to test and debug"],
                        ["Broker", "Central middleware directory locating and routing remote services", "CORBA, Web Service registries, RPC middleware", "Broker can become a performance and availability bottleneck"],
                        ["Master-Slave", "Workload partitioning across identical worker replicas", "Hadoop MapReduce, DB Read-Replicas, GPU computing", "Slaves share zero state; overhead in work distribution and synchronization"],
                        ["MVVM", "Declarative two-way reactive data binding via ViewModel", "WPF, Vue.js, Angular, React (Hooks)", "High memory consumption for complex UI data-binding trees"],
                        ["Microservices", "Autonomous, single-purpose services with private databases", "Netflix streaming, Amazon e-commerce, Uber dispatch", "Distributed data consistency challenges (requires eventual consistency / Saga)"]
                    ]
                },
                "callout": {
                    "type": "pine",
                    "title": "Exam Mnemonic: 7 Advanced Patterns",
                    "text": "Remember: 'P-M-B-B-M-M-M' -> PAC, Microkernel, Blackboard, Broker, Master-Slave, MVVM, Microservices. If asked which pattern handles non-deterministic AI problem solving: BLACKBOARD!"
                }
            },
            {
                "id": "application-architectures",
                "title": "4.4 Application Architectures: Transaction Systems & Compilers",
                "content": """### 🎯 Core Intuition ("The Bank Vault vs. The Factory Assembly Line")
Specific types of businesses share common structural blueprints. An automated banking ATM in Tokyo works almost identically to an ATM in New York (**Transaction Processing Architecture**). Similarly, a C++ compiler from 1985 works almost identically to a modern Rust compiler from 2025 (**Language Processing Architecture**). Studying these proven application architectures allows engineers to build complex systems using standardized industry templates.

---

### 💳 Transaction Processing Systems (The ATM Architecture Case Study)
Transaction processing systems process user requests that query or mutate a stateful database, subject to the **ACID Properties**:
- **Atomicity:** All sub-actions succeed or all rollback (all-or-nothing).
- **Consistency:** Database transitions only between valid states.
- **Isolation:** Concurrent transactions execute without mutual interference.
- **Durability:** Committed transactions survive system crashes.

#### The Course Slide Case Study: The Software Architecture of an ATM System
```
[User Interface (Keypad, Display)] <───> [Card Reader & Pin Validator]
                   │
                   ▼
      [ATM Transaction Manager]
                   │
     ┌─────────────┼─────────────┐
     ▼             ▼             ▼
[Cash Dispenser] [Receipt] [Audit Journal]
     │             │             │
     └─────────────┬─────────────┘
                   ▼
[Secure WAN Telecom Adapter (ISO 8583)]
                   ▼
     [Bank Central Ledger Host]
```
1. Customer inserts card and enters PIN; PIN is verified securely against hashed credentials.
2. Customer selects withdrawal amount.
3. The ATM Transaction Manager constructs an encrypted transaction payload.
4. Payload is transmitted over WAN to the central bank ledger host.
5. If approved, central ledger decrements account balance, the ATM physical cash dispenser dispenses notes, the receipt printer prints confirmation, and the local audit journal records the transaction.

---

### 🖥️ Language Processing Systems (Compilers)
Compilers translate high-level human programming languages (source code) into machine instructions or bytecode. The lecture slides highlight two competing architectural styles for compilers:

#### 1. The Pipe-and-Filter Compiler Architecture
```
[Source Code] ──> [Lexical Analyzer (Lexer)]
                         │ (Token Stream)
                         ▼
                  [Syntax Analyzer (Parser)]
                         │ (Parse Tree / AST)
                         ▼
                  [Semantic Analyzer (Type Checker)]
                         │ (Decorated AST)
                         ▼
                  [Intermediate Code Optimizer]
                         │ (Optimized IR)
                         ▼
                  [Code Generator] ──> [Machine Executable]
```
- Each compiler phase is a pure filter consuming tokens/ASTs and outputting transformed intermediate representations.

#### 2. The Repository-Based Compiler Architecture (Course Slide Focus)
- Rather than passing large data structures along pipes, a centralized **Symbol Table** and **Abstract Syntax Tree (AST)** are maintained in a central repository.
- The Lexer, Parser, Type Checker, Optimizer, and Code Generator all operate concurrently around the shared Symbol Table repository.
- **Advantage:** Eliminates the massive performance overhead of serializing and re-parsing complex syntax trees between phases!""",
                "table": {
                    "headers": ["Compiler Sub-Component", "Input Artifact", "Output Artifact", "Primary Algorithmic Task"],
                    "rows": [
                        ["Lexical Analyzer (Scanner)", "Raw ASCII / UTF-8 Source Code string", "Stream of lexical Tokens (keywords, identifiers, literals)", "Eliminates whitespace/comments; regex pattern matching"],
                        ["Syntax Analyzer (Parser)", "Stream of Tokens", "Abstract Syntax Tree (AST)", "Grammar validation via Context-Free Grammars (BNF)"],
                        ["Semantic Analyzer", "Abstract Syntax Tree", "Decorated AST / Symbol Table", "Type checking, variable scope resolution, identifier binding"],
                        ["Intermediate Code Optimizer", "Intermediate Representation (IR)", "Optimized IR", "Constant folding, dead code elimination, loop unrolling"],
                        ["Code Generator", "Optimized IR", "Target Machine Code / Bytecode", "Register allocation, instruction scheduling, memory offsets"]
                    ]
                },
                "callout": {
                    "type": "amber",
                    "title": "Exam Tip: Repository vs. Pipeline Compiler",
                    "text": "A classic exam question asks: 'Why is a repository architecture preferred over a pipe-and-filter architecture for production compilers?' Answer: In large codebases, the Abstract Syntax Tree and Symbol Table are enormous. Passing them through sequential pipes forces massive copying and serialization overhead. A central repository allows all compiler phases to share direct memory pointers to the Symbol Table!"
                }
            }
        ]
    }
