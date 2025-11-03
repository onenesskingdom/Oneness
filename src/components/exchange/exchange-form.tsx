'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { LoadingSpinner } from "@/lib/icons";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "@/lib/utils";

interface ExchangeFormProps {
    user: {
        op_balance: number;
        monthly_redeemed_op: number;
    };
    exchangeRates: {
        op_to_jpy: number;
        op_to_usdt: number;
        op_to_btc: number;
    }
}

export default function ExchangeForm({ user, exchangeRates }: ExchangeFormProps) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [payoutAmount, setPayoutAmount] = useState(0);

    const monthlyLimit = (user.op_balance + user.monthly_redeemed_op) / 3;
    const availableToRedeemThisMonth = monthlyLimit - user.monthly_redeemed_op;

    const formSchema = z.object({
        op_amount: z.coerce.number().positive("申請額は正でなければなりません。")
            .max(user.op_balance * 0.95, "手数料を考慮すると、OP残高が不足しています。")
            .max(availableToRedeemThisMonth, `今月の換金上限（${Math.floor(availableToRedeemThisMonth)} OP）を超えています。`),
        target_currency: z.enum(["JPY", "USDT", "BTC"], { required_error: "通貨を選択してください。" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            op_amount: undefined,
            target_currency: undefined,
        },
    });

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const opAmount = parseFloat(e.target.value) || 0;
        const currency = form.getValues("target_currency");
        calculatePayout(opAmount, currency);
        form.setValue("op_amount", opAmount, { shouldValidate: true });
    };

    const handleCurrencyChange = (currency: "JPY" | "USDT" | "BTC") => {
        const opAmount = form.getValues("op_amount") || 0;
        calculatePayout(opAmount, currency);
        form.setValue("target_currency", currency, { shouldValidate: true });
    };

    const calculatePayout = (opAmount: number, currency: "JPY" | "USDT" | "BTC" | undefined) => {
        if (!currency || !opAmount) {
            setPayoutAmount(0);
            return;
        }
        const rate = exchangeRates[`op_to_${currency.toLowerCase()}` as keyof typeof exchangeRates];
        setPayoutAmount(opAmount * rate);
    };


    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        // This is where the requestExchange cloud function would be called.
        console.log("Exchange request:", values);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast({
            title: "換金申請が送信されました",
            description: `${values.op_amount} OPの換金申請が保留中です。`,
        });
        
        setIsLoading(false);
        form.reset();
        setPayoutAmount(0);
    }
    
    const fee = form.watch('op_amount') * 0.05 || 0;
    const totalDeducted = (form.watch('op_amount') || 0) + fee;

    return (
        <Card>
            <CardHeader>
                <CardTitle>新規換金申請</CardTitle>
                <CardDescription>現在のOP保有量: {user.op_balance.toLocaleString()} OP</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-muted p-3 rounded-lg">
                                <h4 className="font-semibold text-muted-foreground">月間換金上限</h4>
                                <p className="text-xl font-bold">{Math.floor(monthlyLimit).toLocaleString()} OP</p>
                            </div>
                             <div className="bg-muted p-3 rounded-lg">
                                <h4 className="font-semibold text-muted-foreground">今月の換金可能額</h4>
                                <p className="text-xl font-bold">{Math.floor(availableToRedeemThisMonth).toLocaleString()} OP</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <FormField
                                control={form.control}
                                name="op_amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>換金希望OP額</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="number" 
                                                placeholder="例: 1000" 
                                                {...field} 
                                                onChange={handleAmountChange} 
                                                value={field.value || ''}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="target_currency"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>交換先通貨</FormLabel>
                                        <Select onValueChange={(value: "JPY" | "USDT" | "BTC") => handleCurrencyChange(value)} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="通貨を選択..." />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="JPY">JPY (円)</SelectItem>
                                                <SelectItem value="USDT">USDT (Tether)</SelectItem>
                                                <SelectItem value="BTC">BTC (Bitcoin)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        
                        <div className="space-y-2 text-sm border-t pt-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">手数料 (5%):</span>
                                <span>{fee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} OP</span>
                            </div>
                            <div className="flex justify-between font-semibold">
                                <span className="text-muted-foreground">差し引かれるOP総額:</span>
                                <span>{totalDeducted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} OP</span>
                            </div>
                             <div className="flex justify-between text-lg font-bold text-primary pt-2">
                                <span>受取予定額:</span>
                                <span>
                                    {payoutAmount.toLocaleString(undefined, { 
                                        minimumFractionDigits: form.watch('target_currency') === 'BTC' ? 8 : 2,
                                        maximumFractionDigits: form.watch('target_currency') === 'BTC' ? 8 : 2,
                                    })} {form.watch('target_currency')}
                                </span>
                            </div>
                        </div>
                        <FormDescription>
                           管理者の承認後、ご登録の口座へ7営業日以内に着金します。
                        </FormDescription>

                    </CardContent>
                    <CardFooter>
                         <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? <LoadingSpinner /> : '換金申請を送信'}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}