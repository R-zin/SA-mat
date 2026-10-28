"use client";

import React, { useState } from "react";
import { Layers, Database, Cpu, GitFork, ArrowDown, ArrowRight, Check, AlertTriangle, RefreshCw } from "lucide-react";

type ArchPatternKey = "layered" | "repository" | "pipe-filter" | "client-server" | "mvc" | "microservices";

interface ArchPatternInfo {
  key: ArchPatternKey;
  title: string;
  subtitle: string;
  icon: any;
  invariants: string[];
  pros: string[];
  cons: string[];
  diagram: React.ReactNode;
  matrix: {
    agility: string;
    deployment: string;
    performance: string;
    faultIsolation: string;
    testability: string;
  };
}

export default function ArchitectureDiagrams() {
  const [activeTab, setActiveTab] = useState<ArchPatternKey>("layered");

  const patterns: Record<ArchPatternKey, ArchPatternInfo> = {
    layered: {
      key: "layered",
      title: "Layered (N-Tier) Architecture",
      subtitle: "Horizontal separation of concerns with hierarchical downward invocation",
      icon: Layers,
      invariants: [
        "Closed Layering Invariant: A component in Layer N may only invoke services in Layer N-1.",
        "Zero Upward Dependency: Lower layers have zero runtime or compile-time knowledge of higher layers.",
        "Independent Interchangeability: Any layer can be reimplemented as long as its public interface remains stable.",
      ],
      pros: [
        "High testability: Mocking boundaries align precisely with layer interfaces.",
        "Clean conceptual model: Engineers easily locate domain code vs persistence code.",
        "Standardized enterprise adoption across traditional software stacks.",
      ],
      cons: [
        "Sinkhole Anti-Pattern: Requests pass through multiple layers without business enrichment.",
        "Monolithic deployment coupling: Changes to data layer require redeploying the entire bundle.",
      ],
      matrix: {
        agility: "Low (Coupled release cycles)",
        deployment: "Very High (Single unified artifact)",
        performance: "Medium (Call-stack overhead)",
        faultIsolation: "Low (Uncaught crash takes down process)",
        testability: "High (Clean interface mocks)",
      },
      diagram: (
        <div className="space-y-3 max-w-md mx-auto py-2">
          <div className="p-3 bg-white dark:bg-nordic-darkSurface border border-nordic-hairline dark:border-nordic-hairlineDark rounded text-center">
            <span className="font-mono text-xs font-bold text-nordic-spruce dark:text-white block">Presentation Layer</span>
            <span className="text-[11px] text-nordic-slate">UI Rendering, HTTP/REST/gRPC Ingress, Controllers</span>
          </div>
          <div className="flex justify-center text-nordic-pine">
            <ArrowDown className="w-4 h-4" />
          </div>
          <div className="p-3 bg-nordic-pineBg border-2 border-nordic-pine/50 rounded text-center">
            <span className="font-mono text-xs font-bold text-nordic-pine dark:text-green-300 block">Business Logic Domain Layer</span>
            <span className="text-[11px] text-nordic-spruce dark:text-gray-300">Pure State Invariants, Domain Services, Validation Rules</span>
          </div>
          <div className="flex justify-center text-nordic-pine">
            <ArrowDown className="w-4 h-4" />
          </div>
          <div className="p-3 bg-white dark:bg-nordic-darkSurface border border-nordic-hairline dark:border-nordic-hairlineDark rounded text-center">
            <span className="font-mono text-xs font-bold text-nordic-spruce dark:text-white block">Data Persistence Layer</span>
            <span className="text-[11px] text-nordic-slate">SQL/NoSQL Repositories, File Systems, Object Caches</span>
          </div>
        </div>
      ),
    },
    repository: {
      key: "repository",
      title: "Repository / Blackboard Pattern",
      subtitle: "Centralized data store accessed by independent cooperating sub-systems",
      icon: Database,
      invariants: [
        "Single Source of Truth: All shared state is strictly mediated through the central repository.",
        "Decoupled Clients: Sub-systems interact with the repository, never directly with each other.",
        "Passive or Active: Active blackboard alerts agents when relevant data changes.",
      ],
      pros: [
        "Efficient large data sharing without passing huge state objects across networks.",
        "Easy integration of new analysis modules (e.g. IDE plugins, lint tools, code formatters).",
      ],
      cons: [
        "Single Point of Failure: Corrupting or bottlenecking the central repository brings down all agents.",
        "Complex schema evolution: Altering repository data model forces updates across all clients.",
      ],
      matrix: {
        agility: "Medium (Shared schema changes)",
        deployment: "Medium (Clients can deploy independently)",
        performance: "High for memory; Bottleneck for disk",
        faultIsolation: "Low for data store; High for agents",
        testability: "Medium (Requires repository fixtures)",
      },
      diagram: (
        <div className="py-2 text-center">
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="p-2 border border-nordic-hairline dark:border-nordic-hairlineDark rounded bg-white dark:bg-nordic-darkSurface text-xs font-mono">
              Syntax Parser
            </div>
            <div className="p-2 border border-nordic-hairline dark:border-nordic-hairlineDark rounded bg-white dark:bg-nordic-darkSurface text-xs font-mono">
              Type Checker
            </div>
            <div className="p-2 border border-nordic-hairline dark:border-nordic-hairlineDark rounded bg-white dark:bg-nordic-darkSurface text-xs font-mono">
              Code Generator
            </div>
          </div>
          <div className="flex justify-center text-nordic-slate text-xs mb-2">
            ↕ Shared Memory / Transactional Access ↕
          </div>
          <div className="p-4 bg-nordic-amber/10 border-2 border-nordic-amber/40 rounded-lg max-w-sm mx-auto">
            <div className="font-mono text-xs font-bold text-nordic-amber mb-1">Central Repository (AST / Symbol Table)</div>
            <div className="text-[11px] text-nordic-slate">Persistent Central Schema &amp; Transaction Controller</div>
          </div>
        </div>
      ),
    },
    "pipe-filter": {
      key: "pipe-filter",
      title: "Pipe and Filter Architecture",
      subtitle: "Stream transformations where output of one filter feeds input of next",
      icon: RefreshCw,
      invariants: [
        "Independent Filters: Each filter is an autonomous processing unit with no knowledge of predecessors or successors.",
        "Standardized Connector: Pipes buffer and transmit byte streams without semantic modifications.",
      ],
      pros: [
        "Natural concurrency: Filters can run in parallel on separate CPU cores.",
        "Extreme reusability: Filters can be reordered and recombined easily.",
      ],
      cons: [
        "Data parsing overhead: Each filter serializes and deserializes stream data.",
        "Poor interactive UI fit: Ill-suited for systems needing frequent bidirectional user queries.",
      ],
      matrix: {
        agility: "High (Easily swap filters)",
        deployment: "High (Standalone filter binaries)",
        performance: "Very High for streaming; Latency for small batches",
        faultIsolation: "High (Crashes isolated to pipe boundaries)",
        testability: "Very High (Feed synthetic stream into filter)",
      },
      diagram: (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 py-4">
          <div className="p-3 border border-nordic-hairline dark:border-nordic-hairlineDark rounded bg-white dark:bg-nordic-darkSurface text-center font-mono text-xs">
            [Raw Stream]
          </div>
          <ArrowRight className="w-4 h-4 text-nordic-pine hidden sm:block" />
          <div className="p-3 bg-nordic-pineBg border border-nordic-pine rounded text-center font-mono text-xs text-nordic-pine font-bold">
            Filter 1: Lexer
          </div>
          <ArrowRight className="w-4 h-4 text-nordic-pine hidden sm:block" />
          <div className="p-3 bg-nordic-pineBg border border-nordic-pine rounded text-center font-mono text-xs text-nordic-pine font-bold">
            Filter 2: Parser
          </div>
          <ArrowRight className="w-4 h-4 text-nordic-pine hidden sm:block" />
          <div className="p-3 border border-nordic-hairline dark:border-nordic-hairlineDark rounded bg-white dark:bg-nordic-darkSurface text-center font-mono text-xs">
            [Optimized Output]
          </div>
        </div>
      ),
    },
    "client-server": {
      key: "client-server",
      title: "Client-Server Pattern",
      subtitle: "Decoupled service providers and service consumers over network protocols",
      icon: Cpu,
      invariants: [
        "Server Independence: Server operates continuously, unaware of specific client identities until contacted.",
        "Stateless / Stateful: Protocol defines session lifecycle.",
      ],
      pros: [
        "Centralized administration of security, database backups, and licensing.",
        "Heterogeneous clients (iOS, Android, Web, CLI) can consume the same server API.",
      ],
      cons: [
        "Network latency and serialization overhead.",
        "Server represents a single performance bottleneck unless scaled horizontally.",
      ],
      matrix: {
        agility: "High (Client and server evolved independently)",
        deployment: "High (Separated delivery pipelines)",
        performance: "Medium (Dependent on network QoS)",
        faultIsolation: "High (Client crash does not affect server)",
        testability: "High (Contract testing with OpenAPI)",
      },
      diagram: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center py-2 max-w-lg mx-auto">
          <div className="space-y-2">
            <div className="p-2 border border-nordic-hairline dark:border-nordic-hairlineDark rounded bg-white dark:bg-nordic-darkSurface text-center font-mono text-xs">
              Web Client
            </div>
            <div className="p-2 border border-nordic-hairline dark:border-nordic-hairlineDark rounded bg-white dark:bg-nordic-darkSurface text-center font-mono text-xs">
              Mobile App
            </div>
          </div>
          <div className="text-center font-mono text-xs text-nordic-slate">
            ➔ HTTPS / REST ➔<br />
             JSON Payload 
          </div>
          <div className="p-4 bg-nordic-frost dark:bg-nordic-darkSurfaceElevated border-2 border-nordic-polar rounded-lg text-center">
            <div className="font-mono text-xs font-bold text-nordic-spruce dark:text-white">API Server Cluster</div>
            <div className="text-[10px] text-nordic-slate">Load Balancer + Auth + DB</div>
          </div>
        </div>
      ),
    },
    mvc: {
      key: "mvc",
      title: "Model-View-Controller (MVC)",
      subtitle: "Decoupling internal domain representation from presentation and user gestures",
      icon: GitFork,
      invariants: [
        "Model Independence: Model has zero dependency on View or Controller.",
        "Controller Mediation: User events route to controller, which alters Model state.",
      ],
      pros: [
        "Multiple simultaneous views of the same model state (e.g. Table View and Pie Chart).",
        "Frontend designers work on Views without modifying backend Model classes.",
      ],
      cons: [
        "Complexity overhead for small, simple input screens.",
        "Views can become tightly coupled to model property shapes.",
      ],
      matrix: {
        agility: "High for UI redesigns",
        deployment: "Medium",
        performance: "High",
        faultIsolation: "Medium",
        testability: "Very High (Model and Controller tested headless)",
      },
      diagram: (
        <div className="py-2 text-center max-w-sm mx-auto space-y-3">
          <div className="p-2.5 bg-white dark:bg-nordic-darkSurface border border-nordic-hairline dark:border-nordic-hairlineDark rounded font-mono text-xs">
            User Action ➔ [ Controller ]
          </div>
          <div className="flex justify-between items-center px-4 font-mono text-xs text-nordic-slate">
            <span>Updates ➔</span>
            <span> Renders</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-nordic-pineBg border border-nordic-pine rounded font-mono text-xs text-nordic-pine font-bold">
              [ Model ]<br />
              <span className="text-[10px] text-nordic-slate font-normal">State &amp; Rules</span>
            </div>
            <div className="p-3 bg-white dark:bg-nordic-darkSurface border border-nordic-hairline dark:border-nordic-hairlineDark rounded font-mono text-xs text-nordic-spruce dark:text-white font-bold">
              [ View ]<br />
              <span className="text-[10px] text-nordic-slate font-normal">Visual Canvas</span>
            </div>
          </div>
        </div>
      ),
    },
    microservices: {
      key: "microservices",
      title: "Microservices Architecture",
      subtitle: "Decomposition into autonomous, independently deployable bounded-context services",
      icon: Cpu,
      invariants: [
        "Database-per-Service: No microservice directly accesses another service's internal database.",
        "API-Only Communication: Inter-service interaction occurs solely through published contracts (gRPC/REST/Kafka).",
      ],
      pros: [
        "Extreme deployment agility: Service teams deploy independently multiple times per day.",
        "Polyglot technology choices and granular horizontal autoscaling.",
      ],
      cons: [
        "Distributed data integrity: Eventual consistency, distributed transactions (Saga pattern required).",
        "High operational complexity (Service mesh, observability, distributed tracing).",
      ],
      matrix: {
        agility: "Extremely High (Autonomous team velocities)",
        deployment: "Complex (Requires Kubernetes / Orchestration)",
        performance: "Medium (Network hops between services)",
        faultIsolation: "Very High (Circuit breakers cap blast radius)",
        testability: "Medium (Requires contract & integration testing)",
      },
      diagram: (
        <div className="space-y-3 py-2 max-w-md mx-auto">
          <div className="p-2.5 bg-nordic-spruce dark:bg-black text-white rounded text-center font-mono text-xs font-bold">
            [ API Gateway / Ingress Router ]
          </div>
          <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
            <div className="p-2 border border-nordic-pine rounded bg-nordic-pineBg text-nordic-pine font-bold">
              Order Svc<br />
              <span className="text-[9px] text-nordic-slate block">SQL DB</span>
            </div>
            <div className="p-2 border border-nordic-pine rounded bg-nordic-pineBg text-nordic-pine font-bold">
              Payment Svc<br />
              <span className="text-[9px] text-nordic-slate block">Redis Cache</span>
            </div>
            <div className="p-2 border border-nordic-pine rounded bg-nordic-pineBg text-nordic-pine font-bold">
              Shipping Svc<br />
              <span className="text-[9px] text-nordic-slate block">NoSQL Doc</span>
            </div>
          </div>
          <div className="p-2 bg-nordic-frost dark:bg-nordic-darkSurfaceElevated border border-nordic-hairline dark:border-nordic-hairlineDark rounded text-center font-mono text-[11px] text-nordic-slate">
            Event Broker Bus (Apache Kafka / RabbitMQ Event Streams)
          </div>
        </div>
      ),
    },
  };

  const current = patterns[activeTab];

  return (
    <div className="bg-white dark:bg-nordic-darkSurface border border-nordic-hairline dark:border-nordic-hairlineDark rounded-lg shadow-sm my-6 overflow-hidden transition-all">
      {/* Pattern Tabs Header */}
      <div className="flex border-b border-nordic-hairline dark:border-nordic-hairlineDark bg-nordic-frost dark:bg-nordic-darkSurfaceElevated overflow-x-auto">
        {(Object.keys(patterns) as ArchPatternKey[]).map((key) => {
          const item = patterns[key];
          const Icon = item.icon;
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-3 text-xs font-mono font-semibold flex items-center gap-2 shrink-0 transition-colors border-b-2 ${
                isActive
                  ? "border-nordic-pine bg-white dark:bg-nordic-darkSurface text-nordic-pine dark:text-green-300"
                  : "border-transparent text-nordic-slate hover:text-nordic-spruce dark:hover:text-white hover:bg-nordic-hairline/20"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.title.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="font-serif text-xl font-bold text-nordic-spruce dark:text-gray-100">
            {current.title}
          </h3>
          <p className="text-xs text-nordic-slate mt-1">{current.subtitle}</p>
        </div>

        {/* Blueprint Visual Diagram */}
        <div className="p-5 rounded-lg border border-nordic-hairline dark:border-nordic-hairlineDark bg-nordic-frost dark:bg-nordic-darkSurfaceElevated nordic-grid-bg my-4">
          <div className="flex justify-between items-center text-[10px] font-mono text-nordic-slate mb-2">
            <span>ARCHITECTURAL TOPOLOGY SCHEMATIC</span>
            <span className="text-nordic-pine font-semibold">IEEE 1471 Viewpoint</span>
          </div>
          {current.diagram}
        </div>

        {/* Invariants & Rules */}
        <div className="my-4">
          <h4 className="text-xs font-mono uppercase tracking-wider text-nordic-slate font-bold mb-2">
            Structural Invariants &amp; Rules
          </h4>
          <ul className="space-y-1.5 text-xs text-nordic-spruce dark:text-gray-200">
            {current.invariants.map((inv, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-nordic-pine mt-1.5 shrink-0" />
                <span>{inv}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pros and Cons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <div className="p-3.5 rounded border border-nordic-pine/30 bg-nordic-pineBg dark:bg-nordic-pine/10">
            <span className="font-mono text-xs font-bold text-nordic-pine dark:text-green-300 flex items-center gap-1.5 mb-2">
              <Check className="w-4 h-4" /> Architectural Strengths
            </span>
            <ul className="space-y-1 text-xs text-nordic-spruce dark:text-gray-300">
              {current.pros.map((p, i) => (
                <li key={i}>• {p}</li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded border border-nordic-amber/30 bg-nordic-amber/5 dark:bg-nordic-amber/10">
            <span className="font-mono text-xs font-bold text-nordic-amber flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-4 h-4" /> Trade-Offs &amp; Risks
            </span>
            <ul className="space-y-1 text-xs text-nordic-spruce dark:text-gray-300">
              {current.cons.map((c, i) => (
                <li key={i}>• {c}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quality Attribute Matrix */}
        <div className="mt-4 pt-3 border-t border-nordic-hairline dark:border-nordic-hairlineDark">
          <div className="text-xs font-mono uppercase text-nordic-slate font-bold mb-2">
            Quality Attribute Scoring
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-mono">
            <div className="p-2 rounded bg-nordic-frost dark:bg-nordic-darkSurfaceElevated border border-nordic-hairline dark:border-nordic-hairlineDark">
              <span className="text-[10px] text-nordic-slate block">Agility</span>
              <span className="font-semibold text-nordic-spruce dark:text-white">{current.matrix.agility}</span>
            </div>
            <div className="p-2 rounded bg-nordic-frost dark:bg-nordic-darkSurfaceElevated border border-nordic-hairline dark:border-nordic-hairlineDark">
              <span className="text-[10px] text-nordic-slate block">Deployment</span>
              <span className="font-semibold text-nordic-spruce dark:text-white">{current.matrix.deployment}</span>
            </div>
            <div className="p-2 rounded bg-nordic-frost dark:bg-nordic-darkSurfaceElevated border border-nordic-hairline dark:border-nordic-hairlineDark">
              <span className="text-[10px] text-nordic-slate block">Performance</span>
              <span className="font-semibold text-nordic-spruce dark:text-white">{current.matrix.performance}</span>
            </div>
            <div className="p-2 rounded bg-nordic-frost dark:bg-nordic-darkSurfaceElevated border border-nordic-hairline dark:border-nordic-hairlineDark">
              <span className="text-[10px] text-nordic-slate block">Fault Isolation</span>
              <span className="font-semibold text-nordic-spruce dark:text-white">{current.matrix.faultIsolation}</span>
            </div>
            <div className="p-2 rounded bg-nordic-frost dark:bg-nordic-darkSurfaceElevated border border-nordic-hairline dark:border-nordic-hairlineDark col-span-2 sm:col-span-1">
              <span className="text-[10px] text-nordic-slate block">Testability</span>
              <span className="font-semibold text-nordic-pine dark:text-green-300">{current.matrix.testability}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
