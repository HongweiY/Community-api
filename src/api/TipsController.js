import TipsModel from "../model/Tips";

class TipsController {
    constructor() {
    }

    async getTips(ctx) {
        let tipsList = await TipsModel.find()
        ctx.body = {
            code: 200,
            data: tipsList
        }
    }
}
export default new TipsController()
