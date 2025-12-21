import { Heart, Users, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDFCF9] to-[#F5F3EF] pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#B86A50] bg-opacity-10 flex items-center justify-center">
              <Heart className="w-8 h-8 text-[#B86A50]" fill="currentColor" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-light text-[#333333] mb-6 tracking-tight">
            ワンネス王国
          </h1>
          <h2 className="text-3xl md:text-4xl font-light text-[#B86A50] mb-8">
            Oneness Kingdom
          </h2>

          <p className="text-xl md:text-2xl text-[#333333] mb-4 max-w-3xl mx-auto leading-relaxed">
            愛と貢献のコミュニティに参加しましょう
          </p>
          <p className="text-lg md:text-xl text-[#666666] mb-12 max-w-2xl mx-auto">
            Join a community built on Love, Peace, and Harmony
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-[#B86A50] text-white rounded-lg text-lg font-medium hover:bg-[#A05940] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              始める (Get Started)
            </button>
            <button className="px-8 py-4 bg-[#8A8F70] text-white rounded-lg text-lg font-medium hover:bg-[#7A7F60] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              詳しく見る (Learn More)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
          <div className="text-center p-6 rounded-2xl bg-white bg-opacity-50 backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#B86A50] bg-opacity-10 mb-4">
              <Heart className="w-7 h-7 text-[#B86A50]" />
            </div>
            <h3 className="text-xl font-medium text-[#333333] mb-2">愛 (Love)</h3>
            <p className="text-[#666666]">Building connections through compassion</p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white bg-opacity-50 backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#8A8F70] bg-opacity-10 mb-4">
              <Users className="w-7 h-7 text-[#8A8F70]" />
            </div>
            <h3 className="text-xl font-medium text-[#333333] mb-2">調和 (Harmony)</h3>
            <p className="text-[#666666]">Creating balance in community</p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white bg-opacity-50 backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#B86A50] bg-opacity-10 mb-4">
              <Globe className="w-7 h-7 text-[#B86A50]" />
            </div>
            <h3 className="text-xl font-medium text-[#333333] mb-2">平和 (Peace)</h3>
            <p className="text-[#666666]">Fostering global understanding</p>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#B86A50] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8A8F70] rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
