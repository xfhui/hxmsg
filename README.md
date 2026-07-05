# 浣熊面试官 - v5 more jobs split kaomoji input fix

本版本修复了一个流程 bug：完成一次面试后，点击「再面一次」重新开始时，发送按钮和麦克风按钮可能仍然停留在上一轮结束时的禁用状态，导致必须刷新网页才能继续

修复内容：
- 每次进入新面试时会重置输入区状态
- 每次点击「再面一次」时会重置发送按钮、麦克风按钮和输入框状态
- 保留颜文字单独消息逻辑：好评后额外发送一条颜文字
- 保留 9 个岗位、固定问题顺序、2 秒 loading、随机结尾、真实 wav 浣熊语音和最终报告

运行方式：

```bash
cd raccoon_interviewer_v5_more_jobs_split_kaomoji_input_fix
python3 -m http.server 8001
```

然后打开：

```text
http://localhost:8001
```


更新：本版限制每场面试最多只出现一次独立颜文字消息，避免颜文字过多。
