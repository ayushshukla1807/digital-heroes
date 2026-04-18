"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"
import { Loader2 } from "lucide-react"

declare global {
  interface Window {
    paypal?: any
  }
}

interface PayPalButtonsProps {
  planId: string
  onSuccess: (subscriptionId: string) => void
  onError: (err: string) => void
}

export function PayPalButtonsMounted({ planId, onSuccess, onError }: PayPalButtonsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sdkReady, setSdkReady] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!sdkReady || !containerRef.current || mounted || !planId || !window.paypal) return

    setMounted(true)

    try {
      window.paypal.Buttons({
        style: { layout: "vertical", color: "black", shape: "rect", label: "subscribe", height: 48 },
        createSubscription: (_data: any, actions: any) => {
          return actions.subscription.create({ plan_id: planId })
        },
        onApprove: (data: any) => {
          if (data.subscriptionID) {
            onSuccess(data.subscriptionID)
          } else {
            onError("Subscription ID missing from PayPal response.")
          }
        },
        onError: (err: any) => {
          console.error("PayPal error:", err)
          onError("Payment failed. Please try again.")
        },
        onCancel: () => onError("Payment was cancelled."),
      }).render(containerRef.current)
    } catch (err) {
      console.error("PayPal render failed:", err)
      onError("Could not render PayPal buttons.")
    }
  }, [sdkReady, planId, mounted, onSuccess, onError])

  if (!planId) {
    return (
      <div className="w-full p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
        <p className="text-xs text-amber-400 font-medium">PayPal plan not configured for this tier.</p>
      </div>
    )
  }

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "sb"

  return (
    <>
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${clientId}&vault=true&intent=subscription&currency=INR&components=buttons`}
        strategy="lazyOnload"
        onLoad={() => setSdkReady(true)}
        onError={() => onError("Failed to load PayPal. Check your connection.")}
      />
      {!sdkReady && (
        <div className="w-full h-12 flex items-center justify-center gap-2 text-[var(--color-text-secondary)]">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm font-medium">Loading PayPal...</span>
        </div>
      )}
      <div ref={containerRef} className={sdkReady ? "block" : "hidden"} />
    </>
  )
}
