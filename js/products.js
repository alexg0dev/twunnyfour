window.TW24_PRODUCTS = {
  capabilities: [
    {
      id: "cap-20",
      number: 20,
      name: "Identity Protection",
      blurb: "Identity protection and account takeover prevention.",
      detail:
        "Stops credential stuffing, session hijacking, and account takeover by enforcing MFA, monitoring leaked credentials, and spotting abnormal login behavior before an attacker pivots deeper.",
      who: "Security and identity teams protecting workforce and admin accounts.",
      features: ["MFA Enforcement", "Credential Monitoring", "Behavioral Analytics"],
      price: 15,
      category: "Capability",
    },
    {
      id: "cap-1",
      number: 1,
      name: "Phishing Defense",
      blurb: "Phishing and social engineering defense.",
      detail:
        "Inspects links, headers, and message context in real time to catch spear-phishing, quishing, and brand impersonation that classic filters miss.",
      who: "Organizations where email remains the primary attack path.",
      features: ["AI Link Scanning", "Simulated Attacks", "Header Analysis"],
      price: 12,
      category: "Capability",
    },
    {
      id: "cap-18",
      number: 18,
      name: "Endpoint Threat Prevention",
      blurb: "Endpoint threat prevention.",
      detail:
        "Combines next-gen antivirus, exploit prevention, and device control so malware and living-off-the-land techniques fail on the first host they touch.",
      who: "IT and SOC teams managing laptops, servers, and shared workstations.",
      features: ["NGAV", "Exploit Prevention", "USB Device Control"],
      price: 18,
      category: "Capability",
    },
    {
      id: "cap-4",
      number: 4,
      name: "Collaboration Security",
      blurb: "Email and collaboration security.",
      detail:
        "Extends the same inspection model used for email into Slack, Teams, and SharePoint so file shares and chat links cannot become quiet exfiltration channels.",
      who: "Hybrid workplaces running Microsoft 365 or Slack at scale.",
      features: ["Slack Protection", "Teams Scanning", "SharePoint Defense"],
      price: 20,
      category: "Capability",
    },
    {
      id: "cap-13",
      number: 13,
      name: "Ransomware Protection",
      blurb: "Ransomware and malware protection.",
      detail:
        "Detects mass encryption behavior early, blocks the process chain, and preserves rollback points so recovery does not depend on paying a ransom.",
      who: "Any organization with sensitive file stores or operational downtime risk.",
      features: ["Rollback Protection", "Behavior Blocking", "Offline Scanning"],
      price: 22,
      category: "Capability",
    },
    {
      id: "cap-6",
      number: 6,
      name: "Zero-Day Detection",
      blurb: "Zero-day and advanced threat detection.",
      detail:
        "Detonates and analyzes unknown binaries and documents in a controlled sandbox, pairing heuristics with static AI models for threats without known signatures.",
      who: "Teams facing targeted malware or novel payload delivery.",
      features: ["Sandboxing", "Heuristic Analysis", "Static AI"],
      price: 25,
      category: "Capability",
    },
    {
      id: "cap-10",
      number: 10,
      name: "Cloud Protection",
      blurb: "Cloud and SaaS application protection.",
      detail:
        "Gives visibility into SaaS posture, risky OAuth grants, and workload misconfigurations before they become publicly exposed attack surface.",
      who: "Cloud and security engineering teams running multi-SaaS stacks.",
      features: ["CASB", "Cloud Posture", "Workload Protection"],
      price: 20,
      category: "Capability",
    },
    {
      id: "cap-15",
      number: 15,
      name: "Data Loss Prevention",
      blurb: "Data loss prevention.",
      detail:
        "Discovers sensitive data, maps how it moves, and blocks unauthorized exfiltration across email, endpoints, and collaboration tools.",
      who: "Compliance, legal, and security leaders with regulated data.",
      features: ["Sensitive Data Discovery", "Exfiltration Blocking", "Compliance Patterns"],
      price: 18,
      category: "Capability",
    },
    {
      id: "cap-2",
      number: 2,
      name: "Insider Threat Monitoring",
      blurb: "Insider threat monitoring.",
      detail:
        "Correlates unusual file access, privilege use, and data movement to surface insider risk without drowning analysts in raw logs.",
      who: "Enterprises with privileged operators or high-value IP.",
      features: ["User Behavior Analytics", "File Access Logs", "Data Movement Tracking"],
      price: 15,
      category: "Capability",
    },
    {
      id: "cap-17",
      number: 17,
      name: "Secure Remote Access",
      blurb: "Secure access for remote and hybrid workers.",
      detail:
        "Replaces broad VPN trust with per-app access gated by identity and device health, shrinking lateral movement opportunities.",
      who: "Distributed and hybrid workforces.",
      features: ["Zero Trust Network Access", "VPN Alternative", "Device Health Check"],
      price: 12,
      category: "Capability",
    },
    {
      id: "cap-3",
      number: 3,
      name: "Threat Intelligence",
      blurb: "Threat intelligence and risk correlation.",
      detail:
        "Connects dark-web signals, adversary tooling, and shared indicators to the assets you actually run, so intel becomes action instead of noise.",
      who: "SOC and threat intel teams prioritizing real exposure.",
      features: ["Dark Web Monitoring", "Adversary Tracking", "Indicator Sharing"],
      price: 30,
      category: "Capability",
    },
    {
      id: "cap-19",
      number: 19,
      name: "Incident Response",
      blurb: "Incident detection and response.",
      detail:
        "Automates triage, remote remediation, and playbook execution so confirmed incidents shrink from hours to minutes.",
      who: "Security operations teams that need consistent response quality.",
      features: ["Automated Triage", "Remote Remediation", "Playbook Execution"],
      price: 35,
      category: "Capability",
    },
    {
      id: "cap-7",
      number: 7,
      name: "Payload Protection",
      blurb: "Attachment and URL protection.",
      detail:
        "Deep-inspects attachments and URLs with static and dynamic analysis before users open content that can deliver malware or steal sessions.",
      who: "Email-heavy businesses and shared mailbox environments.",
      features: ["Deep Content Inspection", "Static Analysis", "Dynamic Scanning"],
      price: 10,
      category: "Capability",
    },
    {
      id: "cap-16",
      number: 16,
      name: "Endpoint Hardening",
      blurb: "Endpoint hardening and policy enforcement.",
      detail:
        "Applies OS hardening baselines, verifies patches, and continuously assesses vulnerability exposure across your device fleet.",
      who: "IT operations and vulnerability management owners.",
      features: ["OS Hardening", "Vulnerability Assessment", "Patch Verification"],
      price: 15,
      category: "Capability",
    },
    {
      id: "cap-8",
      number: 8,
      name: "Compliance Readiness",
      blurb: "Compliance, retention, and audit readiness.",
      detail:
        "Keeps audit trails, retention policies, and regulatory mappings ready so evidence collection is continuous—not a quarterly scramble.",
      who: "Teams accountable for SOC 2, ISO, GDPR, or industry audits.",
      features: ["Audit Logs", "Data Retention Policies", "Regulatory Mapping"],
      price: 20,
      category: "Capability",
    },
    {
      id: "cap-11",
      number: 11,
      name: "Security Monitoring",
      blurb: "Security monitoring and alerting.",
      detail:
        "Delivers high-fidelity alerts with custom rules so analysts spend time on real incidents instead of chasing noisy false positives.",
      who: "In-house SOC or lean security teams needing continuous coverage.",
      features: ["24/7 Monitoring", "High Fidelity Alerts", "Custom Rule Creation"],
      price: 12,
      category: "Capability",
    },
    {
      id: "cap-14",
      number: 14,
      name: "Awareness Training",
      blurb: "User security awareness and behavior training.",
      detail:
        "Turns employees into a detection layer with interactive modules, phishing simulations, and clear reporting on who needs coaching.",
      who: "People and security leaders reducing human-risk exposure.",
      features: ["Interactive Modules", "Phishing Simulation", "Reporting Dashboard"],
      price: 5,
      category: "Capability",
    },
    {
      id: "cap-9",
      number: 9,
      name: "Operational Resilience",
      blurb: "Backup, recovery, and operational resilience.",
      detail:
        "Protects backups from tampering and validates recovery paths so ransomware or outages do not become existential events.",
      who: "Operations and continuity owners for critical systems.",
      features: ["Immutable Backup", "Rapid Recovery", "Disaster Testing"],
      price: 25,
      category: "Capability",
    },
    {
      id: "cap-12",
      number: 12,
      name: "Vulnerability Management",
      blurb: "Continuous vulnerability and risk management.",
      detail:
        "Discovers assets, ranks risk by exploitability and business impact, and tracks remediation until exposure is actually closed.",
      who: "Vulnerability management and engineering security partners.",
      features: ["Prioritized Risk", "Asset Discovery", "Remediation Tracking"],
      price: 18,
      category: "Capability",
    },
    {
      id: "cap-5",
      number: 5,
      name: "Posture Visibility",
      blurb: "Overall security posture visibility and reporting.",
      detail:
        "Rolls controls, incidents, and benchmarks into executive-ready views so leadership can see progress without reading raw telemetry.",
      who: "CISOs and security program owners reporting to the board.",
      features: ["Executive Dashboards", "Security Score", "Benchmarking"],
      price: 10,
      category: "Capability",
    },
  ],
  email: [
    {
      id: "email-gateway",
      name: "Email Security Cloud Gateway",
      price: 12,
      blurb:
        "Cloud-native secure email gateway for Microsoft 365 and Google Workspace with AI-powered threat detection at the perimeter.",
      features: [
        "AI Threat Detection",
        "URL Scanning",
        "Quishing Protection",
        "Brand Impersonation Detection",
      ],
      category: "Email Security",
    },
    {
      id: "email-advanced",
      name: "Advanced Email Security",
      price: 18,
      blurb:
        "Multi-layered protection against BEC, spear-phishing, and ransomware delivered through trusted business correspondence.",
      features: [
        "BEC Protection",
        "Spear-phishing Blocking",
        "Contextual Email Banners",
        "Malware Protection",
      ],
      category: "Email Security",
    },
    {
      id: "email-dmarc",
      name: "DMARC Analyzer",
      price: 8,
      blurb:
        "Email authentication and domain protection that stops spoofing while improving legitimate deliverability.",
      features: [
        "Domain Spoofing Prevention",
        "Deliverability Improvement",
        "DMARC Policy Management",
      ],
      category: "Email Security",
    },
    {
      id: "email-engage",
      name: "Engage Awareness",
      price: 5,
      blurb:
        "Behavior-focused awareness training that continuously coaches users based on real simulation outcomes.",
      features: [
        "Phishing Simulations",
        "Risk Scoring",
        "Behavioral Analytics",
        "Educational Content",
      ],
      category: "Email Security",
    },
    {
      id: "email-collab",
      name: "Collaboration Security",
      price: 10,
      blurb:
        "Extends email-grade controls into Teams, Slack, and SharePoint to stop leaks and malicious sharing.",
      features: ["Teams/Slack Protection", "DLP for Collaboration", "Compliance Monitoring"],
      category: "Email Security",
    },
  ],
  endpoint: [
    {
      id: "ep-prevent",
      name: "Falcon Prevent (NGAV)",
      price: 8,
      blurb:
        "Next-gen antivirus with AI-powered detection that stops malware, ransomware, and many zero-day techniques without heavy agents.",
      features: ["AI-Powered Detection", "Ransomware Prevention", "Zero-Day Protection", "Lightweight Agent"],
      category: "Endpoint Security",
    },
    {
      id: "ep-insight",
      name: "Falcon Insight (EDR/XDR)",
      price: 15,
      blurb:
        "Endpoint detection and response with real-time visibility, automated detection, investigation timelines, and forensics.",
      features: ["Real-Time Visibility", "Automated Detection", "Incident Investigation", "Forensic Analysis"],
      category: "Endpoint Security",
    },
    {
      id: "ep-overwatch",
      name: "Falcon OverWatch",
      price: 12,
      blurb:
        "Managed 24/7 threat hunting by specialists who chase stealthy intrusion activity before it becomes a breach.",
      features: ["24/7 Threat Hunting", "Proactive Detection", "Expert Analysis", "Breach Prevention"],
      category: "Endpoint Security",
    },
    {
      id: "ep-identity",
      name: "Falcon Identity Protection",
      price: 10,
      blurb:
        "Real-time identity threat detection and MFA enforcement for compromised or misused credentials.",
      features: [
        "Identity Threat Detection",
        "MFA Enforcement",
        "Credential Protection",
        "Zero-Trust Verification",
      ],
      category: "Endpoint Security",
    },
    {
      id: "ep-complete",
      name: "Falcon Complete MDR",
      price: 25,
      blurb:
        "Fully managed monitoring and response with expert remediation and a defined breach warranty for covered endpoints.",
      features: ["Managed Monitoring", "Expert Response", "Remediation Services", "$1M Breach Warranty"],
      category: "Endpoint Security",
    },
  ],
  plans: [
    {
      id: "plan-starter",
      name: "Starter",
      price: 10,
      blurb: "Perfect for startups and small teams establishing a secure baseline.",
      features: ["Basic Email Security", "Endpoint Antivirus", "Standard Support"],
      category: "Plan",
      highlighted: false,
    },
    {
      id: "plan-business",
      name: "Business",
      price: 18,
      blurb: "Advanced protection for growing companies with dedicated security ownership.",
      features: [
        "Advanced AI Phishing Block",
        "Full EDR Suite",
        "Priority Support",
        "Vulnerability Scanning",
      ],
      category: "Plan",
      highlighted: true,
    },
    {
      id: "plan-enterprise",
      name: "Enterprise",
      price: 35,
      blurb: "Premier security for large-scale operations that need managed depth.",
      features: [
        "CrowdStrike + Mimecast Integration",
        "24/7 Managed Response",
        "Custom Security Playbooks",
        "Global Threat Intel",
      ],
      category: "Plan",
      highlighted: false,
    },
  ],
};

window.TW24_findProduct = function (id) {
  const p = window.TW24_PRODUCTS;
  return (
    [...p.capabilities, ...p.email, ...p.endpoint, ...p.plans].find((x) => x.id === id) || null
  );
};
