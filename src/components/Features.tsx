import { Sparkles, TrendingUp, Shield, Gift } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Sparkles,
      title: 'AI マッチング (AI Matching)',
      description: 'Smart AI algorithms connect you with community members who share your skills and needs',
      color: 'text-[#B86A50]',
      bgColor: 'bg-[#B86A50]'
    },
    {
      icon: Gift,
      title: '貢献経済 (Contribution Economy)',
      description: 'Earn Oneness Kingdom Points (WNP) through meaningful contributions and help others',
      color: 'text-[#8A8F70]',
      bgColor: 'bg-[#8A8F70]'
    },
    {
      icon: Shield,
      title: '信頼グラフ (Trust Network)',
      description: 'Build reputation through verified interactions and evaluations from community members',
      color: 'text-[#B86A50]',
      bgColor: 'bg-[#B86A50]'
    },
    {
      icon: TrendingUp,
      title: 'ポイント報酬 (Point Rewards)',
      description: 'Convert your contributions into value within a circular economy of gratitude',
      color: 'text-[#8A8F70]',
      bgColor: 'bg-[#8A8F70]'
    }
  ];

  return (
    <section className="py-24 bg-[#FDFCF9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-[#333333] mb-4">
            プラットフォームの特徴
          </h2>
          <p className="text-xl text-[#666666]">
            Platform Features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-[#B86A50] hover:border-opacity-30 transition-all duration-300 hover:shadow-xl"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${feature.bgColor} bg-opacity-10 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-2xl font-medium text-[#333333] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#666666] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
