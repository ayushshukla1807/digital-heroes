export const MOCK_USER = {
  name: "John Doe",
  email: "user@test.com",
  subscription: { status: "active", plan: "pro", renewal_date: "2026-05-01" },
  scores: [
    { id: 1, date: "2026-04-14", score: 34 },
    { id: 2, date: "2026-04-07", score: 38 },
    { id: 3, date: "2026-03-28", score: 41 },
    { id: 4, date: "2026-03-21", score: 36 },
    { id: 5, date: "2026-03-14", score: 39 },
  ],
  charity: { id: "2", name: "Ocean Cleanup Foundation", contribution_percent: 15 },
  summary: { draws_entered: 7, upcoming_draw: "2026-05-01", total_draws_won: 1 },
  winnings: { total_won: 37800, payment_status: "paid", payout_date: "2026-04-03" },
}

export const MOCK_CHARITIES = [
  {
    id: "1",
    name: "Global Water Initiative",
    description: "Delivering clean, safe drinking water to underserved communities across Sub-Saharan Africa and South Asia.",
    category: "Water & Sanitation",
    country: "Kenya, India, Bangladesh",
    members: 312,
    impact: "₹7,05,000 deployed",
    color: "#10b981",
  },
  {
    id: "2",
    name: "Ocean Cleanup Foundation",
    description: "Engineering scalable systems to extract plastic from the world's oceans, rivers, and coastlines.",
    category: "Environment",
    country: "Global",
    members: 481,
    impact: "₹11,92,000 deployed",
    color: "#f59e0b",
  },
  {
    id: "3",
    name: "Education For All",
    description: "Building and resourcing schools in remote communities that have never had access to structured education.",
    category: "Education",
    country: "Ethiopia, Nepal, Myanmar",
    members: 227,
    impact: "₹5,12,000 deployed",
    color: "#ec4899",
  },
  {
    id: "4",
    name: "Reforestation Trust",
    description: "Planting native tree species and restoring biodiverse ecosystems in deforested regions worldwide.",
    category: "Climate & Ecology",
    country: "Brazil, Indonesia",
    members: 198,
    impact: "₹4,03,000 deployed",
    color: "#8b5cf6",
  },
]

export const MOCK_DRAW_HISTORY = [
  {
    id: "DRW-2026-04",
    date: "2026-04-01",
    totalPool: 1050000,
    charityAllocation: 400000,
    winners: [
      { rank: 1, name: "Sarah Jenkins", tier: "Class A", amount: 420000, status: "paid", txRef: "TXN-0x1A2B3C" },
      { rank: 2, name: "Marcus Wei", tier: "Class B", amount: 37800, status: "paid", txRef: "TXN-0x4D5E6F" },
      { rank: 3, name: "Priya Patel", tier: "Class B", amount: 37800, status: "pending", txRef: "TXN-0x7G8H9I" },
    ],
    participants: 248,
    status: "settled",
  },
  {
    id: "DRW-2026-03",
    date: "2026-03-01",
    totalPool: 940000,
    charityAllocation: 345000,
    winners: [
      { rank: 1, name: "Tom Ashford", tier: "Class A", amount: 376000, status: "paid", txRef: "TXN-0xAB12CD" },
      { rank: 2, name: "Lena Bauer", tier: "Class B", amount: 35000, status: "paid", txRef: "TXN-0xEF34GH" },
      { rank: 3, name: "James O'Brien", tier: "Class B", amount: 35000, status: "paid", txRef: "TXN-0xIJ56KL" },
    ],
    participants: 221,
    status: "settled",
  },
  {
    id: "DRW-2026-02",
    date: "2026-02-01",
    totalPool: 820000,
    charityAllocation: 302000,
    winners: [
      { rank: 1, name: "Ayesha Rahman", tier: "Class A", amount: 328000, status: "paid", txRef: "TXN-0xMN78OP" },
      { rank: 2, name: "Carlos Silva", tier: "Class B", amount: 32000, status: "paid", txRef: "TXN-0xQR90ST" },
      { rank: 3, name: "Fiona McLeod", tier: "Class B", amount: 32000, status: "paid", txRef: "TXN-0xUV12WX" },
    ],
    participants: 194,
    status: "settled",
  },
]

export const MOCK_CHARITY_LEDGER = [
  { month: "Apr 2026", charity: "Ocean Cleanup Foundation", amount: 166200, subscribers: 165, status: "pending" },
  { month: "Apr 2026", charity: "Global Water Initiative", amount: 120900, subscribers: 120, status: "pending" },
  { month: "Apr 2026", charity: "Education For All", amount: 75600, subscribers: 75, status: "pending" },
  { month: "Apr 2026", charity: "Reforestation Trust", amount: 40300, subscribers: 40, status: "pending" },
  { month: "Mar 2026", charity: "Ocean Cleanup Foundation", amount: 146100, subscribers: 145, status: "transferred" },
  { month: "Mar 2026", charity: "Global Water Initiative", amount: 105800, subscribers: 105, status: "transferred" },
  { month: "Mar 2026", charity: "Education For All", amount: 65500, subscribers: 65, status: "transferred" },
  { month: "Mar 2026", charity: "Reforestation Trust", amount: 35300, subscribers: 35, status: "transferred" },
]

export const MOCK_REVENUE_SUMMARY = [
  { month: "Jan 2026", gross: 604800, charity: 218400, prizePool: 319200, platform: 67200 },
  { month: "Feb 2026", gross: 680400, charity: 252000, prizePool: 352800, platform: 75600 },
  { month: "Mar 2026", gross: 823200, charity: 302400, prizePool: 420000, platform: 100800 },
  { month: "Apr 2026", gross: 937440, charity: 344400, prizePool: 487200, platform: 105840 },
]