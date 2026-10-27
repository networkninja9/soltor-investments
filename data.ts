export type InvestmentGuide = {
  slug: string;
  number: string;
  title: string;
  category: string;
  subtitle: string;
  overview: string;
  investmentConsiderations: string[];
  keyRisks: string[];
  diligenceQuestions: string[];
};

export const investmentGuides: InvestmentGuide[] = [
  {
    slug: "private-airports",
    number: "01",
    title: "Private airports",
    category: "AVIATION INFRASTRUCTURE",
    subtitle:
      "A briefing on the assets, operations, and obligations behind private airport investment.",
    overview:
      "Private airports are specialized infrastructure assets. Their operating profile can depend on the airport's permitted use, location, facilities, access, surrounding activity, and the requirements of its users. Potential involvement may take different forms, including ownership, development, or participation alongside an experienced operator.",
    investmentConsiderations: [
      "Understand the asset and operating structure: land, runway, terminal, hangars, fuel, services, and any third-party agreements.",
      "Assess permitted aircraft, operating hours, access arrangements, local demand, and reliance on particular users or tenants.",
      "Map the capital required for maintenance, resurfacing, safety systems, compliance, and future infrastructure upgrades.",
      "Review realistic operating, staffing, insurance, and environmental-management obligations over the life of the asset."
    ],
    keyRisks: [
      "Aviation safety, licensing, regulatory changes, and restrictions on operating hours or aircraft.",
      "High fixed and capital costs; utilization, revenues, and property values may not meet expectations.",
      "Environmental liabilities, noise concerns, fuel handling, weather exposure, and community opposition.",
      "Concentration in a small number of tenants, customers, operators, or transport uses can affect liquidity and resilience."
    ],
    diligenceQuestions: [
      "Who holds title to the airport land and infrastructure, and what easements, leases, liens, or access rights apply?",
      "Which licences, safety approvals, permits, inspections, and operating restrictions apply in each jurisdiction?",
      "What condition are the runway, buildings, utilities, fuel systems, and safety facilities in, and what verified capital plan supports them?",
      "What independent demand, environmental, insurance, operator, and valuation reviews support the proposed business case?"
    ]
  },
  {
    slug: "private-estates",
    number: "02",
    title: "Private estates",
    category: "PRIVATE ESTATES",
    subtitle:
      "A considered overview of property fundamentals, ownership, stewardship, and ongoing costs.",
    overview:
      "A private estate is a property asset whose character, use, condition, and obligations are shaped by its location and legal framework. Historic, rural, residential, or mixed-use properties can each have distinct ownership structures and operating needs. A review starts with the property itself—not an assumption of appreciation, rental income, or ease of resale.",
    investmentConsiderations: [
      "Establish what is included: land, dwellings, outbuildings, fixtures, access, and any operating or recreational rights.",
      "Check ownership, boundaries, permitted uses, occupancy, leases, easements, covenants, and transfer restrictions.",
      "Assess building condition, deferred maintenance, historic-preservation obligations, staffing, insurance, and annual running costs.",
      "Consider whether the intended ownership and management arrangements suit the property's scale, local taxes, and applicable law."
    ],
    keyRisks: [
      "Illiquidity, uncertain resale timing, concentration in one property, and costs associated with a complex sale.",
      "Unexpected repairs, renovations, specialist maintenance, staffing, utilities, insurance, and local taxes.",
      "Restrictions on alteration, access, use, development, conservation, tenancy, or transfer.",
      "Exposure to severe weather, wildfire, flood, subsidence, environmental hazards, or changes in local regulation."
    ],
    diligenceQuestions: [
      "Does independent legal review confirm clean title, complete boundaries, lawful access, and all registered or customary property rights?",
      "Have qualified building, structural, environmental, and specialist property inspections identified defects and quantified remedial work?",
      "What are the verified ongoing costs, tax exposure, insurance limits and exclusions, and practical management requirements?",
      "Are there conservation, heritage, planning, occupancy, lease, or transfer restrictions that affect the proposed use or ownership?"
    ]
  },
  {
    slug: "land",
    number: "03",
    title: "Land",
    category: "LAND & NATURAL ASSETS",
    subtitle:
      "A practical framework for reviewing land rights, site conditions, permitted use, and holding obligations.",
    overview:
      "Land is highly dependent on its legal boundaries, location, physical characteristics, existing rights, and permitted use. A site's possibilities should not be confused with approved development or an established ability to generate income. Any assessment depends on independent, jurisdiction-specific legal, technical, environmental, and planning work.",
    investmentConsiderations: [
      "Confirm surveyed boundaries, registered ownership, legal access, possession, encumbrances, and any customary or community rights.",
      "Verify current planning or zoning, allowable uses, development conditions, and the approvals actually required for a proposed use.",
      "Study topography, soils, drainage, flood exposure, utilities, water, road access, and environmental constraints.",
      "Model holding costs, tax, insurance, site security, land management, and the time and expense of seeking permits."
    ],
    keyRisks: [
      "A change of use, rezoning, subdivision, or development approval may be delayed, restricted, or refused.",
      "Unknown title defects, boundary disputes, access limitations, competing rights, or disputes with neighboring or local stakeholders.",
      "Contamination, protected habitats, unstable soils, water constraints, flood, wildfire, or other site conditions may add cost or limit use.",
      "Undeveloped land may produce little or no income while ongoing costs continue; resale and financing can be challenging."
    ],
    diligenceQuestions: [
      "What title, cadastral, boundary, access, easement, mineral, water, community, or customary rights have been independently confirmed?",
      "Which uses are permitted today, and have qualified local advisers confirmed each proposed approval and its requirements?",
      "Are independent environmental, ecological, geotechnical, topographical, flood, and utility assessments available for the site?",
      "What is the fully costed holding and site-management plan if approvals, a sale, or a proposed development take longer than expected?"
    ]
  },
  {
    slug: "real-estate-development",
    number: "04",
    title: "Real estate development",
    category: "REAL ESTATE DEVELOPMENT",
    subtitle:
      "An overview of the decisions, delivery dependencies, and risks across a development lifecycle.",
    overview:
      "Real estate development brings land, planning, financing, design, procurement, construction, and eventual operation or sale into a single, interdependent process. Project feasibility can change materially as scope, approvals, delivery costs, financing conditions, and market demand evolve. A concept, planning application, or promotional estimate is not a completed or income-producing asset.",
    investmentConsiderations: [
      "Review land acquisition, title, permitted use, planning status, design, buildability, utilities, and access as one connected proposition.",
      "Examine the independent basis for development costs, contingencies, construction schedule, procurement, and operating assumptions.",
      "Stress-test financing, interest, refinancing needs, currency exposure, lease-up, sales pace, and practical exit options.",
      "Clarify project governance, developer experience, contractor obligations, procurement controls, reporting, and decision rights."
    ],
    keyRisks: [
      "Planning, environmental, building-control, infrastructure, and other approvals can change, take longer, or not be granted.",
      "Construction costs, contractor performance, financing, labor or materials availability, and delivery timelines may vary.",
      "Market rents, occupancy, sales prices, and buyer or tenant demand can be materially different from assumptions.",
      "Projects can require additional capital, encounter disputes, or become delayed, incomplete, unoccupied, or difficult to sell."
    ],
    diligenceQuestions: [
      "What approvals are final and effective, what conditions remain, and has independent counsel reviewed site control and project contracts?",
      "Has an independent quantity surveyor or equivalent reviewed the budget, contingency, procurement plan, and completion schedule?",
      "What independent evidence supports the leasing, sales, operating-cost, financing, and exit assumptions under less favorable scenarios?",
      "What are the funding commitments, capital-call terms, downside remedies, reporting rights, and plans if cost or schedule thresholds are exceeded?"
    ]
  }
];
