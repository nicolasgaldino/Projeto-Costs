import React from 'react';
import Message from "../layout/Message"
import { useLocation } from 'react-router-dom';
import styles from './Projects.module.css';
import Container from '../../components/layout/Container';
import LinkButton from '../../components/layout/LinkButton';
import ProjectCard from "../projects/ProjectCard";
import Loading from '../layout/Loading';

const Projects = () => {

  const [ projects, setProjects ] = React.useState([]);
  const [ removeLoading, setRemoveLoading ] = React.useState(false);
  const [ projectMessage, setProjectMessage ] = React.useState('');

  const location = useLocation();
  let message = '';
  if(location.state) {
    message = location.state.message;
  }

  React.useEffect(() => {
    const url = "http://localhost:5000/projects";

    fetch(url, {
      method: 'GET',
      headers : {
        'Content-type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then(data => {
      setProjects(data);
      setRemoveLoading(true);
    })
    .catch((err) => console.log(err));
  }, []);

  function removeProject(id) {
    const url = `http://localhost:5000/projects/${id}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
    })
    .then((response) => response.json())
    .then(data => {
      setProjects(projects.filter((project) => project.id !== id))
      setProjectMessage('Projeto removido com sucesso.')
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className={ styles.projectContainer }>
      <div className={ styles.titleContainer }>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto"/>
      </div>
      {message && <Message type="success" msg={ message } />}
      {projectMessage && <Message type="success" msg={ projectMessage } />}
      <Container customClass="start">
        {projects.length > 0 && projects.map((project) => (
          <ProjectCard
          id={ project.id }
          key={ project.id }
          name={ project.name }
          budget={ project.budget }
          category={ project.category.name }
          handleRemove={ removeProject }
          />
        ))}
        {!removeLoading && <Loading />}
      </Container>
    </div>
  )
}

export default Projects