import Image from 'next/image'
import Link from 'next/link'
import { Zen_Maru_Gothic } from "next/font/google";
import ScrollTop from './components/ScrollTop';


const Zen_Maru_500 = Zen_Maru_Gothic({
  weight: "500",
  subsets: ["latin"],
});


export default function Home() {

  return (
    <>
      <div className='bg-lp-topView'>
        <header className='bg-opacity-0 py-4'>
          <div className='container mx-auto w-3/4 flex flex-row justify-between '>
            <div>
              <Image
                src="/images/mooway_landingpage_headerlogo.png" 
                className="mx-auto" 
                alt="logo"
                width={130}
                height={20}
              />
            </div>
            <div className='text-white'>
              <Link href="/auth/login">ログイン</Link>
            </div>
          </div>
        </header>
        <section className='w-4/5 mx-auto mt-5'>
          <div className={`${Zen_Maru_500.className} text-white text-center text-3xl tracking-wider space-y-2 -mb-4`}>
            <p>AI<span className='text-xl'>に</span>愚痴るだけ</p>
            <p>無意味<span className='text-xl'>な</span>仕事<span className='text-xl'>が</span>見えてくる。</p>
          </div>
          <div className='flex flex-col'>
            <div className='flex justify-center z-10 translate-y-44  '>
              <Link href='/auth/signup' className='px-6 py-2 border-2 border-gray-800 rounded-3xl bg-lp-topButton text-gray-700'>
                無料で登録する
              </Link>
            </div>
            <div className='z-0'>
              <Image
                src="/images/mooway_landingpage_count.svg" 
                className="mx-auto h-48" 
                alt="logo"
                width={600}
                height={120}
              />
            </div>
          </div>
        </section>
      </div>
      <main className='bg-white'>
          <div  className='mx-auto' >
            <section id='main_container' className='mx-auto px-5 md:px-0'>
              <div className='mt-16'>
                <Image
                  src="/images/mooway_logo.svg" 
                  className="mx-auto h-16 mb-5" 
                  alt="logo"
                  width={600}
                  height={120}
                />
              </div>
              <div className='w-4/5 mx-auto text-center my-10 space-y-5'>
                <p >我慢する人たちが「No,way!（もう、無理！）」となる前に</p>
                <p>あなたに寄り添い、無意味な仕事を記録し</p>
                <p>気持ちよく働くためのヒントを提供するAIチャットアプリ</p>
              </div>
                <hr></hr>
              <div className='text-center mt-4'>
                <p>MOOWAY!では、あなたと同じ悩みを共有するパートナー「うし本（もと）」が、</p>
                <p>あなたの愚痴を聞いて、返答したり、問題点をまとめてくれたりします。</p>
              </div>
              
              <div className="">
                <Image
                  src="/images/mooway_landingpage_about_2.png" 
                  className="mx-auto mb-5 " 
                  alt="logo"
                  width={700}
                  height={300}
                />
              </div>
              <div className='w-4/5 mx-auto text-left my-7 space-y-2 mb-20 px-6'>
                <p>うし本とは</p>
                <br></br>
                <p>毎日、ブルシット（無意味）な仕事に追われるサラリーマン。</p>
                <p>おっとりしてて、ちょっと控えめな性格。</p>
                <p>なんでも我慢してまじめに取り組むため、簡単な仕事も難しい仕事も任されがち。</p>
                <p>金曜の夜にひとりでおいしいご飯やお酒を食べることが楽しみ。</p>
              </div>
            </section>
            <section className='w-11/12 mx-auto bg-gray-200 py-10 rounded-3xl'>
              <div id='main_container' className='mx-auto ' >
                  <div>
                    <p className='text-center mb-10 text-xl'>
                      USE CASE
                    </p>
                  </div>
                  <div className='flex flex-col-reverse md:flex-row justify-between mb-10 md:px-20'>
                    <div className='h-56 md:w-96 mx-auto px-2 '>
                      <Image
                        src="/images/mooway_landingpage_appui_1.png" 
                        className="mx-auto mb-5 " 
                        alt="ui"
                        width={384}
                        height={224}
                      />
                    </div>
                    <div className='md:w-2/5 mx-auto md:mx-0 '>
                      <p className='text-center w-3/5 mx-auto'>
                        1
                      </p>
                      <div className='p-4 break-all text-center w-4/5 mx-auto'>
                        <p>チャットでうし本に愚痴る</p>
                      </div>
                      <div className='p-4 break-all w-4/5 mx-auto'>
                        <p>仕事の不満をうし本に愚痴ってみてください。</p>
                        <p>同じ悩みを抱えるうし本が声をかけてくれます。</p>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col md:flex-row w-96 mx-auto justify-between mb-10 md:px-20 md:w-auto'>
                      <div className='md:w-2/5 mx-auto md:mx-0 '>
                          <p className='text-center w-3/5 mx-auto'>
                            2
                          </p>
                        <div className='p-4 break-all text-center w-4/5 mx-auto'>
                          <p>愚痴から自動で課題を抽出</p>
                        </div>
                        <div className='p-4 break-all w-4/5 mx-auto'>
                          <p>愚痴を「職場の課題」として再定義します。</p>
                          <p>課題を認知することが、無意味な仕事をなくすための重要なステップです。</p>
                        </div>
                      </div>
                      <div className='h-56 md:w-96 mx-auto px-2 '>
                        <Image
                          src="/images/mooway_landingpage_appui_2.png" 
                          className="mx-auto mb-5 " 
                          alt="ui"
                          width={384}
                          height={224}
                        />
                      </div>
                  </div>
                  <div className='flex flex-col-reverse md:flex-row justify-between mb-10 md:px-20'>
                    <div className='h-56 md:w-96 mx-auto px-2 '>
                      <Image
                        src="/images/mooway_landingpage_appui_3.png" 
                        className="mx-auto mb-5" 
                        alt="ui"
                        width={384}
                        height={224}
                      />
                    </div>
                    <div className='md:w-2/5 mx-auto md:mx-0 '>
                      <p className='text-center w-3/5 mx-auto'>
                        3
                      </p>
                      <div className='p-4 break-all text-center w-4/5 mx-auto'>
                        <p>うし本が解決策を提案</p>
                      </div>
                      <div className='p-4 break-all w-4/5 mx-auto'>
                        <p>課題の解決方法をうし本に聞いてみましょう。</p>
                        <p>意外な視点も得られるかも？</p>
                      </div>
                    </div>
                  </div> 
              </div>
            </section>
          </div>
          <section className='my-5 p-10'>
            <div>
              <p className='text-center mb-5 text-xl'>
                うし本のつぶやき
              </p>
            </div>
              <div id='x_container' className='mx-auto p-4 overflow-auto border-2 border-gray-800 '>
                <div>
                  <div>
                    <Link 
                      className="twitter-timeline mx-auto" 
                      href="https://twitter.com/mooway_ushimoto?ref_src=twsrc%5Etfw"
                    >
                      Tweets by mooway_ushimoto
                    </Link> 
                  </div>
                </div>
              </div>
          </section>
        </main>
        <div className='text-center'>
          <ScrollTop />
        </div>
      <script async src="https://platform.twitter.com/widgets.js" ></script>
    </>
  )
}
