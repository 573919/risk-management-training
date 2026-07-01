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
          Section Version | September 23, 2025 | Entrusted Classification
        </p>
        <p>
          Built from the OCIO Enterprise Risk Management Framework_09232025,
          structured as a section-based training for governance, risk ownership,
          and operational execution.
        </p>
      </>
    ),
  },
  {
    title: "Section 1: Framework Overview, Purpose, Authority, Scope",
    variant: "accent",
    body: (
      <ul>
        <li>Defines OCIO’s structured approach to identifying, assessing, mitigating, and escalating risk.</li>
        <li>Protects sensitive data, service continuity, and policy compliance across OCIO operations.</li>
        <li>Authorized by OCIO to guide federal leads and stakeholders using shared processes.</li>
        <li>Applies to all NSF systems, applications, networks, and personnel within OCIO scope.</li>
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
    title: "Leadership and Governance Roles",
    variant: "default",
    body: (
      <ul>
        <li>CIO sets risk appetite/tolerance and aligns posture to mission and regulatory needs.</li>
        <li>Enterprise IT Governance Board resolves escalated IT risks and sets IT priorities.</li>
        <li>Business Demand Governance Board validates mission need and initiative alignment risks.</li>
        <li>OCIO Risk Governance Lead maintains framework, risk register, dashboards, and training.</li>
      </ul>
    ),
  },
  {
    title: "Branch Chief and Risk Owner Duties",
    variant: "default",
    body: (
      <ul>
        <li>Branch Chiefs review moderate-plus risks, validate mitigation, and escalate high/critical risks.</li>
        <li>Branch Chiefs promote risk-aware culture and ensure adoption of risk procedures.</li>
        <li>Risk Owners identify, evaluate, document, monitor, and reassess risks continuously.</li>
        <li>Risk Owners self-manage low risks and escalate moderate/high risks for tolerance decisions.</li>
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
    title: "Risk Type Coverage",
    variant: "accent",
    body: (
      <ul>
        <li>Includes budget, schedule, scope, quality, compliance, security, and operational risks.</li>
        <li>Also includes fraud, financial, governance, policy, cultural, strategic, and vendor risks.</li>
        <li>Some risk types are jointly overseen by BDGB and EITGB with a designated primary board.</li>
        <li>Shared ownership clarifies when mission impacts require secondary board engagement.</li>
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
    title: "Core Procedure Steps",
    variant: "default",
    body: (
      <ul className="stacked">
        <li>Identify potential risks using audits, threat intelligence, tooling, and incident history.</li>
        <li>Assess by risk type, probability, and impact using standardized appendices.</li>
        <li>Prioritize via risk value and heat map to focus on highest exposure.</li>
        <li>Develop response options: Mitigate, Avoid, Transfer, or Accept.</li>
        <li>Implement with accountable owners and timelines.</li>
        <li>Monitor continuously using automated controls, analytics, and dashboards.</li>
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
      <ul>
        <li>Risk statement, impact, description, mitigation/action, contingency/closure criteria.</li>
        <li>Date identified, possible impact date, probability, impact, and derived risk rating.</li>
        <li>Federal risk-owner review workflow for project/initiative relevance.</li>
        <li>Updates include new developments, mitigation progress, reassessment, and closure rationale.</li>
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
      <ul className="stacked">
        <li>Low: managed by Risk Owner/Federal Lead at team or portfolio level.</li>
        <li>Medium: Branch Chiefs coordinate cross-OCIO mitigation and review trends.</li>
        <li>High: escalate to CIO and Enterprise IT Governance Board for tolerance/trade-off decisions.</li>
        <li>As needed: engage BDGB, NSF ELT, rapid response, and external reporting channels.</li>
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
      <ul>
        <li>Enterprise Risk Dashboard: real-time risk levels, categories, ratings, and heat map insights.</li>
        <li>Enterprise Risk Profile: prioritized portfolio of highest-rated risks for CIO approval.</li>
        <li>Use outputs in meetings across team, Branch Chief, governance board, and executive levels.</li>
        <li>Reporting channels align to escalation tier and incident urgency.</li>
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
    title: "Appendix Summary for Practitioners",
    variant: "default",
    body: (
      <ul>
        <li>Appendix A: risk types and example triggers.</li>
        <li>Appendix B/C: probability and impact guidelines by risk domain.</li>
        <li>Appendix D: sample risk value matrix.</li>
        <li>Appendix E/F: sample heat map and dashboard model.</li>
        <li>Appendix G: control category checklist for monitoring and mitigation.</li>
      </ul>
    ),
  },
  {
    title: "Closeout",
    label: "Improve",
    variant: "dark",
    body: (
      <ul>
        <li>Use this section version as the baseline for OCIO-wide risk role training.</li>
        <li>Apply standardized procedures and appendices consistently across branches.</li>
        <li>Keep register quality high and escalation timely to improve resilience.</li>
        <li>Update annually as policy, technology, and governance conditions evolve.</li>
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
