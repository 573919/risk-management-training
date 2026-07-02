import type { ReactNode } from "react";

export interface Section {
  title: string;
  label?: string;
  variant?: "hero" | "accent" | "dark" | "default" | "break";
  body: ReactNode;
}

// Navigation sections displayed in the top breadcrumb bar.
// Each section's `id` should match the `label` field on the first slide in that section.
export const NAV_SECTIONS: { id: string; long: string }[] = [
  { id: "Overview", long: "Overview" },
  { id: "Roles", long: "Roles & Responsibilities" },
  { id: "RiskTypes", long: "Risk Types" },
  { id: "Procedures", long: "Risk Procedures" },
  { id: "Register", long: "Risk Register" },
  { id: "Escalation", long: "Escalation" },
  { id: "Training", long: "Training" },
  { id: "Reporting", long: "Reporting" },
  { id: "Appendix", long: "Appendices" },
];

// Skill-generated content goes here.
// Run create-react-presentation to populate this file from your spec.
export const sections: Section[] = [
  {
    title: "OCIO Enterprise Risk Management Framework",
    label: "Overview",
    variant: "hero",
    body: (
      <>
        <p className="slide-subtitle">
          Detailed Section Version | September 23, 2025 | Entrusted Classification
        </p>
        <p>
          Built from the 09/23/2025 OCIO framework source to support role-based
          execution of identification, assessment, mitigation, escalation,
          reporting, and continuous improvement.
        </p>
        <div className="graphic-strip">
          <div className="graphic-pill">Enterprise Scope</div>
          <div className="graphic-pill">Role Accountability</div>
          <div className="graphic-pill">Standard Procedures</div>
          <div className="graphic-pill">Continuous Monitoring</div>
        </div>
      </>
    ),
  },
  {
    title: "Section 1: Framework Overview",
    variant: "accent",
    body: (
      <ul>
        <li>Defines OCIO’s systematic model for identifying, assessing, mitigating, and escalating risk.</li>
        <li>Connects risk management to operational resilience across IT and business outcomes.</li>
        <li>Combines governance, procedures, and process controls into one integrated framework.</li>
        <li>Establishes a shared operating language for risk across all OCIO branches.</li>
      </ul>
    ),
  },
  {
    title: "Purpose, Authority, and Scope",
    variant: "default",
    body: (
      <ul>
        <li>Purpose: protect sensitive data, ensure service continuity, and sustain policy compliance.</li>
        <li>Authority: framework is authorized by OCIO to guide federal leads and stakeholders.</li>
        <li>Scope: applies to all NSF OCIO systems, applications, networks, and personnel.</li>
        <li>Outcome: proactive decision-making that minimizes disruption to government services.</li>
      </ul>
    ),
  },
  {
    title: "Section 2: Roles and Responsibilities",
    label: "Roles",
    variant: "break",
    body: (
      <p>
        Effective enterprise risk management depends on clear accountability from
        CIO through governance boards, Branch Chiefs, and Risk Owners.
      </p>
    ),
  },
  {
    title: "CIO Accountabilities",
    variant: "default",
    body: (
      <>
        <ul>
          <li>Sets risk tone for ownership, awareness, and transparency across IT and business.</li>
          <li>Approves organizational risk appetite and risk tolerance boundaries.</li>
          <li>Aligns risk posture to mission objectives, strategy, and regulatory context.</li>
          <li>Reviews enterprise risk profile and communicates key risks to governance and ELT.</li>
        </ul>
        <div className="tile-grid cols-2">
          <div className="tile-card">
            <h4>Strategic Alignment</h4>
            <p>Connect risk posture to mission outcomes and enterprise priorities.</p>
          </div>
          <div className="tile-card">
            <h4>Risk Appetite</h4>
            <p>Set tolerance boundaries for governance trade-off decisions.</p>
          </div>
          <div className="tile-card">
            <h4>Executive Communication</h4>
            <p>Surface high-consequence risks to ELT and governance boards.</p>
          </div>
          <div className="tile-card">
            <h4>Oversight</h4>
            <p>Validate accountability is embedded across IT functions.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Governance Board Responsibilities",
    variant: "default",
    body: (
      <ul>
        <li>Enterprise IT Governance Board addresses escalated IT risks, issues, and corrective plans.</li>
        <li>EITGB sets IT direction, priorities, and enterprise initiative alignment to NSF strategy.</li>
        <li>Business Demand Governance Board evaluates risks tied to mission needs and valid demand.</li>
        <li>BDGB decision authority is with CMO and CSO for business-priority alignment.</li>
      </ul>
    ),
  },
  {
    title: "OCIO Risk Governance Lead Responsibilities",
    variant: "default",
    body: (
      <ul>
        <li>Maintains risk categories, definitions, scoring methods, and matrix guidance.</li>
        <li>Owns centralized risk register oversight and risk dashboard/profile coordination.</li>
        <li>Facilitates risk workshops and highlights cross-cutting enterprise risk trends.</li>
        <li>Promotes risk-aware culture through templates, communication, and role training.</li>
      </ul>
    ),
  },
  {
    title: "Branch Chiefs and Risk Owners",
    variant: "default",
    body: (
      <ul>
        <li>Branch Chiefs are first escalation point for moderate and higher risks.</li>
        <li>Branch Chiefs validate mitigation sufficiency and escalate high/critical with full context.</li>
        <li>Risk Owners identify, assess, document, monitor, and update risks continuously.</li>
        <li>Risk Owners self-manage low risks and elevate moderate/high for tolerance trade-offs.</li>
      </ul>
    ),
  },
  {
    title: "Section 3: Risk Types and Governing Bodies",
    label: "RiskTypes",
    variant: "break",
    body: (
      <p>
        OCIO uses a defined taxonomy of risk types with governance ownership to
        ensure consistent evaluation and escalation pathways.
      </p>
    ),
  },
  {
    title: "Risk Type Catalog",
    variant: "accent",
    body: (
      <>
        <ul>
          <li>Includes budget, schedule, scope, quality, personnel, and change management risks.</li>
          <li>Includes compliance, security, operational, technology obsolescence, and data risks.</li>
          <li>Includes governance, strategic, policy, reputational, fraud, and financial risks.</li>
          <li>Includes vendor and third-party dependency risk for external delivery exposure.</li>
        </ul>
        <div className="icon-band">
          <div className="icon-node"><span>CP</span><p>Compliance</p></div>
          <div className="icon-node"><span>SC</span><p>Security</p></div>
          <div className="icon-node"><span>FN</span><p>Financial</p></div>
          <div className="icon-node"><span>OP</span><p>Operational</p></div>
          <div className="icon-node"><span>TP</span><p>Vendor</p></div>
        </div>
      </>
    ),
  },
  {
    title: "Shared Governing Body Logic",
    variant: "default",
    body: (
      <ul>
        <li>Compliance and security are primarily IT-governed, with BDGB engaged for mission impact.</li>
        <li>Financial and reputational risks are primarily BDGB-governed due enterprise consequence.</li>
        <li>Personnel and policy ownership depends on mission versus IT-specific impact profile.</li>
        <li>Cross-board engagement is required when risk affects both mission execution and IT posture.</li>
      </ul>
    ),
  },
  {
    title: "Section 4: Standardized Risk Procedures",
    label: "Procedures",
    variant: "break",
    body: (
      <p>
        Standardized procedures are applied enterprise-wide: identify, assess,
        prioritize, respond, implement, and continuously monitor.
      </p>
    ),
  },
  {
    title: "Standard Procedure Step 1: Identify",
    variant: "default",
    body: (
      <ul>
        <li>Identify potential undesired outcomes and opportunities using structured methods.</li>
        <li>Use audits, threat intelligence, vulnerability scans, and threat modeling.</li>
        <li>Review prior incidents for recurrence patterns and latent systemic weaknesses.</li>
        <li>Capture cyber, hardware, software, and skills-gap threats at early stages.</li>
      </ul>
    ),
  },
  {
    title: "Standard Procedure Step 2: Assess",
    variant: "default",
    body: (
      <ul>
        <li>Analyze causes, sources, likelihood, and positive or negative consequences.</li>
        <li>Categorize by type using Appendix A risk-type guidance.</li>
        <li>Determine probability with Appendix B and impact with Appendix C scales.</li>
        <li>Use assessment outputs to inform risk appetite and response options.</li>
      </ul>
    ),
  },
  {
    title: "Standard Procedure Steps 3-4: Prioritize and Respond",
    variant: "default",
    body: (
      <ul>
        <li>Rank risk severity using Appendix D risk values and heat map analysis.</li>
        <li>Focus on threats causing downtime, data breaches, or compliance violations.</li>
        <li>Choose strategy: Mitigate, Avoid, Transfer, or Accept based on tolerance.</li>
        <li>Document selected strategy with rationale, owners, and expected outcomes.</li>
      </ul>
    ),
  },
  {
    title: "Standard Procedure Steps 5-6: Implement and Monitor",
    variant: "default",
    body: (
      <>
        <ul className="stacked">
          <li>Execute updates, training, controls, and contingency measures by timeline.</li>
          <li>Assign clear responsibility and track action progress to completion.</li>
          <li>Monitor using intrusion detection, log analysis, cloud metrics, and anomaly alerts.</li>
          <li>Reassess controls regularly and update risk posture for emerging threats.</li>
        </ul>
        <div className="process-flow">
          <div className="flow-step"><strong>Plan</strong><p>Define actions and ownership.</p></div>
          <div className="flow-arrow">→</div>
          <div className="flow-step"><strong>Execute</strong><p>Implement controls and tasks.</p></div>
          <div className="flow-arrow">→</div>
          <div className="flow-step"><strong>Observe</strong><p>Monitor signals and behavior.</p></div>
          <div className="flow-arrow">→</div>
          <div className="flow-step"><strong>Adapt</strong><p>Reassess and improve posture.</p></div>
        </div>
      </>
    ),
  },
  {
    title: "Sample Monitoring Measures in Framework",
    variant: "accent",
    body: (
      <ul>
        <li>Security vulnerability alerts and automated patching workflows.</li>
        <li>Operational monitoring with CloudWatch, AppDynamics, and AWS Config.</li>
        <li>User behavior analytics and anomaly detection through SIEM tooling.</li>
        <li>Disaster recovery readiness, Zero Trust controls, and AI-enabled risk analytics.</li>
      </ul>
    ),
  },
  {
    title: "Section 5: Risk Register",
    label: "Register",
    variant: "break",
    body: (
      <p>
        Minimum register data requirements ensure transparency, comparability,
        and reviewability across all OCIO risks.
      </p>
    ),
  },
  {
    title: "Required Risk Register Fields",
    variant: "default",
    body: (
      <>
        <ul>
          <li>Risk statement, impact, description, mitigation/action, contingency/closure criteria.</li>
          <li>Date identified, possible impact date, probability, impact, and derived risk rating.</li>
          <li>Federal risk-owner review workflow for project/initiative relevance.</li>
          <li>Updates include new developments, mitigation progress, reassessment, and closure rationale.</li>
        </ul>
        <div className="tile-grid cols-4">
          <div className="tile-card compact"><h4>Risk</h4><p>Cause and event clarity.</p></div>
          <div className="tile-card compact"><h4>Rating</h4><p>Probability + impact value.</p></div>
          <div className="tile-card compact"><h4>Actions</h4><p>Mitigation and contingency.</p></div>
          <div className="tile-card compact"><h4>Review</h4><p>Owner validation and closure.</p></div>
        </div>
      </>
    ),
  },
  {
    title: "Register Quality Standards",
    variant: "default",
    body: (
      <ul>
        <li>Risk statements must clearly explain what might happen and why it matters.</li>
        <li>Mitigation should define proactive controls, not generic intent.</li>
        <li>Closure requires evidence of response completion and lessons learned.</li>
        <li>Documentation should support transparency, auditability, and cross-team comparability.</li>
      </ul>
    ),
  },
  {
    title: "Section 6: Communication and Escalation",
    label: "Escalation",
    variant: "break",
    body: (
      <p>
        Risk escalation follows a value-based matrix to ensure governance action
        is proportional to exposure and mission impact.
      </p>
    ),
  },
  {
    title: "Escalation Matrix",
    variant: "default",
    body: (
      <>
        <ul className="stacked">
          <li>Low: managed by Risk Owner/Federal Lead at team or portfolio level.</li>
          <li>Medium: Branch Chiefs coordinate cross-OCIO mitigation and review trends.</li>
          <li>High: escalate to CIO and Enterprise IT Governance Board for tolerance/trade-off decisions.</li>
          <li>As needed: engage BDGB, NSF ELT, rapid response, and external reporting channels.</li>
        </ul>
        <div className="escalation-ladder">
          <div className="ladder-rung low"><span>Low</span><p>Team + Portfolio</p></div>
          <div className="ladder-rung med"><span>Medium</span><p>Branch Chief Review</p></div>
          <div className="ladder-rung high"><span>High</span><p>CIO + EITGB Decision</p></div>
        </div>
      </>
    ),
  },
  {
    title: "Escalation Channels by Value",
    variant: "default",
    body: (
      <ul>
        <li>Low: internal team forums and portfolio-level review cadence.</li>
        <li>Medium: Branch Chief meetings plus daily OCIO 9am dashboard reviews.</li>
        <li>High: senior staff governance meetings and urgent executive briefings.</li>
        <li>Critical external impact: ELT engagement and potential external reporting requirements.</li>
      </ul>
    ),
  },
  {
    title: "Section 7: Required ERM Training",
    label: "Training",
    variant: "accent",
    body: (
      <ul>
        <li>Section 1: Foundation of Risk Management.</li>
        <li>Section 2: How to Identify Risks.</li>
        <li>Section 3: Risk Assessment and Prioritization.</li>
        <li>Section 4: Developing Action and Mitigation Plans.</li>
        <li>Section 5: Proactive Risk Mitigation through Controls.</li>
        <li>Section 6: Monitoring, Reporting, and Continuous Improvement.</li>
      </ul>
    ),
  },
  {
    title: "Training Outcomes",
    variant: "default",
    body: (
      <ul>
        <li>Improved decision-making through structured risk analysis and governance alignment.</li>
        <li>Higher operational efficiency through consistent controls and monitoring behavior.</li>
        <li>Reduced cost of incidents through earlier detection and preventive mitigation.</li>
        <li>Stronger compliance posture through standardized evidence and reporting discipline.</li>
      </ul>
    ),
  },
  {
    title: "Section 8: Risk Reporting",
    label: "Reporting",
    variant: "break",
    body: (
      <p>
        Reporting is standardized and automated where possible to drive proactive
        detection and informed decision-making.
      </p>
    ),
  },
  {
    title: "Reporting Artifacts",
    variant: "default",
    body: (
      <>
        <ul>
          <li>Enterprise Risk Dashboard: real-time risk levels, categories, ratings, and heat map insights.</li>
          <li>Enterprise Risk Profile: prioritized portfolio of highest-rated risks for CIO approval.</li>
          <li>Use outputs in meetings across team, Branch Chief, governance board, and executive levels.</li>
          <li>Reporting channels align to escalation tier and incident urgency.</li>
        </ul>
        <div className="tile-grid cols-2">
          <div className="tile-card dashboard-card">
            <h4>Operational Dashboard</h4>
            <p>Live status, trend indicators, incident summaries, and control health.</p>
          </div>
          <div className="tile-card dashboard-card">
            <h4>Executive Profile</h4>
            <p>Condensed high-risk portfolio used for tolerance and resource decisions.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Enterprise Risk Dashboard Detail",
    variant: "default",
    body: (
      <ul>
        <li>Displays risk levels, categories, ratings, heat map, incident summary, and status.</li>
        <li>Supports prioritization of mitigations and review of response/resolution progress.</li>
        <li>Enables trend analysis for emerging risk, post-incident action, and prevention.</li>
        <li>Drives recurring review conversations across owners, leads, and Branch Chiefs.</li>
      </ul>
    ),
  },
  {
    title: "Enterprise Risk Profile Detail",
    variant: "default",
    body: (
      <ul>
        <li>Portfolio-level view of the most significant risks from the risk register.</li>
        <li>At minimum includes all risks currently rated High.</li>
        <li>Used by CIO for tolerance decisions and response-plan approval.</li>
        <li>Provides executive risk visibility for strategic prioritization.</li>
      </ul>
    ),
  },
  {
    title: "Appendices A-G Highlights",
    label: "Appendix",
    variant: "break",
    body: (
      <p>
        Reference appendices provide detailed risk definitions, scoring criteria,
        sample heat maps/dashboard artifacts, and control category checklists.
      </p>
    ),
  },
  {
    title: "Appendix A: Risk Types and Triggers",
    variant: "default",
    body: (
      <ul>
        <li>Documents each risk type with sample trigger conditions for early warning.</li>
        <li>Examples include scope creep, unpatched systems, policy gaps, and key-person departures.</li>
        <li>Supports faster identification by linking risk classes to observable indicators.</li>
        <li>Improves consistency of risk entry quality across teams.</li>
      </ul>
    ),
  },
  {
    title: "Appendix B/C: Probability and Impact",
    variant: "default",
    body: (
      <ul>
        <li>Probability levels run from Absolute to Low with complexity-based guidance.</li>
        <li>Impact levels quantify severity by risk domain across mission, finance, and operations.</li>
        <li>Assessment expectations include evidence of dependencies and testing maturity.</li>
        <li>These appendices are the baseline for objective and repeatable ranking.</li>
      </ul>
    ),
  },
  {
    title: "Appendix D/E/F/G Practitioner Summary",
    variant: "default",
    body: (
      <>
        <ul>
          <li>Appendix D provides sample risk-value matrix to standardize severity ranking.</li>
          <li>Appendix E/F provide sample heat map and dashboard reference artifacts.</li>
          <li>Appendix G defines control categories: security, network, endpoint, data, and DevOps.</li>
          <li>Control checklist maps monitoring activities to concrete operational safeguards.</li>
        </ul>
        <div className="mini-matrix">
          <div className="mcell high">High</div>
          <div className="mcell high">High</div>
          <div className="mcell med">Medium</div>
          <div className="mcell high">High</div>
          <div className="mcell high">High</div>
          <div className="mcell med">Medium</div>
          <div className="mcell med">Medium</div>
          <div className="mcell med">Medium</div>
          <div className="mcell low">Low</div>
        </div>
      </>
    ),
  },
  {
    title: "Closeout",
    variant: "dark",
    body: (
      <ul>
        <li>Use this detailed section version as baseline curriculum for OCIO risk roles.</li>
        <li>Operationalize consistent assessment, escalation, and reporting practices.</li>
        <li>Leverage appendices actively, not passively, during risk reviews and planning.</li>
        <li>Refresh content periodically as governance, threats, and mission demands evolve.</li>
      </ul>
    ),
  },
  {
    title: "OCIO ERM Framework 09/23/2025 - Section Training",
    variant: "hero",
    body: (
      <>
        <p className="slide-subtitle">
          Structured governance, consistent risk practice, and continuous monitoring.
        </p>
        <p>
          Published section-based version derived from the approved 09/23/2025
          OCIO framework source document.
        </p>
      </>
    ),
  },
];
