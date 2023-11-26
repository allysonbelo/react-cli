import Header from "../../components/Header"
import background from '../../assets/github.jpg'
import ItemList from "../../components/ItemList"
import './styles.css'
import { useState } from "react"

function App() {

  const [user, setuser] = useState('');
  const [currentUser, setCurrentuser] = useState(null);
  const [repos, setRepos] = useState(null);

  const [loading, setLoading] = useState(false);


  const handleGetData = async () => {
    try {
      setLoading(true); // Inicia o carregamento

      const userDataResponse = await fetch(`https://api.github.com/users/${user}`);
      if (!userDataResponse.ok) throw new Error('Usuário não encontrado');

      const newUser = await userDataResponse.json();
      setCurrentuser({
        avatar_url: newUser.avatar_url,
        name: newUser.name,
        bio: newUser.bio,
        login: newUser.login,
      });

      const reposDataResponse = await fetch(newUser.repos_url);
      if (!reposDataResponse.ok) throw new Error('Repositórios não encontrados');

      const newRepos = await reposDataResponse.json();

      if (Array.isArray(newRepos)) {
        setRepos(newRepos);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  { loading && <div className="spinner">Carregando...</div> }

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} className="background" alt="imagem github com tema de natal" />
        <div className="info">
          <div>
            <input
              name="usuario"
              value={user}
              onChange={event => setuser(event.target.value)}
              type="text"
              placeholder="@username" />
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <>
              {currentUser?.name ? (
                <>
                  <div className="perfil">
                    <img src={currentUser.avatar_url} alt="Imagem de perfil do github" className="profile" />
                    <div>
                      <h3 className="titleName">{currentUser.name}</h3>
                      <span>@{currentUser.login}</span>
                      <p>{currentUser.bio}</p>
                    </div>
                  </div>
                  <hr />
                </>
              ) : null}

              {repos?.length ? (
                <div>
                  <h4 className="repositorio">Repositórios</h4>
                  {repos.map(repo => (
                    <ItemList key={repo.id} title={repo.name} description={repo.description} link={repo.html_url } />
                  ))}
                </div>
              ) : null}
            </>
          )}

        </div>

      </div>
    </div>
  )
}

export default App
