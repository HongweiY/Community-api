import { getValue, setValue } from './RedisConfig'

setValue('imooc', 'imoooc')

getValue('imooc').then((res) => {
  console.log(res)
})
