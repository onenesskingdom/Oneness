import { Heart, Mail, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#333333] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#B86A50] flex items-center justify-center">
                <Heart className="w-5 h-5" fill="currentColor" />
              </div>
              <div>
                <h3 className="text-xl font-medium">ワンネス王国</h3>
                <p className="text-sm text-gray-400">Oneness Kingdom</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Building an international community based on love, peace, and harmony.
              Where contribution and connection are the primary forms of value.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center transition-all">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">プラットフォーム</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">特徴 (Features)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">仕組み (How It Works)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">コミュニティ (Community)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ポイント (Points)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">サポート</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">ヘルプ (Help)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">よくある質問 (FAQ)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">お問い合わせ (Contact)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">プライバシー (Privacy)</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              2024 Oneness Kingdom. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">利用規約</a>
              <a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a>
              <a href="#" className="hover:text-white transition-colors">Cookie設定</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
