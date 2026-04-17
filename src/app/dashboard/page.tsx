import { SubscriptionStatus } from "@/components/dashboard/SubscriptionStatus"
import { DrawParticipation } from "@/components/dashboard/DrawParticipation"
import { WinningsOverview } from "@/components/dashboard/WinningsOverview"
import { PerformanceTracker } from "@/components/dashboard/PerformanceTracker"
import { CharityImpact } from "@/components/dashboard/CharityImpact"
import { WinnerProofUpload } from "@/components/dashboard/WinnerProofUpload"
import { MOCK_USER } from "@/lib/mock-data"

export default function DashboardPage() {
  const user = MOCK_USER

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-medium tracking-tight text-white">Welcome back, {user.name}</h1>
        <p className="text-[var(--color-text-secondary)] mt-1 font-light">Your performance stats, charity impact, and draw participation — all in one place.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SubscriptionStatus plan={user.subscription.plan} renewalDate={user.subscription.renewal_date} />
        <DrawParticipation drawsEntered={user.summary.draws_entered} upcomingDraw={user.summary.upcoming_draw} scoresLength={user.scores.length} />
        <WinningsOverview totalWon={user.winnings.total_won} paymentStatus={user.winnings.payment_status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PerformanceTracker initialScores={user.scores} />
        <CharityImpact charityName={user.charity.name} initialPercent={user.charity.contribution_percent} />
      </div>

      {user.winnings.total_won > 0 && (
        <WinnerProofUpload drawDate="01 Apr 2026" prizeAmount={user.winnings.total_won} />
      )}
    </div>
  )
}
