window.onload = () => {
    console.log('loaded')
    document.getElementById('signOut').onclick = () => {
        console.log('siging out')
        httpGetAsync('http://api.treasureisland.tech/login/deauthorize', (res) => {
            let obj = JSON.parse(res);
            if(!obj['success'])
                throw new Error('Could not log out')
            window.location = '/signin.html'
        })
    }
}