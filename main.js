(()=>{
    const setData = (json) => {
        const numberNode = document.getElementsByClassName('painful-number')[0]
        const dateNode = document.getElementsByClassName('painful-date')[0]
        
        const date = new Date(parseInt(json.last_updated, 10) * 1000)
        const day = date.getDate().toString().padStart(2, 0)
        const month = (date.getMonth() + 1).toString().padStart(2, 0)
        const year = date.getFullYear()

        numberNode.innerText = json.id.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        dateNode.innerText = `${day}.${month}.${year}`
    }

    const url = 'https://onetwoteam.com/api/v1/dev'
    fetch(url)
        .then(data => data.json())
        .then(setData)
        .catch(error => {
            const numberNode = document.getElementsByClassName('painful-number')[0]
            numberNode.innerHTML = '<span>nu pizdets</span><br/><span>no data</span>'
        })
})()
