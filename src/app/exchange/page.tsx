import ExchangeForm from "@/components/exchange/exchange-form";
import TransactionHistory from "@/components/exchange/transaction-history";
import { OnenessKingdomLogo } from "@/lib/icons";
import Link from "next/link";

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
        { id: 'txn1', request_date: new Date('2024-07-20'), op_amount: 500, target_currency: 'JPY', payout_amount: 750, status: 'completed' },
        { id: 'txn2', request_date: new Date('2024-08-05'), op_amount: 1000, target_currency: 'USDT', payout_amount: 10, status: 'approved' },
        { id: 'txn3', request_date: new Date('2024-08-15'), op_amount: 2000, target_currency: 'BTC', payout_amount: 0.0003, status: 'pending' },
        { id: 'txn4', request_date: new Date('2024-08-18'), op_amount: 300, target_currency: 'JPY', payout_amount: 450, status: 'rejected' },
    ]

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mx-auto grid w-full max-w-4xl gap-8">
                <div className="grid gap-2 text-center">
                    <Link href="/" className="flex justify-center items-center gap-2 mb-4">
                        <OnenessKingdomLogo className="h-10 w-10" />
                    </Link>
                    <h1 className="text-3xl font-bold font-headline">OP通貨交換システム</h1>
                    <p className="text-balance text-muted-foreground">
                        あなたのOPを外部通貨に交換します。
                    </p>
                </div>
                
                <ExchangeForm user={user} exchangeRates={exchangeRates} />
                
                <TransactionHistory transactions={transactions} />
            </div>
        </div>
    );
}