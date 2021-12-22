import TipsModel from '../model/Tips'

class TipsController {
  async getTips (ctx) {
    const tipsList = await TipsModel.find()
    ctx.body = {
      code: 200,
      data: tipsList
    }
  }
}
export default new TipsController()
