# 使用 AI 探索可能的职业
> nextjs、tailwindcss、clerk、stripe、supabase

## Todo
- [x] roadmap 点击之后支持聊天
- [ ] 页面切换时，全局加一个loading状态
- [ ] (i18n)定价部分、FAQ。付费点：3.5免费、llama-3、google giminal免费，4.0系列消耗一积分
- [ ] 移动端的6个职业生涯使用列表展示，不要使用react-flow
- [ ] 解决并发过多导致的每次只能获取4个职位问题(期望是6个)
- [ ] 接入其他大模型gpt3.5、gpt4.0-turbo、gpt-4o、google giminal
- [ ] 做展示tip，每月10 20 30 号清空简历存储(bytedance)
- [ ] 针对`parsePdf`、`getCareers`接口调用，适当做个进度条UI告知用户?(判断是否有必要)
- [ ] 优化探索过程, 优化`findIdealCareer`和`generateCareerInfo`方法，`generateCareerInfo`获取到6个职位信息后，先展示，再存储到supabase数据库。(判断这个处理是否符合软件工程思想，这种处理可以减少两个接口阻塞)
  ```js
  // put data into supabase table userId_resumeData
  await appendResumeList(user!.id, newResumeInfo);

  // put data into supabase table resumeId_careersData
  await appendCareerDataByResumeId(file.uploadId, careersData);
  ```
- [ ] 解决 markdown 组件序号不显示问题

## Feature

1. 落地页基本结构 & 响应式
2. 支持多语言
3. 根据系统语言设置默认语言
4. 集成 Clerk 注册登录，并且使用其 Metadata 作积分存储，支持指定初始化积分
5. 集成 Stripe 支付服务，支付成功可以获得积分。(lang为zh使用支付宝付款，其他使用信用卡)
6. 集成 supabase 做数据存储，保存简历列表、职业岗位推荐信息
7. 接入chatgpt，指导如何去达到学习目标

## 环境变量
```env
# clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_aG******V2JA
CLERK_SECRET_KEY=sk_test_3N***vvb

# clerk endpoint signing secret
CLERK_WEBHOOK_SECRET=whsec_JP***0
CLERK_INIT_CREDIT_AMOUNT=5

# stripe secret key
STRIPE_SECRET_KEY=sk_test_51P******tTk
STRIPE_WEBHOOK_SECRET=whsec_D2***gGM
STRIPE_PAY_SUCCESS_URL=/dashboard

# supabase
supabaseUrl=https://am******zod.supabase.co
supabaseKey=eyJh****77GI

# career
NEXT_PUBLIC_BYTESCALE_API_KEY=public_12a1***GWm
TOGETHER_API_KEY=a28***ee413
HELICONE_API_KEY=sk-5***ra

# optional
SITE_URL=
NEXT_PUBLIC_BAIDU_TONGJI=
NEXT_PUBLIC_GOOGLE_ID=

```

## 参考

1. 使用 clerk webhooks 监听 clerk 用户事件回调。[点击跳转](https://clerk.com/blog/webhooks-getting-started)
2. 验证 Stripe Webhook 签名。[点击跳转](https://docs.stripe.com/webhooks?locale=zh-CN#%E7%94%A8%E5%AE%98%E6%96%B9%E5%BA%93%E9%AA%8C%E8%AF%81-webhook-%E7%AD%BE%E5%90%8D)
3. Stripe 测试卡账号。[点击跳转](https://docs.stripe.com/testing#cards)
4. 将【2】中验证代码修改为 nextJs 的代码，遇到`invalid body`问题的解决方法：使用`req.text()`直接作为`stripe.webhooks.constructEvent`的第一个参数。[点击跳转](https://stackoverflow.com/questions/75828724/i-am-trying-to-setup-of-a-webhook-using-stripe-and-nextjs-13-2-3)
5. nextJs 路由的处理。[点击跳转](https://www.cnblogs.com/silva/p/17948724)
6. 使用 nextJs 的 Context 做全局状态管理。[点击跳转](https://vercel.com/guides/react-context-state-management-nextjs)