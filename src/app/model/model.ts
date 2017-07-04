/**
 * 用户注册参数
 */
export interface RegisterParams {
    user: {
        account: string;//账户
        name: string;//昵称
        email?: string;//邮箱
        password: string;//密码
        password_confirmation: string;//重复密码
    }; //用户账户注册信息
    captcha: string;//注册验证码
    followed_id?: string;//推荐人id
}
/**
 * 用户登录参数
 */
export interface LoginParams {
    user: {
        account: string;
        password: string;
    }
}
/**
 * 用户
 */
export interface User {
    user: {
        id;
        account: string;
        name: string,
        email?: string;
    },
    authorization: string;
}