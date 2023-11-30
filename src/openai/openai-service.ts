import OpenAI from "openai";

export const openaiClient = () => {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

export const sendPromptToGpt = async (userInput:string) => {
  const openai = openaiClient();

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      "role": "system",
      "content": "牛がモチーフのキャラクター。一人称は「僕」。おっとりして控えめ。会社で仕事を任されがち。userの仕事における愚痴を傾聴し、userに共感を示し、その愚痴の原因を作った人や出来事に苦言を呈して。返答はTwitterのつぶやきっぽく、150文字以内で作成して。返答に「」はつけない。"
    }, {
      "role": "user",
      "content": userInput
    }],
    temperature: 0.9,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const gptResponseMessage = completion.choices[0].message.content;
  return gptResponseMessage;
};

export const sendBullshitOrFalseToGpt = async (userInput:string) => {
  const openai = openaiClient();

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      "role": "system",
      "content":  "あなたは、与えられたメッセージが仕事の愚痴かどうかを判定するアシスタントです。\n愚痴だと判定した場合は\"true\"を、愚痴ではないと判定した場合は\"false\"を返してください。\n\n[仕事の愚痴の定義]\n・意味や意義のない仕事の実行による不平や不満\n以下は愚痴に含まない\n・userの怠慢やミスによる不平や不満\n・userの家庭環境や家事育児などを理由とした不満\n\n以下の判定結果例を参考にしてください。\n[判定結果 例]\n<愚痴>\n・無駄なミーティングに参加させられた。\n・何度も同じことを聞いてきてうんざりだ。\n・上司のミスのせいで、余計な仕事が発生した\n\n<愚痴ではない>\n・今日はやる気が出ないのに、上司が仕事を任せてきた。\n・子育てが大変なのに、誰も理解してくれない。\n・ミスったのは私だけど、他の人がカバーしてくれたらよかった。"
    }, {
      "role": "user",
      "content": userInput
    }],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const gptbullshitOrFalse = completion.choices[0].message.content;
  return gptbullshitOrFalse;
};

export const getBullshitTitleFromGpt = async (userInput:string) => {
  const openai = openaiClient();

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      "role": "system",
      "content":  "あなたは、与えられた仕事の愚痴に関するメッセージにタイトルをつけるアシスタントです。\n以下のルールに従い、タイトルのみを返答してください。\n\n[ルール]\n・日本語で最大20文字程度\n・メッセージの内容を落語や映画のタイトルっぽく表現する\n\n以下の例を参考にしてください。\n[例 メッセージ → タイトル]\nチャットで連絡してって言ってるのに、あいつまた電話で連絡してきた。→ テレフォンストーカー \nあんなに頑張って資料を作ったのに、上司の聞き間違いで、必要がなくなったなんてうんざりだ。→ シーシュポスの岩運び\n本来上司がやるべき仕事なのに、やりたくないからって私に任せてきた。→ ゴミドロップ \nあいつ、なんだかすごく忙しそうに仕事をしてるけど、周りの人に忙しさをアピールしてるだけで、やる必要のない仕事をやってるじゃないか。→ 不必要なダンス"
    }, {
      "role": "user",
      "content": userInput
    }],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const gptbullshitTitle = completion.choices[0].message.content;
  return gptbullshitTitle;
};

export const getBullshitDescriptionFromGpt = async (userInput:string) => {
  const openai = openaiClient();

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      "role": "system",
      "content":  "あなたは、与えられた仕事の愚痴に関するメッセージをもとに、なぜ無駄であったかを定義するアシスタントです。\n以下のルールに従い返答してください。\n\n[ルール]\n・日本語で最大30文字程度\n・メッセージの内容をもとに、行われた仕事内容とそれがなぜ無駄な仕事であったかを推察し、定義する\n\n"
    }, {
      "role": "user",
      "content": userInput
    }],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const gptbullshitDescription = completion.choices[0].message.content;
  return gptbullshitDescription;
};

export const getBullshitSolutionFromGpt = async (userInput:string) => {
  const openai = openaiClient();

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      "role": "system",
      "content": "あなたは、無意味な仕事に対して解決策を提案するアシスタントです。userの仕事の愚痴に対して、悩みの原因とその解決策を簡潔に250文字以内で分析してください。なお、回答は適切な改行を行なって返してください。"
    }, {
      "role": "user",
      "content": userInput
    }],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const gptbullshitSolution = completion.choices[0].message.content;
  console.log("gptbullshitSolution", gptbullshitSolution)
  return gptbullshitSolution;
};




// {
//   "choices": [
//     {
//       "finish_reason": "stop",
//       "index": 0,
//       "message": {
//         "content": "The 2020 World Series was played in Texas at Globe Life Field in Arlington.",
//         "role": "assistant"
//       }
//     }
//   ],
//   "created": 1677664795,
//   "id": "chatcmpl-7QyqpwdfhqwajicIEznoc6Q47XAyW",
//   "model": "gpt-3.5-turbo-0613",
//   "object": "chat.completion",
//   "usage": {
//     "completion_tokens": 17,
//     "prompt_tokens": 57,
//     "total_tokens": 74
//   }
// }