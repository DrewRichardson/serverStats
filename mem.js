const os = require("os");

function getMemInfo() {
    const div = 1073741824
    var mem = {}
    var totalMem = os.totalmem()/div
    var freeMem = os.freemem()/div
    var memPercentage = freeMem/totalMem*100
    mem.totalMem = +totalMem.toFixed(2)
    mem.freeMem = +freeMem.toFixed(2)
    mem.memPercentage = Math.round(memPercentage)
    return mem
}

module.exports ={
    getMemInfo
}