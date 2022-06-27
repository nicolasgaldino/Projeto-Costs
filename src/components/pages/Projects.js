import React from 'react';
import Message from "../layout/Message"
import { Link, useLocation } from 'react-router-dom';
import styles from './Projects.module.css';
import Container from '../../components/layout/Container';
import LinkButton from '../../components/layout/LinkButton';
import ProjectCard from "../projects/ProjectCard";
import Loading from '../layout/Loading';

const Projects = () => {

  const [ projects, setProjects ] = React.useState([]);
  const [ removeLoading, setRemoveLoading ] = React.useState(false);

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

  return (
    <div className={ styles.projectContainer }>
      <div className={ styles.titleContainer }>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto"/>
      </div>
      {message && <Message type="success" msg={ message }/>}
      <Container customClass="start">
        {projects.length > 0 && projects.map((project) => (
          <ProjectCard
          id={ project.id }
          key={ project.id }
          name={ project.name }
          budget={ project.budget }
          category={ project.category.name }
          />
        ))}
        {!removeLoading && <Loading />}
      </Container>
    </div>
  )
}

export default Projects