 const userRoutes = require('../user/user.route')
// const authRoutes = require('../auth/auth.route') 
// const tokenValidator = require('../middleware/tokenValidator')
// const schoolRoutes = require('../school/school.route')

module.exports = (app) => {
    
    // app.use('/api/auth', authRoutes)
    // app.use(tokenValidator); //  Below this, all api need Authorization token in header
     app.use('/api/user', userRoutes)
    // app.use('/api/school',schoolRoutes)

} 