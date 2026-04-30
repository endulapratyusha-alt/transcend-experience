const stages = {
  early: {
    kicker: "For Startups",
    headline: "Give Startups a durable privacy and data foundation.",
    description:
      "Startups can put consent, preferences, and data context in place before fragmented processes become permanent operating debt.",
    beforeTitle: "Privacy lives in scattered workflows.",
    afterTitle: "A governed layer starts forming across customer data.",
    before: [
      {
        title: "Consent captured in point tools",
        text: "Signals exist, but they are not yet connected to every place customer data moves."
      },
      {
        title: "Usage questions slow teams down",
        text: "Product and growth teams rely on one-off reviews to understand what data is appropriate to use."
      },
      {
        title: "Manual coordination becomes normal",
        text: "Privacy decisions depend on people remembering the latest policy, system, and request context."
      }
    ],
    after: [
      {
        title: "A foundation for consent and preferences",
        text: "Customer choices become structured signals that can support future data workflows."
      },
      {
        title: "Data context is easier to find",
        text: "Teams begin building a shared understanding of where customer data lives and how it should be governed."
      },
      {
        title: "Compliance scales with the stack",
        text: "The company avoids rebuilding privacy from scratch as new systems, regions, and AI pilots arrive."
      }
    ],
    outcomeTitle: "A foundation for trustworthy data use for Startups",
    outcome:
      "Startups can answer basic usage questions with more confidence and prepare for scale without redesigning compliance from scratch.",
    cta: "Start here"
  },
  scaling: {
    kicker: "For Mid-market",
    headline: "Help Mid-market teams grow without turning governance into a bottleneck.",
    description:
      "As systems multiply, Transcend helps Mid-market privacy, compliance, and business teams coordinate around one governed customer data layer.",
    beforeTitle: "Growth creates more systems than governance can manually track.",
    afterTitle: "Customer data workflows become coordinated and policy-aware.",
    before: [
      {
        title: "Teams manage privacy in parallel",
        text: "Legal, marketing, product, and data teams each keep their own version of what is allowed."
      },
      {
        title: "AI pilots get stuck in review",
        text: "The question is not whether AI is valuable, but whether customer data is ready to use responsibly."
      },
      {
        title: "Policies are hard to operationalize",
        text: "Approvals may exist on paper while enforcement still depends on manual follow-through across tools."
      }
    ],
    after: [
      {
        title: "One compliance layer across workflows",
        text: "Teams align around shared rules, data context, and consent signals instead of disconnected handoffs."
      },
      {
        title: "Governed activation becomes repeatable",
        text: "Customer data can support personalization, analytics, and AI initiatives with clearer guardrails."
      },
      {
        title: "Policy enforcement moves closer to the source",
        text: "Compliance logic becomes part of the operating model, not a final review step after work is done."
      }
    ],
    outcomeTitle: "A repeatable operating layer for Mid-market growth",
    outcome:
      "Mid-market teams can move faster because compliance becomes embedded in how customer data is understood, approved, and activated.",
    cta: "See how it works"
  },
  enterprise: {
    kicker: "For Enterprise",
    headline: "Customer data becomes a governed, AI-ready asset.",
    description:
      "For Enterprise teams, Transcend positions compliance as infrastructure: a control layer that helps data, AI, and business systems operate with governed customer data.",
    beforeTitle: "Enterprise AI is blocked by uncertainty in the data layer.",
    afterTitle: "A unified compliance layer makes customer data AI-ready.",
    before: [
      {
        title: "Data is scattered across complex systems",
        text: "Customer data sits in warehouses, vendor tools, marketing systems, and internal platforms with uneven context."
      },
      {
        title: "AI teams cannot tell what is safe to use",
        text: "Governance questions slow initiatives because permissions, policies, and data lineage are difficult to connect."
      },
      {
        title: "Compliance becomes a brake on transformation",
        text: "Business teams want to activate data, while legal and privacy teams need confidence that rules are enforced."
      },
      {
        title: "Manual reviews do not match Enterprise scale",
        text: "The volume of systems, regulations, and data use cases outpaces coordination by spreadsheets and meetings."
      }
    ],
    after: [
      {
        title: "Unified governance across customer data",
        text: "Consent, preferences, policies, and data context come together as a compliance layer across the stack."
      },
      {
        title: "AI runs on governed, permissioned data",
        text: "Teams can pursue responsible AI with clearer answers to what data can be used and under what conditions."
      },
      {
        title: "Automated policy enforcement supports scale",
        text: "Rules can be operationalized across systems so compliance is built into data workflows as they happen."
      },
      {
        title: "Enterprise teams share one source of truth",
        text: "Compliance, data, and business teams can make faster decisions from a common operating layer."
      }
    ],
    outcomeTitle: "Customer data becomes a governed, AI-ready asset",
    outcome:
      "The Enterprise destination is not just better privacy operations. It is customer data infrastructure that can support AI, personalization, and growth with governance built in.",
    cta: "Explore platform"
  }
};

const body = document.body;
const tabs = Array.from(document.querySelectorAll(".stage-tab"));
const megaItems = Array.from(document.querySelectorAll("[data-menu-action]"));
const enterpriseTriggers = Array.from(document.querySelectorAll("[data-enterprise-trigger]"));
const pathSteps = Array.from(document.querySelectorAll(".stage-path__step"));
const comparisonGrid = document.querySelector("#comparison-grid");
const outcome = document.querySelector("#outcome");
let activeStage = "early";

const elements = {
  kicker: document.querySelector("#stage-kicker"),
  headline: document.querySelector("#experience-title"),
  description: document.querySelector("#stage-description"),
  beforeTitle: document.querySelector("#before-title"),
  afterTitle: document.querySelector("#after-title"),
  beforePoints: document.querySelector("#before-points"),
  afterPoints: document.querySelector("#after-points"),
  outcomeTitle: document.querySelector("#outcome-title"),
  outcomeCopy: document.querySelector("#outcome-copy"),
  cta: document.querySelector("#stage-cta")
};

function playPulse() {
  const audio = document.getElementById("pulseAudio");
  if (!audio) return;

  audio.currentTime = 0;
  audio.volume = 0.4;

  audio.play().catch((error) => {
    console.log("Audio play failed:", error);
  });
}

function shouldPlayEnterpriseTrigger(element) {
  const action = element.dataset.menuAction;
  const text = element.textContent.trim().toLowerCase();
  const isExploreCta = text === "explore platform" || element.id === "stage-cta";

  return (
    element.dataset.stage === "enterprise" ||
    action === "enterprise-infrastructure" ||
    (isExploreCta && activeStage === "enterprise")
  );
}

function pointTemplate(point, index) {
  const number = String(index + 1).padStart(2, "0");

  return `
    <div class="point-item">
      <span class="point-item__number">${number}</span>
      <div>
        <h4>${point.title}</h4>
        <p>${point.text}</p>
      </div>
    </div>
  `;
}

function renderStage(stageName) {
  const stage = stages[stageName];

  if (!stage) return;

  activeStage = stageName;
  body.dataset.stage = stageName;
  elements.kicker.textContent = stage.kicker;
  elements.headline.textContent = stage.headline;
  elements.description.textContent = stage.description;
  elements.beforeTitle.textContent = stage.beforeTitle;
  elements.afterTitle.textContent = stage.afterTitle;
  elements.beforePoints.innerHTML = stage.before.map(pointTemplate).join("");
  elements.afterPoints.innerHTML = stage.after.map(pointTemplate).join("");
  elements.outcomeTitle.textContent = stage.outcomeTitle;
  elements.outcomeCopy.textContent = stage.outcome;
  elements.cta.textContent = stage.cta;

  tabs.forEach((tab) => {
    tab.setAttribute("aria-selected", String(tab.dataset.stage === stageName));
  });

  pathSteps.forEach((step) => {
    step.classList.toggle("is-active", step.dataset.path === stageName);
  });
}

function setActiveStage(stageName) {
  if (!stages[stageName]) return;

  comparisonGrid.classList.add("is-changing");
  outcome.classList.add("is-changing");

  window.setTimeout(() => {
    renderStage(stageName);

    comparisonGrid.classList.remove("is-changing");
    outcome.classList.remove("is-changing");
  }, 160);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setActiveStage(tab.dataset.stage));
});

megaItems.forEach((item) => {
  item.addEventListener("click", () => {
    const action = item.dataset.menuAction;

    if (action === "early") {
      setActiveStage("early");
      return;
    }

    if (action === "scaling") {
      setActiveStage("scaling");
      return;
    }

    if (action === "enterprise-ai") {
      setActiveStage("enterprise");
      return;
    }

    if (action === "enterprise-infrastructure") {
      setActiveStage("enterprise");
    }
  });
});

enterpriseTriggers.forEach((element) => {
  element.addEventListener("click", () => {
    if (!shouldPlayEnterpriseTrigger(element)) return;

    setTimeout(() => {
      playPulse();
    }, 150);
  });
});

renderStage("early");
