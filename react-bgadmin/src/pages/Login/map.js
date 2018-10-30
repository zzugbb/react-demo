export default {
  UserName: {
    rules: [
      {
        required: true,
        message: '请输入用户名!',
      },
    ],
  },
  Password: {
    rules: [
      {
        required: true,
        message: '请输入密码!',
      },
      {
        min: 6,
        message: '不在密码字数范围内！',
      },
      {
        max: 20,
        message: '不在密码字数范围内！',
      }
    ],
  },
  Mobile: {
    rules: [
      {
        required: true,
        message: '请输入手机号!',
      },
      {
        pattern: /^1\d{10}$/,
        message: '错误的手机号格式!',
      },
    ],
  },
  Captcha: {
    rules: [
      {
        required: true,
        message: '请输入验证码!',
      },
      {
        min: 4,
        message: '不在验证码字数范围内！',
      },
      {
        max: 8,
        message: '不在验证码字数范围内！',
      }
    ],
  },
};
