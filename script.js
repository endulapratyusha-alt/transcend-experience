const stages = {
  early: {
    label: "Early foundation",
    title: "Operationalize privacy before complexity scales.",
    description: "Early teams need a reliable privacy foundation before they can scale governance or AI readiness.",
    beforeHeadline: "Privacy is handled manually.",
    afterHeadline: "Privacy becomes structured and repeatable.",
    before: [
      "Requests move through email, spreadsheets, and tickets.",
      "Consent and preference data is not connected downstream.",
      "Legal, support, and engineering verify completion manually."
    ],
    after: [
      "Privacy requests follow a clear intake and execution path.",
      "Workflow ownership becomes visible and repeatable.",
      "The company creates a foundation for scalable data operations."
    ],
    payoffTitle: "A foundation for scalable privacy operations.",
    payoffCopy: "The organization creates the operating layer it will need before AI and governance demands increase."
  },
  scaling: {
    label: "Scaling complexity",
    title: "Move from privacy workflows to data infrastructure.",
    description: "Mid sized teams start to feel the limits of fragmented systems, manual coordination, and incomplete data visibility.",
    beforeHeadline: "Customer data is spread across systems.",
    afterHeadline: "Customer data becomes visible and actionable.",
    before: [
      "Teams cannot confidently answer where data lives.",
      "Privacy workflows require coordination across many tools.",
      "Governance decisions are reactive and slow."
    ],
    after: [
      "Data discovery and mapping create system-level visibility.",
      "Privacy workflows connect to actual data locations.",
      "Consent and policy enforcement become easier to operationalize."
    ],
    payoffTitle: "Customer data governance starts to scale.",
    payoffCopy: "Transcend helps teams move from disconnected processes to a customer data foundation that can support enterprise demands."
  },
  enterprise: {
    label: "Enterprise destination",
    title: "Customer data becomes a governed, AI-ready asset.",
    description: "For enterprise teams, Transcend positions compliance as infrastructure: a control layer that helps data, AI, and business systems operate with governed customer data.",
    beforeHeadline: "Enterprise AI is blocked by uncertainty in the data layer.",
    afterHeadline: "A unified compliance layer makes customer data AI-ready.",
    before: [
      "Data is scattered across enterprise systems.",
      "AI teams cannot tell what is safe to use.",
      "Compliance becomes a brake on transformation.",
      "Manual reviews do not match enterprise scale."
    ],
    after: [
      "Unified governance travels with customer data.",
      "AI runs on governed, permissioned data.",
      "Automated policy enforcement supports scale.",
      "Enterprise teams share one source of truth."
    ],
    payoffTitle: "Customer data becomes a governed, AI-ready asset.",
    payoffCopy: "The enterprise destination is not just better privacy operations. It is customer data infrastructure that can support AI, personalization, and growth with governance built in."
  }
};

let currentStage = "early";
let pulseLock = false;

const stageLabel = document.getElementById("stageLabel");
const stageTitle = document.getElementById("stageTitle");
const stageDescription = document.getElementById("stageDescription");
const beforeHeadline = document.getElementById("beforeHeadline");
const afterHeadline = document.getElementById("afterHeadline");
const beforeList = document.getElementById("beforeList");
const afterList = document.getElementById("afterList");
const payoffTitle = document.getElementById("payoffTitle");
const payoffCopy = document.getElementById("payoffCopy");
const outcomeCta = document.getElementById("outcomeCta");

function playPulse() {
  const audio = document.getElementById("pulseAudio");
  if (!audio || pulseLock) return;

  pulseLock = true;
  audio.currentTime = 0;
  audio.volume = 0.4;

  audio.play().catch((error) => {
    console.log("Audio play failed:", error);
  });

  setTimeout(() => {
    pulseLock = false;
  }, 1800);
}

function renderPoints(container, points) {
  container.innerHTML = points
    .map((point, index) => `<div class="point"><span>${index + 1}</span><p>${point}</p></div>`)
    .join("");
}

function setStage(stage, shouldPlay = false) {
  currentStage = stage;
  const content = stages[stage];

  stageLabel.textContent = content.label;
  stageTitle.textContent = content.title;
  stageDescription.textContent = content.description;
  beforeHeadline.textContent = content.beforeHeadline;
  afterHeadline.textContent = content.afterHeadline;
  payoffTitle.textContent = content.payoffTitle;
  payoffCopy.textContent = content.payoffCopy;

  renderPoints(beforeList, content.before);
  renderPoints(afterList, content.after);

  document.querySelectorAll(".stage-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.stage === stage);
  });

  document.getElementById("dotEarly").classList.toggle("active", stage === "early");
  document.getElementById("dotScaling").classList.toggle("active", stage === "scaling");
  document.getElementById("dotEnterprise").classList.toggle("active", stage === "enterprise");

  if (stage === "enterprise" && shouldPlay) {
    setTimeout(playPulse, 160);
  }
}

document.querySelectorAll("[data-stage]").forEach((item) => {
  item.addEventListener("click", () => {
    const stage = item.dataset.stage;
    const enterpriseTrigger = item.hasAttribute("data-enterprise-trigger");
    setStage(stage, enterpriseTrigger);
    if (stage === "enterprise") {
      document.getElementById("experience").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

document.querySelectorAll("[data-enterprise-trigger]").forEach((item) => {
  item.addEventListener("click", () => {
    if (currentStage === "enterprise" || item.dataset.stage === "enterprise") {
      setTimeout(playPulse, 160);
    }
  });
});

outcomeCta.addEventListener("click", () => {
  if (currentStage === "enterprise") {
    playPulse();
  } else {
    document.getElementById("solutions").scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

setStage("early");
