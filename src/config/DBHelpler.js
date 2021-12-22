import mongoose from 'mongoose'
import config from './index'

mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('connected')
})

mongoose.connection.on('error', () => {
    console.log('error')
})

mongoose.connection.on('disconnect', () => {
    console.log('disconnect')
})

export default mongoose
