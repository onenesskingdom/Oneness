'use client';

import dynamic from 'next/dynamic';
import { OnenessKingdomLogo } from "@/lib/icons";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WKPWalletComponent } from "@/components/wallet/wkp-wallet";
import { DonationPanel } from "@/components/wallet/donation-panel";

const ExchangeForm = dynamic(() => import("@/components/exchange/exchange-form"), { ssr: false });
const TransactionHistory = dynamic(() => import("@/components/exchange/transaction-history"), { ssr: false });
const BuyOpForm = dynamic(() => import("@/components/exchange/buy-op-form"), { ssr: false });


export default function ExchangePage() {

    // Mock data for now
    const user = {
        op_balance: 10000,
        monthly_redeemed_op: 1000,
    }
    
    const exchangeRates = {
        op_to_jpy: 1.5,
        op_to_usdt: 0.01,
        op_to_btc: 0.00000015
    }

    const transactions = [
        { id: 'txn1', type: 'exchange' as const, date: new Date('2024-07-20'), op_amount: 500, currency: 'JPY', amount: 750, status: 'completed' as const },
        { id: 'buy1', type: 'purchase' as const, date: new Date('2024-08-19'), op_amount: 2000, currency: 'JPY', amount: 2000, status: 'completed' as const },
        { id: 'txn2', type: 'exchange' as const, date: new Date('2024-08-05'), op_amount: 1000, currency: 'USDT', amount: 10, status: 'approved' as const },
        { id: 'txn3', type: 'exchange' as const, date: new Date('2024-08-15'), op_amount: 2000, currency: 'BTC', amount: 0.0003, status: 'pending' as const },
        { id: 'txn4', type: 'exchange_rejection' as const, date: new Date('2024-08-18'), op_amount: 300, currency: 'JPY', amount: 450, status: 'rejected' as const },
    ]

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mx-auto grid w-full max-w-6xl gap-8">
                <div className="grid gap-2 text-center">
                    <Link href="/" className="flex justify-center items-center gap-2 mb-4">
                        <OnenessKingdomLogo className="h-10 w-10" />
                    </Link>
                    <h1 className="text-3xl font-bold font-headline">WKP 交換・寄付センター</h1>
                    <p className="text-balance text-muted-foreground">
                        WKPを交換、寄付、またはチップを送信します。
                    </p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Exchange */}
                    <div className="space-y-6">
                        <Tabs defaultValue="exchange">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="exchange">WKPを換金</TabsTrigger>
                                <TabsTrigger value="buy">WKPを購入</TabsTrigger>
                            </TabsList>
                            <TabsContent value="exchange">
                                <ExchangeForm user={user} exchangeRates={exchangeRates} />
                            </TabsContent>
                            <TabsContent value="buy">
                                <BuyOpForm user={user} />
                            </TabsContent>
                        </Tabs>
                        
                        <TransactionHistory transactions={transactions} />
                    </div>
                    
                    {/* Right Column - Wallet & Donations */}
                    <div className="space-y-6">
                        <div className="lg:sticky lg:top-8 space-y-6">
                            <WKPWalletComponent />
                            <DonationPanel />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
