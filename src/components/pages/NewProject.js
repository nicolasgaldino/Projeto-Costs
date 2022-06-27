import { useNavigate } from 'react-router-dom';
import ProjectForm from '../projects/ProjectForm';
import styles from './NewProject.module.css';

const NewProject = () => {

  const navigate = useNavigate();

  function createPost(project) {

    const url = "http://localhost:5000/projects";

    project.cost = 0
    project.services = []

    fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(project)
    })
    .then((response) => response.json)
    .then((data) => {
      navigate('/projects', { state: { message: 'Projeto criado com sucesso!' } })
    })
    .catch(err => console.log(err));

  };

  return (
    <div className={ styles.newProjectContainer }>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços.</p>
      <ProjectForm handleSubmit={ createPost } btnText="Criar projeto" />
    </div>
  )
}

export default NewProject