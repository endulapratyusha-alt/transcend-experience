const stages = {
  privacy: {
    eyebrow: "Stage 1",
    title: "Automate privacy rights and consent",
    description: "The first maturity leap is moving from manual privacy follow-up to repeatable execution.",
    fit: "Early-stage and scaling teams",
    beforeKicker: "Privacy is handled, but not operationalized.",
    afterKicker: "Privacy becomes a workflow customers can trust.",
    before: [
      "DSRs are managed through email, tickets, spreadsheets, and legal follow-up.",
      "Consent and preferences are captured, but not consistently connected to downstream systems.",
      "Teams know what needs to happen, but proving completion takes manual effort.",
      "Privacy feels like a process the company reacts to."
    ],
    after: [
      "Privacy requests move through a clear intake, verification, and fulfillment path.",
      "Consent and preference workflows become easier to manage and repeat.",
      "Legal, support, and operations can see workflow status in one place.",
      "The company has a foundation for privacy operations, not just compliance response."
    ],
    demoTitle: "Complete a privacy request",
    demoDescription: "The Pulse stays silent here because the organization is still building the operating foundation.",
    steps: ["Request intake", "Identity check", "Manual review", "Completion logged"],
    pulse: false,
    pulseText: "Pulse silent: trust is still being verified manually.",
    insight: "Do not signal trust before the workflow is mature enough to deserve it."
  },
  governance: {
    eyebrow: "Stage 2",
    title: "Govern customer data at the systems layer",
    description: "The second maturity leap is understanding where customer data lives, how it moves, and which rules apply.",
    fit: "Mid-market and multi-system companies",
    beforeKicker: "Data exists everywhere, but control is fragmented.",
    afterKicker: "Customer data governance becomes visible and executable.",
    before: [
      "Customer data lives across SaaS tools, vendors, warehouses, and internal workflows.",
      "Teams cannot easily answer where data lives or which systems need action.",
      "Policy decisions depend on incomplete maps and repeated internal checks.",
      "Privacy, security, and data teams operate from different views of the truth."
    ],
    after: [
      "Data discovery and mapping create a clearer view of customer data across systems.",
      "Privacy workflows become connected to the systems where data actually lives.",
      "Teams can act on customer data with better context and lower operational drag.",
      "Governance moves closer to the data layer instead of staying in documents."
    ],
    demoTitle: "Verify completion across connected systems",
    demoDescription: "Pulse appears selectively when a workflow is completed across connected systems.",
    steps: ["Systems mapped", "Rules applied", "Connected tools updated", "Completion verified"],
    pulse: true,
    pulseText: "Pulse: workflow completed across connected systems.",
    insight: "At this stage, the sound is not branding first. It is a product signal that connected execution worked."
  },
  ai: {
    eyebrow: "Stage 3",
    title: "Activate AI responsibly",
    description: "The third maturity leap is using customer data for AI and personalization with consent, policy, and control.",
    fit: "Enterprise and AI-forward teams",
    beforeKicker: "AI opportunity is blocked by uncertainty.",
    afterKicker: "AI activation runs on a compliant data foundation.",
    before: [
      "Teams want to use customer data for AI, but lack confidence in what is permitted.",
      "Consent, deletion, retention, and policy enforcement are hard to apply consistently.",
      "Legal and security slow down AI initiatives because risk is unclear.",
      "The company has data, but not enough operational trust to activate it safely."
    ],
    after: [
      "Customer data can be activated with consent-aware controls and policy enforcement.",
      "Privacy, governance, and AI readiness connect into one operating narrative.",
      "Teams can move faster because the foundation shows what is safe to use.",
      "Transcend becomes a compliance layer that helps AI ship responsibly."
    ],
    demoTitle: "Enforce policy for AI-ready activation",
    demoDescription: "Pulse becomes a signature assurance cue when policy enforcement is completed at scale.",
    steps: ["Data use checked", "Consent enforced", "Policy applied", "AI-ready state confirmed"],
    pulse: true,
    pulseText: "Pulse: policy enforced for AI-ready customer data activation.",
    insight: "This is the strongest narrative: Transcend is not just managing privacy work, it is making customer data usable with control."
  }
};

let currentStage = "privacy";

const pulseSound = document.getElementById("pulseSound");
const progressFill = document.getElementById("progressFill");
const workflowSteps = document.getElementById("workflowSteps");
const pulseMessage = document.getElementById("pulseMessage");
const pulseText = document.getElementById("pulseText");

function renderStage(stageKey) {
  currentStage = stageKey;
  const stage = stages[stageKey];

  document.getElementById("stageEyebrow").textContent = stage.eyebrow;
  document.getElementById("stageTitle").textContent = stage.title;
  document.getElementById("stageDescription").textContent = stage.description;
  document.getElementById("stageFit").textContent = stage.fit;
  document.getElementById("beforeKicker").textContent = stage.beforeKicker;
  document.getElementById("afterKicker").textContent = stage.afterKicker;
  document.getElementById("demoTitle").textContent = stage.demoTitle;
  document.getElementById("demoDescription").textContent = stage.demoDescription;
  document.getElementById("pulseText").textContent = stage.pulseText;
  document.getElementById("insightLine").textContent = stage.insight;

  document.getElementById("beforeList").innerHTML = stage.before.map(item => `<li>${item}</li>`).join("");
  document.getElementById("afterList").innerHTML = stage.after.map(item => `<li>${item}</li>`).join("");
  workflowSteps.innerHTML = stage.steps.map(item => `<div class="workflow-step">${item}</div>`).join("");

  document.querySelectorAll(".stage-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.stage === stageKey);
  });

  resetWorkflow();
}

function resetWorkflow() {
  progressFill.style.width = "0%";
  pulseMessage.classList.remove("on");
  document.querySelectorAll(".workflow-step").forEach(step => step.classList.remove("active"));
}

function runWorkflow() {
  resetWorkflow();
  const stage = stages[currentStage];
  const steps = Array.from(document.querySelectorAll(".workflow-step"));

  steps.forEach((step, index) => {
    setTimeout(() => {
      step.classList.add("active");
      progressFill.style.width = `${((index + 1) / steps.length) * 100}%`;
    }, index * 360);
  });

  setTimeout(() => {
    pulseMessage.classList.add("on");
    if (stage.pulse) {
      pulseSound.currentTime = 0;
      pulseSound.play().catch(() => {});
    }
  }, steps.length * 360 + 120);
}

document.querySelectorAll(".stage-tab").forEach(tab => {
  tab.addEventListener("click", () => renderStage(tab.dataset.stage));
});

document.getElementById("completeBtn").addEventListener("click", runWorkflow);

document.getElementById("pulsePreviewBtn").addEventListener("click", () => {
  pulseSound.currentTime = 0;
  pulseSound.play().catch(() => {});
});

document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("experience").scrollIntoView({ behavior: "smooth", block: "start" });
});

renderStage(currentStage);
