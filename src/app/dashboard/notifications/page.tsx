import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock Data
const notifications = [
    {
        id: 1,
        type: 'like',
        user: { name: 'Satoshi', avatarUrl: 'https://picsum.photos/seed/story1/80/80' },
        postContent: '今日の収穫です！愛情を込めて育てた野菜は...',
        timestamp: '2時間前',
        read: false
    },
    {
        id: 2,
        type: 'comment',
        user: { name: 'Yuki', avatarUrl: 'https://picsum.photos/seed/story2/80/80' },
        comment: '素晴らしいアートですね！感動しました。',
        timestamp: '5時間前',
        read: false
    },
    {
        id: 3,
        type: 'follow',
        user: { name: '未来技術ラボ', avatarUrl: 'https://picsum.photos/seed/sug1/80/80' },
        timestamp: '1日前',
        read: true
    },
    {
        id: 4,
        type: 'mention',
        user: { name: 'Haru', avatarUrl: 'https://picsum.photos/seed/story3/80/80' },
        postContent: '... @ai_heiwa さんも興味があるかも？',
        timestamp: '2日前',
        read: true
    }
];


export default function NotificationsPage() {
    const unreadNotifications = notifications.filter(n => !n.read);
    const earlierNotifications = notifications.filter(n => n.read);

    return (
        <div className="container mx-auto max-w-2xl py-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">お知らせ</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {unreadNotifications.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">未読</h3>
                                {unreadNotifications.map(notification => (
                                    <NotificationItem key={notification.id} notification={notification} />
                                ))}
                            </div>
                        )}
                        {earlierNotifications.length > 0 && (
                             <div className="space-y-4">
                                <h3 className="text-lg font-semibold">既読</h3>
                                {earlierNotifications.map(notification => (
                                    <NotificationItem key={notification.id} notification={notification} />
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

const NotificationItem = ({ notification }: { notification: (typeof notifications)[0] }) => {
    return (
        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
            <Avatar className="h-10 w-10">
                <AvatarImage src={notification.user.avatarUrl} alt={notification.user.name} />
                <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow text-sm">
                <p>
                    <span className="font-bold">{notification.user.name}</span>
                    {notification.type === 'like' && `さんがあなたの投稿に「いいね！」しました: "${notification.postContent?.substring(0, 20)}..."`}
                    {notification.type === 'comment' && `さんがコメントしました: "${notification.comment}"`}
                    {notification.type === 'follow' && 'さんがあなたをフォローしました。'}
                    {notification.type === 'mention' && `さんがあなたをメンションしました: "${notification.postContent?.substring(0, 20)}..."`}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
            </div>
            {!notification.read && <div className="h-2.5 w-2.5 rounded-full bg-primary mt-1 flex-shrink-0" />}
        </div>
    );
};
