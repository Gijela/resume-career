# Landing Page
> nextjs、tailwindcss、clerk、stripe

## Feature

1. 落地页基本结构 & 响应式
2. 支持多语言
3. 根据系统语言设置默认语言
4. 集成 Clerk 注册登录，并且使用其 Metadata 作积分存储，支持指定初始化积分
5. 集成 Stripe 支付服务，支付成功可以获得积分。(lang为zh使用支付宝付款，其他使用信用卡)

## 环境变量
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

CLERK_SECRET_KEY=

# clerk endpoint signing secret
CLERK_WEBHOOK_SECRET=
CLERK_INIT_CREDIT_AMOUNT=

# stripe secret key
STRIPE_SECRET_KEY=
# stripe webhook signing secret
STRIPE_WEBHOOK_SECRET=
STRIPE_PAY_SUCCESS_URL=/dashboard
```

## 参考

1. 使用 clerk webhooks 监听 clerk 用户事件回调：[https://clerk.com/blog/webhooks-getting-started](https://clerk.com/blog/webhooks-getting-started)
2. 验证 Stripe Webhook 签名[https://docs.stripe.com/webhooks?locale=zh-CN#%E7%94%A8%E5%AE%98%E6%96%B9%E5%BA%93%E9%AA%8C%E8%AF%81-webhook-%E7%AD%BE%E5%90%8D](https://docs.stripe.com/webhooks?locale=zh-CN#%E7%94%A8%E5%AE%98%E6%96%B9%E5%BA%93%E9%AA%8C%E8%AF%81-webhook-%E7%AD%BE%E5%90%8D)
3. 将【2】中验证代码修改为 nextJs 的代码，遇到`invalid body`问题的解决方法：使用`req.text()`直接作为`stripe.webhooks.constructEvent`的第一个参数[https://stackoverflow.com/questions/75828724/i-am-trying-to-setup-of-a-webhook-using-stripe-and-nextjs-13-2-3](https://stackoverflow.com/questions/75828724/i-am-trying-to-setup-of-a-webhook-using-stripe-and-nextjs-13-2-3)