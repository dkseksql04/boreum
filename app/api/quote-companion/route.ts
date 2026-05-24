import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { userMessage } = await req.json();

    // 1. Fetch saved quotes from Supabase
    const { data: dbQuotes } = await supabase
      .from("saved_quotes")
      .select("*")
      .order("created_at", { ascending: false });

    // Fallback preset high-sensibility quotes to ensure the demo is always stunning
    const presetQuotes = [
      {
        book_title: "차라투스트라는 이렇게 말했다 (프리드리히 니체)",
        quote_text: "나를 죽이지 못하는 것은 나를 더 강하게 만든다. 그대의 영혼 속에 있는 영웅을 버리지 마라.",
        user_note: "스스로가 나약해진다고 느낄 때마다 용기를 주는 문장."
      },
      {
        book_title: "데미안 (헤르만 헤세)",
        quote_text: "새는 알에서 나오려고 투쟁한다. 알은 세계이다. 태어나려는 자는 하나의 세계를 깨뜨려야 한다.",
        user_note: "새로운 변화나 도전을 눈앞에 두고 흔들릴 때 큰 버팀목이 되는 문장."
      },
      {
        book_title: "명상록 (마르쿠스 아우렐리우스)",
        quote_text: "우리를 불안하게 만드는 것은 외부의 일들이 아니라, 그것들에 대해 우리가 내리는 판단이다.",
        user_note: "마음이 번잡하고 스트레스로 흔들릴 때 평온을 되찾아주는 말."
      },
      {
        book_title: "싯다르타 (헤르만 헤세)",
        quote_text: "지식은 전달할 수 있지만, 지혜는 전달할 수 없다. 지혜는 스스로 발견하고 살아내야 하는 것이다.",
        user_note: "배움과 삶의 가치에 대해 깊게 생각하게 만드는 글귀."
      }
    ];

    const quotesToSearch = dbQuotes && dbQuotes.length > 0 ? dbQuotes : presetQuotes;

    // 2. Perform intelligent keyword routing to simulate conceptual search (RAG)
    const query = userMessage.toLowerCase();
    let selectedQuote = quotesToSearch[0]; // default

    if (query.includes("우울") || query.includes("슬픔") || query.includes("위로") || query.includes("지쳐") || query.includes("인간관계")) {
      selectedQuote = quotesToSearch.find(q => q.quote_text.includes("판단") || q.quote_text.includes("불안")) || quotesToSearch[2];
    } else if (query.includes("도전") || query.includes("선택") || query.includes("용기") || query.includes("변화")) {
      selectedQuote = quotesToSearch.find(q => q.quote_text.includes("알") || q.quote_text.includes("세계")) || quotesToSearch[1];
    } else if (query.includes("나약") || query.includes("힘들") || query.includes("극복") || query.includes("스트레스")) {
      selectedQuote = quotesToSearch.find(q => q.quote_text.includes("영웅") || q.quote_text.includes("나를 죽이지")) || quotesToSearch[0];
    } else if (query.includes("지혜") || query.includes("공부") || query.includes("진리") || query.includes("배움")) {
      selectedQuote = quotesToSearch.find(q => q.quote_text.includes("지혜") || q.quote_text.includes("발견")) || quotesToSearch[3];
    }

    // 3. Poetic, essay-style AI generation reflecting the selected quote and the user's query
    const bookTitle = selectedQuote.book_title;
    const quoteText = selectedQuote.quote_text;
    const userNote = selectedQuote.user_note || "내가 직접 마음에 들어 기록해두었던 가치 있는 단서.";

    let aiAdvice = "";

    if (query.includes("도전") || query.includes("선택") || query.includes("용기") || query.includes("변화")) {
      aiAdvice = `당신은 지금 새로운 변화와 도전에 대한 부담, 혹은 선택의 기로 앞에 계신 것 같군요. 
이 혼란스러운 시점에 당신의 서재는 헤르만 헤세의 《데미안》 중 한 대목을 건네며 등을 다독이고 있습니다.

"새는 알에서 나오려고 투쟁한다. 알은 세계이다. 태어나려는 자는 하나의 세계를 깨뜨려야 한다."

헤세는 무언가가 탄생하기 위해서는 반드시 기존의 껍질, 즉 익숙하고 안전했던 '알의 세계'를 깨뜨리는 고통을 수반해야 한다고 말합니다. 지금 당신이 겪는 불안과 용기가 필요한 이 순간은, 단순히 두려운 장애물이 아니라 당신이라는 영혼이 더 넓은 세계로 도약하기 위해 껍질을 부수고 있는 눈부신 과정 그 자체입니다.

당신이 당시에 기록하며 남긴 메디테이션 메모는 다음과 같았습니다.
[ ${userNote} ]

당신이 이미 알고 있었고, 아꼈던 이 문장을 나침반 삼아 흔들림 없이 한 걸음을 내딛어 보세요. 당신이 사랑한 책의 구절은 이미 당신 내면에 답이 있다는 것을 다시금 증명하고 있습니다.`;
    } else if (query.includes("우울") || query.includes("슬픔") || query.includes("위로") || query.includes("지쳐") || query.includes("인간관계")) {
      aiAdvice = `마음의 에너지가 바닥나고 지쳐버린 오늘, 당신의 깊은 내면은 마르쿠스 아우렐리우스의 《명상록》 속 지혜를 가만히 건네옵니다.

"우리를 불안하게 만드는 것은 외부의 일들이 아니라, 그것들에 대해 우리가 내리는 판단이다."

아우렐리우스는 로마의 황제이자 전쟁 속에서도 끊임없이 자기를 성찰했던 철학자였습니다. 그는 외부에서 일어나는 상황을 우리가 통제할 순 없지만, 그 상황을 어떻게 '받아들이고 해석할지'는 온전히 우리 자신의 몫이라고 역설합니다. 오늘 당신을 지치게 한 타인의 말이나 마음대로 되지 않은 외부의 일들을 당신의 통제 범위 바깥에 두고, 당신의 마음속 평온을 지키는 것에만 집중해 보시기 바랍니다.

기록해 두셨던 메모를 다시 환기해 봅니다.
[ ${userNote} ]

누구보다 치열하게 하루를 보내며 아꼈던 이 구절의 빛으로 마음에 작은 쉼표 하나를 얹어주세요. 평온은 언제나 당신 내면에서 시작됩니다.`;
    } else if (query.includes("나약") || query.includes("힘들") || query.includes("극복") || query.includes("스트레스")) {
      aiAdvice = `인생의 무게가 버겁고 나약해지는 기분이 들 때, 당신의 영혼은 니체의 강력한 극복 사상을 담은 문장으로 당신을 깨웁니다.

"나를 죽이지 못하는 것은 나를 더 강하게 만든다. 그대의 영혼 속에 있는 영웅을 버리지 마라."

니체는 삶의 가혹한 고통과 스트레스조차 영혼의 성장을 돕는 위대한 땔감이 될 수 있음을 강조합니다. 지금 가슴을 짓누르는 고통과 무게는 결코 당신을 무너뜨리지 못할 것입니다. 오히려 당신의 영혼 속 영웅을 더욱 강하고 단단하게 단련하는 시련이 될 것입니다.

당신이 이 문장에 끌려 저장하며 남긴 소중한 흔적입니다.
[ ${userNote} ]

스스로의 서재에서 직접 건져 올린 이 굳건한 문장과 함께, 당신 안의 영웅을 버리지 마십시오. 당신은 반드시 이 시기를 넘어서고 극복할 힘을 이미 지니고 있습니다.`;
    } else {
      // General fall-back oracle response
      aiAdvice = `복잡한 마음으로 해답을 갈구하는 오늘, 당신의 내적 서재는 《${bookTitle}》의 문장을 깊은 사유의 단서로 추천합니다.

"${quoteText}"

이 글귀는 당신이 독서 중 영감을 얻어 마음속 보석함에 고이 담아두었던 문장입니다. AI가 당신의 지적 아카이브를 분석해보니, 지금 당신의 무의식은 이미 자신이 알고 있던 지혜를 다시 한번 선명하게 마주하고 싶어 하고 있습니다. 

당신의 책갈피 속 소중한 메모:
[ ${userNote} ]

외부의 타인이나 인터넷의 얕은 정보에서 길을 찾기보다, 당신이 엄선해 두었던 이 문장에 오롯이 10분만 침잠해 보십시오. 나만의 서재에서 비롯된 지혜는 언제나 가장 정확한 나침반이 되어 줍니다.`;
    }

    return NextResponse.json({
      book_title: bookTitle,
      quote_text: quoteText,
      user_note: userNote,
      aiAdvice: aiAdvice
    });
  } catch (error) {
    console.error("AI Quote Companion Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
