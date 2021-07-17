(()=>{
    const url = 'https://onetwoteam.com/api/v1/dev'
    fetch(url).then(data => {
        console.log(data)
    })
})()