"use client"
import { TiltCard } from "@/components/ui/TiltCard";

import { useState } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Sparkles, ShieldCheck, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { confirmPayPalSubscriptionAction } from "@/actions/paypal"
import { PAYPAL_PLAN_IDS } from "@/lib/paypal"

const PayPalButtonsMounted = dynamic(
  () => import("@/components/checkout/PayPalButtonsMounted").then(m => m.PayPalButtonsMounted),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-12 flex items-center justify-center gap-2 text-[var(--color-text-secondary)]">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm font-medium">Loading PayPal...</span>
      </div>
    ),
  }
)

const PLANS = [
  {
    id: "basic",
    name: "Hobbyist",
    description: "Perfect for occasional players",
    monthlyPrice: 749,
    yearlyPrice: 7499,
    features: ["1 Draw Entry / Month", "Track 5 Scores", "Basic Charity Selection", "Standard Support"],
    popular: false,
  },
  {
    id: "pro",
    name: "Digital Hero",
    description: "Maximum impact & draw chances",
    monthlyPrice: 1999,
    yearlyPrice: 19999,
    features: ["3 Draw Entries / Month", "Priority Charity Rotation", "Advanced Analytics", "VIP Support & Badges"],
    popular: true,
  },
]

type PlanId = "basic" | "pro"
type Cycle = "monthly" | "yearly"

export default function CheckoutPage() {
  const router = useRouter()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paypalError, setPaypalError] = useState("")
  const [billingCycle, setBillingCycle] = useState<Cycle>("monthly")
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("pro")

  const activePlan = PLANS.find(p => p.id === selectedPlan)!
  const activePrice = billingCycle === "monthly" ? activePlan.monthlyPrice : activePlan.yearlyPrice
  const activePlanId = PAYPAL_PLAN_IDS[selectedPlan]?.[billingCycle]

  const handlePayPalSuccess = async (subscriptionId: string) => {
    setIsProcessing(true)
    setPaypalError("")
    const res = await confirmPayPalSubscriptionAction(subscriptionId, selectedPlan, billingCycle)
    if (!res.success) {
      setPaypalError(res.error)
      setIsProcessing(false)
      return
    }
    setIsSuccess(true)
    setTimeout(() => router.push("/dashboard"), 2500)
  }

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="w-24 h-24 bg-[var(--color-primary)]/20 text-[var(--color-primary)] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.2)]">
          <Check className="w-12 h-12" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-3xl font-display font-medium text-white mb-2 tracking-tight">Subscription Active</h2>
          <p className="text-[var(--color-text-secondary)] font-light">Your PayPal subscription has been confirmed. Redirecting now.</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="text-[var(--color-text-secondary)] hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-display font-medium tracking-tight text-white">Upgrade Subscription</h1>
          <p className="text-[var(--color-text-secondary)] mt-1 font-light">Unlock better odds and maximize your charity impact.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-center">
            <div className="bg-white/[0.04] p-1 rounded-xl inline-flex relative border border-[var(--color-border)]">
              {(["monthly", "yearly"] as Cycle[]).map((cycle) => (
                <button
                  key={cycle}
                  type="button"
                  onClick={() => setBillingCycle(cycle)}
                  className={`relative z-10 px-8 py-2.5 text-sm font-semibold capitalize rounded-lg transition-colors ${
                    billingCycle === cycle ? "text-white" : "text-[var(--color-text-secondary)] hover:text-white"
                  }`}
                >
                  {cycle}
                  {cycle === "yearly" && (
                    <Badge variant="glass" className="ml-2 bg-[var(--color-primary)]/20 text-[var(--color-primary)] text-[10px] py-0 border-0 absolute -top-3 -right-3 px-2">
                      Save 20%
                    </Badge>
                  )}
                </button>
              ))}
              <motion.div
                className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[var(--color-primary)] rounded-lg shadow-lg z-0"
                initial={false}
                animate={{ left: billingCycle === "monthly" ? "4px" : "calc(50% + 4px)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PLANS.map((plan) => (
              <TiltCard key={plan.id}>
                <div
                  onClick={() => setSelectedPlan(plan.id as PlanId)}
                  className={`h-full relative rounded-2xl cursor-pointer overflow-hidden border-2 transition-all ${
                    selectedPlan === plan.id
                      ? "border-[#06b6d4] bg-[#06b6d4]/[0.05] shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]"
                      : "border-[var(--color-border)] bg-white/[0.02] hover:border-white/10"
                  }`}
                >
                  {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-xs font-bold px-3 py-1 text-gray-900 rounded-bl-xl">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-display font-medium text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-6 h-10 font-light">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-display font-semibold text-white">
                      ₹{billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="text-[var(--color-text-secondary)] text-sm font-light">
                      /{billingCycle === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center text-sm text-[var(--color-text-secondary)] font-light">
                        <Check className={`w-4 h-4 mr-3 shrink-0 ${selectedPlan === plan.id ? "text-[var(--color-primary)]" : "text-gray-600"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6 border-[var(--color-primary)]/20 shadow-[0_0_40px_-10px_rgba(16,185,129,0.1)] bg-[var(--color-surface)] overflow-hidden">
            <CardHeader className="bg-white/[0.02] border-b border-[var(--color-border)] pb-8 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 text-[var(--color-primary)] opacity-10">
                <Sparkles className="w-40 h-40" />
              </div>
              <CardTitle className="flex justify-between items-end relative z-10">
                <span className="text-base font-display font-medium text-white">Order Summary</span>
                <span className="text-3xl font-display font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-emerald-400">
                  ₹{activePrice}
                </span>
              </CardTitle>
              <div className="mt-3 space-y-1 relative z-10">
                <div className="flex justify-between text-xs text-[var(--color-text-secondary)] font-medium">
                  <span>{activePlan.name}</span>
                  <span className="capitalize">{billingCycle}</span>
                </div>
                <div className="flex justify-between text-xs text-[var(--color-text-secondary)]">
                  <span>Recurring billing</span>
                  <span className="text-[var(--color-primary)] font-medium">Cancel anytime</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
              {paypalError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                  {paypalError}
                </div>
              )}
              {isProcessing ? (
                <div className="w-full h-12 flex items-center justify-center gap-2 text-[var(--color-text-secondary)]">
                  <div className="w-4 h-4 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm font-medium">Confirming subscription...</span>
                </div>
              ) : (
                <PayPalButtonsMounted
                  planId={activePlanId}
                  onSuccess={handlePayPalSuccess}
                  onError={setPaypalError}
                />
              )}
              <div className="flex items-center justify-center gap-2 pt-2">
                <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                  256-bit SSL Encrypted · Powered by PayPal
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
