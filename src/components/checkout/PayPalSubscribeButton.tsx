"use client"

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { Loader2 } from "lucide-react"

interface PayPalSubscribeButtonProps {
  planId: string
  onSuccess: (subscriptionId: string) => void
  onError: (err: string) => void
}

export function PayPalSubscribeButton({ planId, onSuccess, onError }: PayPalSubscribeButtonProps) {
  const [{ isPending, isRejected }] = usePayPalScriptReducer()

  if (!planId) {
    return (
      <div className="w-full p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
        <p className="text-xs text-amber-400 font-medium">PayPal plan not configured for this tier.</p>
      </div>
    )
  }

  if (isRejected) {
    return (
      <div className="w-full p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
        <p className="text-xs text-red-400 font-medium">Could not load PayPal. Please refresh and try again.</p>
      </div>
    )
  }

  if (isPending) {
    return (
      <div className="w-full h-12 flex items-center justify-center gap-2 text-[var(--color-text-secondary)]">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm font-medium">Loading PayPal...</span>
      </div>
    )
  }

  return (
    <div className="w-full">
      <PayPalButtons
        style={{ layout: "vertical", color: "black", shape: "rect", label: "subscribe", height: 48 }}
        createSubscription={(_data, actions) => {
          return actions.subscription.create({ plan_id: planId })
        }}
        onApprove={async (data) => {
          if (data.subscriptionID) {
            onSuccess(data.subscriptionID)
          } else {
            onError("Subscription ID missing from PayPal response.")
          }
        }}
        onError={(err) => {
          console.error("PayPal error:", err)
          onError("Payment failed. Please try again.")
        }}
        onCancel={() => onError("Payment was cancelled.")}
      />
    </div>
  )
}
