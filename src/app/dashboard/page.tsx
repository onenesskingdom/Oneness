import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Bell, Bookmark, Clapperboard, Compass, Heart, Home, Image as ImageIcon, MessageCircle, MoreHorizontal, Search, Send, Smile, User, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock Data
const userProfile = {
    name: "愛 平和 (Ai Heiwa)",
    username: "ai_heiwa",
    avatarUrl: "https://picsum.photos/seed/user1/100/100",
    op_balance: 12500,
};

const stories = [
    { id: 1, username: "Satoshi", avatarUrl: "https://picsum.photos/seed/story1/80/80" },
    { id: 2, username: "Yuki", avatarUrl: "https://picsum.photos/seed/story2/80/80" },
    { id: 3, username: "Haru", avatarUrl: "https://picsum.photos/seed/story3/80/80" },
    { id: 4, username: "Kenji", avatarUrl: "https://picsum.photos/seed/story4/80/80" },
    { id: 5, username: "Mei", avatarUrl: "https://picsum.photos/seed/story5/80/80" },
    { id: 6, username: "Ren", avatarUrl: "https://picsum.photos/seed/story6/80/80" },
];

const posts = [
    {
        id: 1,
        author: { name: "コミュニティガーデン", username: "community_garden_jp", avatarUrl: "https://picsum.photos/seed/post1/80/80" },
        content: "今日の収穫です！愛情を込めて育てた野菜は、格別な味がしますね。皆さんも、ぜひ土に触れる喜びを感じてみてください。 #家庭菜園 #オーガニック #貢献",
        imageUrl: "https://picsum.photos/seed/p1/600/400",
        imageHint: "fresh vegetables harvest",
        likes: 128,
        comments: 15,
        timestamp: "2時間前",
    },
    {
        id: 2,
        author: { name: "ワンネスアート", username: "oneness_art", avatarUrl: "https://picsum.photos/seed/post2/80/80" },
        content: "「調和」をテーマにした新作が完成しました。異なる色が混ざり合い、一つの美しい全体を創り出す様子は、私たちのコミュニティそのものです。 #アート #調和 #創造性",
        imageUrl: "https://picsum.photos/seed/p2/600/700",
        imageHint: "abstract painting harmony",
        likes: 340,
        comments: 45,
        timestamp: "5時間前",
    },
];

const suggestions = [
    { id: 1, name: "未来技術ラボ", username: "future_tech_lab", avatarUrl: "https://picsum.photos/seed/sug1/80/80" },
    { id: 2, name: "平和の祈り", username: "peace_prayer", avatarUrl: "https://picsum.photos/seed/sug2/80/80" },
];

// Main Component
export default function DashboardPage() {
    return (
        <div className="bg-background text-foreground min-h-screen">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[240px_1fr_320px] gap-8 py-8">
                <LeftSidebar />
                <main className="space-y-6">
                    <Stories />
                    <CreatePostCard />
                    {posts.map(post => <PostCard key={post.id} post={post} />)}
                </main>
                <RightSidebar />
            </div>
        </div>
    );
}

// Sub-components
const LeftSidebar = () => (
    <aside className="hidden md:block sticky top-24 self-start space-y-4">
        <div className="flex items-center gap-3 p-2">
             <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
                <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-bold">{userProfile.name}</p>
                <p className="text-sm text-muted-foreground">@{userProfile.username}</p>
            </div>
        </div>
        <p className="px-2 text-lg font-semibold">{userProfile.op_balance.toLocaleString()} <span className="text-sm font-normal text-primary">OP</span></p>

        <nav className="space-y-1">
            <SidebarLink href="/dashboard" icon={Home} label="ホーム" active />
            <SidebarLink href="#" icon={Compass} label="発見" />
            <SidebarLink href="#" icon={Clapperboard} label="リール" />
            <SidebarLink href="/exchange" icon={Send} label="OPを交換" />
            <SidebarLink href="#" icon={Bell} label="お知らせ" />
            <SidebarLink href="#" icon={User} label="プロフィール" />
        </nav>
    </aside>
);

const SidebarLink = ({ href, icon: Icon, label, active = false }: { href: string, icon: React.ElementType, label: string, active?: boolean }) => (
    <Link href={href} className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-lg hover:bg-muted transition-colors",
        active ? "font-bold" : "text-muted-foreground"
    )}>
        <Icon className="h-6 w-6" />
        <span>{label}</span>
    </Link>
);


const Stories = () => (
    <Card>
        <CardContent className="p-4">
            <div className="flex space-x-4 overflow-x-auto pb-2">
                {stories.map(story => (
                    <div key={story.id} className="flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer">
                        <Avatar className="h-16 w-16 border-2 border-pink-500 p-0.5">
                            <AvatarImage src={story.avatarUrl} alt={story.username} />
                            <AvatarFallback>{story.username.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{story.username}</span>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

const CreatePostCard = () => (
    <Card>
        <CardContent className="p-4">
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
                    <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Input placeholder={`何を考えていますか、${userProfile.name}さん？`} className="flex-grow bg-muted border-none" />
            </div>
            <Separator className="my-3" />
            <div className="flex justify-around">
                <Button variant="ghost" className="text-muted-foreground"><ImageIcon className="mr-2 text-green-500" />写真</Button>
                <Button variant="ghost" className="text-muted-foreground"><Video className="mr-2 text-blue-500" />動画</Button>
                <Button variant="ghost" className="text-muted-foreground"><Smile className="mr-2 text-yellow-500" />気分</Button>
            </div>
        </CardContent>
    </Card>
);

const PostCard = ({ post }: { post: (typeof posts)[0] }) => (
    <Card>
        <CardHeader className="p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold">{post.author.name}</p>
                        <p className="text-sm text-muted-foreground">@{post.author.username}・{post.timestamp}</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
            </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-4">
            <p>{post.content}</p>
            {post.imageUrl && (
                <div className="rounded-lg overflow-hidden border">
                    <Image
                        src={post.imageUrl}
                        alt="投稿画像"
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover"
                        data-ai-hint={post.imageHint}
                    />
                </div>
            )}
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-col items-start space-y-3">
             <div className="flex justify-between w-full text-muted-foreground">
                <span>{post.likes} いいね</span>
                <span>{post.comments} コメント</span>
            </div>
            <Separator />
            <div className="flex justify-around w-full">
                <Button variant="ghost" className="text-muted-foreground"><Heart className="mr-2" />いいね</Button>
                <Button variant="ghost" className="text-muted-foreground"><MessageCircle className="mr-2" />コメント</Button>
                <Button variant="ghost" className="text-muted-foreground"><Send className="mr-2" />シェア</Button>
                <Button variant="ghost" className="text-muted-foreground"><Bookmark className="mr-2" />保存</Button>
            </div>
        </CardFooter>
    </Card>
);


const RightSidebar = () => (
    <aside className="hidden lg:block sticky top-24 self-start space-y-6">
        <Card>
            <CardHeader><h3 className="font-bold">フォローするかも</h3></CardHeader>
            <CardContent className="space-y-4">
                {suggestions.map(sug => (
                    <div key={sug.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={sug.avatarUrl} alt={sug.name} />
                                <AvatarFallback>{sug.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{sug.name}</p>
                                <p className="text-sm text-muted-foreground">@{sug.username}</p>
                            </div>
                        </div>
                        <Button size="sm" variant="outline">フォロー</Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    </aside>
);
