interface repoData{
    name: string,
    description: string,
    fork: boolean,
    stargazers_count: number
}

interface userData {
    id: number
    login: string
    name: string
    bio: string
    public_repos: number
    repos_url: string
    message?: "notfound"
}

const users: userData[] = [] 


async function newUser(userName: string) {
    const atual = await fetch(`https://api.github.com/users/${userName}`)
    const result: userData = await atual.json()

    if (result.message) {
        console.log('usuario nao encontrado')
    } else {
        users.push(result)
    }
}


async function showRepoUser(username: string) {
    const user = users.find(user => user.login === username)
  
    if (typeof user === 'undefined') {
      alert('Usuário não encontrado!');
    } else {
      const response = await fetch(user.repos_url)
      const repos: repoData[] = await response.json()
  
      let message = `id: ${user.id}\n` +
        `\nlogin: ${user.login}` +
        `\nNome: ${user.name}` +
        `\nBio: ${user.bio}` +
        `\nRepositórios públicos: ${user.public_repos}`
  
      repos.forEach(repo => {
        message += `\nNome: ${repo.name}` +
          `\nDescrição: ${repo.description}` +
          `\nEstrelas: ${repo.stargazers_count}` +
          `\nÉ um fork: ${repo.fork ? 'Sim' : 'Não'}\n`
      })
  
      alert(message)
    } 
}


function showAllUsers() {
  console.log(users)
}


function repoUsersSum() {
  const allRepos = users.reduce((acum, element) => {
    return acum + element.public_repos
  }, 0)
  return allRepos
}


function topMorerepos() {
  let maior = []
  users.forEach(element => {
    let array = []
    array.push(element.login)
    array.push(element.public_repos)
    maior.push(array)
  })  
  const top5 = maior.slice().sort((a, b) => b[1] - a[1]).slice(0, 5)
  console.log(top5)
}

