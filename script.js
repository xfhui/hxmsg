const startScreen = document.querySelector('#startScreen');
const jobSelectScreen = document.querySelector('#jobSelectScreen');
const gameScreen = document.querySelector('#gameScreen');
const jobIntroScreen = document.querySelector('#jobIntroScreen');
const resultScreen = document.querySelector('#resultScreen');
const enterJobSelectBtn = document.querySelector('#enterJobSelectBtn');
const jobOptions = document.querySelector('#jobOptions');
const introJobIcon = document.querySelector('#introJobIcon');
const introJobTitle = document.querySelector('#introJobTitle');
const introJobDesc = document.querySelector('#introJobDesc');
const introJobRequirements = document.querySelector('#introJobRequirements');
const backToJobsBtn = document.querySelector('#backToJobsBtn');
const startInterviewBtn = document.querySelector('#startInterviewBtn');
const jobTitleEl = document.querySelector('#jobTitle');
const jobRequirements = document.querySelector('#jobRequirements');
const progressText = document.querySelector('#progressText');
const chatList = document.querySelector('#chatList');
const answerBox = document.querySelector('#answerBox');
const submitAnswerBtn = document.querySelector('#submitAnswerBtn');
const micBtn = document.querySelector('#micBtn') || null;
const hintText = document.querySelector('#hintText');
const raccoonFace = document.querySelector('#raccoonFace');
const raccoonFaceImg = document.querySelector('#raccoonFaceImg');
const emotionText = document.querySelector('#emotionText');
const restartBtn = document.querySelector('#restartBtn');
const restartSmallBtn = document.querySelector('#restartSmallBtn');
const voiceToggleBtn = document.querySelector('#voiceToggleBtn');
const copyReportBtn = document.querySelector('#copyReportBtn');
const resultOutcomeStamp = document.querySelector('#resultOutcomeStamp');

const MAX_TURNS = 3;
const DEEPSEEK_API_KEY = 'sk-EHPLiTiJxYSEMVF0AcC448B328B349839267D39dA9E4C375';
const API_BASE_URL = 'https://api.openai-next.com/v1/chat/completions';
const AI_MODEL = 'glm-4-airx';

const RACCOON_IMAGES = {
  normal: 'assets/raccoon/02.png',
  suspicious: 'assets/raccoon/04.png',
  happy: 'assets/raccoon/05.png',
  angry: 'assets/raccoon/06.png',
  thinking: 'assets/raccoon/03.png',
  result: 'assets/raccoon/07.png',
  reactionGif: 'assets/raccoon/raccoon_giphy.gif'
};
const PASS_COMMENTS = [
  '勉强配得上跟我拥有同款黑眼圈了，明晚来上夜班',
  '不错，这块我藏了3天的香蕉就算是你的入职福利了',
  '把入职表递过来，勉强给你按个爪印。',
  '气质挺符合我们团队，去领个同款黑面罩入职吧。'
];
const FAIL_COMMENTS = [
  '很一般嘛，保安，把他叉出去',
  '听你面试还不如躺着吃香蕉。下一位！',
  '这点生存技能，在我的地盘连片烂菜叶都抢不到。',
  '我的黑眼圈都比你的简历有看头，慢走不送。',
  '以你现在的身手，去抢香蕉很容易挨欺负的。再练练吧！',
  '听着听着我没忍住打了个哈欠……今天就先到这吧，你也回去补个觉，再琢磨琢磨。'
];
const ANIMALESE_SAMPLE_FILES = [
  'girl_a_56_51.wav',
  'girl_a_58_23.wav',
  'girl_a_60_56.wav',
  'girl_a_62_32.wav',
  'girl_a_64_10.wav',
  'girl_a_66_15.wav',
  'girl_a_68_50.wav',
  'girl_a_70_55.wav',
  'girl_a_72_33.wav',
  'girl_e_56_24.wav',
  'girl_e_58_57.wav',
  'girl_e_60_21.wav',
  'girl_e_62_05.wav',
  'girl_e_64_34.wav',
  'girl_e_66_43.wav',
  'girl_e_68_13.wav',
  'girl_e_70_22.wav',
  'girl_e_72_04.wav',
  'girl_i_56_44.wav',
  'girl_i_58_14.wav',
  'girl_i_60_49.wav',
  'girl_i_62_41.wav',
  'girl_i_64_06.wav',
  'girl_i_66_25.wav',
  'girl_i_68_58.wav',
  'girl_i_70_48.wav',
  'girl_i_72_42.wav',
  'girl_ilow_52_27.wav',
  'girl_ilow_54_47.wav',
  'girl_ilow_56_38.wav',
  'girl_ilow_58_12.wav',
  'girl_ilow_60_37.wav',
  'girl_ilow_62_45.wav',
  'girl_ilow_64_17.wav',
  'girl_o_56_08.wav',
  'girl_o_58_29.wav',
  'girl_o_60_01.wav',
  'girl_o_62_18.wav',
  'girl_o_64_46.wav',
  'girl_o_66_36.wav',
  'girl_o_68_09.wav',
  'girl_o_70_00.wav',
  'girl_o_72_19.wav',
  'girl_olow_52_35.wav',
  'girl_olow_54_02.wav',
  'girl_olow_56_20.wav',
  'girl_olow_58_52.wav',
  'girl_olow_60_26.wav',
  'girl_olow_62_07.wav',
  'girl_olow_64_39.wav',
  'girl_u_56_28.wav',
  'girl_u_58_03.wav',
  'girl_u_60_30.wav',
  'girl_u_62_54.wav',
  'girl_u_64_16.wav',
  'girl_u_66_11.wav',
  'girl_u_68_40.wav',
  'girl_u_70_31.wav',
  'girl_u_72_53.wav'
];


const jobs = [
  {
    "id": "raccoon-trash-repair",
    "icon": "🗑️",
    "title": "浣熊垃圾桶维修员",
    "desc": "我们不维护垃圾桶，我们是在维护浣熊与人类之间脆弱的“垃圾桶外交协议”。你的职责是保证那些被浣熊当成“自助餐厅”而拆得稀巴烂的垃圾桶，能在30分钟内复原。",
    "requirements": [
      "引导浣熊规范进行垃圾分类",
      "管控处理浣熊斗殴冲突事件",
      "身姿灵活捡拾犄角旮旯垃圾"
    ],
    "questions": [
      "面对教育基础不好的浣熊群体，你如何打通跨物种认知壁垒，落地一套干湿垃圾精准分拣的教案闭环？",
      "当浣熊为抢夺垃圾桶里的烂香蕉发生暴力挤兑时，你如何迅速切入进行物理熔断，并完成双方的情绪降温？",
      "面对掉进死角的战略级物资，你的肉身能否突破骨骼限制，以极高的柔韧度完成犄角旮旯的业务清零？如果可以，请举例说明。"
    ]
  },
  {
    "id": "soda-cracker-hole-puncher",
    "icon": "🫓",
    "title": "苏打饼干扎孔员",
    "desc": "我们不生产饼干，我们只是饼干呼吸道的“通畅工程师”。在这里，你的牙签就是面团的上帝，你的每一次起落，都决定了这块饼干是酥脆如云，还是坚硬如砖。",
    "requirements": [
      "拥有微米级高精度动态视力",
      "手持牙签高频精准定点扎孔",
      "重度强迫症加持，零漏孔失误"
    ],
    "questions": [
      "有人说，苏打饼干上的孔只是为了排气防止烤变形。但作为一名未来的“呼吸孔雕刻官”，你认为你扎下去的这一针，赋予了苏打饼干怎样的哲学意义？",
      "如果你在连续作业8小时后，突然打了一个喷嚏，导致一颗饼干的孔洞偏移了0.01微米。你会怎么做？",
      "假设因为你手滑，导致整整一箱饼干的孔洞偏移了1毫米，完全报废。老板让你写一份详细的“事故总结报告”。请结合你之前工作犯错的丰富经验，写一段“忏悔录”，要求用词必须显得你非常有责任感，让老板找不出你的问题。"
    ]
  },
  {
    "id": "cookie-chip-placer",
    "icon": "🍪",
    "title": "趣多多点豆员",
    "desc": "世人皆知趣多多好吃，却不知每一颗巧克力豆的落点，都经过了我们数千次的“精密落点演练”。我们不只是在放巧克力豆，我们是在饼干的荒原上，构筑出一座座巧克力的宇宙文明！",
    "requirements": [
      "精准控制巧克力豆落点",
      "可制造豆量充足的视觉错觉",
      "具备对抗实习生点豆焦虑的心理韧性"
    ],
    "questions": [
      "假设产品经理心血来潮，要求你在饼干上用巧克力豆排出一个微小的二维码。你明知道这玩意儿根本扫不出来，但为了不让他觉得你“缺乏创新精神”，你会怎么做？",
      "调查显示，客户觉得巧克力豆太少会觉得亏，太多又会觉得太甜。请问你该如何让客户在第一眼看到饼干时，产生“这豆子多得溢出来”的心理错觉，但又不会太甜？",
      "你的工位隔壁是一名刚来的实习生，他点豆的速度比你快，且点得比你圆。你会怎么做？"
    ]
  },
  {
    "id": "strawberry-seed-installer",
    "icon": "🍓",
    "title": "草莓安籽儿员",
    "desc": "自然界只负责产出红色的“肉”，但让草莓看起来像一颗颗精致的宝石，全靠你的艺术手感。我们要让每一颗草莓，都精准地分布着最符合黄金比例的籽。拒绝杂乱，拒绝缺口，我们要打造工业级的完美水果！",
    "requirements": [
      "以黄金比例分布草莓籽",
      "抗风防吹，快速找回失散种子",
      "能处理浣熊踩扁艺术品事故"
    ],
    "questions": [
      "种子太轻了，你旁边工位的同事叹了口气，直接把你刚数好的100粒种子吹飞了一半。面对这种情况你会怎么做？请输出你的落地处置SOP。",
      "主管要求你把草莓籽排成“笑脸”形状，但你认为传统的“斐波那契螺旋线”排列才符合自然艺术。你会如何说服主管？",
      "如果你正在专注植籽，突然闯进来一只抢草莓吃的浣熊，还把你刚嵌好的一盘艺术品给踩扁了。你会怎么做？"
    ]
  },
  {
    "id": "giraffe-neck-stretcher",
    "icon": "🦒",
    "title": "长颈鹿脖子拉长员",
    "desc": "别以为长颈鹿天生脖子就那么长！那都是我们这群苦命的打工人，每天搬着5米高的折叠铁梯，迎着草原的狂风，顶着被踢飞的风险，一寸一寸硬生生给拔出来的。我们的口号是：“只要梯子搭得高，没有脖子拉不长！”",
    "requirements": [
      "精通专业体态拉伸技法",
      "适配高空作业无压力操作",
      "可灵活处理脖颈回缩问题"
    ],
    "questions": [
      "假设你正站在梯子上，死命拉着一只长颈鹿的脑袋。它非但毫不配合，还用一种“看智障”的眼神俯视你，并开始慢条斯理地反刍。此时你彻底破防了，你是选择给它立刻报一个“体态矫正网课”让它自己悟，还是直接拿手里的铁扳手跟它拼了？",
      "长颈鹿有严重的起床气，当你站在升降机上试图用牵引带套住它脖子时，它突然甩头并试图咬你的升降机操纵杆。你会如何处理？",
      "糟糕！因为昨晚熬夜干活没睡好，你拉伸的用力方向偏了15度，导致长颈鹿现在的脖子像个“病句”一样，结构严重畸形。在它妈妈发现并跑过来一脚踢飞你之前，你只有5分钟的时间。请问你会做什么？"
    ]
  },
  {
    "id": "zebra-stripe-painter",
    "icon": "🦓",
    "title": "斑马刷漆师",
    "desc": "本公司急需一名不怕踢、抗压强、不仅能画画还能当铲屎官的“灵魂画手”。我们不看简历，我们只看你能在斑马疯狂踢腿的死亡边缘，把最后一道条纹画得有多直。",
    "requirements": [
      "刷绘黑白条纹手稳绝不抖动",
      "具备边跑边刷的超强爆发力",
      "严格规避五彩斑斓黑的色差"
    ],
    "questions": [
      "油漆刚刷上去还没干，一阵大风刮来，草原上的灰尘和枯草全部粘在了斑马身上，黑白条纹变成了麻子脸。你怎么在它跑走之前紧急补救？",
      "斑马是群居动物，你靠近一只刷漆时，惊动了整个马群，它们开始狂奔扬起漫天尘土。你如何在混乱中紧紧盯住你的“目标客户”并把剩下的半边屁股刷完？",
      "很多斑马其实根本不在乎自己有没有条纹，它们只想吃草。你如何说服一匹顽固的斑马配合你工作？"
    ]
  },
  {
    "id": "kangaroo-pouch-installer",
    "icon": "🦘",
    "title": "袋鼠口袋安装员",
    "desc": "我们不生产袋鼠，我们只是大自然育儿袋的搬运工与安装工。你的任务，就是顶着“刚子”的致命连环飞踹，手持大号钢针，把一个个毛茸茸的口袋缝在它们的肚皮上。记住，缝歪了不仅要被袋鼠打，还要扣绩效！",
    "requirements": [
      "操作极稳，安装口袋零错位",
      "体质抗造，可硬扛袋鼠鞭腿",
      "适配体型精准核定口袋容量"
    ],
    "questions": [
      "口袋缝到一半，你发现小袋鼠最近吃胖了，原定的口袋尺寸如果强行缝合，小袋鼠进去后会窒息。你会如何处理？",
      "假设公司刚分给你一个叫马佳欣的新人实习生，结果她把袋鼠的口袋完全缝反了，开口朝下，导致小袋鼠像漏勺一样往下掉。作为带教老员工，在袋鼠妈妈彻底暴走之前，你是选择一边咆哮一边亲自上手狂拆线，还是心平气和地给实习生布置一个“口袋重构”的课后作业？",
      "当你正在专心致志地收最后两针时，袋鼠突然打了个喷嚏，导致你手一抖，把它的口袋和它的大腿缝在了一起。面对它缓缓举起的砂锅大的拳头，你只有5秒钟说服它，你会说什么？"
    ]
  },
  {
    "id": "anti-overtime-security",
    "icon": "🔌",
    "title": "互联网大厂防卷保安",
    "desc": "我们不抓小偷，因为公司里最危险的不是偷电脑的人，而是晚上10点后还在疯狂敲键盘的人！你的任务就是手持强光手电筒，无情地揪出每一个躲在工位底下偷偷写周报的“卷王”，把他们物理驱逐出大楼，还打工人一个清朗的按时下班环境！",
    "requirements": [
      "熟练拔网线、拉下办公总闸",
      "一秒识破员工假加班伪装",
      "KPI 达成月度用电量下降 20%"
    ],
    "questions": [
      "晚上11点半，你发现一间会议室没开灯，但里面有人正戴着耳机对着屏幕疯狂输出。你冲进去抓人，对方却赶紧把满屏的PPT切掉，狡辩说自己不是在开项目对齐会，只是在给五年级的小学生上网课，讲解练习题。请问，你如何在一分钟内运用各种方法手段科学鉴定出他在撒谎，并果断拔掉他的网线？",
      "假设全公司的电闸就在你手边。此时是周五晚上10点，里面有100个正在为了“改变世界”而加班的员工，而你只是一个每个月拿着微薄底薪、且没有任何加班费的保安。请用一个动作或者一句话，描述你在拉下总电闸那一瞬间的心理活动。",
      "一个马上要面临绩效考核的员工死死抱着工位的柱子，哭着求你让他把最后一段代码写完，并质问你：“你难道就没有为了一个目标拼命努力过吗？！”面对这种直击灵魂的道德绑架，你会做什么、说什么？"
    ]
  }
];

const candidateTitlesByJob = {
  'raccoon-trash-repair': [
    '垃圾桶外交首席大使',
    '毛球拆迁办克星',
    '自助餐厅安防专家',
    '深夜垃圾桶守夜人',
    '跨物种废弃物调停员'
  ],
  'soda-cracker-hole-puncher': [
    '饼干气道精密工程师',
    '微米级阵列布局官',
    '碳水呼吸雕刻师',
    '强迫症饼干美学家',
    '牙签突刺流派开创者'
  ],
  'cookie-chip-placer': [
    '曲奇表面文明构筑官',
    '黄金比例点嵌专家',
    '甜度锚点部署官',
    '饼干宇宙的星辰布阵师',
    '颗粒感精准控量师'
  ],
  'strawberry-seed-installer': [
    '蔷薇科表皮珠宝匠',
    '微型生命颗粒植入师',
    '草莓艺术美学策展人',
    '工业级完美果实加工官',
    '自然纹理修缮专家'
  ],
  'giraffe-neck-stretcher': [
    '垂直生态位拓宽专员',
    '高空颈椎体态设计师',
    '长颈鹿视角拓展师',
    '草原云端拉伸大师',
    '颈部骨骼逻辑重塑者'
  ],
  'zebra-stripe-painter': [
    '荒野黑白线条重绘师',
    '动态条纹视觉风控官',
    '草原疾驰下的灵魂画手',
    '野生涂装艺术执行官',
    '高对比度斑马质检员'
  ],
  'kangaroo-pouch-installer': [
    '活体育儿舱位装配工',
    '有袋类柔性扩容专家',
    '腹部拉链精密安装工',
    '袋鼠前置舱储物架构师',
    '硬扛鞭腿缝合技师'
  ],
  'anti-overtime-security': [
    '园区夜间电量风控官',
    '假加班伪装鉴别专家',
    '下班意愿物理拔高者',
    '大楼断网防卷清场官',
    '夜间工位摸鱼狙击手'
  ]
};

const raccoonMoods = {
  normal: { text: '专业审视中', className: '', image: RACCOON_IMAGES.normal },
  suspicious: { text: '开始怀疑了', className: 'suspicious', image: RACCOON_IMAGES.suspicious },
  happy: { text: '差点信了', className: 'happy', image: RACCOON_IMAGES.happy },
  angry: { text: '抓到漏洞', className: 'angry', image: RACCOON_IMAGES.angry },
  thinking: { text: '正在生成中...', className: 'thinking', image: RACCOON_IMAGES.thinking }
};

let state = getInitialState();

enterJobSelectBtn.addEventListener('click', () => {
  state = getInitialState();
  showJobSelect();
});
backToJobsBtn.addEventListener('click', showJobSelect);
startInterviewBtn.addEventListener('click', startInterview);
submitAnswerBtn.addEventListener('click', submitAnswer);
restartBtn.addEventListener('click', restartGame);
restartSmallBtn.addEventListener('click', restartGame);
copyReportBtn.addEventListener('click', copyReport);
if (voiceToggleBtn) voiceToggleBtn.addEventListener('click', toggleRaccoonVoice);
if (micBtn) micBtn.addEventListener('click', toggleRecording);

answerBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    submitAnswer();
  }
});

function getInitialState() {
  return {
    profile: {
      age: '',
      school: '',
      major: '',
      hobby: ''
    },
    job: null,
    turn: 0,
    history: [],
    recognition: null,
    isRecording: false,
    finalReport: null,
    typingEl: null,
    voiceEnabled: true,
    audioContext: null,
    animaleseBuffers: {},
    animaleseReady: false,
    animaleseLoading: null,
    activeTypewriter: null,
    usedEvaluationTexts: [],
    usedKaomojiTexts: [],
    hasShownKaomoji: false
  };
}

function showJobSelect() {
  startScreen.classList.add('hidden');
  resultScreen.classList.add('hidden');
  gameScreen.classList.add('hidden');
  jobIntroScreen.classList.add('hidden');
  jobSelectScreen.classList.remove('hidden');

  jobOptions.innerHTML = jobs.map((job, index) => `
    <article class="job-option-card" data-job-index="${index}">
      <div class="job-option-top">
        <div class="logo small-logo">${escapeHtml(job.icon || '🦝')}</div>
        <h3>${escapeHtml(job.title)}</h3>
      </div>
      <button class="primary-btn choose-job-btn" type="button" data-job-index="${index}">选择</button>
    </article>
  `).join('');

  jobOptions.querySelectorAll('.choose-job-btn').forEach(button => {
    button.addEventListener('click', () => {
      state.job = jobs[Number(button.dataset.jobIndex)];
      showJobIntro();
    });
  });
}


function showJobIntro() {
  if (!state.job) return;

  startScreen.classList.add('hidden');
  jobSelectScreen.classList.add('hidden');
  gameScreen.classList.add('hidden');
  resultScreen.classList.add('hidden');
  jobIntroScreen.classList.remove('hidden');

  introJobIcon.textContent = state.job.icon || '🦝';
  introJobTitle.textContent = state.job.title;
  introJobDesc.textContent = state.job.desc || '';
  introJobRequirements.innerHTML = (state.job.requirements || [])
    .map(item => `<li>${escapeHtml(item)}</li>`)
    .join('');
}


async function startInterview() {
  startScreen.classList.add('hidden');
  jobSelectScreen.classList.add('hidden');
  jobIntroScreen.classList.add('hidden');
  resultScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');

  setupGame();
  setupSpeechRecognition();
  await preloadAnimaleseSamples();

  await showQuestionLoading();

  const firstQuestion = getFixedQuestion();
  await addAiMessageTyped(firstQuestion);
  state.history.push({ role: 'assistant', content: firstQuestion, type: 'question' });
}

function setupGame() {
  jobTitleEl.textContent = state.job.title;
  jobRequirements.innerHTML = state.job.requirements.map(item => `<li>${escapeHtml(item)}</li>`).join('');
  chatList.innerHTML = '';
  answerBox.textContent = '';
  hintText.textContent = '';
  resetComposerControls();
  updateProgress();
  updateVoiceButton();
  preloadAnimaleseSamples();
  setMood('normal');
}

function resetComposerControls() {
  submitAnswerBtn.disabled = false;
  if (micBtn) micBtn.disabled = false;
  answerBox.setAttribute('contenteditable', 'true');
  answerBox.classList.remove('disabled');
  stopRecordingUI();
}

function lockComposerControls() {
  submitAnswerBtn.disabled = true;
  if (micBtn) micBtn.disabled = true;
}

function unlockComposerControls() {
  submitAnswerBtn.disabled = false;
  if (micBtn) micBtn.disabled = false;
  answerBox.setAttribute('contenteditable', 'true');
}

function getFixedQuestion() {
  if (!state.job || !state.job.questions) return '请先选择一个应聘岗位';
  return state.job.questions[state.turn] || '固定问题已经问完了';
}

async function showQuestionLoading() {
  showTypingBubble();
  await wait(2000);
  removeTypingBubble();
}


const endingLines = [
  '好了，今天的拷问先到这里你的回答我已经全部塞进垃圾桶旁边的评估档案里了等我翻完这半根香蕉，再决定你到底是人才，还是可回收废话',
  '好了，面试到此结束你的表现我会认真评估，虽然我看起来只是在啃香蕉',
  '行了，别编了再编下去垃圾桶都要信了接下来进入浣熊内部评估环节',
  '面试结束浣熊面试官正在翻阅你的回答、嗅探你的求生欲，并生成最终评估报告',
  '好了，我的问题问完了你的回答目前已经让我的黑眼圈加深了两毫米，下面开始生成评估报告',
  '辛苦了，候选人浣熊面试官正在把你的回答一条条叠好，夹进今日面试小档案里'
];

function getRandomEndingLine() {
  return pickRandom(endingLines);
}

async function submitAnswer() {
  const answer = answerBox.innerText.trim();
  if (!answer || submitAnswerBtn.disabled) {
    hintText.textContent = '浣熊盯着你：空消息不能算面试回答';
    setMood('suspicious');
    return;
  }

  if (state.isRecording && state.recognition) {
    state.recognition.stop();
  }

  lockComposerControls();

  addMessage('user', answer);
  state.history.push({ role: 'user', content: answer, questionIndex: state.turn });
  answerBox.textContent = '';
  hintText.textContent = '';

  const analysis = analyzeAnswer(answer);
  showTypingBubble();
  await wait(randomInt(650, 950));
  removeTypingBubble();

  const evaluation = await generateAnswerEvaluation(answer, analysis);
  await addAiMessageTyped(evaluation);
  state.history.push({ role: 'assistant', content: evaluation, type: 'evaluation' });

  if (state.turn === 0) {
    await wait(260);
    addAiGifMessage();
    state.history.push({ role: 'assistant', content: RACCOON_IMAGES.reactionGif, type: 'gif' });
  }

  if (state.turn === 1 && !state.hasShownKaomoji) {
    state.hasShownKaomoji = true;
    await wait(260);
    const kaomoji = pickUniqueKaomoji();
    await addAiMessageTyped(kaomoji);
    state.history.push({ role: 'assistant', content: kaomoji, type: 'kaomoji' });
  }

  state.turn += 1;
  updateProgress();

  if (state.turn >= getTotalTurns()) {
    await showQuestionLoading();
    const endingLine = getRandomEndingLine();
    await addAiMessageTyped(endingLine);
    state.history.push({ role: 'assistant', content: endingLine, type: 'ending' });
    await wait(450);
    finishInterview();
    return;
  }

  await showQuestionLoading();

  const nextQuestion = getFixedQuestion();
  await addAiMessageTyped(nextQuestion);
  state.history.push({ role: 'assistant', content: nextQuestion, type: 'question' });

  unlockComposerControls();
  answerBox.focus();
}

const goodEvaluationPool = [
  '嗯，有点东西，虽然不多，但够我暂停啃香蕉三秒钟',
  '这个回答居然有逻辑，害我差点以为你真干过',
  '可以，至少你没有把问题回答成天气预报',
  '嗯，勉强像个人才，不像刚从垃圾桶里翻出来的简历',
  '这段回答有点意思，我的黑眼圈都亮了一下',
  '好，先记你一小笔功劳，写在香蕉皮背面',
  '这个回答有职场味了，甚至让我闻到一点会议室矿泉水的味道',
  '可以，至少你没有说“我会努力学习”，这种话我听了会掉毛',
  '有点靠谱，但不要骄傲，浣熊的信任很脆弱',
  '你的回答让我感觉，你已经准备好和命运以及垃圾桶正面对线了'
];

const badEvaluationPool = [
  '嗯……这个回答怎么说呢，像一份被雨淋湿的简历',
  '你刚刚说完，我旁边的垃圾桶都沉默了',
  '有点悬，不是岗位不适合你，是岗位听完也想辞职',
  '这个回答让我开始怀疑你是不是被临时抓来顶包的',
  '你讲得很真诚，但真诚不能当 KPI 交',
  '你的回答很自由，已经自由到脱离了题目',
  '如果这是 SOP，那浣熊可能会连夜申请劳动仲裁',
  '这个回答风险很大，主要风险是我听完以后更困了',
  '听起来像是你在努力把一个洞，解释成战略入口',
  '你这个回答已经不是面试了，是一场轻微的语言事故'
];

const goodAnswerKaomojiPool = [
  '(｡•̀ᴗ-)✧',
  '(๑•̀ㅂ•́)و✧',
  'ദ്ദി ˉ͈̀꒳ˉ͈́ )✧',
  '(=｀ω´=)',
  'ฅ^•ﻌ•^ฅ',
  '(๑˃̵ᴗ˂̵)و',
  '٩(｡•́‿•̀｡)۶',
  'ᕙ(  •̀ ᗜ •́  )ᕗ',
  '(ง •̀_•́)ง',
  '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧'
];

function isPassingAnswer(analysis) {
  return !analysis.isShort && !analysis.hasContradictionRisk;
}

async function generateAnswerEvaluation(answer, analysis) {
  try {
    const systemPrompt = `你是一只一本正经、略带毒舌、非常会抓漏洞的浣熊面试官。

游戏设定：
- 这是一个讽刺畸形面试文化的网页互动游戏。
- 岗位是荒唐的，但你必须用非常专业的 HR 语气面试。
- 玩家需要不断编造经历来通过面试。

当前岗位：${state.job?.title}
岗位描述：${state.job?.desc}

评价规则：
1. 针对玩家刚才的回答，给出一句简短的吐槽或认可。
2. 如果回答得好（有细节、有数字、有动作），用略带傲娇的方式认可。
3. 如果回答得差（太短、太虚、有矛盾），用毒舌的方式吐槽。
4. 评价要符合浣熊的人设：一本正经、略带毒舌、会抓漏洞。
5. 字数控制在 15-30 字之间。
6. 不要解释游戏规则，不要说自己是 AI。

只返回 JSON：
{
  "evaluation": "你的评价内容",
  "emotion": "normal | suspicious | happy | angry"
}`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `玩家回答：${answer}` }
    ];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages,
        temperature: 0.9,
        response_format: { type: 'json_object' }
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '{}';
    const parsed = JSON.parse(content);

    if (parsed.emotion) setMood(parsed.emotion);
    if (parsed.evaluation) return cleanEvaluation(parsed.evaluation);
  } catch (error) {
    console.warn('AI 评价生成失败，使用本地模板：', error);
  }

  const isPassing = isPassingAnswer(analysis);
  const pool = isPassing ? goodEvaluationPool : badEvaluationPool;

  if (isPassing) {
    setMood(pickRandom(['happy', 'normal']));
  } else {
    setMood(analysis.hasContradictionRisk ? 'angry' : 'suspicious');
  }

  const line = pickUniqueEvaluation(pool);
  return cleanEvaluation(line);
}

function pickUniqueEvaluation(pool) {
  const used = state.usedEvaluationTexts || [];
  let available = pool.filter(line => !used.includes(line));

  if (!available.length) {
    // 当前池子已经抽完时，只清掉这个池子的历史，避免同一题连续卡住
    state.usedEvaluationTexts = used.filter(line => !pool.includes(line));
    available = [...pool];
  }

  const selected = pickRandom(available);
  state.usedEvaluationTexts.push(selected);
  return selected;
}

function cleanEvaluation(line) {
  return line.replace(/。/g, '');
}

function pickUniqueKaomoji() {
  const used = state.usedKaomojiTexts || [];
  let available = goodAnswerKaomojiPool.filter(line => !used.includes(line));

  if (!available.length) {
    state.usedKaomojiTexts = [];
    available = [...goodAnswerKaomojiPool];
  }

  const selected = pickRandom(available);
  state.usedKaomojiTexts.push(selected);
  return selected;
}

function analyzeAnswer(answer) {
  const text = answer.replace(/\s/g, '');
  const isShort = text.length < 16;
  const hasNumbers = /\d|一|二|三|四|五|六|七|八|九|十|百|千|万|%/.test(answer);
  const hasActionWords = /负责|设计|优化|协调|完成|提升|分析|调研|管理|实现|解决|沟通|测试|带领|整理/.test(answer);
  const hasContradictionRisk = /大概|可能|也许|不太清楚|随便|不知道|应该吧|差不多/.test(answer);

  let hint = '浣熊点头：短、稳、像真的';

  if (isShort) {
    hint = '下一题加一个动作或结果，别只说态度';
  }
  if (hasContradictionRisk) {
    hint = '不确定词太多，浣熊开始闻到现编的味道';
  }

  return { isShort, hasNumbers, hasActionWords, hasContradictionRisk, hint };
}

function finishInterview() {
  const report = generateLocalReport();
  state.finalReport = report;

  gameScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  document.querySelector('#resultTitle').textContent = report.title;
  document.querySelector('#resultComment').textContent = report.comment;
  resultOutcomeStamp.classList.toggle('is-sold', report.passed);
  resultOutcomeStamp.classList.toggle('is-slow', !report.passed);
  resultOutcomeStamp.querySelector('strong').textContent = report.passed ? '卖掉了' : '卖不掉了';
  resultOutcomeStamp.querySelector('small').textContent = report.passed ? 'SOLD OUT' : 'SLOW SALES';
  document.querySelector('#credibilityScore').textContent = report.scores.credibility;
  document.querySelector('#jargonScore').textContent = report.scores.jargon;
  document.querySelector('#survivalScore').textContent = report.scores.survival;
}

function generateLocalReport() {
  const answers = state.history.filter(item => item.role === 'user').map(item => item.content).join(' ');
  const lengthBonus = Math.min(18, Math.floor(answers.length / 28));
  const numberBonus = /\d|%|倍|万|千/.test(answers) ? 12 : 0;
  const actionBonus = /负责|设计|优化|协调|完成|提升|分析|调研|管理|实现|解决|沟通|测试|带领|整理/.test(answers) ? 10 : 0;
  const vaguePenalty = /大概|可能|也许|不知道|不太清楚|应该吧|差不多/.test(answers) ? 12 : 0;

  const story = clamp(58 + lengthBonus + actionBonus + randomInt(0, 12), 0, 100);
  const logic = clamp(64 + numberBonus + actionBonus - vaguePenalty + randomInt(-8, 8), 0, 100);
  const confidence = clamp(62 + lengthBonus - vaguePenalty + randomInt(-5, 14), 0, 100);
  const nonsense = clamp(76 + randomInt(0, 20), 0, 100);

  const credibility = story;
  const jargon = nonsense;
  const survival = clamp(Math.round((logic + confidence + story) / 3), 0, 100);

  const passed = logic > 55 && story > 65;
  const candidateTitles = candidateTitlesByJob[state.job.id] || ['垃圾桶旁边的神秘候选人'];

  return {
    title: pickRandom(candidateTitles),
    comment: `${passed ? '面试通过' : '面试不通过'}：${pickRandom(passed ? PASS_COMMENTS : FAIL_COMMENTS)}`,
    passed,
    scores: { credibility, jargon, survival }
  };
}

function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    if (micBtn) {
      micBtn.disabled = true;
      micBtn.textContent = '不支持';
    }
    hintText.textContent = '当前浏览器不支持语音，可以直接打字回答Chrome 通常支持';
    return;
  }

  state.recognition = new SpeechRecognition();
  state.recognition.lang = 'zh-CN';
  state.recognition.interimResults = true;
  state.recognition.continuous = true;

  let finalTranscript = '';

  state.recognition.onstart = () => {
    state.isRecording = true;
    finalTranscript = answerBox.innerText.trim();
    if (micBtn) {
      micBtn.classList.add('recording');
      micBtn.textContent = '停止';
    }
    hintText.textContent = '正在听你编故事...停止后点发送，会变成你的聊天消息';
  };

  state.recognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }
    answerBox.innerText = `${finalTranscript}${interimTranscript}`;
    placeCaretAtEnd(answerBox);
  };

  state.recognition.onerror = () => {
    hintText.textContent = '麦克风没有成功启动，可以改成手动输入';
    stopRecordingUI();
  };

  state.recognition.onend = () => {
    stopRecordingUI();
  };
}

function toggleRecording() {
  if (!state.recognition || (micBtn && micBtn.disabled)) return;
  if (state.isRecording) {
    state.recognition.stop();
  } else {
    state.recognition.start();
  }
}

function stopRecordingUI() {
  state.isRecording = false;
  if (micBtn) {
    micBtn.classList.remove('recording');
    micBtn.textContent = '说话';
  }
}

function addMessage(role, content) {
  const row = document.createElement('div');
  row.className = `message-row ${role === 'user' ? 'user' : 'ai'}`;

  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  bubble.textContent = content;

  if (role === 'ai') {
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.innerHTML = `<img src="${RACCOON_IMAGES.normal}" alt="浣熊头像">`;
    row.appendChild(avatar);
    row.appendChild(bubble);
  } else {
    row.appendChild(bubble);
  }

  chatList.appendChild(row);
  scrollChatToBottom();
  return bubble;
}

function addAiGifMessage() {
  const bubble = addMessage('ai', '');
  bubble.classList.add('gif-bubble');

  const gif = document.createElement('img');
  gif.className = 'reaction-gif';
  gif.src = RACCOON_IMAGES.reactionGif;
  gif.alt = '浣熊反应表情包';
  gif.addEventListener('load', scrollChatToBottom, { once: true });
  bubble.appendChild(gif);

  scrollChatToBottom();
  return bubble;
}

async function addAiMessageTyped(content) {
  cancelActiveTypewriter();
  const bubble = addMessage('ai', '');
  bubble.classList.add('speaking-bubble');
  const token = { cancelled: false };
  state.activeTypewriter = token;
  setMood('thinking');

  for (let i = 0; i < content.length; i += 1) {
    if (token.cancelled) break;
    const char = content[i];
    bubble.textContent += char;

    if (!/\s/.test(char)) {
      nudgeRaccoonFace();
      if (!/[，！？、,.!?：:；;]/.test(char)) {
        playRaccoonSyllable(char, i);
      }
    }

    scrollChatToBottom();
    await wait(getTypingDelay(char));
  }

  bubble.classList.remove('speaking-bubble');
  if (state.activeTypewriter === token) state.activeTypewriter = null;
  if (!token.cancelled) setMood('normal');
}

function cancelActiveTypewriter() {
  if (state.activeTypewriter) {
    state.activeTypewriter.cancelled = true;
    state.activeTypewriter = null;
  }
}

function getTypingDelay(char) {
  if (/[！？.!?]/.test(char)) return randomInt(260, 420);
  if (/[，、,；;：:]/.test(char)) return randomInt(140, 240);
  return randomInt(32, 58);
}

function toggleRaccoonVoice() {
  state.voiceEnabled = !state.voiceEnabled;
  updateVoiceButton();
  if (state.voiceEnabled) playRaccoonSyllable('开', 0);
}

function updateVoiceButton() {
  if (!voiceToggleBtn) return;
  voiceToggleBtn.setAttribute('aria-pressed', String(state.voiceEnabled));
  voiceToggleBtn.classList.toggle('muted', !state.voiceEnabled);
}

function getAudioContext() {
  if (!state.audioContext) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    state.audioContext = new AudioContext();
  }
  if (state.audioContext.state === 'suspended') state.audioContext.resume();
  return state.audioContext;
}

function playRaccoonBlip(char = '') {
  playRaccoonSyllable(char, 0);
}


async function preloadAnimaleseSamples() {
  if (state.animaleseReady) return state.animaleseBuffers;
  if (state.animaleseLoading) return state.animaleseLoading;

  const audioCtx = getAudioContext();
  if (!audioCtx) return null;

  state.animaleseLoading = Promise.all(ANIMALESE_SAMPLE_FILES.map(async (file) => {
    const response = await fetch(`sounds/animalese/${file}`);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    const vowel = getSampleVowel(file);
    if (!state.animaleseBuffers[vowel]) state.animaleseBuffers[vowel] = [];
    state.animaleseBuffers[vowel].push(audioBuffer);
  })).then(() => {
    state.animaleseReady = true;
    return state.animaleseBuffers;
  }).catch((error) => {
    console.warn('Animalese 样本加载失败：', error);
    return null;
  });

  return state.animaleseLoading;
}

function getSampleVowel(file) {
  if (file.includes('_ilow_')) return 'ilow';
  if (file.includes('_olow_')) return 'olow';
  const match = file.match(/girl_([aeiou])_/);
  return match ? match[1] : 'a';
}

function playRaccoonSyllable(char = '', index = 0) {
  if (!state.voiceEnabled) return;

  if (!state.animaleseReady) {
    // v4.3：如果真实 wav 还没加载完，先不播放，避免听起来像之前的电子音
    preloadAnimaleseSamples();
    return;
  }

  const audioCtx = getAudioContext();
  if (!audioCtx) return;

  const vowel = pickVowelForChar(char, index);
  const pool = state.animaleseBuffers[vowel] || state.animaleseBuffers.a || [];
  if (!pool.length) {
    return;
  }

  playAnimaleseBuffer(audioCtx, pickRandom(pool), audioCtx.currentTime, randomFloat(0.94, 1.08), 0.32);

  const isChinese = /[一-鿿]/.test(char);
  if (isChinese && index % 3 === 0) {
    const tailPool = state.animaleseBuffers[pickRandom(['a', 'e', 'i', 'o', 'u'])] || pool;
    playAnimaleseBuffer(audioCtx, pickRandom(tailPool), audioCtx.currentTime + 0.055, randomFloat(1.02, 1.16), 0.14);
  }
}

function playAnimaleseBuffer(audioCtx, buffer, when, playbackRate, volume) {
  const source = audioCtx.createBufferSource();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  source.buffer = buffer;
  source.playbackRate.setValueAtTime(playbackRate, when);
  filter.type = 'highpass';
  filter.frequency.setValueAtTime(120, when);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(volume, when + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + randomFloat(0.075, 0.115));

  source.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);
  source.start(when);
  source.stop(when + 0.13);
}

function pickVowelForChar(char = '', index = 0) {
  const lower = char.toLowerCase();
  if ('aeiou'.includes(lower)) return lower;
  if (/[bcdfgptkq]/i.test(char)) return pickRandom(['a', 'o', 'olow']);
  if (/[mnlrsyzh]/i.test(char)) return pickRandom(['e', 'i', 'ilow']);

  const code = char.charCodeAt(0) || index;
  const vowels = ['a', 'e', 'i', 'o', 'u', 'ilow', 'olow'];
  return vowels[(code + index) % vowels.length];
}

function playSynthRaccoonSyllable(char = '', index = 0) {
  if (!state.voiceEnabled) return;
  const audioCtx = getAudioContext();
  if (!audioCtx) return;

  const now = audioCtx.currentTime;
  const code = char.charCodeAt(0) || randomInt(0, 200);
  const isChinese = /[\u4e00-\u9fff]/.test(char);

  // “小动物碎语音”的关键：不是一个 beep，而是 2 个极短音节 + 轻微滑音 + 元音滤波
  // 这不是任何游戏原声音频，只是网页实时合成的卡通 babble voice
  const syllableCount = isChinese ? 2 : (index % 3 === 0 ? 2 : 1);
  const basePitch = 520 + (code % 7) * 34 + randomInt(-26, 26);
  const vowelPresets = [
    { f1: 820, f2: 1550, q: 10 },
    { f1: 680, f2: 1320, q: 9 },
    { f1: 920, f2: 1760, q: 11 },
    { f1: 740, f2: 1650, q: 8 }
  ];
  const vowel = vowelPresets[code % vowelPresets.length];

  for (let part = 0; part < syllableCount; part += 1) {
    const t = now + part * 0.052;
    const duration = randomFloat(0.043, 0.066);
    const pitch = basePitch + part * randomInt(34, 72) + (index % 4) * 18;

    const oscA = audioCtx.createOscillator();
    const oscB = audioCtx.createOscillator();
    const vowelFilterA = audioCtx.createBiquadFilter();
    const vowelFilterB = audioCtx.createBiquadFilter();
    const warmFilter = audioCtx.createBiquadFilter();
    const gain = audioCtx.createGain();

    oscA.type = 'sawtooth';
    oscB.type = 'triangle';
    oscA.frequency.setValueAtTime(pitch * 0.98, t);
    oscA.frequency.linearRampToValueAtTime(pitch * randomFloat(1.08, 1.22), t + duration * 0.55);
    oscA.frequency.linearRampToValueAtTime(pitch * randomFloat(0.92, 1.04), t + duration);

    oscB.frequency.setValueAtTime(pitch * 1.5, t);
    oscB.frequency.linearRampToValueAtTime(pitch * 1.35, t + duration);

    vowelFilterA.type = 'bandpass';
    vowelFilterA.frequency.setValueAtTime(vowel.f1 + randomInt(-80, 80), t);
    vowelFilterA.Q.setValueAtTime(vowel.q, t);

    vowelFilterB.type = 'bandpass';
    vowelFilterB.frequency.setValueAtTime(vowel.f2 + randomInt(-120, 120), t);
    vowelFilterB.Q.setValueAtTime(vowel.q * 0.7, t);

    warmFilter.type = 'lowpass';
    warmFilter.frequency.setValueAtTime(2300, t);
    warmFilter.Q.setValueAtTime(1.4, t);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.038, t + 0.008);
    gain.gain.linearRampToValueAtTime(0.028, t + duration * 0.5);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    oscA.connect(vowelFilterA);
    oscB.connect(vowelFilterB);
    vowelFilterA.connect(warmFilter);
    vowelFilterB.connect(warmFilter);
    warmFilter.connect(gain);
    gain.connect(audioCtx.destination);

    oscA.start(t);
    oscB.start(t);
    oscA.stop(t + duration + 0.01);
    oscB.stop(t + duration + 0.01);

    if (part === 0 && index % 2 === 0) {
      playTinyMouthClick(audioCtx, t, duration * 0.45);
    }
  }
}

function playTinyMouthClick(audioCtx, startTime, duration) {
  const sampleRate = audioCtx.sampleRate;
  const frameCount = Math.max(1, Math.floor(sampleRate * duration));
  const buffer = audioCtx.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i += 1) {
    const fade = 1 - i / frameCount;
    data[i] = (Math.random() * 2 - 1) * 0.018 * fade;
  }

  const source = audioCtx.createBufferSource();
  const filter = audioCtx.createBiquadFilter();
  const gain = audioCtx.createGain();
  source.buffer = buffer;
  filter.type = 'highpass';
  filter.frequency.setValueAtTime(1200, startTime);
  gain.gain.setValueAtTime(0.16, startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);
  source.start(startTime);
  source.stop(startTime + duration);
}

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function nudgeRaccoonFace() {
  raccoonFace.classList.remove('speaking');
  void raccoonFace.offsetWidth;
  raccoonFace.classList.add('speaking');
}


function showTypingBubble() {
  removeTypingBubble();
  setMood('thinking');

  const row = document.createElement('div');
  row.className = 'message-row ai typing-row';
  row.innerHTML = `
    <div class="avatar"><img src="${RACCOON_IMAGES.thinking}" alt="浣熊头像"></div>
    <div class="message-bubble typing-bubble" aria-label="浣熊正在生成中">
      <span></span><span></span><span></span>
    </div>
  `;
  chatList.appendChild(row);
  state.typingEl = row;
  scrollChatToBottom();
}

function removeTypingBubble() {
  if (state.typingEl) {
    state.typingEl.remove();
    state.typingEl = null;
  }
}

function setMood(moodName) {
  const mood = raccoonMoods[moodName] || raccoonMoods.normal;
  raccoonFace.className = `raccoon-face ${mood.className}`;
  if (raccoonFaceImg && mood.image) raccoonFaceImg.src = mood.image;
  emotionText.textContent = mood.text;
}

function getTotalTurns() {
  return state.job && state.job.questions ? state.job.questions.length : MAX_TURNS;
}

function updateProgress() {
  const total = getTotalTurns();
  const current = Math.min(state.turn + 1, total);
  progressText.textContent = `第 ${current} / ${total} 题`;
}

function scrollChatToBottom() {
  requestAnimationFrame(() => {
    chatList.scrollTop = chatList.scrollHeight;
    requestAnimationFrame(() => {
      chatList.scrollTop = chatList.scrollHeight;
    });
  });
}

function restartGame() {
  if (state.recognition && state.isRecording) state.recognition.stop();
  cancelActiveTypewriter();
  resetComposerControls();
  resultScreen.classList.add('hidden');
  gameScreen.classList.add('hidden');
  jobIntroScreen.classList.add('hidden');
  jobSelectScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
}

async function copyReport() {
  if (!state.finalReport) return;
  const report = `《浣熊面试官 V5》\n\n你在本次面试中被评为：\n${state.finalReport.title}\n${state.finalReport.comment}\n\n简历含水量：${state.finalReport.scores.credibility}\n被叉出去风险：${state.finalReport.scores.jargon}\n黑眼圈共鸣值：${state.finalReport.scores.survival}`;
  try {
    await navigator.clipboard.writeText(report);
    copyReportBtn.textContent = '已复制！';
    setTimeout(() => { copyReportBtn.textContent = '复制报告'; }, 1200);
  } catch {
    alert(report);
  }
}

function placeCaretAtEnd(element) {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(element);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
}

function pickRandom(array) { return array[Math.floor(Math.random() * array.length)]; }
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
