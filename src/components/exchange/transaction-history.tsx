'use client';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

type Transaction = {
    id: string;
    request_date: Date;
    op_amount: number;
    target_currency: string;
    payout_amount: number;
    status: 'pending' | 'approved' | 'processing' | 'completed' | 'rejected';
}

interface TransactionHistoryProps {
    transactions: Transaction[];
}

const statusVariantMap = {
    pending: 'default',
    approved: 'secondary',
    processing: 'outline',
    completed: 'default',
    rejected: 'destructive',
} as const;

const statusTextMap = {
    pending: '保留中',
    approved: '承認済',
    processing: '処理中',
    completed: '完了',
    rejected: '却下',
};


export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
    if (!transactions || transactions.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>取引履歴</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center py-8">取引履歴はまだありません。</p>
                </CardContent>
            </Card>
        );
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>取引履歴</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>申請日</TableHead>
                            <TableHead>ステータス</TableHead>
                            <TableHead className="text-right">OP額</TableHead>
                            <TableHead className="text-right">受取額</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((tx) => (
                            <TableRow key={tx.id}>
                                <TableCell>{tx.request_date.toLocaleDateString()}</TableCell>
                                <TableCell>
                                     <Badge variant={statusVariantMap[tx.status]} className={cn(
                                         tx.status === 'completed' && 'bg-green-600 text-white',
                                         tx.status === 'pending' && 'bg-yellow-500 text-black'
                                     )}>
                                        {statusTextMap[tx.status]}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right font-medium">{tx.op_amount.toLocaleString()} OP</TableCell>
                                <TableCell className="text-right font-medium">
                                    {tx.payout_amount.toLocaleString(undefined, {
                                         minimumFractionDigits: tx.target_currency === 'BTC' ? 8 : 2,
                                         maximumFractionDigits: tx.target_currency === 'BTC' ? 8 : 2,
                                    })} {tx.target_currency}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}