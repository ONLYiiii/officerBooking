function formatPid(pid) {
    let data = pid.toString().padStart(13, '0')
    let [pid1, pid2, pid3, pid4, pid5] = [
        data.substring(0, 1),
        data.substring(1, 5),
        data.substring(5, 10),
        data.substring(10, 12),
        data.substring(12, 13),
    ]

    return `${pid1}-${pid2}-${pid3}-${pid4}-${pid5}`
}

export default formatPid