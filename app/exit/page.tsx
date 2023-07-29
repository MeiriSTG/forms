"use client";

import { useSearchParams } from "next/navigation";

export default function Exit() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  if (!url) {
    return (
      <main>
        <div>
          <p>不正なアクセスです。</p>
        </div>
      </main>
    )
  }
  return (
    <main>
      <div>
        <p>エントリーを受け付けました。</p>
        <p>
          エントリー内容は、設定したIDとPasswordを用いて、エントリーフォームから修正できます。
        </p>
        <p><a href={url}>ここから運営サーバーに参加して下さい！</a></p>
        <hr className="spacer" />
        <p className="right"><a href="/forms/">トップページに戻る</a></p>
      </div>
    </main>
  )
}
