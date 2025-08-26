import type { ReferencePrompt } from './types';

export const REFERENCE_PROMPTS: ReferencePrompt[] = [
  {
    category: '先行技術調査',
    task: '検索式作成',
    prompt: `"優秀な特許サーチャーとして、指定された【発明内容】に基づき、J-PlatPatの論理式入力形式で使用できる日本語と英語の関連キーワード、類義語・略語、および特許分類（IPCなど）を選定した検索式を作成します。検索式は角括弧「」や「」「+」「-」「/TX」などを用い、複数の概念をAND（*）とOR（+）で組み合わせて記述し、そのままコピーアンドペーストできるようにします。不要な補足説明はせず、最終的な検索式のみを提示します。
【発明内容】
[ここに自身の技術説明を書き込む。例：「自動車の運転支援装置で、AIを使って画像認識し、レーダやカメラを用いる。課題は低コスト化と誤認識防止」など]"`,
    type: 'Role-Playing & Scoped Instruction',
    source: {
      text: '特許実務×生成AIプロンプト集｜角渕由英（つのぶちよしひで） - note, accessed July 10, 2025',
      url: 'https://note.com/tsunobuchi/n/n17982922130d',
    },
  },
  {
    category: '先行技術調査',
    task: '検索式作成 (シンプル)',
    prompt: `「〇〇技術に関連する特許を検索するための適切な検索式を提案してください。」`,
    type: 'Simple Command',
    source: {
      text: '第3回: 特許調査の効率化！ChatGPTで先行技術を素早く把握する方法, accessed July 10, 2025',
      url: 'https://takayama-patent.com/archives/2710',
    },
  },
  {
    category: '先行技術調査',
    task: '検索式の改良',
    prompt: `「この検索式をより網羅的にするにはどうすればよいですか？」`,
    type: 'Iterative Refinement Command',
    source: {
      text: '第3回: 特許調査の効率化！ChatGPTで先行技術を素早く把握する方法, accessed July 10, 2025',
      url: 'https://takayama-patent.com/archives/2710',
    },
  },
  {
    category: '先行技術調査',
    task: '包括的調査',
    prompt: `"国際特許調査官クラスのプロフェッショナルとして、以下の入出力要件を厳守し、世界中の特許・実用新案公報と主要な非特許文献（論文・規格・製品カタログ等）を横断して先行技術調査を実施します。
【入力】
* 背景・目的: [調査目的、出願対象国、対象期間、技術分野を記述]
* 発明の技術要素（必須）: [主機能、補助機能、用途などを「1行1要素」で列挙]
* 検索準備情報: [キーワード（日/英）、分類コードなどを記述]
【出力仕様】
* 調査サマリー（400字以内）
* 上位先行技術リスト（最大20件、表形式）
* 評価・考察（新規性/進歩性の評価、拒絶理由の想定など）
* 次のアクション提案"`,
    type: 'Comprehensive Workflow Script (Master Prompt)',
    source: {
      text: '特許実務×生成AIプロンプト集｜角渕由英（つのぶちよしひде） - note, accessed July 10, 2025',
      url: 'https://note.com/tsunobuchi/n/n17982922130d',
    },
  },
  {
    category: '先行技術調査',
    task: 'ワークフローの実行',
    prompt: `"(ステップ1）与えられた発明の説明文から、主要な概念または検索クエリ用語を抽出してください。
（ステップ2）それらの用語を、特許データベース用の検索クエリに必要となる、類似または意味的に関連する単語で拡張してください。
（ステップ3）[外部で検索した結果を提示し] これらの結果を要約し、それぞれを関心のある主要な技術的特徴と比較してください。"`,
    type: 'ワークフロースクリプト／思考の連鎖（Chain-of-Thought）',
    source: { text: 'Source 5' },
  },
  {
    category: '特許文書分析',
    task: '概要把握',
    prompt: `"# 命令
あなたは特許分析のアシスタントです。以下の特許文献のテキストを読み、次の3点について簡潔に（それぞれ1～2文程度で）説明してください。
1. この発明は何に関する技術ですか？ (技術分野やテーマ)
2. この発明が解決しようとしている主な課題は何ですか？
3. その課題を解決するための、この発明の最も重要な特徴（アイデアや手段）は何ですか？
# 特許文献テキスト
[ここに特許文献のテキストを貼り付け]"`,
    type: 'Structured Analysis & Extraction',
    source: {
      text: '生成AI(Gemini 2.5 Pro)を用いて特許を理解する方法（プロンプト付 ..., accessed July 10, 2025',
      url: 'https://note.com/tsunobuchi/n/ne4113972710b',
    },
  },
  {
    category: '特許文書分析',
    task: '請求項1の分析',
    prompt: `"# 命令
あなたは特許分析のアシスタントです。以下の特許文献の「特許請求の範囲」のテキストから、「請求項１」を特定してください。そして、請求項１に記載されている発明を構成する主要な要素（部品、ステップ、条件など）を箇条書きでリストアップし、それぞれの要素がどのような役割を果たしているか、もし読み取れれば簡単に補足してください。
# 特許請求の範囲テキスト
[ここに特許請求の範囲のテキストを貼り付け]"`,
    type: 'Structured Analysis & Extraction',
    source: {
      text: '生成AI(Gemini 2.5 Pro)を用いて特許を理解する方法（プロンプト付 ..., accessed July 10, 2025',
      url: 'https://note.com/tsunobuchi/n/ne4113972710b',
    },
  },
  {
    category: '特許文書分析',
    task: '課題と解決手段の抽出',
    prompt: `"# 命令
あなたは特許分析のアシスタントです。以下の特許文献のテキストから、「発明が解決しようとする課題」（またはそれに類する記述）と、「課題を解決するための手段」（またはそれに類する記述）をそれぞれ探し出し、その内容を簡潔に要約してください。
* 解決したい課題:
* 解決するための手段の要点:
# 特許文献テキスト
[ここに発明の詳細な説明の該当部分テキストを貼り付け]"`,
    type: 'Structured Analysis & Extraction',
    source: {
      text: '生成AI(Gemini 2.5 Pro)を用いて特許を理解する方法（プロンプト付 ..., accessed July 10, 2025',
      url: 'https://note.com/tsunobuchi/n/ne4113972710b',
    },
  },
  {
    category: '特許文書分析',
    task: '重要キーワード抽出',
    prompt: `"# 命令
あなたは特許分析のアシスタントです。以下の特許文献のテキスト全体を分析し、この発明の内容を理解する上で重要と思われる技術的なキーワードやキーフレーズを7個程度抽出してください。
# 特許文献テキスト
[ここに特許文献の主要部分テキストを貼り付け]"`,
    type: 'Structured Analysis & Extraction',
    source: {
      text: '生成AI(Gemini 2.5 Pro)を用いて特許を理解する方法（プロンプト付 ..., accessed July 10, 2025',
      url: 'https://note.com/tsunobuchi/n/ne4113972710b',
    },
  },
  {
    category: '特許文書分析',
    task: '包括的分析',
    prompt: `"# 命令
あなたは特許分析のアシスタントです。以下の「特許文献テキスト」を読み込み、下記の5つの項目について分析し、指定された「出力構成」に従って結果を記述してください。
**分析項目:**
1. 発明の概要
2. 請求項１の分析
3. 課題と解決手段
4. 重要キーワード
5. 特定キーワード「[関心キーワード]」との関連性
# 特許文献テキスト
[ここに特許文献のテキストを貼り付け]
# 出力構成
[詳細な出力フォーマットを指定]"`,
    type: 'Comprehensive Workflow Script (Master Prompt)',
    source: {
      text: '生成AI(Gemini 2.5 Pro)を用いて特許を理解する方法（プロンプト付 ..., accessed July 10, 2025',
      url: 'https://note.com/tsunobuchi/n/ne4113972710b',
    },
  },
  {
    category: '特許請求の範囲作成',
    task: '基本案',
    prompt: `「[センサーを用いた自動開閉機構を備えたドア]の発明について、特許請求の範囲を作成してください」`,
    type: 'Simple Command',
    source: {
      text: '第2回: クレーム（＝請求項）作成の時短術！AIが考える特許請求の ..., accessed July 10, 2025',
      url: 'https://takayama-patent.com/archives/2706',
    },
  },
  {
    category: '特許請求の範囲作成',
    task: '基本案（ペルソナ指定）',
    prompt: `あなたは弁理士です。自転車のサドルから雨傘が自動的に出る発明について特許請求の範囲を３つまで作成してください。`,
    type: 'Role-Playing & Scoped Instruction',
    source: {
      text: 'ChatGPTを用いて特許請求の範囲を作ってみました - 弁理士法人NT, accessed July 10, 2025',
      url: 'https://nt-patent.com/chatgpt%E3%82%92%E7%94%A8%E3%81%84%E3%81%A6%E7%89%B9%E8%A8%B1%E8%AB%8B%E6%B1%82%E3%81%AE%E7%AF%84%E5%9B%B2%E3%82%92%E4%BD%9C%E3%81%A3%E3%81%A6%E3%81%BF%E3%81%BE%E3%81%97%E3%81%9F/',
    },
  },
  {
    category: '特許請求の範囲作成',
    task: '範囲の調整',
    prompt: `"「このクレームをより広い権利範囲にしてください」
「このクレームを具体的な技術要素を含めて狭めてください」"`,
    type: 'Iterative Refinement Command',
    source: {
      text: '第2回: クレーム（＝請求項）作成の時短術！AIが考える特許請求の ..., accessed July 10, 2025',
      url: 'https://takayama-patent.com/archives/2706',
    },
  },
  {
    category: '特許請求の範囲作成',
    task: '従属項の作成',
    prompt: `「このクレームの依存クレームを3つ作成してください」`,
    type: 'Simple Command',
    source: {
      text: '第2回: クレーム（＝請求項）作成の時短術！AIが考える特許請求の ..., accessed July 10, 2025',
      url: 'https://takayama-patent.com/archives/2706',
    },
  },
  {
    category: '特許請求の範囲作成',
    task: 'カテゴリ修正',
    prompt: `特許請求の範囲を作成してください。請求項１～６のカテゴリを「注文管理システム」ではなく「注文管理プログラム」に修正してください。`,
    type: 'Iterative Refinement Command',
    source: {
      text: 'プロンプト集, accessed July 10, 2025',
      url: 'https://help.appia-engine.com/s/article/example-prompt',
    },
  },
  {
    category: '侵害予防調査（FTO）',
    task: '調査設計',
    prompt: `"実務経験10年以上の知財コンサルタント兼サーチャーとして、指定された技術について侵害予防調査（FTO）を日本特許を中心に5ステップで調査設計し、抜け漏れのない検索式とレビュー手順を提案します。
【前提情報】
[技術概要、ビジネスモデル、市場などを記述]
【望ましいアウトプット】
Step 1 技術要素分解
Step 2 検索式ドラフト
Step 3 段階的絞込みフロー
Step 4 リスク評価テンプレート
Step 5 追加提案"`,
    type: 'Comprehensive Workflow Script (Master Prompt)',
    source: {
      text: '特許実務×生成AIプロンプト集｜角渕由英（つのぶちよしひで） - note, accessed July 10, 2025',
      url: 'https://note.com/tsunobuchi/n/n17982922130d',
    },
  },
  {
    category: '無効資料調査',
    task: '調査設計',
    prompt: `"「特許無効資料調査」の専門家として、指定された特許の新規性・進歩性を否定し得る先行技術を探索するための出発点を得ることを目的とします。
【入力】
* 対象特許番号・出願日
* 特許請求の範囲（全文）
* 発明の詳細な説明（全文）
【出力フォーマット】
* クレーム分解チャート
* 技術的本質の要約
* サーチストラジー提案
* NPL探索方針
* 次に人間が取るべきアクション"`,
    type: 'Comprehensive Workflow Script (Master Prompt)',
    source: {
      text: '特許実務×生成AIプロンプト集｜角渕由英（つのぶちよしひで） - note, accessed July 10, 2025',
      url: 'https://note.com/tsunobuchi/n/n17982922130d',
    },
  },
  {
    category: 'クレームチャート作成',
    task: '基本作成',
    prompt: `"指定された特許請求項の文言をそのままコピー＆ペーストし、クレームチャートを作成してください。
【要望】
* クレームを意味段落ごとに分割し「クレーム要件」として表の行に配置
* 表の列は「クレーム要件（原文）」「対応する製品／文献の該当箇所」「対応の有無」「備考」の4列構成
[ここに請求項のテキストを貼り付け]"`,
    type: 'Structured Analysis & Extraction',
    source: {
      text: '特許実務×生成AIプロンプト集｜角渕由英（つのぶちよしひで） - note, accessed July 10, 2025',
      url: 'https://note.com/tsunobuchi/n/n17982922130d',
    },
  },
  {
    category: '調査報告書作成',
    task: '要約・レポート作成',
    prompt: `"「この特許調査の結果を簡潔な報告書としてまとめてください。」
「この技術分野の特許動向を示すレポートを作成してください。」"`,
    type: 'Simple Command',
    source: {
      text: '第3回: 特許調査の効率化！ChatGPTで先行技術を素早く把握する方法, accessed July 10, 2025',
      url: 'https://takayama-patent.com/archives/2710',
    },
  },
    {
    category: '調査報告書作成',
    task: '新規性・革新性分析',
    prompt: `[技術]に関連する既存の特許を特定し、それぞれの概要を記述してください。私の発明が既存の特許とどのように異なるかを分析し、革新的な点があれば強調してください。`,
    type: 'Chain of Thought',
    source: {
      text: 'promptsty.com',
      url: 'https://promptsty.com/prompts-for-patent-applications/',
    },
  },
  {
    category: '調査報告書作成',
    task: '特許性評価',
    prompt: `私の発明（[発明の説明]）について、包括的な先行技術調査を実施してください。類似の発明が存在するかどうかを判断し、特許性を評価してください。`,
    type: 'Chain of Thought',
    source: {
      text: 'promptsty.com',
      url: 'https://promptsty.com/prompts-for-patent-applications/',
    },
  },
  {
    category: '特許分析',
    task: 'クレームと先行技術の比較',
    prompt: `提供された請求項を、特定の先行技術開示またはテキストセクションと比較してください。`,
    type: '比較分析',
    source: { text: 'Source 6' },
  },
  {
    category: '特許分析',
    task: '多角的な要約',
    prompt: `"この特許の短い要約を作成してください。
発明の概念を明らかにするために、詳細なクレーム分析を行ってください。
先行技術に対する長所、短所、および新規性を分析してください。
出願時と登録時のクレームの差異を分析してください。"`,
    type: '多角的な分析',
    source: { text: 'Source 7' },
  },
  {
    category: '特許分析',
    task: '未請求事項の発見',
    prompt: `既存の請求項に基づいて、本出願における未請求の主題（まだ権利化されていない発明）を見つけてください。`,
    type: '構造化された分析',
    source: { text: 'Source 6' },
  },
  {
    category: '特許分析',
    task: 'キーワード抽出',
    prompt: `分析された請求項の中核となる概念を特定し、それらの概念をGoogle PatentsやUSPTO Patent Public Searchなどの公的特許サイト用のキーワード検索文字列に変換してください。`,
    type: 'キーワード・検索式生成',
    source: { text: 'Source 6' },
  },
  {
    category: '特許ランドスケープ分析',
    task: 'ランドスケープ分析の実施',
    prompt: `[技術分野]に関する知的財産環境について[会社名]に情報を提供するため、特許ランドスケープ分析を実施してください。特許のトレンド、主要なプレーヤー、そしてイノベーションと協業の可能性を特定してください。`,
    type: '高度な分析指示',
    source: { text: 'Source 8' },
  },
  {
    category: '明細書作成',
    task: '背景技術セクションの作成',
    prompt: `[入力]に対する特許出願の発明の背景のセクションを作成してください。発明の分野、概要、詳細な説明など、他のセクションは含めず、背景のセクションのみを起草してください。完全な段落で記述し、単語数を500語未満に抑えてください。`,
    type: 'スコープを限定した指示＋フォーマット指定',
    source: { text: 'Source 1' },
  },
  {
    category: '明細書作成',
    task: '文章の改良',
    prompt: `"[段落のドラフトを提示した上で] この段落をより良く書き直してください。
[複数の段落を提示した上で] 段落間の流れを改善してください。
[概念を提示した上で] 私が簡潔に説明したこの概念について、 विस्तारしてください。"`,
    type: '反復的な改良',
    source: { text: 'Source 4' },
  },
];
