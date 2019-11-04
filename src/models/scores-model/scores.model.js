'use strict';

module.exports = function (Scores) {
    
    
    Scores.createScore = (req, callback) => {
        let {idUser, idStage, times} = req.body

        let ds = Scores.dataSource
        let sql = 'select create_score($1, $2, $3)';

        ds.connector.execute(sql, [idUser, idStage, times], (err, data) => {
            if (err) { return }
        })

        callback(null, 'test')
    }

    Scores.remoteMethod('createScore', {
        accepts: { arg: 'req', type: 'any', 'http': { source: 'req' } },
        http: { path: '/create', verb: 'post' },
        return: { arg: 'message', type: 'string' },
    })
}