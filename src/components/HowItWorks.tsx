import { UserPlus, Search, Handshake, Award } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      number: '01',
      title: '参加する (Join)',
      description: 'Register and complete KYC to become a trusted member of the community'
    },
    {
      icon: Search,
      number: '02',
      title: '提供・要請 (Offer & Request)',
      description: 'Share your skills or request help from community members'
    },
    {
      icon: Handshake,
      number: '03',
      title: '貢献する (Contribute)',
      description: 'Connect with matched members and complete meaningful interactions'
    },
    {
      icon: Award,
      number: '04',
      title: '報酬を得る (Earn Rewards)',
      description: 'Receive evaluations and earn WNP points for your contributions'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#FDFCF9] to-[#F5F3EF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-[#333333] mb-4">
            仕組み
          </h2>
          <p className="text-xl text-[#666666]">
            How It Works
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-6 relative z-10">
                  <step.icon className="w-10 h-10 text-[#B86A50]" />
                </div>

                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-8xl font-bold text-[#B86A50] opacity-5 -z-0">
                  {step.number}
                </div>

                <h3 className="text-xl font-medium text-[#333333] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#666666] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#B86A50] to-transparent opacity-30"></div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-4xl mx-auto p-8 rounded-2xl bg-white border border-[#B86A50] border-opacity-20">
          <div className="text-center">
            <h3 className="text-2xl font-medium text-[#333333] mb-4">
              貢献と繋がりの価値
            </h3>
            <p className="text-lg text-[#666666] leading-relaxed">
              In Oneness Kingdom, <span className="font-medium text-[#B86A50]">Contribution</span> and <span className="font-medium text-[#8A8F70]">Connection</span> are the primary forms of value.
              Every positive interaction strengthens the trust network and earns you recognition in the community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
