# Module 2: Requirements Engineering & Formal Specifications

def get_mod2():
    return {
        "id": "requirements-engineering",
        "number": 2,
        "title": "Requirements Engineering: Elicitation, Specification & Validation",
        "shortTitle": "Requirements Eng.",
        "ects": "4.0 ECTS",
        "readTime": "26 min read",
        "updated": "Course Slides: Lect4.Req Eng,.pdf",
        "sourceSlide": "Lect4.Req Eng,.pdf",
        "slideUrl": "slides/Lect4.Req Eng,.pdf",
        "summary": "Comprehensive treatise on Requirements Engineering: Davis's abstraction ladder, Mentcare clinic running case study, IEEE 830 SRS structure, quantitative NFR metrics, closed vs open interviewing, ethnography, insulin pump tabular specification, and traceability matrix change control.",
        "tags": ["#IEEE830", "#SRS", "#NFRMetrics", "#MentcareSystem", "#Ethnography", "#InsulinPump", "#Traceability"],
        "subsections": [
            {
                "id": "re-foundations",
                "title": "2.1 Fundamentals of Requirements Engineering & The Mentcare Case Study",
                "content": """### 🎯 Core Intuition ("Never Build a Hospital on a Shaky Foundation")
Imagine a doctor ordering medication for a diabetic patient. If the doctor says: *"Give the patient some insulin when they look tired,"* the nurse could inject a lethal overdose. The instruction must be mathematically exact: *"Administer 2.5 units of fast-acting insulin via subcutaneous pump if blood glucose exceeds 180 mg/dL after fasting."* 

In software engineering, **Requirements Engineering (RE)** is the disciplined process of taking vague, messy human wishes (*"We want an intuitive mental health clinic system"*) and translating them into unambiguous, formally verifiable engineering contracts that developers can code with zero guesswork.

---

### 📚 Formal Definitions & Davis's Abstraction Ladder
According to IEEE Standard 610.12, a **Requirement** is:
> 1. A condition or capability needed by a user to solve a problem or achieve an objective.
> 2. A condition or capability that must be met or possessed by a system to satisfy a contract, standard, specification, or other formally imposed document.

#### Alan Davis's Requirements Abstraction Spectrum:
Requirements do not exist at a single level of detail. They span a continuum:
- **Level 1 (Highest Abstraction - User Requirement):** *"The system shall maintain clinical records of all mental health patients and facilitate rapid appointment booking."* (Intended for healthcare commissioners, clinic directors, and patients).
- **Level 2 (Intermediate - Architectural Requirement):** *"The patient database shall maintain encrypted medical history with role-based access control complying with HIPAA security standards."*
- **Level 3 (Lowest Abstraction - System Requirement):** *"When a receptionist clicks 'Book Appointment', the system shall query `appointments_table` using indexed `patient_id` and `doctor_id` with an optimistic locking timeout of 3.0 seconds, returning HTTP 200 JSON payload containing confirmed time slot."* (Intended for software engineers and QA testers).

---

### 🏥 The Course Running Case Study: The Mentcare System
The lecture slides utilize the **Mentcare System** (a mental health clinic patient management database) as the primary academic case study:
- **Context:** Mental health patients often suffer from acute memory loss, distress, or severe behavioral crises. They are treated across multiple outpatient clinics.
- **System Objectives:**
  1. Generate real-time management information to enable healthcare managers to track clinic performance and drug inventories.
  2. Provide clinical staff (doctors, psychiatric nurses) with instantaneous, secure access to patient medical histories, clinical notes, and allergy records.
  3. Comply with strict medical ethics and data privacy laws.

#### System Stakeholders:
A **Stakeholder** is any person or organization who is directly or indirectly affected by the system.
- **Direct Stakeholders:** Clinic receptionists, psychiatric nurses, attending doctors, system administrators.
- **Indirect Stakeholders:** Patients, healthcare regulators, insurance billing authorities.
- **Critical Oversight Stakeholder (The Medical Ethics Manager):** Must verify that patient records cannot be viewed by unauthorized third parties and that involuntary detention records comply with mental health legislation.""",
                "table": {
                    "headers": ["Type of Requirement", "Target Readership", "Form of Representation", "Primary Purpose"],
                    "rows": [
                        ["User Requirements", "Clients, clinic directors, end-user nurses, contractor executives", "Natural language statements with simple diagrams", "Define external behavior and business capabilities without technical jargon"],
                        ["System Requirements", "System architects, senior software developers, test engineers", "Structured specifications, formal contracts, detailed UML use cases", "Define exact functional workflows, API schemas, and technical constraints"]
                    ]
                },
                "callout": {
                    "type": "pine",
                    "title": "Exam Warning: Requirements vs. Design",
                    "text": "A standard exam trap: 'Requirements describe WHAT the system should do from the user's perspective without committing to how it will be implemented. Design describes HOW the system will be built (software architecture, algorithms, database tables, and design patterns).'"
                }
            },
            {
                "id": "fr-nfr-metrics",
                "title": "2.2 Functional vs. Non-Functional Requirements & Measurable Metrics",
                "content": """### 🎯 Core Intuition ("The Engine vs. The Crash Test Rating")
Think of buying an automobile.
- **Functional Requirements (What the car DOES):** The car must accelerate when the gas pedal is pressed, shift gears, illuminate headlights in the dark, and steer left/right.
- **Non-Functional Requirements (How the car BEHAVES):** The car must achieve 40 miles per gallon (efficiency), stop within 120 feet from 60 mph (safety), withstand a 50 mph collision without cabin breach (reliability), and emit less than 95 grams of CO₂ per km (regulatory constraint).

A car with a functional engine that explodes during a minor bump is useless. Similarly, a software system that computes the right answer but takes 45 minutes to load or leaks credit cards is an utter failure.

---

### 📚 Functional Requirements (FR)
**Functional Requirements** describe the concrete services or functions the software must perform. They specify how the system reacts to particular inputs and how it behaves in exceptional circumstances.
- *Mentcare Example 1:* *"A user shall be able to search the appointment lists across all outpatient clinics by entering a date range and doctor name."*
- *Mentcare Example 2:* *"The system shall generate a daily report enumerating all patients who failed to attend prescribed consultations."*

#### Hallmarks of High-Quality Functional Requirements:
- **Completeness:** All services requested by the customer must be fully defined.
- **Consistency:** Requirements must not have conflicting definitions (e.g., Module A must not mandate 24-hour time format while Module B mandates 12-hour AM/PM format).

---

### 📚 Non-Functional Requirements (NFR)
**Non-Functional Requirements** define system properties, environmental constraints, and quality attributes:
1. **Product Requirements:** Specify runtime operational behavior (execution speed, memory footprint, reliability, fault tolerance, and UI usability).
2. **Organizational Requirements:** Consequence of organizational policies and standards (development methodologies, programming language constraints, coding style guides, delivery accounting).
3. **External Requirements:** Factors external to the system and development organization (HIPAA privacy laws, GDPR data deletion rights, ISO safety standards).

---

### 🔢 Quantitative Metrics for Specifying NFRs
In university exams, professors penalize vague qualitative statements like *"The system must be fast and user-friendly."* Non-functional requirements **must be quantitatively testable and verifiable**.

The table below provides the exact exam-standard metrics from the lecture slides:""",
                "table": {
                    "headers": ["Quality Property", "Measurable Quantitative Metrics (Exam Standard)"],
                    "rows": [
                        ["System Speed / Performance", "Processed transactions/second; Response time to user event (e.g. < 500 ms); Screen refresh time"],
                        ["System Size / Memory Footprint", "Megabytes (MB) / Gigabytes (GB) of RAM; Number of ROM chips / flash memory limit"],
                        ["Ease of Use (Usability)", "Hours of training required for a novice; Number of help frames accessed per session; Task completion time"],
                        ["Reliability", "Mean Time to Failure (MTTF); Probability of Failure on Demand (POFOD); Rate of Occurrence of Failure (ROCOF); Availability (e.g. 99.95%)"],
                        ["Robustness / Fault Tolerance", "Time to restart after system failure; Percentage of events causing catastrophic failure; Probability of data corruption on power loss"],
                        ["Portability", "Percentage of target-dependent statements; Number of target operating systems / hardware architectures supported"]
                    ]
                },
                "callout": {
                    "type": "amber",
                    "title": "Exam Tip: Transforming Vague Goals into Testable Requirements",
                    "text": "Vague Goal: 'The Mentcare system shall be easy for clinic staff to use.' -> Testable NFR: 'Experienced psychiatric nurses shall be able to register a new patient and record diagnostic notes within 90 seconds after undergoing no more than 2 hours of system training, with an error rate of less than 1%.'"
                }
            },
            {
                "id": "elicitation-techniques",
                "title": "2.3 Requirements Elicitation: Interviews, Ethnography & Scenarios",
                "content": """### 🎯 Core Intuition ("The Detective and the Anthropologist")
When detectives investigate a complex crime, they don't just email a generic questionnaire to witnesses. Witnesses forget details, misinterpret what they saw, or use confusing slang. Detectives interview people face-to-face, observe the physical crime scene, and reconstruct the timeline step-by-step. 

Similarly, software engineers cannot just ask customers: *"Tell me your requirements."* Users often don't know what modern software can do, or they take their own expert knowledge for granted (**tacit knowledge**). Requirements elicitation combines direct interviewing with observational anthropology (**ethnography**) and real-life story walkthroughs.

---

### 📚 The Four Steps of the Requirements Elicitation Cycle
1. **Requirements Discovery:** Interacting with stakeholders to discover their workflows, system expectations, and operational bottlenecks.
2. **Requirements Classification & Organization:** Grouping unstructured requirements into cohesive functional clusters and architectural subsystems.
3. **Prioritization & Negotiation:** Resolving inevitable conflicts between stakeholders (e.g., marketing wants 50 new features; finance limits the budget; compliance demands strict security).
4. **Requirements Specification:** Formalizing the negotiated agreements into drafts of the SRS document.

---

### 🎙️ Elicitation Techniques Compared

#### 1. Stakeholder Interviewing
- **Closed Interviews:** The requirements engineer asks a predefined set of specific questions. (Good for gathering structured data; poor for discovering unexpected workflows).
- **Open Interviews:** Open-ended conversational exploration without a rigid agenda. (Excellent for exploring problem domain nuances).
- **Why Interviews Often Fail (Exam Question):**
  - *Domain Jargon Barrier:* Clinicians use medical acronyms that engineers don't grasp; engineers use tech jargon that clinicians don't understand.
  - *Tacit Knowledge Problem:* Experts perform routine daily tasks automatically without conscious thought. They forget to mention crucial rules because *"everyone knows that!"*
  - *Organizational Politics:* Stakeholders may deliberately withhold information or exaggerate needs to protect departmental budgets or power dynamics.

#### 2. Ethnography (Social & Observational Immersion)
- An analyst immerses themselves directly in the working environment where the system will be deployed, observing day-to-day work practices without intervening.
- **Unique Strength:** Discovers the gap between official corporate procedure manuals and how work is *actually done* in practice. Uncovers tacit knowledge, social informal workflows, and collaborative work patterns.
- **Scope & Limitations:** Very effective for understanding existing social ecosystems; but ineffective for discovering brand-new innovation features or identifying architectural constraints.
- **Focused Ethnography:** Combining ethnography with rapid prototyping to validate observed workflows immediately with working software mockups.

#### 3. Stories and Scenarios (The iLearn Classroom Case Study)
- Instead of abstract bullet points, elicitation utilizes real-life concrete stories.
- *The iLearn Scenario from Course Slides:*
  - *User Story:* A teacher wants to share photos of a field trip with a classroom of students.
  - *Scenario Walkthrough:* The teacher uploads photos from an SD card; the system automatically generates thumbnails; the system prompts for privacy tags; students view photos on shared tablets with read-only permissions.
  - *Outcome:* Immediately exposes missing functional requirements (e.g., photo compression, thumbnail generation, parental consent tags).""",
                "table": {
                    "headers": ["Elicitation Method", "Primary Mechanism", "Greatest Advantage", "Critical Weakness"],
                    "rows": [
                        ["Closed Interviews", "Rigid questionnaire", "Fast, structured, quantifiable responses", "Misses unforeseen requirements and unstated assumptions"],
                        ["Open Interviews", "Exploratory dialog", "Uncovers unexpected nuances and user sentiment", "Easily derailed; difficult to formalize and compare"],
                        ["Ethnography", "Direct passive workplace observation", "Discovers tacit knowledge and real operational workarounds", "Time-consuming; cannot invent novel future features"],
                        ["Scenarios & Stories", "End-to-end narrative walkthroughs", "Concrete, relatable, easily understood by non-technical users", "May overlook rare catastrophic edge cases"]
                    ]
                },
                "callout": {
                    "type": "pine",
                    "title": "Exam Definition: Tacit Knowledge",
                    "text": "Tacit Knowledge is deep operational and organizational knowledge possessed by expert practitioners that is so ingrained through habit and intuition that they cannot readily articulate or formalize it in interviews. Ethnography is the primary SE technique used to uncover tacit knowledge."
                }
            },
            {
                "id": "specification-techniques",
                "title": "2.4 Specification Styles: Structured Templates, Decision Tables & Use Cases",
                "content": """### 🎯 Core Intuition ("From Vague Poetry to Legal Contracts")
If you write a contract saying: *"Party A will give Party B some money when the work is pretty good,"* you will end up in court. Natural language is poetic, rich, and full of double meanings. But computers have zero common sense. A compiler cannot interpret *"the system should respond quickly when busy."* We need structured forms, decision tables, and use case diagrams to eliminate all linguistic ambiguity.

---

### 📚 Requirements Specification Styles

#### 1. Natural Language Specification & Rules of Discipline
Natural language is universally expressive and understood by all stakeholders, but suffers from three lethal flaws:
1. **Linguistic Ambiguity:** Words like *"simultaneously"*, *"user-friendly"*, or *"robust"* mean different things to different readers.
2. **Requirements Confusion:** Functional requirements, non-functional constraints, and design goals get mixed together in single run-on sentences.
3. **Requirements Amalgamation:** Several distinct requirements are bundled into one massive paragraph, making verification impossible.

#### Mandatory Guidelines for Writing Clean Requirements:
- Use standard phrasing:
  - **`shall`** denotes a **mandatory** contract requirement.
  - **`should`** denotes a **desirable** but optional preference.
- Use active voice (*"The system shall validate..."* instead of *"Validation will be performed..."*).
- Define technical terms and domain acronyms in a formal project Glossary.

---

### 💉 Structured Natural Language: The Insulin Pump Example
The lecture slides showcase a life-critical medical system: **The Microprocessor-Controlled Insulin Pump**. It uses a structured form-based specification template:

```
Function: Compute and Inject Insulin Dose
Description: Computes the dosage of insulin to be delivered when current blood 
             sugar is measured, taking into account current level and rate of change.
Inputs: Current blood sugar level (mg/dL), previous blood sugar level, 
        time elapsed since last measurement (minutes).
Source: Subcutaneous micro-sensor.
Outputs: Pump actuator signal (micro-pulses).
Destination: Insulin delivery needle actuator.
Action: Compute rate of change: (Current_Sugar - Previous_Sugar) / Elapsed_Time.
        If sugar is rising rapidly, calculate bolus dose.
        If sugar is within safe zone (80-120 mg/dL), deliver basal background dose.
        If sugar is falling (< 70 mg/dL), deliver ZERO dose to prevent hypoglycemic shock.
Requires: Real-time clock reading, reservoir level > 10 units.
Precondition: Sensor signal must pass CRC checksum verification.
Postcondition: Reservoir level decremented by injected units; log entry created.
Side Effects: None.
```

---

### 📊 Tabular Specification for Complex Decision Logic
When system behavior involves multiple interacting conditional variables, prose becomes unreadable. The lecture slides mandate **Tabular Specifications**:""",
                "table": {
                    "headers": ["Condition: Blood Sugar Trend", "Condition: Absolute Sugar Level", "Actuator Output / System Action"],
                    "rows": [
                        ["Falling Rapidly (> 2 mg/dL/min)", "Any Level", "Deliver ZERO dose (actuator locked) to prevent fatal hypoglycemia"],
                        ["Falling Slowly", "< 80 mg/dL", "Deliver ZERO dose; sound alert chime"],
                        ["Stable (Rate ≈ 0)", "80 mg/dL - 120 mg/dL (Normal)", "Deliver standard basal maintenance dose (0.5 units/hr)"],
                        ["Rising Slowly (1 - 2 mg/dL/min)", "120 mg/dL - 180 mg/dL", "Deliver standard basal dose + 1 unit correction bolus"],
                        ["Rising Rapidly (> 2 mg/dL/min)", "> 180 mg/dL (Hyperglycemic)", "Deliver maximum computed bolus dose (up to 4.0 units); log medical alert"]
                    ]
                },
                "callout": {
                    "type": "amber",
                    "title": "Exam Tip: Tabular Specifications Guarantee Completeness",
                    "text": "Why do engineers use tables for conditional logic? Because tables force you to account for every single permutation of inputs. If a cell in the table is empty, you immediately spot a missing requirement before writing code!"
                }
            },
            {
                "id": "validation-evolution",
                "title": "2.5 Requirements Validation, Traceability & The IEEE 830 Standard",
                "content": """### 🎯 Core Intuition ("The Stamp of Legal Approval")
Imagine buying a plot of land. Before you hand over $500,000, you have a land surveyor verify the boundary markers, a title company verify zero outstanding liens, and a city zoning officer confirm you are legally allowed to build there. That is **Requirements Validation**. Once approved, if the buyer later says *"Actually, make the property 50 feet wider,"* you don't just move the fence overnight; you convene a formal review, evaluate the legal impact, and issue an amendment. That is **Change Management**.

---

### 📚 The Five Crucial Requirements Validation Checks
During formal requirements validation, the SRS is subjected to five rigorous verification criteria:
1. **Validity Check:** Does the system provide the exact capabilities that truly support the customer's operational needs?
2. **Consistency Check:** Are there any conflicting or mutually contradictory statements across requirements?
3. **Completeness Check:** Does the document define all required functions and system constraints, including error recovery for every failure mode?
4. **Realism Check:** Given existing technology, hardware constraints, allocated budget, and deadline, can this system realistically be implemented?
5. **Verifiability Check:** Can an objective, unambiguous test case be engineered by an independent QA team to prove that the software fulfills this requirement?

#### Validation Techniques:
- **Requirements Reviews / Inspections:** Multidisciplinary team (client, architect, tester, domain expert) reads the document line-by-line using formal review checklists.
- **Prototyping:** Validating user interaction workflows with dynamic mockups.
- **Automated Test-Case Generation:** If a requirement cannot be translated into a concrete automated test case, it is automatically flagged as ambiguous and rejected.

---

### 📄 The IEEE 830 Standard Structure for SRS Documents
A standard 10-mark exam question asks: *"Detail the IEEE 830 recommended structure for a Software Requirements Specification document."*
1. **1. Introduction**
   - 1.1 Purpose of the document
   - 1.2 Scope of the product
   - 1.3 Definitions, Acronyms, and Abbreviations
   - 1.4 References
   - 1.5 Overview of the document
2. **2. Overall Description**
   - 2.1 Product Perspective (System interfaces, user interfaces, hardware interfaces, software interfaces, communication interfaces)
   - 2.2 Product Functions (High-level summary of capabilities)
   - 2.3 User Characteristics (Expected technical competence of end users)
   - 2.4 General Constraints (Regulatory policies, hardware limitations, audit logs)
   - 2.5 Assumptions and Dependencies
3. **3. Specific Requirements (The Core Technical Body)**
   - Functional requirements organized by module, actor, or stimulus
   - Performance requirements (latency, throughput)
   - Design constraints (programming languages, database engines)
   - Software system attributes (reliability, availability, security, maintainability)
4. **Appendices & Index** (Data models, input/output schemas)

---

### 🔗 Traceability Matrices & Change Control Boards (CCB)
Requirements are never static; business environments evolve continuously. Uncontrolled requirements changes are called **Feature Creep** and represent the #1 killer of software projects.

#### The Traceability Matrix:
A bidirectional matrix that maps every single business requirement to its corresponding downstream engineering artifacts:
- **Forward Traceability:** SRS Requirement $R_{104} \\to$ Design Module $M_{22} \\to$ Code Class `BillingService.ts` $\\to$ Unit Test `TestBilling.ts`. (Verifies that no requirement is accidentally omitted from code).
- **Backward Traceability:** Code Line 452 in `BillingService.ts` $\\to$ Design Module $M_{22} \\to$ Requirement $R_{104}$. (Verifies that developers do not introduce unauthorized 'gold-plating' code that wasn't requested).

#### Change Control Board (CCB) Workflow:
1. Stakeholder submits formal **Change Request (CR)**.
2. Analysts conduct **Impact Analysis** using the Traceability Matrix (determines which modules, tests, schedules, and budgets are impacted).
3. CCB formally evaluates costs vs. benefits: **Approve**, **Reject**, or **Defer**.
4. If approved, SRS, design diagrams, code, and test cases are updated concurrently.""",
                "table": {
                    "headers": ["Step in Change Management", "Responsible Role", "Action Taken", "Deliverable Output"],
                    "rows": [
                        ["1. Change Initiation", "Customer / Stakeholder", "Submits formal Change Request", "Change Request Form (CRF)"],
                        ["2. Impact Analysis", "System Architect / Lead Analyst", "Traces dependencies across design & code; estimates cost & schedule delay", "Impact Assessment Report"],
                        ["3. Decision & Approval", "Change Control Board (CCB)", "Convenes review; evaluates ROI against project constraints", "Formal Approval / Rejection Notice"],
                        ["4. Implementation & Audit", "Development & QA Team", "Concurrently updates SRS, code, test suites, and traceability links", "Updated Version-Controlled Artifacts"]
                    ]
                },
                "callout": {
                    "type": "pine",
                    "title": "Exam Mnemonic: 5 Validation Checks",
                    "text": "Remember: 'V-C-C-R-V' -> Validity, Consistency, Completeness, Realism, Verifiability. In viva exams, professors always ask: 'What makes a requirement unverifiable?' Answer: Subjective words like 'fast', 'secure', 'modular', or 'user-friendly' without numerical metrics!"
                }
            }
        ]
    }
