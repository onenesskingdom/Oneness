import { ArrowRight } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#F5F3EF] to-[#FDFCF9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-light text-[#333333] mb-6">
            今日から始めましょう
          </h2>
          <p className="text-xl md:text-2xl text-[#666666] mb-4">
            Start Your Journey Today
          </p>
          <p className="text-lg text-[#666666] mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of members building a community based on love, contribution, and mutual support.
            Your journey to meaningful connections starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group px-10 py-5 bg-[#B86A50] text-white rounded-xl text-lg font-medium hover:bg-[#A05940] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center gap-3">
              ワンネス王国に参加
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-5 bg-white text-[#B86A50] rounded-xl text-lg font-medium border-2 border-[#B86A50] hover:bg-[#B86A50] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              詳細を見る
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 bg-white rounded-xl border border-gray-100">
              <div className="text-3xl font-light text-[#B86A50] mb-2">無料</div>
              <div className="text-sm text-[#666666]">Free to Join</div>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-100">
              <div className="text-3xl font-light text-[#B86A50] mb-2">安全</div>
              <div className="text-sm text-[#666666]">KYC Verified</div>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-100">
              <div className="text-3xl font-light text-[#B86A50] mb-2">国際的</div>
              <div className="text-sm text-[#666666]">Global Community</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
