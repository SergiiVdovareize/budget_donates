(()=>{
    const subdomain = window.location.hostname.split('.').slice(0, -2).join('.') || 'root';

    const formatAmount = amount => amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

    const showDiff = (currAmount, lastId) => {
        const diff = currAmount - parseInt(lastId, 10)
        if (isNaN(diff)) {
            return
        }
                
        if (diff !== 0) {
            const diffNode = document.getElementsByClassName('painful-diff')[0]
            let formattedDiff = formatAmount(diff)
            if (diff > 0) {
                formattedDiff = `+${formattedDiff}`
            }

            diffNode.innerText = `${formattedDiff} since last visit`
        }
    }

    const storeData = (amount) => {
        const lastId = localStorage.getItem(`${subdomain}-lastId`)
        
        if (isNaN(lastId) || parseInt(lastId, 10) !== amount) {
            if (lastId && !isNaN(lastId)) {
                showDiff(amount, lastId)
                localStorage.setItem(`${subdomain}-mediateId`, lastId)
            }
            localStorage.setItem(`${subdomain}-lastId`, amount)
            localStorage.setItem(`${subdomain}-lastUpdate`, Date.now())
        } else if (parseInt(lastId, 10) === amount) {
            const lastUpdate = localStorage.getItem(`${subdomain}-lastUpdate`)
            const timeDiff = (Date.now() - lastUpdate)
            if (timeDiff < 10 * 60 * 1000) {
                showDiff(amount, localStorage.getItem(`${subdomain}-mediateId`))
            }
        }
    }

    const setData = (json) => {
        storeData(json.id);
        const numberNode = document.getElementsByClassName('painful-number')[0]
        const dateNode = document.getElementsByClassName('painful-date')[0]
        
        const date = new Date(parseInt(json.last_updated, 10) * 1000)
        const day = date.getDate().toString().padStart(2, 0)
        const month = (date.getMonth() + 1).toString().padStart(2, 0)
        const year = date.getFullYear()

        numberNode.innerText = formatAmount(json.id)
        dateNode.innerText = `${day}.${month}.${year}`
    }

    const url = `https://onetwoteam.com/api/v1/dev?source=${subdomain}`
    // const url = 'http://localhost:3000/api/v1/dev'
    fetch(url)
        .then(data => data.json())
        .then(setData)
        .catch(error => {
            console.log(error)
            const numberNode = document.getElementsByClassName('painful-number')[0]
            numberNode.innerHTML = '<span>nu pizdets</span><br/><span>no data</span>'
        })
})()
