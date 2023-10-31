const users = [];
async function newUser(userName) {
    const atual = await fetch(`https://api.github.com/users/${userName}`);
    const result = await atual.json();
    if (result.message) {
        console.log('usuario nao encontrado');
    }
    else {
        users.push(result);
    }
}
async function showRepoUser(username) {
    const user = users.find(user => user.login === username);
    if (typeof user === 'undefined') {
        alert('Usuário não encontrado!');
    }
    else {
        const response = await fetch(user.repos_url);
        const repos = await response.json();
        let message = `id: ${user.id}\n` +
            `\nlogin: ${user.login}` +
            `\nNome: ${user.name}` +
            `\nBio: ${user.bio}` +
            `\nRepositórios públicos: ${user.public_repos}`;
        repos.forEach(repo => {
            message += `\nNome: ${repo.name}` +
                `\nDescrição: ${repo.description}` +
                `\nEstrelas: ${repo.stargazers_count}` +
                `\nÉ um fork: ${repo.fork ? 'Sim' : 'Não'}\n`;
        });
        alert(message);
    }
}
function showAllUsers() {
    console.log(users);
}
function repoUsersSum() {
    const allRepos = users.reduce((acum, element) => {
        return acum + element.public_repos;
    }, 0);
    return allRepos;
}
function topMorerepos() {
    let maior = [];
    users.forEach(element => {
        let array = [];
        array.push(element.login);
        array.push(element.public_repos);
        maior.push(array);
    });
    const top5 = maior.sort((a, b) => b[1] - a[1]).slice(0, 4);
    console.log(top5);
}
