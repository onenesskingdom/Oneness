import { Users, Heart, TrendingUp } from 'lucide-react';

export default function Community() {
  const stats = [
    {
      icon: Users,
      value: '10K+',
      label: 'コミュニティメンバー',
      sublabel: 'Community Members'
    },
    {
      icon: Heart,
      value: '50K+',
      label: '貢献完了',
      sublabel: 'Contributions Completed'
    },
    {
      icon: TrendingUp,
      value: '95%',
      label: '満足度',
      sublabel: 'Satisfaction Rate'
    }
  ];

  return (
    <section className="py-24 bg-[#FDFCF9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-[#333333] mb-4">
            成長するコミュニティ
          </h2>
          <p className="text-xl text-[#666666]">
            A Growing Community of Contributors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-8 rounded-2xl bg-gradient-to-br from-white to-[#F5F3EF] border border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#B86A50] bg-opacity-10 mb-6">
                <stat.icon className="w-8 h-8 text-[#B86A50]" />
              </div>
              <div className="text-5xl font-light text-[#B86A50] mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-medium text-[#333333] mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-[#666666]">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#B86A50] to-[#8A8F70] rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-light mb-6">
                国際的な愛のコミュニティ
              </h3>
              <p className="text-lg md:text-xl mb-8 opacity-95 leading-relaxed">
                Join an international community model where love, peace, and harmony create lasting connections.
                Experience a new way of living based on mutual contribution and trust.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg border border-white border-opacity-30">
                  日本語対応 (Japanese)
                </div>
                <div className="px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg border border-white border-opacity-30">
                  English Support
                </div>
                <div className="px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg border border-white border-opacity-30">
                  International
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
