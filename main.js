(()=>{
    const setData = (json) => {
        const numberNode = document.getElementsByClassName('painful-number')[0]
        const dateNode = document.getElementsByClassName('painful-date')[0]
        
        const date = new Date(parseInt(json.last_updated, 10) * 1000)
        const day = date.getDate().toString().padStart(2, 0)
        const month = (date.getMonth() + 1).toString().padStart(2, 0)
        const year = date.getFullYear()

        numberNode.innerText = json.id.toLocaleString()
        dateNode.innerText = `${day}.${month}.${year}`
    }

    const url = 'https://onetwoteam.com/api/v1/dev'
    // const url = 'http://localhost:3000/api/v1/dev'
    fetch(url, {
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache',
        // credentials: 'no-cors',
        headers: {
         'Content-Type': 'application/json',
        }
    })
    .then(data => {
        console.log(data)
        // console.log(data.opaque)
        return data.json()
    })
    .then(json => {
        console.log(json)
        setData(json)
        
    })

    // const tempDate = {
    //     "success": true,
    //     "id": 868986,
    //     "last_updated": 1626912000
    // }

    // setData(tempDate)
})()