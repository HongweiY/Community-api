import svgCaptcha from 'svg-captcha'
import {setValue} from "../config/RedisConfig";

class PublicController {
    constructor() {
    }

    async getCaptcha(ctx) {
        const body = ctx.request.query

        let newCaptcha = svgCaptcha.create({
            size: 4,
            noise: Math.floor(Math.random() * 5),
            color: true,
            width: 200,
            height: 50
        });
        setValue(body.sid, newCaptcha.text, 10 * 60)
        ctx.body = {
            code: 200,
            data: newCaptcha.data,
        }
    }

}

export default new PublicController()
