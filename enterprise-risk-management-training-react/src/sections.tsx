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
  { id: "Governance", long: "Governance" },
  { id: "Assessment", long: "Assessment" },
  { id: "Register", long: "Register" },
  { id: "Escalation", long: "Escalation" },
  { id: "Reporting", long: "Reporting" },
  { id: "Lifecycle", long: "Lifecycle" },
  { id: "Mitigation", long: "Mitigation" },
  { id: "Controls", long: "Controls" },
  { id: "Improve", long: "Improve" },
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
          Professional Training | Entrusted Classification
        </p>
        <p>
          Built from the Enterprise Risk Management Framework Training Draft,
          redesigned for clearer governance communication and executive-ready
          delivery.
        </p>
      </>
    ),
  },
  {
    title: "Training Objectives",
    variant: "accent",
    body: (
      <ul>
        <li>Establish a consistent OCIO approach to identifying and managing risk.</li>
        <li>Clarify responsibilities from CIO governance to frontline risk owners.</li>
        <li>Apply standardized probability, impact, ranking, and documentation rules.</li>
        <li>Strengthen escalation, reporting, and continuous improvement execution.</li>
      </ul>
    ),
  },
  {
    title: "Why This Framework Matters",
    variant: "default",
    body: (
      <ul>
        <li>Persistent cyber, operational, and delivery risks require proactive controls.</li>
        <li>Shared methods improve comparability and prioritization across branches.</li>
        <li>Clear ownership reduces ambiguity during mitigation and response.</li>
        <li>Consistent risk reporting improves leadership decision quality.</li>
      </ul>
    ),
  },
  {
    title: "Governance Roles and Accountability",
    label: "Governance",
    variant: "break",
    body: (
      <p>
        From strategic direction to operational execution, every role has defined
        obligations for risk ownership, review, and escalation.
      </p>
    ),
  },
  {
    title: "CIO Responsibilities",
    variant: "default",
    body: (
      <ul>
        <li>Set enterprise risk appetite, tolerance, and strategic alignment.</li>
        <li>Approve framework policies, escalation models, and governance priorities.</li>
        <li>Review enterprise risk profile to guide executive decision-making.</li>
        <li>Ensure risk accountability is embedded across all IT functions.</li>
      </ul>
    ),
  },
  {
    title: "Governance Boards and Branch Chiefs",
    variant: "default",
    body: (
      <ul>
        <li>Enterprise boards adjudicate escalated, cross-functional IT risks.</li>
        <li>Business demand governance evaluates mission alignment and delivery risk.</li>
        <li>Branch Chiefs review moderate-plus risks and validate mitigation sufficiency.</li>
        <li>High and critical risks are elevated with business impact context.</li>
      </ul>
    ),
  },
  {
    title: "Risk Owner Expectations",
    variant: "accent",
    body: (
      <ul>
        <li>Identify, evaluate, and document risks using standardized procedures.</li>
        <li>Implement mitigation actions and monitor effectiveness continuously.</li>
        <li>Manage low risks directly; escalate medium and high risks promptly.</li>
        <li>Maintain transparent register updates, closure rationale, and lessons learned.</li>
      </ul>
    ),
  },
  {
    title: "Risk Assessment and Prioritization",
    label: "Assessment",
    variant: "break",
    body: (
      <p>
        Every risk is assessed on probability and impact using common criteria to
        improve consistency, comparability, and governance confidence.
      </p>
    ),
  },
  {
    title: "Probability Scale",
    variant: "default",
    body: (
      <ul className="two-col">
        <li>Absolute: &gt;70% likelihood or repeated historical occurrence.</li>
        <li>High: 40-70% likelihood with known precedent.</li>
        <li>Moderate: 20-40% likelihood in similar conditions.</li>
        <li>Low: &lt;20% likelihood with limited precedent.</li>
      </ul>
    ),
  },
  {
    title: "Impact Evaluation",
    variant: "default",
    body: (
      <ul>
        <li>Assess realistic operational, financial, compliance, and reputational consequences.</li>
        <li>Apply risk-type-specific definitions for high, medium, and low impacts.</li>
        <li>Use measurable business terms to avoid subjective interpretation.</li>
        <li>Revisit impact when mission context or dependencies change.</li>
      </ul>
    ),
  },
  {
    title: "Risk Ranking Matrix",
    variant: "accent",
    body: (
      <ul>
        <li>Risk exposure is determined by combining probability and impact ratings.</li>
        <li>Matrix output drives High, Medium, and Low prioritization tiers.</li>
        <li>Use heat maps to communicate concentration and urgency at portfolio scale.</li>
        <li>Always document evidence and rationale behind the assigned rank.</li>
      </ul>
    ),
  },
  {
    title: "Documenting in the Risk Register",
    label: "Register",
    variant: "break",
    body: (
      <p>
        Standardized ServiceNow entries transform risk conversations into
        actionable, auditable management workflows.
      </p>
    ),
  },
  {
    title: "ServiceNow Entry Standards",
    variant: "default",
    body: (
      <ul>
        <li>Use a concise short description and a clear cause-event-impact narrative.</li>
        <li>Separate proactive mitigation actions from reactive contingency work notes.</li>
        <li>Assign probability, impact, and key dates to enable monitoring and review.</li>
        <li>Route to federal risk owner for formal assessment and approval workflow.</li>
      </ul>
    ),
  },
  {
    title: "How to Write a Strong Risk Statement",
    variant: "accent",
    body: (
      <ul>
        <li>Define the cause: the condition that creates vulnerability.</li>
        <li>Describe the event: what uncertain occurrence may happen.</li>
        <li>Quantify the impact: the business consequence if realized.</li>
        <li>Use objective language and keep mitigations out of the risk statement itself.</li>
      </ul>
    ),
  },
  {
    title: "Communication and Escalation",
    label: "Escalation",
    variant: "break",
    body: (
      <p>
        Risk value determines who is informed, who decides, and how quickly action
        must be taken.
      </p>
    ),
  },
  {
    title: "Escalation Path by Risk Value",
    variant: "default",
    body: (
      <ul className="stacked">
        <li>Low: managed at team level with routine monitoring.</li>
        <li>Medium: reviewed by Branch Chief for tolerance and trade-off decisions.</li>
        <li>High: escalated to CIO and governance boards for enterprise action.</li>
      </ul>
    ),
  },
  {
    title: "Leadership Briefing Checklist",
    variant: "default",
    body: (
      <ul>
        <li>Clear risk statement and current rank with rationale for changes.</li>
        <li>Mitigation effectiveness and residual exposure against tolerance.</li>
        <li>Operational, compliance, and delivery implications.</li>
        <li>Specific leadership ask: funding, scope, timeline, or staffing decision.</li>
      </ul>
    ),
  },
  {
    title: "Risk Reporting",
    label: "Reporting",
    variant: "break",
    body: (
      <p>
        Reporting provides a unified view of enterprise exposure and supports both
        real-time operations and strategic governance.
      </p>
    ),
  },
  {
    title: "Two Core Reporting Products",
    variant: "default",
    body: (
      <ul>
        <li>Enterprise Risk Dashboard: near real-time view for owners and branch leadership.</li>
        <li>Enterprise Risk Profile: prioritized high-risk portfolio for CIO review.</li>
        <li>Both products support trend analysis, escalation readiness, and accountability.</li>
        <li>Cross-branch risk visibility prevents siloed decision-making.</li>
      </ul>
    ),
  },
  {
    title: "Risk Management Lifecycle",
    label: "Lifecycle",
    variant: "break",
    body: (
      <p>
        A repeatable six-step cycle drives proactive risk management and sustained
        enterprise resilience.
      </p>
    ),
  },
  {
    title: "Six-Step Lifecycle",
    variant: "default",
    body: (
      <ul className="stacked">
        <li>Identify potential risks using structured inputs and threat intelligence.</li>
        <li>Assess causes, probability, and impact with standard definitions.</li>
        <li>Prioritize using matrix ranking and heat-map visibility.</li>
        <li>Develop and implement proportional response strategies.</li>
        <li>Monitor controls and outcomes continuously.</li>
        <li>Review and improve process based on trends and lessons learned.</li>
      </ul>
    ),
  },
  {
    title: "Mitigation Planning",
    label: "Mitigation",
    variant: "break",
    body: (
      <p>
        Effective mitigation plans are measurable, owned, time-bound, and linked to
        reduction in likelihood or impact.
      </p>
    ),
  },
  {
    title: "Risk Response Strategies",
    variant: "default",
    body: (
      <ul className="two-col">
        <li>Avoid: remove the source condition causing risk.</li>
        <li>Mitigate: reduce probability or consequence through controls.</li>
        <li>Transfer: shift defined exposure via contracts, SLAs, or insurance.</li>
        <li>Accept: formally acknowledge residual exposure with approval.</li>
      </ul>
    ),
  },
  {
    title: "Common Mitigation Mistakes",
    variant: "accent",
    body: (
      <ul>
        <li>Vague actions without observable, verifiable outcomes.</li>
        <li>Diffused ownership with no single accountable individual.</li>
        <li>Missing deadlines or open-ended timelines.</li>
        <li>Failure to recalculate residual risk rank after implementation.</li>
      </ul>
    ),
  },
  {
    title: "Controls and Monitoring",
    label: "Controls",
    variant: "break",
    body: (
      <p>
        Control architecture and continuous monitoring are the foundation of
        proactive enterprise risk response.
      </p>
    ),
  },
  {
    title: "Three Lines of Defense",
    variant: "default",
    body: (
      <ul>
        <li>Preventive controls block undesirable events before they occur.</li>
        <li>Detective controls identify anomalies and breaches quickly.</li>
        <li>Corrective controls restore systems and operations after incidents.</li>
        <li>Control design must map explicitly to the risks it mitigates.</li>
      </ul>
    ),
  },
  {
    title: "Continuous Improvement",
    label: "Improve",
    variant: "dark",
    body: (
      <ul>
        <li>Analyze trends to uncover systemic weaknesses and recurring triggers.</li>
        <li>Integrate lessons learned from incidents, audits, and retrospectives.</li>
        <li>Refine governance, controls, and workflows to mature ERM capability.</li>
        <li>Operate ERM as a continuous cycle, not a one-time compliance exercise.</li>
      </ul>
    ),
  },
  {
    title: "Closing: Enterprise Resilience Through Disciplined Risk Management",
    variant: "hero",
    body: (
      <>
        <p className="slide-subtitle">
          Identify early. Rank consistently. Escalate decisively. Improve continuously.
        </p>
        <p>
          This training equips OCIO teams to convert risk awareness into repeatable,
          accountable action.
        </p>
      </>
    ),
  },
];
