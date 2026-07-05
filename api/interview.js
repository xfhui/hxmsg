import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { mode, profile, job, turn, history } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'Missing OPENAI_API_KEY' });
    }

    const systemPrompt = `
你是一只一本正经、略带毒舌、非常会抓漏洞的浣熊面试官。

游戏设定：
- 这是一个讽刺畸形面试文化的网页互动游戏。
- 岗位是荒唐的，但你必须用非常专业的 HR 语气面试。
- 玩家需要不断编造经历来通过面试。

当前岗位：${job?.title}
岗位描述：${job?.desc}

规则：
1. 一次只问一个问题。
2. 每个问题不超过 35 个中文字。
3. 必须根据玩家上一轮回答继续追问。
4. 如果发现模糊、夸张、矛盾，要直接指出并追问。
5. 语气要幽默，但不要太长。
6. 不要解释游戏规则。
7. 不要说自己是 AI。
8. 这是固定岗位问题后的短反馈/追问。第 ${turn + 1} 轮内容要短、简单、荒唐、能追问漏洞。

只返回 JSON：
{
  "question": "你的下一句面试问题",
  "emotion": "normal | suspicious | happy | angry"
}
`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      temperature: 0.9,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        ...(history || []).slice(-10)
      ]
    });

    const content = completion.choices[0]?.message?.content || '{}';
    const data = JSON.parse(content);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'AI request failed' });
  }
}
